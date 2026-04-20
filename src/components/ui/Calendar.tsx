'use client';

import React, { useState } from 'react';
import { CaretLeftIcon, CaretRightIcon } from '@phosphor-icons/react';

// ─── Types ────────────────────────────────────────────────────────────────────

export type CalendarMode = 'single' | 'range';
export type CalendarSize = 'sm' | 'md';

export interface CalendarRangeValue {
  start: Date | null;
  end:   Date | null;
}

export interface CalendarProps {
  /** 'single' selects one date; 'range' selects start + end */
  mode?:            CalendarMode;
  /** Controlled value for single mode */
  value?:           Date | null;
  defaultValue?:    Date | null;
  onChange?:        (date: Date) => void;
  /** Controlled value for range mode */
  rangeValue?:      CalendarRangeValue;
  defaultRangeValue?: CalendarRangeValue;
  onRangeChange?:   (range: CalendarRangeValue) => void;
  minDate?:         Date;
  maxDate?:         Date;
  /** Array of specific dates to disable */
  disabledDates?:   Date[];
  size?:            CalendarSize;
  /** Override the month/year shown on mount */
  defaultMonth?:    Date;
  className?:       string;
}

// ─── Date helpers ─────────────────────────────────────────────────────────────

function sameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();
}

function today() { return new Date(); }

function stripTime(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function inRange(d: Date, start: Date | null, end: Date | null) {
  if (!start || !end) return false;
  const lo = start <= end ? start : end;
  const hi = start <= end ? end   : start;
  return d > lo && d < hi;
}

function isRangeEdge(d: Date, start: Date | null, end: Date | null) {
  if (!start && !end) return false;
  if (start && sameDay(d, start)) return true;
  if (end   && sameDay(d, end))   return true;
  return false;
}

function getMonthGrid(year: number, month: number): Date[] {
  const firstWeekday  = new Date(year, month, 1).getDay();
  const daysInMonth   = new Date(year, month + 1, 0).getDate();
  const prevMonthDays = new Date(year, month, 0).getDate();

  const days: Date[] = [];

  for (let i = firstWeekday - 1; i >= 0; i--) {
    days.push(new Date(year, month - 1, prevMonthDays - i));
  }
  for (let d = 1; d <= daysInMonth; d++) {
    days.push(new Date(year, month, d));
  }
  let next = 1;
  while (days.length % 7 !== 0) {
    days.push(new Date(year, month + 1, next++));
  }
  return days;
}

const MONTH_NAMES = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December',
];
const DAY_NAMES_SM = ['Su','Mo','Tu','We','Th','Fr','Sa'];
const DAY_NAMES_MD = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

// ─── Size maps ────────────────────────────────────────────────────────────────

const CELL_SIZE: Record<CalendarSize, string> = {
  sm: 'h-7 w-7 text-xs',
  md: 'h-9 w-9 text-sm',
};

const NAV_BTN: Record<CalendarSize, string> = {
  sm: 'h-6 w-6',
  md: 'h-8 w-8',
};

const HEADER_TEXT: Record<CalendarSize, string> = {
  sm: 'text-xs',
  md: 'text-sm',
};

// ─── Component ────────────────────────────────────────────────────────────────

export function Calendar({
  mode               = 'single',
  value,
  defaultValue       = null,
  onChange,
  rangeValue,
  defaultRangeValue  = { start: null, end: null },
  onRangeChange,
  minDate,
  maxDate,
  disabledDates      = [],
  size               = 'md',
  defaultMonth,
  className          = '',
}: CalendarProps) {
  const now = defaultMonth ?? value ?? rangeValue?.start ?? today();

  const [viewYear,  setViewYear]  = useState(now.getFullYear());
  const [viewMonth, setViewMonth] = useState(now.getMonth());

  // Single mode state
  const isControlledSingle    = value !== undefined;
  const [internalSingle, setInternalSingle] = useState<Date | null>(defaultValue);
  const selectedSingle = isControlledSingle ? (value ?? null) : internalSingle;

  // Range mode state
  const isControlledRange   = rangeValue !== undefined;
  const [internalRange, setInternalRange] = useState<CalendarRangeValue>(defaultRangeValue);
  const selectedRange = isControlledRange ? (rangeValue ?? { start: null, end: null }) : internalRange;

  // Range picking state (first click sets start, second sets end)
  const [pickingEnd, setPickingEnd] = useState(false);
  const [hoverDate,  setHoverDate]  = useState<Date | null>(null);

  function prevMonth() {
    if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11); }
    else setViewMonth(m => m - 1);
  }
  function nextMonth() {
    if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0); }
    else setViewMonth(m => m + 1);
  }

  function isDisabled(d: Date) {
    const s = stripTime(d);
    if (minDate && s < stripTime(minDate)) return true;
    if (maxDate && s > stripTime(maxDate)) return true;
    return disabledDates.some((dd) => sameDay(s, dd));
  }

  function handleClick(d: Date) {
    if (isDisabled(d)) return;

    if (mode === 'single') {
      if (!isControlledSingle) setInternalSingle(d);
      onChange?.(d);
      return;
    }

    // Range mode
    if (!pickingEnd || !selectedRange.start) {
      const next = { start: d, end: null };
      if (!isControlledRange) setInternalRange(next);
      onRangeChange?.(next);
      setPickingEnd(true);
    } else {
      const lo = d < selectedRange.start ? d : selectedRange.start;
      const hi = d < selectedRange.start ? selectedRange.start : d;
      const next = { start: lo, end: hi };
      if (!isControlledRange) setInternalRange(next);
      onRangeChange?.(next);
      setPickingEnd(false);
      setHoverDate(null);
    }
  }

  // Range preview while hovering before second click
  const previewRange: CalendarRangeValue = pickingEnd && selectedRange.start && hoverDate
    ? { start: selectedRange.start, end: hoverDate }
    : selectedRange;

  const grid     = getMonthGrid(viewYear, viewMonth);
  const dayNames = size === 'sm' ? DAY_NAMES_SM : DAY_NAMES_MD;

  return (
    <div
      className={[
        'inline-flex flex-col gap-3 p-3 rounded-xl select-none',
        'bg-[var(--ds-bg-surface)] border border-[var(--ds-border-base)]',
        'shadow-[var(--ds-shadow-sm)]',
        className,
      ].filter(Boolean).join(' ')}
    >
      {/* Header: prev / month+year / next */}
      <div className="flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={prevMonth}
          aria-label="Previous month"
          className={[
            'flex items-center justify-center rounded-lg',
            'text-[var(--ds-text-secondary)] hover:text-[var(--ds-text-primary)]',
            'hover:bg-[var(--ds-bg-subtle)] transition-colors',
            NAV_BTN[size],
          ].join(' ')}
        >
          <CaretLeftIcon size={size === 'sm' ? 12 : 14} />
        </button>

        <span className={['font-semibold text-[var(--ds-text-primary)]', HEADER_TEXT[size]].join(' ')}>
          {MONTH_NAMES[viewMonth]} {viewYear}
        </span>

        <button
          type="button"
          onClick={nextMonth}
          aria-label="Next month"
          className={[
            'flex items-center justify-center rounded-lg',
            'text-[var(--ds-text-secondary)] hover:text-[var(--ds-text-primary)]',
            'hover:bg-[var(--ds-bg-subtle)] transition-colors',
            NAV_BTN[size],
          ].join(' ')}
        >
          <CaretRightIcon size={size === 'sm' ? 12 : 14} />
        </button>
      </div>

      {/* Day-of-week headers */}
      <div className="grid grid-cols-7">
        {dayNames.map((d) => (
          <div
            key={d}
            className={[
              'flex items-center justify-center font-medium text-[var(--ds-text-muted)]',
              CELL_SIZE[size],
            ].join(' ')}
          >
            {d}
          </div>
        ))}
      </div>

      {/* Day grid */}
      <div className="grid grid-cols-7">
        {grid.map((d, i) => {
          const isCurrentMo = d.getFullYear() === viewYear && d.getMonth() === viewMonth;
          const isDisabledD = isDisabled(d);
          const isTodayD    = sameDay(d, today());

          // Single mode
          const isSelected  = mode === 'single' && selectedSingle !== null && sameDay(d, selectedSingle);

          // Range mode
          const isEdge      = mode === 'range' && isRangeEdge(d, previewRange.start, previewRange.end);
          const isInRange   = mode === 'range' && inRange(d, previewRange.start, previewRange.end);
          const isRangeStart = mode === 'range' && previewRange.start && sameDay(d, previewRange.start);
          const isRangeEnd   = mode === 'range' && previewRange.end   && sameDay(d, previewRange.end);

          const highlighted = isSelected || isEdge;

          return (
            <div
              key={i}
              className={[
                'flex items-center justify-center relative',
                // Range background stripe
                isInRange ? 'bg-[var(--ds-brand-50)]' : '',
                isRangeStart && previewRange.end ? 'rounded-l-full bg-[var(--ds-brand-50)]' : '',
                isRangeEnd   && previewRange.start ? 'rounded-r-full bg-[var(--ds-brand-50)]' : '',
              ].filter(Boolean).join(' ')}
            >
              <button
                type="button"
                disabled={isDisabledD}
                onClick={() => handleClick(d)}
                onMouseEnter={() => pickingEnd && setHoverDate(d)}
                onMouseLeave={() => pickingEnd && setHoverDate(null)}
                aria-label={d.toLocaleDateString()}
                aria-pressed={highlighted}
                className={[
                  'flex items-center justify-center rounded-full transition-colors',
                  CELL_SIZE[size],
                  highlighted
                    ? 'bg-[var(--ds-brand-600)] text-white font-semibold'
                    : isTodayD
                      ? 'border border-[var(--ds-brand-600)] text-[var(--ds-brand-600)] font-semibold hover:bg-[var(--ds-brand-50)]'
                      : isCurrentMo && !isDisabledD
                        ? 'text-[var(--ds-text-primary)] hover:bg-[var(--ds-bg-subtle)]'
                        : 'text-[var(--ds-text-muted)]',
                  isDisabledD ? 'opacity-30 cursor-not-allowed pointer-events-none line-through' : 'cursor-pointer',
                ].filter(Boolean).join(' ')}
              >
                {d.getDate()}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
