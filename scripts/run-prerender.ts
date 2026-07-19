import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildPages, renderRouteHtml, renderSitemap } from './prerender';

const dist = fileURLToPath(new URL('../dist', import.meta.url));

const template = await readFile(path.join(dist, 'index.html'), 'utf8');
const pages = buildPages();

for (const page of pages) {
  const dir = path.join(dist, page.path.slice(1));
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, 'index.html'), renderRouteHtml(template, page));
}

await writeFile(
  path.join(dist, 'sitemap.xml'),
  renderSitemap(['/', ...pages.map((p) => p.path)])
);

console.log(`prerendered ${pages.length} routes + sitemap.xml`);
