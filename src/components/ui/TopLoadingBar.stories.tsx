import React, { useState, useEffect } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { TopLoadingBar } from './TopLoadingBar';
import { Button } from './Button';

const meta: Meta<typeof TopLoadingBar> = {
  title: 'Feedback/TopLoadingBar',
  component: TopLoadingBar,
  tags: ['autodocs'],
  argTypes: {
    progress:      { control: { type: 'range', min: 0, max: 100, step: 5 } },
    indeterminate: { control: 'boolean' },
    variant:       { control: 'select', options: ['brand', 'success', 'warning', 'danger'] },
    height:        { control: { type: 'number', min: 1, max: 8 } },
  },
  args: { progress: 60, indeterminate: false, variant: 'brand', height: 3 },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Thin progress bar pinned to the top of its nearest positioned parent. Two modes: deterministic (`progress` 0–100) and `indeterminate` (animated sweep). Completes and fades out automatically when `progress` reaches 100.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof TopLoadingBar>;

export const Default: Story = {
  render: (args) => (
    <div className="relative h-24 bg-[var(--ds-bg-base)]">
      <TopLoadingBar {...args} />
      <p className="pt-8 text-center text-sm text-[var(--ds-text-muted)]">Page content</p>
    </div>
  ),
};

export const Indeterminate: Story = {
  args: { indeterminate: true },
  render: (args) => (
    <div className="relative h-24 bg-[var(--ds-bg-base)]">
      <TopLoadingBar {...args} />
      <p className="pt-8 text-center text-sm text-[var(--ds-text-muted)]">Loading page…</p>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      {(['brand', 'success', 'warning', 'danger'] as const).map((v) => (
        <div key={v} className="relative h-10 bg-[var(--ds-bg-surface)] border border-[var(--ds-border-base)] rounded-lg overflow-hidden">
          <TopLoadingBar variant={v} progress={65} height={4} />
          <p className="pt-3 text-center text-xs text-[var(--ds-text-muted)]">{v}</p>
        </div>
      ))}
    </div>
  ),
};

export const SimulatedLoad: Story = {
  name: 'Simulated page load',
  render: () => {
    const [progress, setProgress] = useState(0);
    const [running,  setRunning]  = useState(false);

    const start = () => {
      setProgress(0);
      setRunning(true);
    };

    useEffect(() => {
      if (!running) return;
      if (progress >= 100) { setRunning(false); return; }
      const timer = setTimeout(() => setProgress((p) => Math.min(p + Math.random() * 15 + 5, 100)), 200);
      return () => clearTimeout(timer);
    }, [running, progress]);

    return (
      <div className="relative h-40 bg-[var(--ds-bg-base)] flex flex-col items-center justify-center gap-4">
        <TopLoadingBar progress={progress} />
        <Button size="sm" variant="primary" onClick={start} disabled={running}>
          {running ? 'Loading…' : 'Simulate page load'}
        </Button>
        {!running && progress === 100 && (
          <p className="text-sm text-[var(--ds-success-text)]">Page loaded!</p>
        )}
      </div>
    );
  },
};
