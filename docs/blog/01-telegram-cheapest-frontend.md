# Telegram Is the Cheapest Frontend I Know

- **Status:** draft in site; review pending
- **Type:** interface opinion / field note
- **Primary sources:** KinoWeek/BoringHannover, FabrikTakt, Hermes, OpenClaw
- **Length:** ~1,050 words
- **Core claim:** for one-user tools, internal tools, and early product probes, a
  chat bot often beats a web app because it removes authentication, mobile UI,
  push notifications, media input, and deployment surface area.

## Hook

Most of my useful tools did not start with a React app. They started as a script
that messaged me on Telegram.

## Why this fits me

This is the cleanest opener because it connects many projects without becoming a
generic "AI tools" post. It shows taste: choose the lowest-cost interface that
gets value to the user.

## Evidence

- **KinoWeek:** weekly Hannover cinema/concert digest, no dashboard needed.
- **BoringHannover:** the workflow later earned a public interface for browsing,
  filtering, sharing, and search.
- **FabrikTakt:** shop-floor knowledge capture through voice/text, where a web
  form would kill adoption.
- **Hermes:** stock checks are an alerting problem, not a website problem.
- **OpenClaw:** occasional read-only Hetzner VPS health checks from Telegram,
  behind narrow operational guardrails.

## Structure

1. The hidden cost of a "real frontend": auth, routing, state, mobile, hosting,
   design debt, and notification plumbing.
2. What Telegram gives for free: identity via chat ID, push notifications, voice,
   media, buttons, delivery, and an interface people already know.
3. Where it works: one-user tools, ops tools, alerts, capture flows, approval
   flows, weekly digests.
4. Where it fails: dashboards, dense comparison, multi-user permissions,
   complex layout, public SEO pages.
5. Rule of thumb: start with the interface that gets to first value fastest;
   graduate only when the workflow earns it.

## One concrete artifact

Two small text diagrams: the basic event-to-decision loop and the shared
Telegram surface across digests, voice capture, alerts, and health checks.

## Takeaway

Do not open a blank React app by default. If the product is a habit, alert, or
capture loop, a bot may be the frontend.

## Risks

- Do not overclaim that bots replace all UIs.
- Keep Hermes details light unless the private repo is cleaned for sharing.
- Keep OpenClaw operational details abstract; do not publish private host,
  credential, or deployment information.
