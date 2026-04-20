import React from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface NavIconProps {
  icon:       React.ReactNode;
  /** Accessible label — also shown as tooltip text via title attribute */
  label:      string;
  active?:    boolean;
  disabled?:  boolean;
  href?:      string;
  onClick?:   () => void;
  className?: string;
}

export interface NavLinkIconProps {
  icon:       React.ReactNode;
  label:      string;
  active?:    boolean;
  disabled?:  boolean;
  href?:      string;
  onClick?:   () => void;
  /** Notification badge — number or short string (e.g. "99+") */
  badge?:     number | string;
  className?: string;
}

// ─── Shared style helpers ────────────────────────────────────────────────────

const BASE_SHARED = [
  'inline-flex items-center transition-colors select-none',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ds-brand-500)] focus-visible:ring-offset-1',
].join(' ');

function activeIdle(active: boolean, disabled: boolean) {
  if (disabled) return 'opacity-40 cursor-not-allowed pointer-events-none';
  return active
    ? 'bg-[var(--ds-brand-100)] text-[var(--ds-brand-600)]'
    : 'text-[var(--ds-text-secondary)] hover:bg-[var(--ds-bg-subtle)] hover:text-[var(--ds-text-primary)]';
}

// ─── NavIcon — icon-only (for collapsed sidebar / icon rail) ─────────────────

/**
 * Icon-only navigation item. Use in collapsed sidebars or icon rails.
 * Always pair with a tooltip — the `label` prop drives the `title` attribute.
 */
export function NavIcon({
  icon,
  label,
  active    = false,
  disabled  = false,
  href,
  onClick,
  className = '',
}: NavIconProps) {
  const classes = [
    BASE_SHARED,
    'justify-center rounded-lg h-9 w-9',
    activeIdle(active, disabled),
    className,
  ].filter(Boolean).join(' ');

  const content = (
    <span className="flex items-center justify-center h-5 w-5 shrink-0" aria-hidden="true">
      {icon}
    </span>
  );

  if (href && !disabled) {
    return (
      <a href={href} className={classes} title={label} aria-label={label} aria-current={active ? 'page' : undefined}>
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={classes}
      title={label}
      aria-label={label}
      aria-current={active ? 'page' : undefined}
    >
      {content}
    </button>
  );
}

// ─── NavLinkIcon — icon + label (for expanded sidebar) ───────────────────────

/**
 * Icon + label navigation item. Standard item for expanded sidebars and nav drawers.
 * Supports a notification badge.
 */
export function NavLinkIcon({
  icon,
  label,
  active    = false,
  disabled  = false,
  href,
  onClick,
  badge,
  className = '',
}: NavLinkIconProps) {
  const classes = [
    BASE_SHARED,
    'gap-2.5 rounded-lg px-2.5 h-9 w-full',
    activeIdle(active, disabled),
    className,
  ].filter(Boolean).join(' ');

  const content = (
    <>
      <span className="flex items-center justify-center h-5 w-5 shrink-0" aria-hidden="true">
        {icon}
      </span>
      <span className="flex-1 text-sm font-medium truncate text-left">{label}</span>
      {badge !== undefined && (
        <span
          className={[
            'shrink-0 min-w-[18px] h-[18px] px-1 rounded-full inline-flex items-center justify-center',
            'text-[10px] font-semibold leading-none',
            active
              ? 'bg-[var(--ds-brand-600)] text-white'
              : 'bg-[var(--ds-bg-subtle)] text-[var(--ds-text-muted)] border border-[var(--ds-border-base)]',
          ].join(' ')}
          aria-label={`${badge} notifications`}
        >
          {badge}
        </span>
      )}
    </>
  );

  if (href && !disabled) {
    return (
      <a href={href} className={classes} aria-current={active ? 'page' : undefined}>
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={classes}
      aria-current={active ? 'page' : undefined}
    >
      {content}
    </button>
  );
}
