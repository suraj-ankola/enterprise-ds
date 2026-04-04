import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton, SkeletonCard, SkeletonTable } from './Skeleton';

const meta: Meta<typeof Skeleton> = {
  title: 'UI/Skeleton',
  component: Skeleton,
  parameters: {
    docs: {
      description: {
        component: 'Loading placeholder with `text`, `rect`, and `circle` variants. `SkeletonCard` and `SkeletonTable` are pre-composed patterns for common loading states. All use `animate-pulse` on `--ds-bg-subtle` — invisible in SSR, smooth in browser.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Skeleton>;

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {
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

      {/* SkeletonCard — no avatar */}
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
