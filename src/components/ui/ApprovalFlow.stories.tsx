import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { ApprovalFlow, type ApprovalStep } from './ApprovalFlow';

const meta: Meta<typeof ApprovalFlow> = {
  title: 'Workflow/ApprovalFlow',
  component: ApprovalFlow,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Multi-step approval workflow UI with vertical or horizontal layout. Each step shows status (pending, approved, rejected, skipped), optional assignee, timestamp, and comment. When `onApprove`/`onReject` callbacks are provided, an interactive decision area appears on the current pending step.',
      },
    },
    layout: 'padded',
  },
  argTypes: {
    direction: {
      description: 'Layout direction',
      control: { type: 'radio' },
      options: ['vertical', 'horizontal'],
    },
    steps: { control: false },
    onApprove: { action: 'approved' },
    onReject:  { action: 'rejected'  },
  },
  args: {
    direction: 'vertical',
  },
};
export default meta;
type Story = StoryObj<typeof ApprovalFlow>;

const VENDOR_STEPS: ApprovalStep[] = [
  {
    id: 's1',
    label: 'Security review',
    description: 'Verify SOC 2 / ISO 27001 certification',
    status: 'approved',
    assignee: { name: 'Priya Sharma' },
    decidedAt: '2 days ago',
    comment: 'Certification confirmed — valid until Q4 2026.',
  },
  {
    id: 's2',
    label: 'Legal review',
    description: 'DPA and contract alignment',
    status: 'approved',
    assignee: { name: 'Marcus Lee' },
    decidedAt: '1 day ago',
  },
  {
    id: 's3',
    label: 'Finance approval',
    description: 'Budget authorisation over $50k',
    status: 'pending',
    assignee: { name: 'You' },
  },
  {
    id: 's4',
    label: 'CISO sign-off',
    status: 'pending',
  },
];

export const Playground: Story = {
  render: (args) => {
    const [steps, setSteps] = useState<ApprovalStep[]>(VENDOR_STEPS);

    function decide(stepId: string, decision: 'approved' | 'rejected', comment?: string) {
      setSteps(prev => prev.map(s =>
        s.id === stepId ? { ...s, status: decision, comment, decidedAt: 'just now' } : s,
      ));
    }

    return (
      <div className="max-w-sm bg-[var(--ds-bg-surface)] border border-[var(--ds-border-base)] rounded-xl p-5">
        <ApprovalFlow
          {...args}
          steps={steps}
          onApprove={(id, c) => { decide(id, 'approved', c); args.onApprove?.(id, c); }}
          onReject={(id, c)  => { decide(id, 'rejected', c); args.onReject?.(id, c);  }}
        />
      </div>
    );
  },
};

export const Horizontal: Story = {
  name: 'Horizontal layout',
  render: () => (
    <div className="bg-[var(--ds-bg-surface)] border border-[var(--ds-border-base)] rounded-xl p-5">
      <ApprovalFlow
        direction="horizontal"
        steps={VENDOR_STEPS}
      />
    </div>
  ),
};

export const AllApproved: Story = {
  name: 'All steps approved',
  render: () => (
    <div className="max-w-sm bg-[var(--ds-bg-surface)] border border-[var(--ds-border-base)] rounded-xl p-5">
      <ApprovalFlow
        steps={VENDOR_STEPS.map(s => ({ ...s, status: 'approved', decidedAt: '3 days ago' }))}
      />
    </div>
  ),
};

export const Rejected: Story = {
  name: 'Rejected at step 2',
  render: () => (
    <div className="max-w-sm bg-[var(--ds-bg-surface)] border border-[var(--ds-border-base)] rounded-xl p-5">
      <ApprovalFlow
        steps={[
          { ...VENDOR_STEPS[0], status: 'approved', decidedAt: '2 days ago' },
          { ...VENDOR_STEPS[1], status: 'rejected', decidedAt: '1 day ago', comment: 'DPA does not meet GDPR requirements — requires revision.' },
          { ...VENDOR_STEPS[2], status: 'skipped' },
          { ...VENDOR_STEPS[3], status: 'skipped' },
        ]}
      />
    </div>
  ),
};
