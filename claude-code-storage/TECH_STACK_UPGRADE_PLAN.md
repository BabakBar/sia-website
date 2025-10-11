# Tech Stack Upgrade & Migration Plan

**Project**: sia-website (Babak Barghi Portfolio)
**Current State**: Vite + React 18 + Bun (Post Next.js Migration)
**Analysis Date**: October 11, 2025
**Environment**: Node.js 22.13.1, Bun 1.2.19

---

## Executive Summary

### Current Tech Stack Status

| Technology | Current Version | Latest Stable | Status | Priority |
|------------|----------------|---------------|--------|----------|
| React | 18.3.1 | 18.3.1 / 19.2.0 | ✅ **CURRENT** | Low |
| Vite | 5.4.20 | 6.x / 7.1.9 | ⚡ **SAFE UPDATE** | Medium |
| TypeScript | 5.9.3 | 5.9.3 | ✅ **CURRENT** | N/A |
| Tailwind CSS | 3.4.18 | 3.4.18 / 4.1.14 | ✅ **CURRENT** | Low |
| Bun | 1.2.19 | 1.2.19 | ✅ **CURRENT** | N/A |
| Node.js | 22.13.1 | 22.x | ✅ **CURRENT** | N/A |

### Overall Assessment

**Current Stack Quality**: ⭐⭐⭐⭐⭐ Excellent
**Production Readiness**: ✅ Fully Ready
**Upgrade Urgency**: 🟢 Low (All core dependencies at latest stable versions)

---

## 1. Immediate Status (No Action Required)

### ✅ Already at Latest Stable Versions

#### React 18.3.1
- **Status**: Latest React 18.x release
- **Next Major**: React 19.2.0 available
- **Recommendation**: **STAY on 18.3.1**
- **Reason**:
  - React 18.3.1 is the stable, production-ready version
  - React 19 has breaking changes requiring code migration
  - No critical features in React 19 needed for current project scope

#### TypeScript 5.9.3
- **Status**: Latest stable release
- **Recommendation**: **KEEP**
- **No action required**

#### Tailwind CSS 3.4.18
- **Status**: Latest v3.x release
- **Next Major**: v4.1.14 available
- **Recommendation**: **STAY on v3.4.18**
- **Reason**:
  - Tailwind v4 is a complete rewrite
  - Would require 2-3 days of migration work
  - No critical business need for v4 features

---

## 2. Optional Safe Upgrade: Vite 5 → 6

### Upgrade Overview

**Effort**: 🟢 Low (30-60 minutes)
**Risk**: 🟢 Low
**Benefits**: ⚡ Performance + stability improvements
**Recommended Timeline**: Within 1-2 weeks

### Current State
```json
{
  "vite": "^5.4.20",
  "@vitejs/plugin-react": "^4.2.1"
}
```

### Target State
```json
{
  "vite": "^6.0.0",
  "@vitejs/plugin-react": "^5.0.0"
}
```

### Benefits of Vite 6

1. **Performance**:
   - Faster HMR (Hot Module Replacement)
   - Improved build times
   - Better caching strategies

2. **Stability**:
   - Environment API improvements
   - Better error messages
   - Plugin compatibility fixes

3. **Developer Experience**:
   - Improved TypeScript support
   - Better sourcemaps
   - Enhanced debugging

### Migration Steps

#### Step 1: Upgrade Dependencies
```bash
# Upgrade Vite and React plugin
bun add -d vite@^6.0.0 @vitejs/plugin-react@^5.0.0

# Verify installed versions
bun pm ls vite @vitejs/plugin-react
```

#### Step 2: Review vite.config.ts
```typescript
// /Users/Sia/Code/GitHub/sia-website/vite.config.ts
// Most likely NO changes needed - verify current config still works
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  // Existing config should work as-is
  plugins: [react(), VitePWA({...})],
  // ... rest of config
})
```

#### Step 3: Test Build
```bash
# Clean previous build
rm -rf dist

# Test TypeScript compilation
bunx tsc --noEmit

# Test production build
bun run build

# Verify bundle sizes
ls -lh dist/assets/

# Test preview
bun run preview
```

#### Step 4: Test Development Server
```bash
# Start dev server
bun run dev

# Verify HMR works by editing a component

# Check for console errors in browser
```

#### Step 5: Verify PWA Functionality
```bash
# After build, check PWA files
ls -la dist/ | rg -i "sw|manifest|workbox"

# Expected files:
# - manifest.webmanifest
# - sw.js (service worker)
# - registerSW.js
# - workbox-*.js
```

### Breaking Changes (Minimal)

From Vite 5 → 6 documentation:

1. **Plugin Hook Changes** (likely doesn't affect us):
   - `handleHotUpdate` → `hotUpdate` (if custom plugins used)
   - We're using standard plugins, so no impact

2. **Environment API** (backend only):
   - Only affects custom server setups
   - Our SPA config unaffected

3. **Default Port** (no change for us):
   - Still defaults to 3000 in our config

### Rollback Plan

If issues arise:
```bash
# Revert to Vite 5
bun add -d vite@^5.4.20 @vitejs/plugin-react@^4.2.1

# Rebuild
rm -rf dist node_modules bun.lock
bun install
bun run build
```

### Acceptance Criteria

- [ ] `bun run dev` starts successfully
- [ ] HMR works when editing components
- [ ] `bun run build` completes without errors
- [ ] Bundle size similar or smaller than before
- [ ] `bun run preview` serves production build correctly
- [ ] PWA manifest and service worker generated
- [ ] No TypeScript errors
- [ ] No ESLint errors
- [ ] All animations and styles work

---

## 3. Future Major Upgrades (Not Recommended Now)

### React 18 → 19 Migration (Planned for Q2 2025)

**Effort**: 🟡 Medium (2-3 days)
**Risk**: 🟡 Medium
**Recommended Timeline**: Q2 2025 (after React 19 ecosystem matures)

#### Why Wait

- React 19 is new (released December 2024)
- Ecosystem packages still catching up
- Current React 18.3.1 has all features we need
- No pressing business need for React 19 features

#### Breaking Changes to Consider

1. **Type Changes**:
   ```bash
   npm install --save-exact @types/react@^19.0.0 @types/react-dom@^19.0.0
   ```

2. **`act` Import Migration**:
   ```typescript
   // Before (React 18)
   import { act } from 'react-dom/test-utils'

   // After (React 19)
   import { act } from 'react'
   ```

3. **PropTypes Deprecation**:
   - Not used in our project (using TypeScript)
   - No action needed

4. **New Hooks**:
   - `useActionState` (replaces experimental `useFormState`)
   - `useOptimistic`
   - Could benefit contact form (when implemented)

#### Migration Checklist (When Ready)

- [ ] Update package.json to React 19
- [ ] Run React 19 migration codemods: `npx codemod@latest react/19/migration-recipe`
- [ ] Update TypeScript types
- [ ] Test all components
- [ ] Update documentation
- [ ] Deploy to staging first

---

### Tailwind CSS 3 → 4 Migration (Planned for Q3 2025)

**Effort**: 🔴 High (2-3 days)
**Risk**: 🟡 Medium
**Recommended Timeline**: Q3 2025 (after v4 ecosystem stabilizes)

#### Why Wait

- Tailwind v4 is a complete rewrite
- Requires updating ALL components
- Risk of UI regressions
- v3.4.18 is stable and sufficient
- Just completed Next.js → Vite migration (reduce change fatigue)

#### Major Breaking Changes

1. **CSS Import Syntax**:
   ```css
   /* Before (v3) */
   @tailwind base;
   @tailwind components;
   @tailwind utilities;

   /* After (v4) */
   @import "tailwindcss";
   ```

2. **PostCSS Configuration**:
   ```javascript
   // Before
   export default {
     plugins: {
       tailwindcss: {},
       autoprefixer: {},
     },
   };

   // After
   export default {
     plugins: {
       "@tailwindcss/postcss": {},
     },
   };
   ```

3. **Utility Class Renames**:
   - `shadow-sm` → `shadow-xs`
   - `shadow` → `shadow-sm`
   - `blur-sm` → `blur-xs`
   - `rounded-sm` → `rounded-xs`
   - `outline-none` → `outline-hidden`

4. **Custom Utilities Syntax**:
   ```css
   /* Before (v3) */
   @layer utilities {
     .custom-class {
       property: value;
     }
   }

   /* After (v4) */
   @utility custom-class {
     property: value;
   }
   ```

5. **Variant Stacking Order**:
   - Changed from right-to-left to left-to-right
   - Requires reversing variant order in some cases

#### Affected Files

All files with Tailwind classes:
- `/Users/Sia/Code/GitHub/sia-website/src/App.tsx`
- `/Users/Sia/Code/GitHub/sia-website/src/components/Navigation.tsx`
- `/Users/Sia/Code/GitHub/sia-website/src/pages/Home.tsx`
- `/Users/Sia/Code/GitHub/sia-website/src/globals.css`
- `/Users/Sia/Code/GitHub/sia-website/tailwind.config.ts`

#### Migration Checklist (When Ready)

- [ ] Backup entire project: `git checkout -b backup/pre-tailwind-v4`
- [ ] Run upgrade tool: `npx @tailwindcss/upgrade`
- [ ] Review all changed files manually
- [ ] Update CSS import syntax
- [ ] Update PostCSS config
- [ ] Rename affected utility classes
- [ ] Convert custom utilities to `@utility` syntax
- [ ] Test all components visually
- [ ] Test responsive breakpoints
- [ ] Test dark mode (if implemented)
- [ ] Run visual regression tests
- [ ] Update documentation
- [ ] Deploy to staging

#### Automated Migration Tool

```bash
# Tailwind provides official migration tool
npx @tailwindcss/upgrade

# This will:
# - Update dependencies
# - Update config files
# - Update CSS imports
# - Suggest class name changes (manual review required)
```

---

### Vite 6 → 7 Migration (Not Recommended Until Q4 2025)

**Effort**: 🟡 Medium (1-2 days)
**Risk**: 🟡 Medium
**Recommended Timeline**: Q4 2025 or later

#### Why Wait

- Vite 7 is very new (January 2025)
- Plugin ecosystem still catching up
- Breaking changes in Environment API
- Node.js requirement: 20.19+ / 22.12+ (we have 22.13.1 ✅)
- Vite 6 provides sufficient performance

#### Major Breaking Changes

1. **Node.js Version**:
   - Requires: Node.js 20.19+, 22.12+
   - Drops Node.js 18 support
   - We're compatible ✅ (Node 22.13.1)

2. **Browser Target**:
   - Changes from `modules` to `baseline-widely-available`
   - May affect polyfills

3. **Plugin API Changes**:
   - Environment API major overhaul
   - `server.moduleGraph` → `environment.moduleGraph`
   - Custom plugins need updates

4. **HMR Hook Changes**:
   ```typescript
   // Before (Vite 5/6)
   handleHotUpdate({ modules }) {
     return modules.filter(condition)
   }

   // After (Vite 7)
   hotUpdate({ modules }) {
     return modules.filter(condition)
   }
   ```

#### Decision Point

**Revisit in Q4 2025** when:
- Plugin ecosystem has caught up
- Community feedback is positive
- No critical bugs reported
- Clear performance benefits demonstrated

---

## 4. Dependency Upgrade Strategy

### Automated Upgrades (Safe)

For patch and minor version updates:

```bash
# Check for outdated packages
bun pm ls --outdated

# Update all dependencies to latest within semver range
bun update

# Rebuild and test
bun run build
bun run lint
```

### Manual Review Required

For major version updates (e.g., v5 → v6):

1. Read changelog and migration guide
2. Check breaking changes
3. Test in local environment
4. Deploy to staging
5. Monitor for issues
6. Deploy to production

### Update Frequency

- **Weekly**: Check for security updates
- **Monthly**: Review outdated packages
- **Quarterly**: Consider major version upgrades
- **Yearly**: Review entire tech stack

---

## 5. Recommended Action Plan

### Immediate (This Week)

**Option A: Conservative (Recommended)**
```bash
# No changes needed
# Current stack is stable and production-ready
✅ Status: Ship it!
```

**Option B: Performance Boost**
```bash
# Optional: Upgrade Vite 5 → 6 for performance
bun add -d vite@^6.0.0 @vitejs/plugin-react@^5.0.0
bun run build
bun run preview
```

### Short Term (Q1 2025)

- [ ] Monitor Vite 6 stability
- [ ] Review React 19 ecosystem adoption
- [ ] Plan Tailwind v4 migration (if business need arises)

### Medium Term (Q2-Q3 2025)

- [ ] **Q2**: Consider React 19 upgrade (if ecosystem mature)
- [ ] **Q3**: Consider Tailwind v4 upgrade (if needed)

### Long Term (Q4 2025+)

- [ ] **Q4**: Evaluate Vite 7 upgrade
- [ ] Review new framework features
- [ ] Plan next major tech stack evolution

---

## 6. Risk Assessment

### Low Risk Upgrades ✅

- Patch version updates (5.4.19 → 5.4.20)
- TypeScript minor versions (5.8 → 5.9)
- Dev dependency updates
- ESLint plugin updates

### Medium Risk Upgrades ⚠️

- Vite 5 → 6 (minimal breaking changes)
- React 18 → 19 (breaking changes exist)
- Minor framework updates

### High Risk Upgrades 🔴

- Tailwind 3 → 4 (complete rewrite)
- Vite 6 → 7 (major API changes)
- Major framework rewrites

---

## 7. Testing Strategy

### Before Any Upgrade

```bash
# 1. Backup
git checkout -b backup/pre-upgrade-$(date +%Y%m%d)
git push -u origin backup/pre-upgrade-$(date +%Y%m%d)

# 2. Document current state
bun pm ls > pre-upgrade-versions.txt
bun run build > pre-upgrade-build.log 2>&1
```

### After Upgrade

```bash
# 1. Verify versions
bun pm ls > post-upgrade-versions.txt
diff pre-upgrade-versions.txt post-upgrade-versions.txt

# 2. Test build
rm -rf dist
bun run build

# 3. Check bundle sizes
ls -lh dist/assets/ > post-upgrade-bundles.txt
diff pre-upgrade-build.log post-upgrade-bundles.txt

# 4. Test functionality
bun run dev  # Manual testing in browser
bun run preview  # Test production build

# 5. Quality checks
bun run lint
bunx tsc --noEmit
```

### Acceptance Criteria for All Upgrades

- [ ] Build succeeds without errors
- [ ] Bundle size similar or smaller
- [ ] No TypeScript errors
- [ ] No ESLint errors
- [ ] Dev server starts successfully
- [ ] HMR works correctly
- [ ] All routes load
- [ ] All animations work
- [ ] All styles correct
- [ ] PWA features functional (if applicable)
- [ ] No console errors in browser

---

## 8. Rollback Procedures

### Immediate Rollback (If Build Fails)

```bash
# Revert package.json changes
git checkout HEAD -- package.json

# Restore previous dependencies
rm -rf node_modules bun.lock
bun install

# Rebuild
bun run build
```

### Full Rollback (If Issues in Production)

```bash
# Switch to backup branch
git checkout backup/pre-upgrade-YYYYMMDD

# Force deploy previous version
# (deployment method depends on hosting provider)
```

---

## 9. Monitoring Post-Upgrade

### Metrics to Track

1. **Build Performance**:
   - Build time (should stay similar or improve)
   - Bundle size (should stay similar or reduce)
   - Dev server startup time

2. **Runtime Performance**:
   - Lighthouse scores (should stay >90)
   - Core Web Vitals (LCP, FID, CLS)
   - Page load times

3. **Developer Experience**:
   - HMR speed
   - TypeScript compilation time
   - ESLint run time

### Success Criteria

- Build time: < 10 seconds
- Bundle size: < 100 KB (gzipped)
- Lighthouse Performance: > 90
- No console errors
- No user-reported issues

---

## 10. Version Support Policy

### Supported Versions

| Technology | Minimum Supported | Recommended |
|------------|-------------------|-------------|
| Node.js | 22.0.0 | 22.13.1+ |
| Bun | 1.2.0 | 1.2.19+ |
| React | 18.2.0 | 18.3.1 |
| TypeScript | 5.3.0 | 5.9.3 |
| Vite | 5.0.0 | 6.0.0+ |

### End of Life (EOL) Awareness

- **Node.js 18**: EOL April 2025 (already dropped)
- **React 17**: EOL March 2024 (already migrated to 18)
- **Vite 4**: EOL June 2024 (already on v5)

---

## 11. Communication Plan

### Before Upgrade

- [ ] Review upgrade plan with team
- [ ] Schedule maintenance window (if needed)
- [ ] Notify stakeholders
- [ ] Prepare rollback plan

### During Upgrade

- [ ] Document all changes
- [ ] Track issues encountered
- [ ] Test thoroughly before deploying

### After Upgrade

- [ ] Update documentation
- [ ] Update MIGRATION_SUMMARY.md
- [ ] Share results with team
- [ ] Document lessons learned

---

## 12. Quick Reference Commands

### Check Current Versions
```bash
node --version
bun --version
bun pm ls | rg "react|vite|typescript|tailwind"
```

### Check for Updates
```bash
bun pm ls --outdated
```

### Safe Update (Patch/Minor)
```bash
bun update
bun run build
```

### Test Before Deploy
```bash
rm -rf dist
bun run lint
bun run build
bun run preview
```

### Emergency Rollback
```bash
git checkout backup/pre-upgrade-YYYYMMDD
rm -rf node_modules bun.lock
bun install
bun run build
```

---

## Appendices

### Appendix A: Useful Resources

- **React 19 Upgrade Guide**: https://react.dev/blog/2024/04/25/react-19-upgrade-guide
- **Vite Migration Guides**: https://vite.dev/guide/migration
- **Tailwind CSS v4 Upgrade**: https://tailwindcss.com/docs/upgrade-guide
- **Bun Documentation**: https://bun.sh/docs

### Appendix B: Current Package Versions

Generated from `bun pm ls` on October 11, 2025:

**Production Dependencies (Installed)**:
- react: 18.3.1
- react-dom: 18.3.1
- react-router-dom: 6.30.1
- react-helmet-async: 2.0.5
- @tanstack/react-query: 5.90.2
- framer-motion: 11.18.2
- All Radix UI components: Latest

**Development Dependencies (Installed)**:
- vite: 5.4.20
- typescript: 5.9.3
- tailwindcss: 3.4.18
- @vitejs/plugin-react: 4.7.0
- eslint: 8.57.1
- prettier: 3.6.2

### Appendix C: Breaking Changes Summary

See individual sections for detailed migration steps:
- React 18 → 19: Section 3.1
- Vite 5 → 6: Section 2
- Vite 6 → 7: Section 3.3
- Tailwind 3 → 4: Section 3.2

---

## Conclusion

**Current Stack Assessment**: ⭐⭐⭐⭐⭐ Excellent

Your tech stack is modern, stable, and production-ready. All core dependencies are at their latest stable versions within their respective major version lines.

**Recommended Next Steps**:

1. ✅ **Ship current state** - everything is production-ready
2. 🔄 **Optional**: Upgrade Vite 5 → 6 for performance (low risk, medium reward)
3. 📅 **Plan ahead**: Schedule React 19 and Tailwind v4 migrations for Q2-Q3 2025

**No urgent upgrades required.** Focus on building features and delivering value.

---

**Document Version**: 1.0
**Last Updated**: October 11, 2025
**Next Review**: January 2025 (Quarterly)
