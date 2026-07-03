# One VPS, Many Small Systems

- **Status:** outlined
- **Type:** infrastructure / operating model
- **Primary sources:** Coolify/Hetzner deployments, BoringHannover,
  boring-network, Taliman-Website, monitoring, subs-tracker
- **Length:** ~1,000 words
- **Core claim:** for small systems, a simple self-hosted deployment model can be
  more understandable and cheaper than managed-platform sprawl.

## Hook

Most of my projects do not need Kubernetes. They need a boring place to run and a
boring way to redeploy.

## Evidence

- Coolify on Hetzner.
- GHCR/Docker deployment path.
- Static Astro sites and static dashboards where possible.
- Monitoring repo with Netdata and planned observability tools.
- Boring-network target: GitHub Actions -> GHCR -> Coolify.

## Structure

1. The problem with managed-service sprawl for small projects.
2. One VPS as a forcing function: know what runs, what breaks, what costs money.
3. Containers where useful, static files where enough.
4. Monitoring before complexity.
5. What this model is not good for: regulated workloads, high availability,
   large teams, compliance-heavy systems.

## One concrete artifact

Simple deployment map: GitHub -> GHCR -> Coolify -> app domains -> monitoring.

## Takeaway

The best infrastructure for a small system is the one you can understand during
a bad evening.

## Risks

- Keep private domains and security details out.
