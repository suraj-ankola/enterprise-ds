import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-10">
      <h2 className="text-base font-semibold text-[var(--ds-text-primary)] mb-4">{title}</h2>
      {children}
    </div>
  );
}

function Row({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-baseline gap-4 py-3 border-b border-[var(--ds-border-base)] last:border-0">
      {children}
    </div>
  );
}

function Meta({ children }: { children: React.ReactNode }) {
  return <span className="shrink-0 w-32 font-mono text-[10px] text-[var(--ds-text-muted)]">{children}</span>;
}

const TYPE_SCALE = [
  { name: 'text-4xl', size: '36px / 2.25rem', lh: '40px',  tw: 'text-4xl', weight: 'font-bold',     sample: 'Enterprise Dashboard' },
  { name: 'text-3xl', size: '30px / 1.875rem', lh: '36px', tw: 'text-3xl', weight: 'font-bold',     sample: 'Vendor Risk Overview' },
  { name: 'text-2xl', size: '24px / 1.5rem',  lh: '32px',  tw: 'text-2xl', weight: 'font-semibold', sample: 'Section Heading' },
  { name: 'text-xl',  size: '20px / 1.25rem', lh: '28px',  tw: 'text-xl',  weight: 'font-semibold', sample: 'Card Title' },
  { name: 'text-lg',  size: '18px / 1.125rem', lh: '28px', tw: 'text-lg',  weight: 'font-medium',   sample: 'Sub-heading' },
  { name: 'text-base',size: '16px / 1rem',    lh: '24px',  tw: 'text-base',weight: 'font-normal',   sample: 'Body text — primary content' },
  { name: 'text-sm',  size: '14px / 0.875rem', lh: '20px', tw: 'text-sm',  weight: 'font-normal',   sample: 'Secondary text, labels, inputs' },
  { name: 'text-xs',  size: '12px / 0.75rem', lh: '16px',  tw: 'text-xs',  weight: 'font-medium',   sample: 'Captions, badges, timestamps' },
];

const WEIGHTS = [
  { name: 'Regular',  tw: 'font-normal',   value: 400, sample: 'The quick brown fox jumps over the lazy dog.' },
  { name: 'Medium',   tw: 'font-medium',   value: 500, sample: 'The quick brown fox jumps over the lazy dog.' },
  { name: 'Semibold', tw: 'font-semibold', value: 600, sample: 'The quick brown fox jumps over the lazy dog.' },
  { name: 'Bold',     tw: 'font-bold',     value: 700, sample: 'The quick brown fox jumps over the lazy dog.' },
];

const TRACKING = [
  { name: 'Tight',   tw: 'tracking-tight',   value: '-0.025em', sample: 'Tight letter spacing — headlines' },
  { name: 'Normal',  tw: 'tracking-normal',  value: '0em',      sample: 'Normal letter spacing — body text' },
  { name: 'Wide',    tw: 'tracking-wide',    value: '0.025em',  sample: 'Wide letter spacing — subheadings' },
  { name: 'Widest',  tw: 'tracking-widest',  value: '0.1em',    sample: 'WIDEST — LABELS, TAGS, ALLCAPS' },
];

const LINE_HEIGHTS = [
  { name: 'None',    tw: 'leading-none',    value: 1,     sample: 'The quick brown fox\njumps over the lazy dog.' },
  { name: 'Tight',   tw: 'leading-tight',   value: 1.25,  sample: 'The quick brown fox\njumps over the lazy dog.' },
  { name: 'Normal',  tw: 'leading-normal',  value: 1.5,   sample: 'The quick brown fox\njumps over the lazy dog.' },
  { name: 'Relaxed', tw: 'leading-relaxed', value: 1.625, sample: 'The quick brown fox\njumps over the lazy dog.' },
  { name: 'Loose',   tw: 'leading-loose',   value: 2,     sample: 'The quick brown fox\njumps over the lazy dog.' },
];

function TypographyPage() {
  return (
    <div className="min-h-screen bg-[var(--ds-bg-base)] p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[var(--ds-text-primary)]">Typography</h1>
          <p className="mt-2 text-sm text-[var(--ds-text-secondary)] max-w-2xl">
            Font: <strong>Inter</strong>. All type tokens are defined in <code className="bg-[var(--ds-bg-subtle)] px-1 rounded text-xs">globals.css @theme</code>.
            Use Tailwind classes (<code className="bg-[var(--ds-bg-subtle)] px-1 rounded text-xs">text-sm</code>, <code className="bg-[var(--ds-bg-subtle)] px-1 rounded text-xs">font-semibold</code>) in components.
          </p>
        </div>

        {/* Type Scale */}
        <Section title="Type Scale">
          <div className="rounded-xl border border-[var(--ds-border-base)] bg-[var(--ds-bg-surface)] overflow-hidden">
            <div className="grid grid-cols-[100px_1fr_80px_80px] gap-4 px-5 py-2.5 bg-[var(--ds-bg-subtle)] border-b border-[var(--ds-border-base)]">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--ds-text-muted)]">Token</span>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--ds-text-muted)]">Preview</span>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--ds-text-muted)]">Size</span>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--ds-text-muted)]">Line H.</span>
            </div>
            {TYPE_SCALE.map(({ name, size, lh, tw, weight, sample }) => (
              <div key={name} className="grid grid-cols-[100px_1fr_80px_80px] gap-4 items-center px-5 py-3 border-b border-[var(--ds-border-base)] last:border-0">
                <span className="font-mono text-[11px] text-[var(--ds-text-muted)] shrink-0">{name}</span>
                <span className={`${tw} ${weight} text-[var(--ds-text-primary)] truncate`}>{sample}</span>
                <span className="font-mono text-[10px] text-[var(--ds-text-muted)]">{size}</span>
                <span className="font-mono text-[10px] text-[var(--ds-text-muted)]">{lh}</span>
              </div>
            ))}
          </div>
        </Section>

        {/* Font Weights */}
        <Section title="Font Weights">
          <div className="rounded-xl border border-[var(--ds-border-base)] bg-[var(--ds-bg-surface)] divide-y divide-[var(--ds-border-base)] overflow-hidden">
            {WEIGHTS.map(({ name, tw, value, sample }) => (
              <div key={name} className="flex items-center gap-6 px-5 py-4">
                <div className="w-28 shrink-0">
                  <p className="text-xs font-medium text-[var(--ds-text-primary)]">{name}</p>
                  <p className="font-mono text-[10px] text-[var(--ds-text-muted)]">{tw} / {value}</p>
                </div>
                <p className={`${tw} text-base text-[var(--ds-text-primary)]`}>{sample}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Letter Spacing */}
        <Section title="Letter Spacing">
          <div className="rounded-xl border border-[var(--ds-border-base)] bg-[var(--ds-bg-surface)] divide-y divide-[var(--ds-border-base)] overflow-hidden">
            {TRACKING.map(({ name, tw, value, sample }) => (
              <div key={name} className="flex items-center gap-6 px-5 py-4">
                <div className="w-28 shrink-0">
                  <p className="text-xs font-medium text-[var(--ds-text-primary)]">{name}</p>
                  <p className="font-mono text-[10px] text-[var(--ds-text-muted)]">{tw} / {value}</p>
                </div>
                <p className={`${tw} text-base text-[var(--ds-text-secondary)]`}>{sample}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Line Heights */}
        <Section title="Line Heights">
          <div className="grid grid-cols-5 gap-3">
            {LINE_HEIGHTS.map(({ name, tw, value, sample }) => (
              <div key={name} className="rounded-xl border border-[var(--ds-border-base)] bg-[var(--ds-bg-surface)] p-4">
                <p className="text-xs font-semibold text-[var(--ds-text-primary)] mb-1">{name}</p>
                <p className="font-mono text-[10px] text-[var(--ds-text-muted)] mb-3">{tw} · {value}</p>
                <p className={`${tw} text-sm text-[var(--ds-text-secondary)] whitespace-pre-line`}>{sample}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Font Families */}
        <Section title="Font Families">
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-xl border border-[var(--ds-border-base)] bg-[var(--ds-bg-surface)] p-5">
              <p className="font-mono text-[10px] text-[var(--ds-text-muted)] mb-1">--font-sans · font-sans</p>
              <p className="text-2xl font-semibold font-sans text-[var(--ds-text-primary)]">Inter</p>
              <p className="mt-2 text-sm font-sans text-[var(--ds-text-secondary)]">
                ABCDEFGHIJKLMNOPQRSTUVWXYZ<br />
                abcdefghijklmnopqrstuvwxyz<br />
                0123456789 !@#$%^&*()
              </p>
              <p className="mt-2 text-[10px] text-[var(--ds-text-muted)]">Used for: All UI text, headings, labels, body</p>
            </div>
            <div className="rounded-xl border border-[var(--ds-border-base)] bg-[var(--ds-bg-surface)] p-5">
              <p className="font-mono text-[10px] text-[var(--ds-text-muted)] mb-1">--font-mono · font-mono</p>
              <p className="text-2xl font-semibold font-mono text-[var(--ds-text-primary)]">Monospace</p>
              <p className="mt-2 text-sm font-mono text-[var(--ds-text-secondary)]">
                ABCDEFGHIJKLMNOPQRSTUVWXYZ<br />
                abcdefghijklmnopqrstuvwxyz<br />
                0123456789 !@#$%^&*()
              </p>
              <p className="mt-2 text-[10px] text-[var(--ds-text-muted)]">Used for: Code, tokens, API keys, IDs</p>
            </div>
          </div>
        </Section>
      </div>
    </div>
  );
}

const meta: Meta = {
  title: 'Foundations/Typography',
  parameters: { layout: 'fullscreen' },
};
export default meta;

export const TypeSystem: StoryObj = {
  name: 'Type System',
  render: () => <TypographyPage />,
};
