import React from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-blue-600 text-white border border-blue-600 shadow-sm ' +
    'hover:bg-blue-700 hover:border-blue-700 ' +
    'dark:bg-blue-500 dark:border-blue-500 dark:hover:bg-blue-600 dark:hover:border-blue-600 ' +
    'focus-visible:ring-blue-500',
  secondary:
    'bg-white text-slate-800 border border-slate-300 shadow-sm ' +
    'hover:bg-slate-50 hover:border-slate-400 ' +
    'dark:bg-slate-800 dark:text-slate-100 dark:border-slate-600 dark:hover:bg-slate-700 dark:hover:border-slate-500 ' +
    'focus-visible:ring-blue-500',
  ghost:
    'bg-transparent text-slate-700 border border-transparent ' +
    'hover:bg-slate-100 hover:text-slate-900 ' +
    'dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-slate-100 ' +
    'focus-visible:ring-blue-500',
  danger:
    'bg-red-600 text-white border border-red-600 shadow-sm ' +
    'hover:bg-red-700 hover:border-red-700 ' +
    'dark:bg-red-500 dark:border-red-500 dark:hover:bg-red-600 dark:hover:border-red-600 ' +
    'focus-visible:ring-red-500',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'h-8  px-3   text-xs  gap-1.5 rounded-md',
  md: 'h-9  px-4   text-sm  gap-2   rounded-lg',
  lg: 'h-11 px-5   text-base gap-2  rounded-lg',
};

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  children,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;

  const classes = [
    'inline-flex items-center justify-center font-semibold',
    'transition-all duration-150 cursor-pointer',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
    variantClasses[variant],
    sizeClasses[size],
    fullWidth ? 'w-full' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type="button"
      className={classes}
      disabled={isDisabled}
      aria-busy={loading}
      {...props}
    >
      {loading ? (
        <Spinner size={size} />
      ) : (
        leftIcon && <span className="shrink-0">{leftIcon}</span>
      )}
      <span>{children}</span>
      {!loading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
    </button>
  );
}

function Spinner({ size }: { size: ButtonSize }) {
  const sz = size === 'sm' ? 'h-3.5 w-3.5' : size === 'lg' ? 'h-5 w-5' : 'h-4 w-4';
  return (
    <svg
      className={`${sz} animate-spin shrink-0`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  );
}
