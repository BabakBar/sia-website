import { posts } from '../src/content/posts';
import { BLOG_META, SITE_URL } from '../src/lib/seo';

export interface PageMeta {
  path: string; // route path, e.g. '/blog/hello-world'
  title: string;
  description: string;
}

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

export function buildPages(): PageMeta[] {
  return [
    { path: '/blog', ...BLOG_META },
    ...posts.map((post) => ({
      path: `/blog/${post.slug}`,
      title: `${post.title} | Babak Barghi`,
      description: post.description,
    })),
  ];
}

export function renderRouteHtml(template: string, page: PageMeta): string {
  const title = escapeHtml(page.title);
  const description = escapeHtml(page.description);
  const url = `${SITE_URL}${page.path}`;

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
    stampContent('property="twitter:title"', title),
    stampContent('property="twitter:description"', description),
  ];

  return transforms.reduce((html, transform) => transform(html), template);
}

export function renderSitemap(paths: string[]): string {
  const urls = paths
    .map((p) => `  <url>\n    <loc>${SITE_URL}${p}</loc>\n  </url>`)
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}
