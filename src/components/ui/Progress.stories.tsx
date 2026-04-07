import React, { useState, useEffect } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Progress } from './Progress';

const meta: Meta<typeof Progress> = {
  title: 'Feedback/Progress',
  component: Progress,
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Current progress value (0–100, or 0–`max` if `max` is set)',
    },
    max: {
      control: { type: 'number', min: 1 },
      description: 'Maximum value — defaults to 100',
    },
    variant: {
      control: 'select',
      options: ['brand', 'success', 'warning', 'danger', 'neutral'],
      description: 'Fill colour variant',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'Track height on the 8pt grid',
    },
    label: {
      control: 'text',
      description: 'Optional label displayed above the bar',
    },
    showValue: {
      control: 'boolean',
      description: 'Show a percentage label to the right of the bar label',
    },
    indeterminate: {
      control: 'boolean',
      description: 'Animated indeterminate state — use when duration is unknown',
    },
  },
  args: {
    value:         65,
    variant:       'brand',
    size:          'md',
    showValue:     false,
    indeterminate: false,
  },
  parameters: {
    docs: {
      description: {
        component: 'Progress bar with `value` (0–100), 5 colour variants, 4 sizes. `indeterminate` for unknown-duration tasks. `showValue` renders a percentage label. ARIA `role="progressbar"` with `aria-valuenow/min/max`.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Progress>;

// ─── Default ──────────────────────────────────────────────────────────────────

export const Default: Story = {};

// ─── Variants ─────────────────────────────────────────────────────────────────

export const BrandVariant: Story = {
  name: 'Variant — Brand',
  args: { variant: 'brand', value: 78, label: 'Compliance score', showValue: true },
};

export const SuccessVariant: Story = {
  name: 'Variant — Success',
  args: { variant: 'success', value: 91, label: 'Onboarding complete', showValue: true },
};

export const WarningVariant: Story = {
  name: 'Variant — Warning',
  args: { variant: 'warning', value: 55, label: 'Risk level', showValue: true },
};

export const DangerVariant: Story = {
  name: 'Variant — Danger',
  args: { variant: 'danger', value: 34, label: 'Critical issues', showValue: true },
};

export const NeutralVariant: Story = {
  name: 'Variant — Neutral',
  args: { variant: 'neutral', value: 60, label: 'Storage used', showValue: true },
};

// ─── Sizes ────────────────────────────────────────────────────────────────────

export const ExtraSmall: Story = {
  args: { size: 'xs', value: 65 },
};

export const Small: Story = {
  args: { size: 'sm', value: 65 },
};

export const Medium: Story = {
  args: { size: 'md', value: 65 },
};

export const Large: Story = {
  args: { size: 'lg', value: 65 },
};

// ─── States ───────────────────────────────────────────────────────────────────

export const WithLabel: Story = {
  args: { value: 72, label: 'Compliance score', showValue: true },
};

export const ShowValue: Story = {
  args: { value: 48, showValue: true },
};

export const Indeterminate: Story = {
  args: { value: 0, indeterminate: true, label: 'Syncing vendors…' },
};

export const Empty: Story = {
  args: { value: 0, label: 'No progress yet' },
};

export const Full: Story = {
  args: { value: 100, variant: 'success', label: 'Complete', showValue: true },
};

// ─── Showcase ─────────────────────────────────────────────────────────────────

export const AllVariants: Story = {
  render: () => {
    const [live, setLive] = useState(0);
    useEffect(() => {
      const t = setInterval(() => setLive(v => (v >= 100 ? 0 : v + 2)), 80);
      return () => clearInterval(t);
    }, []);

    return (
      <div className="max-w-sm flex flex-col gap-6">

        <div className="flex flex-col gap-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-[var(--ds-text-muted)]">Variants</p>
          <Progress value={78} variant="brand"   label="Brand"   showValue />
          <Progress value={91} variant="success" label="Success" showValue />
          <Progress value={55} variant="warning" label="Warning" showValue />
          <Progress value={34} variant="danger"  label="Danger"  showValue />
          <Progress value={60} variant="neutral" label="Neutral" showValue />
        </div>

        <div className="flex flex-col gap-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-[var(--ds-text-muted)]">Sizes</p>
          <Progress value={65} size="xs" />
          <Progress value={65} size="sm" />
          <Progress value={65} size="md" />
          <Progress value={65} size="lg" />
        </div>

        <div className="flex flex-col gap-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-[var(--ds-text-muted)]">Indeterminate</p>
          <Progress value={0} indeterminate label="Syncing vendors…" />
          <Progress value={0} indeterminate variant="success" size="sm" />
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-[var(--ds-text-muted)]">Live animated</p>
          <Progress value={live} variant={live < 40 ? 'danger' : live < 70 ? 'warning' : 'success'} showValue size="lg" />
        </div>

        <div className="flex flex-col gap-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-[var(--ds-text-muted)]">Risk scores</p>
          {[
            { name: 'Acme Corp',       score: 78, variant: 'danger'  as const },
            { name: 'Beta Systems',    score: 55, variant: 'warning' as const },
            { name: 'Gamma Analytics', score: 91, variant: 'success' as const },
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
