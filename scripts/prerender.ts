import { posts } from '../src/content/posts';
import { SITE_URL } from '../src/lib/seo';

const outlet = '<div id="root">';

export function buildPaths(): string[] {
  return ['/', '/about', '/blog', ...posts.filter(post => !post.preview).map(post => `/blog/${post.slug}`)];
}

export function renderRouteHtml(template: string, rendered: string): string {
  // React serializes hoisted metadata and resource hints before the application root.
  const rootStart = rendered.indexOf(outlet);
  if (rootStart < 0 || !template.includes('</head>') || !template.includes(`${outlet}</div>`)) {
    throw new Error('Cannot join the prerendered route to the Vite document');
  }

  const head = rendered.slice(0, rootStart);
  const root = rendered.slice(rootStart);
  return template.replace('</head>', () => `${head}\n  </head>`).replace(`${outlet}</div>`, () => root);
}

export function renderSitemap(paths: string[]): string {
  const urls = paths.map(p => `  <url>\n    <loc>${SITE_URL}${p}</loc>\n  </url>`).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}
