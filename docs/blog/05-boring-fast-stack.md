# My Boring, Fast Stack

- **Status:** outlined
- **Type:** tooling / community
- **Serves:** professional signal + community
- **Sources:** boring-network, KinoWeek, general workflow (uv/ruff/ty, Bun,
  Coolify/Hetzner, GitHub Actions → GHCR)
- **Length:** ~1,000 words
- **Why:** closes the arc where 01 opened — "boring on purpose."

## Hook

My stack is deliberately boring. `uv`, `ruff`, `ty`, Bun, a Hetzner box
running Coolify, GitHub Actions pushing to GHCR. No managed magic. And it's
the fastest I've ever shipped.

## Argument

For a solo builder, "boring and self-hosted" beats managed complexity. Fewer
moving parts, no vendor lock-in, predictable cost, and tooling fast enough
that the feedback loop never breaks your flow.

## Outline

- **Python, but fast:** `uv` for envs/deps, `ruff` for lint+format, `ty` for
  types. The whole loop is sub-second; that changes how you work.
- **Deploy:** GitHub Actions → GHCR → Coolify on Hetzner. One cheap box,
  manifest-driven, scales to ~15 services without a platform team.
- **A deliberate constraint:** keep LLMs and a runtime DB *out* of the core
  pipeline (per boring-network). The published contract is just `latest.json`
  plus weekly snapshots. Boring = debuggable.
- What I *don't* run and why (no k8s, no serverless sprawl, minimal SaaS).

## Takeaway

Choose boring on purpose. Every exciting piece of infra is a pager waiting to
go off. Optimize for the number of things that can break, not the number of
buzzwords on your homepage.

## Notes / risks

- Verify exact versions/tools before publishing (uv/ruff/ty, Bun, Coolify).
- Could include a tiny CI YAML snippet — keep to one.
