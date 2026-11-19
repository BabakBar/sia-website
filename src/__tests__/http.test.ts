// @vitest-environment node
import { describe, expect, it } from 'vitest';
import { randomUUID } from 'node:crypto';
import process from 'node:process';
import { SITE_URL } from '../lib/seo';

const baseUrl = process.env.SMOKE_BASE_URL;
const expectedRevision = process.env.SMOKE_EXPECTED_REVISION;
const smokeRun = randomUUID();
const request = (path: string) => {
  const url = new URL(path, baseUrl);
  url.searchParams.set('release-check', smokeRun);
  return fetch(url, { signal: AbortSignal.timeout(15_000) });
};

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
    for (const path of [
      '/release-check-missing-page',
      '/blog/release-check-missing-post',
      '/assets/release-check-missing.js',
    ]) {
      const response = await request(path);
      expect(response.status, path).toBe(404);
      expect(response.headers.get('cache-control'), path).toContain('no-store');
      const html = await response.text();
      expect(html, path).toContain('Nothing lives at this URL.');
      expect(html, path).toContain('<meta name="robots" content="noindex"');
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
    expect((await request('/s/api/send')).status).toBe(403);
  }, 20_000);

  it('serves security headers on documents, errors and the release endpoint', async () => {
    for (const route of ['/', '/release-check-missing-page', '/revision.txt']) {
      const { headers } = await request(route);
      expect(headers.get('content-security-policy'), route).toContain("script-src 'self'");
      expect(headers.get('content-security-policy'), route).toContain("frame-ancestors 'none'");
      expect(headers.get('strict-transport-security'), route).toBe('max-age=31536000');
      expect(headers.get('x-content-type-options'), route).toBe('nosniff');
      expect(headers.get('x-frame-options'), route).toBe('DENY');
      expect(headers.get('referrer-policy'), route).toBe('strict-origin-when-cross-origin');
      expect(headers.get('permissions-policy'), route).toContain('camera=()');
    }
  }, 20_000);

  it('serves the social image, sitemap and cacheable fingerprinted assets', async () => {
    const image = await request('/og-image.png');
    expect(image.status).toBe(200);
    expect(image.headers.get('content-type')).toContain('image/png');
    const sitemap = await request('/sitemap.xml');
    expect(sitemap.status).toBe(200);
    expect(await sitemap.text()).toContain(`<loc>${SITE_URL}/about</loc>`);
    const homepage = await (await request('/')).text();
    const assetPath = homepage.match(/<script type="module"[^>]*src="(\/assets\/[^"]+\.js)"/)?.[1];
    expect(assetPath).toBeDefined();
    const asset = await request(assetPath!);
    expect(asset.status).toBe(200);
    expect(asset.headers.get('cache-control')).toContain('immutable');
  }, 20_000);

  it.runIf(Boolean(expectedRevision))('serves the expected public revision', async () => {
    const revisionUrl = new URL('/revision.txt', baseUrl);

    // A public request can briefly return the previous revision after the deploy probe first sees the new one.
    await expect
      .poll(async () => {
        revisionUrl.searchParams.set('release', randomUUID());
        const revision = await fetch(revisionUrl, {
          headers: { 'Cache-Control': 'no-cache' },
          signal: AbortSignal.timeout(5_000),
        });
        expect(revision.status).toBe(200);
        expect(revision.headers.get('cache-control')).toContain('no-store');
        return (await revision.text()).trim();
      }, { interval: 1_000, timeout: 20_000 })
      .toBe(expectedRevision);
  }, 30_000);
});
