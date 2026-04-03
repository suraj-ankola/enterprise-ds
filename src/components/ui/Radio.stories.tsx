import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Radio, RadioGroup } from './Radio';

const meta: Meta<typeof Radio> = {
  title: 'UI/Radio',
  component: Radio,
  argTypes: { onChange: { control: false } },
  parameters: {
    docs: {
      description: {
        component: '`RadioGroup` wraps individual `Radio` items in a `fieldset`/`legend` for ARIA grouping. Context-driven: `RadioGroup` passes name, value, onChange, size, and disabled to all children. Standalone `Radio` works for single-option patterns.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Radio>;

export const Playground: Story = {
  render: () => {
    const [val, setVal] = useState('medium');
    return (
      <div className="flex flex-col gap-4 max-w-xs">
        <RadioGroup
          label="Risk Level"
          value={val}
          onChange={setVal}
          helperText="Select the classification for this vendor."
        >
          <Radio value="critical" label="Critical"  helperText="Immediate escalation required" />
          <Radio value="high"     label="High" />
          <Radio value="medium"   label="Medium" />
          <Radio value="low"      label="Low" />
          <Radio value="minimal"  label="Minimal" disabled helperText="Requires approval" />
        </RadioGroup>
        <p className="text-xs text-[var(--ds-text-muted)]">
          Selected: <span className="font-medium text-[var(--ds-text-primary)]">{val}</span>
        </p>
      </div>
    );
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-10">
      {(['sm', 'md', 'lg'] as const).map(size => (
        <div key={size} className="flex flex-col gap-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-[var(--ds-text-muted)] mb-1">
            {size}
          </p>
          <RadioGroup value="b" onChange={() => {}} size={size}>
            <Radio value="a" label="Option A" />
            <Radio value="b" label="Option B — selected" />
            <Radio value="c" label="Option C" helperText="Additional context for this option." />
            <Radio value="d" label="Option D — disabled" disabled />
          </RadioGroup>
        </div>
      ))}

      <div className="flex flex-col gap-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-[var(--ds-text-muted)] mb-1">
          Group error state
        </p>
        <RadioGroup
          value=""
          onChange={() => {}}
          label="Priority"
          errorMessage="Please select a priority level."
        >
          <Radio value="p1" label="P1 — Critical" />
          <Radio value="p2" label="P2 — High" />
          <Radio value="p3" label="P3 — Medium" />
        </RadioGroup>
      </div>
    </div>
  ),
};
