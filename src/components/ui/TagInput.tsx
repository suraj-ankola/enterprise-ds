import React, { useId, useRef, useState, KeyboardEvent } from 'react';
import { XIcon } from '@phosphor-icons/react';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface TagInputProps {
  value?:          string[];
  defaultValue?:   string[];
  onChange?:       (tags: string[]) => void;
  /** Keys that confirm a tag — defaults to Enter and comma */
  confirmKeys?:    string[];
  placeholder?:    string;
  label?:          string;
  helperText?:     string;
  errorMessage?:   string;
  disabled?:       boolean;
  /** Max number of tags */
  max?:            number;
  /** Suggestions list */
  suggestions?:    string[];
  id?:             string;
  className?:      string;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function TagInput({
  value:           controlledValue,
  defaultValue     = [],
  onChange,
  confirmKeys      = ['Enter', ','],
  placeholder      = 'Add a tag…',
  label,
  helperText,
  errorMessage,
  disabled         = false,
  max,
  suggestions,
  id: idProp,
  className        = '',
}: TagInputProps) {
  const generatedId = useId();
  const id          = idProp ?? generatedId;

  const [internal, setInternal]   = useState<string[]>(defaultValue);
  const [inputVal, setInputVal]   = useState('');
  const [showSug, setShowSug]     = useState(false);
  const inputRef                  = useRef<HTMLInputElement>(null);

  const tags   = controlledValue !== undefined ? controlledValue : internal;
  const subText = errorMessage ?? helperText;
  const hasError = Boolean(errorMessage);

  function setTags(next: string[]) {
    if (controlledValue === undefined) setInternal(next);
    onChange?.(next);
  }

  function addTag(raw: string) {
    const val = raw.trim().replace(/,$/, '');
    if (!val || tags.includes(val)) { setInputVal(''); return; }
    if (max !== undefined && tags.length >= max) return;
    setTags([...tags, val]);
    setInputVal('');
  }

  function removeTag(tag: string) {
    setTags(tags.filter(t => t !== tag));
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (confirmKeys.includes(e.key)) {
      e.preventDefault();
      addTag(inputVal);
    } else if (e.key === 'Backspace' && inputVal === '' && tags.length > 0) {
      removeTag(tags[tags.length - 1]);
    }
  }

  const filteredSug = suggestions
    ? suggestions.filter(s => !tags.includes(s) && s.toLowerCase().includes(inputVal.toLowerCase()))
    : [];

  const isAtMax = max !== undefined && tags.length >= max;

  return (
    <div className={['flex flex-col gap-1.5', className].filter(Boolean).join(' ')}>
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-[var(--ds-text-primary)]">
          {label}
        </label>
      )}

      {/* Tag field */}
      <div
        className={[
          'flex flex-wrap gap-1.5 rounded-lg border px-3 py-2 min-h-[40px]',
          'bg-[var(--ds-bg-surface)] transition-colors cursor-text',
          'focus-within:border-[var(--ds-brand-600)] focus-within:ring-2 focus-within:ring-[var(--ds-brand-500)] focus-within:ring-offset-0',
          hasError ? 'border-[var(--ds-danger-border)]' : 'border-[var(--ds-border-strong)]',
          disabled ? 'opacity-50 cursor-not-allowed' : '',
        ].filter(Boolean).join(' ')}
        onClick={() => !disabled && inputRef.current?.focus()}
      >
        {/* Tags */}
        {tags.map(tag => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium bg-[var(--ds-brand-100)] text-[var(--ds-brand-700)]"
          >
            {tag}
            {!disabled && (
              <button
                type="button"
                aria-label={`Remove ${tag}`}
                onClick={e => { e.stopPropagation(); removeTag(tag); }}
                className="text-[var(--ds-brand-600)] hover:text-[var(--ds-brand-800)] focus-visible:outline-none"
              >
                <XIcon size={10} weight="bold" />
              </button>
            )}
          </span>
        ))}

        {/* Input */}
        {!isAtMax && (
          <input
            ref={inputRef}
            id={id}
            type="text"
            value={inputVal}
            disabled={disabled}
            placeholder={tags.length === 0 ? placeholder : ''}
            onChange={e => { setInputVal(e.target.value); setShowSug(true); }}
            onKeyDown={handleKeyDown}
            onBlur={() => { if (inputVal.trim()) addTag(inputVal); setTimeout(() => setShowSug(false), 150); }}
            onFocus={() => setShowSug(true)}
            className="flex-1 min-w-[80px] bg-transparent outline-none text-sm text-[var(--ds-text-primary)] placeholder:text-[var(--ds-text-muted)]"
            aria-label={label ?? 'Add tag'}
            autoComplete="off"
          />
        )}
      </div>

      {/* Suggestions dropdown */}
      {showSug && filteredSug.length > 0 && (
        <div className="rounded-lg border border-[var(--ds-border-base)] bg-[var(--ds-bg-raised)] shadow-lg py-1 max-h-48 overflow-y-auto">
          {filteredSug.map(s => (
            <button
              key={s}
              type="button"
              onMouseDown={e => { e.preventDefault(); addTag(s); setShowSug(false); }}
              className="w-full px-3 py-2 text-sm text-left text-[var(--ds-text-primary)] hover:bg-[var(--ds-bg-subtle)] transition-colors"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Helper / error */}
      {(subText || (max !== undefined)) && (
        <div className="flex items-center justify-between">
          {subText && (
            <p className={['text-xs', hasError ? 'text-[var(--ds-danger-text)]' : 'text-[var(--ds-text-muted)]'].join(' ')}>
              {subText}
            </p>
          )}
          {max !== undefined && (
            <p className="text-xs text-[var(--ds-text-muted)] ml-auto tabular-nums">
              {tags.length}/{max}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
