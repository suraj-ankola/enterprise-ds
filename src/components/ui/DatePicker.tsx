import React, { useEffect, useId, useRef, useState } from 'react';
import { CalendarIcon, CaretLeftIcon, CaretRightIcon } from '@phosphor-icons/react';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface DatePickerProps {
  value?:          string;          // ISO date string "YYYY-MM-DD"
  defaultValue?:   string;
  onChange?:       (date: string) => void;
  label?:          string;
  helperText?:     string;
  errorMessage?:   string;
  placeholder?:    string;
  disabled?:       boolean;
  /** Minimum selectable date — ISO string */
  min?:            string;
  /** Maximum selectable date — ISO string */
  max?:            string;
  id?:             string;
  className?:      string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const MONTHS = ['January','February','March','April','May','June',
                'July','August','September','October','November','December'];
const DAYS   = ['Su','Mo','Tu','We','Th','Fr','Sa'];

function toISO(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function fromISO(s: string): Date {
  const [y, m, d] = s.split('-').map(Number);
  return new Date(y, m - 1, d);
}

function formatDisplay(iso: string): string {
  const d = fromISO(iso);
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

function calendarDays(year: number, month: number): (number | null)[] {
  const first  = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = Array(first).fill(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function DatePicker({
  value:         controlledValue,
  defaultValue   = '',
  onChange,
  label,
  helperText,
  errorMessage,
  placeholder    = 'Select date',
  disabled       = false,
  min,
  max,
  id: idProp,
  className      = '',
}: DatePickerProps) {
  const generatedId = useId();
  const id          = idProp ?? generatedId;

  const [internalValue, setInternalValue] = useState(defaultValue);
  const value = controlledValue !== undefined ? controlledValue : internalValue;

  const today    = toISO(new Date());
  const ref      = useRef<Date>(value ? fromISO(value) : new Date());
  const [viewYear,  setViewYear]  = useState(ref.current.getFullYear());
  const [viewMonth, setViewMonth] = useState(ref.current.getMonth());
  const [open, setOpen]           = useState(false);
  const containerRef              = useRef<HTMLDivElement>(null);
  const subText = errorMessage ?? helperText;
  const hasError = Boolean(errorMessage);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    function onMouseDown(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', onMouseDown);
    return () => document.removeEventListener('mousedown', onMouseDown);
  }, [open]);

  // ESC to close
  useEffect(() => {
    if (!open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);

  function selectDate(day: number) {
    const iso = toISO(new Date(viewYear, viewMonth, day));
    if (min && iso < min) return;
    if (max && iso > max) return;
    if (controlledValue === undefined) setInternalValue(iso);
    onChange?.(iso);
    setOpen(false);
  }

  function prevMonth() {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  }

  function nextMonth() {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  }

  const cells = calendarDays(viewYear, viewMonth);

  return (
    <div ref={containerRef} className={['relative flex flex-col gap-1.5', className].filter(Boolean).join(' ')}>
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-[var(--ds-text-primary)]">
          {label}
        </label>
      )}

      {/* Trigger */}
      <button
        id={id}
        type="button"
        disabled={disabled}
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen(v => !v)}
        className={[
          'flex items-center gap-2 rounded-lg border px-3 py-2 text-sm text-left',
          'bg-[var(--ds-bg-surface)] transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ds-brand-500)] focus-visible:ring-offset-0',
          open
            ? 'border-[var(--ds-brand-600)] ring-2 ring-[var(--ds-brand-500)]'
            : hasError
              ? 'border-[var(--ds-danger-border)]'
              : 'border-[var(--ds-border-strong)] hover:border-[var(--ds-brand-600)]',
          disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
        ].filter(Boolean).join(' ')}
      >
        <CalendarIcon size={16} className="shrink-0 text-[var(--ds-text-muted)]" aria-hidden="true" />
        <span className={value ? 'text-[var(--ds-text-primary)]' : 'text-[var(--ds-text-muted)]'}>
          {value ? formatDisplay(value) : placeholder}
        </span>
      </button>

      {/* Calendar dropdown */}
      {open && (
        <div
          role="dialog"
          aria-label="Date picker"
          className={[
            'absolute top-full mt-1 z-[var(--ds-z-dropdown)]',
            'bg-[var(--ds-bg-raised)] border border-[var(--ds-border-base)]',
            'rounded-xl shadow-lg p-3 w-[280px]',
          ].join(' ')}
        >
          {/* Month navigation */}
          <div className="flex items-center justify-between mb-3">
            <button
              type="button"
              onClick={prevMonth}
              aria-label="Previous month"
              className="h-7 w-7 flex items-center justify-center rounded-md text-[var(--ds-text-muted)] hover:bg-[var(--ds-bg-subtle)] hover:text-[var(--ds-text-primary)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ds-brand-500)]"
            >
              <CaretLeftIcon size={14} weight="bold" />
            </button>

            <p className="text-sm font-semibold text-[var(--ds-text-primary)]">
              {MONTHS[viewMonth]} {viewYear}
            </p>

            <button
              type="button"
              onClick={nextMonth}
              aria-label="Next month"
              className="h-7 w-7 flex items-center justify-center rounded-md text-[var(--ds-text-muted)] hover:bg-[var(--ds-bg-subtle)] hover:text-[var(--ds-text-primary)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ds-brand-500)]"
            >
              <CaretRightIcon size={14} weight="bold" />
            </button>
          </div>

          {/* Day headers */}
          <div className="grid grid-cols-7 mb-1">
            {DAYS.map(d => (
              <span key={d} className="h-7 flex items-center justify-center text-[10px] font-semibold text-[var(--ds-text-muted)]">
                {d}
              </span>
            ))}
          </div>

          {/* Day cells */}
          <div className="grid grid-cols-7">
            {cells.map((day, i) => {
              if (day === null) return <span key={i} />;

              const iso     = toISO(new Date(viewYear, viewMonth, day));
              const isSelected = iso === value;
              const isToday    = iso === today;
              const isDisabled = (min && iso < min) || (max && iso > max);

              return (
                <button
                  key={i}
                  type="button"
                  disabled={!!isDisabled}
                  onClick={() => selectDate(day)}
                  aria-label={`${day} ${MONTHS[viewMonth]} ${viewYear}${isToday ? ' (today)' : ''}`}
                  aria-pressed={isSelected}
                  className={[
                    'h-8 w-full flex items-center justify-center rounded-lg text-sm transition-colors',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ds-brand-500)]',
                    isDisabled
                      ? 'opacity-30 cursor-not-allowed text-[var(--ds-text-muted)]'
                      : isSelected
                        ? 'bg-[var(--ds-brand-600)] text-white font-semibold cursor-pointer'
                        : isToday
                          ? 'border border-[var(--ds-brand-600)] text-[var(--ds-brand-700)] font-semibold cursor-pointer hover:bg-[var(--ds-brand-100)]'
                          : 'text-[var(--ds-text-primary)] cursor-pointer hover:bg-[var(--ds-bg-subtle)]',
                  ].filter(Boolean).join(' ')}
                >
                  {day}
                </button>
              );
            })}
          </div>

          {/* Today shortcut */}
          <div className="mt-2 pt-2 border-t border-[var(--ds-border-base)] flex justify-center">
            <button
              type="button"
              onClick={() => {
                const t = new Date();
                setViewYear(t.getFullYear());
                setViewMonth(t.getMonth());
                selectDate(t.getDate());
              }}
              className="text-xs font-medium text-[var(--ds-brand-600)] hover:text-[var(--ds-brand-700)] transition-colors focus-visible:outline-none"
            >
              Today
            </button>
          </div>
        </div>
      )}

      {/* Helper / error */}
      {subText && (
        <p className={['text-xs', hasError ? 'text-[var(--ds-danger-text)]' : 'text-[var(--ds-text-muted)]'].join(' ')}>
          {subText}
        </p>
      )}
    </div>
  );
}
