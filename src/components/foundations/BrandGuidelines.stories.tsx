import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ShieldCheckIcon, GearIcon, ChartBarIcon, CheckIcon, XIcon } from '@phosphor-icons/react';
import { Button } from '../ui/Button';
import { Badge }  from '../ui/Badge';

const meta: Meta = {
  title: 'Foundations/Brand Guidelines',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Brand identity for all three enterprise AI products built on this design system. Each product shares the same neutral foundation and semantic tokens — only `--ds-brand-*` changes. Apply themes via `data-theme="compliance|itops|analytics"` on a root element.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

// ─── Brand data ───────────────────────────────────────────────────────────────

const BRANDS = [
  {
    key:       'compliance' as const,
    name:      'Comply AI',
    product:   'Compliance Risk Platform',
    theme:     'data-theme="compliance"',
    palette:   'Blue',
    tagline:   'Trust through visibility',
    description: 'Built for GRC teams who need confidence in every vendor relationship and audit cycle. Blue signals authority, trust, and institutional reliability.',
    personality: ['Professional', 'Trustworthy', 'Precise', 'Authoritative'],
    voice:       ["Speak in certainties, not hedges", "Use compliance-native language (controls, frameworks, evidence)", "Avoid jargon the CISO’s board won’t understand"],
    colors: [
      { stop: '50',  hex: '#eff6ff' },
      { stop: '100', hex: '#dbeafe' },
      { stop: '200', hex: '#bfdbfe' },
      { stop: '300', hex: '#93c5fd' },
      { stop: '400', hex: '#60a5fa' },
      { stop: '500', hex: '#3b82f6' },
      { stop: '600', hex: '#2563eb', primary: true },
      { stop: '700', hex: '#1d4ed8' },
      { stop: '800', hex: '#1e40af' },
      { stop: '900', hex: '#1e3a8a' },
    ],
    icon: <ShieldCheckIcon size={24} weight="duotone" />,
    gradient: 'from-blue-600 to-blue-800',
  },
  {
    key:       'itops' as const,
    name:      'Ops AI',
    product:   'IT Ops AI Copilot',
    theme:     'data-theme="itops"',
    palette:   'Violet',
    tagline:   'Intelligence at ops speed',
    description: 'Built for IT operations teams who need to resolve incidents faster and predict failures before they happen. Violet signals intelligence, capability, and technical edge.',
    personality: ['Intelligent', 'Proactive', 'Efficient', 'Technical'],
    voice:       ["Be direct — operators don't have time for prose", "Lead with the signal, not the context", "Use incident-native language (SLA, MTTR, root cause, alert)"],
    colors: [
      { stop: '50',  hex: '#f5f3ff' },
      { stop: '100', hex: '#ede9fe' },
      { stop: '200', hex: '#ddd6fe' },
      { stop: '300', hex: '#c4b5fd' },
      { stop: '400', hex: '#a78bfa' },
      { stop: '500', hex: '#8b5cf6' },
      { stop: '600', hex: '#7c3aed', primary: true },
      { stop: '700', hex: '#6d28d9' },
      { stop: '800', hex: '#5b21b6' },
      { stop: '900', hex: '#4c1d95' },
    ],
    icon: <GearIcon size={24} weight="duotone" />,
    gradient: 'from-violet-600 to-violet-800',
  },
  {
    key:       'analytics' as const,
    name:      'Clarity AI',
    product:   'Self-Serve Analytics',
    theme:     'data-theme="analytics"',
    palette:   'Cyan',
    tagline:   'Answers, not dashboards',
    description: 'Built for product and business teams who need data without writing SQL. Cyan signals clarity, openness, and insight — without the intimidation of traditional BI tools.',
    personality: ['Approachable', 'Insightful', 'Clear', 'Empowering'],
    voice:       ['Lead with the insight, not the methodology', 'Use plain language — your user is not a data engineer', 'Turn questions into answers, not more charts'],
    colors: [
      { stop: '50',  hex: '#ecfeff' },
      { stop: '100', hex: '#cffafe' },
      { stop: '200', hex: '#a5f3fc' },
      { stop: '300', hex: '#67e8f9' },
      { stop: '400', hex: '#22d3ee' },
      { stop: '500', hex: '#06b6d4' },
      { stop: '600', hex: '#0891b2', primary: true },
      { stop: '700', hex: '#0e7490' },
      { stop: '800', hex: '#155e75' },
      { stop: '900', hex: '#164e63' },
    ],
    icon: <ChartBarIcon size={24} weight="duotone" />,
    gradient: 'from-cyan-600 to-cyan-800',
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-6">
      <h2 className="text-xl font-bold text-[var(--ds-text-primary)] border-b border-[var(--ds-border-base)] pb-3">
        {title}
      </h2>
      {children}
    </section>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-widest text-[var(--ds-text-muted)]">{children}</p>
  );
}

// Colour swatch row for one brand
function PaletteRow({ colors }: { colors: typeof BRANDS[0]['colors'] }) {
  return (
    <div className="flex rounded-xl overflow-hidden border border-[var(--ds-border-base)]">
      {colors.map((c) => (
        <div key={c.stop} className="flex-1 flex flex-col" title={`${c.stop}: ${c.hex}`}>
          <div
            className="h-12"
            style={{ backgroundColor: c.hex }}
          />
          <div className={['px-1 py-1.5 flex flex-col items-center gap-0.5', c.primary ? 'bg-[var(--ds-bg-subtle)]' : 'bg-[var(--ds-bg-surface)]'].join(' ')}>
            <span className="text-[10px] font-semibold text-[var(--ds-text-secondary)]">{c.stop}</span>
            {c.primary && (
              <span className="text-[9px] font-bold text-[var(--ds-brand-600)] uppercase tracking-wide">Primary</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

// Mini product card rendered inside a data-theme wrapper
function ThemePreview({ brand }: { brand: typeof BRANDS[0] }) {
  return (
    <div data-theme={brand.key} className="rounded-xl border border-[var(--ds-border-base)] overflow-hidden bg-[var(--ds-bg-surface)] shadow-[var(--ds-shadow-sm)]">
      {/* Card header */}
      <div className="bg-[var(--ds-brand-600)] px-5 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="h-9 w-9 rounded-lg bg-white/20 flex items-center justify-center text-white">
            {brand.icon}
          </span>
          <div>
            <p className="text-sm font-bold text-white">{brand.name}</p>
            <p className="text-xs text-white/70">{brand.product}</p>
          </div>
        </div>
        <Badge variant="neutral" className="bg-white/20 text-white border-white/20 text-xs">Live</Badge>
      </div>

      {/* Card body */}
      <div className="p-5 flex flex-col gap-4">
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'Active',    value: '142' },
            { label: 'Resolved',  value: '38'  },
            { label: 'Risk',      value: 'Low'  },
          ].map((s) => (
            <div key={s.label} className="rounded-lg bg-[var(--ds-brand-50)] p-3 text-center">
              <p className="text-base font-bold text-[var(--ds-brand-700)]">{s.value}</p>
              <p className="text-xs text-[var(--ds-brand-600)] mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Button variant="primary" size="sm">Take action</Button>
          <Button variant="secondary" size="sm">Review</Button>
        </div>

        <div className="flex flex-wrap gap-1.5">
          <Badge variant="brand">Framework</Badge>
          <Badge variant="success">Passing</Badge>
          <Badge variant="warning">Review</Badge>
        </div>
      </div>
    </div>
  );
}

// Typography specimen under a theme
function TypographySpecimen({ brand }: { brand: typeof BRANDS[0] }) {
  return (
    <div data-theme={brand.key} className="flex flex-col gap-3 p-5 rounded-xl border border-[var(--ds-border-base)] bg-[var(--ds-bg-surface)]">
      <SectionLabel>{brand.palette} brand</SectionLabel>
      <p className="text-3xl font-extrabold text-[var(--ds-text-primary)] leading-tight">{brand.tagline}</p>
      <p className="text-sm text-[var(--ds-text-secondary)] leading-relaxed max-w-sm">{brand.description.split('.')[0]}.</p>
      <div className="flex items-center gap-2 mt-1">
        <span className="text-xs font-semibold text-[var(--ds-brand-600)] underline underline-offset-2 cursor-pointer">Learn more →</span>
      </div>
    </div>
  );
}

// ─── Stories ──────────────────────────────────────────────────────────────────

// ─── Code examples (defined outside JSX to avoid TSX parser ambiguity) ───────

const CODE_EXAMPLES = [
  {
    label: 'HTML root attribute',
    code:  [
      '<html data-theme="compliance">  ←  Compliance Risk',
      '<html data-theme="itops">       ←  IT Ops Copilot',
      '<html data-theme="analytics">   ←  Self-Serve Analytics',
    ].join('\n'),
  },
  {
    label: 'Next.js layout',
    code: [
      'export default function Layout({ children }) {',
      '  return (',
      '    <html data-theme={process.env.NEXT_PUBLIC_BRAND}>',
      '      <body>{children}</body>',
      '    </html>',
      '  );',
      '}',
    ].join('\n'),
  },
  {
    label: 'Per-section (multi-product page)',
    code: [
      '<div data-theme="compliance">',
      '  <ComplianceWidget />',
      '</div>',
      '<div data-theme="itops">',
      '  <OpsWidget />',
      '</div>',
    ].join('\n'),
  },
];

export const Overview: Story = {
  name: 'Brand overview',
  render: () => (
    <div className="min-h-screen bg-[var(--ds-bg-base)] px-8 py-10 flex flex-col gap-12 max-w-[1280px] mx-auto">

      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-extrabold text-[var(--ds-text-primary)]">Brand Guidelines</h1>
        <p className="text-base text-[var(--ds-text-secondary)] max-w-2xl">
          Three enterprise AI products. One design system. Each product shares the same neutral foundation, semantic tokens, and component library — only <code className="text-xs bg-[var(--ds-bg-subtle)] px-1.5 py-0.5 rounded font-mono text-[var(--ds-brand-600)]">--ds-brand-*</code> changes.
        </p>
      </div>

      {/* Brand identity cards */}
      <Section title="Product Identities">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BRANDS.map((brand) => (
            <div key={brand.key} className="flex flex-col rounded-xl overflow-hidden border border-[var(--ds-border-base)] shadow-[var(--ds-shadow-xs)]">
              {/* Gradient banner */}
              <div
                className="h-28 flex flex-col items-start justify-end p-5 gap-1"
                style={{ background: `linear-gradient(135deg, ${brand.colors[6].hex}, ${brand.colors[8].hex})` }}
              >
                <span className="h-10 w-10 rounded-xl bg-white/20 flex items-center justify-center text-white mb-1">
                  {brand.icon}
                </span>
                <p className="text-lg font-bold text-white leading-tight">{brand.name}</p>
                <p className="text-xs text-white/70">{brand.product}</p>
              </div>

              {/* Details */}
              <div className="p-5 bg-[var(--ds-bg-surface)] flex flex-col gap-4 flex-1">
                <div>
                  <SectionLabel>Tagline</SectionLabel>
                  <p className="mt-1 text-sm font-semibold text-[var(--ds-text-primary)] italic">"{brand.tagline}"</p>
                </div>

                <div>
                  <SectionLabel>Palette</SectionLabel>
                  <p className="mt-1 text-sm text-[var(--ds-text-secondary)]">{brand.palette} — Primary: <code className="text-xs font-mono">{brand.colors[6].hex}</code></p>
                </div>

                <div>
                  <SectionLabel>Brand theme attribute</SectionLabel>
                  <code className="mt-1 block text-xs font-mono bg-[var(--ds-bg-subtle)] text-[var(--ds-text-secondary)] px-3 py-2 rounded-lg">
                    {brand.theme}
                  </code>
                </div>

                <div>
                  <SectionLabel>Personality</SectionLabel>
                  <div className="mt-1.5 flex flex-wrap gap-1.5">
                    {brand.personality.map((p) => (
                      <span key={p} className="text-xs px-2 py-0.5 rounded-full border border-[var(--ds-border-base)] text-[var(--ds-text-secondary)] bg-[var(--ds-bg-subtle)]">
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Colour palettes */}
      <Section title="Brand Colour Palettes">
        <div className="flex flex-col gap-8">
          {BRANDS.map((brand) => (
            <div key={brand.key} className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <span
                  className="h-5 w-5 rounded-full border border-white shadow-sm"
                  style={{ backgroundColor: brand.colors[6].hex }}
                />
                <p className="text-sm font-semibold text-[var(--ds-text-primary)]">
                  {brand.name} — {brand.palette}
                </p>
              </div>
              <PaletteRow colors={brand.colors} />
            </div>
          ))}
        </div>
      </Section>

      {/* Theme in action */}
      <Section title="Themes in Action">
        <p className="text-sm text-[var(--ds-text-secondary)] -mt-2">
          Same components, same tokens — only the brand theme attribute differs.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BRANDS.map((brand) => (
            <ThemePreview key={brand.key} brand={brand} />
          ))}
        </div>
      </Section>

      {/* Typography */}
      <Section title="Brand Typography">
        <p className="text-sm text-[var(--ds-text-secondary)] -mt-2">
          All products use <strong>Inter</strong> for UI and <strong>JetBrains Mono</strong> for code. Brand colour is applied to accents, links, and CTAs.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BRANDS.map((brand) => (
            <TypographySpecimen key={brand.key} brand={brand} />
          ))}
        </div>

        {/* Type scale reference */}
        <div className="p-6 rounded-xl border border-[var(--ds-border-base)] bg-[var(--ds-bg-surface)] flex flex-col gap-5 mt-2">
          <SectionLabel>Shared type scale</SectionLabel>
          {[
            { label: 'Display (5xl / 700)',   cls: 'text-5xl font-bold',      sample: 'Vendor risk at scale' },
            { label: 'Heading 1 (3xl / 700)', cls: 'text-3xl font-bold',      sample: 'Compliance dashboard' },
            { label: 'Heading 2 (2xl / 600)', cls: 'text-2xl font-semibold',  sample: 'Active frameworks' },
            { label: 'Heading 3 (xl / 600)',  cls: 'text-xl font-semibold',   sample: 'Vendor overview' },
            { label: 'Body (base / 400)',      cls: 'text-base',               sample: 'This platform monitors your entire vendor ecosystem in real time.' },
            { label: 'Small (sm / 400)',       cls: 'text-sm',                 sample: 'Last updated 3 minutes ago' },
            { label: 'Caption (xs / 500)',     cls: 'text-xs font-medium',     sample: 'FRAMEWORK · SOC 2 TYPE II' },
          ].map((row) => (
            <div key={row.label} className="flex items-baseline gap-6 border-b border-[var(--ds-border-base)] pb-4 last:border-0 last:pb-0">
              <span className="text-xs text-[var(--ds-text-muted)] w-44 shrink-0">{row.label}</span>
              <span className={[row.cls, 'text-[var(--ds-text-primary)]'].join(' ')}>{row.sample}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* Voice & tone */}
      <Section title="Voice & Tone">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BRANDS.map((brand) => (
            <div key={brand.key} className="flex flex-col gap-4 p-5 rounded-xl border border-[var(--ds-border-base)] bg-[var(--ds-bg-surface)]">
              <div className="flex items-center gap-2">
                <span
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: brand.colors[6].hex }}
                />
                <p className="text-sm font-semibold text-[var(--ds-text-primary)]">{brand.name}</p>
              </div>
              <ul className="flex flex-col gap-2">
                {brand.voice.map((v, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-[var(--ds-text-secondary)]">
                    <CheckIcon size={14} className="mt-0.5 shrink-0 text-[var(--ds-success-icon)]" weight="bold" />
                    {v}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* Do / Don't */}
      <Section title="Do & Don't">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-xl border border-[var(--ds-success-border)] bg-[var(--ds-success-bg-subtle)] p-5 flex flex-col gap-3">
            <p className="text-sm font-bold text-[var(--ds-success-text)] flex items-center gap-1.5">
              <CheckIcon size={14} weight="bold" /> Do
            </p>
            <ul className="flex flex-col gap-2">
              {[
                'Use data-theme attribute to switch brand context — never manually override --ds-brand-* in component code',
                'Keep all status colors (success, warning, danger, info) the same across all three products — they are semantic, not brand',
                'Apply brand colour to primary CTAs, links, focus rings, and active states only',
                'Use the shared neutral palette (--ds-text-*, --ds-border-*, --ds-bg-*) for all structural UI',
                'Test contrast ratios when using brand-600 on brand-50 backgrounds — all three palettes pass WCAG AA',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-[var(--ds-success-text)]">
                  <span className="mt-0.5 shrink-0">·</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-[var(--ds-danger-border)] bg-[var(--ds-danger-bg-subtle)] p-5 flex flex-col gap-3">
            <p className="text-sm font-bold text-[var(--ds-danger-text)] flex items-center gap-1.5">
              <XIcon size={14} weight="bold" /> Don't
            </p>
            <ul className="flex flex-col gap-2">
              {[
                "Never hardcode brand hex values (#2563eb) in component source — it breaks theme switching",
                "Don't mix brand palettes — don't use blue-600 in an IT Ops screen or violet-600 in a Compliance screen",
                "Don't use brand colour for body text — only primary, secondary, muted, and disabled text tokens",
                "Don't apply brand-600 background to large surface areas — reserve it for small accents and CTAs",
                "Don't add a 4th brand without updating both globals.css and the DS Tokens Figma variable collection",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-[var(--ds-danger-text)]">
                  <span className="mt-0.5 shrink-0">·</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* How to apply */}
      <Section title="How to Apply a Theme">
        <div className="rounded-xl border border-[var(--ds-border-base)] bg-[var(--ds-bg-surface)] overflow-hidden">
          <div className="px-5 py-4 border-b border-[var(--ds-border-base)] bg-[var(--ds-bg-subtle)] flex items-center gap-2">
            <span className="text-xs font-semibold text-[var(--ds-text-secondary)]">Implementation</span>
          </div>
          <div className="p-5 flex flex-col gap-4">
            {CODE_EXAMPLES.map((ex) => (
              <div key={ex.label} className="flex flex-col gap-2">
                <SectionLabel>{ex.label}</SectionLabel>
                <pre className="text-xs font-mono bg-[var(--ds-bg-subtle)] text-[var(--ds-text-secondary)] p-4 rounded-lg overflow-x-auto whitespace-pre leading-relaxed">
                  {ex.code}
                </pre>
              </div>
            ))}
          </div>
        </div>
      </Section>

    </div>
  ),
};

export const ComplianceTheme: Story = {
  name: 'Comply AI — Blue',
  render: () => (
    <div data-theme="compliance" className="min-h-screen bg-[var(--ds-bg-base)] p-8 flex flex-col gap-6 max-w-2xl mx-auto">
      <div className="flex items-center gap-3">
        <span className="h-10 w-10 rounded-xl bg-[var(--ds-brand-600)] flex items-center justify-center text-white">
          <ShieldCheckIcon size={20} weight="duotone" />
        </span>
        <div>
          <p className="text-lg font-bold text-[var(--ds-text-primary)]">Comply AI</p>
          <p className="text-xs text-[var(--ds-text-muted)]">Compliance Risk Platform · Blue theme</p>
        </div>
      </div>
      <ThemePreview brand={BRANDS[0]} />
      <PaletteRow colors={BRANDS[0].colors} />
    </div>
  ),
};

export const ITOpsTheme: Story = {
  name: 'Ops AI — Violet',
  render: () => (
    <div data-theme="itops" className="min-h-screen bg-[var(--ds-bg-base)] p-8 flex flex-col gap-6 max-w-2xl mx-auto">
      <div className="flex items-center gap-3">
        <span className="h-10 w-10 rounded-xl bg-[var(--ds-brand-600)] flex items-center justify-center text-white">
          <GearIcon size={20} weight="duotone" />
        </span>
        <div>
          <p className="text-lg font-bold text-[var(--ds-text-primary)]">Ops AI</p>
          <p className="text-xs text-[var(--ds-text-muted)]">IT Ops AI Copilot · Violet theme</p>
        </div>
      </div>
      <ThemePreview brand={BRANDS[1]} />
      <PaletteRow colors={BRANDS[1].colors} />
    </div>
  ),
};

export const AnalyticsTheme: Story = {
  name: 'Clarity AI — Cyan',
  render: () => (
    <div data-theme="analytics" className="min-h-screen bg-[var(--ds-bg-base)] p-8 flex flex-col gap-6 max-w-2xl mx-auto">
      <div className="flex items-center gap-3">
        <span className="h-10 w-10 rounded-xl bg-[var(--ds-brand-600)] flex items-center justify-center text-white">
          <ChartBarIcon size={20} weight="duotone" />
        </span>
        <div>
          <p className="text-lg font-bold text-[var(--ds-text-primary)]">Clarity AI</p>
          <p className="text-xs text-[var(--ds-text-muted)]">Self-Serve Analytics · Cyan theme</p>
        </div>
      </div>
      <ThemePreview brand={BRANDS[2]} />
      <PaletteRow colors={BRANDS[2].colors} />
    </div>
  ),
};

export const SideBySide: Story = {
  name: 'All three — side by side',
  render: () => (
    <div className="min-h-screen bg-[var(--ds-bg-base)] p-8">
      <p className="text-xs font-semibold uppercase tracking-widest text-[var(--ds-text-muted)] mb-6 text-center">
        Same component tree · Three brand themes
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[1280px] mx-auto">
        {BRANDS.map((brand) => (
          <ThemePreview key={brand.key} brand={brand} />
        ))}
      </div>
    </div>
  ),
};
