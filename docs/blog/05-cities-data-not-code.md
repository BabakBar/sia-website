# Cities Should Be Data, Not Code

- **Status:** outlined
- **Type:** systems architecture / product scaling
- **Primary sources:** boring-network, BoringHannover
- **Length:** ~1,100 words
- **Core claim:** scaling a side project is often about finding the one axis of
  variation and turning it into data before you duplicate the system.

## Hook

The trap was obvious: copy the Hannover workflow, rename a few files, and call it
Barcelona. That would work exactly once.

## Evidence

- BoringHannover stays public and operational.
- boring-network starts with Barcelona but is designed around city manifests.
- Deployment target: GitHub Actions -> GHCR -> Coolify on Hetzner.
- Published contract: `latest.json` plus weekly snapshots.
- Deliberate constraints: no runtime DB, no LLMs in the core ingestion path,
  advanced guardrails deferred until the product earns them.

## Structure

1. What worked in Hannover.
2. Why naive copy-paste fails at city two or three.
3. City as data: source catalogs, config, categories, occasions, overrides.
4. Contract over internals: publish stable JSON so UI/consumers stay decoupled.
5. Deliberate no's: no database yet, no LLM critical path, no k8s, no CMS.
6. Lesson: reusable architecture should serve the next city, not architecture
   purity.

## One concrete artifact

Diagram: `city manifest -> source runners -> normalized events -> latest.json -> static UI`.

## Takeaway

Do not scale by cloning code. Find the dimension that changes and make that the
input.

## Risks

- Do not claim 15 cities are live if they are not.
- Keep source details private if the repo stays private.
