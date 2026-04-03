import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const SCALE = [
  { token: '0',   tw: 'p-0',   px: 0,  rem: '0rem' },
  { token: '0.5', tw: 'p-0.5', px: 2,  rem: '0.125rem' },
  { token: '1',   tw: 'p-1',   px: 4,  rem: '0.25rem' },
  { token: '1.5', tw: 'p-1.5', px: 6,  rem: '0.375rem' },
  { token: '2',   tw: 'p-2',   px: 8,  rem: '0.5rem' },
  { token: '2.5', tw: 'p-2.5', px: 10, rem: '0.625rem' },
  { token: '3',   tw: 'p-3',   px: 12, rem: '0.75rem' },
  { token: '3.5', tw: 'p-3.5', px: 14, rem: '0.875rem' },
  { token: '4',   tw: 'p-4',   px: 16, rem: '1rem' },
  { token: '5',   tw: 'p-5',   px: 20, rem: '1.25rem' },
  { token: '6',   tw: 'p-6',   px: 24, rem: '1.5rem' },
  { token: '7',   tw: 'p-7',   px: 28, rem: '1.75rem' },
  { token: '8',   tw: 'p-8',   px: 32, rem: '2rem' },
  { token: '10',  tw: 'p-10',  px: 40, rem: '2.5rem' },
  { token: '12',  tw: 'p-12',  px: 48, rem: '3rem' },
  { token: '16',  tw: 'p-16',  px: 64, rem: '4rem' },
  { token: '20',  tw: 'p-20',  px: 80, rem: '5rem' },
  { token: '24',  tw: 'p-24',  px: 96, rem: '6rem' },
];

const COMPONENT_SPACING = [
  { usage: 'Icon gap in button (sm)',    token: '1.5', px: 6  },
  { usage: 'Icon gap in button (md/lg)', token: '2',   px: 8  },
  { usage: 'Input horizontal padding',   token: '3',   px: 12 },
  { usage: 'Card padding (sm)',          token: '3',   px: 12 },
  { usage: 'Card padding (md)',          token: '5',   px: 20 },
  { usage: 'Card padding (lg)',          token: '6',   px: 24 },
  { usage: 'Section gap',               token: '10',  px: 40 },
  { usage: 'Page padding',              token: '8',   px: 32 },
];

function SpacingPage() {
  return (
    <div className="min-h-screen bg-[var(--ds-bg-base)] p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[var(--ds-text-primary)]">Spacing</h1>
          <p className="mt-2 text-sm text-[var(--ds-text-secondary)] max-w-2xl">
            Based on a <strong>4px base unit</strong>. Every spacing value is a multiple of 4px.
            Use Tailwind's spacing utilities (<code className="bg-[var(--ds-bg-subtle)] px-1 rounded text-xs">p-4</code>,
            <code className="bg-[var(--ds-bg-subtle)] px-1 rounded text-xs">gap-6</code>,
            <code className="bg-[var(--ds-bg-subtle)] px-1 rounded text-xs">mt-2</code>, etc.) in components.
          </p>
        </div>

        {/* Visual scale */}
        <div className="mb-10">
          <h2 className="text-base font-semibold text-[var(--ds-text-primary)] mb-4">Spacing Scale</h2>
          <div className="rounded-xl border border-[var(--ds-border-base)] bg-[var(--ds-bg-surface)] overflow-hidden">
            <div className="grid grid-cols-[60px_1fr_60px_80px] gap-4 px-5 py-2.5 bg-[var(--ds-bg-subtle)] border-b border-[var(--ds-border-base)]">
              {['Token', 'Visual', 'px', 'rem'].map(h => (
                <span key={h} className="text-[10px] font-semibold uppercase tracking-wider text-[var(--ds-text-muted)]">{h}</span>
              ))}
            </div>
            {SCALE.filter(s => s.px > 0).map(({ token, px, rem }) => (
              <div key={token} className="grid grid-cols-[60px_1fr_60px_80px] gap-4 items-center px-5 py-2.5 border-b border-[var(--ds-border-base)] last:border-0">
                <span className="font-mono text-xs text-[var(--ds-text-muted)]">{token}</span>
                <div className="flex items-center">
                  <div
                    className="h-5 rounded-sm bg-blue-500 opacity-70"
                    style={{ width: Math.min(px, 320) }}
                  />
                </div>
                <span className="font-mono text-xs text-[var(--ds-text-muted)]">{px}px</span>
                <span className="font-mono text-xs text-[var(--ds-text-muted)]">{rem}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Usage reference */}
        <div>
          <h2 className="text-base font-semibold text-[var(--ds-text-primary)] mb-4">Component Usage Reference</h2>
          <div className="rounded-xl border border-[var(--ds-border-base)] bg-[var(--ds-bg-surface)] overflow-hidden">
            <div className="grid grid-cols-[1fr_80px_60px] gap-4 px-5 py-2.5 bg-[var(--ds-bg-subtle)] border-b border-[var(--ds-border-base)]">
              {['Usage', 'Token', 'px'].map(h => (
                <span key={h} className="text-[10px] font-semibold uppercase tracking-wider text-[var(--ds-text-muted)]">{h}</span>
              ))}
            </div>
            {COMPONENT_SPACING.map(({ usage, token, px }) => (
              <div key={usage} className="grid grid-cols-[1fr_80px_60px] gap-4 items-center px-5 py-3 border-b border-[var(--ds-border-base)] last:border-0">
                <span className="text-sm text-[var(--ds-text-primary)]">{usage}</span>
                <span className="font-mono text-xs text-[var(--ds-text-muted)]">{token}</span>
                <span className="font-mono text-xs text-[var(--ds-text-muted)]">{px}px</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const meta: Meta = {
  title: 'Foundations/Spacing',
  parameters: { layout: 'fullscreen' },
};
export default meta;

export const SpacingScale: StoryObj = {
  name: 'Spacing Scale',
  render: () => <SpacingPage />,
};
