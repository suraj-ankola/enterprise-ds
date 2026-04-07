# Enterprise Design System — Build Journey

> **Project:** `enterprise-ds`
> **Author:** Suraj Naik — Principal Product Designer + UX Engineer
> **Started:** April 3, 2026
> **Last Updated:** April 7, 2026
> **Purpose:** Document every decision, challenge, solution, and value created while building this design system.

---

## Why This Project Exists

This design system is the **foundation layer** for 3 enterprise AI portfolio projects:

| Project | What It Is |
|---|---|
| Compliance Risk Platform | AI-powered vendor & risk monitoring |
| IT Ops AI Copilot | Unified IT dashboard with incident prediction |
| Self-Serve Analytics | Plain-English querying for business analysts |

**Goal:** Build once, reuse everywhere. Components built here are production-quality and open-source — they serve as a live portfolio artifact that demonstrates design + engineering capability end-to-end.

---

## Tech Stack

| Layer | Tool | Why |
|---|---|---|
| Framework | Next.js 16 (App Router) | Industry standard, backend + frontend in one |
| Language | TypeScript | Enterprise standard, catches errors early |
| Styling | Tailwind CSS v4 | Design-token friendly, fast, Figma-compatible |
| Components | React 19 | Latest stable |
| Docs | Storybook 10 | Industry standard for design systems |
| Icons | Phosphor Icons | 1000+ icons, 6 weights, consistent style |
| Build (Storybook) | Vite | Fast dev server for Storybook |

---

## Build Log

---

### Session 1 — Project Setup
**Date:** April 3, 2026
**Time taken:** ~30 minutes

#### What was done
- Created Next.js project: `npx create-next-app@latest enterprise-ds --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"`
- Added Storybook: `npx storybook@latest init`
- Confirmed both `npm run dev` (port 3000) and `npm run storybook` (port 6006) work

#### Value created
- Clean, modern project foundation with no legacy debt
- TypeScript + Tailwind v4 + Storybook 10 — all latest stable versions
- App Router structure ready for future Next.js API routes (needed for Projects 1–3)

---

### Session 2 — Folder Structure + Design Tokens
**Date:** April 3, 2026
**Time taken:** ~20 minutes

#### What was done
- Created folder structure:
  ```
  src/
    components/
      foundations/   ← Colors, Typography, Icons
      ui/            ← Button, Input, Card...
      patterns/      ← Forms, Modals, AI Chat UI
    tokens/
      tokens.ts      ← Design token definitions
  ```
- Created `src/tokens/tokens.ts` — single source of truth for colors, spacing, typography, radius, shadow
- Updated `src/app/globals.css` with Tailwind v4 `@theme` block registering brand palette (blue scale) and neutral (slate scale)

#### Value created
- **Single source of truth** for all visual decisions — change a token, everything updates
- Brand palette defined: blue-600 as primary, slate as neutral, semantic colors for success/warning/danger/info
- Foundation that all 3 future projects will import

---

### Session 3 — Button Component
**Date:** April 3, 2026
**Time taken:** ~25 minutes (+ 30 min debugging styling issues)

#### What was done
- Built `src/components/ui/Button.tsx`
  - 4 variants: `primary`, `secondary`, `ghost`, `danger`
  - 3 sizes: `sm` (32px), `md` (36px), `lg` (44px)
  - Loading state with animated spinner
  - Disabled state
  - Left/right icon slots
  - Full width option
  - `aria-busy` for accessibility
- Created `Button.stories.tsx` with 10 stories

#### Challenges & Solutions

**Challenge 1 — Buttons showing with no color/style in Storybook**
- **Root cause:** `globals.css` was not imported in `.storybook/preview.ts`. Storybook's Vite build had no knowledge of Tailwind styles.
- **Solution:** Added `import '../src/app/globals.css'` to `preview.ts`. This loads the entire Tailwind stylesheet into every story.
- **Learning:** Storybook runs as its own isolated Vite app — it does not inherit the Next.js CSS pipeline automatically.

**Challenge 2 — `bg-neutral-0` not applying**
- **Root cause:** `0` is a non-standard Tailwind scale value. Tailwind generates `bg-neutral-100`, `bg-neutral-200` etc. but not `bg-neutral-0`.
- **Solution:** Replaced with `bg-white` which is a standard Tailwind utility.

#### Value created
- Production-ready Button component — the most-used element in any enterprise app
- Covers all real use cases: primary CTA, secondary action, destructive delete, icon buttons
- Storybook stories mean any future designer/developer can see all states in one place

---

### Session 4 — Dark Mode
**Date:** April 3, 2026
**Time taken:** ~40 minutes

#### What was done
- Added `@variant dark (&:where(.dark, .dark *))` to `globals.css` — enables class-based dark mode in Tailwind v4
- Defined **semantic token layer** in `globals.css`:
  - `:root {}` — light mode values for 20+ tokens (backgrounds, text, borders, status colors)
  - `.dark {}` — dark mode overrides for all tokens
- Added Storybook **Theme toolbar** (sun/moon toggle):
  - `globalTypes.theme` in `preview.ts`
  - Decorator that applies/removes `.dark` class on `<html>`
- Updated all Button variants with `dark:` Tailwind classes
- Created `src/types/global.d.ts` — CSS import type declaration

#### Token architecture
```
Raw palette (in @theme)         Semantic tokens (in :root / .dark)
──────────────────────────      ──────────────────────────────────
--color-brand-600: #2563eb  →   --ds-bg-surface: #ffffff / #1e293b
--color-neutral-900: #0f172a →  --ds-text-primary: #0f172a / #f1f5f9
```
Components use semantic tokens → they respond to mode changes automatically.

#### Challenges & Solutions

**Challenge — `showName` TypeScript error in Storybook toolbar config**
- **Root cause:** Storybook v10's `ToolbarConfig` type does not include `showName` as a valid property.
- **Solution:** Removed `showName: true` — the toolbar renders correctly without it.

#### Value created
- **Dark mode works at the token level** — every future component is dark-mode ready by default just by using semantic token classes
- Zero per-component rework needed later — solved once, applies everywhere
- Storybook theme toggle lets designers preview both modes instantly

---

### Session 5 — Input Component
**Date:** April 3, 2026
**Time taken:** ~30 minutes

#### What was done
- Built `src/components/ui/Input.tsx`
  - 3 sizes: `sm`, `md`, `lg`
  - 3 status states: `default`, `error`, `success` (auto-derived from `errorMessage` prop)
  - Label with optional required `*` indicator
  - Helper text slot
  - Error message slot (replaces helper text, sets error styling)
  - Left icon + right icon slots
  - Disabled state
  - Read-only state (subtle background)
  - `aria-invalid` + `aria-describedby` for screen readers
  - Auto-generates unique `id` with `useId()` for label association
- Created `Input.stories.tsx` with 16 stories covering all states and use cases

#### Value created
- Accessible input — works with screen readers out of the box
- Error state is self-contained: pass `errorMessage` and the border, text, and icon all turn red automatically
- Real-world stories: Email, Password, Search, Phone, Company, Budget fields

---

### Session 6 — Tailwind + Vite Fix (Critical)
**Date:** April 3, 2026
**Time taken:** ~25 minutes

#### What was done
- Installed `@tailwindcss/vite` package
- Added `viteFinal` config to `.storybook/main.ts` to inject the Tailwind Vite plugin into Storybook's build

#### The core problem — explained
```
Next.js build:   Webpack  →  @tailwindcss/postcss  ✅ (already configured)
Storybook build: Vite     →  @tailwindcss/vite     ❌ (was missing)
```
Tailwind CSS v4 requires **different plugins** for different build tools. The project had PostCSS configured for Next.js but Storybook's Vite build was not processing Tailwind at all. This caused:
- Buttons with no color
- Input status colors (red/green) not rendering
- Any Tailwind utility that relies on custom theme variables silently failing

#### Solution
```ts
// .storybook/main.ts
import tailwindcss from '@tailwindcss/vite';

async viteFinal(config) {
  config.plugins = [...(config.plugins ?? []), tailwindcss()];
  return config;
}
```

#### Value created
- **Root cause fixed permanently** — all future components will render correctly in Storybook without any additional config
- This is a non-obvious Tailwind v4 gotcha — documented here so it never wastes time again

---

### Session 7 — Phosphor Icons Integration
**Date:** April 3, 2026
**Time taken:** ~45 minutes

#### What was done
- Installed `@phosphor-icons/react`
- Created `src/components/foundations/Icons.tsx` — single import point for all icons across the design system
- Built searchable **Icon Gallery** in Storybook (`Icons.stories.tsx`):
  - Displays all ~1000+ icons in a responsive grid
  - Search by name (real-time filtering)
  - Weight switcher: Thin / Light / Regular / Bold / Fill / Duotone
  - Size switcher: 16 / 20 / 24 / 32px
  - Click any icon → copies `<IconName />` to clipboard
  - Empty state with sad face icon
  - Dark mode aware
- Updated Button stories with real Phosphor icons (PlusCircle, Trash, ArrowRight, etc.)
- Updated Input stories with real Phosphor icons (MagnifyingGlass, Envelope, Lock, Eye, etc.)

#### Challenges & Solutions

**Challenge 1 — Deprecated icon names**
- **Root cause:** Phosphor v2+ renamed all icons to have an `Icon` suffix. `MagnifyingGlass` → `MagnifyingGlassIcon`. The old names still exist but are marked `@deprecated`.
- **Solution:** Use `Icon`-suffixed names everywhere. Added `endsWith('Icon')` filter in the gallery to show only current names.
- **Rule going forward:** Always import as `import { HouseIcon, UserIcon } from '@/components/foundations/Icons'`

**Challenge 2 — Icon Gallery showing 0 icons**
- **Root cause:** Phosphor icons are built with `React.forwardRef()`. `typeof React.forwardRef(...)` returns `'object'`, not `'function'`. The gallery filter `typeof value === 'function'` excluded every single icon.
- **Solution:** Updated filter to accept both functions AND forwardRef objects:
  ```ts
  typeof value === 'function' ||
  (typeof value === 'object' && '$$typeof' in (value as object))
  ```

#### Value created
- **1000+ icons available instantly** — no hunting for SVGs or custom icon sets
- 6 weights means icons match the visual weight of any context (thin for backgrounds, bold for CTAs)
- Gallery is a **developer productivity tool** — find any icon, copy the import in one click
- Consistent icon language across all 3 future projects

---

## Component Status

| Component | Built | Dark Mode | Stories | Brand Tokens | Responsive |
|---|---|---|---|---|---|
| Button | ✅ | ✅ | ✅ 15 stories | ✅ | ✅ |
| Input | ✅ | ✅ | ✅ 16 stories | ✅ | ✅ |
| Icons (Gallery) | ✅ | ✅ | ✅ Searchable | ✅ | ✅ |
| Card | ✅ | ✅ | ✅ 10 stories | ✅ | ✅ |
| Badge | ✅ | ✅ | ✅ 8 stories | ✅ | ✅ |
| Select / Dropdown | ✅ | ✅ | ✅ 7 stories | ✅ | ✅ |
| Table | 🔜 | — | — | — |
| Modal | 🔜 | — | — | — |
| AI Chat UI | 🔜 | — | — | — |
| Data Visualization | 🔜 | — | — | — |

---

## Challenges Master Log

| # | Challenge | Root Cause | Solution | Time Lost |
|---|---|---|---|---|
| 1 | Buttons unstyled in Storybook | `globals.css` not imported in `preview.ts` | Added CSS import to preview | ~20 min |
| 2 | `bg-neutral-0` not applying | Non-standard Tailwind scale value | Used `bg-white` instead | ~5 min |
| 3 | All Storybook styles broken (colors, tokens) | Tailwind v4 needs `@tailwindcss/vite` for Vite builds — PostCSS alone is not enough | Installed `@tailwindcss/vite`, added `viteFinal` | ~25 min |
| 4 | TS error: `showName` in toolbar config | Not a valid Storybook v10 `ToolbarConfig` property | Removed the property | ~2 min |
| 5 | Deprecated Phosphor icon names | Phosphor v2 renamed all icons with `Icon` suffix | Use `*Icon` naming convention everywhere | ~15 min |
| 6 | Icon gallery showing 0 icons | `typeof forwardRef(...)` returns `'object'` not `'function'` | Updated filter to check for `$$typeof` on objects | ~10 min |

| 7 | Storybook not reloading new Vite config | `viteFinal` is a build init change — HMR only reloads component files | Full stop + restart required after any `.storybook/main.ts` change | ~5 min |

**Total time on challenges (cumulative):** ~82 minutes
**Total build time (cumulative):** ~7.5 hours

---

### Session 8 — Card Component
**Date:** April 3, 2026
**Time taken:** ~25 minutes

#### What was done
- Built `src/components/ui/Card.tsx` as a **compound component**:
  - `Card` — root container (variant, padding, clickable)
  - `CardHeader` — title + subtitle + icon + action slot
  - `CardBody` — content area
  - `CardFooter` — bottom row with optional divider
  - `CardDivider` — standalone horizontal rule
  - `CardSkeleton` — animated loading placeholder
- 4 variants: `default`, `outlined`, `elevated`, `ghost`
- 4 padding sizes: `none`, `sm`, `md`, `lg`
- `clickable` prop: adds hover border, cursor pointer, keyboard focus ring
- Full dark mode on all sub-components
- Created `Card.stories.tsx` with 10 stories

#### Stories include real-world previews of all 3 projects
- **Vendor Risk Card** (Project 1) — risk score bar, compliance gaps, audit date
- **IT Incident Card** (Project 2) — CPU usage bar, AI prediction note, auto-fix action
- **KPI Metric Cards** (Project 3) — revenue, SKUs, fill rate with trend indicators

#### Value created
- **Compound component pattern** — `Card + CardHeader + CardBody + CardFooter` can compose any enterprise layout
- `CardSkeleton` means loading states are built-in from day one — no blank screens
- Real-world stories act as **proof of concept** for all 3 projects before they're even started
- `clickable` prop covers browse/select patterns (vendor list, incident list, report tiles)

---

## Key Decisions Log

| Decision | Alternatives Considered | Why We Chose This | Impact |
|---|---|---|---|
| Tailwind CSS v4 | v3 (stable, more docs) | v4 is CSS-native — tokens, no config file, better performance | Future-proof, cutting-edge skill signal |
| Phosphor Icons | Lucide, Heroicons, Radix | 1000+ icons, 6 weights, consistent enterprise style | Zero icon-hunting for all 3 projects |
| Semantic token layer (--ds-*) | Direct Tailwind classes everywhere | Dark mode and theme switching are free — write once, apply everywhere | Every future component is dark-mode ready at zero cost |
| Class-based dark mode | Media query prefers-color-scheme | User-controlled toggle — essential for enterprise dashboards | Designers can preview both modes live in Storybook |
| Co-located stories | Separate /stories folder | Stories next to component file — never fall out of sync | Faster development, always up-to-date docs |
| Separate GitHub repo per project | Monorepo | Each project is a standalone portfolio artifact | Cleaner for employer discovery |
| **8pt grid with 4pt half-steps** | 4pt grid only | 8pt grid is enterprise standard (Material, Atlassian, IBM Carbon). Half-steps for icon gaps and badges | Consistent spatial rhythm across all components and layouts |
| **3 product brand themes via data-theme** | Single brand only | Each portfolio project gets distinct visual identity, shared component base | One component library, 3 products — demonstrates scalable design system thinking |
| **16-column grid at 1920px+** | 12-col only | Prevents content stretching on ultrawide monitors — common in enterprise ops rooms | No layout degradation on large monitors without explicit container constraints |
| **Primitive → Semantic → Brand token architecture** | Flat token structure | Clear separation of raw values, meaning, and brand. Components never touch primitives | Theme switching, dark mode, and brand overrides all work automatically |
| **Governance & Scalability page in Storybook** | Readme only | Living rules doc inside the tool designers and developers already use | Zero friction — rules are visible at the point of use |
| **prefers-reduced-motion in globals.css** | Per-component handling | One global rule covers all current and future animations | Accessibility compliance without any per-component effort |

---

---

### Session 9 — Foundation System Overhaul
**Date:** April 3, 2026
**Time taken:** ~2.5 hours

#### What was done

**Token system complete rewrite:**
- `globals.css` rebuilt with 3-layer architecture: Primitive (@theme) → Semantic (:root / .dark) → Brand ([data-theme])
- 8pt grid documented with 4pt half-steps
- Motion tokens: 6 durations + 5 easing curves + interaction map
- Layout grid tokens: columns, gutters, margins per breakpoint
- Z-index scale, opacity tokens, focus ring tokens
- `prefers-reduced-motion` global override added
- `tokens.ts` fully synced — accessibility contrast table included

**3 Product Brand Themes:**
- `compliance` (Blue) — trust, security
- `itops` (Violet) — technical, intelligent
- `analytics` (Cyan) — data, clarity
- Applied via `data-theme` attribute — all components switch automatically
- Dark + theme combinations handled (6 total states)

**Storybook toolbar:**
- Theme toolbar: 🔵 Compliance / 🟣 IT Ops / 🩵 Analytics
- Color Mode toolbar: Light / Dark
- Decorator applies both `class="dark"` and `data-theme` to `<html>`

**All existing components migrated:**
- Button, Input, Card — all hardcoded Tailwind colors replaced with `--ds-brand-*` and `--ds-*` semantic tokens
- Theme switching now works on all 3 components automatically

**9 Foundation pages in Storybook:**

| Page | What it shows |
|---|---|
| Colors | Palette + semantic tokens + light/dark swatches |
| Typography | Type scale, weights, tracking, line heights, font families |
| Spacing | 8pt grid visual scale + component usage reference |
| Radius | Visual grid + usage per component type |
| Shadows | Elevation scale with live box-shadow previews |
| Grid & Layout | Breakpoints, columns, gutters, interactive column demo, container utilities |
| Motion | Duration scale (clickable live demos), easing curves (animated), micro-interactions table, page transitions |
| States | All 8 states × Button + Input + Card — live and documented |
| Focus, Z-index & Motion | Focus ring live tab-through demo, z-index scale, motion tokens |
| Icons | Searchable 1000+ icon gallery |
| Governance | Token rules, component rules, naming conventions, scalability procedures, completion checklist |

#### Decisions made and their impact

**8pt grid over 4pt:**
- Enterprise standard (Material Design, IBM Carbon, Atlassian use 8pt)
- Saved: no spatial inconsistency between components — spacing always feels intentional
- Outcome: Any developer can pick a spacing value and it will align with the grid

**16-column grid at 1920px+:**
- Prevents content stretching on ultrawide monitors
- Saved: no need to ad-hoc fix layouts when testing on large monitors
- Outcome: Dashboards look correct at every screen size without extra constraints

**Primitive → Semantic → Brand token architecture:**
- Saved: ~40+ minutes per component that would have been spent on dark: class variants
- Saved: complete re-implementation if we'd decided to add themes later
- Outcome: Every component built from now on is theme-aware and dark-mode-ready at zero extra cost

**prefers-reduced-motion in globals.css:**
- One rule covers everything — past and future
- Saved: accessibility audit rework on every animated component
- Outcome: WCAG 2.1 AAA motion compliance without touching a single component

**Governance page in Storybook:**
- Rules live inside the tool — not a separate README that gets ignored
- Outcome: Any new contributor can follow the system correctly from day one

#### Value created
- **Complete design system foundation** — not just components, but the full system: tokens, grid, motion, states, governance
- Demonstrates **principal-level thinking** — this is how mature design systems at Atlassian, Google, and IBM are structured
- **Zero rework** needed when adding themes, dark mode, or new breakpoints to future components
- Every future component inherits: dark mode, brand theming, responsive layout, accessibility, motion — for free

---

## Value Summary

> What has been built and why it matters.

### Foundation (complete)
- **3-layer token architecture** — Primitive → Semantic → Brand (industry standard pattern)
- **3 product themes** — Blue (Compliance), Violet (IT Ops), Cyan (Analytics) — shared component base
- **8pt grid system** — with 16-col at 1920px+
- **Motion system** — 6 durations, 5 easing curves, interaction map, page transition rules
- **Accessibility** — WCAG AA contrast verified, prefers-reduced-motion handled globally
- **Governance** — living rules doc inside Storybook, component checklist

### Components (production-ready)
- **4 components:** Button (15 stories), Input (16 stories), Card (10 stories), Icons (1000+ searchable)
- All components: dark mode ✅, brand theming ✅, responsive ✅, keyboard accessible ✅

### For the Portfolio
- Open-source design system — public artifact demonstrating enterprise-level engineering
- Shows **system thinking**, not just component building
- Demonstrates every senior hire skill: architecture decisions, accessibility, scalability, documentation

### Skills demonstrated
- Tailwind CSS v4 (CSS-native @theme, @variant — most developers haven't touched this)
- Storybook 10 with Vite + custom toolbar integrations
- CSS custom properties architecture (3-layer token system)
- React compound component pattern
- WCAG accessibility implementation
- Build tooling: PostCSS vs Vite pipeline debugging

---

---

## Session 10 — Full Codebase Audit & Hardening

**Date:** April 3, 2026
**Time:** ~2 hours
**Goal:** Full sanity audit before scaling. Catch anything that would cause pain at 10× the current component count.

### What Triggered This

A JSX syntax bug on the Governance page surfaced during review — `style={{ color: '#0f172a' }}` inside `<code>` children was parsed by JSX as a JavaScript object expression `{ color: '#0f172a' }` being rendered as a React child, producing React's cryptic "Objects are not valid as a React child (found: object with keys {color})" error.

This was the trigger to audit the entire codebase before continuing.

### Bug Fix: JSX Text Content Escaping

**File:** `src/components/foundations/Governance.stories.tsx`

**Problem:** Double curly braces `{{ ... }}` inside JSX text content are NOT escaped as literal characters — the outer `{` starts a JSX expression, making the inner `{ color: '#0f172a' }` a plain JavaScript object passed as a child to React.

```jsx
// ❌ This renders the object { color: '#0f172a' } as a React child
<code>style={{ color: '#0f172a' }}</code>

// ✅ Wrap in a string literal expression to escape it
<code>{'style={{ color: \'#0f172a\' }}'}</code>
```

**Prevention rule (added to Governance page rules):**
> When displaying code examples containing `{{ ... }}` inside JSX children, always use a string literal expression `{'...'}` to escape the double braces. Never write raw `{{ }}` inside JSX text — it is parsed as a JS expression.

Also fixed in the same session: `SpinnerIcon` does not exist in Phosphor Icons v2. Correct icon for loading/spinning is `CircleNotchIcon`. When a named import doesn't exist, importing it from a barrel file resolves to `undefined`. Rendering `<undefined />` produces a different React error but it can also silently break rendering.

**Prevention rule:**
> Before using any Phosphor icon name, verify it in the Icons gallery in Storybook or at phosphoricons.com. All valid v2 icon names end with the `Icon` suffix.

---

### Audit Findings & Fixes

#### 1. preview.ts — Hardcoded Canvas Background Colors

**Problem:** `document.body.style.backgroundColor = isDark ? '#0f172a' : '#f8fafc'` — hardcoded hex values that bypass the token system. If `--ds-bg-base` ever changes, the Storybook canvas background stays wrong.

**Fix:** `document.body.style.backgroundColor = 'var(--ds-bg-base)'` — CSS variable resolves from the `dark` class already applied to `<html>`, so it correctly follows the active theme automatically.

---

#### 2. Card.tsx — Clickable Card Missing Keyboard Handlers

**Problem:** `role="button"` was applied to clickable cards but there was no `onKeyDown` handler. Screen readers announce it as a button, but pressing Enter/Space did nothing.

**Fix:** Added `handleKeyDown` that calls `.click()` on Enter/Space. This matches native `<button>` keyboard behaviour.

```tsx
const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
  if (clickable && (e.key === 'Enter' || e.key === ' ')) {
    e.preventDefault();
    (e.currentTarget as HTMLElement).click();
  }
  onKeyDown?.(e);
};
```

**Rule:** Whenever `role="button"` is added to a non-button element, keyboard handlers for Enter + Space are mandatory. No exceptions.

---

#### 3. globals.css / tokens.ts — Token Out of Sync

**Problem:** `tokens.ts` documented `amber: { 500: '#f59e0b' }` but `globals.css` was missing `--color-amber-500`.

**Fix:** Added `--color-amber-500: #f59e0b;` to the `@theme` block in `globals.css`.

**Rule:** Every value in `tokens.ts` must have a corresponding CSS custom property in `globals.css`. When adding a token to either file, always update both. The Governance page rule "Sync tokens.ts after globals.css" now explicitly covers this.

---

#### 4. Card.stories.tsx — Hardcoded Tailwind Colors Throughout

**Problem:** Real-world example stories (`VendorRiskCard`, `ITAlertCard`, `MetricCard`) used hardcoded Tailwind color classes (`text-slate-400`, `bg-red-50 dark:bg-red-950`, `text-orange-600 dark:text-orange-400`, etc.) instead of `--ds-*` semantic tokens.

**Impact:** Dark mode and brand theme switching broke in these stories. The `dark:` prefix classes are a sign that semantic tokens weren't used — if tokens are used correctly, dark mode is automatic without any `dark:` classes.

**Fix:** Replaced all hardcoded colors with semantic token equivalents:

| Hardcoded | Token |
|---|---|
| `text-slate-400`, `dark:text-slate-500` | `text-[var(--ds-text-muted)]` |
| `text-slate-500 dark:text-slate-400` | `text-[var(--ds-text-muted)]` |
| `text-slate-600 dark:text-slate-300` | `text-[var(--ds-text-secondary)]` |
| `text-slate-900 dark:text-slate-100` | `text-[var(--ds-text-primary)]` |
| `bg-red-50 dark:bg-red-950` | `bg-[var(--ds-danger-bg)]` |
| `text-red-600 dark:text-red-400` | `text-[var(--ds-danger-text)]` |
| `bg-red-500` | `bg-[var(--ds-danger-icon)]` |
| `bg-orange-50 dark:bg-orange-950` | `bg-[var(--ds-warning-bg)]` |
| `text-orange-600 dark:text-orange-400` | `text-[var(--ds-warning-text)]` |
| `bg-orange-500`, `border-l-orange-500` | `bg-[var(--ds-warning-icon)]`, `border-l-[var(--ds-warning-icon)]` |
| `text-green-600 dark:text-green-400` | `text-[var(--ds-success-text)]` |
| `text-yellow-600` | `text-[var(--ds-warning-text)]` |
| `bg-slate-200 dark:bg-slate-700` | `bg-[var(--ds-bg-subtle)]` |

**Rule:** If you find yourself writing `dark:` prefix classes for color, you are using the wrong approach. Use semantic tokens — dark mode is handled automatically by the token system. The presence of `dark:` in a component or story is a code smell.

---

#### 5. package.json — Missing Developer Scripts

**Problem:** No `type-check`, `validate`, or `test` scripts. Developers had to remember to run TypeScript checks manually, and there was no single command to validate the project before committing.

**Fix:**
```json
"type-check": "tsc --noEmit",
"validate": "npm run type-check && npm run lint",
"test": "vitest"
```

`npm run validate` is the pre-commit gate: TypeScript must be clean and lint must pass.

---

### Audit Items Noted (Not Blocking, Address When Relevant)

These were identified in the audit as informational — they don't block current development but should be addressed as the system grows:

| Item | When to Address |
|---|---|
| Card padding doesn't scale with breakpoints | When building layout-heavy templates |
| Input: `mt-1.5` helper text not on 8pt grid (should be `mt-2`) | Next Input polish pass |
| Input icon sizes: `md` and `lg` both use `h-4 w-4` | Next Input polish pass |
| Dark mode status backgrounds lack hierarchy (`--ds-success-bg` identical to `--ds-success-bg-subtle`) | When adding status-heavy components (alerts, banners) |
| `@storybook/addon-onboarding` in devDependencies — unused in mature projects | Next dependency cleanup |
| `accessibility.verified` in tokens.ts only covers 6 combinations | Expand when WCAG audit is needed |

---

### What the Audit Confirmed Is Solid

- ✅ 3-layer token architecture (primitive → semantic → brand) — correct and scalable
- ✅ TypeScript strict mode, zero errors (`npm run type-check` passes clean)
- ✅ ESLint config exists (`eslint.config.mjs`) with Next.js + Storybook rules
- ✅ Storybook Vite + Tailwind v4 pipeline — correctly configured
- ✅ Dark mode via class, not media query — correct approach for product themes
- ✅ Brand theme switching via `data-theme` — architecturally sound
- ✅ Phosphor Icons gallery — searchable, filterable, click-to-copy
- ✅ Compound component pattern (Card) — scalable
- ✅ prefers-reduced-motion handled globally — no component-level overrides needed

---

*Last updated: April 3, 2026 — Audit complete. Ready to build Badge component.*

---

## Session 11 — Badge Component

**Date:** April 3, 2026
**Time:** ~1 hour
**Completed checklist:** ✅ tokens → ✅ component → ✅ stories → ✅ type-check clean

### What Was Built

`Badge` — a display label for status, categories, counts, and filter chips.

**API:**
```tsx
<Badge
  variant?    = 'neutral' | 'brand' | 'success' | 'warning' | 'danger' | 'info'
  appearance? = 'subtle' | 'outline' | 'solid'
  size?       = 'sm' | 'md' | 'lg'
  dot?        // colored indicator dot (omitted when icon is present)
  icon?       // left React node icon slot
  onDismiss?  // adds × button, makes badge dismissible
  className?
>
  Label
</Badge>
```

**Stories:**
- `Playground` — interactive controls
- `AllVariants` — all 6 variants × 3 appearances
- `Appearances × Variants` — full matrix grid
- `Sizes` — sm/md/lg with multiple variants
- `WithDot` — dot indicator across variants and appearances
- `WithIcon` — left icon slot, all three appearances
- `Dismissible` — live dismiss demo with reset
- `Real-world Patterns` — Compliance (vendor status), IT Ops (incident severity), Analytics (filter chips), notification counts/bubbles

### Key Decisions

**1. Three appearances instead of two**
Most design systems offer `solid` (filled) and `outlined`. Added `subtle` (tinted bg, colored text) as the default because it's the right choice for status indicators in data-dense enterprise UIs — less visual weight than solid, more readable than outline-only.

**2. New solid-fill tokens required**
`solid` appearance needs sufficient contrast in dark mode. Status icon tokens (`--ds-success-icon`, etc.) are light in dark mode (#4ade80, #fbbf24), so using `text-white` on them would fail WCAG AA. Solution: added `--ds-*-solid-bg` + `--ds-*-solid-text` token pairs to `globals.css` with light/dark values that guarantee ≥ 4.5:1 contrast in both modes. All 8 combinations verified and documented in `tokens.ts accessibility.verified`.

**3. Dot vs. icon — explicit priority**
When both `dot` and `icon` are provided, `icon` wins. Prevents double-prefix visual clutter. Documented in JSDoc.

**4. Dismissible as a prop not a variant**
`onDismiss` keeps the dismiss behaviour as an opt-in prop rather than a separate variant, consistent with how `loading` works on Button. The × button stops event propagation so dismissing doesn't trigger parent click handlers (important for dismissible badges inside clickable cards).

**5. Notification count pattern**
Badge doesn't have a special `count` variant — instead the real-world story shows using `solid sm` with `className="absolute -top-1.5 -right-1.5 min-w-[1.25rem] justify-center"` for the notification bubble pattern. This is composition, not a special API.

### Tokens Added

In `globals.css` (`:root` and `.dark`):
```
--ds-success-solid-bg / --ds-success-solid-text
--ds-warning-solid-bg / --ds-warning-solid-text
--ds-danger-solid-bg  / --ds-danger-solid-text
--ds-info-solid-bg    / --ds-info-solid-text
```

In `tokens.ts accessibility.verified`: 8 new WCAG-verified contrast pairs (4 light + 4 dark).*Last updated: April 3, 2026 — Badge complete. Next: Select / Dropdown or Table.*

---

## Session 12 — Select / Dropdown Component

**Date:** April 3, 2026
**Completed checklist:** ✅ component → ✅ stories → ✅ type-check clean

### What Was Built

`Select` — a fully accessible custom dropdown (select-only combobox pattern, ARIA APG compliant).

**API:**
```tsx
<Select
  options        // SelectOption[] — { value, label, disabled?, group? }
  value?         // controlled value
  defaultValue?  // uncontrolled initial value
  onChange?      // (value: string) => void
  placeholder?
  label?
  helperText?
  errorMessage?  // sets status='error', shows message below trigger
  status?        // 'default' | 'error' | 'success'
  size?          // 'sm' | 'md' | 'lg'
  disabled?
  fullWidth?
  searchable?    // renders a search input at top of dropdown
  className?
  id?
/>
```

**Stories:**
- `Playground` — interactive controls
- `Sizes` — sm/md/lg
- `StatusStates` — default / error / success / disabled
- `Searchable` — live filter with 27 countries
- `OptionGroups` — grouped time ranges
- `Controlled` — controlled mode with external state buttons
- `All Sizes × Status` — full grid
- `ProjectPatterns` — Compliance filter bar, IT Ops incident form, Analytics query builder

### Key Decisions

**1. Custom dropdown, not native `<select>`**
Native `<select>` is notoriously difficult to style consistently across browsers and OS. All enterprise design systems (Material, Radix, Headless UI, Carbon) use custom dropdowns. The tradeoff is implementing keyboard accessibility ourselves — done here following the ARIA APG Select-Only Combobox pattern.

**2. ARIA: `role="combobox"` on trigger `<button>`**
The ARIA APG pattern places `role="combobox"` on the input-like trigger. Using a native `<button>` gives us free keyboard activation (Enter/Space), focus management, and disabled state handling without extra event wiring.

Full ARIA chain:
- Trigger: `role="combobox"` + `aria-expanded` + `aria-haspopup="listbox"` + `aria-controls` + `aria-activedescendant`
- List: `role="listbox"`
- Options: `role="option"` + `aria-selected` + `aria-disabled`

**3. Keyboard navigation**
- Non-searchable: trigger keeps focus, handles all keyboard events (Arrow, Enter, Space, Escape, Home, End, Tab)
- Searchable: focus moves to search input on open; search input handles all keyboard events
- Tab always closes without selecting (natural focus flow)
- Home/End jump to first/last enabled option

**4. Searchable: search input inside dropdown, not inline trigger**
Two approaches exist: (a) trigger becomes an input when open, (b) separate search input at top of dropdown. Chose (b) because the trigger always shows the selected value clearly, and the search context is visually separate. This matches Radix Select + react-select patterns.

**5. Option groups via `group` property on SelectOption**
Group headers are rendered as non-interactive `role="presentation"` separators above the first option of each group. No special `role="group"` nesting — listbox is flat. This is the most compatible approach across screen readers.

**6. Controlled + uncontrolled**
Same pattern as React's native inputs: pass `value` + `onChange` for controlled, `defaultValue` for uncontrolled. Internal `internalValue` state is used only when `value` prop is `undefined`.

**7. No portal — `position: absolute` inside relative wrapper**
Portal + Floating UI handles viewport edge cases (dropdown near bottom flips up). Not needed for Storybook/portfolio. Can upgrade to portal + `@floating-ui/react` for production product apps.

### Tokens Used (no new tokens required)
All existing semantic tokens cover the full component:
- Trigger border/focus: `--ds-border-strong`, `--ds-brand-600`, `--ds-brand-500` — same as Input
- Dropdown panel: `--ds-bg-raised`, `--ds-border-base`, shadow-lg
- Option hover: `--ds-bg-subtle`
- Check icon: `--ds-brand-600`
- Disabled options: `opacity-40` (uses `--ds-opacity-disabled` concept)
- Status states: existing danger/success border + ring tokens

*Last updated: April 3, 2026 — Select complete. Next: Table or Modal.*

---

## Session 13 — Group 1: Checkbox, Radio, Toggle

**Date:** April 4, 2026
**Completed checklist:** ✅ components → ✅ stories → ✅ type-check clean → ✅ bugs fixed post-screenshot

### Checkbox

Hidden native `<input type="checkbox">` with a custom visual `<span>`. ARIA comes for free from the native input — no `role` needed. Focus ring is wired via CSS `peer` variant: `sr-only peer` on the input, `peer-focus-visible:ring-*` on the visual span.

`indeterminate` cannot be set via HTML attribute — set imperatively via `inputRef.current.indeterminate` in `useEffect`. Visual is `MinusIcon` (not a partial fill) for clarity at all sizes.

**Bug (found via screenshot):** When unchecked, the icon slot rendered `null`. When checked, `<CheckIcon>` mounted. The DOM change from no-element to element caused a measurable height shift — the checkbox visually "jumped".

**Fix:** Always render `<CheckIcon>`. Use `className="opacity-0"` when unchecked, `opacity-100` when checked. Stable layout, smooth opacity transition.

### Radio

`RadioGroupContext` carries `{ name, value, onChange, size, disabled }` so individual `Radio` instances don't duplicate props. `RadioGroup` uses `fieldset` + `legend` — the only semantic HTML structure that groups radios correctly for screen readers. Standalone `Radio` (outside a group) works for single-option toggles.

Visual: outer circle (border) + inner filled dot (brand-600) when checked. No hidden input hack — the native `<input type="radio">` is `sr-only peer` and the peer variant drives the visual.

### Toggle

`role="switch"` + `aria-checked` on the button track. Thumb is a plain `<span>` positioned with `translate-x`. Thumb translate values calculated as `track_width - thumb_width - 2px_edge_padding`: sm=14px, md=18px, lg=22px.

**Bug (found via screenshot):** Track used `inline-flex` without `items-center`. Flex default `align-items: stretch` overrides the thumb's explicit `h-3/h-4/h-5` classes — thumb stretched to full track height → oval, not circle.

**Fix:** Added `items-center` to track classnames.

---

## Session 14 — Group 2: Table, Modal, Toast

**Date:** April 4, 2026
**Completed checklist:** ✅ components → ✅ stories → ✅ type-check clean

### Table

Generic `Table<T>` avoids field-key string access — `TableColumn<T>` uses a `cell: (row: T, index: number) => React.ReactNode` function, giving full type safety for any row shape.

Select-all uses `checked={allSelected}` + `indeterminate={someSelected}` directly on the DS `<Checkbox>` component. Sort state is fully controlled — parent owns `sortKey` + `sortDir`.

`SortIcon` (private): stacks CaretUp/Down. Active caret = brand-600; inactive = muted. Skeleton rows: `Array.from({ length: loadingRows }).map(...)` + `animate-pulse` cells — no separate skeleton component needed.

**TypeScript note:** `Table.stories.tsx` used `Record<VendorRow['risk'], JSX.Element>` which threw `Cannot find namespace 'JSX'`. Fix: use `React.ReactElement` and add `import React`.

### Modal

`createPortal(content, document.body)` with `useState(mounted)` SSR guard to prevent `document` access during server render. Body scroll lock saves + restores previous `overflow` value on cleanup.

`ConfirmModal` is a named export wrapper — keeps base `Modal` fully flexible (any footer) while providing an opinionated confirm/cancel pattern with `loading` state. Uses `<Button>` from the DS.

### Toast

Provider + `useToast()` hook. `timers = useRef<Map<string, ReturnType<typeof setTimeout>>>` per-toast so individual toasts can be dismissed without cancelling others. `duration: 0` = persistent (no auto-dismiss). `aria-live="polite"` — not `assertive` — to avoid interrupting screen reader mid-sentence for non-critical notifications.

`Toast` standalone export (no provider) for the `AllVariants` Storybook story. The live `Playground` story wraps in `ToastProvider` via the `decorators` array in story meta.

---

## Session 15 — Group 3: Tabs, Tooltip, DropdownMenu

**Date:** April 4, 2026
**Completed checklist:** ✅ components → ✅ stories → ✅ type-check clean

### Tabs

Three visual variants: `line` (border-b-2 on active tab), `pill` (bg-subtle rounded track, active gets surface bg), `boxed` (full border box around active). All share the same roving tabindex keyboard model.

Roving tabindex: active tab `tabIndex={0}`, others `tabIndex={-1}`. Arrow keys move focus AND activate immediately (auto-activation per ARIA APG recommendation for tabs). `tabRefs` array enables programmatic `.focus()` on keyboard move without a `useEffect` / `setTimeout` dance.

`TabPanel` is a separate named export (`role="tabpanel"` + `hidden` attribute) rather than children of Tabs — allows panels to be placed anywhere in the DOM hierarchy.

### Tooltip

`React.cloneElement` injects `aria-describedby={tooltipId}` onto the trigger. The trigger doesn't need to know about the tooltip. Hover: 500ms default delay (prevents tooltip flicker when mousing across UI). Focus: immediate (keyboard users need instant feedback).

Arrow is pure CSS: `border-4 border-transparent` + one directional side colored to `--ds-bg-inverse`. Avoids an SVG dependency for a simple 8px triangle.

### DropdownMenu

Full keyboard suite: Arrow Up/Down cycle items, Home/End jump to first/last, Enter/Space activate, Escape closes + returns focus to trigger, Tab closes (natural flow). `itemRefs` array + `useEffect` on `highlightedIdx` focus items programmatically — menu items use `tabIndex={-1}`.

`danger` prop applies `--ds-danger-bg` + `--ds-danger-text` on hover — matches the Button danger variant semantics.

**TypeScript:** `cloneElement` types `trigger.props` as `unknown` when element type is generic. Fix:
```tsx
type TriggerProps = React.HTMLAttributes<HTMLElement> & { ref?: React.Ref<HTMLButtonElement> };
const triggerEl = React.cloneElement(trigger as React.ReactElement<TriggerProps>, { ... });
```

---

## Session 16 — Group 4: Sidebar / AppShell, AiChat

**Date:** April 4, 2026
**Completed checklist:** ✅ components → ✅ stories → ✅ type-check clean → ✅ bugs fixed post-screenshot

### Sidebar / AppShell

`AppShell`: thin `flex h-screen overflow-hidden` wrapper — sidebar and main content are siblings, not nested.

`Sidebar`: controlled/uncontrolled collapse via `collapsed` / `defaultCollapsed` props. Width transition animates `width` only (`transition-[width]`) to avoid animating unrelated CSS on re-renders. Expanded: `w-60` (240px), Collapsed: `w-14` (56px).

`NavItemRow` uses `title={collapsed ? item.label : undefined}` for native browser tooltip on icon-only items.

**Bug (found via screenshot):** Collapse toggle was `absolute -right-3 top-16` to float at sidebar edge. Parent `overflow-hidden` (required for smooth width animation) clipped it — button was half-visible.

**Fix:** Moved toggle inside the header row. When expanded: small icon button right-aligned in header. When collapsed: same button centered in the header area. No absolute positioning, no overflow conflict.

### AiChat

Three message roles:
- `user` — right-aligned, brand-600 bubble, rounded-br-sm
- `assistant` — left-aligned, surface bg + border, rounded-bl-sm shadow-xs
- `system` — centred italic muted pill (for auto-assign notices, context injections)

`MessageContent` splits content on ```` ``` ```` fences → renders `<pre><code>` blocks inline. Covers the most common LLM output without a full markdown parser dependency.

`isStreaming` prop shows a pulsing cursor caret inline — lets the parent drive streaming state through the message object rather than separate UI state.

`EmptyState` shows suggestion chips when `messages.length === 0`. Clicking a chip calls `onSend` directly — same path as typing, no special handling.

Input auto-grows via `el.scrollHeight` up to 180px max. Capped to prevent textarea from consuming the viewport on large pastes.

---

## Session 17 — Bug Fixes & Component Audit

**Date:** April 4, 2026

### Bugs Fixed

| Component | Bug | Root Cause | Fix |
|-----------|-----|-----------|-----|
| Toggle | Thumb oval, not circular | `inline-flex` without `items-center` — flex `align-items: stretch` overrode explicit `h-*` on thumb | Added `items-center` to track classes |
| Checkbox | Layout jump on check/uncheck | Conditional `null` render when unchecked — DOM node mount/unmount caused height shift | Always render `<CheckIcon>`, use `opacity-0` when unchecked |
| Sidebar | Collapse button clipped | `absolute -right-3 top-16` was clipped by parent `overflow-hidden` | Moved button inside header row, removed absolute positioning |
| Button | Hardcoded `red-700`/`red-800` in danger hover/active | Token used for hover value wasn't from DS — missed during initial build | Replaced with `--ds-danger-solid-bg` |

### "Use Own Components" Sweep

Audited all component files to verify DS components are used internally where appropriate:

| Component | Uses DS internally |
|-----------|-------------------|
| Modal — `ConfirmModal` footer | ✅ uses `<Button>` |
| Table — select-all / row checkboxes | ✅ uses `<Checkbox>` |
| Modal.stories | ✅ uses `<Button>`, `<Input>` |
| Toast.stories | ✅ uses `<Button>` for triggers |
| DropdownMenu.stories | ✅ uses `<Button>` for action triggers |
| Tooltip.stories | ✅ uses `<Button>`, `<Badge>` |
| Sidebar.stories | ✅ uses `<Badge>` for nav badges |
| AiChat (send/stop, message actions) | Raw `<button>` — justified: icon-only or non-standard sizing not covered by `<Button>` API |
| Modal (close X) | Raw `<button>` — justified: icon-only chrome button |
| Toast (dismiss X) | Raw `<button>` — justified: icon-only chrome button |

---

## Component Status (Updated)

| Component | Built | Dark Mode | Stories | Uses DS Tokens | Uses DS Components |
|-----------|-------|-----------|---------|---------------|--------------------|
| Button | ✅ | ✅ | ✅ | ✅ | — |
| Input | ✅ | ✅ | ✅ | ✅ | — |
| Select | ✅ | ✅ | ✅ | ✅ | — |
| Checkbox | ✅ | ✅ | ✅ | ✅ | — |
| Radio / RadioGroup | ✅ | ✅ | ✅ | ✅ | — |
| Toggle | ✅ | ✅ | ✅ | ✅ | — |
| Badge | ✅ | ✅ | ✅ | ✅ | — |
| Card | ✅ | ✅ | ✅ | ✅ | ✅ Button |
| Table | ✅ | ✅ | ✅ | ✅ | ✅ Checkbox |
| Modal | ✅ | ✅ | ✅ | ✅ | ✅ Button |
| Toast | ✅ | ✅ | ✅ | ✅ | — |
| Tabs | ✅ | ✅ | ✅ | ✅ | — |
| Tooltip | ✅ | ✅ | ✅ | ✅ | — |
| DropdownMenu | ✅ | ✅ | ✅ | ✅ | — |
| Sidebar / AppShell | ✅ | ✅ | ✅ | ✅ | ✅ Badge |
| AiChat | ✅ | ✅ | ✅ | ✅ | — |

*Last updated: April 4, 2026 — All 16 components complete. Foundation + UI library done.*

---

## Session 18 — Group 5: Alert, Progress, Skeleton

**Date:** April 4, 2026
**Completed checklist:** ✅ components → ✅ stories → ✅ type-check clean

### Alert

Inline feedback banner with `role="alert"`. Unlike Toast it stays in document flow — used for persistent warnings, errors, and info that the user needs to act on (e.g. overdue audits, failed integrations).

4 variants use `--ds-*-bg`, `--ds-*-border`, `--ds-*-icon`, `--ds-*-text` tokens — no hardcoded colours. `icon={null}` hides the icon. `action` slot renders any content below the body (typically a `<Button>`). `onDismiss` adds a ×  button.

### Progress

`role="progressbar"` with `aria-valuenow/min/max`. `indeterminate` sets `aria-busy` and animates a sliding fill. 5 colour variants map to semantic tokens: brand, success, warning, danger, neutral. `showValue` renders a `%` label right-aligned next to the bar. `label` is used both visually and as `aria-label`.

### Skeleton

Three primitive variants: `text` (stacked lines, last line 60% width), `rect` (block), `circle` (rounded-full). All `aria-hidden` — purely decorative.

`SkeletonCard` — pre-composed card loading state with optional avatar row. Saves repeating primitive composition in every list/grid that needs loading UI.

`SkeletonTable` — pre-composed table loading state with header row + configurable rows × cols. Matches the `Table` component's visual structure.

---

## Session 19 — Group 6: Drawer, Popover, CommandPalette

**Date:** April 4, 2026
**Completed checklist:** ✅ components → ✅ stories → ✅ type-check clean

### Drawer

Portal-based slide-in panel. 3 sides (right · left · bottom) × 5 sizes. CSS `transition-transform` drives the open/close animation — `translate-x-full` (right), `-translate-x-full` (left), `translate-y-full` (bottom) when closed; `translate-x-0 translate-y-0` when open.

Two-phase close: `open` prop goes false → 300ms CSS transition plays → `visible` state goes false → portal unmounts. Prevents flash of content disappearing before animation completes.

Body scroll lock saves + restores previous `overflow` value. ESC closes and can return focus to trigger.

### Popover

Lightweight non-modal anchored overlay. `React.cloneElement` injects `aria-haspopup="dialog"` + `aria-expanded` onto any trigger. 4 sides × 3 alignment positions via position class maps. Closes on outside `mousedown` and Escape.

Deliberate choice: no portal, no `@floating-ui`. Absolute positioning inside a `relative` wrapper is sufficient for Storybook/portfolio use cases and avoids adding a dependency. Can upgrade to Floating UI for production.

**TypeScript:** narrowed cloneElement trigger type to `HTMLAttributes<HTMLButtonElement>` to avoid `MouseEvent<Element>` mismatch.

### CommandPalette

Portal-based full-screen command palette (Cmd+K pattern). Key design decisions:

- Search filters `label` + `detail` with `normalize()` (lowercase, collapsed whitespace)
- Groups preserved from item order — rendered as non-interactive dividers (not nested DOM groups)
- Keyboard: Arrow Up/Down cycle filtered items, Enter activates, Escape closes and returns focus
- `aria-activedescendant` on the search input tracks highlighted item
- `scrollIntoView({ block: 'nearest' })` keeps highlighted item visible as user arrows
- Shortcut hints rendered as `<kbd>` elements — styled with subtle border + bg tokens

**TypeScript fixes:** `SlashIcon` doesn't exist in Phosphor v2 (Breadcrumb story) — replaced with a literal `/` string.

---

## Session 20 — Group 7: Breadcrumb, Pagination, Stepper

**Date:** April 4, 2026
**Completed checklist:** ✅ components → ✅ stories → ✅ type-check clean

### Breadcrumb

ARIA structure: `<nav aria-label="Breadcrumb">` → `<ol role="list">` → `<li>` items. Last item gets `aria-current="page"` automatically. Ancestors render as `<a>` (with `href`) or a click-only `<a>` (SPA pattern, `href="#"` + `onClick`). Items with neither are plain `<span>`.

`separator` prop defaults to `<CaretRightIcon>` but accepts any `ReactNode` — `/` slash, `·` dot, etc.

### Pagination

Smart ellipsis algorithm: shows first + last page always, `siblingCount` pages around current page, `…` where gaps exist. Two `…` positions possible (left + right). When total pages ≤ `2 * siblingCount + 5`, no ellipsis shown (all pages visible).

`totalItems` + `pageSize` renders a "1–25 of 487" range label left of the page buttons. Active page uses `bg-[var(--ds-brand-600)] text-white`. Prev/Next buttons use `disabled` attribute + visual `opacity-40`.

### Stepper

Two orientations: horizontal (connector line spans between circles above labels) and vertical (connector line runs down-left of circles).

Status auto-computed: `index < currentStep` = complete, `index === currentStep` = current, else upcoming. `status` prop per-step overrides this for manual control (e.g. marking a step as error).

Completed steps are clickable when `onStepClick` is provided — the circle renders as a `<button>` with focus ring. Upcoming steps are not interactive. `optional` prop shows a small "(optional)" label.

---

## Session 21 — Group 8: Avatar, TagInput, DatePicker

**Date:** April 4, 2026
**Completed checklist:** ✅ components → ✅ stories → ✅ type-check clean → ✅ 3 bugs fixed

### Avatar

Image → initials → icon fallback priority. Image `onError` hides broken image so initials/icon show through. Status dot uses `ring-2 ring-[var(--ds-bg-surface)]` to create the gap between dot and avatar edge — handles any background colour without needing a separate gap element.

`AvatarGroup` uses negative `margin-left` (`-ml-2`) to overlap avatars. Ring on each item creates the separation. Overflow count uses the same `SIZE` map class. `React.cloneElement` injects the `size` prop onto each Avatar child so the group `size` prop cascades down.

### TagInput

Controlled/uncontrolled. Tags rendered inline in the field — clicking anywhere focuses the hidden input. `confirmKeys` defaults to `['Enter', ',']` — comma is stripped from the tag value before adding. Backspace on empty input removes the last tag.

Suggestions dropdown: `onBlur` adds the current input value as a tag (with 150ms timeout to allow suggestion `onMouseDown` to fire first — prevents the blur closing the list before the click registers).

`max` prop disables the input entirely when reached (input not rendered). Counter label shows `tags.length/max`.

### DatePicker

Calendar grid built from first-day-of-month offset + `new Date(year, month + 1, 0).getDate()` for days-in-month. No external dependency.

Today's date highlighted with `border border-[var(--ds-brand-600)]` (not filled — reserved for selected date). Selected date gets `bg-[var(--ds-brand-600)] text-white`. Disabled dates (outside min/max) get `opacity-30 cursor-not-allowed`.

"Today" shortcut at the bottom navigates the view to current month and selects today in one click.

Two-phase close (same as Drawer): panel closes immediately on date select or outside click — no animation needed.

**TypeScript fixes:**
- `Badge` with `dot` prop missing required `children` → added `{''}` empty child
- `Popover` `cloneElement` `MouseEvent<Element>` mismatch → narrowed to `HTMLButtonElement`

---

## Component Status (Full Library — April 4, 2026)

| Component | Built | Dark Mode | Stories | DS Tokens | DS Components |
|-----------|-------|-----------|---------|-----------|---------------|
| Button | ✅ | ✅ | ✅ | ✅ | — |
| Input | ✅ | ✅ | ✅ | ✅ | — |
| Select | ✅ | ✅ | ✅ | ✅ | — |
| Checkbox | ✅ | ✅ | ✅ | ✅ | — |
| Radio / RadioGroup | ✅ | ✅ | ✅ | ✅ | — |
| Toggle | ✅ | ✅ | ✅ | ✅ | — |
| Badge | ✅ | ✅ | ✅ | ✅ | — |
| Card | ✅ | ✅ | ✅ | ✅ | ✅ Button |
| Table | ✅ | ✅ | ✅ | ✅ | ✅ Checkbox |
| Modal | ✅ | ✅ | ✅ | ✅ | ✅ Button |
| Toast | ✅ | ✅ | ✅ | ✅ | — |
| Tabs | ✅ | ✅ | ✅ | ✅ | — |
| Tooltip | ✅ | ✅ | ✅ | ✅ | — |
| DropdownMenu | ✅ | ✅ | ✅ | ✅ | — |
| Sidebar / AppShell | ✅ | ✅ | ✅ | ✅ | ✅ Badge |
| AiChat | ✅ | ✅ | ✅ | ✅ | — |
| Alert | ✅ | ✅ | ✅ | ✅ | ✅ Button |
| Progress | ✅ | ✅ | ✅ | ✅ | — |
| Skeleton / SkeletonCard / SkeletonTable | ✅ | ✅ | ✅ | ✅ | — |
| Drawer | ✅ | ✅ | ✅ | ✅ | ✅ Button · Badge · Input |
| Popover | ✅ | ✅ | ✅ | ✅ | ✅ Button · Badge · Progress |
| CommandPalette | ✅ | ✅ | ✅ | ✅ | — |
| Breadcrumb | ✅ | ✅ | ✅ | ✅ | — |
| Pagination | ✅ | ✅ | ✅ | ✅ | — |
| Stepper | ✅ | ✅ | ✅ | ✅ | ✅ Button · Input |
| Avatar / AvatarGroup | ✅ | ✅ | ✅ | ✅ | — |
| TagInput | ✅ | ✅ | ✅ | ✅ | — |
| DatePicker | ✅ | ✅ | ✅ | ✅ | — |

**Total: 28 components (+ sub-components). Full-stack enterprise UI library complete.**

---

## Session 22 — Data Visualisation Layer (Chart.tsx)

**Date:** April 4, 2026
**Goal:** Add an ECharts-powered chart library to the design system — theme-aware, enterprise-relevant, developer-friendly.

### Why ECharts

ECharts (Apache) is the industry-leading open-source chart library for enterprise dashboards:
- Handles millions of data points without frame-drops (WebGL renderer available)
- First-class TypeScript types (`echarts` package exports `EChartsOption`)
- `echarts-for-react` wrapper gives us a clean React component interface
- Better suited than Recharts or Chart.js for heatmaps, scatter with variable size, and data zoom sliders

### Packages installed

```bash
npm install echarts echarts-for-react
```

Both packages resolve cleanly — no peer-dep conflicts with React 19.

### Theme-aware colour problem

CSS custom properties (`var(--ds-brand-600)`) cannot be used directly inside ECharts JS option objects — ECharts renders to Canvas, not DOM. Solution: `cssVar()` helper calls `getComputedStyle(document.documentElement).getPropertyValue(name)` at render time. Wrapped in `useMemo` so it only re-runs when the component re-mounts (which happens on theme switch in Storybook). All chart colours automatically follow `data-theme` and `.dark` context.

### `baseOption()` — shared defaults

Every chart inherits a consistent baseline:
- `backgroundColor: 'transparent'` — chart sits inside DS Card/surface, not its own white box
- Tooltip styled with `--ds-bg-surface / --ds-border-base` — matches DS card style, `border-radius:8px`
- Legend uses `roundRect` icon, `--ds-text-secondary` labels
- Grid with `containLabel: true` — axis labels never get clipped

### Chart components built

| Component | Type | Enterprise use case |
|-----------|------|---------------------|
| `LineChart` | Time-series | Compliance score trends, MTTR, SLA history |
| `BarChart` | Grouped / stacked / horizontal | Framework coverage, vendor counts, MAU |
| `AreaChart` | Filled line | Resource utilisation, alert volume |
| `DonutChart` | Pie with hole + centre label | Risk distribution, audit status, routing breakdown |
| `Sparkline` | Inline 48px | KPI cards — trend indication without axis noise |
| `HeatmapChart` | Grid heat | Control risk matrix, alert density by hour × service |
| `ScatterChart` | X-Y with variable size | Vendor risk vs spend, DORA metrics |

### TypeScript fixes

Three type issues resolved without `any` suppression:
1. **`graphic` children** — ECharts' `GraphicComponentElementOption` types `style` as `PathStyleProps` which doesn't include `text`. Fixed with `as Record<string, unknown>` on each child style, and `as EChartsOption['graphic']` on the array — preserves outer type safety.
2. **Heatmap tooltip formatter** — ECharts types `TopLevelFormatterParams` broadly. Fixed with `(params: unknown)` + inline cast.
3. **Scatter tooltip formatter** — same pattern.

### Stories built (Chart.stories.tsx)

7 named stories with realistic enterprise data:

| Story | Data scenario |
|-------|--------------|
| `Playground` | Compliance score trend — 3 frameworks, 12 months, zoom enabled |
| `LineChartStory` | Security incident counts + MTTR by category |
| `AreaChartStory` | Infrastructure utilisation + alert volume with noise reduction |
| `BarChartStory` | Framework control coverage (stacked) + vendor risk (horizontal) + MAU |
| `DonutChartStory` | Vendor risk profile + audit status + alert routing |
| `SparklineStory` | 8 KPI cards with live sparklines + Badge delta |
| `HeatmapChartStory` | Compliance risk matrix + alert density by hour |
| `ScatterChartStory` | Vendor risk vs spend + DORA metrics |
| `EnterpriseDashboard` | Full dashboard composition — KPIs + 4 chart panels |
| `LoadingState` | Loading skeleton for 4 chart types |

### Architectural decisions

- **No Floating UI / Popper** — charts are static, no positioning needed
- **`notMerge={true}`** — each render replaces the full option, no incremental diff bugs
- **`'use client'` directive** — ECharts accesses `document` / `window`, SSR-incompatible
- **`height` prop** — Sparkline defaults 48px; all others default 300px. Always explicit, never auto-height, to avoid CLS
- **Palette** — 7-colour array driven by DS tokens: brand, success, warning, danger, info, violet, amber. Violet and amber are hardcoded fallbacks (not in all brand themes)

### Component Status (updated)

| Component | File | Stories | Types | Dark | DS tokens | Uses DS components |
|-----------|------|---------|-------|------|-----------|-------------------|
| Chart / LineChart / BarChart / AreaChart / DonutChart / Sparkline / HeatmapChart / ScatterChart | `Chart.tsx` | ✅ | ✅ | ✅ | ✅ | ✅ Badge · Card |

**Total: 29 components (+ sub-components). Full enterprise UI library + data visualisation layer.**

---

## Session 23 — Extended Component Set

**Date:** April 4, 2026
**Goal:** Add the remaining enterprise-critical components: EmptyState, StatCard, Timeline, PageTemplate, CodeBlock, FilterBar, RichTextEditor, DataGrid.

### Components built

**EmptyState** (`EmptyState.tsx`)
- 3 sizes (sm / md / lg), any icon node, primary + secondary action, footer slot
- `role="status"` + `aria-label` for screen readers
- Used inside DataGrid, Table, and ActivityFeed for consistent zero-data experience

**StatCard / StatCardGroup** (`StatCard.tsx`)
- KPI card: label, 3xl value, delta Badge with TrendUp/Down/Minus icon, optional Sparkline
- `positiveIsGood` flag inverts the colour semantics (e.g. "Vendors added" going up is amber, not green)
- Loading skeleton built in. Interactive when `onClick` provided — full keyboard + focus ring
- `StatCardGroup` is a responsive grid helper: 2 / 3 / 4 column variants

**Timeline / ActivityFeed** (`Timeline.tsx`)
- `<ol role="list">` with dot + connector line layout
- 6 variant colours (default / brand / success / warning / danger / info) map to DS status tokens
- `content` slot on each item — used for metadata grids, action buttons, detail panels
- `ActivityFeed` wraps Timeline in a card with header, "View all" link, scroll cap, and loading skeleton

**PageTemplate** (`PageTemplate.tsx`)
- `Page` — root min-h-screen bg-base flex column
- `PageHeader` — sticky `z-[--ds-z-sticky]`, breadcrumb slot, icon slot, meta slot, actions slot, tabs slot
- `PageContent` — `<main>`, optional `noPadding` for full-bleed tables/charts
- `Section` — heading + optional action, `mb-8` rhythm
- `TwoColumnLayout` — 1/3 + 2/3 grid, sidebar side configurable
- `ThreeColumnLayout` — equal 3-column grid
- `SplitPane` — fixed-width left panel + scrollable right, configurable `panelWidth`
- `DashboardGrid` + `DashboardWidget` — responsive 1→2→3→4 column grid with `span` prop

**CodeBlock** (`CodeBlock.tsx`)
- `highlight.js` core with 10 languages registered: JS, TS, Python, Bash, JSON, XML/HTML, YAML, SQL, CSS, Go
- DS theme injected once into `<head>` via `injectTheme()` — uses CSS vars so dark mode / brand theme updates automatically without re-render
- Line numbers mode: per-line `<table>` layout, inline `hljs.highlight()` per line
- `highlightLines` array marks specific lines with warning background + left border
- Default mode: single `<pre><code>` block, `hljs.highlightElement()` on mount
- Copy button: `navigator.clipboard.writeText`, 2s "Copied!" confirmation state
- `bare` prop removes the card frame for inline embedding

**FilterBar** (`FilterBar.tsx`)
- Composable: search input + funnel icon + N dropdown groups + active chips + "Clear all"
- Each group: `multi` (checkbox behaviour) or `single` (radio behaviour, closes on pick)
- Active filter chips show `groupLabel: optionLabel` with individual dismiss ×
- Fully controlled via `value: FilterValue` (Record<groupKey, string[]>)
- `actions` slot right-aligned — used for sort buttons, view toggles, export

**RichTextEditor** (`RichTextEditor.tsx`)
- `contenteditable` div, zero runtime dependencies (no Tiptap, no Quill, no ProseMirror)
- `document.execCommand` for all formatting — bold, italic, underline, strikethrough, H2, blockquote, code block, bullet list, numbered list, link, undo, redo
- DS theme applied via Tailwind `[&_strong]`, `[&_blockquote]`, `[&_pre]` deep selectors
- Placeholder via `[&:empty]:before:content-[attr(data-placeholder)]` CSS trick — no JS
- Link dialog: floating panel below toolbar, Escape cancels, Enter confirms
- Word count footer optional. Error state adds danger ring to shell
- `useEffect` initialises `innerHTML` once from `value` prop — does not reset on re-render

**DataGrid** (`DataGrid.tsx`)
- Generic `<T extends { id }>` — fully typed column definitions and cell renderers
- Sort: built-in (internal state) or external (pass `sortKey` + `sortDir` + `onSort`)
- Pagination: built-in page state, prev/next buttons, range label, shows selected count
- Selection: header checkbox (select all / indeterminate), per-row checkbox, `selectedIds: Set`
- `badgeCell<T>(map)` — factory returns a typed renderer mapping string values to Badge variants
- `numberCell<T>(formatter?)` — factory returns a typed renderer for tabular numeric cells
- Loading: `<SkeletonRow>` uses Skeleton component for consistent pulse effect
- Empty: delegates to `<EmptyState size="sm">` with custom title/desc

### TypeScript notes

All 8 components pass `tsc --noEmit` with zero errors. Key decisions:
- `PageContentProps extends React.HTMLAttributes<HTMLElement>` — allows `style` prop passthrough for height-constrained split-pane layouts
- `DataGrid<T>` uses `(row as Record<string, unknown>)[field]` for dynamic key access — avoids index signature on the generic
- `RichTextEditor` suppresses `contentEditable` warning via `suppressContentEditableWarning`

---

## Session 24 — Storybook Navigation Restructure

**Date:** April 4, 2026
**Goal:** Replace the flat `UI/*` story prefix with semantic groups so Storybook is scannable without scrolling.

### Problem

All 33 component stories were filed under `UI/ComponentName`. With 37 total stories (33 components + 11 foundations), the `UI` group had become a long alphabetical dump with no visual hierarchy.

### New group structure

| Group | Stories |
|-------|---------|
| **Foundations** | Colors · Typography · Spacing · Radius · Shadows · Icons · Focus · Grid · Motion · States · Governance |
| **Core** | Button · Input · Select · Checkbox · Radio · Toggle · Badge · Card |
| **Feedback** | Alert · Toast · Progress · Skeleton · EmptyState |
| **Overlays** | Modal · Drawer · Popover · Tooltip · CommandPalette · DropdownMenu |
| **Navigation** | Sidebar · Breadcrumb · Tabs · Pagination · Stepper |
| **Data Display** | Table · DataGrid · Chart · StatCard · Timeline |
| **Forms** | TagInput · DatePicker · FilterBar · RichTextEditor |
| **Layout** | PageTemplate · Avatar |
| **Content** | CodeBlock |
| **AI** | AiChat |

### Grouping rationale

- **Core** = atoms and molecules a developer reaches for first; most frequently used
- **Feedback** = components that communicate system state to the user
- **Overlays** = components that render above the page in a portal or absolute layer
- **Navigation** = components that help users move through the app
- **Data Display** = read-only data presentation — tables, charts, KPIs, activity feeds
- **Forms** = components that capture or filter user input beyond basic fields
- **Layout** = structural scaffolding; not individual widgets
- **Content** = rich content rendering (code, text)
- **AI** = AI-specific interaction patterns

### Scaffold stories deleted

Removed `src/stories/Button.stories.ts`, `Header.stories.ts`, and `Page.stories.ts` — these were the default Storybook scaffold examples, not DS components.

### Rule added to contributor guidelines

> **Storybook groups** — file new stories under the correct group (Core / Feedback / Overlays / etc.), not under `UI/`.

---

## Full Component Status (as of Session 24)

| Component | File | Stories | Types | Dark | DS tokens | Uses DS components |
|-----------|------|---------|-------|------|-----------|-------------------|
| Button | `Button.tsx` | ✅ | ✅ | ✅ | ✅ | — |
| Input | `Input.tsx` | ✅ | ✅ | ✅ | ✅ | — |
| Select | `Select.tsx` | ✅ | ✅ | ✅ | ✅ | — |
| Checkbox | `Checkbox.tsx` | ✅ | ✅ | ✅ | ✅ | — |
| Radio / RadioGroup | `Radio.tsx` | ✅ | ✅ | ✅ | ✅ | — |
| Toggle | `Toggle.tsx` | ✅ | ✅ | ✅ | ✅ | — |
| Badge | `Badge.tsx` | ✅ | ✅ | ✅ | ✅ | — |
| Card | `Card.tsx` | ✅ | ✅ | ✅ | ✅ | — |
| Table | `Table.tsx` | ✅ | ✅ | ✅ | ✅ | ✅ Badge · Checkbox |
| Modal | `Modal.tsx` | ✅ | ✅ | ✅ | ✅ | ✅ Button |
| Toast | `Toast.tsx` | ✅ | ✅ | ✅ | ✅ | ✅ Button |
| Tabs | `Tabs.tsx` | ✅ | ✅ | ✅ | ✅ | — |
| Tooltip | `Tooltip.tsx` | ✅ | ✅ | ✅ | ✅ | ✅ Button |
| DropdownMenu | `DropdownMenu.tsx` | ✅ | ✅ | ✅ | ✅ | ✅ Button |
| Sidebar / AppShell | `Sidebar.tsx` | ✅ | ✅ | ✅ | ✅ | ✅ Button · Badge · Tooltip |
| AiChat | `AiChat.tsx` | ✅ | ✅ | ✅ | ✅ | ✅ Button · Badge · Spinner |
| Alert | `Alert.tsx` | ✅ | ✅ | ✅ | ✅ | ✅ Button |
| Progress | `Progress.tsx` | ✅ | ✅ | ✅ | ✅ | — |
| Skeleton / SkeletonCard / SkeletonTable | `Skeleton.tsx` | ✅ | ✅ | ✅ | ✅ | — |
| Drawer | `Drawer.tsx` | ✅ | ✅ | ✅ | ✅ | ✅ Button · Badge · Input |
| Popover | `Popover.tsx` | ✅ | ✅ | ✅ | ✅ | ✅ Button · Badge · Progress |
| CommandPalette | `CommandPalette.tsx` | ✅ | ✅ | ✅ | ✅ | — |
| Breadcrumb | `Breadcrumb.tsx` | ✅ | ✅ | ✅ | ✅ | — |
| Pagination | `Pagination.tsx` | ✅ | ✅ | ✅ | ✅ | — |
| Stepper | `Stepper.tsx` | ✅ | ✅ | ✅ | ✅ | ✅ Button · Input |
| Avatar / AvatarGroup | `Avatar.tsx` | ✅ | ✅ | ✅ | ✅ | — |
| TagInput | `TagInput.tsx` | ✅ | ✅ | ✅ | ✅ | — |
| DatePicker | `DatePicker.tsx` | ✅ | ✅ | ✅ | ✅ | — |
| Chart (8 chart types) | `Chart.tsx` | ✅ | ✅ | ✅ | ✅ | ✅ Badge · Card |
| EmptyState | `EmptyState.tsx` | ✅ | ✅ | ✅ | ✅ | ✅ Button |
| StatCard / StatCardGroup | `StatCard.tsx` | ✅ | ✅ | ✅ | ✅ | ✅ Badge · Sparkline |
| Timeline / ActivityFeed | `Timeline.tsx` | ✅ | ✅ | ✅ | ✅ | ✅ Badge |
| PageTemplate (9 exports) | `PageTemplate.tsx` | ✅ | ✅ | ✅ | ✅ | ✅ Button · Badge · StatCard · Chart |
| CodeBlock | `CodeBlock.tsx` | ✅ | ✅ | ✅ | ✅ | — |
| FilterBar | `FilterBar.tsx` | ✅ | ✅ | ✅ | ✅ | ✅ Badge · Button |
| RichTextEditor | `RichTextEditor.tsx` | ✅ | ✅ | ✅ | ✅ | — |
| DataGrid | `DataGrid.tsx` | ✅ | ✅ | ✅ | ✅ | ✅ Badge · EmptyState · Skeleton |

**Total: 37 components / component groups · 46 Storybook stories · tsc --noEmit zero errors.**

---

### Session 10 — Gap Analysis & New Component Wave
**Date:** April 4–5, 2026
**Time taken:** ~3 hours

#### What was done
- Ran a full gap analysis against enterprise SaaS UI patterns — identified 40+ missing components
- Built second major wave of UI components:

| Component | File | Notes |
|---|---|---|
| Accordion | `Accordion.tsx` | Animated expand/collapse, single/multi mode |
| Carousel | `Carousel.tsx` | Swipeable, dot indicators, auto-play |
| DateRangePicker | `DateRangePicker.tsx` | Month/year navigation added to DatePicker too |
| Divider | `Divider.tsx` | Horizontal/vertical, with optional label |
| FileUploader | `FileUploader.tsx` | Drag-and-drop, multi-file, progress per file |
| IconButton | `IconButton.tsx` | Square button for icon-only actions |
| Quantifier | `Quantifier.tsx` | Numeric stepper +/− input |
| QueryBuilder | `QueryBuilder.tsx` | Visual filter-rule builder |
| SegmentedControl | `SegmentedControl.tsx` | Pill-style tab switcher |
| Slider | `Slider.tsx` | Range slider with value display |
| Spinner | `Spinner.tsx` | Standalone loading spinner |
| Textarea | `Textarea.tsx` | Auto-grow, character counter |
| Tree | `Tree.tsx` | Recursive expandable tree with checkboxes |
| VideoPlayer | `VideoPlayer.tsx` | HTML5 video with custom controls |
| WorkspaceSwitcher | `WorkspaceSwitcher.tsx` | Multi-workspace dropdown |
| BulkActionsBar | `BulkActionsBar.tsx` | Floating bar for table row selections |
| ColumnCustomizer | `ColumnCustomizer.tsx` | Drag-to-reorder visible columns |
| CircularProgress | `CircularProgress.tsx` | SVG ring progress indicator |

- Added marketing components folder: `src/components/marketing/` (MarketingNav, Hero, Footer, PricingCard, TestimonialCard, FeatureGrid)

#### Value created
- Design system now covers nearly every UI pattern needed by the 3 portfolio projects
- Marketing components enable building landing pages for each product

---

### Session 11 — Enterprise Pages & AI Components
**Date:** April 5–6, 2026
**Time taken:** ~2 hours

#### What was done
Built 5 enterprise-grade full-page components and 4 AI-specific components:

**Enterprise pages:**
| Component | File | Notes |
|---|---|---|
| DashboardPage | `DashboardPage.tsx` | Stats grid + activity feed + flexible content slots |
| ListPage | `ListPage.tsx` | Search toolbar + filters + table wrapper + pagination |
| DetailPage | `DetailPage.tsx` | Back nav + tabs + sidebar layout + FieldGrid helper |
| SettingsPage | `SettingsPage.tsx` | Left sidebar nav + SettingsSectionCard + SettingsField |
| FormPage | `FormPage.tsx` | Stepped form wrapper with cancel/submit footer |
| UserManagementPage | `UserManagementPage.tsx` | Role-based user table with invite + suspend flows |
| AuditLogPage | `AuditLogPage.tsx` | Filterable audit event log with actor/resource/action |
| BillingPage | `BillingPage.tsx` | Plan overview + usage meters + invoice history |
| NotificationsCenter | `NotificationsCenter.tsx` | Grouped notifications with mark-read + preferences |
| ReportsPage | `ReportsPage.tsx` | Report library with filters + scheduled run management |

**AI components (in `AIComponents.tsx`):**
| Export | Notes |
|---|---|
| `AIConfidencePanel` | Score badge (0–100) + signal list, color-coded high/medium/low |
| `AIModelSelector` | Model card picker with context-window and cost metadata |
| `AIFeedback` | Thumbs up/down + optional comment for RLHF collection |
| `AIPromptBuilder` | Template selector + textarea with ⌘↵ submit shortcut |

**Workflow & data components:**
| Component | Notes |
|---|---|
| `ApprovalFlow` | Multi-step approval timeline with approve/reject actions |
| `TaskPanel` | Kanban task list with inline CRUD per status group |
| `PermissionMatrix` | Role × resource × action grid, cycles false/partial/true |
| `DataExport` | Format picker (CSV/Excel/JSON) + column selector |
| `DataImport` | 4-step wizard: upload → column mapping → preview → done |
| `InlineEdit` | Click-to-edit field, supports click and icon trigger modes |
| `UndoToast` | Transient toast with countdown progress bar + `useUndoToast` hook |
| `OnboardingFlow` | Multi-step wizard with progress bar and step validation |
| `ContextualToolbar` | Floating action bar for multi-select scenarios |
| `GuidedTour` | Product tour with DOM targeting, spotlight overlay, step tooltips |
| `InlineActions` | Row-level action menu with configurable visible/overflow split |

#### Challenges & Solutions

**Challenge — `FileJsonIcon` does not exist in Phosphor**
- Found during TypeScript compilation: `@phosphor-icons/react` exports `FileJsIcon` not `FileJsonIcon`
- Fix: Swapped to `FileJsIcon` in `DataExport.tsx`

**Challenge — `ApprovalFlow.tsx` TS2339: Property 'border' missing**
- `STATUS_META` type was missing a `border` field that was used in JSX
- Fix: Added `border: string` to the interface and filled in all 4 status entries

**Challenge — Storybook broken (SyntaxError: Identifier 'React' already declared)**
- `Breadcrumb.stories.tsx` had a duplicate `import React from 'react'` on line 1–2
- Fix: Removed the duplicate line — Storybook built clean immediately after

#### Value created
- Design system is now a complete product-ready toolkit for all 3 portfolio projects
- AI components are unique differentiator — purpose-built for enterprise AI products
- Enterprise pages mean entire screens can be scaffolded with 10–20 lines of code in consumer apps

---

### Session 12 — Security, UI Audit & Documentation Pass
**Date:** April 6–7, 2026
**Time taken:** ~1.5 hours

#### What was done

**Security audit:**
- Identified `href` injection vulnerability in 6 components: `Breadcrumb.tsx`, `NotificationsCenter.tsx`, `Timeline.tsx`, `Footer.tsx`, `MarketingNav.tsx`, `RichTextEditor.tsx`
- Added `sanitizeHref()` helper that blocks `javascript:` and `data:` URL schemes
- Full results documented in `SECURITY.md`

**UI consistency audit:**
- Added missing `focus-visible:ring-2` focus indicators to 20+ buttons across new components
- Normalized font sizes to design token scale (no hardcoded `text-[11px]` etc. where avoidable)
- Fixed `Chart.tsx` hardcoded hex colors (`#8b5cf6`, `#f59e0b`) → routed through `var(--ds-chart-violet)` and `var(--ds-warning-icon)`
- Full results documented in `UI_AUDIT.md`

**Storybook documentation:**
- Added `tags: ['autodocs']` + full `argTypes` with controls, options, and descriptions to all story files
- Every component now has interactive Storybook controls panel for live prop editing
- Developers can see all variants, copy code, and understand props without reading source

**Figma conversion assets:**
- Created `figma/figma-tokens.json` — W3C Design Token Format with all primitive + semantic tokens across 4 color modes (Light, Dark, Light/IT Ops, Light/Analytics) and 3 brand theme overrides
- Created `figma/FIGMA_AGENT_GUIDE.md` — 14-section guide for a Claude Code agent to build the complete Figma file: Variable setup, Typography styles, Effect styles, Component build order (8 phases), per-component measurements, Storybook↔Figma parity checklist, naming conventions, WCAG requirements

#### Value created
- Zero security vulnerabilities in outward-facing href props
- WCAG AA-compliant keyboard navigation (focus rings on all interactive elements)
- Storybook is now a living style guide — usable by designers, developers, and QA without code knowledge
- Figma conversion is fully guided — another agent can build the Figma file autonomously from the guide

---

## Final State — April 7, 2026

### Component Registry (Complete)

| Component | File | Comp | Stories | Dark | 3 Themes | Uses DS |
|---|---|---|---|---|---|---|
| Button | `Button.tsx` | ✅ | ✅ | ✅ | ✅ | — |
| Input | `Input.tsx` | ✅ | ✅ | ✅ | ✅ | — |
| Select | `Select.tsx` | ✅ | ✅ | ✅ | ✅ | — |
| Checkbox | `Checkbox.tsx` | ✅ | ✅ | ✅ | ✅ | — |
| Radio | `Radio.tsx` | ✅ | ✅ | ✅ | ✅ | — |
| Toggle | `Toggle.tsx` | ✅ | ✅ | ✅ | ✅ | — |
| Textarea | `Textarea.tsx` | ✅ | ✅ | ✅ | ✅ | — |
| Slider | `Slider.tsx` | ✅ | ✅ | ✅ | ✅ | — |
| Quantifier | `Quantifier.tsx` | ✅ | ✅ | ✅ | ✅ | — |
| TagInput | `TagInput.tsx` | ✅ | ✅ | ✅ | ✅ | — |
| DatePicker | `DatePicker.tsx` | ✅ | ✅ | ✅ | ✅ | — |
| DateRangePicker | `DateRangePicker.tsx` | ✅ | ✅ | ✅ | ✅ | — |
| Badge | `Badge.tsx` | ✅ | ✅ | ✅ | ✅ | — |
| Avatar | `Avatar.tsx` | ✅ | ✅ | ✅ | ✅ | — |
| Spinner | `Spinner.tsx` | ✅ | ✅ | ✅ | ✅ | — |
| Skeleton | `Skeleton.tsx` | ✅ | ✅ | ✅ | ✅ | — |
| CircularProgress | `CircularProgress.tsx` | ✅ | ✅ | ✅ | ✅ | — |
| Progress | `Progress.tsx` | ✅ | ✅ | ✅ | ✅ | — |
| Divider | `Divider.tsx` | ✅ | ✅ | ✅ | ✅ | — |
| IconButton | `IconButton.tsx` | ✅ | ✅ | ✅ | ✅ | — |
| Card | `Card.tsx` | ✅ | ✅ | ✅ | ✅ | — |
| StatCard | `StatCard.tsx` | ✅ | ✅ | ✅ | ✅ | ✅ Badge · Sparkline |
| Alert | `Alert.tsx` | ✅ | ✅ | ✅ | ✅ | ✅ Button |
| Toast | `Toast.tsx` | ✅ | ✅ | ✅ | ✅ | ✅ Button |
| UndoToast | `UndoToast.tsx` | ✅ | ✅ | ✅ | ✅ | ✅ Toast |
| EmptyState | `EmptyState.tsx` | ✅ | ✅ | ✅ | ✅ | ✅ Button |
| Modal | `Modal.tsx` | ✅ | ✅ | ✅ | ✅ | ✅ Button |
| Drawer | `Drawer.tsx` | ✅ | ✅ | ✅ | ✅ | ✅ Button |
| Popover | `Popover.tsx` | ✅ | ✅ | ✅ | ✅ | ✅ Button |
| Tooltip | `Tooltip.tsx` | ✅ | ✅ | ✅ | ✅ | ✅ Button |
| Tabs | `Tabs.tsx` | ✅ | ✅ | ✅ | ✅ | — |
| Accordion | `Accordion.tsx` | ✅ | ✅ | ✅ | ✅ | — |
| Stepper | `Stepper.tsx` | ✅ | ✅ | ✅ | ✅ | ✅ Button |
| SegmentedControl | `SegmentedControl.tsx` | ✅ | ✅ | ✅ | ✅ | — |
| Breadcrumb | `Breadcrumb.tsx` | ✅ | ✅ | ✅ | ✅ | — |
| Pagination | `Pagination.tsx` | ✅ | ✅ | ✅ | ✅ | — |
| DropdownMenu | `DropdownMenu.tsx` | ✅ | ✅ | ✅ | ✅ | ✅ Button |
| CommandPalette | `CommandPalette.tsx` | ✅ | ✅ | ✅ | ✅ | — |
| Sidebar | `Sidebar.tsx` | ✅ | ✅ | ✅ | ✅ | ✅ Button · Badge · Tooltip |
| WorkspaceSwitcher | `WorkspaceSwitcher.tsx` | ✅ | ✅ | ✅ | ✅ | ✅ Avatar |
| BulkActionsBar | `BulkActionsBar.tsx` | ✅ | ✅ | ✅ | ✅ | ✅ Button · Badge |
| ColumnCustomizer | `ColumnCustomizer.tsx` | ✅ | ✅ | ✅ | ✅ | ✅ Button |
| ContextualToolbar | `ContextualToolbar.tsx` | ✅ | ✅ | ✅ | ✅ | — |
| InlineActions | `InlineActions.tsx` | ✅ | ✅ | ✅ | ✅ | — |
| InlineEdit | `InlineEdit.tsx` | ✅ | ✅ | ✅ | ✅ | — |
| GuidedTour | `GuidedTour.tsx` | ✅ | ✅ | ✅ | ✅ | — |
| Table | `Table.tsx` | ✅ | ✅ | ✅ | ✅ | ✅ Badge · Checkbox |
| DataGrid | `DataGrid.tsx` | ✅ | ✅ | ✅ | ✅ | ✅ Badge · EmptyState · Skeleton |
| FilterBar | `FilterBar.tsx` | ✅ | ✅ | ✅ | ✅ | ✅ Badge · Button |
| QueryBuilder | `QueryBuilder.tsx` | ✅ | ✅ | ✅ | ✅ | — |
| Chart | `Chart.tsx` | ✅ | ✅ | ✅ | ✅ | ✅ Badge · Card |
| Tree | `Tree.tsx` | ✅ | ✅ | ✅ | ✅ | — |
| Timeline | `Timeline.tsx` | ✅ | ✅ | ✅ | ✅ | ✅ Badge |
| Carousel | `Carousel.tsx` | ✅ | ✅ | ✅ | ✅ | — |
| VideoPlayer | `VideoPlayer.tsx` | ✅ | ✅ | ✅ | ✅ | — |
| FileUploader | `FileUploader.tsx` | ✅ | ✅ | ✅ | ✅ | — |
| CodeBlock | `CodeBlock.tsx` | ✅ | ✅ | ✅ | ✅ | — |
| RichTextEditor | `RichTextEditor.tsx` | ✅ | ✅ | ✅ | ✅ | — |
| AiChat | `AiChat.tsx` | ✅ | ✅ | ✅ | ✅ | ✅ Button · Badge · Spinner |
| AIComponents | `AIComponents.tsx` | ✅ | ✅ | ✅ | ✅ | — |
| ApprovalFlow | `ApprovalFlow.tsx` | ✅ | ✅ | ✅ | ✅ | ✅ Button |
| TaskPanel | `TaskPanel.tsx` | ✅ | ✅ | ✅ | ✅ | — |
| PermissionMatrix | `PermissionMatrix.tsx` | ✅ | ✅ | ✅ | ✅ | — |
| DataExport | `DataExport.tsx` | ✅ | ✅ | ✅ | ✅ | — |
| DataImport | `DataImport.tsx` | ✅ | ✅ | ✅ | ✅ | — |
| OnboardingFlow | `OnboardingFlow.tsx` | ✅ | ✅ | ✅ | ✅ | — |
| PageTemplate | `PageTemplate.tsx` | ✅ | ✅ | ✅ | ✅ | ✅ Button · Badge · StatCard · Chart |
| DashboardPage | `DashboardPage.tsx` | ✅ | ✅ | ✅ | ✅ | ✅ StatCard · Chart · Timeline |
| ListPage | `ListPage.tsx` | ✅ | ✅ | ✅ | ✅ | ✅ Input · FilterBar · Pagination |
| DetailPage | `DetailPage.tsx` | ✅ | ✅ | ✅ | ✅ | ✅ Tabs · Badge · Avatar |
| SettingsPage | `SettingsPage.tsx` | ✅ | ✅ | ✅ | ✅ | ✅ Toggle · Button |
| FormPage | `FormPage.tsx` | ✅ | ✅ | ✅ | ✅ | ✅ Button · Stepper |
| UserManagementPage | `UserManagementPage.tsx` | ✅ | ✅ | ✅ | ✅ | ✅ Table · Badge · Modal |
| AuditLogPage | `AuditLogPage.tsx` | ✅ | ✅ | ✅ | ✅ | ✅ Table · Badge · FilterBar |
| BillingPage | `BillingPage.tsx` | ✅ | ✅ | ✅ | ✅ | ✅ Progress · Badge · StatCard |
| NotificationsCenter | `NotificationsCenter.tsx` | ✅ | ✅ | ✅ | ✅ | ✅ Badge · Button |
| ReportsPage | `ReportsPage.tsx` | ✅ | ✅ | ✅ | ✅ | ✅ Badge · Button · Chart |

**Total: 79 components · 79 Storybook story files · tsc --noEmit zero errors · Storybook builds in ~85s**

---

## Figma Conversion

**Files ready:**
- `figma/figma-tokens.json` — all design tokens in W3C format (primitive + semantic, 4 color modes, 3 brand themes)
- `figma/FIGMA_AGENT_GUIDE.md` — 14-section guide for a Claude Code + Figma MCP agent to build the Figma file

**To build Figma:**
1. Open Figma Desktop App
2. Open Claude Code with Figma MCP enabled
3. Prompt: *"Read figma/FIGMA_AGENT_GUIDE.md and follow Phase 1: create the Variable Collection, import all tokens, set up Typography and Effect styles."*
4. Continue through all 8 phases in the guide

**Goal:** Figma file is a 1:1 mirror of Storybook — identical component names, variant props, token usage, and spacing.

*Last updated: April 4, 2026*
