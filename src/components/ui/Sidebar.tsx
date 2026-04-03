import React, { useState } from 'react';
import { CaretLeftIcon, CaretRightIcon } from '@phosphor-icons/react';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface NavItem {
  key:       string;
  label:     string;
  icon:      React.ReactNode;
  onClick?:  () => void;
  badge?:    React.ReactNode;
  active?:   boolean;
  disabled?: boolean;
}

export interface NavSection {
  key:    string;
  label?: string;
  items:  NavItem[];
}

export interface BrandConfig {
  icon:      React.ReactNode;
  name:      string;
  tagline?:  string;
}

export interface SidebarProps {
  brand:               BrandConfig;
  nav:                 NavSection[];
  footer?:             React.ReactNode;
  collapsed?:          boolean;
  defaultCollapsed?:   boolean;
  onCollapsedChange?:  (v: boolean) => void;
  className?:          string;
}

export interface AppShellProps {
  sidebar:    React.ReactNode;
  children:   React.ReactNode;
  className?: string;
}

// ─── AppShell ─────────────────────────────────────────────────────────────────

export function AppShell({ sidebar, children, className = '' }: AppShellProps) {
  return (
    <div className={['flex h-screen bg-[var(--ds-bg-base)] overflow-hidden', className].filter(Boolean).join(' ')}>
      {sidebar}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────

export function Sidebar({
  brand,
  nav,
  footer,
  collapsed: controlledCollapsed,
  defaultCollapsed  = false,
  onCollapsedChange,
  className         = '',
}: SidebarProps) {
  const [internal, setInternal] = useState(defaultCollapsed);
  const collapsed = controlledCollapsed !== undefined ? controlledCollapsed : internal;

  function toggleCollapsed() {
    const next = !collapsed;
    if (controlledCollapsed === undefined) setInternal(next);
    onCollapsedChange?.(next);
  }

  return (
    <aside
      className={[
        'relative flex flex-col shrink-0 h-full',
        'bg-[var(--ds-bg-surface)] border-r border-[var(--ds-border-base)]',
        'transition-[width] duration-[var(--ds-duration-slow)] ease-out overflow-hidden',
        collapsed ? 'w-14' : 'w-60',
        className,
      ].filter(Boolean).join(' ')}
      aria-label="Main navigation"
    >
      {/* Brand + collapse toggle */}
      <div className={[
        'flex items-center gap-3 h-14 shrink-0 px-3 border-b border-[var(--ds-border-base)]',
        collapsed ? 'justify-center' : '',
      ].join(' ')}>
        <span className="shrink-0 flex items-center">{brand.icon}</span>
        {!collapsed && (
          <>
            <div className="flex flex-col min-w-0 flex-1">
              <span className="font-semibold text-sm text-[var(--ds-text-primary)] truncate leading-tight">
                {brand.name}
              </span>
              {brand.tagline && (
                <span className="text-[10px] text-[var(--ds-text-muted)] truncate leading-tight">
                  {brand.tagline}
                </span>
              )}
            </div>
            <button
              type="button"
              onClick={toggleCollapsed}
              aria-label="Collapse sidebar"
              className={[
                'shrink-0 h-6 w-6 rounded-md flex items-center justify-center',
                'text-[var(--ds-text-muted)] hover:text-[var(--ds-text-primary)]',
                'hover:bg-[var(--ds-bg-subtle)] transition-colors',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ds-brand-500)]',
              ].join(' ')}
            >
              <CaretLeftIcon size={12} weight="bold" />
            </button>
          </>
        )}
        {collapsed && (
          <button
            type="button"
            onClick={toggleCollapsed}
            aria-label="Expand sidebar"
            className={[
              'shrink-0 h-6 w-6 rounded-md flex items-center justify-center',
              'text-[var(--ds-text-muted)] hover:text-[var(--ds-text-primary)]',
              'hover:bg-[var(--ds-bg-subtle)] transition-colors',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ds-brand-500)]',
            ].join(' ')}
          >
            <CaretRightIcon size={12} weight="bold" />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden py-3 px-2 flex flex-col gap-5">
        {nav.map(section => (
          <div key={section.key} className="flex flex-col gap-0.5">
            {section.label && !collapsed && (
              <p className="px-2 pb-1 text-[10px] font-semibold uppercase tracking-wider text-[var(--ds-text-muted)]">
                {section.label}
              </p>
            )}
            {collapsed && section.label && (
              <div className="my-1 border-t border-[var(--ds-border-base)]" />
            )}
            {section.items.map(item => (
              <NavItemRow key={item.key} item={item} collapsed={collapsed} />
            ))}
          </div>
        ))}
      </nav>

      {/* Footer slot */}
      {footer && (
        <div className={[
          'shrink-0 border-t border-[var(--ds-border-base)] p-2',
          collapsed ? 'flex justify-center' : '',
        ].join(' ')}>
          {footer}
        </div>
      )}

    </aside>
  );
}

// ─── NavItemRow ───────────────────────────────────────────────────────────────

function NavItemRow({ item, collapsed }: { item: NavItem; collapsed: boolean }) {
  return (
    <button
      type="button"
      title={collapsed ? item.label : undefined}
      disabled={item.disabled}
      onClick={item.disabled ? undefined : item.onClick}
      aria-current={item.active ? 'page' : undefined}
      className={[
        'group w-full flex items-center gap-3 px-2 py-2 rounded-lg text-sm transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ds-brand-500)] focus-visible:ring-offset-1',
        collapsed ? 'justify-center' : '',
        item.disabled
          ? 'opacity-40 cursor-not-allowed'
          : item.active
            ? 'bg-[var(--ds-brand-100)] text-[var(--ds-brand-700)] font-medium cursor-pointer'
            : 'text-[var(--ds-text-secondary)] hover:bg-[var(--ds-bg-subtle)] hover:text-[var(--ds-text-primary)] cursor-pointer',
      ].filter(Boolean).join(' ')}
    >
      {/* Icon */}
      <span className="shrink-0 flex items-center" aria-hidden="true">
        {item.icon}
      </span>

      {/* Label + badge (hidden when collapsed) */}
      {!collapsed && (
        <>
          <span className="flex-1 text-left truncate">{item.label}</span>
          {item.badge && <span className="shrink-0">{item.badge}</span>}
        </>
      )}
    </button>
  );
}
