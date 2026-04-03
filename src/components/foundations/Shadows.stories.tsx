import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const SCALE = [
  { token: 'shadow-none', tw: 'shadow-none', value: 'none',                   usage: 'Reset / no shadow' },
  { token: 'shadow-xs',   tw: 'shadow-xs',   value: '0 1px 2px 0 rgb(0 0 0 / 0.05)',                                               usage: 'Subtle lift — inputs on focus, disabled state' },
  { token: 'shadow-sm',   tw: 'shadow-sm',   value: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',              usage: 'Buttons, small cards, tags' },
  { token: 'shadow-md',   tw: 'shadow-md',   value: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',           usage: 'Elevated cards, hover states — default card elevation' },
  { token: 'shadow-lg',   tw: 'shadow-lg',   value: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',         usage: 'Dropdown menus, popovers' },
  { token: 'shadow-xl',   tw: 'shadow-xl',   value: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',        usage: 'Modals, side panels' },
  { token: 'shadow-2xl',  tw: 'shadow-2xl',  value: '0 25px 50px -12px rgb(0 0 0 / 0.25)',                                         usage: 'Full-page overlays, command palettes' },
];

function ShadowsPage() {
  return (
    <div className="min-h-screen bg-[var(--ds-bg-base)] p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[var(--ds-text-primary)]">Shadows</h1>
          <p className="mt-2 text-sm text-[var(--ds-text-secondary)] max-w-2xl">
            Shadows communicate <strong>elevation</strong> — how far an element sits above the canvas.
            Defined as <code className="bg-[var(--ds-bg-subtle)] px-1 rounded text-xs">--shadow-*</code> in <code className="bg-[var(--ds-bg-subtle)] px-1 rounded text-xs">globals.css @theme</code>.
            Use <code className="bg-[var(--ds-bg-subtle)] px-1 rounded text-xs">shadow-*</code> utilities in components.
          </p>
        </div>

        {/* Visual grid */}
        <div className="mb-10 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
          {SCALE.filter(s => s.token !== 'shadow-none').map(({ token, tw, value }) => (
            <div key={token} className="flex flex-col items-center gap-4 p-4 rounded-xl bg-[var(--ds-bg-base)]">
              <div
                className="h-20 w-full rounded-xl bg-[var(--ds-bg-surface)]"
                style={{ boxShadow: value }}
              />
              <div className="w-full">
                <p className="text-xs font-semibold text-[var(--ds-text-primary)]">{tw}</p>
                <p className="font-mono text-[10px] text-[var(--ds-text-muted)] mt-0.5 truncate">{token}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Usage table */}
        <div>
          <h2 className="text-base font-semibold text-[var(--ds-text-primary)] mb-4">Elevation Reference</h2>
          <div className="rounded-xl border border-[var(--ds-border-base)] bg-[var(--ds-bg-surface)] overflow-hidden">
            <div className="grid grid-cols-[40px_100px_1fr] gap-4 px-5 py-2.5 bg-[var(--ds-bg-subtle)] border-b border-[var(--ds-border-base)]">
              {['', 'Utility', 'When to use'].map(h => (
                <span key={h} className="text-[10px] font-semibold uppercase tracking-wider text-[var(--ds-text-muted)]">{h}</span>
              ))}
            </div>
            {SCALE.map(({ token, tw, value, usage }) => (
              <div key={token} className="grid grid-cols-[40px_100px_1fr] gap-4 items-center px-5 py-3.5 border-b border-[var(--ds-border-base)] last:border-0">
                <div
                  className="h-8 w-8 rounded-lg bg-[var(--ds-bg-surface)] shrink-0"
                  style={{ boxShadow: value }}
                />
                <span className="font-mono text-[11px] text-[var(--ds-text-muted)]">{tw}</span>
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
  title: 'Foundations/Shadows',
  parameters: { layout: 'fullscreen' },
};
export default meta;

export const ShadowScale: StoryObj = {
  name: 'Shadow Scale',
  render: () => <ShadowsPage />,
};
