import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Slider } from './Slider';

const meta: Meta<typeof Slider> = {
  title: 'Forms/Slider',
  component: Slider,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Range input with DS-token filled track and custom thumb. Supports label, formatted value display, tick marks, and disabled state. Fully keyboard accessible.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Slider>;

export const Playground: Story = {
  render: () => {
    const [v, setV] = useState(40);
    return (
      <div className="p-8 bg-[var(--ds-bg-base)] max-w-sm">
        <Slider label="Risk threshold" showValue value={v} onChange={setV} />
      </div>
    );
  },
};

export const WithFormatting: Story = {
  name: 'Custom value formatting',
  render: () => {
    const [score, setScore]  = useState(75);
    const [budget, setBudget] = useState(50000);
    return (
      <div className="p-8 bg-[var(--ds-bg-base)] max-w-sm space-y-6">
        <Slider
          label="Minimum risk score"
          showValue
          value={score}
          onChange={setScore}
          formatValue={v => `${v} / 100`}
        />
        <Slider
          label="Annual budget cap"
          showValue
          min={0}
          max={200000}
          step={5000}
          value={budget}
          onChange={setBudget}
          formatValue={v => `$${v.toLocaleString()}`}
        />
      </div>
    );
  },
};

export const WithTicks: Story = {
  name: 'Tick marks',
  render: () => {
    const [sla, setSla] = useState(30);
    return (
      <div className="p-8 bg-[var(--ds-bg-base)] max-w-sm">
        <Slider
          label="SLA window (days)"
          showValue
          min={0}
          max={90}
          step={30}
          ticks
          value={sla}
          onChange={setSla}
          formatValue={v => `${v}d`}
        />
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <div className="p-8 bg-[var(--ds-bg-base)] max-w-sm">
      <Slider label="Read-only threshold" showValue value={65} onChange={() => {}} disabled />
    </div>
  ),
};

export const InFilterPanel: Story = {
  name: 'In context — risk filter panel',
  render: () => {
    const [min, setMin] = useState(20);
    const [max, setMax] = useState(80);
    return (
      <div className="p-8 bg-[var(--ds-bg-base)] max-w-xs">
        <div className="bg-[var(--ds-bg-surface)] border border-[var(--ds-border-base)] rounded-xl p-5 space-y-5">
          <p className="text-sm font-semibold text-[var(--ds-text-primary)]">Risk score range</p>
          <Slider
            label="Minimum"
            showValue
            value={min}
            onChange={v => setMin(Math.min(v, max - 5))}
            formatValue={v => String(v)}
          />
          <Slider
            label="Maximum"
            showValue
            value={max}
            onChange={v => setMax(Math.max(v, min + 5))}
            formatValue={v => String(v)}
          />
          <p className="text-xs text-[var(--ds-text-muted)]">
            Showing vendors with scores {min}–{max}
          </p>
        </div>
      </div>
    );
  },
};
