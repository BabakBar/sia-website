# Routing and SEO hardening

## Current state

- The React app uses `BrowserRouter` for `/`, `/blog`, and `/blog/:slug`.
- Vite emits one application shell (`dist/index.html`), not HTML per route.
- Production serves `/` but returns nginx 404s for direct `/blog` and
  `/blog/hello-world` requests. `public/sitemap.xml` advertises `/blog`.
- Coolify deployment configuration is external to this repository; CI builds,
  tests, and triggers its webhook only.
- The PWA service worker serves `index.html` for navigations after installation.
  This masks the origin-routing defect for returning visitors.
- Post metadata is set client-side with `react-helmet-async`; it is not reliable
  for crawlers or social previews.

## Next session

1. Inspect the Coolify application's build pack and static-site routing settings.
2. Configure history fallback to `index.html` at the origin; do not introduce a
   Docker/nginx deployment model unless the existing settings cannot support it.
3. Verify `/`, `/blog`, and `/blog/hello-world` in an incognito browser or after
   unregistering the service worker. Purge or bypass Cloudflare cache if needed.
4. Add direct-route verification to the deployment checklist.
5. Choose a static pre-rendering approach for the blog before adding more posts.
   It must generate per-post HTML, metadata, canonical URLs, and sitemap entries.
6. Reassess whether the PWA plugin is useful for this content site. If retained,
   ensure navigation handling does not hide missing static pages.

## Decisions

- Keep clean URLs; do not use `HashRouter`.
- Treat the Coolify fallback as the immediate repair and static pre-rendering as
  the durable SEO solution.
