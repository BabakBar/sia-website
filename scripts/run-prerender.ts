import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer } from 'vite';
import { buildPages, NOT_FOUND_PAGE, renderRouteHtml, renderSitemap } from './prerender';

const root = fileURLToPath(new URL('..', import.meta.url));
const dist = fileURLToPath(new URL('../dist', import.meta.url));

const template = await readFile(path.join(dist, 'index.html'), 'utf8');
const pages = buildPages();
const vite = await createServer({
  root,
  appType: 'custom',
  logLevel: 'error',
  mode: 'production',
  server: { middlewareMode: true },
});

try {
  const serverEntry = await vite.ssrLoadModule('/src/entry-server.tsx');
  const renderRoute = serverEntry.renderRoute as (location: string) => Promise<string>;

  for (const page of pages) {
    const output =
      page.path === '/' ? path.join(dist, 'index.html') : path.join(dist, page.path.slice(1), 'index.html');

    await mkdir(path.dirname(output), { recursive: true });
    await writeFile(output, renderRouteHtml(template, page, await renderRoute(page.path)));
  }

  await writeFile(
    path.join(dist, '404.html'),
    renderRouteHtml(template, NOT_FOUND_PAGE, await renderRoute(NOT_FOUND_PAGE.path))
  );
} finally {
  await vite.close();
}

await writeFile(path.join(dist, 'sitemap.xml'), renderSitemap(pages.map(page => page.path)));

console.log(`prerendered ${pages.length} public routes + 404.html + sitemap.xml`);
