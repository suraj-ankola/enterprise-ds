import React, { useId, useRef, useEffect, useState } from 'react';
import { CheckIcon, MinusIcon } from '@phosphor-icons/react';

export type CheckboxSize = 'sm' | 'md' | 'lg';

export interface CheckboxProps {
  checked?:        boolean;
  defaultChecked?: boolean;
  onChange?:       (checked: boolean) => void;
  /** Shows a dash — used for "select all" when some rows are selected */
  indeterminate?:  boolean;
  disabled?:       boolean;
  label?:          React.ReactNode;
  helperText?:     string;
  errorMessage?:   string;
  size?:           CheckboxSize;
  id?:             string;
  name?:           string;
  value?:          string;
  className?:      string;
}

// ─── Size maps ────────────────────────────────────────────────────────────────

const BOX_SIZE: Record<CheckboxSize, string> = {
  sm: 'h-3.5 w-3.5 rounded',
  md: 'h-4   w-4   rounded',
  lg: 'h-5   w-5   rounded-md',
};

const ICON_SIZE: Record<CheckboxSize, number> = { sm: 8, md: 10, lg: 12 };

const TEXT_SIZE: Record<CheckboxSize, string> = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-sm',
};

// ─── Component ────────────────────────────────────────────────────────────────

export function Checkbox({
  checked: controlledChecked,
  defaultChecked = false,
  onChange,
  indeterminate  = false,
  disabled       = false,
  label,
  helperText,
  errorMessage,
  size           = 'md',
  id: idProp,
  name,
  value,
  className      = '',
}: CheckboxProps) {
  const generatedId = useId();
  const id          = idProp ?? generatedId;

  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const isChecked = controlledChecked !== undefined ? controlledChecked : internalChecked;

  const inputRef = useRef<HTMLInputElement>(null);

  // indeterminate must be set via JS — no HTML attribute for it
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  const subText = errorMessage ?? helperText;
  const hasError = Boolean(errorMessage);

  const visualClasses = [
    'shrink-0 flex items-center justify-center border-2 transition-colors',
    'peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--ds-brand-500)] peer-focus-visible:ring-offset-2',
    'peer-disabled:opacity-50',
    BOX_SIZE[size],
    isChecked || indeterminate
      ? 'bg-[var(--ds-brand-600)] border-[var(--ds-brand-600)]'
      : hasError
        ? 'bg-[var(--ds-bg-surface)] border-[var(--ds-danger-border)]'
        : 'bg-[var(--ds-bg-surface)] border-[var(--ds-border-strong)]',
  ].join(' ');

  return (
    <div className={['inline-flex flex-col', className].filter(Boolean).join(' ')}>
      <label
        htmlFor={id}
        className={[
          'inline-flex items-start gap-2 select-none',
          disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
        ].join(' ')}
      >
        {/* Hidden native input — drives all accessibility */}
        <input
          ref={inputRef}
          id={id}
          type="checkbox"
          name={name}
          value={value}
          checked={isChecked}
          disabled={disabled}
          className="sr-only peer"
          onChange={e => {
            if (controlledChecked === undefined) setInternalChecked(e.target.checked);
            onChange?.(e.target.checked);
          }}
        />

        {/* Custom visual */}
        <span className={visualClasses} aria-hidden="true">
          {indeterminate
            ? <MinusIcon size={ICON_SIZE[size]} weight="bold" className="text-white" />
            : <CheckIcon size={ICON_SIZE[size]} weight="bold"
                className={['text-white transition-opacity', isChecked ? 'opacity-100' : 'opacity-0'].join(' ')} />
          }
        </span>

        {/* Label + helper */}
        {(label || subText) && (
          <span className="flex flex-col gap-0.5">
            {label && (
              <span className={[TEXT_SIZE[size], 'text-[var(--ds-text-primary)] leading-snug'].join(' ')}>
                {label}
              </span>
            )}
            {subText && (
              <span className={[
                'text-xs leading-snug',
                hasError ? 'text-[var(--ds-danger-text)]' : 'text-[var(--ds-text-muted)]',
              ].join(' ')}>
                {subText}
              </span>
            )}
          </span>
        )}
      </label>
    </div>
  );
}
