import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { DatePicker } from './DatePicker';

const meta: Meta<typeof DatePicker> = {
  title: 'UI/DatePicker',
  component: DatePicker,
  parameters: {
    docs: {
      description: {
        component: 'Calendar date picker. ISO "YYYY-MM-DD" value. Month navigation with prev/next buttons. Today is highlighted with a border ring; selected date uses brand-600 fill. "Today" shortcut at bottom. `min`/`max` props disable out-of-range dates. Outside click and Escape close the calendar.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof DatePicker>;

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {
  render: () => {
    const [date, setDate] = useState('');
    return (
      <div className="max-w-xs flex flex-col gap-4">
        <DatePicker
          label="Audit date"
          value={date}
          onChange={setDate}
          helperText="Select the scheduled audit date"
          placeholder="Pick a date"
        />
        {date && (
          <p className="text-xs text-[var(--ds-text-muted)]">Selected: {date}</p>
        )}
      </div>
    );
  },
};

// ─── All Variants ─────────────────────────────────────────────────────────────

export const AllVariants: Story = {
  render: () => {
    const today   = new Date();
    const minDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const maxDate = new Date(today.getFullYear(), today.getMonth() + 3, today.getDate());

    function fmt(d: Date) {
      return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    }

    return (
      <div className="flex flex-wrap gap-8 items-start p-4">

        {/* Default — no value */}
        <DatePicker
          label="Default (no value)"
          placeholder="Select date"
          helperText="Click to open the calendar"
        />

        {/* Pre-filled */}
        <DatePicker
          label="Pre-filled value"
          defaultValue="2026-06-15"
        />

        {/* Min / max range */}
        <DatePicker
          label="Future dates only"
          min={fmt(minDate)}
          max={fmt(maxDate)}
          helperText="Only next 3 months available"
          placeholder="Select future date"
        />

        {/* Error state */}
        <DatePicker
          label="Error state"
          defaultValue="2025-01-15"
          errorMessage="Audit date cannot be in the past"
        />

        {/* Disabled */}
        <DatePicker
          label="Disabled"
          defaultValue="2026-03-01"
          disabled
        />

        {/* Compliance pattern — next audit */}
        <div className="flex flex-col gap-3 p-4 rounded-xl border border-[var(--ds-border-base)] bg-[var(--ds-bg-surface)]">
          <p className="text-sm font-semibold text-[var(--ds-text-primary)]">Schedule next audit</p>
          <DatePicker
            label="Audit start date"
            min={fmt(minDate)}
            helperText="Must be a future date"
          />
          <DatePicker
            label="Audit due date"
            min={fmt(minDate)}
            helperText="Typically 30 days after start"
          />
        </div>

      </div>
    );
  },
};
