import { beforeEach, describe, expect, it } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';

beforeEach(() => {
  globalThis.localStorage?.clear?.();
});

function renderAt(path: string) {
  window.history.pushState({}, '', path);
  return render(<App />);
}

describe('routes', () => {
  it('renders the blog index at /blog', async () => {
    renderAt('/blog');
    expect(screen.getByRole('heading', { name: /posts/i })).toBeTruthy();
    await waitFor(() => expect(document.title).toBe('Blog | Babak Barghi'));
    expect(document.head.querySelectorAll('title')).toHaveLength(1);
    expect(document.head.querySelectorAll('meta[name="description"]')).toHaveLength(1);
    expect(document.head.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe(
      'https://www.babakbarghi.com/blog'
    );
  });

  it('keeps unpublished posts on the same not-found page served by nginx', () => {
    renderAt('/blog/telegram-is-the-cheapest-frontend-i-know');
    expect(screen.getByRole('heading', { name: /page not found/i })).toBeTruthy();
    expect(document.head.querySelector('meta[name="robots"]')?.getAttribute('content')).toBe('noindex');
    expect(document.head.querySelector('link[rel="canonical"]')).toBeNull();
  });

  it('renders a not-found page for unknown paths', () => {
    renderAt('/does-not-exist');
    expect(screen.getByRole('heading', { name: /page not found/i })).toBeTruthy();
  });
});
