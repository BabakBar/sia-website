# Website benchmark and progress tracker

Last updated: 2026-11-18

## Verified release: 2026-11-18

- Released code: `8f8cc18badf93800c5015ec91ae7b3b3b07829a0` on remote `master`.
  Main content/recovery commit `732cd2e`; readiness correction `b43584f`;
  permission-preserving publication verification `8f8cc18`.
- Sia reviewed localhost, removed enterprise work from Selected work, and
  approved commit/push. BoringHannover and FabrikTakt are the two selected
  projects; enterprise background remains on About. Article drafts remain unpublished on the website.
- Content: shorter hero and work CTA, About and shared profile metadata/entity,
  static book recommendations, empty blog out of primary navigation, regenerated
  Cloud Architect share image. Retired GitHub fetching/cache/cards and their
  mock-based tests removed; content regression tests replace them.
- Bun 1.4.4 pinned in package metadata, CI, and Docker. React 19.3 production
  rendering failed under Bun 1.2.23; production builds pass on 1.4.4. Local global
  Bun was not changed; use `bunx --package bun@1.4.4 bun` when needed.
- Local validation: 19 checks passed (15 unit + four real Docker HTTP tests),
  production build/static-output checks passed, `bun audit` found no
  vulnerabilities across 424 checked packages. Same-major transitive overrides
  resolve advisories without unrelated framework migrations.
- GitHub Actions run `44416051994` passed build, tests, Docker serving checks,
  deployment trigger, public exact-revision observation, and public HTTP checks:
  https://github.com/BabakBar/sia-website/actions/runs/44416051994
- CI uses a custom Docker network for nginx's embedded DNS resolver. Readiness
  retries include connection resets during nginx startup. The existing CI token
  can deploy but returns 403 on deployment-status reads; its permissions were
  preserved. CI now waits for the exact public `/revision.txt` SHA, then verifies
  status/content contracts. Public polling never forwards the API token.
- Coolify application `zsossos8so8occ4c4gg8w0sk`: Dockerfile, static/SPA disabled,
  direct push auto-deploy disabled in favor of CI, source commit injected into
  build, health check enabled on port 80 `/`. Final state `running:healthy`,
  restart count 0, no running deployments. Deployment
  `xseedbrxmx2odfjqtgee6wgk` published `8f8cc18`; public revision matches.
- Public homepage, About, and blog return 200 with static content/canonicals;
  unknown page and missing JavaScript return 404; social image and sitemap pass.
  `/s/t.js` returns valid JavaScript. All four public HTTP tests passed against
  the exact released revision.
- Cloudflare had cached the old HTML tracker response (HIT, age 3525 s) after
  origin recovery. A scoped purge cleared tracker/share-image/favicon/audit URLs.
  The page versions its tracker URL to bypass returning visitors' cached HTML.
- Umami website `51f09c81-8626-488b-b73b-20c452d3fff7` recorded a new visit at
  `2026-11-18T22:56:46.980Z` during the release browser audit; tracking now records
  activity. This verifies collection, not organic traffic growth or IP/location
  accuracy. Earlier zero traffic remains uninterpretable.
- Live mobile Lighthouse 13.6.0 at 22:56:45 UTC: performance 99, accessibility
  100, best practices 100, SEO 100; FCP 0.9 s, LCP 2.0 s, TBT 0 ms, CLS 0.004,
  transfer 231 KiB, no console errors. Single lab run; no manual keyboard audit.
- Evidence: `/tmp/sia-lighthouse-released-20261118.json`,
  `/tmp/sia-docker-build.log`, `/tmp/sia-deploy-public-contract.ts` (real local
  HTTP stand-in verifies current, stale-then-current, and rejected publication).
- Rollback: original settings/labels in `/tmp/sia-website-rollback-20261118.json`;
  prior successful image/tag `fea8aa43c79fd2d8743c26821c037f6715a69def` was
  confirmed retained before release. Restore settings then use Coolify rollback
  to that image if needed; include_source_commit_in_build was previously false.
- Local preview remains `http://localhost:3000/`. Pre-existing README/share-image
  proposal edits remain outside these commits. No schedules or new monitors.
- Next work: substantive reviewed writing and fuller case-study evidence;
  indexing of the new About page and traffic growth require later measurement.

## Purpose

This document is the durable benchmark for `babakbarghi.com`. It records the
verified state of the repository and live website, the gaps found in the July
2026 audit, and the measurements that future work must improve without
regressing what already works.

The execution sequence lives in
[`docs/plans/2026-07-20-entity-and-discoverability.md`](plans/2026-07-20-entity-and-discoverability.md).

## North-star outcome

A simple search for `Babak Barghi` should surface
`https://www.babakbarghi.com/` as an obvious first-page result and, ultimately,
as one of the leading branded results.

Supporting outcomes:

- Search engines can retrieve meaningful visible content without executing
  JavaScript.
- The website consistently identifies Babak Barghi as a Cloud Architect.
- The domain is the canonical profile linking identity, experience, selected
  work, writing, GitHub, LinkedIn, and public research.
- Search Console and Bing confirm that the important URLs are crawled and
  indexed.
- The site remains fast, accessible, simple, and maintainable.

This is a personal public website, not a production application or work
service. Visibility, crawlability, identity clarity, and useful first-hand
content therefore outrank infrastructure sophistication. Security, privacy,
legal, and dependency findings remain tracked, but they should not distract
from the visibility-first sequence unless they create immediate risk.

## Status vocabulary

- `verified`: confirmed working in the current repository and live site.
- `open`: confirmed gap with no implementation started.
- `in progress`: implementation has started but the done criteria are not met.
- `blocked`: progress requires a named user or external action.
- `deferred`: intentionally postponed until its trigger condition is met.

## Audit scope

The 2026-07-26 review covered:

- repository structure, content, dependencies, tests, and build output;
- desktop and mobile rendering;
- UX, copy, information hierarchy, and personal positioning;
- accessibility and performance;
- HTML, metadata, canonical URLs, sitemap, robots policy, structured data, and
  current search visibility;
- redirects, HTTP status behavior, caching, response headers, TLS, DNS,
  Cloudflare, and Coolify;
- privacy, legal-page presence, third-party requests, and domain email posture;
- GitHub Actions, repository protection, dependency alerts, and deployment
  verification.

No production or infrastructure changes were made during the audit.

## Current architecture and deployment

- Vite 7, React 19, TypeScript, React Router, Tailwind CSS, and MDX.
- Browser routes: `/`, `/about`, `/blog`, `/blog/:slug`, and a client-side catch-all.
- Coolify builds the repository Dockerfile from `master`. nginx serves the
  prerendered files using `ops/nginx.conf`, with real 404s and an analytics proxy.
- GitHub Actions gates releases; direct push auto-deploy is disabled. CI observes
  the published revision before checking public status/content contracts.
- Build command: `bun run build`.
- Publish directory: `/dist`.
- nginx and Cloudflare serve both the apex and `www`; the apex redirects to the
  canonical `www` hostname.
- Cloudflare proxies the apex A record and the `www` CNAME.
- The old PWA was removed. `public/sw.js` remains as a temporary kill switch for
  visitors with the retired service worker.

## Re-audit checkpoint: 2026-11-18

Read-only production audit, retrieved approximately 21:54–21:56 UTC. No
application, infrastructure, commit, push, or deployment changes were made.
The pre-existing README and share-image proposal edits were preserved.

- Local checkout `746306e`; remote `master` is `fea8aa43c79fd2d8743c26821c037f6715a69def`
  (2026-09-30, changes the deployment webhook from GET to POST). Live asset
  hashes match the current local build. Latest GitHub run `36770313963` passed;
  it only verifies webhook acceptance, not deployment completion or live behavior.
- Homepage and blog return 200 with prerendered content; apex redirects to
  `www`. Sitemap contains only `/` and `/blog`. Blog displays `No posts yet.`;
  `src/content/posts/index.ts` is empty. Twelve article drafts exist under
  `docs/blog`, plus the unpublished Telegram MDX draft.
- Unknown page `/audit-nonexistent-20261118` and missing JavaScript asset
  `/assets/audit-missing-20261118.js` return homepage HTML with HTTP 200.
  VIS-02 has regressed in production.
- `/s/t.js` returns HTTP 200 `text/html` containing the homepage. Lighthouse
  confirms `SyntaxError: Unexpected token '<'` at that URL. Analytics cannot
  execute. Umami website `51f09c81-8626-488b-b73b-20c452d3fff7` has only one
  recorded timestamp, `2026-08-22T23:37:01.725Z`; its zero recent visits do not
  establish that the site received no traffic.
- Coolify application `zsossos8so8occ4c4gg8w0sk` reports `build_pack=nixpacks`,
  `is_static=true`, `is_spa=true`, empty custom nginx configuration,
  `running:unknown`, health checks disabled, restart count 21. No cause for the
  historical restarts was established. Auto-deployment is enabled.
- Google Search Console property `sc-domain:babakbarghi.com`: homepage is
  submitted and indexed, last crawled 2026-11-17 14:48:45 UTC; Google's and the
  user's canonical both equal `https://www.babakbarghi.com/`.
- Finalized GSC web totals, no filters, Pacific dates: 2026-10-18 through
  2026-11-14 had 19 impressions, 0 clicks, average position 3.11; previous equal
  28 days, 2026-09-20 through 2026-10-17, had 11 impressions, 0 clicks, average
  position 3.45. The query breakdown returned no rows; anonymized queries are
  omitted, so these totals do not prove branded-search rank.
- Umami comparison used `2026-10-18T07:00:00Z` through
  `2026-11-15T07:59:59Z`, matching those Pacific dates across the DST change.
  Current and previous totals were zero; the broken tracker invalidates traffic
  interpretation.
- Lighthouse 13.6.0 live mobile lab audit: performance 100, accessibility 100,
  best practices 96, SEO 100; FCP/LCP 0.9 s, TBT 0 ms, CLS 0.048, transfer
  301 KiB. Best-practices failure is the analytics script error. This is a
  single lab run, not field Core Web Vitals or proof of manual accessibility.
- Desktop Lighthouse returned the same four scores; LCP 0.2 s, CLS 0.005.
  Viewport screenshots on both form factors preserve the restrained dark
  layout. The long biography dominates the mobile opening before project proof.
- `bun run build` passes TypeScript, Vite, prerendering, and static-output checks.
  Plain `bun run test` fails 5/19 cache tests under this Mac's Node 26.12.0
  because global localStorage is undefined. With
  `NODE_OPTIONS=--no-experimental-webstorage bun run test`, all 19 pass.
- `bun audit --json`: 51 advisories across 16 packages (1 critical, 26 high,
  22 moderate, 2 low). The critical advisory is Vitest UI-server exposure
  ([maintainer advisory](https://github.com/vitest-dev/vitest/security/advisories/GHSA-5xrq-8626-4rwp)),
  not evidence of an exploitable static production server. Remaining findings
  still need feature/exposure review before an update batch.
- Homepage still says Cloud Architect while metadata says Cloud & AI Engineer;
  share-image URLs remain relative. No About route, Person/ProfilePage JSON-LD,
  curated selected work, privacy notice, or Impressum was found in source.
  No new legal determination was made.
- Browser-control host was unavailable. Lighthouse supplied a mobile viewport
  screenshot and automated audits; no manual keyboard/interaction pass was done.
- Scratch evidence: `/tmp/sia-lighthouse-20261118.json`,
  `/tmp/sia-lighthouse-desktop-20261118.json`,
  `/tmp/sia-bun-audit.json`, `/tmp/sia-live-home.html`,
  `/tmp/sia-live-blog.html`, `/tmp/sia-unknown.html`, `/tmp/sia-tracker.txt`.

Next change: validate the repository Docker image locally, then request approval
to switch this Coolify application to Dockerfile and deploy. Preserve the
current application settings/image for rollback. Acceptance: known routes 200,
unknown page and missing asset 404, `/s/t.js` returns JavaScript, browser has no
tracker syntax error, and an authorized tracking verification reaches Umami.
Add a post-deploy smoke gate so webhook acceptance cannot conceal this drift.
Then prioritize curated project proof, a clear visitor action, consistent role
metadata, and an editorial decision on the empty blog.

## Baseline scorecard

| Area                 | Baseline                                                               | State    | Summary                                                                   |
| -------------------- | ---------------------------------------------------------------------- | -------- | ------------------------------------------------------------------------- |
| Search visibility    | Personal domain did not surface in the sampled simple branded searches | open     | LinkedIn and older research are stronger indexed identity surfaces        |
| Crawlable content    | Metadata exists, visible body HTML does not                            | open     | Built pages contain an empty `#root` before JavaScript                    |
| HTTP semantics       | Valid routes 200; arbitrary unknown paths also 200                     | open     | nginx SPA fallback creates soft 404s                                      |
| Identity positioning | Strong hero, inconsistent metadata and social image                    | open     | Cloud Architect conflicts with Cloud & AI Engineer                        |
| Visual design        | Clean desktop and mobile presentation                                  | verified | No horizontal overflow; restrained visual system                          |
| Accessibility        | Lighthouse 94                                                          | open     | 22 contrast failures plus a low-contrast focus ring                       |
| Performance          | Lighthouse 96                                                          | open     | Strong runtime; oversized hero image dominates transfer                   |
| Best practices       | Lighthouse 100                                                         | verified | Browser audit passed                                                      |
| Lighthouse SEO       | 100                                                                    | verified | Technical audit passes but does not prove indexing or authority           |
| Build                | `bun run build` passed                                                 | verified | Production bundle and route metadata generated                            |
| Tests                | 14/14 passed                                                           | verified | Four Vitest files passed                                                  |
| Type checking        | `bunx tsc --noEmit` passed                                             | verified | Strict TypeScript gate is green                                           |
| Formatting           | 27 files fail Prettier                                                 | open     | Formatting is configured but not enforced                                 |
| Dependency audit     | 32 advisories                                                          | open     | 1 critical, 18 high, 12 moderate, 1 low; many are build/dev or SSR scoped |
| Live delivery        | Canonical routes respond successfully                                  | verified | Live asset hashes matched the current build                               |
| Deployment health    | Coolify `running:unknown`                                              | open     | Health checks are disabled                                                |
| Legal/privacy pages  | No Impressum or privacy notice                                         | open     | Requires a focused legal/privacy pass                                     |

## Measured performance baseline

Fresh Lighthouse 13.4.1 mobile audit against the live homepage:

| Metric                            |                  Result |
| --------------------------------- | ----------------------: |
| Performance                       |                      96 |
| Accessibility                     |                      94 |
| Best Practices                    |                     100 |
| SEO                               |                     100 |
| First Contentful Paint            |                   2.2 s |
| Largest Contentful Paint          |                   2.2 s |
| Total Blocking Time               |                    0 ms |
| Cumulative Layout Shift           |                   0.046 |
| Total transfer                    | approximately 1,305 KiB |
| Hero image transfer               |         1,109,596 bytes |
| Estimated image savings           | approximately 1,030 KiB |
| Estimated unused JavaScript       |    approximately 36 KiB |
| Estimated render-blocking savings |    approximately 550 ms |

### Release checkpoint: 2026-07-26

The visibility, route, accessibility, and page-weight changes from commit
`65fa092` are live after the production-build correction in commit `7281f82`.
The measured result below remains the repeatable local Lighthouse result; a
fresh live Lighthouse and manual keyboard pass remain outstanding.

| Check                          |  Baseline | Local result |
| ------------------------------ | --------: | -----------: |
| Lighthouse Performance         |        94 |           98 |
| Lighthouse Accessibility       |        94 |          100 |
| First Contentful Paint         |     2.5 s |        1.7 s |
| Largest Contentful Paint       |     2.5 s |        2.0 s |
| Cumulative Layout Shift        |     0.049 |        0.049 |
| Homepage transfer              | 1,315 KiB |      299 KiB |
| Contrast failures              |        22 |            0 |
| Generated pages with body HTML |         0 |            4 |

Additional evidence:

- The homepage, blog index, complete MDX post, and static error document contain
  visible content in their built HTML.
- A real nginx container returns 200 for `/`, `/blog`, and
  `/blog/hello-world`, and 404 for an unknown page and missing asset.
- The generated page hydrates and loads the existing dynamic sections without
  changing the layout or visible writing.
- The public IndexNow ownership key returns the exact expected token.
- IndexNow accepted the three canonical sitemap URLs with HTTP 202.
- Cloudflare DNS contains an existing Google Search Console verification record.
- Sia confirmed the Google Search Console and Bing Webmaster portal work is
  complete. Engine processing, per-URL indexed state, and ranking remain
  external observations rather than confirmed outcomes.

### Deployment recovery checkpoint: 2026-07-26

Production remained on the previous healthy container throughout both failed
deployments. No outage occurred. The corrected release then completed through a
rolling update.

| Evidence                    | Result                                                                  |
| --------------------------- | ----------------------------------------------------------------------- |
| Live release commit         | `7281f82d16877a48f7efe2ddb55c06400d74e992`                              |
| GitHub Actions              | Run `30205890336`; production build and 19 tests passed                 |
| Coolify deployment          | `xsoscwoowwsw8go448gk4888`; finished at 2026-07-26 14:24:59 UTC         |
| Coolify application         | `running:unknown`; health disabled, restart count 0, public checks pass |
| Public homepage             | 200 with meaningful static body HTML                                    |
| Public known routes         | `/`, `/blog`, and `/blog/hello-world` return 200 with static HTML       |
| Public unknown routes       | Unknown page and missing asset return 404                               |
| Public IndexNow key URL     | 200 with the exact ownership token                                      |
| IndexNow submission         | Three canonical URLs accepted with HTTP 202                             |
| Google and Bing portal work | Owner-confirmed complete; engine indexing evidence still pending        |

The complete deployment log showed that Nixpacks sets `NODE_ENV=production`,
while the middleware-mode Vite server used for prerendering defaulted to
development mode. MDX therefore emitted `jsxDEV`, but React loaded its
production runtime, where that function is unavailable. The release correction
sets the prerender Vite mode explicitly to `production` and makes the GitHub
Actions build use the same environment as Coolify. Cache-busted public checks
then confirmed the static HTML, route-status, sitemap, robots, font, and
ownership-key contracts without changing the UI or visible writing.

## Verified strengths to preserve

### Positioning and visual presentation

- The homepage opening is concrete and differentiates the profile from generic
  Cloud or AI portfolios.
- The approved public framing says Babak owns the global
  Salesforce-Azure-SAP integration platform that securely feeds AI and data
  platforms such as Databricks across 57 countries.
- The layout has a strong reading width, useful whitespace, restrained color,
  and a human presentation photo.
- Desktop and mobile views remain readable with no visible horizontal overflow.

### Accessibility foundations

- A skip link targets the main content.
- Header, navigation, main, footer, article, headings, and time elements provide
  a reasonable semantic structure.
- Social icon links have accessible names.
- The presentation image and book covers have alternative text.
- Keyboard focus styles exist.
- Reduced-motion preferences disable animation and transitions.
- Lighthouse found no touch-target, heading-order, landmark, or link-name
  failures.

### Routing and metadata

- Apex HTTP and HTTPS requests redirect to the canonical
  `https://www.babakbarghi.com/`.
- `/`, `/blog`, `/blog/`, and `/blog/hello-world` return 200.
- Canonical URLs, descriptions, Open Graph fields, Twitter fields, and titles
  are route-specific for the blog index and post.
- The sitemap contains the homepage, blog index, and current post.
- The live Cloudflare-managed robots policy allows search crawling and blocks
  selected model-training crawlers.
- `OAI-SearchBot` remains allowed through the wildcard search policy.

### Engineering and delivery

- The current tests, TypeScript check, and build pass.
- The current live assets match the locally generated production build.
- The latest GitHub deployment workflow completed successfully.
- Environment files and common secret files are ignored.
- No obvious tracked secret was found in the current tree.
- Cloudflare proxying, managed DDoS/firewall rules, HTTP/2, HTTP/3, browser
  integrity checking, and HTTPS redirection are active.

## Findings register

### Visibility and discoverability

#### VIS-01: visible page content was absent from generated HTML

Priority: P0<br />
Status: verified

At the audit baseline, the build created route-specific metadata but every
generated page body was only `<div id="root"></div>`.
`scripts/prerender.ts` described the routes and metadata but did not render
their React body content.

Impact:

- Crawlers that do not execute JavaScript receive no biography, projects,
  books, or article body.
- Search engines must spend a rendering pass before understanding the page.
- Search and AI retrieval systems may see metadata but miss first-hand content.
- The planned About page would inherit the same defect if it only extends the
  existing pipeline.

Local implementation:

- The existing Vite/React application now renders each route through React
  server rendering during the build.
- Client startup hydrates existing HTML instead of replacing it.
- A build gate fails if a generated public page has an empty application root.
- Commit `65fa092` added the static renderer, and commit `7281f82` corrected its
  production-mode build.
- Deployment `xsoscwoowwsw8go448gk4888` finished successfully.
- Cache-busted public responses for `/`, `/blog`, and `/blog/hello-world`
  contain meaningful visible HTML before JavaScript.

Done criteria:

- `curl` of every current public route contains meaningful visible page text in
  the returned HTML; apply the same contract to `/about` when Stage 2 adds it.
- The page remains functional when JavaScript is disabled.
- Hydration, if retained, does not duplicate content or metadata.

#### VIS-02: unknown paths were soft 404s

Priority: P0<br />
Status: verified

The 2026-11-18 Docker release serves the repository nginx config. Public unknown pages and missing assets return 404. The preceding Nixpacks drift is recorded in the re-audit checkpoint.

Done criteria:

- Known static routes return 200.
- Unknown pages and invalid blog slugs return a genuine HTTP 404.
- A real `404.html` exists and renders a useful recovery path.
- Missing assets do not return HTML with status 200.

#### VIS-03: public identity is inconsistent

Priority: P0<br />
Status: verified

The visible hero, About, title, description, schema, and share image now consistently use Cloud Architect. Public writing remains a separate content gap.

Done criteria:

- Homepage, About page, metadata, OG image, structured data, GitHub, and
  LinkedIn use compatible current role language.
- One typed profile source owns duplicated public facts.
- The homepage title and description communicate name, role, and relevant
  expertise without keyword stuffing.
- `9+ years` replaces `Over 9+ years`.

#### VIS-04: the personal domain is not yet a leading branded search result

Priority: P0<br />
Status: in progress

In the audit search sample, LinkedIn and older research surfaced more readily
than the personal website for the exact name and role-related queries.

Tracked queries:

- `Babak Barghi`
- `Babak Barghi Cloud Architect`
- `Babak Barghi Continental`
- `site:babakbarghi.com Babak Barghi`

Done criteria:

- Search Console reports `/` and `/about` as indexed.
- Bing Webmaster reports the same canonical URLs as indexed.
- The personal domain appears on the first result page for `Babak Barghi`.
- Stretch target: the personal domain is a top-three organic branded result.

Search results vary by engine, location, language, device, and personalization.
Track the trend with Search Console/Bing evidence and a repeatable private
search sample rather than treating one manual query as an absolute ranking.

Current evidence:

- The 2026-07-26 search sample still surfaced LinkedIn and research results
  before the personal domain.
- The live sitemap and robots sitemap directive are reachable.
- Google domain verification exists in DNS.
- Sia confirmed the Google Search Console and Bing Webmaster portal work is
  complete.
- IndexNow accepted the three canonical sitemap URLs with HTTP 202.
- On 2026-11-18, GSC confirmed the homepage is indexed with the correct
  canonical. Current traffic and inspection evidence is in the re-audit
  checkpoint. Bing, About indexing, and branded ranking remain unverified.

#### VIS-05: there is no authoritative profile page or entity markup

Priority: P0<br />
Status: in progress

About, the shared typed profile, ProfilePage/Person schema, and confirmed social links are live. The stable identity is https://www.babakbarghi.com/#person. Public research detail remains future content.

Done criteria:

- `/about` presents approved identity, career, expertise, selected work, public
  research, and authoritative profile links.
- Visible page text and JSON-LD agree.
- `sameAs` contains only confirmed public profiles and publications.
- The About page is present in navigation and the sitemap.

#### VIS-06: the blog weakens rather than strengthens authority

Priority: P1<br />
Status: in progress

The unpromoted /blog route still shows No posts yet. It is removed from primary navigation; drafts remain unpublished. Substantive writing is still outstanding.

Done criteria:

- At least three substantive first-person posts answer specific questions.
- Every post includes author, publication date, modified date where relevant,
  canonical URL, description, and Article JSON-LD.
- Each post links back to the About profile and relevant selected work.
- If substantive posts are not ready, the Blog is de-emphasized until it earns
  its primary-navigation position.

#### VIS-07: project proof is selected by GitHub stars

Priority: P1<br />
Status: in progress

Two locally curated projects replace GitHub-star selection. Each explains its problem and approach. Fuller architecture, constraint, decision, and outcome evidence remains future work.

Done criteria:

- Selected work is explicitly curated.
- Each case study explains the problem, constraints, architecture, decisions,
  ownership, and outcome.
- GitHub remains supporting evidence, not the site's information architecture.

### UX and content

#### UX-01: there is no clear next action

Priority: P1<br />
Status: verified

The hero leads to Selected work and About. About links to contact and the professional profile; header social/contact links remain available.

Done criteria:

- The homepage has one primary path to selected work or About.
- Contact remains available without dominating the page.
- The call to action uses plain personal language rather than recruiter or
  LinkedIn-style copy.

#### UX-02: live third-party data controls visible copy

Priority: P1<br />
Status: verified

Selected work, book titles/authors, and reading notes are repository-owned. Runtime GitHub/Open Library fetching and the unused cache are removed. Book cards use local text artwork and fetch no external covers.

Done criteria:

- Public copy is stored in the repository and reviewed with code.
- External sources are linked as references rather than used as runtime content
  authorities.
- The homepage remains complete when all third-party APIs are unavailable.

#### UX-03: copy cleanup is needed

Priority: P1<br />
Status: verified

The redundant career phrasing, awkward reading copy, runtime repository descriptions, and empty primary blog navigation are corrected in the verified 2026-11-18 release.

Done criteria:

- Normal text meets WCAG AA contrast.
- Muted text remains visually subordinate without becoming unreadable.
- Automated accessibility returns 100 or documents any justified remaining
  limitation.

#### A11Y-02: focus and hover colors are too dark

Priority: P1<br />
Status: in progress

- The `#1B4332` focus ring is approximately 1.79:1 against the background.
- The `#2D5A45` hover color is approximately 2.51:1 against the background.

Local implementation:

- Hover text uses a compliant green token.
- Focus rings use the compliant accent-light token.
- Decorative SVGs are hidden from the accessibility tree.

Done criteria:

- Keyboard focus indicators meet non-text contrast requirements.
- Hover and focus states remain visible without depending only on color.
- A manual keyboard pass verifies order, visibility, and no focus traps.

### Performance

#### PERF-01: the presentation image is oversized

Priority: P1<br />
Status: in progress

The 2,268 by 3,083 JPEG is approximately 1.11 MB and is displayed at a fraction
of that size. It has no explicit intrinsic dimensions or responsive sources.

Local implementation:

- Three responsive WebP widths are generated from the unchanged source image.
- `srcset`, `sizes`, intrinsic dimensions, async decoding, and high fetch
  priority are present.
- Lighthouse selected the 768-pixel WebP at approximately 71 KiB.

Done criteria:

- AVIF and/or WebP variants cover mobile and desktop display sizes.
- `width`, `height`, and/or an explicit aspect ratio reserve layout space.
- The browser does not download the original 1.11 MB asset for normal views.
- Total homepage transfer is at most 400 KiB on a cold mobile audit.

#### PERF-02: Google Fonts blocks rendering and causes layout shift

Priority: P1<br />
Status: in progress

The Google Fonts stylesheet contributed an estimated 550 ms of render blocking.
The Inter font swap caused the measured CLS. Local Geist variable fonts already
exist in the repository.

Local implementation:

- The same Inter and JetBrains Mono font families are bundled locally with
  their upstream OFL licenses.
- Google Fonts connections and stylesheet requests were removed.
- CLS remained 0.049 in the repeatable local audit.

Done criteria:

- Fonts are self-hosted or the system stack is used.
- Font loading does not create a measurable layout shift.
- The browser makes no font request to Google.

#### PERF-03: the static site ships avoidable JavaScript

Priority: P2<br />
Status: in progress

Lighthouse estimated approximately 36 KiB of unused JavaScript in the main
bundle. The current site is primarily static content.

Local implementation:

- Every current route is useful from generated HTML without client execution.
- Existing dynamic GitHub and Open Library behavior remains hydrated rather
  than changing the visible experience.
- Further JavaScript reduction is deferred because it would broaden the
  architecture change beyond the locked-UI scope.

Done criteria:

- Static pages work without client JavaScript.
- JavaScript is limited to interactions that genuinely require it.
- Performance remains at least 95 on mobile after the architecture work.

### Search metadata and structured data

#### SEO-01: social metadata is incomplete and stale

Priority: P1<br />
Status: verified

Cloud Architect is consistent across homepage metadata, About, schema, and the regenerated share image. Social-image URLs are absolute. ProfilePage/Person schema and article author identity are shared; article output is covered without publishing drafts.

Done criteria:

- Social images use absolute canonical URLs.
- Homepage and About metadata reflect the current profile source.
- Posts expose Article metadata and link to the same Person entity.

#### SEO-02: the sitemap is valid but minimal

Priority: P2<br />
Status: open

The sitemap includes all current canonical routes, but it contains only three
URLs and no modification dates. The larger issue is content depth, not sitemap
syntax.

Done criteria:

- About, selected work, and substantive posts are included.
- `lastmod` is emitted only from trustworthy content dates.
- Search Console and Bing process the sitemap without errors.

### Privacy and legal

#### LEGAL-01: no Impressum exists

Priority: P1<br />
Status: open

The site is a professional public profile and is not clearly limited to private
or family purposes. The exact required identity, address, contact, and
responsibility wording must be confirmed before publication.

Done criteria:

- A reviewed Impressum is directly reachable from every page.
- Required public details are accurate and intentionally approved.

#### PRIV-01: no privacy notice exists

Priority: P1<br />
Status: open

Current visitors contact Cloudflare, the origin host, Google Fonts, GitHub,
Open Library, and Archive.org. Server/CDN logs and third-party requests can
process network identifiers.

Done criteria:

- A precise privacy notice describes actual processing, purposes, legal bases,
  recipients, retention, and user rights.
- Unnecessary third-party requests are removed before writing the final notice.
- No generic cookie banner is added unless future functionality actually
  requires consent.

#### PRIV-02: public email and third-party book covers need an intentional policy

Priority: P2<br />
Status: open

- The personal Gmail address is directly exposed in the page source.
- Book-cover provenance and reuse terms have not been documented.

Done criteria:

- Contact exposure is an explicit choice.
- Book imagery is licensed, self-hosted with provenance, or replaced by a
  text-only presentation.

### Security and domain posture

#### SEC-01: legacy TLS remains enabled

Priority: P2<br />
Status: open

Cloudflare's minimum TLS version is 1.0. Audit requests restricted to TLS 1.0
and TLS 1.1 both succeeded.

Done criteria:

- Minimum TLS is raised after confirming required client compatibility.
- Modern TLS remains verified from an external client.

#### SEC-02: Cloudflare-to-origin validation is not strict

Priority: P2<br />
Status: open

Cloudflare SSL mode is `Full`, not `Full (strict)`. The origin currently
presents a certificate that validated successfully during the direct audit.

Done criteria:

- Origin certificate validity and renewal are confirmed.
- Cloudflare uses strict origin certificate validation.

#### SEC-03: the origin can be reached directly

Priority: P2<br />
Status: open

The live site is accessible at the shared VPS IP when the canonical Host/SNI is
provided, so Cloudflare bot and firewall controls are not a complete security
perimeter.

This is a shared production VPS. Origin restrictions must be reviewed across
all hosted applications before any firewall change.

Done criteria:

- The intended perimeter is documented.
- If Cloudflare is the perimeter, HTTP/S origin access is restricted using a
  shared-host-safe design.

#### SEC-04: security response headers are absent

Priority: P2<br />
Status: open

Confirmed missing headers include:

- Strict-Transport-Security;
- Content-Security-Policy;
- X-Content-Type-Options;
- Referrer-Policy;
- Permissions-Policy;
- frame restrictions through CSP or X-Frame-Options.

Done criteria:

- Headers are defined at the correct shared proxy, Cloudflare, or application
  layer.
- CSP is tested against the final self-hosted asset and API design.
- HSTS scope is enabled only after checking all affected subdomains.

#### SEC-05: domain email authentication is incomplete

Priority: P2<br />
Status: open

The domain has forwarding MX records and SPF with soft fail, but no DMARC record
was found in the audit.

Done criteria:

- Actual senders and forwarding behavior are documented.
- DMARC starts in a reporting-safe mode and advances only from evidence.
- DKIM is configured if the domain sends authenticated mail.

### Engineering quality

#### ENG-01: formatting is not green

Priority: P2<br />
Status: open

Prettier reported 27 files with style issues. The CI workflow does not run a
format gate.

Done criteria:

- Formatting is applied in a focused mechanical change.
- A reproducible `format:check` script is present and runs in CI.
- Line-ending policy is explicit.

#### ENG-02: lint configuration is stale

Priority: P2<br />
Status: open

The repository contains an ESLint configuration but no lint script and does not
declare the referenced ESLint and TypeScript ESLint packages.

Done criteria:

- Either a supported lint configuration and script are restored or the dead
  configuration is removed.
- CI runs the selected static-analysis gate.

#### ENG-03: dependency advisories and updates are outstanding

Priority: P1<br />
Status: verified

The audit baseline had 51 advisories. Compatible dependency updates plus same-major overrides for fflate, picomatch, rollup, source-map-js, and ws now produce a clean audit across 424 checked packages. React 19.3.1, React Router 7.18.6, Vite 7.3.8, Vitest 4.1.12, and Sharp 0.35.5 pass the release checks. Bun 1.4.4 resolves the production-renderer failure on the older runtime.

Done criteria:

- Compatible updates land in small groups with tests and builds between groups.
- `bun audit` is reviewed after each group.
- Remaining advisories are documented by actual exposure, not ignored solely
  because of package severity labels.

#### ENG-04: test coverage does not exercise the real browser or server contract

Priority: P1<br />
Status: in progress

The suite has 15 unit tests and four real HTTP tests run against local Docker and public production. Static content, metadata, routes, 404 statuses, tracker JavaScript, share image, sitemap, profile entity, and exact public revision are covered. Manual keyboard/focus behavior and full browser navigation contracts remain unverified.

Done criteria:

- Static output tests inspect visible body HTML.
- Browser tests cover canonical routes, keyboard behavior, and 404 navigation.
- A deployed smoke check verifies HTTP status, content type, canonical metadata,
  and visible text.

### Repository and deployment operations

#### OPS-01: deployment success does not prove live success

Priority: P1<br />
Status: verified

The workflow builds and tests the real image, triggers deployment, waits for the exact public revision, then verifies HTTP serving. It preserves the existing deploy-only credential without API read permission. Run 44416051994 passed the complete gate.

Done criteria:

- Deployment completion is observed.
- Canonical routes and one unknown route are checked after deployment.
- A failed smoke test fails the release gate with a useful URL/status report.

#### OPS-02: Coolify health is unknown

Priority: P2<br />
Status: verified

Health checks use port 80 at /. Coolify reports running:healthy and zero restarts. Unknown routes are independently verified as 404s.

Done criteria:

- A lightweight health target is defined.
- Coolify reports a meaningful healthy/unhealthy state.
- Health does not treat an arbitrary SPA fallback as success.

#### OPS-03: repository protections are minimal

Priority: P2<br />
Status: open

- `master` is not branch-protected.
- GitHub vulnerability alerts are disabled.
- CI uses `bun-version: latest` while `package.json` declares Bun 1.2.23.
- A push to `master` can lead to a live deployment.

Done criteria:

- Vulnerability alerts are enabled.
- Bun uses the repository's declared version or another explicit policy.
- Branch protection and required checks are evaluated for the solo-maintainer
  workflow.
- Deployment concurrency prevents older releases from racing newer ones.

## Progress tracker

| ID               | Deliverable                                   | Priority | Status      | Evidence required                                         |
| ---------------- | --------------------------------------------- | -------- | ----------- | --------------------------------------------------------- |
| VIS-01           | Meaningful static HTML for all public routes  | P0       | verified    | Cache-busted curl contains visible content                |
| VIS-02           | Real 404 status and page                      | P0       | verified    | Known routes 200, unknown page and asset 404              |
| VIS-03           | One current identity source                   | P0       | verified    | Homepage, About, metadata, OG, schema agree               |
| VIS-04           | Personal domain visible in branded search     | P0       | in progress | Search Console/Bing indexed plus repeatable search sample |
| VIS-05           | About page and Person/ProfilePage schema      | P0       | in progress | Visible HTML, valid JSON-LD, sitemap entry                |
| VIS-06           | Three substantive posts or de-emphasized blog | P1       | in progress | Published article URLs and schema                         |
| VIS-07           | Curated selected work                         | P1       | in progress | Reviewed case studies independent of GitHub stars         |
| UX-01            | Clear visitor next action                     | P1       | verified    | Homepage usability review                                 |
| UX-02            | Repository-owned visible copy                 | P1       | verified    | Site complete with third-party APIs blocked               |
| UX-03            | Copy cleanup                                  | P1       | verified    | Editorial pass                                            |
| A11Y-01          | AA text contrast                              | P1       | in progress | Lighthouse/axe and manual review                          |
| A11Y-02          | Visible focus and hover states                | P1       | in progress | Keyboard review and contrast checks                       |
| PERF-01          | Responsive optimized hero image               | P1       | in progress | Homepage transfer at most 400 KiB                         |
| PERF-02          | Self-hosted/system fonts                      | P1       | in progress | No Google font requests, lower CLS                        |
| PERF-03          | Static-first JavaScript budget                | P2       | in progress | Static pages work with JS disabled                        |
| SEO-01           | Current social/article metadata               | P1       | verified    | Raw HTML and social preview checks                        |
| SEO-02           | Expanded trustworthy sitemap                  | P2       | open        | Search-console processed sitemap                          |
| LEGAL-01         | Reviewed Impressum                            | P1       | open        | Direct link from all pages                                |
| PRIV-01          | Accurate privacy notice                       | P1       | open        | Notice matches measured requests                          |
| PRIV-02          | Contact and image provenance policy           | P2       | open        | Documented decision                                       |
| ENG-03           | Dependency update and audit pass              | P1       | verified    | Green tests/build and reviewed audit                      |
| ENG-04           | Browser/server contract tests                 | P1       | in progress | Green static, browser, and deployed smoke checks          |
| OPS-01           | Verified post-deploy smoke gate               | P1       | verified    | Workflow evidence from a deployment                       |
| SEC-01 to SEC-05 | Infrastructure/domain hardening               | P2       | open        | Read-back verification per finding                        |
| ENG-01 to ENG-02 | Formatting and lint gates                     | P2       | open        | Green local and CI gates                                  |
| OPS-02 to OPS-03 | Health and repository protections             | P2       | in progress | Coolify/GitHub read-back verification                     |

## Re-audit checklist

Run at each visibility milestone:

1. `bun run test`
2. `bunx tsc --noEmit`
3. `bun run build`
4. Formatting and lint gates once they exist.
5. Inspect built HTML for visible content, title, description, canonical URL,
   OG/Twitter fields, and JSON-LD.
6. Cache-busted HTTP checks for `/`, `/about`, `/blog`, every post, an unknown
   page, and a missing asset.
7. Fresh mobile Lighthouse.
8. Fresh desktop and mobile screenshots.
9. Search Console URL Inspection and sitemap status.
10. Bing Webmaster URL and sitemap status.
11. Repeat the tracked branded-search sample without personalization.
12. Update the baseline, progress table, audit date, and evidence links here.

## Documentation rules

- Update this document when a measured baseline, status, priority, architecture,
  or done criterion changes.
- Keep implementation sequencing and commit slices in the visibility plan.
- Do not mark search visibility complete from structured data or sitemap
  submission alone.
- Do not claim an index or ranking improvement without current search-engine
  evidence.
- Keep approved public identity facts separate from stale Resume material.
- Treat every push to `master` as a deployment-affecting action.
