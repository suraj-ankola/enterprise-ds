import React, { useEffect, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta = {
  title: 'Foundations/Dev CSS',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Complete reference for all `--ds-*` CSS custom properties. Values shown are **live** — toggle dark mode in Storybook to see them update. Copy any token name directly into your Tailwind `[]` arbitrary value: `bg-[var(--ds-brand-600)]`.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

// ─── Token catalogue ──────────────────────────────────────────────────────────

interface TokenEntry {
  name:  string;
  desc:  string;
  type:  'color' | 'text' | 'number' | 'shadow' | 'duration' | 'easing' | 'other';
}

interface TokenGroup {
  label:   string;
  tokens:  TokenEntry[];
}

const GROUPS: TokenGroup[] = [
  {
    label: 'Background',
    tokens: [
      { name: '--ds-bg-base',     desc: 'Page canvas',                         type: 'color' },
      { name: '--ds-bg-surface',  desc: 'Cards, panels, sidebars',             type: 'color' },
      { name: '--ds-bg-raised',   desc: 'Modals, popovers, dropdowns',         type: 'color' },
      { name: '--ds-bg-subtle',   desc: 'Hover fills, wells, tags',            type: 'color' },
      { name: '--ds-bg-inverse',  desc: 'Inverted surfaces',                   type: 'color' },
      { name: '--ds-bg-overlay',  desc: 'Backdrop overlays (semi-transparent)',type: 'color' },
    ],
  },
  {
    label: 'Text',
    tokens: [
      { name: '--ds-text-primary',    desc: 'Main headings and body text',     type: 'color' },
      { name: '--ds-text-secondary',  desc: 'Supporting text and subtitles',   type: 'color' },
      { name: '--ds-text-muted',      desc: 'Placeholders and hints',          type: 'color' },
      { name: '--ds-text-disabled',   desc: 'Disabled labels',                 type: 'color' },
      { name: '--ds-text-inverse',    desc: 'Text on dark surfaces',           type: 'color' },
      { name: '--ds-text-on-brand',   desc: 'Text on brand-coloured bg',       type: 'color' },
      { name: '--ds-text-link',       desc: 'Link colour',                     type: 'color' },
      { name: '--ds-text-link-hover', desc: 'Link hover colour',               type: 'color' },
    ],
  },
  {
    label: 'Border',
    tokens: [
      { name: '--ds-border-base',    desc: 'Default dividers and inputs',      type: 'color' },
      { name: '--ds-border-strong',  desc: 'Emphasized borders',               type: 'color' },
      { name: '--ds-border-focus',   desc: 'Focus ring colour',                type: 'color' },
      { name: '--ds-border-inverse', desc: 'Borders on dark surfaces',         type: 'color' },
    ],
  },
  {
    label: 'Brand',
    tokens: [
      { name: '--ds-brand-50',   desc: 'Lightest tint',                        type: 'color' },
      { name: '--ds-brand-100',  desc: 'Active background',                    type: 'color' },
      { name: '--ds-brand-200',  desc: '',                                      type: 'color' },
      { name: '--ds-brand-300',  desc: '',                                      type: 'color' },
      { name: '--ds-brand-400',  desc: 'Subtle accent',                        type: 'color' },
      { name: '--ds-brand-500',  desc: 'Focus ring, hover',                    type: 'color' },
      { name: '--ds-brand-600',  desc: 'Primary actions ← main brand',         type: 'color' },
      { name: '--ds-brand-700',  desc: 'Hover state for primary',              type: 'color' },
      { name: '--ds-brand-800',  desc: 'Active/pressed state',                 type: 'color' },
      { name: '--ds-brand-900',  desc: 'Darkest shade',                        type: 'color' },
      { name: '--ds-brand-text', desc: 'Text on brand bg (always white)',      type: 'color' },
    ],
  },
  {
    label: 'Success',
    tokens: [
      { name: '--ds-success-bg',        desc: 'Background fill',               type: 'color' },
      { name: '--ds-success-bg-subtle', desc: 'Subtle background',            type: 'color' },
      { name: '--ds-success-text',      desc: 'Body text on light bg',         type: 'color' },
      { name: '--ds-success-border',    desc: 'Border colour',                 type: 'color' },
      { name: '--ds-success-icon',      desc: 'Icon colour',                   type: 'color' },
      { name: '--ds-success-solid-bg',  desc: 'Solid badge / button bg',       type: 'color' },
    ],
  },
  {
    label: 'Warning',
    tokens: [
      { name: '--ds-warning-bg',        desc: 'Background fill',               type: 'color' },
      { name: '--ds-warning-bg-subtle', desc: 'Subtle background',            type: 'color' },
      { name: '--ds-warning-text',      desc: 'Body text on light bg',         type: 'color' },
      { name: '--ds-warning-border',    desc: 'Border colour',                 type: 'color' },
      { name: '--ds-warning-icon',      desc: 'Icon colour',                   type: 'color' },
      { name: '--ds-warning-solid-bg',  desc: 'Solid badge / button bg',       type: 'color' },
    ],
  },
  {
    label: 'Danger',
    tokens: [
      { name: '--ds-danger-bg',        desc: 'Background fill',                type: 'color' },
      { name: '--ds-danger-bg-subtle', desc: 'Subtle background',             type: 'color' },
      { name: '--ds-danger-text',      desc: 'Body text on light bg',          type: 'color' },
      { name: '--ds-danger-border',    desc: 'Border colour',                  type: 'color' },
      { name: '--ds-danger-icon',      desc: 'Icon colour',                    type: 'color' },
      { name: '--ds-danger-solid-bg',  desc: 'Solid badge / button bg',        type: 'color' },
    ],
  },
  {
    label: 'Info',
    tokens: [
      { name: '--ds-info-bg',        desc: 'Background fill',                  type: 'color' },
      { name: '--ds-info-bg-subtle', desc: 'Subtle background',               type: 'color' },
      { name: '--ds-info-text',      desc: 'Body text on light bg',            type: 'color' },
      { name: '--ds-info-border',    desc: 'Border colour',                    type: 'color' },
      { name: '--ds-info-icon',      desc: 'Icon colour',                      type: 'color' },
      { name: '--ds-info-solid-bg',  desc: 'Solid badge / button bg',          type: 'color' },
    ],
  },
  {
    label: 'Opacity',
    tokens: [
      { name: '--ds-opacity-disabled', desc: 'Disabled element opacity',       type: 'other' },
      { name: '--ds-opacity-overlay',  desc: 'Overlay backdrop opacity',       type: 'other' },
      { name: '--ds-opacity-muted',    desc: 'Muted element opacity',          type: 'other' },
    ],
  },
  {
    label: 'Z-Index',
    tokens: [
      { name: '--ds-z-base',     desc: 'Default stacking',                     type: 'other' },
      { name: '--ds-z-raised',   desc: 'Floating cards, sticky headers',       type: 'other' },
      { name: '--ds-z-dropdown', desc: 'Dropdowns, date pickers',              type: 'other' },
      { name: '--ds-z-sticky',   desc: 'Sticky sidebars, app bars',            type: 'other' },
      { name: '--ds-z-overlay',  desc: 'Modal backdrops',                      type: 'other' },
      { name: '--ds-z-modal',    desc: 'Modal dialogs',                        type: 'other' },
      { name: '--ds-z-toast',    desc: 'Toast notifications',                  type: 'other' },
      { name: '--ds-z-tooltip',  desc: 'Tooltips (always on top)',             type: 'other' },
    ],
  },
  {
    label: 'Motion — Duration',
    tokens: [
      { name: '--ds-duration-instant', desc: 'Imperceptible (50ms)',           type: 'duration' },
      { name: '--ds-duration-fast',    desc: 'Micro-interactions (100ms)',     type: 'duration' },
      { name: '--ds-duration-base',    desc: 'Default transitions (150ms)',    type: 'duration' },
      { name: '--ds-duration-slow',    desc: 'Reveal animations (250ms)',      type: 'duration' },
      { name: '--ds-duration-slower',  desc: 'Page elements (400ms)',          type: 'duration' },
      { name: '--ds-duration-page',    desc: 'Route transitions (300ms)',      type: 'duration' },
    ],
  },
  {
    label: 'Motion — Easing',
    tokens: [
      { name: '--ds-ease-default', desc: 'Standard ease-in-out',               type: 'easing' },
      { name: '--ds-ease-in',      desc: 'Elements leaving screen',            type: 'easing' },
      { name: '--ds-ease-out',     desc: 'Elements entering screen',           type: 'easing' },
      { name: '--ds-ease-spring',  desc: 'Springy overshoot',                  type: 'easing' },
      { name: '--ds-ease-bounce',  desc: 'Playful bounce',                     type: 'easing' },
    ],
  },
  {
    label: 'Focus Ring',
    tokens: [
      { name: '--ds-focus-ring-color',        desc: 'Ring colour',             type: 'color' },
      { name: '--ds-focus-ring-width',        desc: 'Ring width',              type: 'other' },
      { name: '--ds-focus-ring-offset',       desc: 'Offset from element',     type: 'other' },
      { name: '--ds-focus-ring-offset-color', desc: 'Offset fill colour',      type: 'color' },
    ],
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function useLiveTokens(names: string[]) {
  const [vals, setVals] = useState<Record<string, string>>({});

  useEffect(() => {
    const computed = getComputedStyle(document.documentElement);
    const map: Record<string, string> = {};
    names.forEach((n) => { map[n] = computed.getPropertyValue(n).trim(); });
    setVals(map);
  }, [names.join(',')]); // eslint-disable-line react-hooks/exhaustive-deps

  return vals;
}

function isHex(v: string) { return /^#[0-9a-fA-F]{3,8}$/.test(v); }
function isRgb(v: string) { return v.startsWith('rgb'); }

// ─── TokenRow ─────────────────────────────────────────────────────────────────

function TokenRow({ token, value }: { token: TokenEntry; value: string }) {
  const showSwatch = token.type === 'color' && (isHex(value) || isRgb(value));

  return (
    <tr className="border-b border-[var(--ds-border-base)] last:border-0">
      <td className="py-2.5 pr-4 align-middle">
        <code className="text-xs font-mono text-[var(--ds-brand-600)] bg-[var(--ds-brand-50)] px-1.5 py-0.5 rounded">
          {token.name}
        </code>
      </td>
      <td className="py-2.5 pr-4 align-middle">
        <div className="flex items-center gap-2">
          {showSwatch && (
            <span
              className="shrink-0 h-5 w-5 rounded border border-[var(--ds-border-base)] shadow-sm"
              style={{ backgroundColor: `var(${token.name})` }}
            />
          )}
          <code className="text-xs font-mono text-[var(--ds-text-secondary)]">
            {value || '—'}
          </code>
        </div>
      </td>
      <td className="py-2.5 align-middle text-xs text-[var(--ds-text-muted)]">
        {token.desc}
      </td>
    </tr>
  );
}

// ─── TokenGroupSection ────────────────────────────────────────────────────────

function TokenGroupSection({ group }: { group: TokenGroup }) {
  const allNames = group.tokens.map((t) => t.name);
  const values   = useLiveTokens(allNames);

  return (
    <section>
      <h2 className="text-sm font-semibold text-[var(--ds-text-primary)] mb-2 px-1">
        {group.label}
      </h2>
      <div className="rounded-xl border border-[var(--ds-border-base)] overflow-hidden mb-6">
        <table className="w-full">
          <thead>
            <tr className="bg-[var(--ds-bg-subtle)]">
              <th className="text-left text-xs font-semibold text-[var(--ds-text-muted)] px-3 py-2 w-64">Token</th>
              <th className="text-left text-xs font-semibold text-[var(--ds-text-muted)] px-3 py-2 w-48">Value</th>
              <th className="text-left text-xs font-semibold text-[var(--ds-text-muted)] px-3 py-2">Usage</th>
            </tr>
          </thead>
          <tbody className="bg-[var(--ds-bg-surface)]">
            {group.tokens.map((token) => (
              <tr key={token.name} className="px-3 border-b border-[var(--ds-border-base)] last:border-0">
                <td className="py-2.5 px-3 align-middle">
                  <code className="text-xs font-mono text-[var(--ds-brand-600)] bg-[var(--ds-brand-50)] px-1.5 py-0.5 rounded">
                    {token.name}
                  </code>
                </td>
                <td className="py-2.5 px-3 align-middle">
                  <div className="flex items-center gap-2">
                    {(token.type === 'color') && (
                      <span
                        className="shrink-0 h-5 w-5 rounded border border-[var(--ds-border-base)]"
                        style={{ backgroundColor: `var(${token.name})` }}
                      />
                    )}
                    <code className="text-xs font-mono text-[var(--ds-text-secondary)]">
                      {values[token.name] || '—'}
                    </code>
                  </div>
                </td>
                <td className="py-2.5 px-3 align-middle text-xs text-[var(--ds-text-muted)]">
                  {token.desc}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

// ─── Story ────────────────────────────────────────────────────────────────────

export const AllTokens: Story = {
  name: 'All tokens',
  render: () => (
    <div className="p-8 bg-[var(--ds-bg-base)] min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[var(--ds-text-primary)] mb-2">CSS Custom Properties</h1>
          <p className="text-sm text-[var(--ds-text-muted)]">
            All <code className="font-mono text-xs bg-[var(--ds-bg-subtle)] px-1.5 py-0.5 rounded">--ds-*</code> tokens.
            Values update live — toggle dark mode in the Storybook toolbar to see changes.
            Use in Tailwind: <code className="font-mono text-xs bg-[var(--ds-bg-subtle)] px-1.5 py-0.5 rounded">bg-[var(--ds-brand-600)]</code>
          </p>
        </div>
        {GROUPS.map((group) => (
          <TokenGroupSection key={group.label} group={group} />
        ))}
      </div>
    </div>
  ),
};

export const ColorsOnly: Story = {
  name: 'Colors only',
  render: () => {
    const colorGroups = GROUPS.filter((g) =>
      ['Background', 'Text', 'Border', 'Brand', 'Success', 'Warning', 'Danger', 'Info'].includes(g.label),
    );
    return (
      <div className="p-8 bg-[var(--ds-bg-base)] min-h-screen">
        <div className="max-w-4xl mx-auto">
          {colorGroups.map((group) => (
            <TokenGroupSection key={group.label} group={group} />
          ))}
        </div>
      </div>
    );
  },
};
