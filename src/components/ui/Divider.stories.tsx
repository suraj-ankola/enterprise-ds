import type { Meta, StoryObj } from '@storybook/react';
import { Divider } from './Divider';

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<typeof Divider> = {
  title: 'Layout/Divider',
  component: Divider,
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Direction of the divider line',
    },
    variant: {
      control: 'select',
      options: ['base', 'strong', 'subtle', 'brand'],
      description: 'Border token used for the divider color',
    },
    label: {
      control: 'text',
      description: 'Optional text label rendered inline with the horizontal divider line',
    },
    labelAlign: {
      control: 'select',
      options: ['start', 'center', 'end'],
      description: 'Alignment of the label along the horizontal axis',
    },
  },
  args: {
    orientation: 'horizontal',
    variant:     'base',
    labelAlign:  'center',
  },
  parameters: {
    docs: {
      description: {
        component:
          'Horizontal or vertical separator. 4 variants using DS border tokens. Horizontal dividers support an optional label at start/center/end — useful for section headers and "or" separators in forms.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Divider>;

// ─── Default ──────────────────────────────────────────────────────────────────

export const Default: Story = {};

// ─── Variants ─────────────────────────────────────────────────────────────────

export const Base: Story = {
  args: { variant: 'base' },
};

export const Strong: Story = {
  args: { variant: 'strong' },
};

export const Subtle: Story = {
  args: { variant: 'subtle' },
};

export const Brand: Story = {
  args: { variant: 'brand' },
};

// ─── With Label ───────────────────────────────────────────────────────────────

export const WithLabelCenter: Story = {
  name: 'With label — center',
  args: { label: 'OR' },
};

export const WithLabelStart: Story = {
  name: 'With label — start',
  args: { label: 'Compliance frameworks', labelAlign: 'start' },
};

export const WithLabelEnd: Story = {
  name: 'With label — end',
  args: { label: 'Advanced settings', labelAlign: 'end', variant: 'strong' },
};

// ─── All Variants ─────────────────────────────────────────────────────────────

export const AllVariants: Story = {
  render: () => (
    <div className="max-w-md space-y-6">
      {(['base', 'strong', 'subtle', 'brand'] as const).map(v => (
        <div key={v} className="space-y-1">
          <p className="text-xs text-[var(--ds-text-muted)]">{v}</p>
          <Divider variant={v} />
        </div>
      ))}
    </div>
  ),
};

// ─── With Label Positions ─────────────────────────────────────────────────────

export const WithLabel: Story = {
  render: () => (
    <div className="max-w-md space-y-6">
      <Divider label="OR" />
      <Divider label="Compliance frameworks" labelAlign="start" />
      <Divider label="Advanced settings" labelAlign="end" variant="strong" />
      <Divider label="Last 30 days" labelAlign="center" variant="brand" />
    </div>
  ),
};

// ─── Vertical ─────────────────────────────────────────────────────────────────

export const Vertical: Story = {
  render: () => (
    <div className="flex items-center gap-4 h-8">
      <span className="text-sm text-[var(--ds-text-secondary)]">Vendors</span>
      <Divider orientation="vertical" />
      <span className="text-sm text-[var(--ds-text-secondary)]">460</span>
      <Divider orientation="vertical" />
      <span className="text-sm text-[var(--ds-text-secondary)]">Risk: Critical</span>
      <Divider orientation="vertical" variant="brand" />
      <span className="text-sm text-[var(--ds-brand-600)] font-medium">12 open</span>
    </div>
  ),
};

// ─── In context ───────────────────────────────────────────────────────────────

export const InCard: Story = {
  name: 'In context — Card sections',
  render: () => (
    <div className="max-w-sm">
      <div className="bg-[var(--ds-bg-surface)] border border-[var(--ds-border-base)] rounded-xl p-5">
        <p className="text-sm font-semibold text-[var(--ds-text-primary)] mb-3">Acme Corp</p>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <p className="text-[var(--ds-text-muted)]">Risk score</p><p className="font-medium text-[var(--ds-text-primary)]">78</p>
          <p className="text-[var(--ds-text-muted)]">Framework</p><p className="font-medium text-[var(--ds-text-primary)]">ISO 27001</p>
        </div>
        <Divider className="my-4" />
        <p className="text-xs text-[var(--ds-text-muted)]">Last audit: Nov 14, 2025</p>
      </div>
    </div>
  ),
};
