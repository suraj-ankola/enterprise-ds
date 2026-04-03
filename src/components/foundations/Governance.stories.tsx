import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { CheckCircleIcon, XCircleIcon, WarningIcon, LightbulbIcon } from '@phosphor-icons/react';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function Section({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return (
    <section className="mb-12">
      <h2 className="text-lg font-semibold text-[var(--ds-text-primary)]">{title}</h2>
      {description && <p className="mt-1 text-sm text-[var(--ds-text-muted)] mb-5 max-w-2xl">{description}</p>}
      {!description && <div className="mb-5" />}
      {children}
    </section>
  );
}

function Do({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-3 p-4 rounded-xl border border-[var(--ds-success-border)] bg-[var(--ds-success-bg)]">
      <CheckCircleIcon size={18} className="shrink-0 mt-0.5 text-[var(--ds-success-icon)]" weight="fill" />
      <p className="text-sm text-[var(--ds-success-text)]">{children}</p>
    </div>
  );
}

function Dont({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-3 p-4 rounded-xl border border-[var(--ds-danger-border)] bg-[var(--ds-danger-bg)]">
      <XCircleIcon size={18} className="shrink-0 mt-0.5 text-[var(--ds-danger-icon)]" weight="fill" />
      <p className="text-sm text-[var(--ds-danger-text)]">{children}</p>
    </div>
  );
}

function Note({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-3 p-4 rounded-xl border border-[var(--ds-info-border)] bg-[var(--ds-info-bg)]">
      <LightbulbIcon size={18} className="shrink-0 mt-0.5 text-[var(--ds-info-icon)]" weight="fill" />
      <p className="text-sm text-[var(--ds-info-text)]">{children}</p>
    </div>
  );
}

function Warn({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-3 p-4 rounded-xl border border-[var(--ds-warning-border)] bg-[var(--ds-warning-bg)]">
      <WarningIcon size={18} className="shrink-0 mt-0.5 text-[var(--ds-warning-icon)]" weight="fill" />
      <p className="text-sm text-[var(--ds-warning-text)]">{children}</p>
    </div>
  );
}

function RuleTable({ rows }: { rows: { rule: string; detail: string }[] }) {
  return (
    <div className="rounded-xl border border-[var(--ds-border-base)] bg-[var(--ds-bg-surface)] overflow-hidden">
      {rows.map(({ rule, detail }, i) => (
        <div key={i} className="flex gap-6 px-5 py-3.5 border-b border-[var(--ds-border-base)] last:border-0">
          <p className="w-64 shrink-0 text-sm font-medium text-[var(--ds-text-primary)]">{rule}</p>
          <p className="text-sm text-[var(--ds-text-secondary)]">{detail}</p>
        </div>
      ))}
    </div>
  );
}

function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="rounded-xl bg-[var(--ds-bg-inverse)] text-[var(--ds-text-inverse)] text-xs font-mono p-4 overflow-x-auto leading-relaxed">
      {code}
    </pre>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const TOKEN_RULES = [
  { rule: 'Use only --ds-* semantic tokens', detail: 'Components must reference semantic tokens, never primitive hex values or raw Tailwind color utilities like bg-blue-600.' },
  { rule: 'New token → globals.css first', detail: 'If a component needs a visual value not covered, add it to globals.css @theme or :root, then use it. Never inline a new value in a component.' },
  { rule: 'Sync tokens.ts after globals.css', detail: 'Every new CSS token must be reflected in tokens.ts. This file is the TypeScript source of truth for documentation and tooling.' },
  { rule: 'Brand tokens only via --ds-brand-*', detail: 'All brand-colored elements (primary buttons, focus rings, links) must use --ds-brand-* tokens. This ensures product theme switching works automatically.' },
  { rule: 'Never override semantic tokens inline', detail: 'Do not write style={{ color: "#2563eb" }} in components. Always use the token. Inline overrides break theme switching and dark mode.' },
];

const COMPONENT_RULES = [
  { rule: 'All 8 states required', detail: 'Every interactive component must handle: Default, Hover, Focus, Active, Disabled, Loading, Error, Success. Document missing states in JOURNEY.md.' },
  { rule: 'Responsive by default', detail: 'Components must work across all breakpoints (sm/md/lg/xl/2xl/3xl). Use Tailwind responsive prefixes. Never assume desktop-only.' },
  { rule: 'Dark mode always', detail: 'Use semantic tokens (--ds-*) — dark mode is free. Never add raw dark: Tailwind classes to hardcoded colors.' },
  { rule: 'Accessibility minimum AA', detail: 'All text/bg combinations must pass WCAG AA (4.5:1 for normal text, 3:1 for large text). Verified pairs are in tokens.ts accessibility.verified.' },
  { rule: 'Keyboard accessible', detail: 'All interactive elements must be reachable via keyboard. Use :focus-visible (not :focus). Implement role and aria-* where needed.' },
  { rule: 'Compound component pattern', detail: 'Complex components (Card, Form, Table) should use compound components (Card + CardHeader + CardBody + CardFooter), not a monolithic single component with 30 props.' },
  { rule: 'Co-locate stories', detail: 'Stories live next to the component file (Button.tsx + Button.stories.tsx). Never separate them into a /stories folder — they fall out of sync.' },
  { rule: 'No hardcoded text strings', detail: 'Labels, placeholder text, and button copy must be props. Never hardcode user-visible strings inside components.' },
  { rule: 'Reduced motion support', detail: 'Never add !important to animation/transition properties. The global prefers-reduced-motion media query in globals.css handles all animation disabling.' },
];

const NAMING_RULES = [
  { rule: 'Token names: --ds-[category]-[variant]', detail: 'Examples: --ds-bg-surface, --ds-text-primary, --ds-brand-600. Always ds- prefix for semantic tokens.' },
  { rule: 'Component names: PascalCase', detail: 'Button, CardHeader, InputGroup. Files: Button.tsx, Button.stories.tsx, Button.test.tsx.' },
  { rule: 'Prop names: camelCase, descriptive', detail: 'variant, size, isLoading (not loading), isDisabled (not disabled in HTML — use the HTML attribute). Error: errorMessage not error.' },
  { rule: 'Story names: state or use case', detail: 'Primary, Secondary, WithIcon, ErrorState, LoadingState. Not Story1, Story2.' },
  { rule: 'Icon imports: always *Icon suffix', detail: 'import { HouseIcon, UserIcon } from "@/components/foundations/Icons". Never the deprecated short form.' },
];

const SCALABILITY_RULES = [
  { rule: 'Adding a new component', detail: '1. Check if it can be composed from existing components. 2. Add tokens to globals.css if needed. 3. Build component. 4. Write stories for all states. 5. Update JOURNEY.md.' },
  { rule: 'Adding a new product theme', detail: '1. Add [data-theme="name"] block to globals.css overriding --ds-brand-* tokens. 2. Add to brandThemes in tokens.ts. 3. Add to Storybook toolbar in preview.ts.' },
  { rule: 'Adding a new token category', detail: '1. Define primitives in @theme block. 2. Define semantic tokens in :root and .dark. 3. Add to tokens.ts. 4. Add to relevant Foundation story page.' },
  { rule: 'Deprecating a token', detail: 'Add a CSS comment /* @deprecated: use --ds-new-token */. Keep the old token for one release cycle. Update all usages. Remove in next cycle.' },
  { rule: 'Breaking changes to component API', detail: 'Increment the component version in a comment at the top of the file. Document in JOURNEY.md with the reason and migration path.' },
];

const CHECKLIST = [
  'Uses only --ds-* semantic tokens (no raw hex, no hardcoded Tailwind color classes)',
  'All 8 states implemented and visible in Storybook',
  'Responsive across sm / md / lg / xl / 2xl',
  'Dark mode works without extra dark: classes on brand tokens',
  'Product theme switching works (change toolbar — colors update)',
  'Keyboard accessible (Tab + Enter/Space work, focus ring visible)',
  'WCAG AA contrast passes on all text elements',
  'prefers-reduced-motion respected (no !important on animations)',
  'Props are typed with TypeScript interfaces',
  'Storybook stories co-located with component file',
  'JOURNEY.md updated with what was built',
];

// ─── Page ─────────────────────────────────────────────────────────────────────

function GovernancePage() {
  return (
    <div className="min-h-screen bg-[var(--ds-bg-base)] font-sans">
      <div className="ds-container py-8">
        <h1 className="text-3xl font-bold text-[var(--ds-text-primary)]">Governance & Scalability</h1>
        <p className="mt-2 text-sm text-[var(--ds-text-secondary)] max-w-3xl">
          Rules for building, extending, and maintaining the design system.
          Every component and template must follow these rules.
          When in doubt — check this page before writing code.
        </p>
      </div>

      <div className="ds-container pb-12 space-y-12">

        {/* Token rules */}
        <Section title="Token Rules" description="The most important rules. Violating these breaks theme switching, dark mode, and accessibility.">
          <div className="space-y-4">
            <RuleTable rows={TOKEN_RULES} />
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <Do>Use <code className="font-mono text-xs">bg-[var(--ds-brand-600)]</code> for brand-colored backgrounds</Do>
              <Dont>Never use <code className="font-mono text-xs">bg-blue-600</code> directly in components — it breaks theme switching</Dont>
              <Do>Use <code className="font-mono text-xs">text-[var(--ds-text-primary)]</code> for body text</Do>
              <Dont>Never use <code className="font-mono text-xs">text-slate-900</code> or inline <code className="font-mono text-xs">{'style={{ color: \'#0f172a\' }}'}</code></Dont>
            </div>
          </div>
        </Section>

        {/* Token architecture */}
        <Section title="Token Architecture" description="How tokens flow from raw values to components.">
          <CodeBlock code={`/* LAYER 1 — Primitives (@theme)
   Raw values. Become Tailwind utilities.
   NEVER used directly in components.          */
--color-blue-600: #2563eb;

/* LAYER 2 — Semantic (:root / .dark)
   Map primitives to meaning.
   Light/dark aware. Used in components.        */
--ds-brand-600: #2563eb;   /* light */
.dark { --ds-brand-600: #3b82f6; }

/* LAYER 3 — Brand theme ([data-theme])
   Override brand tokens per product.
   Semantic tokens remain unchanged.            */
[data-theme="itops"] { --ds-brand-600: #7c3aed; }

/* COMPONENT — only touches layer 2           */
.button-primary {
  background: var(--ds-brand-600);    /* ✅ */
  background: #2563eb;                /* ❌ */
  background: theme(colors.blue.600); /* ❌ */
}`} />
        </Section>

        {/* Component rules */}
        <Section title="Component Rules" description="Every new component must satisfy all of these.">
          <RuleTable rows={COMPONENT_RULES} />
        </Section>

        {/* Naming conventions */}
        <Section title="Naming Conventions">
          <RuleTable rows={NAMING_RULES} />
        </Section>

        {/* Scalability */}
        <Section title="Scalability Procedures" description="How to extend the system without breaking existing work.">
          <RuleTable rows={SCALABILITY_RULES} />
          <div className="mt-4 space-y-3">
            <Note>Adding a new component? Check if it can be composed from existing ones first. A new component should only be created when composition won't work.</Note>
            <Warn>Never rename an existing --ds-* token without a deprecation cycle. Renaming breaks every component using that token.</Warn>
          </div>
        </Section>

        {/* Pre-commit checklist */}
        <Section title="Component Completion Checklist" description="Run through this before marking any component as done.">
          <div className="rounded-xl border border-[var(--ds-border-base)] bg-[var(--ds-bg-surface)] divide-y divide-[var(--ds-border-base)] overflow-hidden">
            {CHECKLIST.map((item, i) => (
              <div key={i} className="flex items-start gap-4 px-5 py-3.5">
                <div className="mt-0.5 h-4 w-4 shrink-0 rounded border-2 border-[var(--ds-border-strong)]" />
                <p className="text-sm text-[var(--ds-text-primary)]">{item}</p>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <Note>Copy this checklist into JOURNEY.md for each component session to track progress.</Note>
          </div>
        </Section>

        {/* File structure */}
        <Section title="File Structure Convention">
          <CodeBlock code={`src/
  tokens/
    tokens.ts              ← TypeScript source of truth (sync with globals.css)

  app/
    globals.css            ← All CSS tokens. Only file with raw hex values.

  components/
    foundations/           ← Foundation Storybook pages (Colors, Typography...)
      Colors.stories.tsx
      Typography.stories.tsx
      Spacing.stories.tsx
      Radius.stories.tsx
      Shadows.stories.tsx
      Grid.stories.tsx
      Motion.stories.tsx
      States.stories.tsx
      FocusRing.stories.tsx
      Icons.stories.tsx
      Governance.stories.tsx ← This file

    ui/                    ← Primitive components (no domain logic)
      Button.tsx
      Button.stories.tsx
      Input.tsx
      Input.stories.tsx
      Card.tsx
      Card.stories.tsx
      Badge.tsx            ← next
      Badge.stories.tsx

    patterns/              ← Composed components with domain logic
      VendorRiskCard.tsx   ← uses Card + Badge + Button
      ITAlertCard.tsx
      MetricTile.tsx

  types/
    global.d.ts            ← CSS module type declarations`} />
        </Section>

      </div>
    </div>
  );
}

const meta: Meta = {
  title: 'Foundations/Governance',
  parameters: { layout: 'fullscreen' },
};
export default meta;

export const GovernanceRules: StoryObj = {
  name: 'Governance & Scalability',
  render: () => <GovernancePage />,
};
