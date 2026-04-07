import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Toggle } from './Toggle';

const meta: Meta<typeof Toggle> = {
  title: 'Core/Toggle',
  component: Toggle,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Toggle size — track and thumb scale together on the 8pt grid',
    },
    labelPosition: {
      control: 'select',
      options: ['left', 'right'],
      description: 'Which side the label text appears on',
    },
    label: {
      control: 'text',
      description: 'Optional label text rendered beside the toggle',
    },
    disabled: {
      control: 'boolean',
      description: 'Prevents interaction and reduces opacity',
    },
    defaultChecked: {
      control: 'boolean',
      description: 'Initial checked state for uncontrolled usage',
    },
    onChange: {
      control: false,
      description: 'Callback fired with the new checked value on every toggle',
    },
  },
  args: {
    label:          'Enable notifications',
    labelPosition:  'right',
    size:           'md',
    disabled:       false,
    defaultChecked: false,
  },
  parameters: {
    docs: {
      description: {
        component: 'Binary on/off switch with `role="switch"` and `aria-checked`. Controlled via `checked`/`onChange` or uncontrolled via `defaultChecked`. 3 sizes on the 8pt grid. Label can appear on either side.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Toggle>;

// ─── Default ──────────────────────────────────────────────────────────────────

export const Default: Story = {};

// ─── States ───────────────────────────────────────────────────────────────────

export const Off: Story = {
  args: { label: 'Notifications', defaultChecked: false },
};

export const On: Story = {
  args: { label: 'Notifications', defaultChecked: true },
};

export const Disabled: Story = {
  args: { label: 'Audit log export', disabled: true },
};

export const DisabledChecked: Story = {
  args: { label: 'Audit log export', disabled: true, defaultChecked: true },
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

// ─── Label position ───────────────────────────────────────────────────────────

export const LabelLeft: Story = {
  args: { label: 'Label on left', labelPosition: 'left', defaultChecked: true },
};

export const LabelRight: Story = {
  args: { label: 'Label on right', labelPosition: 'right', defaultChecked: true },
};

// ─── No label ─────────────────────────────────────────────────────────────────

export const NoLabel: Story = {
  args: { defaultChecked: true },
};

// ─── Showcase ─────────────────────────────────────────────────────────────────

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      {(['sm', 'md', 'lg'] as const).map(size => (
        <div key={size} className="flex flex-col gap-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-[var(--ds-text-muted)]">
            {size}
          </p>
          <div className="flex flex-wrap gap-6 items-center">
            <Toggle size={size} />
            <Toggle size={size} defaultChecked />
            <Toggle size={size} label="Off" />
            <Toggle size={size} label="On" defaultChecked />
            <Toggle size={size} label="Disabled off" disabled />
            <Toggle size={size} label="Disabled on" disabled defaultChecked />
          </div>
        </div>
      ))}

      <div className="flex flex-col gap-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-[var(--ds-text-muted)]">
          Label position
        </p>
        <div className="flex flex-col gap-3 max-w-xs">
          <Toggle label="Label on right (default)" defaultChecked />
          <Toggle label="Label on left" labelPosition="left" defaultChecked />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-[var(--ds-text-muted)]">
          Settings list pattern
        </p>
        <div className="flex flex-col divide-y divide-[var(--ds-border-base)] border border-[var(--ds-border-base)] rounded-lg overflow-hidden max-w-sm">
          {[
            { label: 'Email alerts',        on: true  },
            { label: 'Slack notifications', on: true  },
            { label: 'Weekly digest',       on: false },
            { label: 'Audit log export',    on: false, disabled: true },
          ].map(({ label, on, disabled }) => (
            <div key={label} className="flex items-center justify-between px-4 py-3 bg-[var(--ds-bg-surface)]">
              <span className="text-sm text-[var(--ds-text-primary)]">{label}</span>
              <Toggle defaultChecked={on} disabled={disabled} />
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
};
