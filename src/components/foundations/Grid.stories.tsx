import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const BREAKPOINTS = [
  { name: 'Mobile',    bp: '< 640px',  cols: 4,  gutter: '16px (2 units)', margin: '16px', token: 'default' },
  { name: 'Tablet',    bp: '768px+',   cols: 8,  gutter: '24px (3 units)', margin: '32px', token: 'md:' },
  { name: 'Desktop',   bp: '1280px+',  cols: 12, gutter: '32px (4 units)', margin: '48px', token: 'xl:' },
  { name: 'Ultrawide', bp: '1920px+',  cols: 16, gutter: '40px (5 units)', margin: '80px', token: '3xl:' },
];

const CONTAINERS = [
  { name: 'sm',   maxWidth: '640px',  usage: 'Auth pages, focused forms' },
  { name: 'md',   maxWidth: '768px',  usage: 'Blog posts, documentation' },
  { name: 'lg',   maxWidth: '1024px', usage: 'Two-column layouts' },
  { name: 'xl',   maxWidth: '1280px', usage: 'Primary app layout (default)' },
  { name: '2xl',  maxWidth: '1536px', usage: 'Wide dashboards, data tables' },
  { name: 'fluid',maxWidth: '100%',   usage: 'Full-bleed, no max-width constraint' },
];

const GRID_EXAMPLES = [
  { label: '1 col', cols: 'grid-cols-1' },
  { label: '2 col', cols: 'grid-cols-2' },
  { label: '3 col', cols: 'grid-cols-3' },
  { label: '4 col', cols: 'grid-cols-4' },
  { label: '6 col', cols: 'grid-cols-6' },
  { label: '12 col',cols: 'grid-cols-12' },
];

const SPACING_GRID = [
  { name: '0.5', px: 2,  rem: '0.125rem', grid: '1/4 step  — fine-tune' },
  { name: '1',   px: 4,  rem: '0.25rem',  grid: '1/2 step  — icon gaps, micro spacing' },
  { name: '2',   px: 8,  rem: '0.5rem',   grid: '1 unit    ← 8pt base' },
  { name: '3',   px: 12, rem: '0.75rem',  grid: '1.5 units — tight gaps' },
  { name: '4',   px: 16, rem: '1rem',     grid: '2 units   ← common' },
  { name: '6',   px: 24, rem: '1.5rem',   grid: '3 units   ← gutter mobile/tablet' },
  { name: '8',   px: 32, rem: '2rem',     grid: '4 units   ← gutter desktop' },
  { name: '10',  px: 40, rem: '2.5rem',   grid: '5 units   ← gutter wide' },
  { name: '12',  px: 48, rem: '3rem',     grid: '6 units   — section gap' },
  { name: '16',  px: 64, rem: '4rem',     grid: '8 units   — page margin desktop' },
  { name: '20',  px: 80, rem: '5rem',     grid: '10 units  — page margin wide' },
  { name: '24',  px: 96, rem: '6rem',     grid: '12 units  — hero spacing' },
];

function GridPage() {
  const [activeCols, setActiveCols] = useState('grid-cols-12');

  return (
    <div className="min-h-screen bg-[var(--ds-bg-base)] font-sans">

      {/* Header */}
      <div className="ds-container py-8">
        <h1 className="text-3xl font-bold text-[var(--ds-text-primary)]">Grid & Layout</h1>
        <p className="mt-2 text-sm text-[var(--ds-text-secondary)] max-w-2xl">
          Based on an <strong>8pt grid</strong> (base unit: 8px). Layout adapts across 4 breakpoints.
          Use <code className="bg-[var(--ds-bg-subtle)] px-1 rounded text-xs">.ds-container</code> for
          fixed-width layouts or <code className="bg-[var(--ds-bg-subtle)] px-1 rounded text-xs">.ds-container-fluid</code> for full-width.
        </p>
      </div>

      <div className="ds-container pb-12 space-y-12">

        {/* Breakpoints */}
        <section>
          <h2 className="text-base font-semibold text-[var(--ds-text-primary)] mb-4">Breakpoints & Grid</h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {BREAKPOINTS.map(({ name, bp, cols, gutter, margin, token }) => (
              <div key={name} className="rounded-xl border border-[var(--ds-border-base)] bg-[var(--ds-bg-surface)] p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold text-[var(--ds-text-primary)]">{name}</span>
                  <span className="font-mono text-[10px] bg-[var(--ds-bg-subtle)] px-2 py-0.5 rounded-full text-[var(--ds-text-muted)]">{token}</span>
                </div>
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: cols }).map((_, i) => (
                    <div key={i} className="flex-1 h-8 rounded-sm bg-[var(--ds-brand-100)] border border-[var(--ds-brand-200)]" />
                  ))}
                </div>
                <div className="space-y-1 text-xs text-[var(--ds-text-muted)]">
                  <p><span className="text-[var(--ds-text-secondary)] font-medium">Breakpoint:</span> {bp}</p>
                  <p><span className="text-[var(--ds-text-secondary)] font-medium">Columns:</span> {cols}</p>
                  <p><span className="text-[var(--ds-text-secondary)] font-medium">Gutter:</span> {gutter}</p>
                  <p><span className="text-[var(--ds-text-secondary)] font-medium">Margin:</span> {margin}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Interactive grid demo */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-[var(--ds-text-primary)]">Interactive Column Demo</h2>
            <div className="flex flex-wrap gap-2">
              {GRID_EXAMPLES.map(({ label, cols }) => (
                <button
                  key={cols}
                  onClick={() => setActiveCols(cols)}
                  className={[
                    'h-7 px-3 rounded-md text-xs font-medium transition-colors',
                    activeCols === cols
                      ? 'bg-[var(--ds-brand-600)] text-white'
                      : 'border border-[var(--ds-border-base)] bg-[var(--ds-bg-surface)] text-[var(--ds-text-secondary)] hover:bg-[var(--ds-bg-subtle)]',
                  ].join(' ')}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
          <div className={`grid ${activeCols} gap-4`}>
            {Array.from({ length: parseInt(activeCols.split('-')[2] ?? '12') }).map((_, i) => (
              <div key={i} className="h-16 rounded-lg bg-[var(--ds-brand-100)] border border-[var(--ds-brand-200)] flex items-center justify-center">
                <span className="text-[10px] font-mono text-[var(--ds-brand-700)]">{i + 1}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Containers */}
        <section>
          <h2 className="text-base font-semibold text-[var(--ds-text-primary)] mb-4">Container Widths</h2>
          <div className="space-y-2">
            {CONTAINERS.map(({ name, maxWidth, usage }) => (
              <div key={name} className="flex items-center gap-4 py-2.5 border-b border-[var(--ds-border-base)] last:border-0">
                <code className="w-20 shrink-0 font-mono text-xs text-[var(--ds-brand-600)]">{name}</code>
                <div
                  className="h-5 rounded bg-[var(--ds-brand-100)] border border-[var(--ds-brand-200)] transition-all"
                  style={{ width: `${Math.min(parseInt(maxWidth) / 16, 100)}%` }}
                />
                <span className="w-24 shrink-0 font-mono text-xs text-[var(--ds-text-muted)]">{maxWidth}</span>
                <span className="text-xs text-[var(--ds-text-secondary)]">{usage}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Spacing */}
        <section>
          <h2 className="text-base font-semibold text-[var(--ds-text-primary)] mb-1">8pt Spacing Scale</h2>
          <p className="text-sm text-[var(--ds-text-muted)] mb-4">
            Base unit: <strong>8px</strong>. Full steps (8, 16, 24…) for layout. Half steps (4, 12, 20…) for component internals.
          </p>
          <div className="rounded-xl border border-[var(--ds-border-base)] bg-[var(--ds-bg-surface)] overflow-hidden">
            <div className="grid grid-cols-[48px_200px_50px_64px_1fr] gap-4 px-4 py-2.5 bg-[var(--ds-bg-subtle)] border-b border-[var(--ds-border-base)]">
              {['Step', 'Visual', 'px', 'rem', '8pt Grid'].map(h => (
                <span key={h} className="text-[10px] font-semibold uppercase tracking-wider text-[var(--ds-text-muted)]">{h}</span>
              ))}
            </div>
            {SPACING_GRID.map(({ name, px, rem, grid }) => (
              <div key={name} className="grid grid-cols-[48px_200px_50px_64px_1fr] gap-4 items-center px-4 py-2 border-b border-[var(--ds-border-base)] last:border-0">
                <code className="font-mono text-xs text-[var(--ds-brand-600)]">{name}</code>
                <div className="flex items-center">
                  <div
                    className="h-4 rounded-sm bg-[var(--ds-brand-400)]"
                    style={{ width: Math.min(px * 1.5, 200) }}
                  />
                </div>
                <span className="font-mono text-xs text-[var(--ds-text-muted)]">{px}px</span>
                <span className="font-mono text-xs text-[var(--ds-text-muted)]">{rem}</span>
                <span className="text-xs text-[var(--ds-text-secondary)]">{grid}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Container utility docs */}
        <section>
          <h2 className="text-base font-semibold text-[var(--ds-text-primary)] mb-4">Layout Utilities</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-[var(--ds-border-base)] bg-[var(--ds-bg-surface)] p-5">
              <p className="text-sm font-semibold text-[var(--ds-text-primary)] mb-1">.ds-container</p>
              <p className="text-xs text-[var(--ds-text-muted)] mb-3">Fixed max-width, centered. Caps at 1280px on desktop, 1536px on ultrawide.</p>
              <div className="font-mono text-xs bg-[var(--ds-bg-subtle)] rounded-lg p-3 text-[var(--ds-text-secondary)]">
                {'<div className="ds-container">'}<br />
                {'  {/* page content */}'}<br />
                {'</div>'}
              </div>
            </div>
            <div className="rounded-xl border border-[var(--ds-border-base)] bg-[var(--ds-bg-surface)] p-5">
              <p className="text-sm font-semibold text-[var(--ds-text-primary)] mb-1">.ds-container-fluid</p>
              <p className="text-xs text-[var(--ds-text-muted)] mb-3">Full width, margins only. Scales to any screen. Use for full-bleed dashboards.</p>
              <div className="font-mono text-xs bg-[var(--ds-bg-subtle)] rounded-lg p-3 text-[var(--ds-text-secondary)]">
                {'<div className="ds-container-fluid">'}<br />
                {'  {/* full-width content */}'}<br />
                {'</div>'}
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}

const meta: Meta = {
  title: 'Foundations/Grid & Layout',
  parameters: { layout: 'fullscreen' },
};
export default meta;

export const GridSystem: StoryObj = {
  name: 'Grid & Layout System',
  render: () => <GridPage />,
};
