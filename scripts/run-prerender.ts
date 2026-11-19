import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer } from 'vite';
import { buildPaths, renderRouteHtml, renderSitemap } from './prerender';

const root = fileURLToPath(new URL('..', import.meta.url));
const dist = fileURLToPath(new URL('../dist', import.meta.url));

const template = await readFile(path.join(dist, 'index.html'), 'utf8');
const paths = buildPaths();
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

  for (const route of paths) {
    const output = path.join(dist, route.slice(1), 'index.html');

    await mkdir(path.dirname(output), { recursive: true });
    await writeFile(output, renderRouteHtml(template, await renderRoute(route)));
  }

  await writeFile(path.join(dist, '404.html'), renderRouteHtml(template, await renderRoute('/404.html')));
} finally {
  await vite.close();
}

await writeFile(path.join(dist, 'sitemap.xml'), renderSitemap(paths));

console.log(`prerendered ${paths.length} public routes + 404.html + sitemap.xml`);
