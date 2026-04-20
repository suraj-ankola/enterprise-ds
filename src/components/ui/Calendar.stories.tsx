import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Calendar } from './Calendar';
import type { CalendarRangeValue } from './Calendar';

const meta: Meta<typeof Calendar> = {
  title: 'Forms/Calendar',
  component: Calendar,
  tags: ['autodocs'],
  argTypes: {
    mode: { control: 'radio', options: ['single', 'range'] },
    size: { control: 'radio', options: ['sm', 'md'] },
  },
  args: { mode: 'single', size: 'md' },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Standalone embeddable calendar. Two modes: **single** (one date) and **range** (click once for start, again for end with live hover preview). Supports `minDate`, `maxDate`, and `disabledDates`. Use this when the calendar should always be visible in the UI — for a trigger+popover pattern use `DatePicker`.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Calendar>;

// ─── Single mode ──────────────────────────────────────────────────────────────

export const Default: Story = {
  args: { mode: 'single', defaultValue: new Date() },
};

export const SmallSize: Story = {
  name: 'Size — Small',
  args: { size: 'sm', defaultValue: new Date() },
};

export const WithMinMax: Story = {
  name: 'Min / Max dates',
  args: {
    minDate: new Date(new Date().getFullYear(), new Date().getMonth(), 5),
    maxDate: new Date(new Date().getFullYear(), new Date().getMonth(), 25),
  },
};

export const WithDisabledDates: Story = {
  name: 'Disabled specific dates',
  args: {
    disabledDates: [
      new Date(new Date().getFullYear(), new Date().getMonth(), 10),
      new Date(new Date().getFullYear(), new Date().getMonth(), 15),
      new Date(new Date().getFullYear(), new Date().getMonth(), 20),
    ],
  },
};

// ─── Range mode ───────────────────────────────────────────────────────────────

export const RangeMode: Story = {
  name: 'Range mode',
  args: {
    mode: 'range',
    defaultRangeValue: {
      start: new Date(new Date().getFullYear(), new Date().getMonth(), 5),
      end:   new Date(new Date().getFullYear(), new Date().getMonth(), 18),
    },
  },
};

// ─── Controlled ──────────────────────────────────────────────────────────────

export const ControlledSingle: Story = {
  name: 'Controlled — single',
  render: () => {
    const [date, setDate] = useState<Date | null>(new Date());
    return (
      <div className="flex flex-col items-center gap-4">
        <Calendar value={date} onChange={setDate} />
        <p className="text-sm text-[var(--ds-text-muted)]">
          Selected: <span className="font-medium text-[var(--ds-text-primary)]">
            {date ? date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }) : 'none'}
          </span>
        </p>
      </div>
    );
  },
};

export const ControlledRange: Story = {
  name: 'Controlled — range',
  render: () => {
    const [range, setRange] = useState<CalendarRangeValue>({ start: null, end: null });
    const fmt = (d: Date | null) =>
      d ? d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : '—';

    return (
      <div className="flex flex-col items-center gap-4">
        <Calendar mode="range" rangeValue={range} onRangeChange={setRange} />
        <p className="text-sm text-[var(--ds-text-muted)]">
          {fmt(range.start)} → {fmt(range.end)}
        </p>
      </div>
    );
  },
};

// ─── Both sizes ───────────────────────────────────────────────────────────────

export const BothSizes: Story = {
  render: () => (
    <div className="flex gap-6 items-start">
      <div className="flex flex-col items-center gap-2">
        <p className="text-xs text-[var(--ds-text-muted)]">sm</p>
        <Calendar size="sm" defaultValue={new Date()} />
      </div>
      <div className="flex flex-col items-center gap-2">
        <p className="text-xs text-[var(--ds-text-muted)]">md</p>
        <Calendar size="md" defaultValue={new Date()} />
      </div>
    </div>
  ),
};
