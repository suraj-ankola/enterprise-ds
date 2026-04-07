import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Radio, RadioGroup } from './Radio';

const meta: Meta<typeof Radio> = {
  title: 'Core/Radio',
  component: Radio,
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'text',
      description: 'The value submitted when this radio is selected',
    },
    label: {
      control: 'text',
      description: 'Label text rendered next to the radio button',
    },
    helperText: {
      control: 'text',
      description: 'Supporting text below the label',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Radio size — circle and text scale together',
    },
    disabled: {
      control: 'boolean',
      description: 'Prevents interaction and reduces opacity',
    },
    checked: {
      control: 'boolean',
      description: 'Checked state for standalone (non-RadioGroup) usage',
    },
    onChange: {
      control: false,
      description: 'Callback fired with the selected value — used in standalone mode',
    },
  },
  args: {
    value:    'option',
    label:    'Option label',
    size:     'md',
    disabled: false,
  },
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

// ─── Default ──────────────────────────────────────────────────────────────────

export const Default: Story = {
  args: { value: 'option', label: 'Radio option', checked: false },
};

// ─── States ───────────────────────────────────────────────────────────────────

export const Unselected: Story = {
  args: { value: 'option', label: 'Unselected', checked: false },
};

export const Selected: Story = {
  args: { value: 'option', label: 'Selected', checked: true },
};

export const WithHelperText: Story = {
  args: {
    value:      'critical',
    label:      'Critical',
    helperText: 'Immediate escalation required',
    checked:    true,
  },
};

export const Disabled: Story = {
  args: { value: 'option', label: 'Disabled option', disabled: true },
};

export const DisabledSelected: Story = {
  args: { value: 'option', label: 'Disabled selected', disabled: true, checked: true },
};

// ─── Sizes ────────────────────────────────────────────────────────────────────

export const Small: Story = {
  args: { size: 'sm', value: 'sm', label: 'Small', checked: true },
};

export const Medium: Story = {
  args: { size: 'md', value: 'md', label: 'Medium', checked: true },
};

export const Large: Story = {
  args: { size: 'lg', value: 'lg', label: 'Large', checked: true },
};

// ─── RadioGroup ───────────────────────────────────────────────────────────────

export const Group: Story = {
  name: 'RadioGroup',
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

export const GroupWithError: Story = {
  name: 'RadioGroup — Error state',
  render: () => (
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
  ),
};

// ─── Showcase ─────────────────────────────────────────────────────────────────

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
