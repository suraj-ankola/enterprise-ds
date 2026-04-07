import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import {
  ListIcon, GridFourIcon, ChartBarIcon,
  CalendarIcon, ClockIcon,
  ShieldCheckIcon,
} from '@phosphor-icons/react';
import { SegmentedControl } from './SegmentedControl';

const meta: Meta<typeof SegmentedControl> = {
  title: 'Core/SegmentedControl',
  component: SegmentedControl,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Mutually exclusive option selector styled as a pill track. Use for view toggles, time range pickers, and mode switches — anywhere a radio group fits but a dropdown feels heavy.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof SegmentedControl>;

export const Playground: Story = {
  render: () => {
    const [view, setView] = useState('list');
    return (
      <div className="p-8 bg-[var(--ds-bg-base)]">
        <SegmentedControl
          aria-label="View mode"
          value={view}
          onChange={setView}
          options={[
            { value: 'list',  label: 'List',  icon: <ListIcon size={13} /> },
            { value: 'grid',  label: 'Grid',  icon: <GridFourIcon size={13} /> },
            { value: 'chart', label: 'Chart', icon: <ChartBarIcon size={13} /> },
          ]}
        />
      </div>
    );
  },
};

export const Sizes: Story = {
  render: () => {
    const [sm, setSm] = useState('30d');
    const [md, setMd] = useState('30d');
    const timeOptions = [
      { value: '7d',  label: '7d' },
      { value: '30d', label: '30d' },
      { value: '90d', label: '90d' },
      { value: '1y',  label: '1y' },
    ];
    return (
      <div className="p-8 bg-[var(--ds-bg-base)] space-y-6">
        <div className="space-y-2">
          <p className="text-xs text-[var(--ds-text-muted)]">sm</p>
          <SegmentedControl aria-label="Time range" size="sm" value={sm} onChange={setSm} options={timeOptions} />
        </div>
        <div className="space-y-2">
          <p className="text-xs text-[var(--ds-text-muted)]">md</p>
          <SegmentedControl aria-label="Time range" size="md" value={md} onChange={setMd} options={timeOptions} />
        </div>
      </div>
    );
  },
};

export const IconOnly: Story = {
  name: 'Icon-only segments',
  render: () => {
    const [view, setView] = useState('list');
    return (
      <div className="p-8 bg-[var(--ds-bg-base)]">
        <SegmentedControl
          aria-label="View mode"
          value={view}
          onChange={setView}
          options={[
            { value: 'list',  label: <ListIcon size={14} />,     icon: undefined },
            { value: 'grid',  label: <GridFourIcon size={14} />, icon: undefined },
            { value: 'chart', label: <ChartBarIcon size={14} />, icon: undefined },
          ]}
        />
      </div>
    );
  },
};

export const FullWidth: Story = {
  render: () => {
    const [range, setRange] = useState('month');
    return (
      <div className="p-8 bg-[var(--ds-bg-base)] max-w-xs">
        <SegmentedControl
          aria-label="Date range"
          fullWidth
          value={range}
          onChange={setRange}
          options={[
            { value: 'week',    label: 'Week',    icon: <ClockIcon size={12} /> },
            { value: 'month',   label: 'Month',   icon: <CalendarIcon size={12} /> },
            { value: 'quarter', label: 'Quarter' },
            { value: 'year',    label: 'Year' },
          ]}
        />
      </div>
    );
  },
};

export const WithDisabled: Story = {
  name: 'Disabled option',
  render: () => {
    const [plan, setPlan] = useState('standard');
    return (
      <div className="p-8 bg-[var(--ds-bg-base)]">
        <SegmentedControl
          aria-label="Plan tier"
          value={plan}
          onChange={setPlan}
          options={[
            { value: 'starter',    label: 'Starter' },
            { value: 'standard',   label: 'Standard' },
            { value: 'enterprise', label: 'Enterprise', disabled: true },
          ]}
        />
        <p className="mt-3 text-xs text-[var(--ds-text-muted)]">Enterprise requires a sales conversation.</p>
      </div>
    );
  },
};

export const InHeader: Story = {
  name: 'In context — dashboard header',
  render: () => {
    const [range, setRange] = useState('30d');
    return (
      <div className="p-8 bg-[var(--ds-bg-base)]">
        <div className="bg-[var(--ds-bg-surface)] border border-[var(--ds-border-base)] rounded-xl px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheckIcon size={18} className="text-[var(--ds-brand-500)]" />
            <p className="text-sm font-semibold text-[var(--ds-text-primary)]">Vendor Risk Overview</p>
          </div>
          <SegmentedControl
            aria-label="Time range"
            size="sm"
            value={range}
            onChange={setRange}
            options={[
              { value: '7d',  label: '7d' },
              { value: '30d', label: '30d' },
              { value: '90d', label: '90d' },
            ]}
          />
        </div>
      </div>
    );
  },
};
