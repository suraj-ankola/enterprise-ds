import React, { useEffect, useRef, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { MagnifyingGlassIcon } from '@phosphor-icons/react';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface CommandItem {
  key:       string;
  label:     string;
  /** Secondary text */
  detail?:   string;
  /** Left icon */
  icon?:     React.ReactNode;
  /** Keyboard shortcut hint */
  shortcut?: string[];
  /** Group label — items with same group are visually grouped */
  group?:    string;
  onSelect:  () => void;
  disabled?: boolean;
}

export interface CommandPaletteProps {
  open:          boolean;
  onClose:       () => void;
  items:         CommandItem[];
  placeholder?:  string;
  /** Render custom empty state */
  emptyState?:   React.ReactNode;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function normalize(s: string) { return s.toLowerCase().replace(/\s+/g, ' ').trim(); }

function matches(item: CommandItem, q: string) {
  if (!q) return true;
  const n = normalize(q);
  return normalize(item.label).includes(n) || normalize(item.detail ?? '').includes(n);
}

// Groups items preserving original order, returns flat list with group dividers
function groupItems(items: CommandItem[]): Array<CommandItem | { _divider: string }> {
  const seen = new Set<string>();
  const out: Array<CommandItem | { _divider: string }> = [];
  for (const item of items) {
    const g = item.group ?? '';
    if (g && !seen.has(g)) {
      seen.add(g);
      out.push({ _divider: g });
    }
    out.push(item);
  }
  return out;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function CommandPalette({
  open,
  onClose,
  items,
  placeholder  = 'Search commands…',
  emptyState,
}: CommandPaletteProps) {
  const [mounted, setMounted]     = useState(false);
  const [query,   setQuery]       = useState('');
  const [hlIdx,   setHlIdx]       = useState(0);
  const inputRef                  = useRef<HTMLInputElement>(null);
  const listRef                   = useRef<HTMLDivElement>(null);

  useEffect(() => { setMounted(true); }, []);

  // Reset on open
  useEffect(() => {
    if (open) {
      setQuery('');
      setHlIdx(0);
      setTimeout(() => inputRef.current?.focus(), 10);
    }
  }, [open]);

  // ESC to close
  useEffect(() => {
    if (!open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') { e.stopPropagation(); onClose(); }
    }
    document.addEventListener('keydown', onKeyDown, true);
    return () => document.removeEventListener('keydown', onKeyDown, true);
  }, [open, onClose]);

  const filtered = items.filter(item => !item.disabled && matches(item, query));

  const activate = useCallback((item: CommandItem) => {
    item.onSelect();
    onClose();
  }, [onClose]);

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHlIdx(i => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHlIdx(i => Math.max(i - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const item = filtered[hlIdx];
      if (item) activate(item);
    }
  }

  // Scroll highlighted item into view
  useEffect(() => {
    const el = listRef.current?.querySelector(`[data-idx="${hlIdx}"]`);
    el?.scrollIntoView({ block: 'nearest' });
  }, [hlIdx]);

  if (!mounted || !open) return null;

  const grouped = groupItems(filtered);

  return createPortal(
    <div
      className="fixed inset-0 z-[var(--ds-z-tooltip)] flex items-start justify-center pt-[15vh] px-4"
      aria-modal="true"
      role="dialog"
      aria-label="Command palette"
    >
      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={onClose}
        className="absolute inset-0 bg-[var(--ds-bg-overlay)]"
      />

      {/* Panel */}
      <div
        className="relative z-10 w-full max-w-xl bg-[var(--ds-bg-raised)] rounded-xl shadow-2xl border border-[var(--ds-border-base)] overflow-hidden flex flex-col"
        onKeyDown={handleKeyDown}
      >
        {/* Search input */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-[var(--ds-border-base)]">
          <MagnifyingGlassIcon size={18} className="shrink-0 text-[var(--ds-text-muted)]" aria-hidden="true" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => { setQuery(e.target.value); setHlIdx(0); }}
            placeholder={placeholder}
            className="flex-1 bg-transparent text-sm text-[var(--ds-text-primary)] placeholder:text-[var(--ds-text-muted)] outline-none"
            aria-autocomplete="list"
            aria-controls="cmd-list"
            aria-activedescendant={filtered[hlIdx] ? `cmd-item-${hlIdx}` : undefined}
            role="combobox"
            aria-expanded={true}
          />
          <kbd className="hidden sm:inline-flex items-center gap-0.5 text-[10px] text-[var(--ds-text-muted)] bg-[var(--ds-bg-subtle)] border border-[var(--ds-border-base)] rounded px-1.5 py-0.5 font-mono">
            esc
          </kbd>
        </div>

        {/* Results list */}
        <div
          id="cmd-list"
          ref={listRef}
          role="listbox"
          className="flex-1 overflow-y-auto max-h-80 py-1"
        >
          {filtered.length === 0 ? (
            <div className="py-10 text-center">
              {emptyState ?? (
                <p className="text-sm text-[var(--ds-text-muted)]">No results for "{query}"</p>
              )}
            </div>
          ) : (
            grouped.map((row, i) => {
              if ('_divider' in row) {
                return (
                  <p key={`div-${row._divider}`}
                    className="px-4 pt-3 pb-1 text-[10px] font-semibold uppercase tracking-wider text-[var(--ds-text-muted)] select-none"
                    aria-hidden="true"
                  >
                    {row._divider}
                  </p>
                );
              }

              const item = row as CommandItem;
              const itemIdx = filtered.indexOf(item);
              const isHl = itemIdx === hlIdx;

              return (
                <button
                  key={item.key}
                  id={`cmd-item-${itemIdx}`}
                  data-idx={itemIdx}
                  type="button"
                  role="option"
                  aria-selected={isHl}
                  onClick={() => activate(item)}
                  onMouseEnter={() => setHlIdx(itemIdx)}
                  className={[
                    'w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors',
                    isHl
                      ? 'bg-[var(--ds-brand-100)] text-[var(--ds-brand-700)]'
                      : 'text-[var(--ds-text-primary)] hover:bg-[var(--ds-bg-subtle)]',
                  ].join(' ')}
                >
                  {item.icon && (
                    <span className={['shrink-0 flex items-center', isHl ? 'text-[var(--ds-brand-600)]' : 'text-[var(--ds-text-muted)]'].join(' ')} aria-hidden="true">
                      {item.icon}
                    </span>
                  )}
                  <span className="flex-1 min-w-0">
                    <span className="block text-sm font-medium truncate">{item.label}</span>
                    {item.detail && (
                      <span className={['block text-xs truncate', isHl ? 'text-[var(--ds-brand-600)]' : 'text-[var(--ds-text-muted)]'].join(' ')}>
                        {item.detail}
                      </span>
                    )}
                  </span>
                  {item.shortcut && item.shortcut.length > 0 && (
                    <span className="shrink-0 flex items-center gap-0.5">
                      {item.shortcut.map((k, ki) => (
                        <kbd key={ki} className="text-[10px] text-[var(--ds-text-muted)] bg-[var(--ds-bg-subtle)] border border-[var(--ds-border-base)] rounded px-1.5 py-0.5 font-mono">
                          {k}
                        </kbd>
                      ))}
                    </span>
                  )}
                </button>
              );
            })
          )}
        </div>

        {/* Footer */}
        {filtered.length > 0 && (
          <div className="flex items-center gap-3 px-4 py-2 border-t border-[var(--ds-border-base)] text-[10px] text-[var(--ds-text-muted)]">
            <span><kbd className="font-mono">↑↓</kbd> navigate</span>
            <span><kbd className="font-mono">↵</kbd> select</span>
            <span><kbd className="font-mono">esc</kbd> close</span>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}
