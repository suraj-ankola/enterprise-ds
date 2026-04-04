'use client';

import React, { useId, useRef, useState } from 'react';
import { MagnifyingGlassIcon, FunnelIcon, XIcon, CaretDownIcon, CheckIcon } from '@phosphor-icons/react';
import { Badge } from './Badge';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface FilterOption {
  value:    string;
  label:    string;
  count?:   number;
  /** Coloured dot next to the label */
  color?:   string;
}

export interface FilterGroup {
  key:       string;
  label:     string;
  /** Default: 'multi' */
  type?:     'multi' | 'single';
  options:   FilterOption[];
}

export type FilterValue = Record<string, string[]>;

export interface FilterBarProps {
  /** Filter group definitions */
  groups:         FilterGroup[];
  /** Current filter state — { groupKey: string[] } */
  value:          FilterValue;
  onChange:       (value: FilterValue) => void;
  /** Search query */
  search?:        string;
  onSearchChange?: (q: string) => void;
  searchPlaceholder?: string;
  /** Extra action slot (e.g. Sort button, View toggle) */
  actions?:       React.ReactNode;
  /** Show total active filter count badge on the funnel icon */
  showCount?:     boolean;
  className?:     string;
}

// ─── FilterDropdown ───────────────────────────────────────────────────────────

interface FilterDropdownProps {
  group:     FilterGroup;
  selected:  string[];
  onChange:  (key: string, next: string[]) => void;
}

function FilterDropdown({ group, selected, onChange }: FilterDropdownProps) {
  const [open, setOpen] = useState(false);
  const buttonRef       = useRef<HTMLButtonElement>(null);
  const menuRef         = useRef<HTMLDivElement>(null);
  const menuId          = useId();

  // Close on outside click
  React.useEffect(() => {
    if (!open) return;
    function onMouseDown(e: MouseEvent) {
      const target = e.target as Node;
      if (
        menuRef.current && !menuRef.current.contains(target) &&
        buttonRef.current && !buttonRef.current.contains(target)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', onMouseDown);
    return () => document.removeEventListener('mousedown', onMouseDown);
  }, [open]);

  // Keyboard: ESC
  React.useEffect(() => {
    if (!open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') { setOpen(false); buttonRef.current?.focus(); }
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);

  function toggle(val: string) {
    if (group.type === 'single') {
      onChange(group.key, selected[0] === val ? [] : [val]);
      setOpen(false);
      return;
    }
    onChange(group.key, selected.includes(val)
      ? selected.filter(v => v !== val)
      : [...selected, val],
    );
  }

  const activeCount = selected.length;

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen(v => !v)}
        className={[
          'inline-flex items-center gap-1.5 h-8 px-3 text-sm rounded-lg border transition-colors duration-[var(--ds-duration-base)]',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ds-brand-500)]',
          activeCount > 0
            ? 'border-[var(--ds-brand-400)] bg-[var(--ds-brand-100)] text-[var(--ds-brand-700)]'
            : 'border-[var(--ds-border-base)] bg-[var(--ds-bg-surface)] text-[var(--ds-text-secondary)] hover:bg-[var(--ds-bg-subtle)] hover:border-[var(--ds-border-strong)]',
        ].join(' ')}
      >
        <span className="font-medium">{group.label}</span>
        {activeCount > 0 && (
          <Badge variant="brand" size="sm" appearance="solid">{activeCount}</Badge>
        )}
        <CaretDownIcon
          size={12}
          weight="bold"
          className={['transition-transform duration-[var(--ds-duration-fast)]', open ? 'rotate-180' : ''].join(' ')}
          aria-hidden="true"
        />
      </button>

      {open && (
        <div
          id={menuId}
          ref={menuRef}
          role="listbox"
          aria-multiselectable={group.type !== 'single'}
          aria-label={group.label}
          className={[
            'absolute left-0 top-full mt-1.5 z-[var(--ds-z-dropdown)]',
            'min-w-[180px] max-h-64 overflow-y-auto',
            'bg-[var(--ds-bg-raised)] border border-[var(--ds-border-base)] rounded-xl shadow-lg',
            'py-1',
          ].join(' ')}
        >
          {group.options.map(opt => {
            const isSelected = selected.includes(opt.value);
            return (
              <button
                key={opt.value}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => toggle(opt.value)}
                className={[
                  'w-full flex items-center justify-between gap-3 px-3 py-2 text-sm text-left',
                  'hover:bg-[var(--ds-bg-subtle)] transition-colors',
                  isSelected ? 'text-[var(--ds-text-primary)]' : 'text-[var(--ds-text-secondary)]',
                ].join(' ')}
              >
                <span className="flex items-center gap-2 min-w-0">
                  {opt.color && (
                    <span
                      className="h-2 w-2 rounded-full shrink-0"
                      style={{ backgroundColor: opt.color }}
                      aria-hidden="true"
                    />
                  )}
                  <span className="truncate">{opt.label}</span>
                  {opt.count !== undefined && (
                    <span className="text-xs text-[var(--ds-text-muted)]">{opt.count}</span>
                  )}
                </span>
                {isSelected && (
                  <CheckIcon size={13} weight="bold" className="shrink-0 text-[var(--ds-brand-600)]" aria-hidden="true" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─── FilterBar ────────────────────────────────────────────────────────────────

export function FilterBar({
  groups,
  value,
  onChange,
  search,
  onSearchChange,
  searchPlaceholder = 'Search…',
  actions,
  showCount = true,
  className = '',
}: FilterBarProps) {
  const totalActive = Object.values(value).reduce((sum, v) => sum + v.length, 0);

  function handleGroupChange(key: string, next: string[]) {
    onChange({ ...value, [key]: next });
  }

  function clearAll() {
    const cleared: FilterValue = {};
    groups.forEach(g => { cleared[g.key] = []; });
    onChange(cleared);
    onSearchChange?.('');
  }

  const isDirty = totalActive > 0 || (search ?? '').length > 0;

  return (
    <div
      className={[
        'flex flex-wrap items-center gap-2',
        className,
      ].join(' ')}
      role="search"
      aria-label="Filters"
    >
      {/* Search input */}
      {onSearchChange !== undefined && (
        <div className="relative flex-1 min-w-[160px] max-w-xs">
          <MagnifyingGlassIcon
            size={14}
            className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[var(--ds-text-muted)] pointer-events-none"
            aria-hidden="true"
          />
          <input
            type="search"
            value={search ?? ''}
            onChange={e => onSearchChange(e.target.value)}
            placeholder={searchPlaceholder}
            className={[
              'w-full h-8 pl-8 pr-3 text-sm rounded-lg border bg-[var(--ds-bg-surface)]',
              'text-[var(--ds-text-primary)] placeholder:text-[var(--ds-text-muted)]',
              'border-[var(--ds-border-base)] hover:border-[var(--ds-border-strong)]',
              'focus:outline-none focus:ring-2 focus:ring-[var(--ds-brand-500)] focus:border-transparent',
              'transition-all duration-[var(--ds-duration-base)]',
            ].join(' ')}
          />
        </div>
      )}

      {/* Funnel icon + active count */}
      {showCount && (
        <span className="flex items-center gap-1 text-[var(--ds-text-muted)] shrink-0">
          <FunnelIcon size={14} aria-hidden="true" />
          {totalActive > 0 && (
            <Badge variant="brand" size="sm" appearance="solid">
              {totalActive}
            </Badge>
          )}
        </span>
      )}

      {/* Filter dropdowns */}
      {groups.map(group => (
        <FilterDropdown
          key={group.key}
          group={group}
          selected={value[group.key] ?? []}
          onChange={handleGroupChange}
        />
      ))}

      {/* Active filter chips */}
      {groups.flatMap(group =>
        (value[group.key] ?? []).map(val => {
          const opt = group.options.find(o => o.value === val);
          if (!opt) return null;
          return (
            <span
              key={`${group.key}:${val}`}
              className="inline-flex items-center gap-1 h-7 pl-2.5 pr-1.5 text-xs rounded-full border border-[var(--ds-brand-400)] bg-[var(--ds-brand-100)] text-[var(--ds-brand-700)]"
            >
              <span className="font-medium">{group.label}:</span>
              <span>{opt.label}</span>
              <button
                type="button"
                onClick={() => handleGroupChange(group.key, (value[group.key] ?? []).filter(v => v !== val))}
                className="ml-0.5 rounded-full p-0.5 hover:bg-[var(--ds-brand-200)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ds-brand-500)]"
                aria-label={`Remove ${opt.label} filter`}
              >
                <XIcon size={10} weight="bold" aria-hidden="true" />
              </button>
            </span>
          );
        }).filter(Boolean)
      )}

      {/* Clear all */}
      {isDirty && (
        <button
          type="button"
          onClick={clearAll}
          className="inline-flex items-center gap-1 h-7 px-2.5 text-xs text-[var(--ds-text-muted)] hover:text-[var(--ds-text-primary)] hover:bg-[var(--ds-bg-subtle)] rounded-lg border border-transparent hover:border-[var(--ds-border-base)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ds-brand-500)]"
        >
          <XIcon size={10} weight="bold" aria-hidden="true" />
          Clear all
        </button>
      )}

      {/* Extra actions slot */}
      {actions && (
        <div className="ml-auto flex items-center gap-2">
          {actions}
        </div>
      )}
    </div>
  );
}
