import React from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface NavbarLinkItem {
  key:       string;
  label:     string;
  href?:     string;
  active?:   boolean;
  disabled?: boolean;
  onClick?:  () => void;
}

export interface NavbarProps {
  /** Logo image, icon, or wordmark */
  logo?:       React.ReactNode;
  /** Application name shown beside the logo */
  appName?:    string;
  /** Primary navigation links rendered in the center / after the logo */
  navItems?:   NavbarLinkItem[];
  /** Search bar or any node placed in the center-right zone */
  search?:     React.ReactNode;
  /** Icon buttons, avatars, or menus aligned to the far right */
  actions?:    React.ReactNode;
  /** Bottom border separator */
  bordered?:   boolean;
  /** Stick to viewport top on scroll */
  sticky?:     boolean;
  className?:  string;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function Navbar({
  logo,
  appName,
  navItems  = [],
  search,
  actions,
  bordered  = true,
  sticky    = false,
  className = '',
}: NavbarProps) {
  return (
    <nav
      className={[
        'w-full bg-[var(--ds-bg-surface)]',
        bordered ? 'border-b border-[var(--ds-border-base)]' : '',
        sticky   ? 'sticky top-0 z-20' : '',
        className,
      ].filter(Boolean).join(' ')}
      aria-label="Main navigation"
    >
      <div className="flex items-center h-14 px-4 gap-2">

        {/* Brand */}
        {(logo || appName) && (
          <div className="flex items-center gap-2.5 shrink-0 mr-4">
            {logo && (
              <span className="flex items-center justify-center h-7 w-7 shrink-0">
                {logo}
              </span>
            )}
            {appName && (
              <span className="text-sm font-semibold text-[var(--ds-text-primary)] whitespace-nowrap">
                {appName}
              </span>
            )}
          </div>
        )}

        {/* Primary nav links */}
        {navItems.length > 0 && (
          <div className="flex items-center gap-0.5" role="list">
            {navItems.map((item) => (
              <NavbarLink key={item.key} item={item} />
            ))}
          </div>
        )}

        {/* Spacer */}
        <div className="flex-1" />

        {/* Search zone */}
        {search && (
          <div className="flex items-center max-w-xs w-full">
            {search}
          </div>
        )}

        {/* Actions */}
        {actions && (
          <div className="flex items-center gap-1 ml-2 shrink-0">
            {actions}
          </div>
        )}
      </div>
    </nav>
  );
}

// ─── NavbarLink (internal) ────────────────────────────────────────────────────

function NavbarLink({ item }: { item: NavbarLinkItem }) {
  const classes = [
    'inline-flex items-center px-3 h-8 rounded-lg text-sm font-medium transition-colors select-none',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ds-brand-500)]',
    item.disabled
      ? 'opacity-40 cursor-not-allowed pointer-events-none text-[var(--ds-text-muted)]'
      : item.active
        ? 'bg-[var(--ds-brand-100)] text-[var(--ds-brand-600)]'
        : 'text-[var(--ds-text-secondary)] hover:bg-[var(--ds-bg-subtle)] hover:text-[var(--ds-text-primary)]',
  ].join(' ');

  if (item.href && !item.disabled) {
    return (
      <a
        href={item.href}
        className={classes}
        aria-current={item.active ? 'page' : undefined}
        role="listitem"
      >
        {item.label}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={item.disabled ? undefined : item.onClick}
      disabled={item.disabled}
      className={classes}
      aria-current={item.active ? 'page' : undefined}
      role="listitem"
    >
      {item.label}
    </button>
  );
}
