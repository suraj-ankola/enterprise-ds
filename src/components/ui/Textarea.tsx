import React, { useId } from 'react';

export type TextareaSize   = 'sm' | 'md' | 'lg';
export type TextareaStatus = 'default' | 'error' | 'success';
export type TextareaResize = 'none' | 'vertical' | 'both';

export interface TextareaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
  label?:        string;
  helperText?:   string;
  errorMessage?: string;
  status?:       TextareaStatus;
  size?:         TextareaSize;
  /** Number of visible rows */
  rows?:         number;
  /** Resize behaviour */
  resize?:       TextareaResize;
  /** Show character count — requires maxLength prop */
  showCount?:    boolean;
  required?:     boolean;
  fullWidth?:    boolean;
}

// ─── Size maps ────────────────────────────────────────────────────────────────

const TEXTAREA_SIZE: Record<TextareaSize, string> = {
  sm: 'px-3 py-2 text-xs rounded-md',
  md: 'px-3 py-2.5 text-sm rounded-lg',
  lg: 'px-4 py-3 text-sm rounded-lg',
};

const LABEL_SIZE: Record<TextareaSize, string> = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-sm',
};

const RESIZE_CLASS: Record<TextareaResize, string> = {
  none:     'resize-none',
  vertical: 'resize-y',
  both:     'resize',
};

// ─── Status → DS tokens ───────────────────────────────────────────────────────

const STATUS_BORDER: Record<TextareaStatus, string> = {
  default: 'border-[var(--ds-border-strong)] focus:border-[var(--ds-brand-600)] focus:ring-[var(--ds-brand-500)]',
  error:   'border-[var(--ds-danger-border)] focus:border-[var(--ds-danger-icon)] focus:ring-[var(--ds-danger-icon)]',
  success: 'border-[var(--ds-success-border)] focus:border-[var(--ds-success-icon)] focus:ring-[var(--ds-success-icon)]',
};

const STATUS_HELPER: Record<TextareaStatus, string> = {
  default: 'text-[var(--ds-text-muted)]',
  error:   'text-[var(--ds-danger-text)]',
  success: 'text-[var(--ds-success-text)]',
};

// ─── Component ────────────────────────────────────────────────────────────────

export function Textarea({
  label,
  helperText,
  errorMessage,
  status: statusProp,
  size       = 'md',
  rows       = 4,
  resize     = 'vertical',
  showCount  = false,
  required,
  fullWidth  = false,
  className  = '',
  disabled,
  readOnly,
  id: idProp,
  maxLength,
  value,
  defaultValue,
  onChange,
  ...props
}: TextareaProps) {
  const generatedId = useId();
  const id     = idProp ?? generatedId;
  const status: TextareaStatus = errorMessage ? 'error' : (statusProp ?? 'default');
  const subText = errorMessage ?? helperText;

  // Character count — controlled & uncontrolled
  const [charCount, setCharCount] = React.useState<number>(() => {
    const init = value ?? defaultValue;
    return typeof init === 'string' ? init.length : 0;
  });

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setCharCount(e.target.value.length);
    onChange?.(e);
  }

  // Sync controlled value length
  React.useEffect(() => {
    if (typeof value === 'string') setCharCount(value.length);
  }, [value]);

  const textareaClasses = [
    'block w-full border outline-none transition-colors',
    'bg-[var(--ds-bg-surface)] text-[var(--ds-text-primary)]',
    'placeholder-[var(--ds-text-muted)]',
    'focus:ring-2 focus:ring-offset-0',
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-[var(--ds-bg-subtle)]',
    'read-only:bg-[var(--ds-bg-subtle)] read-only:cursor-default',
    'min-h-[80px]',
    TEXTAREA_SIZE[size],
    STATUS_BORDER[status],
    RESIZE_CLASS[resize],
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={fullWidth ? 'w-full flex flex-col' : 'inline-flex flex-col'}>

      {/* Label */}
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

      {/* Textarea */}
      <textarea
        id={id}
        rows={rows}
        disabled={disabled}
        readOnly={readOnly}
        required={required}
        maxLength={maxLength}
        value={value}
        defaultValue={defaultValue}
        onChange={handleChange}
        aria-invalid={status === 'error'}
        aria-describedby={subText ? `${id}-hint` : undefined}
        className={textareaClasses}
        {...props}
      />

      {/* Footer: helper text + char count */}
      <div className="mt-1.5 flex items-start justify-between gap-2">
        {subText ? (
          <p id={`${id}-hint`} className={['text-xs', STATUS_HELPER[status]].join(' ')}>
            {subText}
          </p>
        ) : <span />}

        {showCount && maxLength && (
          <p
            className={[
              'text-xs shrink-0 tabular-nums',
              charCount >= maxLength
                ? 'text-[var(--ds-danger-text)]'
                : 'text-[var(--ds-text-muted)]',
            ].join(' ')}
            aria-live="polite"
          >
            {charCount} / {maxLength}
          </p>
        )}
      </div>
    </div>
  );
}
