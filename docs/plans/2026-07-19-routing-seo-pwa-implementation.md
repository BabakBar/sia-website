# Routing, SEO, and PWA-Removal Implementation Plan

> **For agentic workers (codex):** Execute tasks in order, step by step. Steps use
> checkbox (`- [ ]`) syntax for tracking. Every code block is the complete intended
> content — do not improvise beyond it. Run every verification command and compare
> against the stated expected output before moving on. Commit exactly where the plan
> says to commit.

**Goal:** Make every public route directly reachable (no nginx 404s), give the blog
real per-route HTML metadata and a generated sitemap, remove the PWA service worker
safely, and harden client-side caching — without migrating frameworks.

**Architecture:** Keep the Vite 7 + React 19 + MDX SPA. Fix direct-route 404s with a
Coolify/nginx history fallback. Add a post-build prerender step (run by Bun) that
stamps per-route `<title>`/meta/OG tags into copies of `dist/index.html` and
generates `sitemap.xml` from the posts collection in `src/content/posts/index.ts`.
The PWA plugin is removed; a self-destroying `public/sw.js` kill switch un-bricks
returning visitors who still have the old service worker.

**Tech Stack:** Bun 1.2, Vite 7, React 19, react-router 7 (library mode), MDX,
Tailwind 4 (PostCSS), Vitest 4 + Testing Library, react-helmet-async. Deploy: GitHub
Actions → Coolify webhook → Nixpacks static site (nginx) behind Cloudflare.

**Decisions already made (do not relitigate):**
- No HashRouter. No Docker/nginx files in the repo. No Astro / React Router
  framework-mode migration — prerender script on the current stack (Sia's call).
- PWA is removed entirely (Sia's call). The removal is **already applied to the
  working tree** — Task 1 verifies and ships it.
- Publishing blog content is out of scope for this plan.

**Verified facts (from live-site investigation, 2026-07-19):**
- Production serves `/` 200; `/blog` and `/blog/hello-world` returned nginx 404
  from the origin (`nginx/1.31.2` behind Cloudflare) before the Coolify fix.
  **UPDATE 2026-07-19: the Coolify SPA fallback is applied and verified — all
  three routes return `200 text/html`. See the Verification log.**
- Coolify app: Nixpacks static site, build `bun run build`, publish dir `/dist`,
  SPA checkbox now checked, `try_files` now falls back to `/index.html`.
- Live `/sw.js` still serves the OLD Workbox worker with
  `cache-control: max-age=14400` — returning browsers may take up to ~4 h after
  the Task 1 deploy to fetch the kill switch. Registered workers update by
  fetching `/sw.js` (no query string), so `?cb=` checks verify the CDN only,
  never the service-worker update path.
- The old service worker (`NavigationRoute(createHandlerBoundToURL("index.html"))`)
  masks routing bugs and stale deploys for returning visitors. All live-site
  verification MUST use `curl` or an incognito window, never a normal browser tab.
- `src/globals.css` line 2 is `@config "../tailwind.config.js"` — so
  `tailwind.config.js` is LIVE and `tailwind.config.ts` is dead. Never delete the
  `.js` one.
- `public/BB-favicon.jpg` and `public/og-image.svg` are inputs to
  `scripts/generate-assets.mjs` — keep them. `public/file.svg`, `public/globe.svg`,
  `public/window.svg` are referenced nowhere — dead.

---

### Task 1: Ship the already-applied PWA removal

The working tree already contains (uncommitted): `vite.config.ts` with the VitePWA
import and plugin block deleted, `package.json`/`bun.lock` with `vite-plugin-pwa`
removed, and a new kill-switch `public/sw.js`. Your job is to verify and ship it.

**Files:**
- Already modified: `vite.config.ts`, `package.json`, `bun.lock`
- Already created: `public/sw.js`
- Modify: `README.md` (remove the vite-plugin-pwa line)
- Commit also: `docs/plans/2026-07-19-routing-seo-pwa-implementation.md` (this file)

- [ ] **Step 1: Confirm the expected diff**

Run: `git status --short`
Expected: modified `vite.config.ts`, `package.json`, `bun.lock`; untracked
`public/sw.js` and this plan file. If anything else appears, stop and ask Sia.

- [ ] **Step 2: Confirm the kill switch content**

`public/sw.js` must be exactly:

```js
// Kill switch for the removed PWA service worker. Visitors who installed the
// old worker fetch this file on their next visit; it clears all caches,
// unregisters itself, and reloads open tabs so they get live content again.
// Keep this file deployed at /sw.js for several months before deleting it.
self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(keys.map((key) => caches.delete(key)));
      await self.registration.unregister();
      const clients = await self.clients.matchAll({ type: 'window' });
      clients.forEach((client) => client.navigate(client.url));
    })()
  );
});
```

Rationale: once the SPA fallback (Task 2) is live, a *missing* `/sw.js` would be
answered with `index.html` (HTML, wrong MIME). The browser's service-worker update
would silently fail and old visitors would be stuck on the cached site forever. A
404 would unregister, but the fallback prevents 404s — hence a real file that
self-destructs.

- [ ] **Step 3: Update the README**

In `README.md`, delete this line from the Tech Stack list (the site no longer
ships a PWA):

```
- **PWA**: vite-plugin-pwa
```

- [ ] **Step 4: Build and test**

Run: `rm -rf dist && bun run build && bun run test`
Expected: build succeeds; `2 passed` tests. `dist/` must contain `sw.js` (the kill
switch) and must NOT contain `manifest.webmanifest`, `registerSW.js`, or any
`workbox-*.js`.

Verify: `ls dist | grep -E 'workbox|manifest|registerSW'` → no output.
Verify: `head -2 dist/sw.js` → the kill-switch comment.

- [ ] **Step 5: Commit and push**

```bash
git add vite.config.ts package.json bun.lock public/sw.js README.md docs/plans/2026-07-19-routing-seo-pwa-implementation.md
git commit -m "feat: remove PWA, ship self-destroying service worker kill switch"
git push
```

- [ ] **Step 6: Verify the deploy landed (CDN path)**

Wait for the GitHub Actions "Deploy" run to succeed (`gh run watch` or
`gh run list --limit 1`), give Coolify ~2 minutes to rebuild, then:

Run: `curl -s "https://www.babakbarghi.com/sw.js?cb=$(date +%s)" | head -2`
Expected: the kill-switch comment ("Kill switch for the removed PWA…"), not
workbox code. The `?cb=` query busts Cloudflare's cache — keep using it in all
live checks. NOTE: this proves the file is deployed, not that old workers
update — registered workers fetch plain `/sw.js`, which is cached with
`max-age=14400`, so returning browsers may lag the deploy by up to ~4 h.

- [ ] **Step 7: Verify old-worker cleanup in a real browser (Sia)**

In a browser profile that has previously visited the site (not incognito):
1. Open https://www.babakbarghi.com/ and reload once or twice.
2. DevTools → Application → Service Workers: expect NO registered worker
   (if the old one is still listed, the 4 h `max-age` on `/sw.js` hasn't
   elapsed — retry later rather than concluding failure).
3. DevTools → Application → Cache Storage: expect empty (workbox caches gone).
4. Load https://www.babakbarghi.com/blog directly in that same profile —
   expect the blog page, served live.

Record the result in the Verification log.

---

### Task 2: Coolify SPA fallback — ALREADY APPLIED 2026-07-19

**Files:** none in the repo — this was Coolify dashboard configuration.

Sia has already applied this: SPA checkbox checked, `try_files` fallback to
`/index.html`, saved and restarted. Verified same day (see Verification log).
Do not change the Coolify configuration further. The steps below remain only as
the re-verification recipe if routing ever regresses.

- [x] **Step 1: Apply the Coolify change** — done by Sia 2026-07-19:
SPA checkbox + `try_files` line ending in `/index.html;` instead of `=404;`,
Save, Restart.

- [x] **Step 2: Verify origin routing**

Run:
```bash
for p in / /blog /blog/hello-world /sw.js; do
  printf '%-24s' "$p"
  curl -s -o /dev/null -w "%{http_code} %{content_type}\n" "https://www.babakbarghi.com$p?cb=$(date +%s)"
done
```
Expected:
```
/                       200 text/html
/blog                   200 text/html
/blog/hello-world       200 text/html
/sw.js                  200 ... javascript ...
```
`/sw.js` must NOT come back as `text/html` — if it does, the fallback is swallowing
real files and the nginx line was edited incorrectly. Note: `/some-garbage-path`
returning 200 with the app shell is expected SPA-fallback behavior; Task 5 adds a
user-visible 404 page for that case.

- [x] **Step 3: Record verification** — recorded in the Verification log below
(ships with the Task 1 commit; no separate commit needed).

---

### Task 3: MDX support in Vitest config

Route tests in Task 5 render a lazy-loaded `.mdx` post; the current
`vitest.config.ts` has no MDX plugin, so that import would fail to transform.

**Files:**
- Modify: `vitest.config.ts`

- [ ] **Step 1: Update vitest.config.ts**

Replace the full contents of `vitest.config.ts` with:

```ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import mdx from '@mdx-js/rollup';
import path from 'path';

export default defineConfig({
  plugins: [
    {
      enforce: 'pre',
      ...mdx({ providerImportSource: '@mdx-js/react' }),
    },
    react({ include: /\.(jsx|js|mdx|md|tsx|ts)$/ }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/vitest.setup.ts'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

(No `rehype-pretty-code` here on purpose — syntax-highlighting themes are
irrelevant to tests and slow them down.)

- [ ] **Step 2: Verify existing tests still pass**

Run: `bun run test`
Expected: `2 passed`.

- [ ] **Step 3: Commit**

```bash
git add vitest.config.ts
git commit -m "test: support MDX imports in vitest"
```

---

### Task 4: Prerender script + generated sitemap

Generates `dist/blog/index.html` and `dist/blog/<slug>/index.html` with per-route
`<title>`, meta description, canonical, OG, and Twitter tags stamped into the
built shell, plus `dist/sitemap.xml` derived from the posts collection. Full
body-HTML SSR is a deliberate non-goal for now: metadata in the initial HTML is
what crawlers and social bots need, and it avoids SSR pitfalls with lazy MDX.

**Files:**
- Create: `src/lib/seo.ts` (shared constants — single source of truth for values
  used by both client Helmet and the prerender script)
- Create: `scripts/prerender.ts` (pure functions — imported by tests, typechecked)
- Create: `scripts/run-prerender.ts` (Bun entry point — never imported from `src`,
  so `tsc` ignores it; keep Bun-specific APIs only here)
- Create: `src/__tests__/prerender.test.ts`
- Modify: `src/pages/Blog.tsx` (add page-level Helmet)
- Modify: `package.json` (build script)
- Delete: `public/sitemap.xml` (replaced by generated `dist/sitemap.xml`)

**Metadata ownership model (do not deviate):**
- `<title>` and the description meta are owned by page-level Helmet — Layout
  provides the generic default, Blog/Post override it. Prerendering stamps
  matching values into the initial HTML and marks the description with
  `data-rh="true"` so react-helmet-async *reconciles* it on hydration instead of
  appending a duplicate. Client and stamped values MUST match — that's why both
  read from `src/lib/seo.ts` / the posts collection.
- Canonical, OG, and Twitter tags are static-only: no page renders them via
  Helmet, so Helmet never touches them and the per-route stamped values survive
  hydration. Do NOT add `data-rh` to them — Helmet removes marked tags it doesn't
  itself render. Consequence: client-side navigation doesn't update canonical/OG.
  Crawlers and social bots fetch URLs directly and never navigate client-side, so
  this is an accepted SPA compromise.

- [ ] **Step 1: Write the failing test**

Create `src/__tests__/prerender.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { buildPages, renderRouteHtml, renderSitemap } from '../../scripts/prerender';

const template = `<title>Babak Barghi</title>
<meta name="description" content="OLD-DESC" />
<link rel="canonical" href="https://www.babakbarghi.com/" />
<meta property="og:title" content="Babak Barghi" />
<meta property="og:description" content="OLD-DESC" />
<meta property="og:url" content="https://www.babakbarghi.com/" />
<meta property="twitter:title" content="Babak Barghi" />
<meta property="twitter:description" content="OLD-DESC" />`;

describe('renderRouteHtml', () => {
  it('stamps title, description, canonical, OG, and twitter tags', () => {
    const html = renderRouteHtml(template, {
      path: '/blog/hello-world',
      title: 'Hello World | Babak Barghi',
      description: 'Welcome to my blog.',
    });

    expect(html).toContain('<title>Hello World | Babak Barghi</title>');
    expect(html).toContain(
      '<link rel="canonical" href="https://www.babakbarghi.com/blog/hello-world" />'
    );
    expect(html).toContain(
      '<meta property="og:url" content="https://www.babakbarghi.com/blog/hello-world" />'
    );
    expect(html).not.toContain('OLD-DESC');
    expect(html).toContain('<meta property="twitter:title" content="Hello World | Babak Barghi" />');
    // description is Helmet-managed: stamped with data-rh so hydration
    // reconciles it instead of duplicating it
    expect(html).toContain(
      '<meta name="description" content="Welcome to my blog." data-rh="true" />'
    );
    expect(html.match(/name="description"/g)).toHaveLength(1);
    expect(html.match(/<title>/g)).toHaveLength(1);
  });

  it('escapes HTML in metadata values', () => {
    const html = renderRouteHtml(template, {
      path: '/blog/x',
      title: 'Ops & "Data" <tools>',
      description: 'a & b',
    });

    expect(html).toContain('<title>Ops &amp; &quot;Data&quot; &lt;tools&gt;</title>');
    expect(html).toContain('content="a &amp; b"');
  });
});

describe('buildPages', () => {
  it('includes the blog index and one page per post', () => {
    const pages = buildPages();
    expect(pages[0].path).toBe('/blog');
    expect(pages.some((p) => p.path === '/blog/hello-world')).toBe(true);
    const post = pages.find((p) => p.path === '/blog/hello-world')!;
    expect(post.title).toBe('Hello World | Babak Barghi');
    expect(post.description.length).toBeGreaterThan(0);
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
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `bunx vitest run src/__tests__/prerender.test.ts`
Expected: FAIL — cannot resolve `../../scripts/prerender`.

- [ ] **Step 3: Write the SEO constants, the pure module, and Blog's Helmet**

Create `src/lib/seo.ts`:

```ts
export const SITE_URL = 'https://www.babakbarghi.com';

export const BLOG_META = {
  title: 'Blog | Babak Barghi',
  description:
    'Writing on cloud architecture, data platforms, and side projects.',
};
```

Create `scripts/prerender.ts`:

```ts
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
    // instead of appending a duplicate (see metadata ownership model above)
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
```

Notes: replacer *functions* (not replacement strings) are required so `$` in
content can never be interpreted as a regex backreference. Importing
`../src/content/posts` is safe here — its MDX imports are lazy thunks that are
never called by the script, and Bun resolves the `@/types` path alias from
tsconfig.

Replace the full contents of `src/pages/Blog.tsx` with (adds the Helmet block so
client-side title/description match the stamped values — without this, Layout's
generic Helmet overwrites them as soon as React hydrates):

```tsx
import { Helmet } from 'react-helmet-async';
import { posts } from '@/content/posts';
import PostItem from '@/components/ui/PostItem';
import { BLOG_META } from '@/lib/seo';

export default function Blog() {
  const sortedPosts = [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div>
      <Helmet>
        <title>{BLOG_META.title}</title>
        <meta name="description" content={BLOG_META.description} />
      </Helmet>
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-8">Posts</h1>
      {sortedPosts.length === 0 ? (
        <p className="text-muted">No posts yet.</p>
      ) : (
        <div className="divide-y divide-muted/20">
          {sortedPosts.map((post) => (
            <PostItem key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
```

(`src/pages/Post.tsx` already sets `{post.title} | Babak Barghi` + the post
description via Helmet — identical to the stamped values; leave it as is.)

- [ ] **Step 4: Run the test to verify it passes**

Run: `bunx vitest run src/__tests__/prerender.test.ts`
Expected: PASS (4 tests).

Also run: `bunx tsc --noEmit` — expected: no errors (the test file pulls
`scripts/prerender.ts` into the typechecked program; that's intentional).

- [ ] **Step 5: Write the runner**

Create `scripts/run-prerender.ts`:

```ts
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
```

- [ ] **Step 6: Wire it into the build and retire the static sitemap**

In `package.json`, change the build script line:

```json
"build": "tsc && vite build && bun scripts/run-prerender.ts",
```

Then: `git rm public/sitemap.xml`
(The generated `dist/sitemap.xml` replaces it. If it stayed, Vite would copy the
stale file into `dist/` and the ordering of copy-vs-generate would be an invisible
trap. `public/robots.txt` stays — it already points at `/sitemap.xml`.)

- [ ] **Step 7: Verify the build output**

Run: `rm -rf dist && bun run build`
Expected final line: `prerendered 2 routes + sitemap.xml`

Verify:
```bash
grep -o '<title>[^<]*</title>' dist/blog/index.html dist/blog/hello-world/index.html
grep -c '<loc>' dist/sitemap.xml
```
Expected:
```
dist/blog/index.html:<title>Blog | Babak Barghi</title>
dist/blog/hello-world/index.html:<title>Hello World | Babak Barghi</title>
3
```

- [ ] **Step 8: Run the full test suite**

Run: `bun run test`
Expected: all tests pass.

- [ ] **Step 9: Commit**

```bash
git add scripts/prerender.ts scripts/run-prerender.ts src/__tests__/prerender.test.ts src/lib/seo.ts src/pages/Blog.tsx package.json
git commit -m "feat: prerender per-route metadata and generate sitemap from posts"
```

(`public/sitemap.xml` is not in the `git add` list on purpose — `git rm` in
Step 6 already staged its deletion.)

Note: once deployed, nginx serves these files *physically* (the `try_files`
chain hits `$uri/index.html` before the fallback), so direct loads of `/blog` and
posts no longer even rely on the SPA fallback. New posts added to
`src/content/posts/index.ts` automatically get a prerendered page and a sitemap
entry on the next build.

---

### Task 5: Route tests + catch-all 404 page

With the SPA fallback live, unknown URLs serve the shell and currently render a
blank page (no route matches). Add a NotFound route, plus direct-route tests.

**Files:**
- Create: `src/pages/NotFound.tsx`
- Create: `src/__tests__/routes.test.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: Write the failing tests**

Create `src/__tests__/routes.test.tsx`:

```tsx
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import App from '../App';

vi.mock('@/lib/books', () => ({
  fetchFavoriteBooks: vi.fn().mockResolvedValue([]),
  getFallbackFavoriteBooks: vi.fn(() => []),
}));

beforeEach(() => {
  globalThis.localStorage?.clear?.();
});

function renderAt(path: string) {
  window.history.pushState({}, '', path);
  return render(
    <HelmetProvider>
      <App />
    </HelmetProvider>
  );
}

describe('routes', () => {
  it('renders the blog index at /blog', async () => {
    renderAt('/blog');
    expect(screen.getByRole('heading', { name: /posts/i })).toBeTruthy();
    // client Helmet must land on the same title the prerenderer stamps
    await waitFor(() => expect(document.title).toBe('Blog | Babak Barghi'));
  });

  it('renders a post at /blog/hello-world', async () => {
    renderAt('/blog/hello-world');
    expect(
      await screen.findByRole('heading', { name: /hello world/i })
    ).toBeTruthy();
  });

  it('renders a not-found page for unknown paths', () => {
    renderAt('/does-not-exist');
    expect(
      screen.getByRole('heading', { name: /page not found/i })
    ).toBeTruthy();
  });
});
```

- [ ] **Step 2: Run tests to verify the expected failure**

Run: `bunx vitest run src/__tests__/routes.test.tsx`
Expected: `/blog` and `/blog/hello-world` tests PASS (they exercise existing
routes); the not-found test FAILS (no such heading). If the first two fail,
stop — Task 3's MDX config isn't working; do not proceed.

- [ ] **Step 3: Implement the NotFound page and route**

Create `src/pages/NotFound.tsx`:

```tsx
import { Link } from 'react-router';
import { Helmet } from 'react-helmet-async';

export default function NotFound() {
  return (
    <div>
      <Helmet>
        <title>Page not found | Babak Barghi</title>
      </Helmet>
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
        Page not found
      </h1>
      <p className="text-muted-light">
        Nothing lives at this URL.{' '}
        <Link to="/" className="text-foreground underline">
          Back to home
        </Link>
      </p>
    </div>
  );
}
```

In `src/App.tsx`, add the import and the catch-all route:

```tsx
import { BrowserRouter, Routes, Route } from 'react-router';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Blog from './pages/Blog';
import Post from './pages/Post';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="blog" element={<Blog />} />
          <Route path="blog/:slug" element={<Post />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
```

- [ ] **Step 4: Run the full suite**

Run: `bun run test`
Expected: all tests pass, including all three route tests.

- [ ] **Step 5: Commit**

```bash
git add src/pages/NotFound.tsx src/App.tsx src/__tests__/routes.test.tsx
git commit -m "feat: add catch-all 404 route with direct-route tests"
```

---

### Task 6: Harden localStorage cache parsing

`src/lib/github.ts:18` and `src/lib/books.ts:111` call `JSON.parse` on
localStorage values with no validation — one corrupted entry throws and breaks the
section render. Extract one validated reader both use.

**Files:**
- Create: `src/lib/cache.ts`
- Create: `src/__tests__/cache.test.ts`
- Modify: `src/lib/github.ts`, `src/lib/books.ts`

- [ ] **Step 1: Write the failing tests**

Create `src/__tests__/cache.test.ts`:

```ts
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { readCachedList } from '@/lib/cache';
import { fetchTopRepos } from '@/lib/github';

beforeEach(() => {
  localStorage.clear();
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('readCachedList', () => {
  it('returns null when the key is missing', () => {
    expect(readCachedList('nope')).toBeNull();
  });

  it('returns null for corrupted JSON', () => {
    localStorage.setItem('k', '{not json');
    expect(readCachedList('k')).toBeNull();
  });

  it('returns null for a valid-JSON wrong shape', () => {
    localStorage.setItem('k', JSON.stringify({ foo: 1 }));
    expect(readCachedList('k')).toBeNull();
    localStorage.setItem('k', JSON.stringify({ data: 'not-a-list', timestamp: 1 }));
    expect(readCachedList('k')).toBeNull();
  });

  it('returns the entry for the expected shape', () => {
    localStorage.setItem('k', JSON.stringify({ data: [1, 2], timestamp: 42 }));
    expect(readCachedList<number>('k')).toEqual({ data: [1, 2], timestamp: 42 });
  });
});

describe('fetchTopRepos with corrupted cache', () => {
  it('ignores the bad cache and fetches fresh data', async () => {
    localStorage.setItem('github-repos', '{corrupted');
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => [
          { name: 'a', fork: false, stargazers_count: 5 },
          { name: 'b', fork: true, stargazers_count: 9 },
        ],
      })
    );

    const repos = await fetchTopRepos('BabakBar');
    expect(repos.map((r) => r.name)).toEqual(['a']);
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `bunx vitest run src/__tests__/cache.test.ts`
Expected: FAIL — `@/lib/cache` does not exist, and (after you create it, on the
way to green) the `fetchTopRepos` test fails against the current unguarded
`JSON.parse`, which throws on `{corrupted`. That throw is the bug being fixed.

- [ ] **Step 3: Implement the validated reader**

Create `src/lib/cache.ts`:

```ts
export interface CachedList<T> {
  data: T[];
  timestamp: number;
}

export function readCachedList<T>(key: string): CachedList<T> | null {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) {
      return null;
    }

    const parsed: unknown = JSON.parse(raw);
    if (
      typeof parsed !== 'object' ||
      parsed === null ||
      !Array.isArray((parsed as CachedList<T>).data) ||
      typeof (parsed as CachedList<T>).timestamp !== 'number'
    ) {
      return null;
    }

    return parsed as CachedList<T>;
  } catch {
    return null;
  }
}
```

- [ ] **Step 4: Refactor github.ts to use it**

Replace the full contents of `src/lib/github.ts` with:

```ts
import type { GitHubRepo } from '@/types';
import { readCachedList } from '@/lib/cache';

const CACHE_KEY = 'github-repos';
const CACHE_TTL = 1000 * 60 * 60; // 1 hour

export async function fetchTopRepos(
  username: string,
  count = 4
): Promise<GitHubRepo[]> {
  const cached = readCachedList<GitHubRepo>(CACHE_KEY);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }

  try {
    const res = await fetch(
      `https://api.github.com/users/${username}/repos?sort=stars&per_page=100`
    );

    if (!res.ok) {
      throw new Error(`GitHub API error: ${res.status}`);
    }

    const repos: GitHubRepo[] = await res.json();

    // Filter out forks and get top by stars
    const topRepos = repos
      .filter((repo) => !repo.fork)
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, count);

    // Cache the result
    localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({ data: topRepos, timestamp: Date.now() })
    );

    return topRepos;
  } catch (error) {
    console.error('Failed to fetch GitHub repos:', error);
    // Return cached data if available, even if stale
    if (cached) {
      return cached.data;
    }
    return [];
  }
}
```

- [ ] **Step 5: Refactor books.ts the same way**

In `src/lib/books.ts`:

1. Add to the imports at the top:
   ```ts
   import { readCachedList } from '@/lib/cache';
   ```
2. Delete the `interface CachedBooks { … }` block (lines 27–30).
3. Replace the body of `fetchFavoriteBooks` with:

```ts
export async function fetchFavoriteBooks(): Promise<FavoriteBook[]> {
  const cached = readCachedList<FavoriteBook>(CACHE_KEY);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }

  try {
    const books = await Promise.all(FAVORITE_BOOKS.map(fetchBook));
    localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({ data: books, timestamp: Date.now() })
    );
    return books;
  } catch (error) {
    console.error('Failed to fetch favorite books:', error);
    if (cached) {
      return cached.data;
    }

    return getFallbackFavoriteBooks();
  }
}
```

- [ ] **Step 6: Run the full suite**

Run: `bun run test && bunx tsc --noEmit`
Expected: all tests pass; no type errors.

- [ ] **Step 7: Commit**

```bash
git add src/lib/cache.ts src/lib/github.ts src/lib/books.ts src/__tests__/cache.test.ts
git commit -m "fix: validate localStorage cache entries before use"
```

---

### Task 7: Remove dead config and assets

Everything deleted here was verified unreferenced on 2026-07-19. Re-verify each
before deleting anyway — if any check finds a reference, keep the file and note it.

**Files:**
- Delete: `tailwind.config.ts` (dead — `src/globals.css` loads
  `tailwind.config.js`; NEVER delete the `.js` one)
- Delete: `public/pwa-192x192.png`, `public/pwa-512x512.png` (PWA manifest gone)
- Delete: `public/file.svg`, `public/globe.svg`, `public/window.svg` (template
  leftovers, referenced nowhere)
- Modify: `scripts/generate-assets.mjs` (drop the two pwa-icon output entries,
  around lines 124–136)
- Keep: `public/BB-favicon.jpg`, `public/og-image.svg` (inputs to
  `scripts/generate-assets.mjs`)

- [ ] **Step 1: Re-verify each file is unreferenced**

Run: `rg -l 'tailwind\.config\.ts|pwa-192|pwa-512|file\.svg|globe\.svg|window\.svg' src index.html scripts public/robots.txt`
Expected: only `scripts/generate-assets.mjs` (the pwa-icon generator entries you
are about to remove). Any other hit → stop and reassess that file.

- [ ] **Step 2: Delete and edit**

```bash
git rm tailwind.config.ts public/pwa-192x192.png public/pwa-512x512.png public/file.svg public/globe.svg public/window.svg
```

Then in `scripts/generate-assets.mjs`, remove the two array entries whose
`outputPath` values end in `pwa-192x192.png` and `pwa-512x512.png` (keep every
other entry intact).

- [ ] **Step 3: Verify nothing broke**

Run: `rm -rf dist && bun run build && bun run test`
Expected: clean build (prerender line included), all tests pass, and site styling
still builds (`dist/assets/index-*.css` exists and is >15 kB — if it collapsed to
near-zero, the wrong Tailwind config was touched; revert immediately).

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "chore: remove dead tailwind config and unused public assets"
```

---

### Task 8: Ship and verify end to end

- [ ] **Step 1: Push**

Run: `git push`, then wait for the "Deploy" workflow to succeed
(`gh run watch`) and ~2 minutes for Coolify's rebuild.

- [ ] **Step 2: Verify the live site**

```bash
cb=$(date +%s)
curl -s "https://www.babakbarghi.com/blog?cb=$cb" | grep -o '<title>[^<]*</title>'
curl -s "https://www.babakbarghi.com/blog/hello-world?cb=$cb" | grep -o '<title>[^<]*</title>'
curl -s "https://www.babakbarghi.com/sitemap.xml?cb=$cb" | grep -c '<loc>'
curl -s -o /dev/null -w '%{http_code}\n' "https://www.babakbarghi.com/definitely-not-a-page?cb=$cb"
```
Expected:
```
<title>Blog | Babak Barghi</title>
<title>Hello World | Babak Barghi</title>
3
200
```
(The last one is the SPA fallback serving the shell; the app now renders the
NotFound page for it.)

- [ ] **Step 3: Verify metadata without JavaScript**

Run: `curl -s "https://www.babakbarghi.com/blog/hello-world?cb=$cb" | grep -E 'og:title|og:url|description'`
Expected: the post's title/description/URL — this is the "done means" criterion
for the SEO phase.

- [ ] **Step 4: One-time browser hydration check (needs a real browser)**

Open https://www.babakbarghi.com/blog in a normal browser tab, let it hydrate,
then in the DevTools console:

```js
document.title                                              // 'Blog | Babak Barghi'
document.querySelectorAll('meta[name="description"]').length // 1 (no duplicate)
document.querySelector('link[rel="canonical"]').href         // 'https://www.babakbarghi.com/blog'
```

This is the lightweight stand-in for a full hydration e2e test (deliberately not
building Playwright infrastructure for a personal site).

- [ ] **Step 5: Record the verification log**

Append results below, commit, push.

---

## Out of scope (deliberately)

- Writing/publishing posts from `docs/blog/` — separate content work.
- Full body-HTML prerendering / SSR — revisit only if search coverage of post
  *content* (not metadata) proves insufficient.
- Astro or React Router framework-mode migration — rejected for now.
- Deleting `public/sw.js` — keep the kill switch deployed for several months
  (earliest: 2026-10), then remove it in its own commit.

## Verification log

- **2026-07-19 (Task 2, Coolify SPA fallback):** applied by Sia (SPA checkbox +
  `try_files` fallback to `/index.html`, save, restart). Verified from
  production with cache-busted curl: `/`, `/blog`, `/blog/hello-world` all
  return `200 text/html`. `/sw.js` still served the old Workbox worker at that
  time (`content-type: application/javascript`, `cache-control: max-age=14400`)
  — Task 1 deploy pending.
- **2026-07-19 (Task 1, PWA removal):** commit `23bcdc2` deployed; live `/sw.js`
  now serves the kill switch (verified with cache-busted curl; Coolify took a
  few minutes past the webhook 200 to actually serve the new build). Pending:
  Sia's returning-browser DevTools check (Task 1 Step 7) — old workers may lag
  up to ~4 h due to `max-age=14400` on `/sw.js`.
- **2026-07-19 (Tasks 3–7):** executed inline by Claude with TDD; 14 tests
  green, `bunx tsc --noEmit` clean, CSS bundle byte-identical after the
  Tailwind-config cleanup (proof the live `.js` config was kept).
