import type { Meta, StoryObj } from '@storybook/react';
import { useState, useEffect } from 'react';
import { CircularProgress } from './CircularProgress';

const meta: Meta<typeof CircularProgress> = {
  title: 'Feedback/CircularProgress',
  component: CircularProgress,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'SVG circular progress ring for scores, completion rates, and health indicators. 5 variants, 4 sizes. Centre slot accepts custom label or defaults to percentage.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof CircularProgress>;

export const Playground: Story = {
  render: () => (
    <div className="p-8 bg-[var(--ds-bg-base)] flex items-center gap-6">
      <CircularProgress value={78} variant="brand" size="lg" aria-label="Risk score 78%" />
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="p-8 bg-[var(--ds-bg-base)] flex flex-wrap gap-6">
      {([
        ['brand',   78,  'Compliance score'],
        ['success', 94,  'Passed controls'],
        ['warning', 52,  'Review rate'],
        ['danger',  18,  'Critical findings'],
        ['muted',   60,  'Progress'],
      ] as const).map(([v, val, lbl]) => (
        <div key={v} className="flex flex-col items-center gap-2">
          <CircularProgress value={val} variant={v} size="lg" aria-label={`${lbl}: ${val}%`} />
          <span className="text-xs text-[var(--ds-text-muted)]">{lbl}</span>
        </div>
      ))}
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="p-8 bg-[var(--ds-bg-base)] flex items-end gap-6">
      {(['sm', 'md', 'lg', 'xl'] as const).map(s => (
        <div key={s} className="flex flex-col items-center gap-2">
          <CircularProgress value={73} size={s} aria-label={`73% – size ${s}`} />
          <span className="text-xs text-[var(--ds-text-muted)]">{s}</span>
        </div>
      ))}
    </div>
  ),
};

export const CustomLabel: Story = {
  name: 'Custom centre label',
  render: () => (
    <div className="p-8 bg-[var(--ds-bg-base)] flex flex-wrap gap-6 items-end">
      <div className="flex flex-col items-center gap-2">
        <CircularProgress value={83} size="xl" variant="brand" label="83" aria-label="83 risk score" />
        <span className="text-xs text-[var(--ds-text-muted)]">Score</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <CircularProgress value={60} size="xl" variant="warning" label="12/20" aria-label="12 of 20 vendors reviewed" />
        <span className="text-xs text-[var(--ds-text-muted)]">Reviewed</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <CircularProgress value={100} size="xl" variant="success" label="✓" aria-label="Completed" />
        <span className="text-xs text-[var(--ds-text-muted)]">Done</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <CircularProgress value={30} size="xl" variant="danger" showValue={false} label={null} aria-label="30% critical" />
        <span className="text-xs text-[var(--ds-text-muted)]">No label</span>
      </div>
    </div>
  ),
};

export const Animated: Story = {
  name: 'Animated — live score',
  render: () => {
    const [score, setScore] = useState(0);
    useEffect(() => {
      const t = setTimeout(() => setScore(78), 300);
      return () => clearTimeout(t);
    }, []);
    return (
      <div className="p-8 bg-[var(--ds-bg-base)] flex items-center gap-4">
        <CircularProgress value={score} size="xl" variant="brand" aria-label={`Vendor score: ${score}%`} />
        <div>
          <p className="text-sm font-semibold text-[var(--ds-text-primary)]">Acme Corp</p>
          <p className="text-xs text-[var(--ds-text-muted)]">Compliance score animates on mount</p>
        </div>
      </div>
    );
  },
};

export const VendorScoreCards: Story = {
  name: 'In context — vendor score cards',
  render: () => {
    const vendors = [
      { name: 'Acme Corp',   score: 78, variant: 'brand'   as const },
      { name: 'GlobalSys',   score: 94, variant: 'success' as const },
      { name: 'DataVault',   score: 31, variant: 'danger'  as const },
      { name: 'SecureBase',  score: 55, variant: 'warning' as const },
    ];
    return (
      <div className="p-8 bg-[var(--ds-bg-base)] grid grid-cols-2 gap-4 max-w-md">
        {vendors.map(v => (
          <div
            key={v.name}
            className="bg-[var(--ds-bg-surface)] border border-[var(--ds-border-base)] rounded-xl p-4 flex items-center gap-4"
          >
            <CircularProgress value={v.score} variant={v.variant} size="md" aria-label={`${v.name}: ${v.score}%`} />
            <div>
              <p className="text-xs font-semibold text-[var(--ds-text-primary)]">{v.name}</p>
              <p className="text-[10px] text-[var(--ds-text-muted)]">Risk score</p>
            </div>
          </div>
        ))}
      </div>
    );
  },
};
