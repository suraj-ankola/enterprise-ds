import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { DateRangePicker, type DateRange } from './DateRangePicker';

const meta: Meta<typeof DateRangePicker> = {
  title: 'Forms/DateRangePicker',
  component: DateRangePicker,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Two-panel date range picker with preset shortcuts, hover range preview, and month/year navigation. Clicking "Start" locks the anchor; clicking "End" completes the range. Click the month header to jump by month or year.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof DateRangePicker>;

export const Playground: Story = {
  render: () => {
    const [range, setRange] = useState<DateRange>({ start: '', end: '' });
    return (
      <div className="p-8 bg-[var(--ds-bg-base)] h-[420px]">
        <DateRangePicker label="Date range" value={range} onChange={setRange} />
        {range.start && range.end && (
          <p className="mt-4 text-xs text-[var(--ds-text-muted)]">
            Selected: {range.start} → {range.end}
          </p>
        )}
      </div>
    );
  },
};

export const WithDefaultValue: Story = {
  render: () => (
    <div className="p-8 bg-[var(--ds-bg-base)] h-[420px]">
      <DateRangePicker
        label="Audit period"
        defaultValue={{ start: '2025-10-01', end: '2025-12-31' }}
      />
    </div>
  ),
};

export const NoPresets: Story = {
  name: 'Without presets',
  render: () => {
    const [range, setRange] = useState<DateRange>({ start: '', end: '' });
    return (
      <div className="p-8 bg-[var(--ds-bg-base)] h-[420px]">
        <DateRangePicker
          label="Custom range"
          value={range}
          onChange={setRange}
          presets={[]}
        />
      </div>
    );
  },
};

export const WithMinMax: Story = {
  name: 'Min/max bounds',
  render: () => {
    const [range, setRange] = useState<DateRange>({ start: '', end: '' });
    return (
      <div className="p-8 bg-[var(--ds-bg-base)] h-[420px]">
        <DateRangePicker
          label="Q4 2025 only"
          value={range}
          onChange={setRange}
          min="2025-10-01"
          max="2025-12-31"
          presets={[]}
          helperText="Only dates within Q4 2025 are selectable"
        />
      </div>
    );
  },
};

export const InFilterBar: Story = {
  name: 'In context — report filter',
  render: () => {
    const [range, setRange] = useState<DateRange>({ start: '', end: '' });
    const customPresets = [
      { label: 'Last 7 days',  range: { start: new Date(Date.now()-6*86400000).toISOString().slice(0,10), end: new Date().toISOString().slice(0,10) }},
      { label: 'Last 30 days', range: { start: new Date(Date.now()-29*86400000).toISOString().slice(0,10), end: new Date().toISOString().slice(0,10) }},
      { label: 'Q4 2025',      range: { start: '2025-10-01', end: '2025-12-31' } },
      { label: 'Q3 2025',      range: { start: '2025-07-01', end: '2025-09-30' } },
      { label: 'FY 2025',      range: { start: '2025-01-01', end: '2025-12-31' } },
    ];
    return (
      <div className="p-8 bg-[var(--ds-bg-base)] h-[500px]">
        <div className="bg-[var(--ds-bg-surface)] border border-[var(--ds-border-base)] rounded-xl p-5 space-y-4">
          <p className="text-sm font-semibold text-[var(--ds-text-primary)]">Vendor risk report</p>
          <DateRangePicker
            label="Report period"
            value={range}
            onChange={setRange}
            presets={customPresets}
          />
          {range.start && range.end && (
            <p className="text-xs text-[var(--ds-text-muted)]">
              Showing data from <strong>{range.start}</strong> to <strong>{range.end}</strong>
            </p>
          )}
        </div>
      </div>
    );
  },
};
