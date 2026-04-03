import React, { useId, useState, useRef, useEffect, useMemo } from 'react';
import { CheckIcon, CaretDownIcon, MagnifyingGlassIcon } from '@phosphor-icons/react';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface SelectOption {
  value:     string;
  label:     string;
  disabled?: boolean;
  /** Renders a group header above the first option with this group name */
  group?:    string;
}

export type SelectSize   = 'sm' | 'md' | 'lg';
export type SelectStatus = 'default' | 'error' | 'success';

export interface SelectProps {
  options:        SelectOption[];
  /** Controlled value */
  value?:         string;
  /** Uncontrolled default value */
  defaultValue?:  string;
  onChange?:      (value: string) => void;
  placeholder?:   string;
  label?:         string;
  helperText?:    string;
  /** Sets status to 'error' and shows this message below the trigger */
  errorMessage?:  string;
  status?:        SelectStatus;
  size?:          SelectSize;
  disabled?:      boolean;
  fullWidth?:     boolean;
  /** Renders a search input at the top of the dropdown */
  searchable?:    boolean;
  className?:     string;
  id?:            string;
}

// ─── Size maps (8pt grid — mirrors Input sizing) ──────────────────────────────

const TRIGGER_SIZE: Record<SelectSize, string> = {
  sm: 'h-8  px-3 text-xs  rounded-md',
  md: 'h-10 px-3 text-sm  rounded-lg',
  lg: 'h-11 px-4 text-sm  rounded-lg',
};

const LABEL_SIZE: Record<SelectSize, string> = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-sm',
};

const OPTION_SIZE: Record<SelectSize, string> = {
  sm: 'py-1.5 px-3 text-xs',
  md: 'py-2   px-3 text-sm',
  lg: 'py-2.5 px-4 text-sm',
};

const CHEVRON_SIZE: Record<SelectSize, number> = { sm: 14, md: 16, lg: 16 };
const CHECK_SIZE:   Record<SelectSize, number> = { sm: 12, md: 14, lg: 14 };

// ─── Status maps ──────────────────────────────────────────────────────────────

const STATUS_TRIGGER: Record<SelectStatus, string> = {
  default: 'border-[var(--ds-border-strong)] hover:border-[var(--ds-brand-600)]',
  error:   'border-[var(--ds-danger-border)] hover:border-[var(--ds-danger-icon)]',
  success: 'border-[var(--ds-success-border)] hover:border-[var(--ds-success-icon)]',
};

const STATUS_TRIGGER_OPEN: Record<SelectStatus, string> = {
  default: 'border-[var(--ds-brand-600)] ring-2 ring-[var(--ds-brand-500)] ring-offset-0',
  error:   'border-[var(--ds-danger-icon)] ring-2 ring-[var(--ds-danger-icon)] ring-offset-0',
  success: 'border-[var(--ds-success-icon)] ring-2 ring-[var(--ds-success-icon)] ring-offset-0',
};

const STATUS_HELPER: Record<SelectStatus, string> = {
  default: 'text-[var(--ds-text-muted)]',
  error:   'text-[var(--ds-danger-text)]',
  success: 'text-[var(--ds-success-text)]',
};

// ─── Component ────────────────────────────────────────────────────────────────

export function Select({
  options,
  value: controlledValue,
  defaultValue  = '',
  onChange,
  placeholder   = 'Select an option',
  label,
  helperText,
  errorMessage,
  status: statusProp,
  size          = 'md',
  disabled      = false,
  fullWidth     = false,
  searchable    = false,
  className     = '',
  id: idProp,
}: SelectProps) {
  const generatedId = useId();
  const id          = idProp ?? generatedId;
  const listboxId   = `${id}-listbox`;

  const status: SelectStatus = errorMessage ? 'error' : (statusProp ?? 'default');
  const subText = errorMessage ?? helperText;

  // ── State ──────────────────────────────────────────────────────────────────
  const [isOpen, setIsOpen]                   = useState(false);
  const [internalValue, setInternalValue]     = useState(defaultValue);
  const [searchQuery, setSearchQuery]         = useState('');
  const [highlightedIdx, setHighlightedIdx]   = useState(-1);

  const selectedValue = controlledValue !== undefined ? controlledValue : internalValue;

  // ── Refs ───────────────────────────────────────────────────────────────────
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef   = useRef<HTMLButtonElement>(null);
  const searchRef    = useRef<HTMLInputElement>(null);
  const optionRefs   = useRef<(HTMLLIElement | null)[]>([]);

  // ── Filtered options ───────────────────────────────────────────────────────
  const filteredOptions = useMemo(() => {
    if (!searchable || !searchQuery.trim()) return options;
    const q = searchQuery.toLowerCase();
    return options.filter(opt => opt.label.toLowerCase().includes(q));
  }, [options, searchable, searchQuery]);

  const selectedOption = options.find(opt => opt.value === selectedValue);

  // ── Helpers ────────────────────────────────────────────────────────────────
  function findFirst(opts: SelectOption[]): number {
    return opts.findIndex(o => !o.disabled);
  }
  function findLast(opts: SelectOption[]): number {
    for (let i = opts.length - 1; i >= 0; i--) {
      if (!opts[i].disabled) return i;
    }
    return -1;
  }
  function moveHighlight(dir: 1 | -1) {
    setHighlightedIdx(prev => {
      let next = prev + dir;
      while (next >= 0 && next < filteredOptions.length) {
        if (!filteredOptions[next].disabled) return next;
        next += dir;
      }
      return prev;
    });
  }

  function openDropdown() {
    if (disabled) return;
    setIsOpen(true);
    setSearchQuery('');
    // Highlight selected option, otherwise first enabled
    const selIdx   = options.findIndex(o => o.value === selectedValue && !o.disabled);
    const firstIdx = findFirst(options);
    setHighlightedIdx(selIdx >= 0 ? selIdx : firstIdx);
  }
  function closeDropdown() {
    setIsOpen(false);
    setSearchQuery('');
    setHighlightedIdx(-1);
    triggerRef.current?.focus();
  }
  function selectOption(opt: SelectOption) {
    if (opt.disabled) return;
    if (controlledValue === undefined) setInternalValue(opt.value);
    onChange?.(opt.value);
    closeDropdown();
  }

  // ── Side-effects ───────────────────────────────────────────────────────────

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;
    function handleMouseDown(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setSearchQuery('');
        setHighlightedIdx(-1);
      }
    }
    document.addEventListener('mousedown', handleMouseDown);
    return () => document.removeEventListener('mousedown', handleMouseDown);
  }, [isOpen]);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchable && searchRef.current) {
      searchRef.current.focus();
    }
  }, [isOpen, searchable]);

  // Scroll highlighted option into view
  useEffect(() => {
    if (highlightedIdx >= 0 && optionRefs.current[highlightedIdx]) {
      optionRefs.current[highlightedIdx]?.scrollIntoView({ block: 'nearest' });
    }
  }, [highlightedIdx]);

  // ── Keyboard: trigger (non-searchable keeps focus on trigger when open) ────
  function handleTriggerKeyDown(e: React.KeyboardEvent<HTMLButtonElement>) {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        if (!isOpen) openDropdown(); else moveHighlight(1);
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (!isOpen) openDropdown(); else moveHighlight(-1);
        break;
      case ' ':
      case 'Enter':
        e.preventDefault();
        if (!isOpen) {
          openDropdown();
        } else if (highlightedIdx >= 0 && filteredOptions[highlightedIdx]) {
          selectOption(filteredOptions[highlightedIdx]);
        }
        break;
      case 'Escape':
        if (isOpen) closeDropdown();
        break;
      case 'Home':
        if (isOpen) { e.preventDefault(); setHighlightedIdx(findFirst(filteredOptions)); }
        break;
      case 'End':
        if (isOpen) { e.preventDefault(); setHighlightedIdx(findLast(filteredOptions)); }
        break;
      case 'Tab':
        if (isOpen) { setIsOpen(false); setSearchQuery(''); setHighlightedIdx(-1); }
        break;
    }
  }

  // ── Keyboard: search input ─────────────────────────────────────────────────
  function handleSearchKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        moveHighlight(1);
        break;
      case 'ArrowUp':
        e.preventDefault();
        moveHighlight(-1);
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedIdx >= 0 && filteredOptions[highlightedIdx]) {
          selectOption(filteredOptions[highlightedIdx]);
        }
        break;
      case 'Escape':
        closeDropdown();
        break;
      case 'Home':
        e.preventDefault();
        setHighlightedIdx(findFirst(filteredOptions));
        break;
      case 'End':
        e.preventDefault();
        setHighlightedIdx(findLast(filteredOptions));
        break;
      case 'Tab':
        setIsOpen(false); setSearchQuery(''); setHighlightedIdx(-1);
        break;
    }
  }

  // ── Grouped option rendering ───────────────────────────────────────────────
  const hasGroups = filteredOptions.some(o => o.group);

  const renderedOptions = (() => {
    if (!hasGroups) {
      return filteredOptions.map((opt, index) => (
        <OptionItem
          key={opt.value}
          opt={opt}
          id={`${id}-option-${index}`}
          isSelected={opt.value === selectedValue}
          isHighlighted={highlightedIdx === index}
          size={size}
          checkSize={CHECK_SIZE[size]}
          onSelect={() => selectOption(opt)}
          onMouseEnter={() => !opt.disabled && setHighlightedIdx(index)}
          ref={el => { optionRefs.current[index] = el; }}
        />
      ));
    }

    // Build flat list with group header separators
    const items: React.ReactNode[] = [];
    let lastGroup: string | undefined;
    filteredOptions.forEach((opt, index) => {
      if (opt.group !== lastGroup) {
        if (opt.group) {
          items.push(
            <li
              key={`group:${opt.group}`}
              role="presentation"
              className="px-3 pt-3 pb-1 text-xs font-semibold uppercase tracking-wide text-[var(--ds-text-muted)] select-none"
            >
              {opt.group}
            </li>
          );
        }
        lastGroup = opt.group;
      }
      items.push(
        <OptionItem
          key={opt.value}
          opt={opt}
          id={`${id}-option-${index}`}
          isSelected={opt.value === selectedValue}
          isHighlighted={highlightedIdx === index}
          size={size}
          checkSize={CHECK_SIZE[size]}
          onSelect={() => selectOption(opt)}
          onMouseEnter={() => !opt.disabled && setHighlightedIdx(index)}
          ref={el => { optionRefs.current[index] = el; }}
        />
      );
    });
    return items;
  })();

  // ── Trigger classes ────────────────────────────────────────────────────────
  const triggerClasses = [
    'w-full flex items-center justify-between gap-2 text-left',
    'border outline-none transition-colors cursor-pointer select-none',
    'bg-[var(--ds-bg-surface)] text-[var(--ds-text-primary)]',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    TRIGGER_SIZE[size],
    isOpen ? STATUS_TRIGGER_OPEN[status] : STATUS_TRIGGER[status],
    className,
  ].filter(Boolean).join(' ');

  const activeDescendant = isOpen && highlightedIdx >= 0
    ? `${id}-option-${highlightedIdx}`
    : undefined;

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className={fullWidth ? 'w-full flex flex-col' : 'inline-flex flex-col'}>

      {/* Label */}
      {label && (
        <label
          id={`${id}-label`}
          htmlFor={id}
          className={[
            'mb-1.5 font-medium text-[var(--ds-text-primary)]',
            LABEL_SIZE[size],
          ].join(' ')}
        >
          {label}
        </label>
      )}

      {/* Trigger + dropdown wrapper */}
      <div ref={containerRef} className="relative">

        {/* Trigger */}
        <button
          ref={triggerRef}
          id={id}
          type="button"
          role="combobox"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-controls={listboxId}
          aria-labelledby={label ? `${id}-label` : undefined}
          aria-activedescendant={activeDescendant}
          disabled={disabled}
          className={triggerClasses}
          onClick={() => (isOpen ? closeDropdown() : openDropdown())}
          onKeyDown={handleTriggerKeyDown}
        >
          <span className={[
            'truncate',
            selectedOption ? 'text-[var(--ds-text-primary)]' : 'text-[var(--ds-text-muted)]',
          ].join(' ')}>
            {selectedOption?.label ?? placeholder}
          </span>
          <CaretDownIcon
            size={CHEVRON_SIZE[size]}
            className={[
              'shrink-0 text-[var(--ds-text-muted)]',
              'transition-transform duration-[var(--ds-duration-fast)]',
              isOpen ? 'rotate-180' : '',
            ].filter(Boolean).join(' ')}
            aria-hidden="true"
          />
        </button>

        {/* Dropdown panel */}
        {isOpen && (
          <div className={[
            'absolute top-full mt-1 left-0 min-w-full',
            'z-[var(--ds-z-dropdown)]',
            'bg-[var(--ds-bg-raised)] border border-[var(--ds-border-base)]',
            'rounded-lg shadow-lg overflow-hidden',
          ].join(' ')}>

            {/* Search */}
            {searchable && (
              <div className="p-2 border-b border-[var(--ds-border-base)] sticky top-0 bg-[var(--ds-bg-raised)]">
                <div className="relative flex items-center">
                  <MagnifyingGlassIcon
                    size={14}
                    className="absolute left-2.5 text-[var(--ds-text-muted)] pointer-events-none"
                    aria-hidden="true"
                  />
                  <input
                    ref={searchRef}
                    type="text"
                    value={searchQuery}
                    onChange={e => {
                      setSearchQuery(e.target.value);
                      setHighlightedIdx(0);
                    }}
                    onKeyDown={handleSearchKeyDown}
                    placeholder="Search..."
                    className={[
                      'w-full pl-8 pr-3 py-1.5 text-xs rounded-md outline-none',
                      'bg-[var(--ds-bg-subtle)] text-[var(--ds-text-primary)]',
                      'placeholder:text-[var(--ds-text-muted)]',
                      'border border-[var(--ds-border-base)]',
                      'focus:border-[var(--ds-brand-600)]',
                      'focus:ring-1 focus:ring-[var(--ds-brand-500)]',
                      'transition-colors',
                    ].join(' ')}
                  />
                </div>
              </div>
            )}

            {/* Options list */}
            <ul
              id={listboxId}
              role="listbox"
              aria-label={label ?? 'Options'}
              className="max-h-60 overflow-y-auto py-1"
              tabIndex={-1}
            >
              {filteredOptions.length === 0 ? (
                <li className="py-6 px-3 text-sm text-[var(--ds-text-muted)] text-center select-none">
                  No options found
                </li>
              ) : (
                renderedOptions
              )}
            </ul>
          </div>
        )}
      </div>

      {/* Helper / Error */}
      {subText && (
        <p className={['mt-1.5 text-xs', STATUS_HELPER[status]].join(' ')}>
          {subText}
        </p>
      )}
    </div>
  );
}

// ─── Option item ──────────────────────────────────────────────────────────────

interface OptionItemProps {
  opt:           SelectOption;
  id:            string;
  isSelected:    boolean;
  isHighlighted: boolean;
  size:          SelectSize;
  checkSize:     number;
  onSelect:      () => void;
  onMouseEnter:  () => void;
}

const OptionItem = React.forwardRef<HTMLLIElement, OptionItemProps>(
  function OptionItem(
    { opt, id, isSelected, isHighlighted, size, checkSize, onSelect, onMouseEnter },
    ref
  ) {
    return (
      <li
        ref={ref}
        id={id}
        role="option"
        aria-selected={isSelected}
        aria-disabled={opt.disabled}
        onClick={opt.disabled ? undefined : onSelect}
        onMouseEnter={onMouseEnter}
        className={[
          'flex items-center justify-between gap-2 cursor-pointer',
          'transition-colors duration-[var(--ds-duration-instant)]',
          OPTION_SIZE[size],
          opt.disabled
            ? 'opacity-40 cursor-not-allowed text-[var(--ds-text-primary)]'
            : isHighlighted
              ? 'bg-[var(--ds-bg-subtle)] text-[var(--ds-text-primary)]'
              : 'text-[var(--ds-text-primary)]',
          isSelected && !opt.disabled ? 'font-medium' : '',
        ].filter(Boolean).join(' ')}
      >
        <span className="truncate">{opt.label}</span>
        {isSelected && (
          <CheckIcon
            size={checkSize}
            weight="bold"
            className="shrink-0 text-[var(--ds-brand-600)]"
            aria-hidden="true"
          />
        )}
      </li>
    );
  }
);
