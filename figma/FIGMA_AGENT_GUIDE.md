# Enterprise Design System — Figma Agent Guide

> **Purpose:** Complete reference for a Claude Code agent using the Figma Desktop App (MCP or REST API) to build Figma components that are pixel-identical to the Storybook implementation.  
> **Storybook source:** `src/components/ui/` and `src/components/foundations/`  
> **Token source:** `src/app/globals.css` and `figma/figma-tokens.json`  
> **Last updated:** 2026-04-21 — added Sessions 6–9 components (navigation, loaders, calendar, marketing suite, AI/enterprise, brand guidelines)

---

## 1. Setup Checklist

Before starting, complete these steps in the Figma desktop app:

1. **Create a new file** named `Enterprise DS — Components`
2. **Import Variables** from `figma/figma-tokens.json` using Tokens Studio plugin or Variables REST API
3. **Install fonts**: Inter (all weights 400–700) + JetBrains Mono
4. **Create 3 pages** in the file:
   - `🎨 Foundations` — colors, type, spacing, radius, shadows, icons
   - `🧩 Components` — all UI components
   - `📐 Page Templates` — assembled page layouts
5. **Set up Variable Modes** (see Section 3)

---

## 2. Variable Structure in Figma

Create a Variable Collection named **`DS Tokens`** with these groups:

### Color Variables
Create with **4 modes**: `Light`, `Dark`, `Light/IT Ops`, `Light/Analytics`

| Variable Name | Light | Dark | IT Ops | Analytics |
|---|---|---|---|---|
| `bg/base` | `#f8fafc` | `#0f172a` | same as Light | same as Light |
| `bg/surface` | `#ffffff` | `#1e293b` | same | same |
| `bg/raised` | `#ffffff` | `#334155` | same | same |
| `bg/subtle` | `#f1f5f9` | `#1e293b` | same | same |
| `text/primary` | `#0f172a` | `#f1f5f9` | same | same |
| `text/secondary` | `#475569` | `#94a3b8` | same | same |
| `text/muted` | `#94a3b8` | `#64748b` | same | same |
| `border/base` | `#e2e8f0` | `#334155` | same | same |
| `border/focus` | `#3b82f6` | `#60a5fa` | `#8b5cf6` | `#06b6d4` |
| `brand/600` | `#2563eb` | `#3b82f6` | `#7c3aed` | `#0891b2` |
| `brand/500` | `#3b82f6` | `#60a5fa` | `#8b5cf6` | `#06b6d4` |
| `brand/100` | `#dbeafe` | `#1e293b` | `#ede9fe` | `#cffafe` |
| `brand/50` | `#eff6ff` | `#1e293b` | `#f5f3ff` | `#ecfeff` |
| `success/bg` | `#dcfce7` | `#052e16` | same | same |
| `success/text` | `#15803d` | `#4ade80` | same | same |
| `success/border` | `#86efac` | `#166534` | same | same |
| `success/icon` | `#16a34a` | `#4ade80` | same | same |
| `warning/bg` | `#fef3c7` | `#451a03` | same | same |
| `warning/text` | `#b45309` | `#fbbf24` | same | same |
| `warning/border` | `#fcd34d` | `#92400e` | same | same |
| `danger/bg` | `#fee2e2` | `#450a0a` | same | same |
| `danger/text` | `#dc2626` | `#f87171` | same | same |
| `danger/border` | `#fca5a5` | `#991b1b` | same | same |
| `info/bg` | `#e0f2fe` | `#082f49` | same | same |
| `info/text` | `#0284c7` | `#38bdf8` | same | same |
| `info/border` | `#7dd3fc` | `#075985` | same | same |

### Spacing Variables (Number type)
`space/0.5`=2, `space/1`=4, `space/1.5`=6, `space/2`=8, `space/2.5`=10, `space/3`=12, `space/4`=16, `space/5`=20, `space/6`=24, `space/8`=32, `space/10`=40, `space/12`=48

### Border Radius Variables (Number type)
`radius/sm`=4, `radius/md`=6, `radius/lg`=8, `radius/xl`=12, `radius/2xl`=16, `radius/full`=9999

---

## 3. Typography Styles

Create these **Text Styles** (all use Inter):

| Style Name | Size | Weight | Line Height | Letter Spacing |
|---|---|---|---|---|
| `display/2xl` | 24px | 700 | 1.25 | -0.025em |
| `display/xl` | 20px | 700 | 1.25 | -0.025em |
| `display/lg` | 18px | 600 | 1.25 | -0.025em |
| `heading/sm` | 16px | 600 | 1.375 | 0 |
| `heading/xs` | 14px | 600 | 1.375 | 0 |
| `body/lg` | 16px | 400 | 1.5 | 0 |
| `body/base` | 14px | 400 | 1.5 | 0 |
| `body/sm` | 12px | 400 | 1.5 | 0 |
| `body/xs` | 11px | 400 | 1.5 | 0 |
| `label/lg` | 14px | 500 | 1.25 | 0 |
| `label/sm` | 12px | 500 | 1.25 | 0 |
| `label/xs` | 10px | 600 | 1 | 0.05em |
| `caption` | 11px | 400 | 1.375 | 0 |
| `overline` | 10px | 600 | 1 | 0.1em |
| `code` | 13px | 400 | 1.5 | 0 (JetBrains Mono) |

---

## 4. Effect Styles (Shadows)

| Style Name | Value |
|---|---|
| `shadow/xs` | 0 1px 2px rgba(0,0,0,0.05) |
| `shadow/sm` | 0 1px 3px rgba(0,0,0,0.1), 0 1px 2px -1px rgba(0,0,0,0.1) |
| `shadow/md` | 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1) |
| `shadow/lg` | 0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1) |
| `shadow/xl` | 0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1) |

---

## 5. Component Build Order

> Legend: ✅ Figma done · 🟡 Code done, Figma pending · ⬜ Not yet built

Build components in this order (each depends on the previous):

### Phase 1 — Atoms
1. ✅ **Badge** — variants: neutral/brand/success/warning/danger/info, sizes: sm/md
2. ⬜ **Icon** — 16×16 frame, Phosphor icons (Regular + Fill weights)
3. 🟡 **Spinner** — animated circle, sizes: sm(16)/md(20)/lg(24)
4. 🟡 **Avatar** — sizes: xs(24)/sm(32)/md(40)/lg(48)/xl(64), shapes: circle/square, status dot
5. 🟡 **Chip** — label + optional remove icon, variants: neutral/brand/success/warning/danger
6. 🟡 **Divider** — horizontal/vertical, optional label slot

### Phase 2 — Form Controls
7. 🟡 **Input** — height: 36px, sizes: sm/md/lg, states: default/focus/error/success/disabled
8. 🟡 **InputGroup** — prefix/suffix text addons, icon slots, attached AddonButton (flush border join)
9. 🟡 **SearchBar** — search icon, spinner loading state, clear button on Escape, shortcut hint badge
10. 🟡 **Select** — same sizing as Input, with caret icon
11. 🟡 **Textarea** — min-height: 80px, resize handle
12. 🟡 **Checkbox** — 14×14, states: unchecked/checked/indeterminate/disabled
13. 🟡 **CheckboxGroup** — fieldset/legend, selectAll + indeterminate state, vertical/horizontal layout
14. 🟡 **Radio** — 14×14, states: unselected/selected/disabled
15. 🟡 **RadioGroup** — data-driven options array, fieldset/legend, vertical/horizontal
16. 🟡 **Toggle** — 36×20 track, 16×16 thumb, states: off/on/disabled, sizes: sm/md
17. 🟡 **Slider** — track 4px, thumb 16×16
18. 🟡 **Quantifier** — number input + +/- buttons
19. 🟡 **DatePicker** — trigger button + calendar popover (single date)
20. 🟡 **DateRangePicker** — trigger button + calendar popover (start + end)
21. 🟡 **TagInput** — multi-value input with removable tag chips
22. 🟡 **FileUploader** — drag-and-drop zone, multi-file list, progress per file
23. 🟡 **RichTextEditor** — toolbar (bold/italic/lists/links) + content area

### Phase 3 — Buttons
24. ✅ **Button** — variants: primary/secondary/ghost/danger, sizes: sm/md/lg, states: default/hover/focus/active/disabled/loading (72 Figma variants)
25. 🟡 **IconButton** — square, same variants + sizes as Button

### Phase 4 — Feedback
26. 🟡 **Alert** — variants: info/success/warning/danger, with/without icon, dismissible
27. 🟡 **Toast / UndoToast** — same variants, with undo action slot
28. 🟡 **Progress** — linear bar, variants: brand/success/warning/danger, sizes: xs/sm/md
29. 🟡 **CircularProgress** — ring variant, percentage label
30. 🟡 **Skeleton** — variants: text/rect/circle, configurable width/height
31. 🟡 **InlineLoader** — Spinner + label, role=status, sizes: xs/sm/md
32. 🟡 **TopLoadingBar** — fixed top bar, deterministic (0–100%) + indeterminate (CSS animation), auto-fadeout
33. 🟡 **PageLoader** — full-page overlay OR contained (fills parent), role=status
34. 🟡 **SteppedProgressBar** — N segments, active/complete/empty states, labels[], counter badge

### Phase 5 — Overlay
35. 🟡 **Tooltip** — 4 positions, max-width: 240px
36. 🟡 **Popover** — 8 positions, arrow pointer, shadow/xl
37. 🟡 **Modal** — sizes: sm(400)/md(560)/lg(720)/xl(900)/full, header/body/footer slots
38. 🟡 **Drawer** — sides: left/right/top/bottom, sizes: sm/md/lg/xl
39. 🟡 **DropdownMenu** — trigger + item list with groups, icons, keyboard navigation
40. 🟡 **InfoSpotlight** — coach-mark bubble, 4 placements (top/bottom/left/right), multi-step tour, optional overlay backdrop

### Phase 6 — Navigation
41. 🟡 **Tabs** — variants: line/pill/boxed, sizes: sm/md, full-width option
42. 🟡 **Breadcrumb** — with/without icons, separator: slash/chevron, max items before collapse
43. 🟡 **Pagination** — prev/next + page numbers, sizes: sm/md
44. 🟡 **Sidebar** — collapsed(48px)/expanded(224px), with groups + active state
45. 🟡 **WorkspaceSwitcher** — collapsed/expanded modes, dropdown
46. 🟡 **AppBar** — page title, subtitle, breadcrumb slot, actions slot, back button (link or button), sticky
47. 🟡 **Navbar** — logo + appName, navItems[], search slot, actions slot, sticky, scroll-shadow
48. 🟡 **NavIcon** — icon-only nav item for collapsed sidebar, active state, disabled state
49. 🟡 **NavLinkIcon** — icon + label nav item, optional badge count, active/disabled
50. 🟡 **HeaderIcon** — icon button for app header, hover/active/disabled
51. 🟡 **HeaderIcon Notification** — bell icon + badge (count 1–99, 99+, dot-only variant)

### Phase 7 — Data Display
52. 🟡 **Table** — header row, data rows, sortable column, hover state, sticky header option
53. 🟡 **DataGrid** — column resize handles, row selection checkbox, sort, filter, bulk actions
54. 🟡 **StatCard** — value + label + trend delta (up/down/neutral), loading skeleton state
55. 🟡 **Card** — variants: default/bordered/elevated/ghost, padding options, header/body/footer slots
56. 🟡 **EmptyState** — sizes: sm/md/lg, with/without icon, with/without action button
57. 🟡 **Chart** — ECharts wrapper: line, bar, donut, area variants
58. 🟡 **Timeline** — vertical/horizontal layouts, status dots, completed/active/future states
59. 🟡 **Tree** — collapsible nodes, checkbox multi-select, icon slots

### Phase 8 — Complex / Utility
60. 🟡 **FilterBar** — search + filter chips + add-filter dropdown
61. 🟡 **CommandPalette** — full-screen overlay, search input + grouped results, keyboard navigation
62. 🟡 **Accordion** — variants: default/flush/card, single/multi expand
63. 🟡 **KanbanBoard** — drag-and-drop columns, WIP limits, priority/tags/assignee/due date per card
64. 🟡 **Calendar** — inline embeddable, modes: single/range, hover preview, minDate/maxDate, sizes: sm/md
65. 🟡 **PageSlider** — full-width one-page-at-a-time, CSS translateX, swipe gesture, dot indicators
66. 🟡 **Content** — layout width wrapper, max-width variants, polymorphic as prop
67. 🟡 **SegmentedControl** — tab-like toggle group
68. 🟡 **Stepper** — horizontal/vertical step flow, completed/active/error states
69. 🟡 **Collapsible** — animated expand/collapse wrapper
70. 🟡 **InlineEdit** — click-to-edit text field
71. 🟡 **Carousel** — image/card carousel with prev/next + dots
72. 🟡 **CodeBlock** — syntax-highlighted code with copy button
73. 🟡 **VideoPlayer** — controls, poster image, captions

### Phase 9 — AI / Enterprise Patterns
74. 🟡 **AiChat** — conversation thread, message bubbles, streaming state, typing indicator
75. 🟡 **AIComponents** — AI status indicators: confidence score, processing state, source citations
76. 🟡 **ApprovalFlow** — multi-step approval with status per approver
77. 🟡 **TaskPanel** — task list with status, assignee, priority, due date
78. 🟡 **PermissionMatrix** — role × permission grid with toggles
79. 🟡 **QueryBuilder** — filter rule builder (field + operator + value rows)
80. 🟡 **GuidedTour** — multi-step overlay walkthrough (wraps InfoSpotlight)
81. 🟡 **BulkActionsBar** — sticky bottom bar, appears on row selection
82. 🟡 **ContextualToolbar** — floating toolbar for selected text/elements
83. 🟡 **DataExport** — export format selector + progress
84. 🟡 **DataImport** — CSV/Excel upload + column mapping
85. 🟡 **NotificationsCenter** — notification feed, read/unread, grouped by date
86. 🟡 **ColumnCustomizer** — show/hide/reorder table columns panel

### Phase 10 — Marketing / Landing Page (Storybook only, no Figma component needed)
87. 🟡 **MarketingNav** — sticky top nav, scroll-shadow, mobile hamburger drawer
88. 🟡 **HeroSection** — split + centered layouts, headlineAccent keyword highlight
89. 🟡 **MarketingSections** — LogoBar, FeatureGrid, SplitFeature, TestimonialGrid, CtaBanner
90. 🟡 **MarketingFooter** — brand column + link columns + legal bar
91. ✅ **LandingPage** — assembled story (all marketing components combined)

---

## 6. Component Spec — Key Measurements

### Button (primary example — all others follow same pattern)
```
Height:     sm=32px, md=36px, lg=40px
Padding:    sm=px-3, md=px-4, lg=px-5
Gap:        8px (icon + label)
Radius:     8px (rounded-lg)
Font:       14px/500 (sm,md), 14px/600 (lg)
Border:     1px (secondary/ghost variants)
Focus ring: 2px offset, 2px width, brand/500 color
```

### Input
```
Height:     sm=32px, md=36px, lg=40px
Padding:    px-3 py-2
Radius:     8px
Border:     1px border/base → brand/500 on focus
Font:       14px/400 body/base
Icon slot:  16px, 12px from edge
```

### Badge
```
Height:     sm=18px, md=20px
Padding:    sm=px-1.5, md=px-2 py-0.5
Radius:     9999px (full)
Font:       10px/600 (sm), 11px/600 (md), uppercase tracking-wide for overline style
```

### Card
```
Radius:     12px (rounded-xl)
Border:     1px border/base
Background: bg/surface
Padding:    default=24px, sm=16px, lg=32px
Shadow:     default=none, elevated=shadow/sm
```

### Modal
```
Backdrop:   rgba(15,23,42,0.5) blur(4px)
Radius:     16px (rounded-2xl)
Shadow:     shadow/xl
Max-width:  sm=400, md=560, lg=720, xl=900
Header:     24px padding, 60px min-height, border-bottom
Footer:     16px padding, 56px min-height, border-top, flex justify-end gap-2
```

---

## 7. Page Template Specs

### DashboardPage
```
Layout:         max-width 1280px, centered, px-6
Header:         bg/surface, border-bottom, py-5
Stats row:      4-col grid, gap-4
Main+side:      grid 1fr 320px, gap-6
Side panel:     w-320px, shrink-0
```

### ListPage
```
Header:         bg/surface, border-bottom, py-5
Toolbar:        bg/surface, border-bottom, py-3, flex items-center gap-3
Search:         max-w-xs, h-32px
Table wrapper:  bg/surface, border, rounded-xl, overflow-hidden
```

### DetailPage
```
Header:         bg/surface, border-bottom
Back nav:       text-xs, pt-4
Title row:      py-5, flex items-start justify-between
Tab nav:        border-b, active=brand/600 2px underline
Body:           flex gap-6, main flex-1, sidebar w-288px
```

---

## 8. Storybook ↔ Figma Parity Checklist

For **each component**, verify these match between Storybook and Figma:

- [ ] All prop variants exist as Figma component variants
- [ ] Colors use the Variable collection (not hardcoded)
- [ ] Font sizes + weights match Typography styles
- [ ] Spacing matches 8pt grid
- [ ] Border radius matches radius tokens
- [ ] Focus state is shown (ring variant)
- [ ] Dark mode variant exists (toggle Mode in Figma)
- [ ] Brand theme variants exist (compliance/itops/analytics)
- [ ] Interactive states: default, hover, focus, disabled, loading, error

---

## 9. Naming Conventions

Use this naming pattern for all Figma components:

```
Component/Variant=primary, Size=md, State=default
Component/Variant=secondary, Size=sm, State=hover
Component/Variant=danger, State=disabled

Page Template/DashboardPage/With sidebar
Page Template/DetailPage/Loading
```

Layer naming within components:
```
background   → bg
label        → label
icon-left    → icon-leading
icon-right   → icon-trailing
border       → border (separate stroke layer or border effect)
focus-ring   → focus-ring (visibility: hidden by default, shown in focus variant)
```

---

## 10. Figma Plugin Workflow (MCP / Desktop App)

When using the Figma MCP plugin or REST API from a Claude Code agent:

```javascript
// 1. Get the file
GET /v1/files/:file_key

// 2. Create a component set (for variants)
POST /v1/files/:file_key/nodes
{
  "nodes": [{
    "type": "COMPONENT_SET",
    "name": "Button",
    "children": [
      { "type": "COMPONENT", "name": "Variant=primary, Size=md, State=default" },
      { "type": "COMPONENT", "name": "Variant=primary, Size=md, State=hover" },
      // ...
    ]
  }]
}

// 3. Apply variables (not hardcoded values)
PATCH /v1/files/:file_key/nodes/:node_id/variables
{
  "fills": [{ "variableId": "ds-tokens/brand/600" }]
}
```

**Key principle:** Never hardcode colors, font sizes, or spacing. Always bind to DS Token Variables.

---

## 11. Section Layout in Figma File

### Page: 🎨 Foundations
```
Row 1: Color swatches — Semantic tokens (light + dark side by side)
Row 2: Brand themes — compliance / itops / analytics swatches
Row 3: Typography scale — all text styles in a grid
Row 4: Spacing — 8pt grid visualization
Row 5: Border radius — radius tokens shown on squares
Row 6: Shadows — shadow/xs through shadow/xl
Row 7: Icons — Phosphor icon grid (Regular + Fill, 16px + 20px + 24px)
Row 8: Motion — easing curves + duration tokens
```

### Page: 🧩 Components
Organize in rows matching the Phase build order above.
Each row: component name header + all variant/state combinations.

### Page: 📐 Page Templates
```
── App pages (enterprise-ds components) ──
Row 1:  DashboardPage (light) | DashboardPage (dark)
Row 2:  ListPage (light) | ListPage (dark)
Row 3:  DetailPage (tabs overview) | DetailPage (tabs risks)
Row 4:  FormPage | SettingsPage
Row 5:  UserManagementPage | AuditLogPage
Row 6:  BillingPage | ReportsPage
Row 7:  NotificationsCenter | OnboardingFlow (each step)

── Marketing / Landing page ──
Row 8:  Full LandingPage — Comply AI (Blue theme)
Row 9:  Full LandingPage — Ops AI (Violet theme)
Row 10: Full LandingPage — Clarity AI (Cyan theme)
Row 11: MarketingNav states (default / scrolled / mobile open)
Row 12: HeroSection — split layout | centered layout
Row 13: FeatureGrid 3-col | SplitFeature left | SplitFeature right (brand bg)
Row 14: TestimonialGrid | CtaBanner variants
Row 15: MarketingFooter
```

### Page: 🎨 Foundations (updated)
```
Row 1:  Color swatches — semantic tokens (light + dark side by side)
Row 2:  Brand themes — Comply AI (Blue) | Ops AI (Violet) | Clarity AI (Cyan)
Row 3:  Brand Guidelines — product identities, palettes, voice & tone
Row 4:  Typography scale — all text styles in a grid
Row 5:  Spacing — 8pt grid visualization
Row 6:  Border radius — radius tokens shown on squares
Row 7:  Shadows — shadow/xs through shadow/xl
Row 8:  Icons — Phosphor icon grid (Regular + Fill, 16px + 20px + 24px)
Row 9:  Motion — easing curves + duration tokens
Row 10: Focus Ring — pattern + brand-aware variants
Row 11: Grid System — responsive breakpoints visualization
```

---

## 12. Quick Reference — DS Token → Figma Variable

| CSS Token | Figma Variable | Usage |
|---|---|---|
| `var(--ds-bg-base)` | `bg/base` | Page background |
| `var(--ds-bg-surface)` | `bg/surface` | Cards, panels |
| `var(--ds-bg-raised)` | `bg/raised` | Dropdowns, modals |
| `var(--ds-bg-subtle)` | `bg/subtle` | Hover states, wells |
| `var(--ds-text-primary)` | `text/primary` | Headings, body |
| `var(--ds-text-secondary)` | `text/secondary` | Supporting text |
| `var(--ds-text-muted)` | `text/muted` | Placeholders, hints |
| `var(--ds-border-base)` | `border/base` | Default borders |
| `var(--ds-brand-600)` | `brand/600` | Primary actions |
| `var(--ds-brand-500)` | `brand/500` | Focus rings |
| `var(--ds-brand-50)` | `brand/50` | Brand tint bg |
| `var(--ds-success-bg)` | `success/bg` | Success fill |
| `var(--ds-success-text)` | `success/text` | Success text |
| `var(--ds-warning-bg)` | `warning/bg` | Warning fill |
| `var(--ds-warning-text)` | `warning/text` | Warning text |
| `var(--ds-danger-bg)` | `danger/bg` | Danger fill |
| `var(--ds-danger-text)` | `danger/text` | Danger text |
| `var(--ds-info-bg)` | `info/bg` | Info fill |
| `var(--ds-info-text)` | `info/text` | Info text |

---

## 13. Brand Theme Application

The DS supports 3 product themes that change the `brand/*` variable values:

| Theme | Product | Primary Color | Mode in Figma |
|---|---|---|---|
| `compliance` | Compliance Risk Platform | Blue `#2563eb` | `Light` (default) |
| `itops` | IT Ops AI Copilot | Violet `#7c3aed` | `Light/IT Ops` |
| `analytics` | Self-Serve Analytics | Cyan `#0891b2` | `Light/Analytics` |

In Figma, create a **Variable Mode** per theme so components automatically update when the mode is switched.

---

## 14. Accessibility Requirements

All components must pass WCAG 2.1 AA:

| Requirement | Value |
|---|---|
| Text contrast (normal) | ≥ 4.5:1 |
| Text contrast (large, 18px+) | ≥ 3:1 |
| UI component contrast | ≥ 3:1 |
| Focus indicator | 2px, 2px offset, brand/500 |
| Touch target | ≥ 44×44px |
| Status indication | Never color alone — always icon + color |

Status solid-fill pairs (all WCAG AA verified):
- Success: `#15803d` bg / `#ffffff` text (6.1:1 ✓)
- Warning: `#92400e` bg / `#ffffff` text (7.6:1 ✓)  
- Danger: `#b91c1c` bg / `#ffffff` text (5.9:1 ✓)
- Info: `#0369a1` bg / `#ffffff` text (5.9:1 ✓)

---

## 15. Figma Pending — Suraj's Build Queue

All components below have working Storybook code. Open the Storybook story first, then build the matching Figma component page using the 10-frame documentation template (Section 11 of FIGMA_JOURNEY.md).

### Priority 1 — Core atoms + form controls (build these first, others depend on them)
- [ ] Spinner
- [ ] Avatar
- [ ] Chip
- [ ] Input
- [ ] Select
- [ ] Checkbox + CheckboxGroup
- [ ] Radio + RadioGroup
- [ ] Toggle
- [ ] IconButton

### Priority 2 — Feedback + Overlay
- [ ] Alert
- [ ] Toast / UndoToast
- [ ] Progress + CircularProgress
- [ ] Skeleton
- [ ] InlineLoader
- [ ] TopLoadingBar
- [ ] PageLoader
- [ ] SteppedProgressBar
- [ ] Tooltip
- [ ] Popover
- [ ] Modal
- [ ] Drawer
- [ ] InfoSpotlight

### Priority 3 — Navigation
- [ ] Tabs
- [ ] Breadcrumb
- [ ] Pagination
- [ ] Sidebar
- [ ] AppBar
- [ ] Navbar
- [ ] NavIcon + NavLinkIcon
- [ ] HeaderIcon + HeaderIcon Notification

### Priority 4 — Data display
- [ ] StatCard
- [ ] Card
- [ ] Table
- [ ] DataGrid
- [ ] EmptyState
- [ ] Chart
- [ ] Timeline

### Priority 5 — Complex + AI
- [ ] KanbanBoard
- [ ] Calendar
- [ ] FilterBar
- [ ] CommandPalette
- [ ] AiChat
- [ ] AIComponents (confidence score, source citations)
- [ ] ApprovalFlow
- [ ] TaskPanel
- [ ] PermissionMatrix

### How to start each component in Figma
1. Open Storybook → navigate to the component
2. Review all story variants (Default, sizes, states, controlled)
3. In Figma, create a new page named `🔘 ComponentName`
4. Build the 10-frame documentation template (see FIGMA_JOURNEY.md Section — Agent Rules)
5. Use `data-theme="compliance"` as default, then test IT Ops + Analytics modes
6. After building, update `FIGMA_JOURNEY.md` checklist: change 🟡 to ✅
