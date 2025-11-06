import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import App from '../App';

describe('App', () => {
  it('renders without crashing', () => {
    render(
      <HelmetProvider>
        <App />
      </HelmetProvider>
    );

    // Simple smoke test - just verify app renders
    expect(screen.getByRole('main')).toBeDefined();
  });
});
