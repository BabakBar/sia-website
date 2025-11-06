# Modernization Plan

## Phase 0: Dependency Audit (Complete)

**Finding:** Only 3 npm packages imported in source code:

- react, react-dom (core)
- react-helmet-async (SEO)

**Essential build/dev tools:**

- vite, @vitejs/plugin-react, typescript
- tailwindcss, @tailwindcss/postcss, postcss, autoprefixer
- vite-plugin-pwa (active PWA config)
- eslint tooling (decision pending)

**Dead weight (40 packages):** Three.js stack, Recharts, Zod, React Query, Radix UI (27 components), framer-motion, lucide-react, react-hook-form, React Router, date-fns, emailjs-com, clsx, class-variance-authority, tailwind-merge, tailwindcss-animate

**Vite config mismatch:** vite.config.ts:69-82 chunks/optimizes packages not imported anywhere

---

## Phase 1: Remove Unused Dependencies (15 min)

**Target:** Prune 40 unused packages

**Files to change:**

- `package.json` - Remove unused dependencies (full list from depcheck)
- `src/main.tsx:3` - Remove BrowserRouter import
- `src/main.tsx:11-18` - Remove BrowserRouter wrapper, keep HelmetProvider wrapper
- `vite.config.ts:69-75` - Delete entire manualChunks object (all chunks reference unused packages)
- `vite.config.ts:80-82` - Delete optimizeDeps block entirely

**Packages to keep:**

- react, react-dom, @types/react, @types/react-dom
- react-helmet-async
- tailwindcss, @tailwindcss/postcss, postcss, autoprefixer
- vite, @vitejs/plugin-react, typescript
- vite-plugin-pwa (PWA config exists in vite.config.ts)
- eslint tooling (if keeping linting)

**Why:** Reduces node_modules from ~500MB to <100MB, faster installs, clearer dependencies, no security audit noise for unused code

**Validation:**

```bash
bun install  # Auto-updates bun.lock, no separate lockfile step needed
bun run build
bun run dev
```

**Note:** After removing 40 packages, bun.lock will automatically reflect the changes on next install

---

## Phase 2: Safe Minor Updates (5 min)

**Target:** Patch/minor bumps for actively used packages

**Updates:**

- react: 19.1.1 → 19.2.0
- react-dom: 19.1.1 → 19.2.0
- @types/react-dom: 19.2.1 → 19.2.2
- vite: 7.1.8 → 7.2.1
- tailwindcss: 4.1.11 → 4.1.17 (experimental, but already on 4.x)
- @tailwindcss/postcss: 4.1.14 → 4.1.17
- @vitejs/plugin-react: 5.0.4 → 5.1.0
- typescript: 5.9.2 → 5.9.3
- react-helmet-async: check for updates

**Files to change:**

- `package.json` - bump versions

**Why:** Bug fixes, performance, React 19 refinements

**Validation:** Same as Phase 1

---

## Phase 3: Add Testing Infrastructure (30 min)

**Target:** Vitest setup for future-proofing

**New dependencies:**

- vitest, @vitest/ui
- @testing-library/react, @testing-library/user-event
- jsdom

**Files to create:**

- `vitest.config.ts`
- `src/__tests__/App.test.tsx` (sample smoke test)

**Files to change:**

- `package.json` - add `"test": "vitest run"`, `"test:ui": "vitest --ui"`
- `tsconfig.json` - add `"vitest/globals"` to `compilerOptions.types` array (or create `src/vitest.d.ts` with `/// <reference types="vitest/globals" />`)

**Why:** No tests exist. Needed before adding features or doing risky upgrades

**Validation:**

```bash
bun run test
```

---

## Phase 4: ESLint Decision Point (1-2 hours OR removal)

**Problem:** ESLint v9 flat config migration breaks existing plugins

- `eslint-plugin-prettier@5` - no flat config support
- `eslint-plugin-react-refresh@0.4` - experimental flat config

### Option A: Migrate to ESLint v9

Updates:

- eslint: 8.57 → 9.39
- @typescript-eslint/*: 6.21 → 8.46
- eslint-config-prettier: 9.1 → 10.1
- eslint-plugin-react-hooks: 4.6 → 7.0

Changes:

- Drop eslint-plugin-prettier (use `prettier --check` in CI instead)
- Verify eslint-plugin-react-refresh v0.4 flat config compatibility
- Rewrite `.eslintrc.cjs` → `eslint.config.js`
- Update `package.json` lint scripts

### Option B: Remove ESLint entirely

- Delete all eslint-* packages
- Use TypeScript compiler (`tsc --noEmit`) + Prettier for formatting
- Simpler, faster, fewer deps

**Files affected:**

- `.eslintrc.cjs` (delete or rewrite)
- `package.json` (update or remove lint scripts)

**Sia's decision needed:** Migrate or remove?

---

## Phase 5: PWA Plugin Upgrade (30 min)

**Target:** vite-plugin-pwa major version

**Updates:**

- vite-plugin-pwa: 0.21.2 → 1.1.0

**Files to review:**

- `vite.config.ts:10-52` - PWA manifest and workbox config
- Check for breaking API changes in plugin options

**Why:** Active PWA config exists, should keep it maintained

**Validation:**

```bash
bun run build
# Check dist/manifest.webmanifest and service worker generation
```

---

## Phase 6: Optional Additions (Future)

**React Router v7** - Only if multi-page navigation needed. Currently using hash-based nav (href="#about").

**Component Library** - Reinstall Radix UI selectively when building forms/modals (don't preinstall everything).

**Animation** - Add framer-motion only when animation needs emerge.

**Forms** - Add react-hook-form + zod when contact form or data entry required.

---

## Success Criteria (Every Phase)

1. `bun install` succeeds
2. `bun run build` succeeds with no chunk errors (includes tsc check)
3. `bun run dev` starts without warnings (except browser deprecations)
4. Manual test: Navigate site, check responsiveness
5. After Phase 3: `bun run test` passes

Note: No separate `tsc --noEmit` needed since build script already runs it

---

## Rollback Strategy

Each phase = separate git commit.

Rollback: `git revert <commit-hash>` (safer than reset --hard on shared branches)

Abort entire modernization: `git reset --soft <starting-commit>` (preserves file changes for review)

---

## Post-Modernization Checklist

- [ ] Update README.md with new dependency count
- [ ] Document testing strategy
- [ ] Add `.nvmrc` or `.node-version` for node 22.x
- [ ] Configure Dependabot/Renovate for automated updates
- [ ] Add precommit hook for tests (optional)
