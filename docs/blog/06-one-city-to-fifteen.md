# One City to Fifteen

- **Status:** outlined
- **Type:** systems architecture
- **Serves:** professional signal (architect altitude)
- **Sources:** BoringHannover → boring-network
- **Length:** ~1,100 words
- **Why:** shows you can go from weekend script to a real platform.

## Hook

BoringHannover was a weekend script that scraped a few venues in one city.
Then I wanted Barcelona. Then I wanted fifteen cities. That jump — from script
to platform — is where most side projects quietly die.

## Angle

The architecture decisions that let one city become many *without* one
codebase per city: manifest-driven workflows, a published contract, and a
hard rule about what stays out of the core.

## Outline

- The trap: copy-paste a new workflow per city → 15 workflows to maintain.
  Instead, one manifest-driven pipeline; cities are data, not code.
- The contract: `latest.json` + weekly snapshots. Consumers never touch your
  internals; you can rewrite the pipeline freely.
- The deliberate "no": LLMs and a runtime DB stay out of the core pipeline.
  Basic publish safety in, advanced guardrails deferred (YAGNI).
- Deploy model that scales: GitHub Actions → GHCR → Coolify, one manifest
  driving many sources.
- What changed from BoringHannover (reference-only) to boring-network (the
  multi-city platform) — and what I intentionally left the same.

## Takeaway

Scaling a side project isn't more code — it's finding the one axis that varies
(the city) and turning it into data. Everything else stays boring and shared.

## Notes / risks

- boring-network is private; keep to architecture, no secrets/sources dump.
- One diagram: manifest → pipeline → `latest.json` per city.
