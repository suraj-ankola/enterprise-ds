'use client';
import React, { useEffect, useRef, useState } from 'react';
import { PencilSimpleIcon, CheckIcon, XIcon } from '@phosphor-icons/react';

// ─── Types ────────────────────────────────────────────────────────────────────

export type InlineEditVariant = 'text' | 'textarea' | 'number';

export interface InlineEditProps {
  value:          string;
  onChange:       (value: string) => void;
  variant?:       InlineEditVariant;
  placeholder?:   string;
  /** Show edit icon on hover vs. clicking anywhere on the text */
  trigger?:       'click' | 'icon';
  disabled?:      boolean;
  /** Called when the user presses Escape or clicks cancel */
  onCancel?:      () => void;
  className?:     string;
  inputClassName?: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function InlineEdit({
  value,
  onChange,
  variant       = 'text',
  placeholder   = 'Click to edit…',
  trigger       = 'click',
  disabled      = false,
  onCancel,
  className     = '',
  inputClassName = '',
}: InlineEditProps) {
  const [editing, setEditing] = useState(false);
  const [draft,   setDraft]   = useState(value);
  const inputRef              = useRef<HTMLInputElement & HTMLTextAreaElement>(null);

  // Sync draft when value changes externally
  useEffect(() => {
    if (!editing) setDraft(value);
  }, [value, editing]);

  useEffect(() => {
    if (editing) inputRef.current?.focus();
  }, [editing]);

  function startEdit() {
    if (disabled) return;
    setDraft(value);
    setEditing(true);
  }

  function commit() {
    onChange(draft);
    setEditing(false);
  }

  function cancel() {
    setDraft(value);
    setEditing(false);
    onCancel?.();
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && variant !== 'textarea') { e.preventDefault(); commit(); }
    if (e.key === 'Escape') cancel();
  }

  const inputBase = [
    'w-full bg-[var(--ds-bg-surface)] border border-[var(--ds-brand-500)] rounded-lg px-2.5 py-1',
    'text-sm text-[var(--ds-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ds-brand-500)]',
    inputClassName,
  ].join(' ');

  if (editing) {
    return (
      <div className={['flex items-start gap-1', className].join(' ')}>
        {variant === 'textarea' ? (
          <textarea
            ref={inputRef as React.RefObject<HTMLTextAreaElement>}
            value={draft}
            onChange={e => setDraft(e.target.value)}
            onKeyDown={onKeyDown}
            rows={3}
            className={[inputBase, 'resize-none'].join(' ')}
          />
        ) : (
          <input
            ref={inputRef as React.RefObject<HTMLInputElement>}
            type={variant === 'number' ? 'number' : 'text'}
            value={draft}
            onChange={e => setDraft(e.target.value)}
            onKeyDown={onKeyDown}
            className={inputBase}
          />
        )}
        <div className="flex flex-col gap-0.5 shrink-0 mt-0.5">
          <button
            type="button"
            onClick={commit}
            aria-label="Save"
            className="p-1 rounded-md bg-[var(--ds-brand-600)] text-white hover:bg-[var(--ds-brand-700)] transition-colors"
          >
            <CheckIcon size={12} weight="bold" />
          </button>
          <button
            type="button"
            onClick={cancel}
            aria-label="Cancel"
            className="p-1 rounded-md text-[var(--ds-text-muted)] hover:bg-[var(--ds-bg-subtle)] hover:text-[var(--ds-text-primary)] transition-colors"
          >
            <XIcon size={12} weight="bold" />
          </button>
        </div>
      </div>
    );
  }

  // Read-only / display mode
  const displayText = value || <span className="text-[var(--ds-text-muted)]">{placeholder}</span>;

  if (trigger === 'icon') {
    return (
      <div className={['group flex items-center gap-1.5', className].join(' ')}>
        <span
          className={[
            'text-sm text-[var(--ds-text-primary)]',
            variant === 'textarea' ? 'whitespace-pre-wrap' : '',
          ].join(' ')}
        >
          {displayText}
        </span>
        {!disabled && (
          <button
            type="button"
            onClick={startEdit}
            aria-label="Edit"
            className="opacity-0 group-hover:opacity-100 p-1 rounded-md text-[var(--ds-text-muted)] hover:text-[var(--ds-text-primary)] hover:bg-[var(--ds-bg-subtle)] transition-all"
          >
            <PencilSimpleIcon size={13} />
          </button>
        )}
      </div>
    );
  }

  // trigger === 'click'
  return (
    <div
      role="button"
      tabIndex={disabled ? -1 : 0}
      onClick={startEdit}
      onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && startEdit()}
      aria-label="Click to edit"
      className={[
        'group flex items-center gap-1.5 rounded-lg px-2.5 py-1 cursor-text',
        disabled
          ? 'opacity-50 cursor-not-allowed'
          : 'hover:bg-[var(--ds-bg-subtle)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ds-brand-500)]',
        className,
      ].join(' ')}
    >
      <span className="text-sm text-[var(--ds-text-primary)] flex-1">{displayText}</span>
      {!disabled && (
        <PencilSimpleIcon
          size={12}
          className="text-[var(--ds-text-muted)] opacity-0 group-hover:opacity-100 shrink-0 transition-opacity"
        />
      )}
    </div>
  );
}
