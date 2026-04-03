import React, { useRef } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const SPECS = [
  { label: 'Style',   value: 'solid outline' },
  { label: 'Width',   value: '2px' },
  { label: 'Offset',  value: '2px' },
  { label: 'Color (default)', value: '#3b82f6 — brand-500' },
  { label: 'Color (danger)',  value: '#dc2626 — danger-600' },
  { label: 'Color (dark mode)',value: '#60a5fa — brand-400' },
  { label: 'Trigger', value: ':focus-visible only — not :focus (avoids mouse-click rings)' },
];

const Z_INDEX = [
  { token: '--ds-z-base',     value: 0,   usage: 'Normal document flow' },
  { token: '--ds-z-raised',   value: 10,  usage: 'Raised elements, sticky headers' },
  { token: '--ds-z-dropdown', value: 100, usage: 'Dropdowns, select menus, tooltips' },
  { token: '--ds-z-sticky',   value: 200, usage: 'Sticky nav, floating action buttons' },
  { token: '--ds-z-overlay',  value: 300, usage: 'Background overlays' },
  { token: '--ds-z-modal',    value: 400, usage: 'Modal dialogs, drawers' },
  { token: '--ds-z-toast',    value: 500, usage: 'Toast notifications' },
  { token: '--ds-z-tooltip',  value: 600, usage: 'Tooltips — always on top' },
];

const MOTION = [
  { category: 'Duration', tokens: [
    { name: 'Fast',  var: '--ds-duration-fast',  value: '100ms', usage: 'Micro-animations, hover fills' },
    { name: 'Base',  var: '--ds-duration-base',  value: '150ms', usage: 'Button transitions, border changes' },
    { name: 'Slow',  var: '--ds-duration-slow',  value: '300ms', usage: 'Modals, panels, page transitions' },
  ]},
  { category: 'Easing', tokens: [
    { name: 'Default', var: '--ds-ease-default', value: 'cubic-bezier(0.4, 0, 0.2, 1)',    usage: 'General transitions — most common' },
    { name: 'In',      var: '--ds-ease-in',      value: 'cubic-bezier(0.4, 0, 1, 1)',       usage: 'Elements exiting the screen' },
    { name: 'Out',     var: '--ds-ease-out',      value: 'cubic-bezier(0, 0, 0.2, 1)',      usage: 'Elements entering the screen' },
    { name: 'Spring',  var: '--ds-ease-spring',   value: 'cubic-bezier(0.34, 1.56, 0.64, 1)', usage: 'Bouncy, playful — notifications, badges' },
  ]},
];

function FocusRingPage() {
  return (
    <div className="min-h-screen bg-[var(--ds-bg-base)] p-8 font-sans">
      <div className="max-w-4xl mx-auto">

        {/* Focus Ring */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[var(--ds-text-primary)]">Focus Ring</h1>
          <p className="mt-2 text-sm text-[var(--ds-text-secondary)] max-w-2xl">
            Consistent keyboard focus indicator for all interactive elements.
            Only visible on <code className="bg-[var(--ds-bg-subtle)] px-1 rounded text-xs">:focus-visible</code> — not on mouse clicks.
            Tab through the examples below to see it in action.
          </p>
        </div>

        {/* Spec */}
        <div className="mb-8">
          <h2 className="text-base font-semibold text-[var(--ds-text-primary)] mb-4">Specification</h2>
          <div className="rounded-xl border border-[var(--ds-border-base)] bg-[var(--ds-bg-surface)] overflow-hidden">
            {SPECS.map(({ label, value }) => (
              <div key={label} className="flex gap-6 px-5 py-3 border-b border-[var(--ds-border-base)] last:border-0">
                <span className="w-40 shrink-0 text-xs font-medium text-[var(--ds-text-secondary)]">{label}</span>
                <span className="font-mono text-xs text-[var(--ds-text-primary)]">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Live demos */}
        <div className="mb-10">
          <h2 className="text-base font-semibold text-[var(--ds-text-primary)] mb-2">Live Examples</h2>
          <p className="text-sm text-[var(--ds-text-muted)] mb-4">Press <kbd className="px-1.5 py-0.5 rounded border border-[var(--ds-border-strong)] text-[10px] font-mono bg-[var(--ds-bg-subtle)]">Tab</kbd> to move focus and see rings.</p>
          <div className="flex flex-wrap gap-4 p-6 rounded-xl border border-[var(--ds-border-base)] bg-[var(--ds-bg-surface)]">
            <button className="focus-ring h-9 px-4 rounded-lg bg-blue-600 text-white text-sm font-semibold">
              Primary Button
            </button>
            <button className="focus-ring h-9 px-4 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-sm font-semibold text-slate-800 dark:text-slate-100">
              Secondary Button
            </button>
            <button className="focus-ring h-9 px-4 rounded-lg bg-red-600 text-white text-sm font-semibold" style={{ ['--color-focus-ring' as string]: '#dc2626' }}>
              Danger Button
            </button>
            <input
              className="focus-ring h-9 px-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-slate-100 w-48"
              placeholder="Text input"
            />
            <a href="#" className="focus-ring text-sm text-blue-600 dark:text-blue-400 underline rounded">
              Hyperlink
            </a>
            <select className="focus-ring h-9 px-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-slate-100">
              <option>Select option</option>
              <option>Option A</option>
            </select>
          </div>
        </div>

        {/* Z-index */}
        <div className="mb-10">
          <h2 className="text-base font-semibold text-[var(--ds-text-primary)] mb-1">Z-Index Scale</h2>
          <p className="text-sm text-[var(--ds-text-muted)] mb-4">Defined as <code className="bg-[var(--ds-bg-subtle)] px-1 rounded text-xs">--ds-z-*</code> in <code className="bg-[var(--ds-bg-subtle)] px-1 rounded text-xs">:root</code>. Use via <code className="bg-[var(--ds-bg-subtle)] px-1 rounded text-xs">style={`{{ zIndex: 'var(--ds-z-modal)' }}`}</code> or map to Tailwind z-index utilities.</p>
          <div className="rounded-xl border border-[var(--ds-border-base)] bg-[var(--ds-bg-surface)] overflow-hidden">
            <div className="grid grid-cols-[1fr_60px_1fr] gap-4 px-5 py-2.5 bg-[var(--ds-bg-subtle)] border-b border-[var(--ds-border-base)]">
              {['Token', 'Value', 'Usage'].map(h => (
                <span key={h} className="text-[10px] font-semibold uppercase tracking-wider text-[var(--ds-text-muted)]">{h}</span>
              ))}
            </div>
            {Z_INDEX.map(({ token, value, usage }) => (
              <div key={token} className="grid grid-cols-[1fr_60px_1fr] gap-4 items-center px-5 py-3 border-b border-[var(--ds-border-base)] last:border-0">
                <span className="font-mono text-[11px] text-[var(--ds-text-primary)]">{token}</span>
                <span className="font-mono text-xs text-[var(--ds-text-muted)]">{value}</span>
                <span className="text-sm text-[var(--ds-text-secondary)]">{usage}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Motion */}
        <div>
          <h2 className="text-base font-semibold text-[var(--ds-text-primary)] mb-1">Motion Tokens</h2>
          <p className="text-sm text-[var(--ds-text-muted)] mb-4">Defined as <code className="bg-[var(--ds-bg-subtle)] px-1 rounded text-xs">--ds-duration-*</code> and <code className="bg-[var(--ds-bg-subtle)] px-1 rounded text-xs">--ds-ease-*</code> in <code className="bg-[var(--ds-bg-subtle)] px-1 rounded text-xs">:root</code>.</p>
          <div className="space-y-4">
            {MOTION.map(({ category, tokens }) => (
              <div key={category}>
                <p className="text-xs font-semibold text-[var(--ds-text-secondary)] mb-2">{category}</p>
                <div className="rounded-xl border border-[var(--ds-border-base)] bg-[var(--ds-bg-surface)] overflow-hidden">
                  {tokens.map(({ name, var: cssVar, value, usage }) => (
                    <div key={name} className="grid grid-cols-[80px_1fr_1fr] gap-4 items-center px-5 py-3 border-b border-[var(--ds-border-base)] last:border-0">
                      <span className="text-xs font-medium text-[var(--ds-text-primary)]">{name}</span>
                      <span className="font-mono text-[11px] text-[var(--ds-text-muted)]">{value}</span>
                      <span className="text-xs text-[var(--ds-text-secondary)]">{usage}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

const meta: Meta = {
  title: 'Foundations/Focus, Z-index & Motion',
  parameters: { layout: 'fullscreen' },
};
export default meta;

export const FocusZMotion: StoryObj = {
  name: 'Focus Ring, Z-index & Motion',
  render: () => <FocusRingPage />,
};
