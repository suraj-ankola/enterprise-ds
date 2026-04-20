import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { RadioGroup } from './RadioGroup';
import type { RadioGroupProps } from './RadioGroup';

// ─── Shared option sets ───────────────────────────────────────────────────────

const PLAN_OPTIONS: RadioGroupProps['options'] = [
  { value: 'starter',    label: 'Starter',    helperText: 'Up to 5 users · 10 GB storage' },
  { value: 'growth',     label: 'Growth',     helperText: 'Up to 25 users · 100 GB storage' },
  { value: 'enterprise', label: 'Enterprise', helperText: 'Unlimited users · Custom storage' },
];

const ROLE_OPTIONS: RadioGroupProps['options'] = [
  { value: 'viewer',  label: 'Viewer',  helperText: 'Read-only access to all reports' },
  { value: 'editor',  label: 'Editor',  helperText: 'Create and edit records' },
  { value: 'admin',   label: 'Admin',   helperText: 'Full access including user management' },
  { value: 'owner',   label: 'Owner',   helperText: 'Billing and org-level settings', disabled: true },
];

const FREQUENCY_OPTIONS: RadioGroupProps['options'] = [
  { value: 'daily',   label: 'Daily' },
  { value: 'weekly',  label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'never',   label: 'Never' },
];

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<typeof RadioGroup> = {
  title: 'Forms/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
  argTypes: {
    size:        { control: 'select', options: ['sm', 'md', 'lg'] },
    orientation: { control: 'radio',  options: ['vertical', 'horizontal'] },
    disabled:    { control: 'boolean' },
    required:    { control: 'boolean' },
    label:       { control: 'text' },
    helperText:  { control: 'text' },
    errorMessage:{ control: 'text' },
    options:     { control: false },
    value:       { control: false },
    onChange:    { control: false },
  },
  args: {
    options:     FREQUENCY_OPTIONS,
    label:       'Report frequency',
    defaultValue: 'weekly',
    size:        'md',
    orientation: 'vertical',
    disabled:    false,
    required:    false,
  },
  parameters: {
    docs: {
      description: {
        component:
          'Data-driven radio group backed by `<fieldset>`/`<legend>` for correct screen-reader semantics. Supports controlled (`value: string`) and uncontrolled (`defaultValue`) modes. Per-option `disabled` and `helperText`. Group-level `errorMessage` and `helperText`. Vertical and horizontal orientations.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

// ─── Base ─────────────────────────────────────────────────────────────────────

export const Default: Story = {};

export const WithHelperText: Story = {
  name: 'Options with helper text',
  args: {
    label:   'Select a plan',
    options: PLAN_OPTIONS,
    defaultValue: 'growth',
    helperText: 'You can change your plan at any time.',
  },
};

// ─── Orientation ─────────────────────────────────────────────────────────────

export const Horizontal: Story = {
  name: 'Orientation — Horizontal',
  args: {
    label:       'Report frequency',
    options:     FREQUENCY_OPTIONS,
    orientation: 'horizontal',
    defaultValue: 'weekly',
  },
};

// ─── States ───────────────────────────────────────────────────────────────────

export const ErrorState: Story = {
  name: 'State — Error',
  args: {
    label:        'Select a role',
    options:      ROLE_OPTIONS,
    required:     true,
    errorMessage: 'You must select a role to continue.',
  },
};

export const DisabledGroup: Story = {
  name: 'State — Disabled group',
  args: {
    label:       'Select a plan',
    options:     PLAN_OPTIONS,
    defaultValue: 'starter',
    disabled:    true,
    helperText:  'Plan selection is managed by your administrator.',
  },
};

export const MixedDisabled: Story = {
  name: 'State — Some options disabled',
  args: {
    label:        'Assign role',
    options:      ROLE_OPTIONS,
    defaultValue: 'editor',
    helperText:   'Owner role requires a transfer request.',
  },
};

// ─── Sizes ────────────────────────────────────────────────────────────────────

export const SizeSmall: Story = {
  name: 'Size — Small',
  args: { size: 'sm', label: 'Report frequency', options: FREQUENCY_OPTIONS, defaultValue: 'weekly' },
};

export const SizeLarge: Story = {
  name: 'Size — Large',
  args: { size: 'lg', label: 'Report frequency', options: FREQUENCY_OPTIONS, defaultValue: 'weekly' },
};

// ─── Controlled ──────────────────────────────────────────────────────────────

export const Controlled: Story = {
  name: 'Controlled — live selection summary',
  render: () => {
    const [selected, setSelected] = useState('growth');

    return (
      <div className="flex flex-col gap-4 max-w-xs">
        <RadioGroup
          label="Select a plan"
          options={PLAN_OPTIONS}
          value={selected}
          onChange={setSelected}
          required
        />
        <div className="p-3 rounded-lg bg-[var(--ds-bg-subtle)] text-xs text-[var(--ds-text-secondary)]">
          <span className="font-medium text-[var(--ds-text-primary)]">Selected plan: </span>
          {selected || 'none'}
        </div>
      </div>
    );
  },
};

// ─── All sizes ────────────────────────────────────────────────────────────────

export const AllSizes: Story = {
  name: 'All sizes',
  render: () => (
    <div className="flex flex-row gap-12 items-start">
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <RadioGroup
          key={size}
          label={`Size: ${size}`}
          options={FREQUENCY_OPTIONS}
          defaultValue="weekly"
          size={size}
        />
      ))}
    </div>
  ),
};
