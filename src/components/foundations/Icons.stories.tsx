import React, { useState, useMemo } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import * as PhosphorIcons from '@phosphor-icons/react';
import type { IconWeight } from '@phosphor-icons/react';

// ─── Build the icon list from Phosphor exports ───────────────────────────────
// Filter out non-icon exports (IconContext, types, hooks)
const EXCLUDED = new Set(['IconContext', 'SSR']);

const iconEntries = Object.entries(PhosphorIcons).filter(
  ([name, value]) =>
    name.endsWith('Icon') &&                              // only current non-deprecated names
    !EXCLUDED.has(name) &&
    value !== null &&
    (typeof value === 'function' ||                       // plain function components
      (typeof value === 'object' && '$$typeof' in (value as object))) // forwardRef components
) as [string, React.ElementType][];

// ─── Weights ─────────────────────────────────────────────────────────────────
const WEIGHTS: IconWeight[] = ['thin', 'light', 'regular', 'bold', 'fill', 'duotone'];

const WEIGHT_LABELS: Record<IconWeight, string> = {
  thin:     'Thin',
  light:    'Light',
  regular:  'Regular',
  bold:     'Bold',
  fill:     'Fill',
  duotone:  'Duotone',
};

// ─── Sizes ────────────────────────────────────────────────────────────────────
const SIZES = [16, 20, 24, 32] as const;
type PreviewSize = typeof SIZES[number];

// ─── Gallery component ───────────────────────────────────────────────────────
function IconGallery() {
  const [search, setSearch]     = useState('');
  const [weight, setWeight]     = useState<IconWeight>('regular');
  const [size, setSize]         = useState<PreviewSize>(24);
  const [copied, setCopied]     = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().replace(/\s+/g, '');
    if (!q) return iconEntries;
    return iconEntries.filter(([name]) =>
      name.toLowerCase().replace(/\s+/g, '').includes(q)
    );
  }, [search]);

  const handleCopy = (name: string) => {
    navigator.clipboard.writeText(`<${name} />`).catch(() => {});
    setCopied(name);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <div className="min-h-screen bg-[var(--ds-bg-base)] text-[var(--ds-text-primary)] p-6 font-sans">

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[var(--ds-text-primary)]">Icon Library</h1>
        <p className="mt-1 text-sm text-[var(--ds-text-secondary)]">
          {iconEntries.length} icons from{' '}
          <a
            href="https://phosphoricons.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 underline"
          >
            Phosphor Icons
          </a>
          . Click any icon to copy its import name.
        </p>
      </div>

      {/* Controls */}
      <div className="mb-6 flex flex-wrap gap-4 items-start">

        {/* Search */}
        <div className="relative flex-1 min-w-64">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--ds-text-muted)]">
            <PhosphorIcons.MagnifyingGlassIcon size={16} />
          </span>
          <input
            type="text"
            placeholder="Search icons…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="h-10 w-full rounded-lg border border-[var(--ds-border-base)] bg-[var(--ds-bg-surface)] pl-9 pr-3 text-sm text-[var(--ds-text-primary)] placeholder-[var(--ds-text-muted)] outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-offset-0"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--ds-text-muted)] hover:text-[var(--ds-text-primary)]"
            >
              <PhosphorIcons.XIcon size={14} />
            </button>
          )}
        </div>

        {/* Weight pills */}
        <div className="flex flex-wrap gap-1.5">
          {WEIGHTS.map(w => (
            <button
              key={w}
              onClick={() => setWeight(w)}
              className={[
                'h-8 rounded-md px-3 text-xs font-medium transition-colors',
                weight === w
                  ? 'bg-blue-600 text-white'
                  : 'border border-[var(--ds-border-base)] bg-[var(--ds-bg-surface)] text-[var(--ds-text-secondary)] hover:bg-[var(--ds-bg-subtle)]',
              ].join(' ')}
            >
              {WEIGHT_LABELS[w]}
            </button>
          ))}
        </div>

        {/* Size pills */}
        <div className="flex gap-1.5">
          {SIZES.map(s => (
            <button
              key={s}
              onClick={() => setSize(s)}
              className={[
                'h-8 rounded-md px-3 text-xs font-medium transition-colors',
                size === s
                  ? 'bg-blue-600 text-white'
                  : 'border border-[var(--ds-border-base)] bg-[var(--ds-bg-surface)] text-[var(--ds-text-secondary)] hover:bg-[var(--ds-bg-subtle)]',
              ].join(' ')}
            >
              {s}px
            </button>
          ))}
        </div>
      </div>

      {/* Result count */}
      <p className="mb-4 text-xs text-[var(--ds-text-muted)]">
        {filtered.length === iconEntries.length
          ? `All ${iconEntries.length} icons`
          : `${filtered.length} of ${iconEntries.length} icons`}
      </p>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-[var(--ds-text-muted)]">
          <PhosphorIcons.SmileySadIcon size={48} weight="thin" />
          <p className="mt-3 text-sm">No icons found for &ldquo;{search}&rdquo;</p>
          <button
            onClick={() => setSearch('')}
            className="mt-2 text-xs text-blue-600 dark:text-blue-400 underline"
          >
            Clear search
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(96px,1fr))] gap-2">
          {filtered.map(([name, IconComponent]) => (
            <button
              key={name}
              onClick={() => handleCopy(name)}
              title={`Click to copy <${name} />`}
              className={[
                'group flex flex-col items-center gap-2 rounded-xl border p-3',
                'transition-all duration-100 text-left',
                copied === name
                  ? 'border-green-500 bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-400'
                  : 'border-transparent hover:border-[var(--ds-border-base)] hover:bg-[var(--ds-bg-surface)]',
                'text-[var(--ds-text-primary)]',
              ].join(' ')}
            >
              <span className="flex items-center justify-center">
                {copied === name ? (
                  <PhosphorIcons.CheckIcon size={size} weight="bold" className="text-green-600 dark:text-green-400" />
                ) : (
                  <IconComponent size={size} weight={weight} />
                )}
              </span>
              <span className="w-full truncate text-center text-[10px] text-[var(--ds-text-secondary)] group-hover:text-[var(--ds-text-primary)]">
                {copied === name ? 'Copied!' : name}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Storybook meta ───────────────────────────────────────────────────────────
const meta: Meta = {
  title: 'Foundations/Icons',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'All icons are from [Phosphor Icons](https://phosphoricons.com). Import from `@/components/foundations/Icons`. Supports 6 weights: thin, light, regular, bold, fill, duotone.',
      },
    },
  },
};

export default meta;

export const Gallery: StoryObj = {
  render: () => <IconGallery />,
  name: 'Icon Gallery',
};
