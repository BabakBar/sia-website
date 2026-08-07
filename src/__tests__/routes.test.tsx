import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import App from '../App';

vi.mock('@/lib/books', () => ({
  fetchFavoriteBooks: vi.fn().mockResolvedValue([]),
  getFallbackFavoriteBooks: vi.fn(() => []),
}));

beforeEach(() => {
  globalThis.localStorage?.clear?.();
});

function renderAt(path: string) {
  window.history.pushState({}, '', path);
  return render(
    <HelmetProvider>
      <App />
    </HelmetProvider>
  );
}

describe('routes', () => {
  it('renders the blog index at /blog', async () => {
    renderAt('/blog');
    expect(screen.getByRole('heading', { name: /posts/i })).toBeTruthy();
    // client Helmet must land on the same title the prerenderer stamps
    await waitFor(() => expect(document.title).toBe('Blog | Babak Barghi'));
  });

  it('renders a substantive post with article metadata', async () => {
    renderAt('/blog/telegram-is-the-cheapest-frontend-i-know');
    expect(
      await screen.findByRole('heading', {
        name: /telegram is the cheapest frontend i know/i,
      })
    ).toBeTruthy();
    await waitFor(() => {
      expect(document.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe(
        'https://www.babakbarghi.com/blog/telegram-is-the-cheapest-frontend-i-know'
      );
      expect(document.querySelector('meta[property="og:type"]')?.getAttribute('content')).toBe('article');
      expect(document.querySelector('script[type="application/ld+json"]')?.textContent).toContain('"@type":"Article"');
    });
  });

  it('renders a not-found page for unknown paths', () => {
    renderAt('/does-not-exist');
    expect(screen.getByRole('heading', { name: /page not found/i })).toBeTruthy();
  });
});
