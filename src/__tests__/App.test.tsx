import { beforeEach, describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import App from '../App';

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

    expect(screen.getByRole('heading', { name: /books i keep recommending/i })).toBeTruthy();

    expect(await screen.findByRole('heading', { name: /algorithms to live by/i })).toBeTruthy();
  });

  it('serves the presentation photo responsively with stable dimensions', () => {
    render(
      <HelmetProvider>
        <App />
      </HelmetProvider>
    );

    const image = screen.getByAltText('Babak presenting at DevCord');

    expect(image.getAttribute('srcset')).toContain('/IMG-website_edited-384.webp 384w');
    expect(image.getAttribute('sizes')).toBe('(min-width: 768px) 192px, calc(100vw - 3rem)');
    expect(image.getAttribute('width')).toBe('2268');
    expect(image.getAttribute('height')).toBe('3083');
  });
});
