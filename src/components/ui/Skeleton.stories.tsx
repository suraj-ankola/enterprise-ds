import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton, SkeletonCard, SkeletonTable } from './Skeleton';

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<typeof Skeleton> = {
  title: 'Feedback/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['text', 'rect', 'circle'],
      description: 'Visual shape of the skeleton placeholder',
    },
    width: {
      control: 'text',
      description: 'Width of the skeleton — accepts a number (px) or any CSS width string',
    },
    height: {
      control: 'text',
      description: 'Height of the skeleton — accepts a number (px) or any CSS height string',
    },
    lines: {
      control: 'number',
      description: 'Number of text lines rendered when variant="text"',
    },
  },
  args: {
    variant: 'rect',
    lines:   3,
  },
  parameters: {
    docs: {
      description: {
        component:
          'Loading placeholder with `text`, `rect`, and `circle` variants. `SkeletonCard` and `SkeletonTable` are pre-composed patterns for common loading states. All use `animate-pulse` on `--ds-bg-subtle` — invisible in SSR, smooth in browser.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

// ─── Default ──────────────────────────────────────────────────────────────────

export const Default: Story = {};

// ─── Variants ─────────────────────────────────────────────────────────────────

export const Rect: Story = {
  args: { variant: 'rect', height: 80 },
};

export const Circle: Story = {
  args: { variant: 'circle', width: 40 },
};

export const Text: Story = {
  args: { variant: 'text', lines: 3 },
};

// ─── Sizes ────────────────────────────────────────────────────────────────────

export const TextSingleLine: Story = {
  name: 'Text — 1 line',
  args: { variant: 'text', lines: 1 },
};

export const TextFiveLines: Story = {
  name: 'Text — 5 lines',
  args: { variant: 'text', lines: 5 },
};

export const CircleSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Skeleton variant="circle" width={24} />
      <Skeleton variant="circle" width={32} />
      <Skeleton variant="circle" width={40} />
      <Skeleton variant="circle" width={56} />
      <Skeleton variant="circle" width={72} />
    </div>
  ),
};

// ─── All Variants ─────────────────────────────────────────────────────────────

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-10 max-w-xl">

      {/* Primitives */}
      <div className="flex flex-col gap-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-[var(--ds-text-muted)]">Primitives</p>

        <div className="flex items-center gap-4">
          <Skeleton variant="circle" width={32} />
          <Skeleton variant="circle" width={40} />
          <Skeleton variant="circle" width={56} />
        </div>

        <Skeleton variant="text" lines={1} />
        <Skeleton variant="text" lines={3} />
        <Skeleton variant="text" lines={5} />

        <Skeleton variant="rect" height={12} width="40%" />
        <Skeleton variant="rect" height={120} />
      </div>

      {/* SkeletonCard */}
      <div className="flex flex-col gap-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-[var(--ds-text-muted)]">SkeletonCard</p>
        <div className="grid grid-cols-2 gap-3">
          <SkeletonCard />
          <SkeletonCard avatar lines={2} />
        </div>
      </div>

      {/* SkeletonTable */}
      <div className="flex flex-col gap-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-[var(--ds-text-muted)]">SkeletonTable</p>
        <SkeletonTable rows={4} cols={5} />
      </div>

    </div>
  ),
};

// ─── Profile card pattern ─────────────────────────────────────────────────────

export const ProfileCard: Story = {
  render: () => (
    <div className="flex flex-col gap-4 max-w-sm">
      <div className="flex items-center gap-3">
        <Skeleton variant="circle" width={40} />
        <div className="flex-1 flex flex-col gap-2">
          <Skeleton variant="rect" height={14} width="55%" />
          <Skeleton variant="rect" height={11} width="35%" />
        </div>
      </div>
      <Skeleton variant="text" lines={3} />
      <Skeleton variant="rect" height={80} />
      <div className="flex gap-2">
        <Skeleton variant="rect" height={32} width={80} />
        <Skeleton variant="rect" height={32} width={80} />
      </div>
    </div>
  ),
};
