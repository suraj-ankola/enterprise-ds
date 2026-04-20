import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { CheckboxGroup } from './CheckboxGroup';
import type { CheckboxGroupProps } from './CheckboxGroup';

// ─── Shared option sets ───────────────────────────────────────────────────────

const NOTIFICATION_OPTIONS: CheckboxGroupProps['options'] = [
  { value: 'email',   label: 'Email notifications' },
  { value: 'sms',     label: 'SMS alerts' },
  { value: 'push',    label: 'Push notifications' },
  { value: 'slack',   label: 'Slack messages' },
];

const PERMISSION_OPTIONS: CheckboxGroupProps['options'] = [
  { value: 'read',    label: 'Read',   helperText: 'View records and reports' },
  { value: 'write',   label: 'Write',  helperText: 'Create and edit records' },
  { value: 'delete',  label: 'Delete', helperText: 'Permanently remove records' },
  { value: 'export',  label: 'Export', helperText: 'Download data as CSV or PDF', disabled: true },
];

const COMPLIANCE_OPTIONS: CheckboxGroupProps['options'] = [
  { value: 'gdpr',    label: 'GDPR' },
  { value: 'sox',     label: 'SOX' },
  { value: 'iso27001',label: 'ISO 27001' },
  { value: 'hipaa',   label: 'HIPAA',  disabled: true },
];

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<typeof CheckboxGroup> = {
  title: 'Forms/CheckboxGroup',
  component: CheckboxGroup,
  tags: ['autodocs'],
  argTypes: {
    size:        { control: 'select', options: ['sm', 'md', 'lg'] },
    orientation: { control: 'radio',  options: ['vertical', 'horizontal'] },
    disabled:    { control: 'boolean' },
    required:    { control: 'boolean' },
    label:       { control: 'text' },
    helperText:  { control: 'text' },
    errorMessage:{ control: 'text' },
    selectAllLabel: { control: 'text' },
    options:     { control: false },
    value:       { control: false },
    onChange:    { control: false },
  },
  args: {
    options:     NOTIFICATION_OPTIONS,
    label:       'Notification channels',
    size:        'md',
    orientation: 'vertical',
    disabled:    false,
    required:    false,
  },
  parameters: {
    docs: {
      description: {
        component:
          'A labeled group of checkboxes backed by a `<fieldset>`/`<legend>` for correct screen-reader semantics. Supports controlled (`value: string[]`) and uncontrolled (`defaultValue`) modes. Optional **Select all** checkbox with automatic indeterminate state. Per-option `disabled` and `helperText`. Group-level `errorMessage` and `helperText`. Vertical and horizontal orientations.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof CheckboxGroup>;

// ─── Base ─────────────────────────────────────────────────────────────────────

export const Default: Story = {};

export const WithDefaults: Story = {
  name: 'Pre-selected values',
  args: {
    defaultValue: ['email', 'push'],
  },
};

// ─── Select all ───────────────────────────────────────────────────────────────

export const WithSelectAll: Story = {
  name: 'Select all — indeterminate',
  args: {
    label: 'Notification channels',
    options: NOTIFICATION_OPTIONS,
    defaultValue: ['email'],
    selectAllLabel: 'Select all',
  },
};

export const SelectAllChecked: Story = {
  name: 'Select all — all checked',
  args: {
    label: 'Notification channels',
    options: NOTIFICATION_OPTIONS,
    defaultValue: ['email', 'sms', 'push', 'slack'],
    selectAllLabel: 'Select all',
  },
};

// ─── With helper text per option ──────────────────────────────────────────────

export const PermissionsGroup: Story = {
  name: 'Options with helper text',
  args: {
    label: 'User permissions',
    helperText: 'Select the access levels for this role.',
    options: PERMISSION_OPTIONS,
    defaultValue: ['read', 'write'],
    selectAllLabel: 'Grant all permissions',
  },
};

// ─── Orientation ─────────────────────────────────────────────────────────────

export const Horizontal: Story = {
  name: 'Orientation — Horizontal',
  args: {
    label: 'Compliance frameworks',
    options: COMPLIANCE_OPTIONS,
    orientation: 'horizontal',
    defaultValue: ['gdpr', 'sox'],
  },
};

// ─── States ───────────────────────────────────────────────────────────────────

export const ErrorState: Story = {
  name: 'State — Error',
  args: {
    label: 'Notification channels',
    options: NOTIFICATION_OPTIONS,
    required: true,
    errorMessage: 'Select at least one notification channel.',
  },
};

export const DisabledGroup: Story = {
  name: 'State — Disabled group',
  args: {
    label: 'Notification channels',
    options: NOTIFICATION_OPTIONS,
    defaultValue: ['email', 'push'],
    disabled: true,
    helperText: 'Notification settings are managed by your administrator.',
  },
};

export const MixedDisabled: Story = {
  name: 'State — Some options disabled',
  args: {
    label: 'User permissions',
    options: PERMISSION_OPTIONS,
    defaultValue: ['read', 'write'],
    selectAllLabel: 'Grant all permissions',
    helperText: 'Export access requires admin approval.',
  },
};

// ─── Sizes ────────────────────────────────────────────────────────────────────

export const SizeSmall: Story = {
  name: 'Size — Small',
  args: {
    label: 'Compliance frameworks',
    options: COMPLIANCE_OPTIONS,
    size: 'sm',
    selectAllLabel: 'Select all',
    defaultValue: ['gdpr'],
  },
};

export const SizeLarge: Story = {
  name: 'Size — Large',
  args: {
    label: 'Compliance frameworks',
    options: COMPLIANCE_OPTIONS,
    size: 'lg',
    selectAllLabel: 'Select all',
    defaultValue: ['gdpr'],
  },
};

// ─── Controlled (interactive) ─────────────────────────────────────────────────

export const Controlled: Story = {
  name: 'Controlled — live selection summary',
  render: () => {
    const [selected, setSelected] = useState<string[]>(['email']);

    return (
      <div className="flex flex-col gap-4 max-w-xs">
        <CheckboxGroup
          label="Notification channels"
          options={NOTIFICATION_OPTIONS}
          value={selected}
          onChange={setSelected}
          selectAllLabel="Select all"
          required
          helperText="Choose how you want to receive alerts."
        />
        <div className="p-3 rounded-lg bg-[var(--ds-bg-subtle)] text-xs text-[var(--ds-text-secondary)]">
          <span className="font-medium text-[var(--ds-text-primary)]">Selected: </span>
          {selected.length > 0 ? selected.join(', ') : 'none'}
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
        <CheckboxGroup
          key={size}
          label={`Size: ${size}`}
          options={NOTIFICATION_OPTIONS}
          defaultValue={['email']}
          size={size}
          selectAllLabel="Select all"
        />
      ))}
    </div>
  ),
};
