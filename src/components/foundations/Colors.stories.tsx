import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function Section({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return (
    <div className="mb-10">
      <h2 className="text-base font-semibold text-[var(--ds-text-primary)]">{title}</h2>
      {description && <p className="mt-0.5 text-sm text-[var(--ds-text-secondary)] mb-4">{description}</p>}
      {!description && <div className="mb-4" />}
      {children}
    </div>
  );
}

function Swatch({ name, cssVar, hex, textDark = false }: { name: string; cssVar?: string; hex: string; textDark?: boolean }) {
  const copy = () => navigator.clipboard.writeText(cssVar ?? hex).catch(() => {});
  return (
    <button
      onClick={copy}
      title={`Click to copy ${cssVar ?? hex}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-[var(--ds-border-base)] transition-all hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
    >
      <div className="h-16 w-full" style={{ backgroundColor: hex }} />
      <div className="bg-[var(--ds-bg-surface)] px-3 py-2 text-left">
        <p className={`text-xs font-semibold text-[var(--ds-text-primary)]`}>{name}</p>
        <p className="font-mono text-[10px] text-[var(--ds-text-muted)] mt-0.5">{hex}</p>
        {cssVar && <p className="font-mono text-[10px] text-[var(--ds-text-muted)] truncate">{cssVar}</p>}
      </div>
    </button>
  );
}

function SemanticRow({ token, lightHex, darkHex, usage }: { token: string; lightHex: string; darkHex: string; usage: string }) {
  return (
    <div className="flex items-center gap-4 py-3 border-b border-[var(--ds-border-base)] last:border-0">
      <div className="flex gap-2 shrink-0">
        <div className="h-8 w-8 rounded-md border border-[var(--ds-border-base)]" style={{ backgroundColor: lightHex }} title={`Light: ${lightHex}`} />
        <div className="h-8 w-8 rounded-md border border-[var(--ds-border-base)]" style={{ backgroundColor: darkHex }} title={`Dark: ${darkHex}`} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="font-mono text-xs font-medium text-[var(--ds-text-primary)]">{token}</p>
        <p className="text-xs text-[var(--ds-text-muted)] mt-0.5">{usage}</p>
      </div>
      <div className="shrink-0 text-right">
        <p className="font-mono text-[10px] text-[var(--ds-text-muted)]">{lightHex}</p>
        <p className="font-mono text-[10px] text-[var(--ds-text-muted)]">{darkHex}</p>
      </div>
    </div>
  );
}

// ─── Color data ───────────────────────────────────────────────────────────────

const BRAND = [
  { step: '50',  hex: '#eff6ff' }, { step: '100', hex: '#dbeafe' },
  { step: '200', hex: '#bfdbfe' }, { step: '300', hex: '#93c5fd' },
  { step: '400', hex: '#60a5fa' }, { step: '500', hex: '#3b82f6' },
  { step: '600', hex: '#2563eb' }, { step: '700', hex: '#1d4ed8' },
  { step: '800', hex: '#1e40af' }, { step: '900', hex: '#1e3a8a' },
];

const NEUTRAL = [
  { step: '50',  hex: '#f8fafc' }, { step: '100', hex: '#f1f5f9' },
  { step: '200', hex: '#e2e8f0' }, { step: '300', hex: '#cbd5e1' },
  { step: '400', hex: '#94a3b8' }, { step: '500', hex: '#64748b' },
  { step: '600', hex: '#475569' }, { step: '700', hex: '#334155' },
  { step: '800', hex: '#1e293b' }, { step: '900', hex: '#0f172a' },
];

const STATUS = [
  { name: 'Success',  steps: [{ l: '#dcfce7', d: '#052e16' }, { l: '#16a34a', d: '#4ade80' }, { l: '#14532d', d: '#166534' }], labels: ['100', '600', '900'] },
  { name: 'Warning',  steps: [{ l: '#fef3c7', d: '#451a03' }, { l: '#d97706', d: '#fbbf24' }, { l: '#78350f', d: '#92400e' }], labels: ['100', '600', '900'] },
  { name: 'Danger',   steps: [{ l: '#fee2e2', d: '#450a0a' }, { l: '#dc2626', d: '#f87171' }, { l: '#7f1d1d', d: '#991b1b' }], labels: ['100', '600', '900'] },
  { name: 'Info',     steps: [{ l: '#e0f2fe', d: '#082f49' }, { l: '#0284c7', d: '#38bdf8' }, { l: '#0c4a6e', d: '#075985' }], labels: ['100', '600', '900'] },
];

const SEMANTIC_ROWS = [
  { token: '--ds-bg-base',     lightHex: '#f8fafc', darkHex: '#0f172a', usage: 'Page canvas / main background' },
  { token: '--ds-bg-surface',  lightHex: '#ffffff', darkHex: '#1e293b', usage: 'Cards, panels, sidebars' },
  { token: '--ds-bg-raised',   lightHex: '#ffffff', darkHex: '#334155', usage: 'Modals, popovers, dropdowns' },
  { token: '--ds-bg-subtle',   lightHex: '#f1f5f9', darkHex: '#1e293b', usage: 'Hover states, tags, subtle fills' },
  { token: '--ds-text-primary',   lightHex: '#0f172a', darkHex: '#f1f5f9', usage: 'Main body text, headings' },
  { token: '--ds-text-secondary', lightHex: '#475569', darkHex: '#94a3b8', usage: 'Supporting text, subtitles' },
  { token: '--ds-text-muted',     lightHex: '#94a3b8', darkHex: '#64748b', usage: 'Placeholders, timestamps, hints' },
  { token: '--ds-text-disabled',  lightHex: '#cbd5e1', darkHex: '#475569', usage: 'Disabled labels, inactive items' },
  { token: '--ds-border-base',    lightHex: '#e2e8f0', darkHex: '#334155', usage: 'Default borders, dividers' },
  { token: '--ds-border-strong',  lightHex: '#cbd5e1', darkHex: '#475569', usage: 'Emphasized borders' },
  { token: '--ds-border-focus',   lightHex: '#3b82f6', darkHex: '#60a5fa', usage: 'Focus ring color' },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

function ColorsPage() {
  return (
    <div className="min-h-screen bg-[var(--ds-bg-base)] p-8 font-sans">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[var(--ds-text-primary)]">Colors</h1>
          <p className="mt-2 text-sm text-[var(--ds-text-secondary)] max-w-2xl">
            All colors are defined in <code className="bg-[var(--ds-bg-subtle)] px-1 rounded text-xs">src/app/globals.css</code>.
            Raw palette tokens are accessible as Tailwind utilities (e.g. <code className="bg-[var(--ds-bg-subtle)] px-1 rounded text-xs">bg-brand-600</code>).
            Semantic tokens adapt between light and dark mode. Click any swatch to copy.
          </p>
        </div>

        {/* Brand */}
        <Section title="Brand — Blue" description="Primary action color. Use brand-600 for CTAs, links, and focus rings.">
          <div className="grid grid-cols-5 gap-2 sm:grid-cols-10">
            {BRAND.map(({ step, hex }) => (
              <Swatch key={step} name={step} cssVar={`--color-brand-${step}`} hex={hex} textDark={parseInt(step) >= 500} />
            ))}
          </div>
        </Section>

        {/* Neutral */}
        <Section title="Neutral — Slate" description="Text, borders, backgrounds. The backbone of every surface.">
          <div className="grid grid-cols-5 gap-2 sm:grid-cols-10">
            {NEUTRAL.map(({ step, hex }) => (
              <Swatch key={step} name={step} cssVar={`--color-neutral-${step}`} hex={hex} textDark={parseInt(step) >= 500} />
            ))}
          </div>
        </Section>

        {/* Status */}
        <Section title="Status Colors" description="Communicate success, warnings, errors, and information. Each has 3 steps: background, primary, dark.">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
            {STATUS.map(({ name, steps, labels }) => (
              <div key={name}>
                <p className="mb-2 text-xs font-semibold text-[var(--ds-text-secondary)]">{name}</p>
                <div className="flex gap-1.5">
                  {steps.map(({ l }, i) => (
                    <div key={i} className="flex-1">
                      <div className="h-10 rounded-lg border border-[var(--ds-border-base)]" style={{ backgroundColor: l }} />
                      <p className="mt-1 text-center font-mono text-[9px] text-[var(--ds-text-muted)]">{labels[i]}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Semantic */}
        <Section title="Semantic Tokens" description="Runtime tokens that swap between light (left swatch) and dark (right swatch). Use var(--ds-*) in components.">
          <div className="rounded-xl border border-[var(--ds-border-base)] bg-[var(--ds-bg-surface)] overflow-hidden">
            <div className="flex items-center gap-4 px-4 py-2.5 bg-[var(--ds-bg-subtle)] border-b border-[var(--ds-border-base)]">
              <div className="flex gap-2 shrink-0 text-[10px] font-medium text-[var(--ds-text-muted)]">
                <span className="w-8 text-center">Light</span>
                <span className="w-8 text-center">Dark</span>
              </div>
              <span className="text-xs font-semibold text-[var(--ds-text-secondary)]">Token</span>
              <span className="flex-1 text-xs font-semibold text-[var(--ds-text-secondary)]">Usage</span>
            </div>
            <div className="px-4">
              {SEMANTIC_ROWS.map((row) => (
                <SemanticRow key={row.token} {...row} />
              ))}
            </div>
          </div>
        </Section>
      </div>
    </div>
  );
}

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta = {
  title: 'Foundations/Colors',
  parameters: { layout: 'fullscreen' },
};
export default meta;

export const AllColors: StoryObj = {
  name: 'Color System',
  render: () => <ColorsPage />,
};
