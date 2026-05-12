import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import App from '../App';

const mockFavoriteBooks = vi.hoisted(() => [
  {
    title: 'Algorithms to Live By',
    authors: ['Brian Christian', 'Tom Griffiths'],
    note: 'Turns computer science into daily decision-making.',
    coverUrl: 'https://covers.openlibrary.org/b/id/8042539-L.jpg',
    openLibraryUrl: 'https://openlibrary.org/works/OL17357767W',
  },
]);

vi.mock('@/lib/books', () => ({
  fetchFavoriteBooks: vi.fn().mockResolvedValue(mockFavoriteBooks),
  getFallbackFavoriteBooks: vi.fn(() => mockFavoriteBooks),
}));

beforeEach(() => {
  globalThis.localStorage?.clear?.();
});

describe('App', () => {
  it('renders without crashing', () => {
    render(
      <HelmetProvider>
        <App />
      </HelmetProvider>
    );

    expect(screen.getByRole('main')).toBeDefined();
  });

  it('renders the favorite books section', async () => {
    render(
      <HelmetProvider>
        <App />
      </HelmetProvider>
    );

    expect(
      screen.getByRole('heading', { name: /books i keep recommending/i })
    ).toBeTruthy();

    expect(
      await screen.findByRole('heading', { name: /algorithms to live by/i })
    ).toBeTruthy();
  });
});
