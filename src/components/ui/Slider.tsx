import React, { useId } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface SliderProps {
  value:         number;
  onChange:      (value: number) => void;
  min?:          number;
  max?:          number;
  step?:         number;
  label?:        string;
  showValue?:    boolean;
  formatValue?:  (v: number) => string;
  disabled?:     boolean;
  /** Adds tick marks at step intervals */
  ticks?:        boolean;
  className?:    string;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function Slider({
  value,
  onChange,
  min          = 0,
  max          = 100,
  step         = 1,
  label,
  showValue    = false,
  formatValue  = (v) => String(v),
  disabled     = false,
  ticks        = false,
  className    = '',
}: SliderProps) {
  const id = useId();

  const pct = ((value - min) / (max - min)) * 100;

  const trackFill: React.CSSProperties = {
    backgroundImage: `linear-gradient(to right, var(--ds-brand-600) ${pct}%, var(--ds-bg-raised) ${pct}%)`,
  };

  return (
    <div className={['space-y-1', className].join(' ')}>
      {(label || showValue) && (
        <div className="flex items-center justify-between">
          {label && (
            <label
              htmlFor={id}
              className="text-sm font-medium text-[var(--ds-text-primary)]"
            >
              {label}
            </label>
          )}
          {showValue && (
            <span className="text-sm text-[var(--ds-text-secondary)] tabular-nums">
              {formatValue(value)}
            </span>
          )}
        </div>
      )}

      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        disabled={disabled}
        onChange={e => onChange(Number(e.target.value))}
        style={trackFill}
        className={[
          'w-full h-1.5 rounded-full appearance-none cursor-pointer',
          'border border-[var(--ds-border-base)]',
          // thumb
          '[&::-webkit-slider-thumb]:appearance-none',
          '[&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4',
          '[&::-webkit-slider-thumb]:rounded-full',
          '[&::-webkit-slider-thumb]:bg-[var(--ds-brand-600)]',
          '[&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white',
          '[&::-webkit-slider-thumb]:shadow-sm',
          '[&::-webkit-slider-thumb]:cursor-pointer',
          '[&::-webkit-slider-thumb]:transition-transform',
          '[&::-webkit-slider-thumb]:hover:scale-110',
          '[&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4',
          '[&::-moz-range-thumb]:rounded-full',
          '[&::-moz-range-thumb]:bg-[var(--ds-brand-600)]',
          '[&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white',
          '[&::-moz-range-thumb]:cursor-pointer',
          'focus-visible:outline-none focus-visible:ring-2',
          'focus-visible:ring-[var(--ds-brand-500)] focus-visible:ring-offset-1',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          'disabled:[&::-webkit-slider-thumb]:cursor-not-allowed',
        ].join(' ')}
      />

      {ticks && (
        <div className="flex justify-between px-1">
          {Array.from({ length: Math.floor((max - min) / step) + 1 }).map((_, i) => {
            const tickVal = min + i * step;
            return (
              <span
                key={tickVal}
                className="text-[10px] text-[var(--ds-text-muted)]"
              >
                {formatValue(tickVal)}
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
}
