import { describe, expect, it } from 'vitest';
import { renderRoute } from '../entry-server';

describe('static route rendering', () => {
  it('renders the existing homepage writing without browser JavaScript', async () => {
    const html = await renderRoute('/');

    expect(html).toContain('Hi, I&#x27;m Babak');
    expect(html).toContain('Cloud Architect');
    expect(html).toContain('Salesforce–Azure–SAP integration');
    expect(html).toContain('Books I Keep Recommending');
  });

  it('renders the complete MDX post into static HTML', async () => {
    const html = await renderRoute('/blog/telegram-is-the-cheapest-frontend-i-know');

    expect(html).toContain('<h1');
    expect(html).toContain('Telegram Is the Cheapest Frontend I Know');
    expect(html).toContain('Most of my useful side projects');
    expect(html).toContain('KinoWeek');
    expect(html).toContain('FabrikTakt');
    expect(html).toContain('OpenClaw');
  });

  it('renders the existing not-found page for the static error document', async () => {
    const html = await renderRoute('/404.html');

    expect(html).toContain('Page not found');
    expect(html).toContain('Nothing lives at this URL.');
  });
});
