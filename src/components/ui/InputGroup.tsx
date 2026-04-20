import React, { useId } from 'react';
import type { InputSize, InputStatus } from './Input';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface InputGroupProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix' | 'suffix'> {
  label?:        string;
  helperText?:   string;
  errorMessage?: string;
  status?:       InputStatus;
  size?:         InputSize;
  required?:     boolean;
  fullWidth?:    boolean;
  /** Text or node shown as an attached box on the left (e.g. "$", "https://") */
  prefix?:       React.ReactNode;
  /** Text or node shown as an attached box on the right (e.g. ".com", "USD") */
  suffix?:       React.ReactNode;
  /** Icon rendered inside the input on the left */
  leftIcon?:     React.ReactNode;
  /** Icon rendered inside the input on the right — hidden when addonButton is present */
  rightIcon?:    React.ReactNode;
  /** Button component attached flush to the right edge of the input. Use <AddonButton /> */
  addonButton?:  React.ReactNode;
}

export interface AddonButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?:      InputSize;
  status?:    InputStatus;
  variant?:   'default' | 'primary';
  leftIcon?:  React.ReactNode;
  rightIcon?: React.ReactNode;
}

// ─── Size maps (8pt grid — mirror Input.tsx) ──────────────────────────────────

const HEIGHT: Record<InputSize, string> = {
  sm: 'h-8  text-xs',
  md: 'h-10 text-sm',
  lg: 'h-11 text-sm',
};

const PX: Record<InputSize, string> = {
  sm: 'px-3',
  md: 'px-3',
  lg: 'px-4',
};

const RADIUS_L: Record<InputSize, string> = {
  sm: 'rounded-l-md',
  md: 'rounded-l-lg',
  lg: 'rounded-l-lg',
};

const RADIUS_R: Record<InputSize, string> = {
  sm: 'rounded-r-md',
  md: 'rounded-r-lg',
  lg: 'rounded-r-lg',
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

// ─── Status → DS tokens ───────────────────────────────────────────────────────

const INPUT_BORDER: Record<InputStatus, string> = {
  default: 'border-[var(--ds-border-strong)] focus:border-[var(--ds-brand-600)] focus:ring-[var(--ds-brand-500)]',
  error:   'border-[var(--ds-danger-border)] focus:border-[var(--ds-danger-icon)]  focus:ring-[var(--ds-danger-icon)]',
  success: 'border-[var(--ds-success-border)] focus:border-[var(--ds-success-icon)] focus:ring-[var(--ds-success-icon)]',
};

const ADDON_BORDER: Record<InputStatus, string> = {
  default: 'border-[var(--ds-border-strong)]',
  error:   'border-[var(--ds-danger-border)]',
  success: 'border-[var(--ds-success-border)]',
};

const HELPER_COLOR: Record<InputStatus, string> = {
  default: 'text-[var(--ds-text-muted)]',
  error:   'text-[var(--ds-danger-text)]',
  success: 'text-[var(--ds-success-text)]',
};

const ICON_COLOR: Record<InputStatus, string> = {
  default: 'text-[var(--ds-text-muted)]',
  error:   'text-[var(--ds-danger-icon)]',
  success: 'text-[var(--ds-success-icon)]',
};

// ─── AddonButton ──────────────────────────────────────────────────────────────

/**
 * A button that attaches flush to the right edge of InputGroup.
 * Pass size and status that match the parent InputGroup.
 */
export function AddonButton({
  size      = 'md',
  status    = 'default',
  variant   = 'default',
  leftIcon,
  rightIcon,
  children,
  className = '',
  disabled,
  ...props
}: AddonButtonProps) {
  const base = [
    'inline-flex items-center justify-center shrink-0 gap-1.5',
    'font-medium border outline-none transition-colors cursor-pointer select-none',
    'focus:ring-2 focus:ring-offset-0 focus:z-10 relative',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    HEIGHT[size],
    PX[size],
    RADIUS_R[size],
    'rounded-l-none',
    ADDON_BORDER[status],
  ];

  const variantClasses = variant === 'primary'
    ? [
        'bg-[var(--ds-brand-600)] text-[var(--ds-brand-text)]',
        'border-[var(--ds-brand-600)]',
        'hover:bg-[var(--ds-brand-700)] hover:border-[var(--ds-brand-700)]',
        'active:bg-[var(--ds-brand-800)]',
        'focus:ring-[var(--ds-brand-500)]',
      ]
    : [
        'bg-[var(--ds-bg-subtle)] text-[var(--ds-text-secondary)]',
        'hover:bg-[var(--ds-bg-subtle)] hover:text-[var(--ds-text-primary)]',
        'active:bg-[var(--ds-border-base)]',
        'focus:ring-[var(--ds-brand-500)]',
      ];

  return (
    <button
      type="button"
      disabled={disabled}
      className={[...base, ...variantClasses, className].join(' ')}
      {...props}
    >
      {leftIcon && <span className="shrink-0 flex items-center" aria-hidden="true">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="shrink-0 flex items-center" aria-hidden="true">{rightIcon}</span>}
    </button>
  );
}

// ─── InputGroup ───────────────────────────────────────────────────────────────

export function InputGroup({
  label,
  helperText,
  errorMessage,
  status: statusProp,
  size       = 'md',
  required,
  fullWidth  = false,
  prefix,
  suffix,
  leftIcon,
  rightIcon,
  addonButton,
  className  = '',
  disabled,
  readOnly,
  id: idProp,
  ...props
}: InputGroupProps) {
  const generatedId = useId();
  const id      = idProp ?? generatedId;
  const status: InputStatus = errorMessage ? 'error' : (statusProp ?? 'default');
  const subText = errorMessage ?? helperText;

  const hasAddonRight = !!(suffix || addonButton);

  const inputClasses = [
    'block w-full min-w-0 border outline-none transition-colors',
    'bg-[var(--ds-bg-surface)] text-[var(--ds-text-primary)]',
    'placeholder-[var(--ds-text-muted)]',
    'focus:ring-2 focus:ring-offset-0 focus:z-10 relative',
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-[var(--ds-bg-subtle)]',
    'read-only:bg-[var(--ds-bg-subtle)] read-only:cursor-default',
    HEIGHT[size],
    PX[size],
    INPUT_BORDER[status],
    // Left side: flatten radius and remove border when prefix is present
    prefix       ? 'rounded-l-none border-l-0' : RADIUS_L[size],
    // Right side: flatten radius and remove border when suffix/button is present
    hasAddonRight ? 'rounded-r-none border-r-0' : RADIUS_R[size],
    leftIcon  ? ICON_PAD_L[size] : '',
    // Right icon padding only when no right addon to avoid overlap
    rightIcon && !hasAddonRight ? ICON_PAD_R[size] : '',
    className,
  ].filter(Boolean).join(' ');

  const addonBase = [
    'inline-flex items-center shrink-0 border',
    'bg-[var(--ds-bg-subtle)] text-[var(--ds-text-secondary)]',
    'text-xs font-medium whitespace-nowrap select-none',
    HEIGHT[size],
    PX[size],
    ADDON_BORDER[status],
  ];

  const prefixClasses = [
    ...addonBase,
    RADIUS_L[size],
    'rounded-r-none border-r-0',
  ].join(' ');

  const suffixClasses = [
    ...addonBase,
    RADIUS_R[size],
    'rounded-l-none border-l-0',
  ].join(' ');

  return (
    <div className={fullWidth ? 'w-full flex flex-col' : 'inline-flex flex-col'}>

      {label && (
        <label
          htmlFor={id}
          className={['mb-1.5 font-medium text-[var(--ds-text-primary)]', LABEL_SIZE[size]].join(' ')}
        >
          {label}
          {required && (
            <span className="ml-0.5 text-[var(--ds-danger-text)]" aria-hidden="true">*</span>
          )}
        </label>
      )}

      {/* Row: prefix | [icon · input · icon] | suffix | addonButton */}
      <div className="flex items-stretch">

        {prefix && (
          <span className={prefixClasses} aria-hidden="true">{prefix}</span>
        )}

        {/* Input wrapper — needed for absolute-positioned icons */}
        <div className="relative flex items-center flex-1 min-w-0">
          {leftIcon && (
            <span
              className={[
                'pointer-events-none absolute left-3 flex items-center shrink-0',
                ICON_SIZE[size],
                ICON_COLOR[status],
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

          {rightIcon && !hasAddonRight && (
            <span
              className={[
                'pointer-events-none absolute right-3 flex items-center shrink-0',
                ICON_SIZE[size],
                ICON_COLOR[status],
              ].join(' ')}
              aria-hidden="true"
            >
              {rightIcon}
            </span>
          )}
        </div>

        {suffix && (
          <span className={suffixClasses} aria-hidden="true">{suffix}</span>
        )}

        {addonButton}
      </div>

      {subText && (
        <p
          id={`${id}-hint`}
          className={['mt-1.5 text-xs', HELPER_COLOR[status]].join(' ')}
        >
          {subText}
        </p>
      )}
    </div>
  );
}
