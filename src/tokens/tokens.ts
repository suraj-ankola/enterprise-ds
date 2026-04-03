/**
 * Enterprise Design System — Design Tokens (TypeScript)
 *
 * This is the TypeScript mirror of src/app/globals.css.
 * Use for: documentation, tooling, JS-side token references.
 * In components: always use CSS custom properties (var(--ds-*))
 *
 * Architecture:
 *   primitive → semantic → brand
 *
 * Rules:
 *   1. Components use ONLY --ds-* semantic tokens
 *   2. Never hardcode hex in components
 *   3. New tokens → add here AND in globals.css
 *   4. All changes documented in JOURNEY.md
 */

// ─── PRIMITIVE PALETTE ────────────────────────────────────────────────────────
// Raw values. Used only to build semantic tokens.

export const primitive = {
  blue: {
    50: '#eff6ff', 100: '#dbeafe', 200: '#bfdbfe', 300: '#93c5fd',
    400: '#60a5fa', 500: '#3b82f6', 600: '#2563eb', 700: '#1d4ed8',
    800: '#1e40af', 900: '#1e3a8a',
  },
  violet: {
    50: '#f5f3ff', 100: '#ede9fe', 200: '#ddd6fe', 300: '#c4b5fd',
    400: '#a78bfa', 500: '#8b5cf6', 600: '#7c3aed', 700: '#6d28d9',
    800: '#5b21b6', 900: '#4c1d95',
  },
  cyan: {
    50: '#ecfeff', 100: '#cffafe', 200: '#a5f3fc', 300: '#67e8f9',
    400: '#22d3ee', 500: '#06b6d4', 600: '#0891b2', 700: '#0e7490',
    800: '#155e75', 900: '#164e63',
  },
  neutral: {
    50: '#f8fafc', 100: '#f1f5f9', 200: '#e2e8f0', 300: '#cbd5e1',
    400: '#94a3b8', 500: '#64748b', 600: '#475569', 700: '#334155',
    800: '#1e293b', 900: '#0f172a',
  },
  green:  { 50: '#f0fdf4', 100: '#dcfce7', 500: '#22c55e', 600: '#16a34a', 700: '#15803d', 900: '#14532d' },
  amber:  { 100: '#fef3c7', 500: '#f59e0b', 600: '#d97706', 900: '#78350f' },
  red:    { 50: '#fff1f2', 100: '#fee2e2', 400: '#f87171', 500: '#ef4444', 600: '#dc2626', 900: '#7f1d1d' },
  sky:    { 100: '#e0f2fe', 500: '#0ea5e9', 600: '#0284c7', 900: '#0c4a6e' },
} as const;

// ─── BRAND THEMES ─────────────────────────────────────────────────────────────
// Applied via data-theme attribute on <html>

export const brandThemes = {
  compliance: {
    name: 'Compliance Risk Platform',
    color: 'Blue',
    description: 'Trust, security, authority',
    scale: primitive.blue,
    dataTheme: 'compliance',
  },
  itops: {
    name: 'IT Ops AI Copilot',
    color: 'Violet',
    description: 'Technical, modern, intelligent',
    scale: primitive.violet,
    dataTheme: 'itops',
  },
  analytics: {
    name: 'Self-Serve Analytics',
    color: 'Cyan',
    description: 'Data, clarity, insight',
    scale: primitive.cyan,
    dataTheme: 'analytics',
  },
} as const;

// ─── TYPOGRAPHY ───────────────────────────────────────────────────────────────

export const typography = {
  fontFamily: {
    sans: "'Inter', ui-sans-serif, system-ui, -apple-system, sans-serif",
    mono: "'JetBrains Mono', ui-monospace, 'SFMono-Regular', 'Menlo', monospace",
  },
  /** 8-step type scale. Responsive rules:
   *  - Mobile: reduce one step (text-xl → text-lg)
   *  - Tablet: use base size
   *  - Desktop+: full scale
   */
  fontSize: {
    xs:   { px: 12, rem: '0.75rem',   lh: '1rem',     tw: 'text-xs'   },
    sm:   { px: 14, rem: '0.875rem',  lh: '1.25rem',  tw: 'text-sm'   },
    base: { px: 16, rem: '1rem',      lh: '1.5rem',   tw: 'text-base' },
    lg:   { px: 18, rem: '1.125rem',  lh: '1.75rem',  tw: 'text-lg'   },
    xl:   { px: 20, rem: '1.25rem',   lh: '1.75rem',  tw: 'text-xl'   },
    '2xl':{ px: 24, rem: '1.5rem',    lh: '2rem',     tw: 'text-2xl'  },
    '3xl':{ px: 30, rem: '1.875rem',  lh: '2.25rem',  tw: 'text-3xl'  },
    '4xl':{ px: 36, rem: '2.25rem',   lh: '2.5rem',   tw: 'text-4xl'  },
    '5xl':{ px: 48, rem: '3rem',      lh: '1',        tw: 'text-5xl'  },
  },
  fontWeight: {
    regular:  { value: 400, tw: 'font-normal'   },
    medium:   { value: 500, tw: 'font-medium'   },
    semibold: { value: 600, tw: 'font-semibold' },
    bold:     { value: 700, tw: 'font-bold'     },
  },
  letterSpacing: {
    tight:   { value: '-0.025em', tw: 'tracking-tight'   },
    normal:  { value: '0em',      tw: 'tracking-normal'  },
    wide:    { value: '0.025em',  tw: 'tracking-wide'    },
    wider:   { value: '0.05em',   tw: 'tracking-wider'   },
    widest:  { value: '0.1em',    tw: 'tracking-widest'  },
  },
  lineHeight: {
    none:    { value: 1,     tw: 'leading-none'    },
    tight:   { value: 1.25,  tw: 'leading-tight'   },
    snug:    { value: 1.375, tw: 'leading-snug'    },
    normal:  { value: 1.5,   tw: 'leading-normal'  },
    relaxed: { value: 1.625, tw: 'leading-relaxed' },
    loose:   { value: 2,     tw: 'leading-loose'   },
  },
} as const;

// ─── SPACING (8pt grid) ───────────────────────────────────────────────────────
// Base unit: 8px. Full steps: 8, 16, 24... Half steps: 4, 12, 20...
// In Tailwind: spacing-1=4px, spacing-2=8px (1 unit), spacing-4=16px (2 units)

export const spacing = {
  0:    { px: 0,   rem: '0',       tw: 'p-0'    },
  0.5:  { px: 2,   rem: '0.125rem', tw: 'p-0.5'  }, // quarter step
  1:    { px: 4,   rem: '0.25rem', tw: 'p-1'    }, // half step
  1.5:  { px: 6,   rem: '0.375rem', tw: 'p-1.5'  },
  2:    { px: 8,   rem: '0.5rem',  tw: 'p-2'    }, // 1 unit ← 8pt base
  2.5:  { px: 10,  rem: '0.625rem', tw: 'p-2.5'  },
  3:    { px: 12,  rem: '0.75rem', tw: 'p-3'    }, // 1.5 units
  4:    { px: 16,  rem: '1rem',    tw: 'p-4'    }, // 2 units
  5:    { px: 20,  rem: '1.25rem', tw: 'p-5'    },
  6:    { px: 24,  rem: '1.5rem',  tw: 'p-6'    }, // 3 units
  7:    { px: 28,  rem: '1.75rem', tw: 'p-7'    },
  8:    { px: 32,  rem: '2rem',    tw: 'p-8'    }, // 4 units
  10:   { px: 40,  rem: '2.5rem',  tw: 'p-10'   }, // 5 units
  12:   { px: 48,  rem: '3rem',    tw: 'p-12'   }, // 6 units
  16:   { px: 64,  rem: '4rem',    tw: 'p-16'   }, // 8 units
  20:   { px: 80,  rem: '5rem',    tw: 'p-20'   }, // 10 units
  24:   { px: 96,  rem: '6rem',    tw: 'p-24'   }, // 12 units
} as const;

// ─── BORDER RADIUS ────────────────────────────────────────────────────────────

export const borderRadius = {
  none: { value: '0px',    tw: 'rounded-none', usage: 'Tables, inline code' },
  xs:   { value: '2px',    tw: 'rounded-xs',   usage: 'Micro badges inside cells' },
  sm:   { value: '4px',    tw: 'rounded-sm',   usage: 'Checkboxes, small tags' },
  md:   { value: '6px',    tw: 'rounded-md',   usage: 'Buttons sm, inputs sm, tooltips' },
  lg:   { value: '8px',    tw: 'rounded-lg',   usage: 'Buttons md/lg, inputs md/lg, dropdowns' },
  xl:   { value: '12px',   tw: 'rounded-xl',   usage: 'Cards, panels, modals' },
  '2xl':{ value: '16px',   tw: 'rounded-2xl',  usage: 'Feature cards, hero panels' },
  '3xl':{ value: '24px',   tw: 'rounded-3xl',  usage: 'AI chat bubbles, callouts' },
  full: { value: '9999px', tw: 'rounded-full', usage: 'Pills, avatars, toggles' },
} as const;

// ─── SHADOWS (elevation) ──────────────────────────────────────────────────────

export const shadow = {
  none: { tw: 'shadow-none', usage: 'Reset' },
  xs:   { tw: 'shadow-xs',   usage: 'Input focus, subtle lift' },
  sm:   { tw: 'shadow-sm',   usage: 'Buttons, tags, small cards' },
  md:   { tw: 'shadow-md',   usage: 'Elevated cards, hover — primary card' },
  lg:   { tw: 'shadow-lg',   usage: 'Dropdowns, popovers' },
  xl:   { tw: 'shadow-xl',   usage: 'Modals, drawers, side panels' },
  '2xl':{ tw: 'shadow-2xl',  usage: 'Command palette, full-screen overlays' },
} as const;

// ─── BREAKPOINTS & LAYOUT GRID ────────────────────────────────────────────────

export const breakpoints = {
  sm:  { px: 640,  label: 'Mobile landscape', columns: 4,  gutter: 16, margin: 16  },
  md:  { px: 768,  label: 'Tablet',           columns: 8,  gutter: 24, margin: 32  },
  lg:  { px: 1024, label: 'Small laptop',     columns: 12, gutter: 32, margin: 48  },
  xl:  { px: 1280, label: 'Desktop',          columns: 12, gutter: 32, margin: 48  },
  '2xl':{ px: 1536,label: 'Large monitor',    columns: 16, gutter: 40, margin: 80  },
  '3xl':{ px: 1920,label: 'Ultrawide / 4K',   columns: 16, gutter: 40, margin: 80  },
} as const;

// ─── Z-INDEX ──────────────────────────────────────────────────────────────────

export const zIndex = {
  base:    0,
  raised:  10,
  dropdown: 100,
  sticky:  200,
  overlay: 300,
  modal:   400,
  toast:   500,
  tooltip: 600,
} as const;

// ─── MOTION ───────────────────────────────────────────────────────────────────

export const motion = {
  duration: {
    instant: '50ms',
    fast:    '100ms',
    base:    '150ms',
    slow:    '250ms',
    slower:  '400ms',
    page:    '300ms',
  },
  easing: {
    default: 'cubic-bezier(0.4, 0, 0.2, 1)',
    in:      'cubic-bezier(0.4, 0, 1, 1)',
    out:     'cubic-bezier(0, 0, 0.2, 1)',
    spring:  'cubic-bezier(0.34, 1.56, 0.64, 1)',
    bounce:  'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },
  /** Interaction map: what duration + easing to use for each interaction */
  interactions: {
    buttonHover:      { duration: 'fast',   easing: 'default' },
    inputFocus:       { duration: 'fast',   easing: 'default' },
    modalOpen:        { duration: 'slow',   easing: 'out'     },
    modalClose:       { duration: 'base',   easing: 'in'      },
    dropdownOpen:     { duration: 'fast',   easing: 'out'     },
    toastSlideIn:     { duration: 'slow',   easing: 'spring'  },
    pageTransition:   { duration: 'page',   easing: 'default' },
    skeletonPulse:    { duration: 'slower', easing: 'default' },
    badgeCount:       { duration: 'base',   easing: 'spring'  },
  },
} as const;

// ─── COMPONENT STATES ─────────────────────────────────────────────────────────
// Reference for all interactive states every component must handle

export const componentStates = [
  'default',
  'hover',
  'focus',
  'active',
  'disabled',
  'loading',
  'error',
  'success',
] as const;

export type ComponentState = typeof componentStates[number];

// ─── ACCESSIBILITY ────────────────────────────────────────────────────────────
// WCAG contrast requirements. All text/bg combinations must pass.

export const accessibility = {
  contrast: {
    /** AA: 4.5:1 for normal text, 3:1 for large text */
    aa: 4.5,
    aaLarge: 3,
    /** AAA: 7:1 for normal text, 4.5:1 for large text */
    aaa: 7,
    aaaLarge: 4.5,
  },
  /** Verified passing combinations (token: ratio) */
  verified: {
    'ds-text-primary on ds-bg-base':    '17.1:1 AAA',
    'ds-text-primary on ds-bg-surface': '17.1:1 AAA',
    'ds-text-secondary on ds-bg-surface': '7.2:1 AAA',
    'ds-text-on-brand on ds-brand-600': '5.1:1 AA',
    'ds-danger-text on ds-danger-bg':   '5.3:1 AA',
    'ds-success-text on ds-success-bg': '4.6:1 AA',
    'ds-warning-text on ds-warning-bg': '4.5:1 AA',
  },
} as const;
