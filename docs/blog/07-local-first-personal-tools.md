# Local-First Is Underrated for Personal Tools

- **Status:** outlined
- **Type:** personal tools / architecture
- **Primary sources:** subs-tracker, BookmarkAI phase 0, Obsidian/dotfiles
- **Length:** ~900 words
- **Core claim:** many personal tools do not need a backend, login, or cloud
  database at the beginning. They need a trustworthy local workflow.

## Hook

For a subscription dashboard that only I use, a database would have been the
least private and most complicated part of the system.

## Evidence

- subs-tracker: static app, localStorage, CSV import, treemap/beeswarm/circle
  pack views, JSON backup, no backend.
- BookmarkAI phase 0: import and organize existing bookmarks before building a
  browser extension.
- Obsidian/dotfiles: personal knowledge and setup live close to the user.

## Structure

1. Personal tools have different constraints than SaaS products.
2. Why localStorage/static hosting is enough for some workflows.
3. Backup/export matters more than account systems.
4. When local-first stops being enough: multi-device sync, collaboration,
   sensitive recovery needs.
5. Lesson: start with data ownership and workflow trust.

## One concrete artifact

Decision checklist: local-first vs backend.

## Takeaway

If the user is one person and the data is private, local-first may be the most
honest architecture.
