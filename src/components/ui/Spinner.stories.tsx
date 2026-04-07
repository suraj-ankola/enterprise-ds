import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Spinner, SpinnerOverlay } from './Spinner';

const meta: Meta<typeof Spinner> = {
  title: 'Feedback/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Physical size of the spinner ring',
    },
    variant: {
      control: 'select',
      options: ['brand', 'white', 'muted', 'success', 'warning', 'danger'],
      description: 'Colour variant — drives ring and track colours via DS tokens',
    },
    label: {
      control: 'text',
      description: 'Screen-reader accessible label (visually hidden)',
    },
  },
  args: {
    size: 'md',
    variant: 'brand',
    label: 'Loading…',
  },
  parameters: {
    docs: {
      description: {
        component:
          'Animated loading indicator. 5 sizes, 6 variant colours driven by DS tokens. `SpinnerOverlay` fills a relative container with a backdrop — drop it inside any `relative` parent for an instant loading state.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Spinner>;

// ─── Default ──────────────────────────────────────────────────────────────────

export const Default: Story = {};

// ─── Sizes ────────────────────────────────────────────────────────────────────

export const ExtraSmall: Story = { args: { size: 'xs' } };
export const Small: Story     = { args: { size: 'sm' } };
export const Medium: Story    = { args: { size: 'md' } };
export const Large: Story     = { args: { size: 'lg' } };
export const ExtraLarge: Story = { args: { size: 'xl' } };

// ─── Variants ─────────────────────────────────────────────────────────────────

export const Brand: Story   = { args: { variant: 'brand' } };
export const Muted: Story   = { args: { variant: 'muted' } };
export const Success: Story = { args: { variant: 'success' } };
export const Warning: Story = { args: { variant: 'warning' } };
export const Danger: Story  = { args: { variant: 'danger' } };

// ─── All Sizes ────────────────────────────────────────────────────────────────

export const AllSizes: Story = {
  render: () => (
    <div className="p-8 bg-[var(--ds-bg-base)] flex items-end gap-6">
      {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map(s => (
        <div key={s} className="flex flex-col items-center gap-2">
          <Spinner size={s} />
          <span className="text-xs text-[var(--ds-text-muted)]">{s}</span>
        </div>
      ))}
    </div>
  ),
};

// ─── All Variants ─────────────────────────────────────────────────────────────

export const AllVariants: Story = {
  render: () => (
    <div className="p-8 bg-[var(--ds-bg-base)] flex flex-wrap gap-6">
      {(['brand', 'muted', 'success', 'warning', 'danger'] as const).map(v => (
        <div key={v} className="flex flex-col items-center gap-2">
          <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-[var(--ds-bg-surface)] border border-[var(--ds-border-base)]">
            <Spinner size="md" variant={v} />
          </div>
          <span className="text-xs text-[var(--ds-text-muted)]">{v}</span>
        </div>
      ))}
      <div className="flex flex-col items-center gap-2">
        <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-[var(--ds-brand-600)]">
          <Spinner size="md" variant="white" />
        </div>
        <span className="text-xs text-[var(--ds-text-muted)]">white</span>
      </div>
    </div>
  ),
};

// ─── Inline usage ─────────────────────────────────────────────────────────────

export const InlineUsage: Story = {
  name: 'Inline usage — buttons and cards',
  render: () => (
    <div className="p-8 bg-[var(--ds-bg-base)] space-y-4 max-w-sm">
      <button type="button" disabled className="inline-flex items-center gap-2 h-9 px-4 rounded-lg bg-[var(--ds-brand-600)] text-white text-sm opacity-70 cursor-not-allowed">
        <Spinner size="sm" variant="white" />
        Syncing vendors…
      </button>
      <button type="button" disabled className="inline-flex items-center gap-2 h-9 px-4 rounded-lg border border-[var(--ds-border-base)] text-[var(--ds-text-secondary)] text-sm opacity-70 cursor-not-allowed">
        <Spinner size="sm" variant="muted" />
        Generating report…
      </button>
    </div>
  ),
};

// ─── SpinnerOverlay ───────────────────────────────────────────────────────────

export const OverlayStory: Story = {
  name: 'SpinnerOverlay — panel loading state',
  render: () => (
    <div className="p-8 bg-[var(--ds-bg-base)]">
      <div className="relative h-48 bg-[var(--ds-bg-surface)] border border-[var(--ds-border-base)] rounded-xl overflow-hidden">
        <div className="p-5">
          <p className="text-sm font-semibold text-[var(--ds-text-primary)] mb-2">Vendor Risk Register</p>
          <div className="space-y-2">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-4 rounded bg-[var(--ds-bg-subtle)]" />
            ))}
          </div>
        </div>
        <SpinnerOverlay label="Loading vendors…" />
      </div>
    </div>
  ),
};
