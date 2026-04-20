import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { SearchBar } from './SearchBar';

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<typeof SearchBar> = {
  title: 'Forms/SearchBar',
  component: SearchBar,
  tags: ['autodocs'],
  argTypes: {
    size:      { control: 'select', options: ['sm', 'md', 'lg'] },
    loading:   { control: 'boolean' },
    disabled:  { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    shortcut:  { control: 'text' },
    placeholder: { control: 'text' },
  },
  args: {
    placeholder: 'Search…',
    size: 'md',
    loading: false,
    disabled: false,
    fullWidth: false,
  },
  parameters: {
    docs: {
      description: {
        component:
          'Standalone search input with three built-in behaviours: **search icon** (swaps to spinner when `loading`), **clear button** (appears when there is text, Escape also clears), and an optional **keyboard shortcut hint** badge (e.g. `⌘K`) shown when the field is empty and unfocused. Supports controlled and uncontrolled modes. `onSearch` fires on Enter.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof SearchBar>;

// ─── Base ─────────────────────────────────────────────────────────────────────

export const Default: Story = {};

export const WithPlaceholder: Story = {
  args: { placeholder: 'Search vendors, contracts, incidents…' },
};

// ─── Keyboard shortcut hint ───────────────────────────────────────────────────

export const ShortcutHint: Story = {
  name: 'Shortcut hint — ⌘K',
  args: {
    placeholder: 'Search…',
    shortcut: '⌘K',
  },
};

export const ShortcutSlash: Story = {
  name: 'Shortcut hint — / (vim style)',
  args: {
    placeholder: 'Search…',
    shortcut: '/',
  },
};

// ─── Loading state ────────────────────────────────────────────────────────────

export const Loading: Story = {
  name: 'Loading — spinner replaces icon',
  args: {
    defaultValue: 'acme vendor',
    loading: true,
    placeholder: 'Search vendors…',
  },
};

// ─── Disabled ─────────────────────────────────────────────────────────────────

export const Disabled: Story = {
  args: {
    defaultValue: 'Previous search',
    disabled: true,
  },
};

// ─── Sizes ────────────────────────────────────────────────────────────────────

export const Small: Story = {
  name: 'Size — Small',
  args: { size: 'sm', shortcut: '/', placeholder: 'Search…' },
};

export const Medium: Story = {
  name: 'Size — Medium',
  args: { size: 'md', shortcut: '⌘K', placeholder: 'Search…' },
};

export const Large: Story = {
  name: 'Size — Large',
  args: { size: 'lg', shortcut: '⌘F', placeholder: 'Search…' },
};

// ─── Full width ───────────────────────────────────────────────────────────────

export const FullWidth: Story = {
  name: 'Full width',
  args: {
    fullWidth: true,
    shortcut: '⌘K',
    placeholder: 'Search across vendors, contracts, incidents, risk scores…',
  },
};

// ─── Controlled (interactive demo) ───────────────────────────────────────────

export const Controlled: Story = {
  name: 'Controlled — live results count',
  render: () => {
    const items = [
      'Acme Corp', 'Globex Industries', 'Initech', 'Umbrella Ltd',
      'Stark Enterprises', 'Wayne Industries', 'Oscorp', 'Massive Dynamic',
    ];
    const [query, setQuery]     = useState('');
    const [loading, setLoading] = useState(false);

    const filtered = items.filter((i) =>
      i.toLowerCase().includes(query.toLowerCase()),
    );

    const handleSearch = (value: string) => {
      if (!value) return;
      setLoading(true);
      setTimeout(() => setLoading(false), 1200);
    };

    return (
      <div className="flex flex-col gap-3 w-72">
        <SearchBar
          value={query}
          onChange={setQuery}
          onSearch={handleSearch}
          onClear={() => setQuery('')}
          loading={loading}
          shortcut="⌘K"
          placeholder="Search vendors…"
          fullWidth
        />
        <p className="text-xs text-[var(--ds-text-muted)]">
          {query
            ? `${filtered.length} result${filtered.length !== 1 ? 's' : ''} for "${query}"`
            : `${items.length} vendors total`
          }
        </p>
        {query && (
          <ul className="flex flex-col gap-1">
            {filtered.map((item) => (
              <li
                key={item}
                className="text-sm px-3 py-2 rounded-lg bg-[var(--ds-bg-subtle)] text-[var(--ds-text-primary)]"
              >
                {item}
              </li>
            ))}
            {filtered.length === 0 && (
              <li className="text-sm text-[var(--ds-text-muted)] px-3 py-2">
                No vendors found.
              </li>
            )}
          </ul>
        )}
      </div>
    );
  },
};

// ─── All sizes side by side ───────────────────────────────────────────────────

export const AllSizes: Story = {
  name: 'All sizes — with shortcut',
  render: () => (
    <div className="flex flex-col gap-4 w-72">
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <SearchBar
          key={size}
          size={size}
          shortcut="⌘K"
          placeholder="Search…"
          fullWidth
        />
      ))}
    </div>
  ),
};
