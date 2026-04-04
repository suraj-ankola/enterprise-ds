import type { Meta, StoryObj } from '@storybook/react';
import { useState, useEffect } from 'react';
import { Progress } from './Progress';

const meta: Meta<typeof Progress> = {
  title: 'UI/Progress',
  component: Progress,
  parameters: {
    docs: {
      description: {
        component: 'Progress bar with `value` (0–100), 5 colour variants, 4 sizes. `indeterminate` for unknown duration tasks. `showValue` renders a percentage label. ARIA `role="progressbar"` with `aria-valuenow/min/max`.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Progress>;

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {
  render: () => {
    const [value, setValue] = useState(65);
    return (
      <div className="max-w-sm flex flex-col gap-6">
        <Progress value={value} label="Compliance score" showValue />
        <input
          type="range" min={0} max={100} value={value}
          onChange={e => setValue(Number(e.target.value))}
          className="w-full"
        />
      </div>
    );
  },
};

// ─── All Variants ─────────────────────────────────────────────────────────────

export const AllVariants: Story = {
  render: () => {
    const [live, setLive] = useState(0);
    useEffect(() => {
      const t = setInterval(() => setLive(v => (v >= 100 ? 0 : v + 2)), 80);
      return () => clearInterval(t);
    }, []);

    return (
      <div className="max-w-sm flex flex-col gap-6">

        {/* Variants */}
        <div className="flex flex-col gap-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-[var(--ds-text-muted)]">Variants</p>
          <Progress value={78} variant="brand"   label="Brand"   showValue />
          <Progress value={91} variant="success" label="Success" showValue />
          <Progress value={55} variant="warning" label="Warning" showValue />
          <Progress value={34} variant="danger"  label="Danger"  showValue />
          <Progress value={60} variant="neutral" label="Neutral" showValue />
        </div>

        {/* Sizes */}
        <div className="flex flex-col gap-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-[var(--ds-text-muted)]">Sizes</p>
          <Progress value={65} size="xs" />
          <Progress value={65} size="sm" />
          <Progress value={65} size="md" />
          <Progress value={65} size="lg" />
        </div>

        {/* Indeterminate */}
        <div className="flex flex-col gap-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-[var(--ds-text-muted)]">Indeterminate</p>
          <Progress value={0} indeterminate label="Syncing vendors…" />
          <Progress value={0} indeterminate variant="success" size="sm" />
        </div>

        {/* Animated */}
        <div className="flex flex-col gap-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-[var(--ds-text-muted)]">Live animated</p>
          <Progress value={live} variant={live < 40 ? 'danger' : live < 70 ? 'warning' : 'success'} showValue size="lg" />
        </div>

        {/* Real-world patterns */}
        <div className="flex flex-col gap-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-[var(--ds-text-muted)]">Risk scores</p>
          {[
            { name: 'Acme Corp',        score: 78, variant: 'danger'  as const },
            { name: 'Beta Systems',     score: 55, variant: 'warning' as const },
            { name: 'Gamma Analytics',  score: 91, variant: 'success' as const },
          ].map(({ name, score, variant }) => (
            <div key={name} className="flex items-center gap-3">
              <span className="text-sm text-[var(--ds-text-secondary)] w-32 truncate">{name}</span>
              <div className="flex-1">
                <Progress value={score} variant={variant} size="sm" />
              </div>
              <span className="text-xs tabular-nums text-[var(--ds-text-muted)] w-8 text-right">{score}</span>
            </div>
          ))}
        </div>
      </div>
    );
  },
};
