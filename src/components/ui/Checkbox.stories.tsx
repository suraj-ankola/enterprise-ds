import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Checkbox } from './Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Core/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Checkbox size — box, icon, and text scale together',
    },
    label: {
      control: 'text',
      description: 'Label text rendered next to the checkbox',
    },
    helperText: {
      control: 'text',
      description: 'Supporting text below the label (replaced by errorMessage when set)',
    },
    errorMessage: {
      control: 'text',
      description: 'Error message — replaces helperText and applies danger border color',
    },
    disabled: {
      control: 'boolean',
      description: 'Prevents interaction and reduces opacity',
    },
    defaultChecked: {
      control: 'boolean',
      description: 'Initial checked state for uncontrolled usage',
    },
    indeterminate: {
      control: 'boolean',
      description: 'Shows a dash — used for "select all" when some rows are selected',
    },
    onChange: {
      control: false,
      description: 'Callback fired with the new checked boolean on every change',
    },
  },
  args: {
    label:          'Accept terms and conditions',
    helperText:     'You must agree before proceeding.',
    size:           'md',
    disabled:       false,
    indeterminate:  false,
    defaultChecked: false,
  },
  parameters: {
    docs: {
      description: {
        component: 'Controlled/uncontrolled checkbox. Supports `indeterminate` state for select-all patterns. Hidden native input + custom visual with focus ring via CSS `peer` variant. 3 sizes. Renders a stable `<CheckIcon>` at all times (opacity toggle) to prevent layout shift.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Checkbox>;

// ─── Default ──────────────────────────────────────────────────────────────────

export const Default: Story = {};

// ─── States ───────────────────────────────────────────────────────────────────

export const Unchecked: Story = {
  args: { label: 'Unchecked', defaultChecked: false },
};

export const Checked: Story = {
  args: { label: 'Checked', defaultChecked: true },
};

export const Indeterminate: Story = {
  args: { label: 'Select all (indeterminate)', indeterminate: true },
};

export const Disabled: Story = {
  args: { label: 'Disabled', disabled: true },
};

export const DisabledChecked: Story = {
  args: { label: 'Disabled checked', disabled: true, defaultChecked: true },
};

// ─── With text ────────────────────────────────────────────────────────────────

export const WithHelperText: Story = {
  args: {
    label:      'Email notifications',
    helperText: 'Receive weekly digest and alerts.',
    defaultChecked: true,
  },
};

export const WithError: Story = {
  args: {
    label:        'Accept terms and conditions',
    errorMessage: 'You must accept the terms to continue.',
  },
};

// ─── Sizes ────────────────────────────────────────────────────────────────────

export const Small: Story = {
  args: { size: 'sm', label: 'Small', defaultChecked: true },
};

export const Medium: Story = {
  args: { size: 'md', label: 'Medium', defaultChecked: true },
};

export const Large: Story = {
  args: { size: 'lg', label: 'Large', defaultChecked: true },
};

// ─── Showcase ─────────────────────────────────────────────────────────────────

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      {(['sm', 'md', 'lg'] as const).map(size => (
        <div key={size} className="flex flex-col gap-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-[var(--ds-text-muted)]">
            {size}
          </p>
          <div className="flex flex-wrap gap-6 items-start">
            <Checkbox size={size} label="Unchecked" />
            <Checkbox size={size} label="Checked" defaultChecked />
            <Checkbox size={size} label="Indeterminate" indeterminate />
            <Checkbox size={size} label="Disabled" disabled />
            <Checkbox size={size} label="Disabled checked" disabled defaultChecked />
            <Checkbox
              size={size}
              label="With error"
              errorMessage="This field is required."
            />
          </div>
        </div>
      ))}

      <div className="flex flex-col gap-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-[var(--ds-text-muted)]">
          With helper text
        </p>
        <div className="flex flex-wrap gap-6 items-start">
          <Checkbox
            label="Email notifications"
            helperText="Receive weekly digest and alerts."
            defaultChecked
          />
          <Checkbox
            label="Marketing emails"
            helperText="Product updates and announcements."
          />
          <Checkbox
            label="Audit log export"
            helperText="Requires admin approval."
            disabled
          />
        </div>
      </div>
    </div>
  ),
};

export const Playground: Story = {
  args: {
    label:          'Accept terms and conditions',
    helperText:     'You must agree before proceeding.',
    size:           'md',
    disabled:       false,
    indeterminate:  false,
    defaultChecked: false,
  },
};
