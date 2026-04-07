import React, { useEffect, useId, useRef, useState } from 'react';
import { CalendarIcon, CaretLeftIcon, CaretRightIcon, CaretDownIcon, ArrowRightIcon } from '@phosphor-icons/react';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface DateRange {
  start: string;  // ISO "YYYY-MM-DD"
  end:   string;
}

export interface DateRangePickerProps {
  value?:          DateRange;
  defaultValue?:   DateRange;
  onChange?:       (range: DateRange) => void;
  label?:          string;
  helperText?:     string;
  errorMessage?:   string;
  placeholder?:    string;
  disabled?:       boolean;
  min?:            string;
  max?:            string;
  /** Preset ranges to show as quick shortcuts */
  presets?:        { label: string; range: DateRange }[];
  id?:             string;
  className?:      string;
}

type CalView = 'days' | 'months' | 'years';
type Picking = 'start' | 'end';

// ─── Helpers ──────────────────────────────────────────────────────────────────

const MONTHS      = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const MONTHS_FULL = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const DAYS        = ['Su','Mo','Tu','We','Th','Fr','Sa'];

function toISO(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}
function fromISO(s: string): Date {
  const [y, m, d] = s.split('-').map(Number);
  return new Date(y, m - 1, d);
}
function fmt(iso: string): string {
  return fromISO(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}
function calendarDays(year: number, month: number): (number | null)[] {
  const first = new Date(year, month, 1).getDay();
  const n     = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = Array(first).fill(null);
  for (let d = 1; d <= n; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}
function decadeStart(y: number) { return Math.floor(y / 12) * 12; }

const DEFAULT_PRESETS: { label: string; range: DateRange }[] = [
  { label: 'Last 7 days',   range: { start: toISO(new Date(Date.now() - 6 * 86400000)),  end: toISO(new Date()) } },
  { label: 'Last 30 days',  range: { start: toISO(new Date(Date.now() - 29 * 86400000)), end: toISO(new Date()) } },
  { label: 'Last 90 days',  range: { start: toISO(new Date(Date.now() - 89 * 86400000)), end: toISO(new Date()) } },
  { label: 'This month',    range: (() => { const n = new Date(); return { start: toISO(new Date(n.getFullYear(), n.getMonth(), 1)), end: toISO(new Date()) }; })() },
];

// ─── CalendarPanel ────────────────────────────────────────────────────────────

interface CalPanelProps {
  viewYear:  number;
  viewMonth: number;
  calView:   CalView;
  value?:    string;
  start?:    string;
  end?:      string;
  hovered?:  string;
  today:     string;
  min?:      string;
  max?:      string;
  picking:   Picking;
  onDayClick:       (iso: string) => void;
  onDayHover:       (iso: string) => void;
  onMonthSelect:    (m: number) => void;
  onYearSelect:     (y: number) => void;
  onCalViewChange:  (v: CalView) => void;
  onPrev:           () => void;
  onNext:           () => void;
  hideNav?:         boolean;
}

function CalendarPanel({
  viewYear, viewMonth, calView,
  start, end, hovered, today, min, max, picking,
  onDayClick, onDayHover, onMonthSelect, onYearSelect,
  onCalViewChange, onPrev, onNext, hideNav,
}: CalPanelProps) {
  const cells     = calendarDays(viewYear, viewMonth);
  const yearStart = decadeStart(viewYear);
  const navBtn    = 'h-7 w-7 flex items-center justify-center rounded-md text-[var(--ds-text-muted)] hover:bg-[var(--ds-bg-subtle)] hover:text-[var(--ds-text-primary)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ds-brand-500)]';

  const effectiveEnd = hovered && picking === 'end' && start && (!end || hovered >= start) ? hovered : end;

  return (
    <div className="w-[256px]">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        {!hideNav
          ? <button type="button" onClick={onPrev} aria-label="Previous" className={navBtn}><CaretLeftIcon size={14} weight="bold" /></button>
          : <span className="w-7" />}

        {calView === 'days' && (
          <button
            type="button"
            onClick={() => onCalViewChange('months')}
            className="flex items-center gap-1 text-sm font-semibold text-[var(--ds-text-primary)] hover:text-[var(--ds-brand-600)] focus-visible:outline-none transition-colors"
          >
            {MONTHS_FULL[viewMonth]} {viewYear}
            <CaretDownIcon size={12} weight="bold" className="text-[var(--ds-text-muted)]" />
          </button>
        )}
        {calView === 'months' && (
          <button
            type="button"
            onClick={() => onCalViewChange('years')}
            className="flex items-center gap-1 text-sm font-semibold text-[var(--ds-text-primary)] hover:text-[var(--ds-brand-600)] focus-visible:outline-none transition-colors"
          >
            {viewYear}
            <CaretDownIcon size={12} weight="bold" className="text-[var(--ds-text-muted)]" />
          </button>
        )}
        {calView === 'years' && (
          <span className="text-sm font-semibold text-[var(--ds-text-primary)]">{yearStart}–{yearStart + 11}</span>
        )}

        {!hideNav
          ? <button type="button" onClick={onNext} aria-label="Next" className={navBtn}><CaretRightIcon size={14} weight="bold" /></button>
          : <span className="w-7" />}
      </div>

      {calView === 'days' && (
        <>
          <div className="grid grid-cols-7 mb-1">
            {DAYS.map(d => <span key={d} className="h-7 flex items-center justify-center text-[10px] font-semibold text-[var(--ds-text-muted)]">{d}</span>)}
          </div>
          <div className="grid grid-cols-7">
            {cells.map((day, i) => {
              if (day === null) return <span key={i} />;
              const iso        = toISO(new Date(viewYear, viewMonth, day));
              const isStart    = iso === start;
              const isEnd      = iso === effectiveEnd;
              const inRange    = start && effectiveEnd && iso > start && iso < effectiveEnd;
              const isToday    = iso === today;
              const isDisabled = (min && iso < min) || (max && iso > max);
              return (
                <button
                  key={i}
                  type="button"
                  disabled={!!isDisabled}
                  onClick={() => onDayClick(iso)}
                  onMouseEnter={() => onDayHover(iso)}
                  aria-pressed={isStart || isEnd}
                  aria-label={`${day} ${MONTHS_FULL[viewMonth]} ${viewYear}`}
                  className={[
                    'h-8 flex items-center justify-center text-sm transition-colors',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ds-brand-500)]',
                    // rounded ends of range
                    isStart ? 'rounded-l-lg' : '',
                    isEnd   ? 'rounded-r-lg' : '',
                    !isStart && !isEnd && !inRange ? 'rounded-lg' : '',
                    isDisabled
                      ? 'opacity-30 cursor-not-allowed'
                      : isStart || isEnd
                        ? 'bg-[var(--ds-brand-600)] text-white font-semibold cursor-pointer'
                        : inRange
                          ? 'bg-[var(--ds-brand-50)] text-[var(--ds-brand-700)] cursor-pointer hover:bg-[var(--ds-brand-100)]'
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
        </>
      )}

      {calView === 'months' && (
        <div className="grid grid-cols-3 gap-1">
          {MONTHS.map((m, i) => (
            <button
              key={m}
              type="button"
              onClick={() => onMonthSelect(i)}
              className={[
                'h-9 rounded-lg text-sm font-medium transition-colors',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ds-brand-500)]',
                i === viewMonth ? 'bg-[var(--ds-brand-600)] text-white' : 'text-[var(--ds-text-primary)] hover:bg-[var(--ds-bg-subtle)]',
              ].join(' ')}
            >{m}</button>
          ))}
        </div>
      )}

      {calView === 'years' && (
        <div className="grid grid-cols-3 gap-1">
          {Array.from({ length: 12 }, (_, i) => yearStart + i).map(yr => (
            <button
              key={yr}
              type="button"
              onClick={() => onYearSelect(yr)}
              className={[
                'h-9 rounded-lg text-sm font-medium transition-colors',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ds-brand-500)]',
                yr === viewYear ? 'bg-[var(--ds-brand-600)] text-white' : 'text-[var(--ds-text-primary)] hover:bg-[var(--ds-bg-subtle)]',
              ].join(' ')}
            >{yr}</button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── DateRangePicker ──────────────────────────────────────────────────────────

export function DateRangePicker({
  value:         controlledValue,
  defaultValue,
  onChange,
  label,
  helperText,
  errorMessage,
  placeholder    = 'Select range',
  disabled       = false,
  min,
  max,
  presets        = DEFAULT_PRESETS,
  id: idProp,
  className      = '',
}: DateRangePickerProps) {
  const generatedId = useId();
  const id          = idProp ?? generatedId;

  const [internal, setInternal] = useState<DateRange>(defaultValue ?? { start: '', end: '' });
  const range = controlledValue ?? internal;

  const today = toISO(new Date());
  const now   = new Date();

  // Left panel view
  const [lYear,  setLYear]  = useState(now.getFullYear());
  const [lMonth, setLMonth] = useState(now.getMonth());
  const [lView,  setLView]  = useState<CalView>('days');
  // Right panel = left + 1 month
  const rYear  = lMonth === 11 ? lYear + 1 : lYear;
  const rMonth = lMonth === 11 ? 0 : lMonth + 1;
  const [rView,  setRView]  = useState<CalView>('days');

  const [picking,  setPicking]  = useState<Picking>('start');
  const [hovered,  setHovered]  = useState<string>('');
  const [open,     setOpen]     = useState(false);
  const containerRef             = useRef<HTMLDivElement>(null);

  const subText  = errorMessage ?? helperText;
  const hasError = Boolean(errorMessage);

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

  function handleDayClick(iso: string) {
    if (picking === 'start') {
      const next = { start: iso, end: '' };
      if (controlledValue === undefined) setInternal(next);
      onChange?.(next);
      setPicking('end');
    } else {
      if (range.start && iso < range.start) {
        const next = { start: iso, end: range.start };
        if (controlledValue === undefined) setInternal(next);
        onChange?.(next);
      } else {
        const next = { start: range.start, end: iso };
        if (controlledValue === undefined) setInternal(next);
        onChange?.(next);
      }
      setPicking('start');
      setOpen(false);
    }
  }

  function applyPreset(r: DateRange) {
    if (controlledValue === undefined) setInternal(r);
    onChange?.(r);
    setOpen(false);
    setPicking('start');
  }

  function prevLeft() {
    if (lMonth === 0) { setLMonth(11); setLYear(y => y - 1); }
    else setLMonth(m => m - 1);
  }
  function nextLeft() {
    if (lMonth === 11) { setLMonth(0); setLYear(y => y + 1); }
    else setLMonth(m => m + 1);
  }

  const displayText = range.start && range.end
    ? `${fmt(range.start)} — ${fmt(range.end)}`
    : range.start
      ? `${fmt(range.start)} — …`
      : placeholder;

  return (
    <div ref={containerRef} className={['relative flex flex-col gap-1.5', className].filter(Boolean).join(' ')}>
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-[var(--ds-text-primary)]">{label}</label>
      )}

      <button
        id={id}
        type="button"
        disabled={disabled}
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => { setOpen(v => !v); setPicking('start'); }}
        className={[
          'flex items-center gap-2 rounded-lg border px-3 py-2 text-sm text-left',
          'bg-[var(--ds-bg-surface)] transition-colors min-w-[240px]',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ds-brand-500)]',
          open
            ? 'border-[var(--ds-brand-600)] ring-2 ring-[var(--ds-brand-500)]'
            : hasError
              ? 'border-[var(--ds-danger-border)]'
              : 'border-[var(--ds-border-strong)] hover:border-[var(--ds-brand-600)]',
          disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
        ].filter(Boolean).join(' ')}
      >
        <CalendarIcon size={16} className="shrink-0 text-[var(--ds-text-muted)]" aria-hidden="true" />
        <span className={(range.start || range.end) ? 'text-[var(--ds-text-primary)]' : 'text-[var(--ds-text-muted)]'}>
          {displayText}
        </span>
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="Date range picker"
          className="absolute top-full mt-1 z-[var(--ds-z-dropdown)] bg-[var(--ds-bg-raised)] border border-[var(--ds-border-base)] rounded-xl shadow-lg p-4"
          onMouseLeave={() => setHovered('')}
        >
          {/* Picking hint */}
          <div className="flex items-center gap-2 mb-3 pb-3 border-b border-[var(--ds-border-base)]">
            <span className={['text-xs px-2 py-0.5 rounded-full font-medium', picking === 'start' ? 'bg-[var(--ds-brand-600)] text-white' : 'bg-[var(--ds-bg-subtle)] text-[var(--ds-text-muted)]'].join(' ')}>Start</span>
            <ArrowRightIcon size={12} className="text-[var(--ds-text-muted)]" />
            <span className={['text-xs px-2 py-0.5 rounded-full font-medium', picking === 'end' ? 'bg-[var(--ds-brand-600)] text-white' : 'bg-[var(--ds-bg-subtle)] text-[var(--ds-text-muted)]'].join(' ')}>End</span>
            {(range.start || range.end) && (
              <button
                type="button"
                onClick={() => { const e = { start: '', end: '' }; if (controlledValue === undefined) setInternal(e); onChange?.(e); setPicking('start'); }}
                className="ml-auto text-xs text-[var(--ds-text-muted)] hover:text-[var(--ds-danger-text)] transition-colors"
              >
                Clear
              </button>
            )}
          </div>

          <div className="flex gap-4">
            {/* Presets */}
            {presets.length > 0 && (
              <div className="flex flex-col gap-1 pr-4 border-r border-[var(--ds-border-base)] min-w-[120px]">
                <p className="text-[10px] font-semibold uppercase tracking-wide text-[var(--ds-text-muted)] mb-1">Quick select</p>
                {presets.map(p => (
                  <button
                    key={p.label}
                    type="button"
                    onClick={() => applyPreset(p.range)}
                    className={[
                      'text-left text-xs px-2 py-1.5 rounded-md transition-colors',
                      range.start === p.range.start && range.end === p.range.end
                        ? 'bg-[var(--ds-brand-50)] text-[var(--ds-brand-700)] font-medium'
                        : 'text-[var(--ds-text-secondary)] hover:bg-[var(--ds-bg-subtle)] hover:text-[var(--ds-text-primary)]',
                    ].join(' ')}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            )}

            {/* Two calendars */}
            <div className="flex gap-6">
              <CalendarPanel
                viewYear={lYear} viewMonth={lMonth} calView={lView}
                start={range.start} end={range.end} hovered={hovered}
                today={today} min={min} max={max} picking={picking}
                onDayClick={handleDayClick}
                onDayHover={setHovered}
                onMonthSelect={m => { setLMonth(m); setLView('days'); }}
                onYearSelect={y => { setLYear(y); setLView('months'); }}
                onCalViewChange={setLView}
                onPrev={prevLeft}
                onNext={nextLeft}
              />
              <CalendarPanel
                viewYear={rYear} viewMonth={rMonth} calView={rView}
                start={range.start} end={range.end} hovered={hovered}
                today={today} min={min} max={max} picking={picking}
                onDayClick={handleDayClick}
                onDayHover={setHovered}
                onMonthSelect={m => { setLMonth(m === 0 ? 11 : m - 1); setLYear(m === 0 ? rYear - 1 : lYear); setRView('days'); }}
                onYearSelect={y => { setLYear(y); setRView('months'); }}
                onCalViewChange={setRView}
                onPrev={prevLeft}
                onNext={nextLeft}
                hideNav
              />
            </div>
          </div>
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
