import React, { useEffect, useId, useRef, useState } from 'react';
import { CalendarIcon, CaretLeftIcon, CaretRightIcon, CaretDownIcon } from '@phosphor-icons/react';

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
  min?:            string;
  max?:            string;
  id?:             string;
  className?:      string;
}

type CalView = 'days' | 'months' | 'years';

// ─── Helpers ──────────────────────────────────────────────────────────────────

const MONTHS     = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const MONTHS_FULL = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const DAYS       = ['Su','Mo','Tu','We','Th','Fr','Sa'];

function toISO(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}
function fromISO(s: string): Date {
  const [y, m, d] = s.split('-').map(Number);
  return new Date(y, m - 1, d);
}
function formatDisplay(iso: string): string {
  return fromISO(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}
function calendarDays(year: number, month: number): (number | null)[] {
  const first = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = Array(first).fill(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}
/** Start year of a decade block (always multiple of 12 for clean grids) */
function decadeStart(year: number): number { return Math.floor(year / 12) * 12; }

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

  const today = toISO(new Date());
  const initial = value ? fromISO(value) : new Date();

  const [viewYear,  setViewYear]  = useState(initial.getFullYear());
  const [viewMonth, setViewMonth] = useState(initial.getMonth());
  const [calView,   setCalView]   = useState<CalView>('days');
  const [open, setOpen]           = useState(false);
  const containerRef              = useRef<HTMLDivElement>(null);

  const subText  = errorMessage ?? helperText;
  const hasError = Boolean(errorMessage);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    function onMouseDown(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
        setCalView('days');
      }
    }
    document.addEventListener('mousedown', onMouseDown);
    return () => document.removeEventListener('mousedown', onMouseDown);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') { setOpen(false); setCalView('days'); }
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
    setCalView('days');
  }

  // ── Navigation helpers ────────────────────────────────────────────────────

  function prevDays() {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  }
  function nextDays() {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  }
  function prevMonths()   { setViewYear(y => y - 1); }
  function nextMonths()   { setViewYear(y => y + 1); }
  function prevYears()    { setViewYear(y => y - 12); }
  function nextYears()    { setViewYear(y => y + 12); }

  const cells     = calendarDays(viewYear, viewMonth);
  const yearStart = decadeStart(viewYear);

  // ── Shared header button style ────────────────────────────────────────────
  const navBtn = 'h-7 w-7 flex items-center justify-center rounded-md text-[var(--ds-text-muted)] hover:bg-[var(--ds-bg-subtle)] hover:text-[var(--ds-text-primary)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ds-brand-500)]';

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
        onClick={() => { setOpen(v => !v); setCalView('days'); }}
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
          className="absolute top-full mt-1 z-[var(--ds-z-dropdown)] bg-[var(--ds-bg-raised)] border border-[var(--ds-border-base)] rounded-xl shadow-lg p-3 w-[280px]"
        >
          {/* ── Day view ────────────────────────────────────────────────────── */}
          {calView === 'days' && (
            <>
              <div className="flex items-center justify-between mb-3">
                <button type="button" onClick={prevDays} aria-label="Previous month" className={navBtn}>
                  <CaretLeftIcon size={14} weight="bold" />
                </button>
                <button
                  type="button"
                  onClick={() => setCalView('months')}
                  className="flex items-center gap-1 text-sm font-semibold text-[var(--ds-text-primary)] hover:text-[var(--ds-brand-600)] focus-visible:outline-none transition-colors"
                >
                  {MONTHS_FULL[viewMonth]} {viewYear}
                  <CaretDownIcon size={12} weight="bold" className="text-[var(--ds-text-muted)]" />
                </button>
                <button type="button" onClick={nextDays} aria-label="Next month" className={navBtn}>
                  <CaretRightIcon size={14} weight="bold" />
                </button>
              </div>

              <div className="grid grid-cols-7 mb-1">
                {DAYS.map(d => (
                  <span key={d} className="h-7 flex items-center justify-center text-[10px] font-semibold text-[var(--ds-text-muted)]">{d}</span>
                ))}
              </div>

              <div className="grid grid-cols-7">
                {cells.map((day, i) => {
                  if (day === null) return <span key={i} />;
                  const iso        = toISO(new Date(viewYear, viewMonth, day));
                  const isSelected = iso === value;
                  const isToday    = iso === today;
                  const isDisabled = (min && iso < min) || (max && iso > max);
                  return (
                    <button
                      key={i}
                      type="button"
                      disabled={!!isDisabled}
                      onClick={() => selectDate(day)}
                      aria-label={`${day} ${MONTHS_FULL[viewMonth]} ${viewYear}${isToday ? ' (today)' : ''}`}
                      aria-pressed={isSelected}
                      className={[
                        'h-8 w-full flex items-center justify-center rounded-lg text-sm transition-colors',
                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ds-brand-500)]',
                        isDisabled
                          ? 'opacity-30 cursor-not-allowed text-[var(--ds-text-muted)]'
                          : isSelected
                            ? 'bg-[var(--ds-brand-600)] text-white font-semibold cursor-pointer'
                            : isToday
                              ? 'border border-[var(--ds-brand-600)] text-[var(--ds-brand-700)] font-semibold cursor-pointer hover:bg-[var(--ds-brand-50)]'
                              : 'text-[var(--ds-text-primary)] cursor-pointer hover:bg-[var(--ds-bg-subtle)]',
                      ].filter(Boolean).join(' ')}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>

              <div className="mt-2 pt-2 border-t border-[var(--ds-border-base)] flex justify-center">
                <button
                  type="button"
                  onClick={() => { const t = new Date(); setViewYear(t.getFullYear()); setViewMonth(t.getMonth()); selectDate(t.getDate()); }}
                  className="text-xs font-medium text-[var(--ds-brand-600)] hover:text-[var(--ds-brand-700)] transition-colors focus-visible:outline-none"
                >
                  Today
                </button>
              </div>
            </>
          )}

          {/* ── Month view ──────────────────────────────────────────────────── */}
          {calView === 'months' && (
            <>
              <div className="flex items-center justify-between mb-3">
                <button type="button" onClick={prevMonths} aria-label="Previous year" className={navBtn}>
                  <CaretLeftIcon size={14} weight="bold" />
                </button>
                <button
                  type="button"
                  onClick={() => setCalView('years')}
                  className="flex items-center gap-1 text-sm font-semibold text-[var(--ds-text-primary)] hover:text-[var(--ds-brand-600)] focus-visible:outline-none transition-colors"
                >
                  {viewYear}
                  <CaretDownIcon size={12} weight="bold" className="text-[var(--ds-text-muted)]" />
                </button>
                <button type="button" onClick={nextMonths} aria-label="Next year" className={navBtn}>
                  <CaretRightIcon size={14} weight="bold" />
                </button>
              </div>

              <div className="grid grid-cols-3 gap-1">
                {MONTHS.map((m, i) => {
                  const selectedMonth = value ? fromISO(value).getMonth() : -1;
                  const selectedYear  = value ? fromISO(value).getFullYear() : -1;
                  const isSelected    = i === selectedMonth && viewYear === selectedYear;
                  const isCurrent     = i === new Date().getMonth() && viewYear === new Date().getFullYear();
                  return (
                    <button
                      key={m}
                      type="button"
                      onClick={() => { setViewMonth(i); setCalView('days'); }}
                      className={[
                        'h-9 rounded-lg text-sm font-medium transition-colors',
                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ds-brand-500)]',
                        isSelected
                          ? 'bg-[var(--ds-brand-600)] text-white'
                          : isCurrent
                            ? 'border border-[var(--ds-brand-600)] text-[var(--ds-brand-700)] hover:bg-[var(--ds-brand-50)]'
                            : 'text-[var(--ds-text-primary)] hover:bg-[var(--ds-bg-subtle)]',
                      ].join(' ')}
                    >
                      {m}
                    </button>
                  );
                })}
              </div>
            </>
          )}

          {/* ── Year view ───────────────────────────────────────────────────── */}
          {calView === 'years' && (
            <>
              <div className="flex items-center justify-between mb-3">
                <button type="button" onClick={prevYears} aria-label="Previous years" className={navBtn}>
                  <CaretLeftIcon size={14} weight="bold" />
                </button>
                <span className="text-sm font-semibold text-[var(--ds-text-primary)]">
                  {yearStart} – {yearStart + 11}
                </span>
                <button type="button" onClick={nextYears} aria-label="Next years" className={navBtn}>
                  <CaretRightIcon size={14} weight="bold" />
                </button>
              </div>

              <div className="grid grid-cols-3 gap-1">
                {Array.from({ length: 12 }, (_, i) => yearStart + i).map(yr => {
                  const selectedYear = value ? fromISO(value).getFullYear() : -1;
                  const isSelected   = yr === selectedYear;
                  const isCurrent    = yr === new Date().getFullYear();
                  return (
                    <button
                      key={yr}
                      type="button"
                      onClick={() => { setViewYear(yr); setCalView('months'); }}
                      className={[
                        'h-9 rounded-lg text-sm font-medium transition-colors',
                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ds-brand-500)]',
                        isSelected
                          ? 'bg-[var(--ds-brand-600)] text-white'
                          : isCurrent
                            ? 'border border-[var(--ds-brand-600)] text-[var(--ds-brand-700)] hover:bg-[var(--ds-brand-50)]'
                            : 'text-[var(--ds-text-primary)] hover:bg-[var(--ds-bg-subtle)]',
                      ].join(' ')}
                    >
                      {yr}
                    </button>
                  );
                })}
              </div>
            </>
          )}
        </div>
      )}

      {subText && (
        <p className={['text-xs', hasError ? 'text-[var(--ds-danger-text)]' : 'text-[var(--ds-text-muted)]'].join(' ')}>
          {subText}
        </p>
      )}
    </div>
  );
}
