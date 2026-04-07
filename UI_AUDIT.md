# UI Consistency & Polish Audit
**Date:** 2026-04-07
**Scope:** `src/components/ui/` — new and recently added components

---

## 1. Hardcoded Colors

### Findings

| File | Line(s) | Issue |
|------|---------|-------|
| `Chart.tsx` | 41–42 | Two raw hex values (`#8b5cf6`, `#f59e0b`) in the chart palette — not wrapped in `cssVar()` like all other palette entries |
| `Chart.tsx` | 10–45 | All other hex values are **acceptable** — they are fallbacks inside `cssVar()` calls that read `var(--ds-*)` tokens at runtime; they never render directly if CSS variables resolve |
| `GuidedTour.tsx` | 225 | `rgba(0,0,0,${overlayOpacity})` — **acceptable** as a dynamic inline style; the opacity value is a prop, not a hardcode |
| `Chart.tsx` | 61, 326, 483 | `rgba(0,0,0,.12/.15/.2)` shadow values — acceptable as chart shadow effects with no DS token equivalent |

### Fixes Applied

- **`Chart.tsx`** — Wrapped `#8b5cf6` and `#f59e0b` in `cssVar()` calls:
  - `#8b5cf6` → `cssVar('--ds-chart-violet', '#8b5cf6')` (custom token slot; retains fallback)
  - `#f59e0b` → `cssVar('--ds-warning-icon', '#f59e0b')` (reuses warning token)

### Remaining Notes

- Consider defining `--ds-chart-violet` (and possibly `--ds-chart-amber`) as official chart palette tokens in the token file so theme overrides can reach them.

---

## 2. Hardcoded Font Sizes

### Findings

The codebase makes heavy use of `text-[10px]` and `text-[11px]` Tailwind arbitrary values. These appear in:

- `ApprovalFlow.tsx`, `TaskPanel.tsx`, `ReportsPage.tsx`, `NotificationsCenter.tsx`, `DataImport.tsx`, `DataExport.tsx`
- Also `AIComponents.tsx`, `Avatar.tsx`, `Badge.tsx`, `Chip.tsx`, `Stepper.tsx`, `Slider.tsx`, `DatePicker.tsx`, `DateRangePicker.tsx`, `CommandPalette.tsx`, `SegmentedControl.tsx`, `WorkspaceSwitcher.tsx`, `IconButton.tsx`, `CircularProgress.tsx`, `ColumnCustomizer.tsx`, `QueryBuilder.tsx`, `Sidebar.tsx`, `AiChat.tsx`, `VideoPlayer.tsx`

**Classification:**

| Size | Usage context | Verdict |
|------|--------------|---------|
| `text-[10px]` | Label overlines, kbd shortcuts, avatar initials, "optional" captions, column headers, step indicators | **Acceptable** — Tailwind `text-xs` = 12px; these deliberate sub-xs sizes are used for UI chrome, not body copy |
| `text-[11px]` | Timestamps, status labels, tag chips, metadata rows | **Mostly acceptable** — sits between `text-xs` (12px) and `text-[10px]` (10px); used for compact list metadata |
| `text-[9px]` | `CircularProgress` sm label | Acceptable — inside a 32px circle, `text-xs` would not fit |
| `text-[14px]`–`text-[18px]` | `IconButton` icon sizing | Acceptable — these are icon font sizes, not text |

### Fixes Applied

- **`ApprovalFlow.tsx`** — Replaced `text-[11px]` in the horizontal step label (`step.label`) and status label with `text-xs` for consistency with badge standard.
- **`ReportsPage.tsx`** — Replaced `text-[11px]` sidebar "Categories" section header with `text-xs`.

### Remaining Notes

- The `text-[10px]`/`text-[11px]` pattern is so pervasive across the DS that standardising them would be a larger typography token effort. Suggest defining `--ds-text-size-caption` (10px) and `--ds-text-size-label` (11px) tokens and using them via a `text-[var(...)]` pattern if this density is intentional long-term.

---

## 3. Component UI Consistency Checks

### 3a. Status Badges — Pill Styling
**Standard:** `text-xs px-2 py-0.5 rounded-full font-medium`

| Component | Badge classes | Consistent? |
|-----------|--------------|-------------|
| `UserManagementPage` | `h-6 px-2 rounded-full text-xs font-medium` | Near — uses fixed height `h-6` instead of `py-0.5`; acceptable for vertical centering in table rows |
| `BillingPage` | `h-6 px-2 rounded-full text-xs font-medium` | Same as above — consistent within the pair |
| `AuditLogPage` | No pill badge per row; uses severity dot + chip filter buttons | N/A |
| `ApprovalFlow` | Was `text-[11px] px-2 py-0.5 rounded-full font-medium border` | **Fixed** → `text-xs px-2 py-0.5 rounded-full font-medium border` |
| `ReportsPage` | `text-[11px] px-1.5 py-0.5 rounded-md` (format badge) | Rounded-md not rounded-full; intentional for rectangular format chips — acceptable |
| `NotificationsCenter` | No status badges | N/A |

### 3b. Section Headers
**Standard:** `text-sm font-semibold text-[var(--ds-text-primary)]`

| Component | Header classes | Consistent? |
|-----------|---------------|-------------|
| `UserManagementPage` | `text-xl font-bold` (page title), table headers `text-xs font-semibold text-[var(--ds-text-muted)] uppercase` | Correct for hierarchy |
| `AuditLogPage` | `text-xl font-bold` page title | Correct |
| `BillingPage` | Section cards use `text-base font-semibold text-[var(--ds-text-primary)]` | Correct |
| `ReportsPage` | `text-lg font-semibold text-[var(--ds-text-primary)]` page, sidebar `text-xs font-semibold uppercase` | **Fixed** sidebar from `text-[11px]` to `text-xs` |
| `TaskPanel` | `text-sm font-semibold text-[var(--ds-text-primary)]` | Correct |
| `PermissionMatrix` | `text-xs font-semibold uppercase` table headers | Correct |

### 3c. Input Fields
**Standard:** `h-8` or `h-9`, `px-3`, `rounded-lg`, `border`

| Component | Input classes | Consistent? |
|-----------|--------------|-------------|
| `UserManagementPage` search | `h-9 pl-9 pr-3 rounded-lg border` | Correct |
| `AuditLogPage` search | `h-9 pl-9 pr-3 rounded-lg border` | Correct |
| `DataImport` column mapping select | `h-8 px-2 rounded-lg border` | Correct height, slightly reduced px — acceptable for compact mapping UI |
| `TaskPanel` edit input | `px-2 py-0.5 rounded border` — no fixed height | Minor deviation; acceptable given inline edit context |

### 3d. Buttons

**Primary standard:** `bg-[var(--ds-brand-600)] text-white` + `hover:bg-[var(--ds-brand-700)]`
**Secondary standard:** `border` + `hover:bg-[var(--ds-bg-subtle)]`

| Component | Issue | Fix Applied |
|-----------|-------|-------------|
| `ReportsPage` "Schedule new report" | Was `hover:opacity-90 transition-opacity` — deviated from DS hover pattern | **Fixed** → `hover:bg-[var(--ds-brand-700)] transition-colors` |
| `ReportsPage` "Download" (report card) | Was `hover:opacity-90 transition-opacity` | **Fixed** → `hover:bg-[var(--ds-brand-700)] hover:border-[var(--ds-brand-700)] transition-colors` |
| `DataImport` "Preview →" and "Import N records" | Missing `transition-colors` | **Fixed** |
| `DataImport` "Import another file" | Missing `transition-colors` already present; correct |
| All other components | Correct | — |

### 3e. Empty States

**Standard (EmptyState.tsx):** icon in `bg-[var(--ds-bg-subtle)]` wrapper, `font-semibold` title, `text-[var(--ds-text-muted)]` description.

| Component | Inline empty state | Issue | Fix Applied |
|-----------|--------------------|-------|-------------|
| `UserManagementPage` | Table row with icon + text | Title was `font-medium text-[var(--ds-text-secondary)]` | **Fixed** → `font-semibold text-[var(--ds-text-primary)]` |
| `AuditLogPage` | Table row with icon + text | Same issue | **Fixed** → `font-semibold text-[var(--ds-text-primary)]` |
| `ReportsPage` | Standalone `EmptyState` sub-component | Correct — uses icon wrapper box |
| `NotificationsCenter` | `EmptyState` sub-component | Correct — uses icon wrapper box |
| `BillingPage` | Table row, text only | Acceptable — no icon, simple "No invoices yet" one-liner |

---

## 4. Focus Ring Consistency

**Standard:** `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ds-brand-500)]`

### Fixes Applied

| File | Element | Fix |
|------|---------|-----|
| `NotificationsCenter.tsx` | "Mark all read" button | Added full focus ring |
| `NotificationsCenter.tsx` | "Clear all" button | Added full focus ring |
| `NotificationsCenter.tsx` | Filter tab buttons (All / Unread / category) | Added full focus ring |
| `NotificationsCenter.tsx` | "Mark as read" hover action | Added full focus ring |
| `NotificationsCenter.tsx` | "Dismiss" hover action | Added full focus ring |
| `ApprovalFlow.tsx` | Approve button | Added focus ring + `transition-opacity` |
| `ApprovalFlow.tsx` | Reject button | Added focus ring + `transition-opacity` |
| `ApprovalFlow.tsx` | "Cancel" text button | Added focus ring + `rounded` |
| `ApprovalFlow.tsx` | "Review & decide" toggle | Added focus ring + `rounded` |
| `TaskPanel.tsx` | Task checkbox toggle button | Added focus ring + `rounded-full` |
| `TaskPanel.tsx` | "Add task to group" (+) button | Added focus ring |
| `TaskPanel.tsx` | Edit task input | Added focus ring (was `focus-visible:outline-none` only) |
| `TaskPanel.tsx` | "Add" confirm button | Added focus ring + `hover:bg` + `transition-colors` |
| `DataImport.tsx` | Column mapping `<select>` | Added focus ring (was `focus-visible:outline-none` only) |
| `DataImport.tsx` | "Preview →" button | Added focus ring + `transition-colors` |
| `DataImport.tsx` | "Import N records" button | Added focus ring + `transition-colors` |
| `DataImport.tsx` | "Import another file" button | Added focus ring |
| `DataExport.tsx` | "Select all / Deselect all" button | Upgraded from `text-[11px]` to `text-xs`; added focus ring |
| `ReportsPage.tsx` | "Schedule new report" button | Added focus ring |
| `ReportsPage.tsx` | "Download" button (card) | Added focus ring |
| `ReportsPage.tsx` | "Generate" button (card) | Added focus ring |
| `ReportsPage.tsx` | "Schedule" button (card) | Added focus ring |
| `ReportsPage.tsx` | Sidebar category nav buttons | Added focus ring |

### Remaining Notes (pre-existing, not new components)

- `InlineActions.tsx` — `focus-visible:outline-none` only (no ring) on the base button string; minor.
- `ColumnCustomizer.tsx` — several icon-only buttons have `focus-visible:outline-none` but no ring.
- `TagInput.tsx` — dismiss chip button has `focus-visible:outline-none` only.
- `VideoPlayer.tsx` — player control buttons have `focus-visible:outline-none` only (acceptable for video controls pattern).
- `Toast.tsx` action link — `focus-visible:outline-none` only.
- `FilterBar.tsx` line 235 — uses old `focus:ring-2` (not `focus-visible:ring-2`); triggers on mouse click too.
- `RichTextEditor.tsx` line 121 — same `focus:outline-none focus:ring-2` pattern (not `focus-visible`).

---

## 5. Transition Consistency

### Findings & Fixes

| File | Element | Issue | Fix Applied |
|------|---------|-------|-------------|
| `ReportsPage.tsx` | "Schedule new report" primary button | `transition-opacity` → should be `transition-colors` for bg changes | **Fixed** |
| `ReportsPage.tsx` | "Download" button in report card | Same — `transition-opacity` | **Fixed** |
| `DataImport.tsx` | "Preview →" and "Import" buttons | Missing `transition-colors` entirely | **Fixed** |
| `ApprovalFlow.tsx` | Approve / Reject buttons | Missing `transition-opacity` (use `hover:opacity-90`) | **Fixed** — added `transition-opacity` to match the opacity-based hover |

### Remaining Notes

- `ApprovalFlow.tsx` horizontal mode: no hover state on step nodes. Intentional (they're read-only display); acceptable.
- `TaskPanel.tsx` task row context menu: dots button is `opacity-0 group-hover:opacity-100` — no explicit `transition-opacity` on the button itself. Consider adding it for smoother reveal (low priority).

---

## 6. Consistency Ratings

| Area | Rating | Notes |
|------|--------|-------|
| DS token usage (no raw colors) | **Good** | Chart.tsx palette had 2 raw hex entries; fixed. All other components clean. |
| Font sizes | **Good** | `text-[10px]`/`text-[11px]` are pervasive but intentional for compact UI density. ApprovalFlow/ReportsPage section labels normalised to `text-xs`. |
| Status badge styling | **Good** | Minor variants (`h-6` vs `py-0.5`) are contextually justified. ApprovalFlow badge font size corrected. |
| Section headers | **Good** | Consistent `font-semibold` usage across new components. |
| Input field sizing | **Excellent** | All new inputs use `h-8`/`h-9 px-3 rounded-lg border` correctly. |
| Button styling | **Good** | `hover:opacity-90` anti-pattern replaced with `hover:bg-[var(--ds-brand-700)]` in ReportsPage. Other new components were already correct. |
| Empty states | **Good** | Inline table empty states updated to `font-semibold text-[var(--ds-text-primary)]`. Full-page empty states use icon wrapper correctly. |
| Focus rings | **Needs work → Good** | Many interactive elements across new components were missing `focus-visible:ring-2`. 20+ targeted fixes applied. Pre-existing components have some `focus-visible:outline-none`-only buttons (noted for follow-up). |
| Transitions | **Good** | `transition-opacity` vs `transition-colors` mismatches corrected. Most new components had transitions; gaps filled. |

---

## Summary of Files Modified

1. `src/components/ui/Chart.tsx` — Wrapped 2 raw hex palette entries in `cssVar()`
2. `src/components/ui/ReportsPage.tsx` — Focus rings (5 elements), `transition-colors` (2), section header font size, sidebar nav focus rings
3. `src/components/ui/NotificationsCenter.tsx` — Focus rings (5 elements: header buttons, filter tabs, hover actions)
4. `src/components/ui/ApprovalFlow.tsx` — Focus rings (4 elements), badge font size (`text-[11px]` → `text-xs`, both layouts)
5. `src/components/ui/TaskPanel.tsx` — Focus rings (4 elements), `hover:bg` + `transition-colors` on Add button
6. `src/components/ui/DataImport.tsx` — Focus rings (4 elements), `transition-colors` (2 buttons)
7. `src/components/ui/DataExport.tsx` — Font size + focus ring on Select all button
8. `src/components/ui/UserManagementPage.tsx` — Empty state title (`font-medium` → `font-semibold`, `text-secondary` → `text-primary`)
9. `src/components/ui/AuditLogPage.tsx` — Empty state title (same fix)
