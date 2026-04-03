import React, { useId, useState } from 'react';

export type ToggleSize = 'sm' | 'md' | 'lg';

export interface ToggleProps {
  checked?:        boolean;
  defaultChecked?: boolean;
  onChange?:       (checked: boolean) => void;
  disabled?:       boolean;
  label?:          React.ReactNode;
  /** Which side the label appears on. Defaults to 'right'. */
  labelPosition?:  'left' | 'right';
  size?:           ToggleSize;
  id?:             string;
  className?:      string;
}

// ─── Size maps (8pt grid) ─────────────────────────────────────────────────────
// Track: h × w. Thumb: h × w. Thumb offset when checked.
// Formula: checked translateX = track_w - thumb_w - 2 (2px padding each side)

const TRACK: Record<ToggleSize, string> = {
  sm: 'h-4  w-7',    // 16×28px
  md: 'h-5  w-9',    // 20×36px
  lg: 'h-6  w-11',   // 24×44px
};

const THUMB: Record<ToggleSize, string> = {
  sm: 'h-3   w-3',   // 12px
  md: 'h-4   w-4',   // 16px
  lg: 'h-5   w-5',   // 20px
};

// translate-x when checked: 28-12-2=14px | 36-16-2=18px | 44-20-2=22px
const THUMB_ON: Record<ToggleSize, string> = {
  sm: 'translate-x-3.5',
  md: 'translate-x-[18px]',
  lg: 'translate-x-[22px]',
};

const THUMB_OFF = 'translate-x-0.5'; // 2px padding from left edge

const TEXT_SIZE: Record<ToggleSize, string> = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-sm',
};

// ─── Component ────────────────────────────────────────────────────────────────

export function Toggle({
  checked: controlledChecked,
  defaultChecked = false,
  onChange,
  disabled       = false,
  label,
  labelPosition  = 'right',
  size           = 'md',
  id:    idProp,
  className = '',
}: ToggleProps) {
  const generatedId = useId();
  const id          = idProp ?? generatedId;

  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const isChecked = controlledChecked !== undefined ? controlledChecked : internalChecked;

  function toggle() {
    if (disabled) return;
    const next = !isChecked;
    if (controlledChecked === undefined) setInternalChecked(next);
    onChange?.(next);
  }

  const trackClasses = [
    'relative inline-flex items-center shrink-0 rounded-full transition-colors duration-[var(--ds-duration-base)]',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ds-brand-500)] focus-visible:ring-offset-2',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    TRACK[size],
    isChecked ? 'bg-[var(--ds-brand-600)]' : 'bg-[var(--ds-border-strong)]',
  ].join(' ');

  const thumbClasses = [
    'pointer-events-none block rounded-full bg-white shadow-sm',
    'transition-transform duration-[var(--ds-duration-base)]',
    THUMB[size],
    isChecked ? THUMB_ON[size] : THUMB_OFF,
  ].join(' ');

  const labelNode = label && (
    <span
      className={[TEXT_SIZE[size], 'text-[var(--ds-text-primary)] select-none leading-snug'].join(' ')}
    >
      {label}
    </span>
  );

  return (
    <div
      className={[
        'inline-flex items-center gap-2',
        disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
        className,
      ].filter(Boolean).join(' ')}
      onClick={!disabled ? toggle : undefined}
    >
      {labelPosition === 'left' && labelNode}

      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={isChecked}
        aria-label={typeof label === 'string' ? label : undefined}
        disabled={disabled}
        className={trackClasses}
        onClick={e => { e.stopPropagation(); toggle(); }}
      >
        <span className={thumbClasses} />
      </button>

      {labelPosition === 'right' && labelNode}
    </div>
  );
}
