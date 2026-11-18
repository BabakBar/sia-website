import { describe, expect, it } from 'vitest';
import { renderRoute } from '../entry-server';

describe('static route rendering', () => {
  it('renders the existing homepage writing without browser JavaScript', async () => {
    const html = await renderRoute('/');

    expect(html).toContain('Hi, I&#x27;m Babak');
    expect(html).toContain('Cloud Architect');
    expect(html).toContain('Salesforce–Azure–SAP integration');
    expect(html).toContain('Books I Keep Recommending');
    expect(html).toContain('BoringHannover');
    expect(html).toContain('FabrikTakt');
    expect(html).toContain('Explore my work');
    expect(html).not.toContain('Enterprise data foundations');
    expect(html).not.toContain('Popular repositories');
    expect(html).not.toContain('openlibrary.org');
    expect(html).not.toContain('api.github.com');
  });

  it('keeps the full enterprise background on About', async () => {
    const html = await renderRoute('/about');
    expect(html).toContain('About me');
    expect(html).toContain('Salesforce–Azure–SAP');
    expect(html).toContain('57 countries');
    expect(html).toContain('India, and Malaysia');
  });

  it('renders the blog index without browser JavaScript', async () => {
    const html = await renderRoute('/blog');

    expect(html).toContain('Posts');
  });

  it('renders the existing not-found page for the static error document', async () => {
    const html = await renderRoute('/404.html');

    expect(html).toContain('Page not found');
    expect(html).toContain('Nothing lives at this URL.');
  });
});
