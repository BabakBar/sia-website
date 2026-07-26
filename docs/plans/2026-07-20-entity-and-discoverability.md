# Visibility-first website plan

Last updated: 2026-07-26

## Objective

Make `https://www.babakbarghi.com/` the authoritative public profile for Babak
Barghi and make it discoverable through a simple branded search.

The north-star result is:

> A search for `Babak Barghi` surfaces the personal website on the first page,
> with the homepage and About page indexed as the canonical identity source.

The complete audit baseline and progress register live in
[`docs/WEBSITE_BENCHMARK.md`](../WEBSITE_BENCHMARK.md).

No technical change can guarantee a ranking. This plan creates the crawlable
content, identity consistency, indexing evidence, external corroboration, and
first-hand material needed to earn visibility.

## Priority order

1. Return meaningful visible HTML to crawlers.
2. Return correct 404 status for URLs that do not exist.
3. Establish one consistent public identity and About page.
4. Submit and verify the canonical URLs in Google and Bing.
5. Corroborate the identity from LinkedIn, GitHub, and public research.
6. Publish substantive first-hand material.
7. Improve accessibility, performance, engineering, and infrastructure without
   delaying the visibility work.

## Architecture direction

### Selected direction: static-first Vite/React pages

The website is mostly content. The selected architecture keeps the existing
Vite/React application and adds true static generation for:

- `/`
- `/about`
- `/blog`
- `/blog/[slug]`
- `/404.html`

Each page must contain its visible text and metadata in the built HTML. React
hydrates that HTML so the current dynamic GitHub and book behavior remains.

This direction was selected because the existing application can now:

- render the existing route tree to complete HTML during the build;
- render MDX posts without changing the post source;
- generate a real static error document;
- hydrate without reproducing the UI in another framework;
- meet the crawlability contract with a smaller change than a migration.

The current visual language, copy, URL contract, and components remain
authoritative.

### Rejected direction: metadata-only prerendering

Adding `/about` to the existing `scripts/prerender.ts` would create another file
with correct metadata but an empty body. The implementation therefore replaced
metadata-only behavior with real route rendering.

### Rejected direction: framework migration for its own sake

Astro remains a reasonable static-site framework, but migrating now would
duplicate work and increase the visual-regression surface without improving the
verified output contract.

## Working rules

- Preserve the approved, direct, friendly personal voice.
- Do not turn the site into a LinkedIn clone or an ATS keyword page.
- Use only visible, approved public facts in metadata and structured data.
- Treat the Resume as evidence, not as the current public source of truth.
- Do not publish a phone number, private delivery detail, or unapproved internal
  fact.
- Do not add analytics before a concrete decision requires measurement.
- Do not add `llms.txt`; it is not a dependable search-inclusion mechanism.
- Keep `OAI-SearchBot` crawlable for search.
- Treat GPTBot, ClaudeBot, and other training crawlers as a separate policy.
- Keep the service-worker kill switch until the retirement period is complete.
- Do not introduce Docker solely for this static website.
- Work in small slices and verify every slice before the next one.
- Treat a push to `master` as a live deployment action.

## Stage 0: preserve the benchmark

Status: complete

Deliverables:

- Comprehensive audit in `docs/WEBSITE_BENCHMARK.md`.
- Visibility-first plan in this file.
- Measured Lighthouse, route, search, repository, Cloudflare, Coolify,
  dependency, and CI baselines.

Exit criteria:

- Every audit finding has an ID, priority, status, and done criteria.
- Future work has one benchmark and one execution plan.

## Stage 1: prove the static-first route architecture

Status: in progress; local implementation complete, deployment pending<br />
Priority: P0

Goal: demonstrate that the preferred architecture produces visible HTML and
correct route semantics before migrating the entire site.

### Slice 1.1: extend the existing renderer

Implementation result:

- Kept Vite, React, the existing routes, components, layout, and visible text.
- Added a server entry that renders the existing route tree during the build.
- Changed the browser entry to hydrate generated HTML.
- Kept repository-owned book fallback content in the generated homepage.
- Rendered the complete existing MDX post into its route HTML.
- Added a build gate that rejects empty page roots.

Astro was not introduced. The existing application could meet the static HTML
contract with a smaller, lower-risk change and without reproducing the UI in a
second framework.

### Slice 1.2: establish the route contract

- Generate `/`, `/blog`, `/blog/[slug]`, and `/404.html`.
- Add `/about` later with Stage 2, when its content is approved.
- Configure static hosting so known routes return 200.
- Remove the catch-all homepage response for unknown URLs.
- Ensure unknown pages, invalid slugs, and missing assets return HTTP 404.
- Preserve apex-to-`www` canonical redirects and trailing-slash behavior.

Done criteria:

- Cache-busted HTTP checks prove all known routes and one unknown page.
- Raw HTML contains visible content, not only metadata.
- No route depends on a retired service worker.

Current evidence:

- The local build generates three public routes and `404.html`.
- A real local nginx container returns the intended 200/404 status contract.
- The exact Coolify configuration patch has been dry-run.
- Deployment, the Coolify patch, and cache-busted live checks remain.

Proposed commit:

`feat: render public routes as static html`

## Stage 2: create the authoritative identity surface

Status: pending<br />
Priority: P0

Goal: give people and crawlers one current, consistent profile.

### Slice 2.1: typed public profile

Create a typed profile source containing approved public facts:

- display name;
- alternate name `Sia`, if approved for the canonical profile;
- role: Cloud Architect;
- location: Hannover, Germany;
- employer naming;
- ownership of the global Salesforce-Azure-SAP integration platform;
- secure delivery into AI and data platforms such as Databricks;
- 57-country scope;
- technical focus;
- career summary;
- selected work;
- confirmed GitHub, LinkedIn, and publication URLs;
- approved profile image.

Use this source for:

- homepage facts;
- About copy;
- titles and descriptions;
- JSON-LD;
- OG image copy;
- author information.

Required confirmations before publication:

- `Babak Barghi` or `Babak Barghi (Sia)` as the primary display.
- Existing presentation image or another profile image.
- Exact employer naming.
- Approval for the 57-country scope.
- Approval for any team-size statement.
- Confirmed public work and research links.

### Slice 2.2: About page

The About page should cover:

1. Identity and current role.
2. Current architecture and platform scope.
3. Technical focus and operating principles.
4. Short career path.
5. Curated selected work.
6. Public research and writing.
7. Authoritative external profiles.

Keep it concise and first-person. Do not copy the Resume verbatim.

### Slice 2.3: entity and article schema

- Add a stable Person `@id`, for example
  `https://www.babakbarghi.com/#person`.
- Add `ProfilePage` JSON-LD on `/about` with the Person as `mainEntity`.
- Add compatible WebSite metadata where useful.
- Use only visible page facts.
- Add Article JSON-LD only to substantive posts.
- Reference the same Person `@id` from every article.
- Escape serialized JSON-LD against script termination.

### Slice 2.4: synchronize identity metadata

- Replace Cloud & AI Engineer in the homepage metadata and OG image.
- Give the homepage a descriptive title without keyword stuffing.
- Use absolute canonical social-image URLs.
- Correct `Over 9+ years`.
- Regenerate and visually inspect the OG image.

Done criteria:

- Homepage, About, metadata, OG image, and JSON-LD agree.
- Raw HTML contains the About text and valid schema before JavaScript.
- About appears in navigation and the sitemap.
- Structured-data tests and external validators pass.

Proposed commits:

- `feat: add authoritative public profile`
- `feat: publish about page and person schema`

## Stage 3: replace borrowed signals with curated proof

Status: pending<br />
Priority: P1

Goal: make the site prove the intended positioning instead of delegating it to
GitHub stars and third-party APIs.

### Selected work

Choose three or four representative case studies. Initial candidates:

- BoringHannover or Boring Network;
- AutoSpendTracker;
- one enterprise architecture/public research example that can be described
  without exposing confidential work;
- one current personal tool that demonstrates AI-assisted delivery or
  local-first architecture.

Each case study should explain:

- problem;
- constraints;
- role and ownership;
- architecture;
- important trade-offs;
- outcome;
- link to code or public evidence where available.

### Books

- Store approved title, author, note, and optional cover provenance locally.
- Remove runtime Open Library search.
- Prefer text-only cards if cover licensing or privacy is unclear.

### Contact and navigation

- Add one clear homepage action toward About or selected work.
- Keep contact available but secondary.
- Decide whether Blog has earned a primary-navigation position.

Done criteria:

- Homepage visible content is stable across deployments.
- Blocking GitHub and Open Library does not remove or change the page.
- Selected work supports the Cloud Architect narrative.

Proposed commit:

`feat: curate selected work and reading`

## Stage 4: complete the indexing handoff

Status: in progress; technical preparation complete, portal actions pending<br />
Priority: P0 after Stage 1 is deployed

Goal: move from “crawlable in theory” to confirmed indexing.

### Google

1. Confirmed that Cloudflare DNS contains a Google domain-verification record;
   Sia must confirm it corresponds to the intended Search Console property.
2. Submit `https://www.babakbarghi.com/sitemap.xml`.
3. Inspect `/`, `/blog`, and the current post; add `/about` when Stage 2 is
   published.
4. Request indexing for the homepage after the static HTML deployment.
5. Record crawled page, selected canonical, indexing status, and any rendering
   issues.

### Bing

1. Create or confirm the Bing Webmaster property.
2. Import Google verification where appropriate.
3. Submit the canonical sitemap.
4. Inspect and request indexing for the current canonical URLs.
5. Record sitemap and URL status.
6. After deployment, run `bun run submit:indexnow` and record the accepted HTTP
   response.

### Search measurement

Check monthly:

- `Babak Barghi`
- `Babak Barghi Cloud Architect`
- `Babak Barghi Continental`
- `site:babakbarghi.com Babak Barghi`

Record:

- date;
- engine and locale;
- whether the domain appears;
- approximate result position;
- displayed title and description;
- Search Console impressions/clicks for branded queries.

Do not check ranking daily. Indexing and authority changes take time and noisy
manual checks encourage unnecessary churn.

Done criteria:

- Current canonical routes are indexed by Google and Bing.
- `/about` is inspected and indexed after Stage 2 publishes it.
- The sitemap is processed without errors.
- No duplicate apex, slash, query, or soft-404 URL is selected as canonical.
- The personal domain appears on the first page for the exact name.

External/user actions:

- Search Console and Bing portal access require Sia; no corresponding
  credentials or connected capability are available locally.
- Record the exact required portal action when access blocks progress.

## Stage 5: corroborate the identity externally

Status: pending<br />
Priority: P1

Goal: help search engines connect the website to the established person.

Actions:

- Update LinkedIn to the current Cloud Architect positioning.
- Add the canonical personal website to LinkedIn.
- Set the canonical website on the GitHub profile.
- Pin representative repositories rather than relying on star order.
- Link to the website from publication or research profiles where allowed.
- Use consistent name, role, location, and website URL across profiles.

This is identity corroboration, not backlink farming.

Done criteria:

- LinkedIn and GitHub link to the canonical `www` URL.
- Public profile facts are compatible with the website.
- The About page links back to the same confirmed profiles.

## Stage 6: publish first-hand evidence

Status: pending<br />
Priority: P1

Goal: give search and AI systems substantive material worth retrieving.

Initial three-post sequence:

1. What owning a global enterprise integration platform actually means.
2. Secure data movement from Salesforce and SAP through Azure into AI and data
   platforms.
3. Building and operating BoringHannover/Boring Network as a real side-project
   system.

Optional follow-ups:

- Architecture delivery across 57 countries: constraints and trade-offs.
- From AI research to industrial platform architecture.
- One VPS, many small systems: isolation, deployment, and operational choices.

Post requirements:

- answer one concrete question;
- first-person experience;
- real constraints and trade-offs;
- visible author and date;
- canonical metadata and Article JSON-LD;
- link to the About profile;
- no confidential employer detail;
- no generic cloud-content rewrite.

Done criteria:

- Three substantive posts are deployed and indexed.
- Search Console records impressions for non-site branded or expertise queries.
- Blog navigation points to a credible body of work.

Proposed commit pattern:

`content: publish <specific topic>`

## Stage 7: accessibility and performance pass

Status: in progress; local targets met, deployment verification pending<br />
Priority: P1, after the new static pages stabilize

Actions:

- Replace failing muted, hover, and focus colors with compliant tokens.
- Verify keyboard focus manually.
- Convert the presentation image to responsive AVIF/WebP sources.
- Add intrinsic dimensions or aspect ratio.
- Self-host the existing local fonts or use the system stack.
- Remove Google Fonts requests.
- Confirm the new static architecture does not ship unnecessary JavaScript.
- Keep all visible copy unchanged under the current scope.

Targets:

- Lighthouse Performance at least 95.
- Lighthouse Accessibility 100.
- LCP below 2.5 seconds in the repeatable mobile audit.
- CLS below 0.1, with a stretch target near zero.
- Homepage transfer at most 400 KiB.
- No Google Fonts request.
- No WCAG AA contrast failure.

Local result:

- Performance: 94 to 98.
- Accessibility: 94 to 100.
- FCP: 2.5 seconds to 1.7 seconds.
- LCP: 2.5 seconds to 2.0 seconds.
- Transfer: approximately 1,315 KiB to 299 KiB.
- Contrast failures: 22 to 0.
- Layout and visible writing unchanged.

Proposed commit:

`fix: improve accessibility and page weight`

## Stage 8: legal, privacy, engineering, and delivery hardening

Status: pending<br />
Priority: P1 legal/privacy, P2 remaining hardening

These tasks should be implemented alongside or immediately after the public page
architecture, but they should not replace the visibility work.

### Legal and privacy

- Confirm and publish an Impressum.
- Remove unnecessary third-party requests.
- Publish a privacy notice matching actual Cloudflare, hosting, logging, contact,
  and external-link behavior.
- Decide whether direct Gmail exposure is intentional.
- Confirm book-cover provenance or use text-only presentation.

### Dependencies and code quality

- Update dependencies in compatible groups.
- Run tests and build after every group.
- Review `bun audit` by actual exposure.
- Add formatting and lint scripts.
- Make formatting, linting, type checking, tests, and build CI gates.
- Add static-output and real-browser checks without relying on API mocks.

### Deployment

- Pin Bun to an explicit version policy.
- Add deployment concurrency.
- Wait for Coolify deployment completion.
- Smoke-test canonical routes and a real 404 after deployment.
- Enable meaningful Coolify health checking.
- Evaluate branch protection and required checks.
- Enable GitHub vulnerability alerts.

### Infrastructure

- Raise minimum TLS after compatibility review.
- Change Cloudflare SSL to strict after origin verification.
- Add security headers at the correct layer.
- Review shared-VPS-safe origin restrictions.
- Add DMARC based on actual domain mail behavior.

Every infrastructure mutation requires a read-only preflight, a clear proposed
change, approval, and read-back verification.

## Validation bundle for every implementation stage

Repository:

```text
bun run test
bunx tsc --noEmit
bun run build
git diff --check
```

Add formatting and lint commands once the scripts exist.

Static output:

- meaningful visible body content in every generated HTML file;
- one title, description, and canonical URL;
- absolute social image;
- valid JSON-LD;
- sitemap contains every intended canonical route;
- no unexpected PWA artifacts.

Live HTTP:

- cache-busted canonical routes return 200 and correct content types;
- unknown page and missing asset return 404;
- apex redirects directly to canonical `www` HTTPS;
- visible HTML exists without browser execution;
- `robots.txt`, sitemap, and service-worker kill switch remain intentional.

Browser:

- fresh desktop and mobile profiles;
- JavaScript-disabled content check;
- keyboard-only navigation;
- no overflow;
- no duplicate metadata after hydration;
- fresh Lighthouse.

Search:

- Search Console URL Inspection;
- Bing URL Inspection;
- sitemap processing state;
- tracked branded-search sample.

## Proposed work sequence

| Order | Slice                                      | Primary result                              |
| ----: | ------------------------------------------ | ------------------------------------------- |
|     1 | Static architecture spike                  | Proves visible HTML without redesign        |
|     2 | Static route and 404 contract              | Removes soft 404s                           |
|     3 | Typed profile and About page               | Establishes canonical identity              |
|     4 | Metadata, OG, and JSON-LD                  | Aligns machine-readable identity            |
|     5 | Curated selected work                      | Replaces weak borrowed project signals      |
|     6 | Deploy and submit to Google/Bing           | Starts verified indexing                    |
|     7 | LinkedIn/GitHub corroboration              | Connects external authority                 |
|     8 | First three substantive posts              | Builds retrievable first-hand evidence      |
|     9 | Accessibility and performance              | Preserves a high-quality visitor experience |
|    10 | Legal, dependency, CI, and infra hardening | Reduces residual risk and operational debt  |

## Finding-to-stage map

This map prevents a finding from disappearing when the implementation order
changes. Status remains authoritative in the benchmark.

| Benchmark ID | Planned stage | Intended resolution                                       |
| ------------ | ------------: | --------------------------------------------------------- |
| VIS-01       |             1 | Generate meaningful visible HTML for every public route   |
| VIS-02       |             1 | Return a real 404 page and HTTP status                    |
| VIS-03       |             2 | Use one typed public identity source                      |
| VIS-04       |           4–6 | Verify indexing, corroborate identity, and earn relevance |
| VIS-05       |             2 | Publish About with Person/ProfilePage schema              |
| VIS-06       |             6 | Publish three substantive posts or de-emphasize Blog      |
| VIS-07       |             3 | Replace star-ranked projects with curated work            |
| UX-01        |             3 | Add a clear About or selected-work next action            |
| UX-02        |             3 | Make visible copy independent of third-party APIs         |
| UX-03        |          2, 7 | Correct positioning and finish the editorial cleanup      |
| A11Y-01      |             7 | Replace colors that fail AA contrast                      |
| A11Y-02      |             7 | Strengthen focus and hover states                         |
| PERF-01      |             7 | Ship a responsive, optimized hero image                   |
| PERF-02      |             7 | Remove Google Fonts runtime requests                      |
| PERF-03      |          1, 7 | Establish and verify a static-first JavaScript budget     |
| SEO-01       |             2 | Synchronize current route and social metadata             |
| SEO-02       |          2, 4 | Expand, submit, and verify the canonical sitemap          |
| LEGAL-01     |             8 | Publish a reviewed Impressum                              |
| PRIV-01      |             8 | Publish a notice that matches actual data flows           |
| PRIV-02      |          3, 8 | Decide contact exposure and image provenance              |
| SEC-01       |             8 | Raise the minimum TLS version after review                |
| SEC-02       |             8 | Move Cloudflare SSL to strict after origin verification   |
| SEC-03       |             8 | Add security headers at the correct delivery layer        |
| SEC-04       |             8 | Review shared-VPS-safe origin restrictions                |
| SEC-05       |             8 | Publish an intentional DMARC policy                       |
| ENG-01       |             8 | Repair formatting and enforce it                          |
| ENG-02       |             8 | Replace the stale lint setup and enforce linting          |
| ENG-03       |             8 | Update dependencies and review exposed advisories         |
| ENG-04       |          1, 8 | Add static, browser, and deployed route-contract tests    |
| OPS-01       |             8 | Observe deployment completion and run smoke checks        |
| OPS-02       |             8 | Give Coolify a meaningful health check                    |
| OPS-03       |             8 | Pin Bun and evaluate repository protections               |

## Stop and review points

Stop for Sia's decision before:

- publishing an address or legal contact detail;
- changing the canonical display name;
- publishing a new profile image;
- adding or removing an employer/team-scope claim;
- choosing a selected work item that exposes employer or private detail;
- changing crawler training policy;
- pushing a migration or visibility release to `master`;
- making any Cloudflare or Coolify mutation.

## Deferred until triggered

- `llms.txt`: do not add without evidence of a real consumer and benefit.
- Analytics: add only for a named product/content decision.
- New PWA functionality: out of scope.
- Deep VPS redesign: out of scope for visibility work.
- Broad visual redesign: out of scope unless user evidence shows the current
  presentation is blocking the goal.

## References

- Google ProfilePage structured data:
  https://developers.google.com/search/docs/appearance/structured-data/profile-page
- Google structured data:
  https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data
- Google JavaScript SEO basics:
  https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics
- Google sitemaps:
  https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview
- Bing Webmaster Tools:
  https://www.bing.com/webmasters/about
- IndexNow:
  https://www.indexnow.org/documentation
- OpenAI crawler guidance:
  https://help.openai.com/en/articles/12627856-publishers-and-developers-faq
- Anthropic crawler guidance:
  https://support.anthropic.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler
