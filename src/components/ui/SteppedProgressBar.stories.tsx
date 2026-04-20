import React, { useState, useEffect } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { SteppedProgressBar } from './SteppedProgressBar';
import { Button } from './Button';

const meta: Meta<typeof SteppedProgressBar> = {
  title: 'Feedback/SteppedProgressBar',
  component: SteppedProgressBar,
  tags: ['autodocs'],
  argTypes: {
    steps:       { control: { type: 'number', min: 2, max: 8 } },
    currentStep: { control: { type: 'number', min: 1, max: 8 } },
    variant:     { control: 'select', options: ['brand', 'success', 'warning', 'danger'] },
    size:        { control: 'select', options: ['xs', 'sm', 'md'] },
    showCounter: { control: 'boolean' },
    labels:      { control: false },
  },
  args: { steps: 4, currentStep: 2, variant: 'brand', size: 'sm', showCounter: false },
  parameters: {
    docs: {
      description: {
        component:
          'Step-completion bar showing N equal-width segments. Completed steps use the full variant colour, the active step uses a lighter tint, and future steps use the border token. Supports optional step labels and a "Step X of Y" counter.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof SteppedProgressBar>;

export const Default: Story = {};

export const WithCounter: Story = {
  args: { steps: 4, currentStep: 2, showCounter: true },
};

export const WithLabels: Story = {
  args: {
    steps: 4, currentStep: 2, showCounter: true,
    labels: ['Details', 'Contracts', 'Review', 'Submit'],
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-6 max-w-sm">
      {(['brand', 'success', 'warning', 'danger'] as const).map((v) => (
        <SteppedProgressBar key={v} steps={4} currentStep={3} variant={v} size="sm" showCounter />
      ))}
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 max-w-sm">
      {(['xs', 'sm', 'md'] as const).map((s) => (
        <div key={s} className="flex flex-col gap-1">
          <p className="text-xs text-[var(--ds-text-muted)]">{s}</p>
          <SteppedProgressBar steps={5} currentStep={3} size={s} />
        </div>
      ))}
    </div>
  ),
};

export const StepOne: Story  = { name: 'Step 1 of 4', args: { steps: 4, currentStep: 1, showCounter: true } };
export const StepTwo: Story  = { name: 'Step 2 of 4', args: { steps: 4, currentStep: 2, showCounter: true } };
export const StepDone: Story = { name: 'Step 4 of 4 (complete)', args: { steps: 4, currentStep: 4, showCounter: true, variant: 'success' } };

export const Interactive: Story = {
  render: () => {
    const [step, setStep] = useState(1);
    const total = 5;
    const labels = ['Account', 'Company', 'Vendors', 'Review', 'Done'];
    return (
      <div className="flex flex-col gap-4 max-w-sm">
        <SteppedProgressBar steps={total} currentStep={step} showCounter labels={labels} size="sm" />
        <div className="flex gap-2">
          <Button size="sm" variant="secondary" disabled={step <= 1} onClick={() => setStep(s => s - 1)}>Back</Button>
          <Button size="sm" variant="primary"   disabled={step >= total} onClick={() => setStep(s => s + 1)}>Next</Button>
        </div>
      </div>
    );
  },
};
