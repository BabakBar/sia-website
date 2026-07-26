import { describe, expect, it } from 'vitest';
import { buildPages, NOT_FOUND_PAGE, renderRouteHtml, renderSitemap } from '../../scripts/prerender';

const template = `<html><head><title>Babak Barghi</title>
<meta name="description" content="OLD-DESC" />
<link rel="canonical" href="https://www.babakbarghi.com/" />
<meta property="og:title" content="Babak Barghi" />
<meta property="og:description" content="OLD-DESC" />
<meta property="og:url" content="https://www.babakbarghi.com/" />
<meta property="twitter:title" content="Babak Barghi" />
<meta property="twitter:description" content="OLD-DESC" /></head>
<body><div id="root"></div></body></html>`;

describe('renderRouteHtml', () => {
  it('stamps metadata and injects the rendered page into the root', () => {
    const html = renderRouteHtml(
      template,
      {
        path: '/blog/hello-world',
        title: 'Hello World | Babak Barghi',
        description: 'Welcome to my blog.',
      },
      '<main><h1>Hello World</h1></main>'
    );

    expect(html).toContain('<title>Hello World | Babak Barghi</title>');
    expect(html).toContain('<link rel="canonical" href="https://www.babakbarghi.com/blog/hello-world" />');
    expect(html).toContain('<meta property="og:url" content="https://www.babakbarghi.com/blog/hello-world" />');
    expect(html).not.toContain('OLD-DESC');
    expect(html).toContain('<meta property="twitter:title" content="Hello World | Babak Barghi" />');
    // description is Helmet-managed: stamped with data-rh so hydration
    // reconciles it instead of duplicating it
    expect(html).toContain('<meta name="description" content="Welcome to my blog." data-rh="true" />');
    expect(html.match(/name="description"/g)).toHaveLength(1);
    expect(html.match(/<title>/g)).toHaveLength(1);
    expect(html).toContain('<div id="root"><main><h1>Hello World</h1></main></div>');
  });

  it('escapes HTML in metadata values', () => {
    const html = renderRouteHtml(
      template,
      {
        path: '/blog/x',
        title: 'Ops & "Data" <tools>',
        description: 'a & b',
      },
      '<main>Safe application HTML</main>'
    );

    expect(html).toContain('<title>Ops &amp; &quot;Data&quot; &lt;tools&gt;</title>');
    expect(html).toContain('content="a &amp; b"');
  });
});

describe('buildPages', () => {
  it('includes the homepage, blog index, and one page per post', () => {
    const pages = buildPages();
    expect(pages[0].path).toBe('/');
    expect(pages.some(p => p.path === '/blog')).toBe(true);
    expect(pages.some(p => p.path === '/blog/hello-world')).toBe(true);
    const post = pages.find(p => p.path === '/blog/hello-world')!;
    expect(post.title).toBe('Hello World | Babak Barghi');
    expect(post.description.length).toBeGreaterThan(0);
  });

  it('defines a dedicated static 404 page outside the sitemap', () => {
    expect(NOT_FOUND_PAGE.path).toBe('/404.html');
    expect(buildPages()).not.toContainEqual(NOT_FOUND_PAGE);
  });
});

describe('renderSitemap', () => {
  it('emits one loc per path with the site origin', () => {
    const xml = renderSitemap(['/', '/blog']);
    expect(xml).toContain('<loc>https://www.babakbarghi.com/</loc>');
    expect(xml).toContain('<loc>https://www.babakbarghi.com/blog</loc>');
    expect(xml.startsWith('<?xml version="1.0" encoding="UTF-8"?>')).toBe(true);
  });
});
