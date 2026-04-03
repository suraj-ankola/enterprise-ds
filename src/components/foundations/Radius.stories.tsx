import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const SCALE = [
  { token: 'radius-none', tw: 'rounded-none',  value: '0px',    usage: 'Sharp edges — data tables, inline elements' },
  { token: 'radius-xs',   tw: 'rounded-xs',    value: '2px',    usage: 'Very subtle rounding — badges inside table cells' },
  { token: 'radius-sm',   tw: 'rounded-sm',    value: '4px',    usage: 'Small controls — checkboxes, small tags' },
  { token: 'radius-md',   tw: 'rounded-md',    value: '6px',    usage: 'Buttons (sm), inputs (sm), tooltips' },
  { token: 'radius-lg',   tw: 'rounded-lg',    value: '8px',    usage: 'Buttons (md/lg), inputs (md/lg), dropdowns' },
  { token: 'radius-xl',   tw: 'rounded-xl',    value: '12px',   usage: 'Cards, panels, modals — primary container radius' },
  { token: 'radius-2xl',  tw: 'rounded-2xl',   value: '16px',   usage: 'Feature cards, large panels' },
  { token: 'radius-3xl',  tw: 'rounded-3xl',   value: '24px',   usage: 'Callouts, AI chat bubbles' },
  { token: 'radius-full', tw: 'rounded-full',  value: '9999px', usage: 'Pills, avatars, toggle switches' },
];

function RadiusPage() {
  return (
    <div className="min-h-screen bg-[var(--ds-bg-base)] p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[var(--ds-text-primary)]">Border Radius</h1>
          <p className="mt-2 text-sm text-[var(--ds-text-secondary)] max-w-2xl">
            All radius values are defined as <code className="bg-[var(--ds-bg-subtle)] px-1 rounded text-xs">--radius-*</code> in <code className="bg-[var(--ds-bg-subtle)] px-1 rounded text-xs">globals.css @theme</code>.
            Use Tailwind's <code className="bg-[var(--ds-bg-subtle)] px-1 rounded text-xs">rounded-*</code> utilities in components.
          </p>
        </div>

        {/* Visual grid */}
        <div className="mb-10 grid grid-cols-3 gap-4 sm:grid-cols-4 lg:grid-cols-5">
          {SCALE.map(({ token, tw, value }) => (
            <div key={token} className="flex flex-col items-center gap-3 p-4 rounded-xl border border-[var(--ds-border-base)] bg-[var(--ds-bg-surface)]">
              <div
                className="h-16 w-16 border-2 border-blue-400 bg-blue-50 dark:bg-blue-950"
                style={{ borderRadius: value }}
              />
              <div className="text-center">
                <p className="text-xs font-semibold text-[var(--ds-text-primary)]">{value}</p>
                <p className="font-mono text-[10px] text-[var(--ds-text-muted)] mt-0.5">{tw}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Usage table */}
        <div>
          <h2 className="text-base font-semibold text-[var(--ds-text-primary)] mb-4">Usage Reference</h2>
          <div className="rounded-xl border border-[var(--ds-border-base)] bg-[var(--ds-bg-surface)] overflow-hidden">
            <div className="grid grid-cols-[36px_100px_70px_1fr] gap-4 px-5 py-2.5 bg-[var(--ds-bg-subtle)] border-b border-[var(--ds-border-base)]">
              {['', 'Token', 'Value', 'Usage'].map(h => (
                <span key={h} className="text-[10px] font-semibold uppercase tracking-wider text-[var(--ds-text-muted)]">{h}</span>
              ))}
            </div>
            {SCALE.map(({ token, tw, value, usage }) => (
              <div key={token} className="grid grid-cols-[36px_100px_70px_1fr] gap-4 items-center px-5 py-3 border-b border-[var(--ds-border-base)] last:border-0">
                <div
                  className="h-7 w-7 border-2 border-blue-400 bg-blue-50 dark:bg-blue-950 shrink-0"
                  style={{ borderRadius: value }}
                />
                <span className="font-mono text-[11px] text-[var(--ds-text-muted)]">{tw}</span>
                <span className="font-mono text-[11px] text-[var(--ds-text-muted)]">{value}</span>
                <span className="text-sm text-[var(--ds-text-secondary)]">{usage}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const meta: Meta = {
  title: 'Foundations/Radius',
  parameters: { layout: 'fullscreen' },
};
export default meta;

export const RadiusScale: StoryObj = {
  name: 'Radius Scale',
  render: () => <RadiusPage />,
};
