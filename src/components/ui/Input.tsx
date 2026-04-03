import React, { useId } from 'react';

export type InputSize   = 'sm' | 'md' | 'lg';
export type InputStatus = 'default' | 'error' | 'success';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?:        string;
  helperText?:   string;
  errorMessage?: string;
  status?:       InputStatus;
  size?:         InputSize;
  leftIcon?:     React.ReactNode;
  rightIcon?:    React.ReactNode;
  required?:     boolean;
  fullWidth?:    boolean;
}

// ─── Size maps (8pt grid) ─────────────────────────────────────────────────────
const INPUT_SIZE: Record<InputSize, string> = {
  sm: 'h-8  px-3 text-xs  rounded-md',
  md: 'h-10 px-3 text-sm  rounded-lg',
  lg: 'h-11 px-4 text-sm  rounded-lg',
};

const LABEL_SIZE: Record<InputSize, string> = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-sm',
};

const ICON_SIZE: Record<InputSize, string> = {
  sm: 'h-3.5 w-3.5',
  md: 'h-4   w-4',
  lg: 'h-4   w-4',
};

const ICON_PAD_L: Record<InputSize, string> = { sm: 'pl-8', md: 'pl-9', lg: 'pl-10' };
const ICON_PAD_R: Record<InputSize, string> = { sm: 'pr-8', md: 'pr-9', lg: 'pr-10' };

// ─── Status → uses --ds-* tokens ──────────────────────────────────────────────
const STATUS_BORDER: Record<InputStatus, string> = {
  default: 'border-[var(--ds-border-strong)] focus:border-[var(--ds-brand-600)] focus:ring-[var(--ds-brand-500)]',
  error:   'border-[var(--ds-danger-border)] focus:border-[var(--ds-danger-icon)] focus:ring-[var(--ds-danger-icon)]',
  success: 'border-[var(--ds-success-border)] focus:border-[var(--ds-success-icon)] focus:ring-[var(--ds-success-icon)]',
};

const STATUS_ICON_COLOR: Record<InputStatus, string> = {
  default: 'text-[var(--ds-text-muted)]',
  error:   'text-[var(--ds-danger-icon)]',
  success: 'text-[var(--ds-success-icon)]',
};

const STATUS_HELPER_COLOR: Record<InputStatus, string> = {
  default: 'text-[var(--ds-text-muted)]',
  error:   'text-[var(--ds-danger-text)]',
  success: 'text-[var(--ds-success-text)]',
};

// ─── Component ────────────────────────────────────────────────────────────────

export function Input({
  label,
  helperText,
  errorMessage,
  status: statusProp,
  size      = 'md',
  leftIcon,
  rightIcon,
  required,
  fullWidth = false,
  className = '',
  disabled,
  readOnly,
  id: idProp,
  ...props
}: InputProps) {
  const generatedId = useId();
  const id     = idProp ?? generatedId;
  const status: InputStatus = errorMessage ? 'error' : (statusProp ?? 'default');
  const subText = errorMessage ?? helperText;

  const inputClasses = [
    'block w-full border outline-none transition-colors',
    'bg-[var(--ds-bg-surface)] text-[var(--ds-text-primary)]',
    'placeholder-[var(--ds-text-muted)]',
    'focus:ring-2 focus:ring-offset-0',
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-[var(--ds-bg-subtle)]',
    'read-only:bg-[var(--ds-bg-subtle)] read-only:cursor-default',
    INPUT_SIZE[size],
    STATUS_BORDER[status],
    leftIcon  ? ICON_PAD_L[size] : '',
    rightIcon ? ICON_PAD_R[size] : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={fullWidth ? 'w-full flex flex-col' : 'inline-flex flex-col'}>

      {/* Label */}
      {label && (
        <label
          htmlFor={id}
          className={[
            'mb-1.5 font-medium text-[var(--ds-text-primary)]',
            LABEL_SIZE[size],
          ].join(' ')}
        >
          {label}
          {required && (
            <span className="ml-0.5 text-[var(--ds-danger-text)]" aria-hidden="true">*</span>
          )}
        </label>
      )}

      {/* Input + icons */}
      <div className="relative flex items-center">
        {leftIcon && (
          <span
            className={[
              'pointer-events-none absolute left-3 flex items-center shrink-0',
              ICON_SIZE[size],
              STATUS_ICON_COLOR[status],
            ].join(' ')}
            aria-hidden="true"
          >
            {leftIcon}
          </span>
        )}

        <input
          id={id}
          disabled={disabled}
          readOnly={readOnly}
          required={required}
          aria-invalid={status === 'error'}
          aria-describedby={subText ? `${id}-hint` : undefined}
          className={inputClasses}
          {...props}
        />

        {rightIcon && (
          <span
            className={[
              'pointer-events-none absolute right-3 flex items-center shrink-0',
              ICON_SIZE[size],
              STATUS_ICON_COLOR[status],
            ].join(' ')}
            aria-hidden="true"
          >
            {rightIcon}
          </span>
        )}
      </div>

      {/* Helper / Error */}
      {subText && (
        <p
          id={`${id}-hint`}
          className={['mt-1.5 text-xs', STATUS_HELPER_COLOR[status]].join(' ')}
        >
          {subText}
        </p>
      )}
    </div>
  );
}
