// @vitest-environment node
import { describe, expect, it } from 'vitest';
import process from 'node:process';
import { SITE_URL } from '../lib/seo';

const baseUrl = process.env.SMOKE_BASE_URL;
const request = (path: string) => fetch(new URL(path, baseUrl), { signal: AbortSignal.timeout(15_000) });

describe.runIf(Boolean(baseUrl))('real HTTP serving contract', () => {
  it('serves current content and canonical metadata on every public route', async () => {
    for (const [path, text] of [
      ['/', 'Selected work'],
      ['/about', 'About me'],
      ['/blog', 'Posts'],
    ]) {
      const response = await request(path);
      expect(response.status, path).toBe(200);
      expect(response.headers.get('content-type'), path).toContain('text/html');
      const html = await response.text();
      expect(html, path).toContain(text);
      expect(html, path).toContain(`rel="canonical" href="${SITE_URL}${path}"`);
      expect(html, path).toContain(`content="${SITE_URL}/og-image.png"`);
      if (path === '/') {
        expect(html).toContain('BoringHannover');
        expect(html).toContain('FabrikTakt');
        expect(html).not.toContain('Enterprise data foundations');
      }
      if (path === '/about') {
        const blocks = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)];
        const schema = blocks.map(block => JSON.parse(block[1])).find(item => item['@type'] === 'ProfilePage');
        expect(schema?.mainEntity['@id']).toBe(`${SITE_URL}/#person`);
        expect(schema?.mainEntity.jobTitle).toBe('Cloud Architect');
      }
    }
  }, 20_000);

  it('returns real 404s for an unknown page and a missing asset', async () => {
    for (const path of ['/release-check-missing-page', '/assets/release-check-missing.js']) {
      const response = await request(path);
      expect(response.status, path).toBe(404);
      expect(await response.text(), path).toContain('Nothing lives at this URL.');
    }
  }, 20_000);

  it('serves valid JavaScript from the first-party analytics proxy', async () => {
    const response = await request('/s/t.js');
    expect(response.status).toBe(200);
    expect(response.headers.get('content-type')).toMatch(/javascript/);
    const script = await response.text();
    expect(script).not.toContain('<!doctype');
    expect(script.length).toBeGreaterThan(1000);
    expect(() => new Function(script)).not.toThrow();
  }, 20_000);

  it('serves the social image and includes About in the sitemap', async () => {
    const image = await request('/og-image.png');
    expect(image.status).toBe(200);
    expect(image.headers.get('content-type')).toContain('image/png');
    const sitemap = await request('/sitemap.xml');
    expect(sitemap.status).toBe(200);
    expect(await sitemap.text()).toContain(`<loc>${SITE_URL}/about</loc>`);
    if (process.env.SMOKE_EXPECTED_REVISION) {
      const revision = await request('/revision.txt');
      expect(revision.status).toBe(200);
      expect(revision.headers.get('cache-control')).toContain('no-store');
      expect((await revision.text()).trim()).toBe(process.env.SMOKE_EXPECTED_REVISION);
    }
  }, 20_000);
});
