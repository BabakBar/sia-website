import { describe, expect, it } from 'vitest';
import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import { buildPaths, renderRouteHtml, renderSitemap } from '../../scripts/prerender';
import PageMetadata from '../components/layout/PageMetadata';
import { posts } from '../content/posts';
import { renderRoute } from '../entry-server';

const template = '<html><head><meta charset="utf-8"></head><body><div id="root"></div></body></html>';

describe('renderRouteHtml', () => {
  it('puts route metadata in the document head and keeps the prerendered page in the root', async () => {
    const html = renderRouteHtml(template, await renderRoute('/blog'));
    const [head, body] = html.split('</head>');

    expect(head).toContain('<title>Blog | Babak Barghi</title>');
    expect(head).toContain('<link rel="canonical" href="https://www.babakbarghi.com/blog"');
    expect(head).toContain('content="Field notes on practical AI');
    expect(head.match(/name="description"/g)).toHaveLength(1);
    expect(head.match(/<title>/g)).toHaveLength(1);
    expect(body).toContain('<div id="root">');
    expect(body).toContain('No posts yet.');
  });

  it('exports escaped article metadata and safe JSON-LD for published posts', () => {
    const rendered = renderToString(
      createElement(
        'div',
        { id: 'root' },
        createElement(PageMetadata, {
          page: 'post',
          post: {
            slug: 'telegram-is-the-cheapest-frontend-i-know',
            title: 'Ops & "Data" <tools>',
            description: 'A & B',
            publishedAt: '2026-07-28',
            readTime: '5 min',
            component: () => import('../content/posts/telegram-as-the-fastest-frontend.mdx'),
          },
        })
      )
    );
    const html = renderRouteHtml(template, rendered);
    const [head] = html.split('</head>');
    expect(head).toContain('<title>Ops &amp; &quot;Data&quot; &lt;tools&gt; | Babak Barghi</title>');
    expect(head).toContain('name="description" content="A &amp; B"');
    expect(head).toContain('property="og:type" content="article"');
    expect(head).toContain('property="article:published_time" content="2026-07-28"');
    expect(head).toContain('property="article:modified_time" content="2026-07-28"');
    expect(html).toContain('"@type":"Article"');
    expect(html).toContain('"name":"Babak Barghi"');
    expect(html).toContain('\\u003ctools>');
  });
});

describe('buildPaths', () => {
  it('includes only public pages and published posts', () => {
    expect(buildPaths()).toEqual([
      '/',
      '/about',
      '/blog',
      ...posts.filter(post => !post.preview).map(post => `/blog/${post.slug}`),
    ]);
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
