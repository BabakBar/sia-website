import { useEffect, useState } from 'react';
import { fetchFavoriteBooks, getFallbackFavoriteBooks } from '@/lib/books';
import type { FavoriteBook } from '@/types';
import BookCard from '../ui/BookCard';

export default function FavoriteBooks() {
  const [books, setBooks] = useState<FavoriteBook[]>(() => getFallbackFavoriteBooks());

  useEffect(() => {
    fetchFavoriteBooks().then(setBooks);
  }, []);

  return (
    <section className="py-8">
      <div className="max-w-3xl">
        <h2 className="text-xl font-bold">Books I Keep Recommending</h2>
        <p className="mt-3 max-w-2xl text-muted-light">
          I like to read, mostly around systems, delivery, decision-making, and how teams actually work.
          These are some favorites that impacted heavy!
        </p>
      </div>

      <div className="mt-6 space-y-4">
        {books.map((book, index) => (
          <BookCard key={book.title} book={book} index={index} />
        ))}
      </div>
    </section>
  );
}