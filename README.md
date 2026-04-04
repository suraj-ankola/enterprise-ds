# Enterprise Design System

A shared UI foundation for three enterprise products — built with React 19, TypeScript strict, Tailwind CSS v4, and Storybook 10.

## Products

| Theme | Product | Brand colour |
|-------|---------|-------------|
| `compliance` | Compliance Risk Platform | Blue |
| `itops` | IT Ops AI Copilot | Violet |
| `analytics` | Self-Serve Analytics | Cyan |

Apply a theme by setting `data-theme="compliance"` (or `itops` / `analytics`) on any ancestor element. All `--ds-brand-*` tokens update automatically.

---

## Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| UI | React 19, TypeScript strict |
| Styles | Tailwind CSS v4 (`@theme` primitives) |
| Icons | Phosphor Icons v2 |
| Storybook | v10 with `@storybook/nextjs-vite` |

---

## Token Architecture

Three-layer cascade — components only ever touch the semantic layer.

```
Primitive  (@theme in globals.css)
  ↓  raw hex values — never used in components
Semantic   (:root / .dark in globals.css)
  ↓  --ds-* tokens tied to meaning, not colour
Brand      ([data-theme] in globals.css)
     --ds-brand-* tokens — switches per product
```

### Key semantic tokens

| Group | Tokens |
|-------|--------|
| Backgrounds | `--ds-bg-base` `--ds-bg-surface` `--ds-bg-subtle` `--ds-bg-raised` |
| Text | `--ds-text-primary` `--ds-text-secondary` `--ds-text-muted` `--ds-text-on-brand` |
| Borders | `--ds-border-base` `--ds-border-strong` `--ds-border-focus` |
| Brand | `--ds-brand-100` … `--ds-brand-800` `--ds-brand-600` (primary action) |
| Status | `--ds-success-*` `--ds-warning-*` `--ds-danger-*` `--ds-info-*` |
| Motion | `--ds-duration-fast` `--ds-duration-base` `--ds-duration-slow` |
| Z-index | `--ds-z-dropdown` `--ds-z-modal` `--ds-z-toast` `--ds-z-tooltip` |

See `src/tokens/tokens.ts` for the full typed catalogue with usage notes.

---

## Component Library

### Foundations (Storybook → Foundations)

| Story | What it covers |
|-------|---------------|
| Colors | Full semantic token palette + dark mode |
| Typography | Type scale, font weights, line heights |
| Spacing | 8pt grid reference |
| Border Radius | Scale with usage rules |
| Shadows | Elevation levels |
| Icons | Phosphor icon catalogue |
| Focus Ring | WCAG-compliant focus styles |
| Grid | Layout grid & breakpoints |
| Motion | Duration + easing reference |
| States | Interactive state patterns |
| Governance | Token rules & contribution guide |

### UI Components (Storybook → UI)

**Core**

| Component | File | Notes |
|-----------|------|-------|
| Button | `Button.tsx` | 4 variants · 3 sizes · loading state |
| Input | `Input.tsx` | Label · helper · error · prefix/suffix |
| Select | `Select.tsx` | Searchable · grouped · ARIA combobox |
| Checkbox | `Checkbox.tsx` | Indeterminate · 3 sizes · peer focus |
| Radio / RadioGroup | `Radio.tsx` | Context-driven group · standalone |
| Toggle | `Toggle.tsx` | Switch role · 3 sizes · label position |
| Badge | `Badge.tsx` | 5 variants · solid/subtle · dot · counter |
| Card | `Card.tsx` | Header / Body / Footer · 4 variants · skeleton |
| Table | `Table.tsx` | Generic `<T>` · sort · row selection · skeleton |
| Modal | `Modal.tsx` | Portal · sizes · ConfirmModal helper |
| Toast | `Toast.tsx` | Provider + hook · 5 variants · auto-dismiss |
| Tabs | `Tabs.tsx` | Line / Pill / Boxed · roving tabindex |
| Tooltip | `Tooltip.tsx` | 4 sides · delay · cloneElement trigger |
| DropdownMenu | `DropdownMenu.tsx` | ARIA menu · keyboard nav · danger items |
| Sidebar / AppShell | `Sidebar.tsx` | Collapsible · controlled/uncontrolled |
| AiChat | `AiChat.tsx` | Streaming · sources · actions · empty state |

**Feedback & Status**

| Component | File | Notes |
|-----------|------|-------|
| Alert | `Alert.tsx` | Inline banner · 4 variants · dismiss · action slot |
| Progress | `Progress.tsx` | 5 variants · 4 sizes · indeterminate |
| Skeleton | `Skeleton.tsx` | text / rect / circle · `SkeletonCard` · `SkeletonTable` |

**Overlays**

| Component | File | Notes |
|-----------|------|-------|
| Drawer | `Drawer.tsx` | right / left / bottom · animated · portal |
| Popover | `Popover.tsx` | 4 sides · 3 alignments · outside-click close |
| CommandPalette | `CommandPalette.tsx` | ⌘K · groups · shortcuts · full keyboard nav |

**Navigation**

| Component | File | Notes |
|-----------|------|-------|
| Breadcrumb | `Breadcrumb.tsx` | ARIA nav · icons · custom separator |
| Pagination | `Pagination.tsx` | Smart ellipsis · range info · sm/md sizes |
| Stepper | `Stepper.tsx` | Horizontal + vertical · click-to-go-back |

**Data & Forms**

| Component | File | Notes |
|-----------|------|-------|
| Avatar / AvatarGroup | `Avatar.tsx` | Image/initials/icon fallback · status dot · overlap group |
| TagInput | `TagInput.tsx` | Controlled/uncontrolled · suggestions · max count |
| DatePicker | `DatePicker.tsx` | Full calendar · min/max · today shortcut |

---

## Getting Started

```bash
# Install dependencies
npm install

# Run Storybook (primary dev environment)
npm run storybook

# Type check
npm run type-check

# Build Storybook
npm run build-storybook
```

Storybook runs at **http://localhost:6006** by default.

---

## Rules for Contributors

1. **Tokens only** — components use `var(--ds-*)` exclusively. No hardcoded hex.
2. **DS components first** — use `<Button>`, `<Input>`, `<Badge>` etc. before rolling your own.
3. **8pt grid** — all spacing in multiples of 4px (half-step) or 8px (full step).
4. **ARIA** — follow APG patterns. Every interactive element needs focus styles, roles, and labels.
5. **Controlled + uncontrolled** — every form component supports both patterns.
6. **Type safe** — `tsc --noEmit` must pass with zero errors before any commit.
7. **Dark mode** — test every new token/component in `.dark` class context.
8. **Three-theme test** — verify `data-theme` variants (compliance / itops / analytics) all look correct.

See `JOURNEY.md` for the full build log and architectural decisions.
