import { describe, expect, it } from 'vitest';
import { buildPages, NOT_FOUND_PAGE, renderRouteHtml, renderSitemap } from '../../scripts/prerender';
import { posts } from '../content/posts';

const template = `<html><head><title>Babak Barghi</title>
<meta name="description" content="OLD-DESC" />
<link rel="canonical" href="https://www.babakbarghi.com/" />
<meta property="og:type" content="website" />
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
        path: '/blog/telegram-is-the-cheapest-frontend-i-know',
        title: 'Telegram Is the Cheapest Frontend I Know | Babak Barghi',
        headline: 'Telegram Is the Cheapest Frontend I Know',
        description: 'Why I keep reaching for a Telegram bot before building a web interface.',
        type: 'article',
        publishedAt: '2026-07-28',
      },
      '<main><h1>Telegram Is the Cheapest Frontend I Know</h1></main>'
    );

    expect(html).toContain('<title>Telegram Is the Cheapest Frontend I Know | Babak Barghi</title>');
    expect(html).toContain(
      '<link rel="canonical" href="https://www.babakbarghi.com/blog/telegram-is-the-cheapest-frontend-i-know" />'
    );
    expect(html).toContain(
      '<meta property="og:url" content="https://www.babakbarghi.com/blog/telegram-is-the-cheapest-frontend-i-know" />'
    );
    expect(html).toContain('<meta property="og:type" content="article" />');
    expect(html).toContain('<meta property="article:published_time" content="2026-07-28" />');
    expect(html).toContain('"@type":"Article"');
    expect(html).toContain('"name":"Babak Barghi"');
    expect(html).toContain('"datePublished":"2026-07-28"');
    expect(html).not.toContain('OLD-DESC');
    expect(html).toContain(
      '<meta property="twitter:title" content="Telegram Is the Cheapest Frontend I Know | Babak Barghi" />'
    );
    // description is Helmet-managed: stamped with data-rh so hydration
    // reconciles it instead of duplicating it
    expect(html).toContain(
      '<meta name="description" content="Why I keep reaching for a Telegram bot before building a web interface." data-rh="true" />'
    );
    expect(html.match(/name="description"/g)).toHaveLength(1);
    expect(html.match(/<title>/g)).toHaveLength(1);
    expect(html).toContain('<div id="root"><main><h1>Telegram Is the Cheapest Frontend I Know</h1></main></div>');
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
  it('includes the homepage, blog index, and one page per published post', () => {
    const pages = buildPages();
    expect(pages[0].path).toBe('/');
    expect(pages.some(p => p.path === '/blog')).toBe(true);
    expect(pages.filter(p => p.type === 'article')).toHaveLength(posts.length);

    for (const post of posts) {
      const page = pages.find(p => p.path === `/blog/${post.slug}`)!;
      expect(page.title).toBe(`${post.title} | Babak Barghi`);
      expect(page.type).toBe('article');
      expect(page.publishedAt).toBe(post.publishedAt);
      expect(page.description.length).toBeGreaterThan(0);
    }
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
