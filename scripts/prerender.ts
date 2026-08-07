import { posts } from '../src/content/posts';
import { BLOG_META, SITE_URL, buildArticleJsonLd, serializeJsonLd } from '../src/lib/seo';

export interface PageMeta {
  path: string; // route path, e.g. '/blog/my-post'
  title: string;
  description: string;
  headline?: string;
  type?: 'website' | 'article';
  publishedAt?: string;
  updatedAt?: string;
}

const HOME_PAGE: PageMeta = {
  path: '/',
  title: 'Babak Barghi',
  description: 'Babak Barghi — Cloud & AI Engineer. Architecting intelligent systems.',
};

export const NOT_FOUND_PAGE: PageMeta = {
  path: '/404.html',
  title: 'Page not found | Babak Barghi',
  description: HOME_PAGE.description,
};

function escapeHtml(value: string): string {
  return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
}

export function buildPages(): PageMeta[] {
  return [
    HOME_PAGE,
    { path: '/blog', ...BLOG_META },
    ...posts.map(post => ({
      path: `/blog/${post.slug}`,
      title: `${post.title} | Babak Barghi`,
      headline: post.title,
      description: post.description,
      type: 'article' as const,
      publishedAt: post.publishedAt,
      updatedAt: post.updatedAt,
    })),
  ];
}

function renderArticleHead(page: PageMeta, url: string): string {
  if (page.type !== 'article' || !page.headline || !page.publishedAt) {
    return '';
  }

  const publishedAt = escapeHtml(page.publishedAt);
  const updatedAt = escapeHtml(page.updatedAt ?? page.publishedAt);
  const articleJsonLd = serializeJsonLd(
    buildArticleJsonLd({
      headline: page.headline,
      description: page.description,
      url,
      publishedAt: page.publishedAt,
      updatedAt: page.updatedAt,
    })
  );

  return `
    <meta property="article:published_time" content="${publishedAt}" />
    <meta property="article:modified_time" content="${updatedAt}" />
    <script type="application/ld+json">${articleJsonLd}</script>`;
}

export function renderRouteHtml(template: string, page: PageMeta, applicationHtml: string): string {
  const title = escapeHtml(page.title);
  const description = escapeHtml(page.description);
  const url = `${SITE_URL}${page.path}`;
  const articleHead = renderArticleHead(page, url);

  const stampContent = (attr: string, value: string) => (html: string) =>
    html.replace(
      new RegExp(`(<meta ${attr} content=")[^"]*(")`),
      (_match, before: string, after: string) => `${before}${value}${after}`
    );

  const transforms = [
    (html: string) => html.replace(/<title>[^<]*<\/title>/, () => `<title>${title}</title>`),
    (html: string) =>
      html.replace(
        /(<link rel="canonical" href=")[^"]*(")/,
        (_match, before: string, after: string) => `${before}${url}${after}`
      ),
    // description gets data-rh so client-side Helmet reconciles this tag
    // instead of appending a duplicate
    (html: string) =>
      html.replace(
        /<meta name="description" content="[^"]*" ?\/>/,
        () => `<meta name="description" content="${description}" data-rh="true" />`
      ),
    stampContent('property="og:title"', title),
    stampContent('property="og:description"', description),
    stampContent('property="og:url"', url),
    stampContent('property="og:type"', page.type ?? 'website'),
    stampContent('property="twitter:title"', title),
    stampContent('property="twitter:description"', description),
    (html: string) => (articleHead ? html.replace('</head>', `${articleHead}\n  </head>`) : html),
    (html: string) => html.replace('<div id="root"></div>', () => `<div id="root">${applicationHtml}</div>`),
  ];

  return transforms.reduce((html, transform) => transform(html), template);
}

export function renderSitemap(paths: string[]): string {
  const urls = paths.map(p => `  <url>\n    <loc>${SITE_URL}${p}</loc>\n  </url>`).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}
