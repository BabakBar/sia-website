import type { FavoriteBook, FavoriteBookSeed } from '@/types';
import { readCachedList } from '@/lib/cache';

const FAVORITE_BOOKS: FavoriteBookSeed[] = [
  {
    title: 'Algorithms to Live By',
    searchTitle: 'Algorithms to Live By',
    authorHint: 'Brian Christian',
    note: 'A favorite because it turns computer science ideas into surprisingly practical life advice.',
  },
  {
    title: 'The Phoenix Project',
    searchTitle: 'The Phoenix Project',
    authorHint: 'Gene Kim',
    note: 'A favorite because it explains ops, delivery bottlenecks, and organizational failure without sounding academic.',
  },
  {
    title: 'Software Architecture: The Hard Parts',
    searchTitle: 'Software Architecture, The Hard Parts',
    authorHint: 'Neal Ford',
    note: 'A favorite because it stays concrete about tradeoffs instead of pretending architecture has clean answers.',
  },
];

const CACHE_KEY = 'favorite-books';
const CACHE_TTL = 1000 * 60 * 60 * 24;

interface OpenLibraryDoc {
  title?: string;
  subtitle?: string;
  author_name?: string[];
  cover_i?: number;
  first_publish_year?: number;
  key?: string;
}

interface OpenLibrarySearchResponse {
  docs?: OpenLibraryDoc[];
}

function dedupeAuthors(authors?: string[], authorHint?: string): string[] {
  const normalized = authors?.length ? authors : authorHint ? [authorHint] : [];
  return [...new Set(normalized)];
}

function getCoverUrl(coverId?: number): string | undefined {
  if (!coverId) {
    return undefined;
  }

  return `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`;
}

function getWorkUrl(key?: string): string | undefined {
  if (!key) {
    return undefined;
  }

  return `https://openlibrary.org${key}`;
}

function normalizeBook(book: FavoriteBookSeed, doc?: OpenLibraryDoc): FavoriteBook {
  return {
    title: doc?.title ?? book.title,
    subtitle: doc?.subtitle,
    authors: dedupeAuthors(doc?.author_name, book.authorHint),
    firstPublishYear: doc?.first_publish_year,
    coverUrl: getCoverUrl(doc?.cover_i),
    openLibraryUrl: getWorkUrl(doc?.key),
    note: book.note,
  };
}

export function getFallbackFavoriteBooks(): FavoriteBook[] {
  return FAVORITE_BOOKS.map((book) => normalizeBook(book));
}

async function fetchBook(book: FavoriteBookSeed): Promise<FavoriteBook> {
  const params = new URLSearchParams({
    title: book.searchTitle,
    limit: '5',
  });

  if (book.authorHint) {
    params.set('author', book.authorHint);
  }

  const response = await fetch(`https://openlibrary.org/search.json?${params.toString()}`);

  if (!response.ok) {
    throw new Error(`Open Library API error: ${response.status}`);
  }

  const data: OpenLibrarySearchResponse = await response.json();
  const normalizedTitle = book.title.toLowerCase().replace(':', '');
  const match =
    data.docs?.find((doc) =>
      doc.title?.toLowerCase().replace(':', '').includes(normalizedTitle)
    ) ?? data.docs?.[0];

  return normalizeBook(book, match);
}

export async function fetchFavoriteBooks(): Promise<FavoriteBook[]> {
  const cached = readCachedList<FavoriteBook>(CACHE_KEY);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }

  try {
    const books = await Promise.all(FAVORITE_BOOKS.map(fetchBook));
    localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({ data: books, timestamp: Date.now() })
    );
    return books;
  } catch (error) {
    console.error('Failed to fetch favorite books:', error);
    if (cached) {
      return cached.data;
    }

    return getFallbackFavoriteBooks();
  }
}