import React, { useId, useState, useContext, createContext } from 'react';

export type RadioSize = 'sm' | 'md' | 'lg';

// ─── RadioGroup context ───────────────────────────────────────────────────────

interface RadioGroupCtx {
  name:     string;
  value:    string;
  onChange: (value: string) => void;
  size:     RadioSize;
  disabled: boolean;
}

const RadioGroupContext = createContext<RadioGroupCtx | null>(null);

// ─── Types ────────────────────────────────────────────────────────────────────

export interface RadioGroupProps {
  value?:        string;
  defaultValue?: string;
  onChange?:     (value: string) => void;
  name?:         string;
  label?:        string;
  helperText?:   string;
  errorMessage?: string;
  size?:         RadioSize;
  disabled?:     boolean;
  children:      React.ReactNode;
  className?:    string;
}

export interface RadioProps {
  value:      string;
  label?:     React.ReactNode;
  helperText?: string;
  disabled?:  boolean;
  size?:      RadioSize;
  id?:        string;
  className?: string;
  // Standalone (no RadioGroup)
  checked?:   boolean;
  onChange?:  (value: string) => void;
  name?:      string;
}

// ─── Size maps ────────────────────────────────────────────────────────────────

const CIRCLE_SIZE: Record<RadioSize, string> = {
  sm: 'h-3.5 w-3.5',
  md: 'h-4   w-4',
  lg: 'h-5   w-5',
};

const DOT_SIZE: Record<RadioSize, string> = {
  sm: 'h-1.5 w-1.5',
  md: 'h-2   w-2',
  lg: 'h-2.5 w-2.5',
};

const TEXT_SIZE: Record<RadioSize, string> = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-sm',
};

// ─── RadioGroup ───────────────────────────────────────────────────────────────

export function RadioGroup({
  value: controlledValue,
  defaultValue = '',
  onChange,
  name: nameProp,
  label,
  helperText,
  errorMessage,
  size     = 'md',
  disabled = false,
  children,
  className = '',
}: RadioGroupProps) {
  const generatedName               = useId();
  const name                        = nameProp ?? generatedName;
  const [internalValue, setInternal] = useState(defaultValue);
  const value = controlledValue !== undefined ? controlledValue : internalValue;

  const subText  = errorMessage ?? helperText;
  const hasError = Boolean(errorMessage);

  function handleChange(v: string) {
    if (controlledValue === undefined) setInternal(v);
    onChange?.(v);
  }

  return (
    <RadioGroupContext.Provider value={{ name, value, onChange: handleChange, size, disabled }}>
      <fieldset className={['flex flex-col gap-1', className].filter(Boolean).join(' ')}>
        {label && (
          <legend className={[
            'mb-2 font-medium text-[var(--ds-text-primary)]',
            TEXT_SIZE[size],
          ].join(' ')}>
            {label}
          </legend>
        )}
        {children}
        {subText && (
          <p className={[
            'mt-1 text-xs',
            hasError ? 'text-[var(--ds-danger-text)]' : 'text-[var(--ds-text-muted)]',
          ].join(' ')}>
            {subText}
          </p>
        )}
      </fieldset>
    </RadioGroupContext.Provider>
  );
}

// ─── Radio ────────────────────────────────────────────────────────────────────

export function Radio({
  value,
  label,
  helperText,
  disabled:   disabledProp = false,
  size:       sizeProp,
  id:         idProp,
  className   = '',
  // Standalone props
  checked:    standaloneChecked,
  onChange:   standaloneOnChange,
  name:       standaloneName,
}: RadioProps) {
  const generatedId = useId();
  const id          = idProp ?? generatedId;

  const ctx       = useContext(RadioGroupContext);
  const isChecked = ctx ? ctx.value === value : (standaloneChecked ?? false);
  const size      = sizeProp ?? ctx?.size ?? 'md';
  const disabled  = disabledProp || (ctx?.disabled ?? false);
  const name      = ctx?.name ?? standaloneName ?? '';

  function handleChange() {
    if (ctx) ctx.onChange(value);
    else standaloneOnChange?.(value);
  }

  return (
    <div className={['inline-flex flex-col', className].filter(Boolean).join(' ')}>
      <label
        htmlFor={id}
        className={[
          'inline-flex items-start gap-2 select-none',
          disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
        ].join(' ')}
      >
        {/* Hidden native input */}
        <input
          id={id}
          type="radio"
          name={name}
          value={value}
          checked={isChecked}
          disabled={disabled}
          className="sr-only peer"
          onChange={handleChange}
        />

        {/* Custom visual — outer ring + inner dot */}
        <span
          className={[
            'shrink-0 rounded-full border-2 flex items-center justify-center',
            'transition-colors mt-px',
            'peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--ds-brand-500)] peer-focus-visible:ring-offset-2',
            'peer-disabled:opacity-50',
            CIRCLE_SIZE[size],
            isChecked
              ? 'border-[var(--ds-brand-600)] bg-[var(--ds-bg-surface)]'
              : 'border-[var(--ds-border-strong)] bg-[var(--ds-bg-surface)]',
          ].join(' ')}
          aria-hidden="true"
        >
          {isChecked && (
            <span className={[
              'rounded-full bg-[var(--ds-brand-600)]',
              DOT_SIZE[size],
            ].join(' ')} />
          )}
        </span>

        {/* Label + helper */}
        {(label || helperText) && (
          <span className="flex flex-col gap-0.5">
            {label && (
              <span className={[TEXT_SIZE[size], 'text-[var(--ds-text-primary)] leading-snug'].join(' ')}>
                {label}
              </span>
            )}
            {helperText && (
              <span className="text-xs text-[var(--ds-text-muted)] leading-snug">
                {helperText}
              </span>
            )}
          </span>
        )}
      </label>
    </div>
  );
}
