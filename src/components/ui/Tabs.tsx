import React, { useState, useRef, useId } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

export type TabsVariant = 'line' | 'pill' | 'boxed';
export type TabsSize    = 'sm' | 'md' | 'lg';

export interface Tab {
  key:       string;
  label:     React.ReactNode;
  icon?:     React.ReactNode;
  disabled?: boolean;
  /** Any node — badge, count bubble, etc. */
  badge?:    React.ReactNode;
}

export interface TabsProps {
  tabs:          Tab[];
  value?:        string;
  defaultValue?: string;
  onChange?:     (key: string) => void;
  variant?:      TabsVariant;
  size?:         TabsSize;
  /** Full-width: each tab expands equally */
  fullWidth?:    boolean;
  className?:    string;
  id?:           string;
}

// ─── Size maps ────────────────────────────────────────────────────────────────

const TAB_SIZE: Record<TabsSize, string> = {
  sm: 'px-3 py-1.5 text-xs gap-1.5',
  md: 'px-4 py-2   text-sm gap-2',
  lg: 'px-5 py-2.5 text-sm gap-2',
};

// ─── Variant maps ─────────────────────────────────────────────────────────────

const LIST_VARIANT: Record<TabsVariant, string> = {
  line:  'border-b border-[var(--ds-border-base)] gap-0',
  pill:  'bg-[var(--ds-bg-subtle)] rounded-lg p-1 gap-1',
  boxed: 'border border-[var(--ds-border-base)] rounded-lg p-1 gap-1',
};

function tabClasses(variant: TabsVariant, active: boolean, disabled: boolean): string {
  const base = 'inline-flex items-center font-medium whitespace-nowrap select-none transition-colors outline-none';
  const focus = 'focus-visible:ring-2 focus-visible:ring-[var(--ds-brand-500)] focus-visible:ring-offset-1 focus-visible:rounded';
  const dis   = disabled ? 'opacity-40 cursor-not-allowed pointer-events-none' : 'cursor-pointer';

  if (variant === 'line') {
    return [
      base, focus, dis,
      'border-b-2 -mb-px',
      active
        ? 'border-[var(--ds-brand-600)] text-[var(--ds-brand-600)]'
        : 'border-transparent text-[var(--ds-text-muted)] hover:text-[var(--ds-text-primary)] hover:border-[var(--ds-border-strong)]',
    ].join(' ');
  }
  if (variant === 'pill') {
    return [
      base, focus, dis, 'rounded-md',
      active
        ? 'bg-[var(--ds-bg-surface)] text-[var(--ds-text-primary)] shadow-sm'
        : 'text-[var(--ds-text-muted)] hover:text-[var(--ds-text-primary)]',
    ].join(' ');
  }
  // boxed
  return [
    base, focus, dis, 'rounded-md',
    active
      ? 'bg-[var(--ds-brand-100)] text-[var(--ds-brand-700)]'
      : 'text-[var(--ds-text-secondary)] hover:text-[var(--ds-text-primary)] hover:bg-[var(--ds-bg-subtle)]',
  ].join(' ');
}

// ─── Component ────────────────────────────────────────────────────────────────

export function Tabs({
  tabs,
  value: controlledValue,
  defaultValue,
  onChange,
  variant   = 'line',
  size      = 'md',
  fullWidth = false,
  className = '',
  id: idProp,
}: TabsProps) {
  const generatedId = useId();
  const id          = idProp ?? generatedId;

  const firstEnabled                 = tabs.find(t => !t.disabled)?.key ?? tabs[0]?.key ?? '';
  const [internalValue, setInternal] = useState(defaultValue ?? firstEnabled);
  const activeKey = controlledValue !== undefined ? controlledValue : internalValue;

  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  function activate(key: string) {
    if (controlledValue === undefined) setInternal(key);
    onChange?.(key);
  }

  function handleKeyDown(e: React.KeyboardEvent, index: number) {
    const enabledIndices = tabs
      .map((t, i) => (!t.disabled ? i : null))
      .filter((i): i is number => i !== null);
    const pos    = enabledIndices.indexOf(index);
    let   target = -1;

    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      target = enabledIndices[(pos + 1) % enabledIndices.length];
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      target = enabledIndices[(pos - 1 + enabledIndices.length) % enabledIndices.length];
    } else if (e.key === 'Home') {
      e.preventDefault();
      target = enabledIndices[0];
    } else if (e.key === 'End') {
      e.preventDefault();
      target = enabledIndices[enabledIndices.length - 1];
    }

    if (target !== -1) {
      tabRefs.current[target]?.focus();
      activate(tabs[target].key);
    }
  }

  return (
    <div className={['flex flex-col', className].filter(Boolean).join(' ')}>
      {/* Tab list */}
      <div
        role="tablist"
        className={[
          'flex',
          fullWidth ? 'w-full' : 'w-fit',
          LIST_VARIANT[variant],
        ].join(' ')}
      >
        {tabs.map((tab, i) => {
          const active = tab.key === activeKey;
          return (
            <button
              key={tab.key}
              ref={el => { tabRefs.current[i] = el; }}
              id={`${id}-tab-${tab.key}`}
              type="button"
              role="tab"
              aria-selected={active}
              aria-controls={`${id}-panel-${tab.key}`}
              tabIndex={active ? 0 : -1}
              disabled={tab.disabled}
              className={[
                tabClasses(variant, active, tab.disabled ?? false),
                TAB_SIZE[size],
                fullWidth ? 'flex-1 justify-center' : '',
              ].filter(Boolean).join(' ')}
              onClick={() => !tab.disabled && activate(tab.key)}
              onKeyDown={e => handleKeyDown(e, i)}
            >
              {tab.icon && (
                <span className="shrink-0 flex items-center" aria-hidden="true">
                  {tab.icon}
                </span>
              )}
              <span>{tab.label}</span>
              {tab.badge && (
                <span aria-hidden="true">{tab.badge}</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Panel slot — consumers render panels conditionally.
          Helper ids: ${id}-panel-${tab.key}, aria-labelledby: ${id}-tab-${tab.key} */}
    </div>
  );
}

// ─── TabPanel helper ──────────────────────────────────────────────────────────
// Wrap panel content in this for correct ARIA. Hidden panels stay in DOM but invisible.

export interface TabPanelProps {
  tabsId:   string;
  tabKey:   string;
  activeKey: string;
  children: React.ReactNode;
  className?: string;
}

export function TabPanel({ tabsId, tabKey, activeKey, children, className = '' }: TabPanelProps) {
  return (
    <div
      id={`${tabsId}-panel-${tabKey}`}
      role="tabpanel"
      aria-labelledby={`${tabsId}-tab-${tabKey}`}
      hidden={tabKey !== activeKey}
      className={className}
    >
      {children}
    </div>
  );
}
