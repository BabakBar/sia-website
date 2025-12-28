# Brutalist Typographic Redesign

## Direction

**Style:** Typographic brutalism — heavy type manifesto
**Identity:** Cloud + AI engineer
**Palette:** Dark mode + deep forest green (`#1B4332`)
**Goal:** Unique, minimal, professional — not a template

---

## Design Principles

1. **Typography is the design** — no decorative elements, boxes, or cards
2. **Massive scale contrast** — 100px+ headlines vs 16px body
3. **Whitespace is content** — generous negative space, let things breathe
4. **One accent color** — green used sparingly (links, hover, one hero element)
5. **Vertical rhythm** — single column, scroll-driven narrative
6. **Raw but refined** — brutalist doesn't mean ugly, it means honest

---

## Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `background` | `#0A0A0A` | Page background (near-black) |
| `foreground` | `#FAFAFA` | Primary text (off-white) |
| `muted` | `#525252` | Secondary text, subtle elements |
| `accent` | `#1B4332` | Links, highlights, sparse accents |
| `accent-light` | `#2D5A45` | Hover states |

---

## Typography

**Font stack:**
- Headlines: `Inter` or `Instrument Sans` (bold 800-900 weight)
- Body: Same family, regular weight
- Mono accents: `JetBrains Mono` for tech terms, dates, labels

**Scale:**
- Hero name: `clamp(3rem, 12vw, 8rem)` — massive, responsive
- Section titles: `clamp(2rem, 6vw, 4rem)`
- Body: `1.125rem` (18px)
- Small/labels: `0.875rem` mono

---

## Layout Structure

```
┌─────────────────────────────────────────┐
│                                         │
│  BABAK                                  │  ← Massive, left-aligned
│  BARGHI                                 │
│                                         │
│  Architecting intelligent systems       │  ← Tagline, muted
│                                         │
│  ↓ scroll                               │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│  About                                  │  ← Section label (mono, small)
│  ─────                                  │
│                                         │
│  [2-3 sentences, generous line height]  │
│                                         │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│  Work                                   │
│  ─────                                  │
│                                         │
│  Continental AG                         │  ← Company name large
│  Solution Architect                     │  ← Role, muted
│  2022—Present                           │  ← Dates, mono
│                                         │
│  • Point one                            │
│  • Point two                            │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│  Projects                               │
│  ─────                                  │
│                                         │
│  BoringHannover →                       │  ← Title as link
│  Weekly events aggregator               │  ← One line desc
│                                         │
│  AutoSpendTracker →                     │
│  AI finance tracker                     │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│  Contact                                │
│  ─────                                  │
│                                         │
│  babak.barghi@gmail.com                 │  ← Email as link
│  GitHub · LinkedIn                      │  ← Simple text links
│                                         │
│                                         │
└─────────────────────────────────────────┘
```

---

## Key Changes from Current

| Current | New |
|---------|-----|
| Two-column fixed sidebar | Single column, full-width |
| Persian palette (turquoise/gold/rose) | Monochrome + forest green |
| Cards with borders/shadows | No cards — text only |
| Numbered navigation | No visible nav (or minimal footer anchors) |
| Fade-up animations | Minimal/no animation |
| Tech stack pills | Remove or simplify to plain text list |
| Certifications section | Integrate into work or remove |

---

## Sections (Simplified)

1. **Hero** — Name + tagline only
2. **About** — 2-3 sentences max
3. **Work** — Experience, reverse chronological, stripped down
4. **Projects** — Title + one-liner each, links
5. **Contact** — Email + social links, plain text

**Removed:**
- Tech stack pills (implied by work/projects)
- Certifications as separate section (mention in work if relevant)
- Navigation component (content is short enough to scroll)

---

## Implementation Steps

### Phase 1: Foundation
- [ ] Update Tailwind config with new color tokens
- [ ] Remove Persian color palette
- [ ] Add typography scale utilities
- [ ] Install/configure fonts

### Phase 2: Layout
- [ ] Remove sidebar layout from App.tsx
- [ ] Create single-column container
- [ ] Build hero section with massive type

### Phase 3: Sections
- [ ] Rewrite About (shorter)
- [ ] Simplify Experience display
- [ ] Strip Projects to minimal format
- [ ] Create simple Contact section

### Phase 4: Polish
- [ ] Remove all cards/boxes
- [ ] Tune whitespace and rhythm
- [ ] Add sparse green accents
- [ ] Test responsive behavior
- [ ] Verify accessibility

---

## Inspiration References

- https://berkeleygraphics.com/ — typographic scale
- https://linusrogge.com/ — minimal personal site
- https://www.jason.af/ — bold type, personality
- https://frankchimero.com/ — editorial simplicity

---

## Decisions Made

1. ~~AWS certification~~ — **dropped** (on resume/LinkedIn)
2. ~~Full work history~~ — **trimmed** to current role only or none
3. ~~Research paper~~ — **dropped** (on resume/LinkedIn)

**Philosophy:** Site is a bold statement + gateway. Details live elsewhere.
