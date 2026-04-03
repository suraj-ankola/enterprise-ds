import React, { useId } from 'react';

export type InputSize   = 'sm' | 'md' | 'lg';
export type InputStatus = 'default' | 'error' | 'success';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Label shown above the input */
  label?: string;
  /** Subtle hint text shown below the input */
  helperText?: string;
  /** Replaces helperText and sets error styling */
  errorMessage?: string;
  /** Visual state — derived from errorMessage when not set */
  status?: InputStatus;
  size?: InputSize;
  /** Icon or element placed inside the left edge */
  leftIcon?: React.ReactNode;
  /** Icon or element placed inside the right edge */
  rightIcon?: React.ReactNode;
  /** Shows a red * after the label */
  required?: boolean;
  fullWidth?: boolean;
}

// ─── Size maps ───────────────────────────────────────────────────────────────

const inputSizeClasses: Record<InputSize, string> = {
  sm: 'h-8  px-3     text-xs  rounded-md',
  md: 'h-10 px-3     text-sm  rounded-lg',
  lg: 'h-11 px-4     text-base rounded-lg',
};

const labelSizeClasses: Record<InputSize, string> = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-sm',
};

const iconSizeClasses: Record<InputSize, string> = {
  sm: 'h-3.5 w-3.5',
  md: 'h-4   w-4',
  lg: 'h-5   w-5',
};

const iconPaddingLeft:  Record<InputSize, string> = { sm: 'pl-8',  md: 'pl-9',  lg: 'pl-10' };
const iconPaddingRight: Record<InputSize, string> = { sm: 'pr-8',  md: 'pr-9',  lg: 'pr-10' };

// ─── Status maps ─────────────────────────────────────────────────────────────

const statusBorderClasses: Record<InputStatus, string> = {
  default: 'border-slate-300 dark:border-slate-600 focus:border-blue-500 dark:focus:border-blue-400',
  error:   'border-red-500   dark:border-red-400   focus:border-red-500   dark:focus:border-red-400',
  success: 'border-green-500 dark:border-green-400 focus:border-green-500 dark:focus:border-green-400',
};

const statusRingClasses: Record<InputStatus, string> = {
  default: 'focus:ring-blue-500  dark:focus:ring-blue-400',
  error:   'focus:ring-red-500   dark:focus:ring-red-400',
  success: 'focus:ring-green-500 dark:focus:ring-green-400',
};

const statusIconColor: Record<InputStatus, string> = {
  default: 'text-slate-400 dark:text-slate-500',
  error:   'text-red-500   dark:text-red-400',
  success: 'text-green-500 dark:text-green-400',
};

// ─── Component ───────────────────────────────────────────────────────────────

export function Input({
  label,
  helperText,
  errorMessage,
  status: statusProp,
  size = 'md',
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
  const id = idProp ?? generatedId;

  // Derive status: errorMessage always wins
  const status: InputStatus = errorMessage ? 'error' : (statusProp ?? 'default');

  const subText = errorMessage ?? helperText;

  const inputClasses = [
    'block w-full border bg-white text-slate-900 placeholder-slate-400',
    'transition-colors duration-150 outline-none',
    'focus:ring-2 focus:ring-offset-0',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    'read-only:bg-slate-50 read-only:cursor-default',
    'dark:bg-slate-800 dark:text-slate-100 dark:placeholder-slate-500',
    'dark:read-only:bg-slate-900',
    inputSizeClasses[size],
    statusBorderClasses[status],
    statusRingClasses[status],
    leftIcon  ? iconPaddingLeft[size]  : '',
    rightIcon ? iconPaddingRight[size] : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={fullWidth ? 'w-full' : 'inline-flex flex-col'}>

      {/* Label */}
      {label && (
        <label
          htmlFor={id}
          className={[
            'mb-1.5 font-medium text-slate-700 dark:text-slate-300',
            labelSizeClasses[size],
          ].join(' ')}
        >
          {label}
          {required && (
            <span className="ml-0.5 text-red-500" aria-hidden="true">*</span>
          )}
        </label>
      )}

      {/* Input wrapper (for icon positioning) */}
      <div className="relative flex items-center">

        {/* Left icon */}
        {leftIcon && (
          <span
            className={[
              'pointer-events-none absolute left-3 flex items-center',
              iconSizeClasses[size],
              statusIconColor[status],
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

        {/* Right icon */}
        {rightIcon && (
          <span
            className={[
              'pointer-events-none absolute right-3 flex items-center',
              iconSizeClasses[size],
              statusIconColor[status],
            ].join(' ')}
            aria-hidden="true"
          >
            {rightIcon}
          </span>
        )}
      </div>

      {/* Helper / Error text */}
      {subText && (
        <p
          id={`${id}-hint`}
          className={[
            'mt-1.5 text-xs',
            status === 'error'
              ? 'text-red-600 dark:text-red-400'
              : 'text-slate-500 dark:text-slate-400',
          ].join(' ')}
        >
          {subText}
        </p>
      )}
    </div>
  );
}
