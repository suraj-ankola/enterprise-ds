import React from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface HeaderIconProps {
  icon:        React.ReactNode;
  /** Accessible label */
  'aria-label': string;
  active?:     boolean;
  disabled?:   boolean;
  href?:       string;
  onClick?:    () => void;
  className?:  string;
}

export interface HeaderIconNotificationProps extends HeaderIconProps {
  /** Badge count. Numbers > 99 render as "99+". Pass 0 to show dot only. */
  count?:   number;
  /** Show an unread dot without a count number */
  showDot?: boolean;
}

// ─── Shared ───────────────────────────────────────────────────────────────────

const ICON_BASE = [
  'relative inline-flex items-center justify-center',
  'h-8 w-8 rounded-lg transition-colors',
  'text-[var(--ds-text-secondary)]',
  'hover:bg-[var(--ds-bg-subtle)] hover:text-[var(--ds-text-primary)]',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ds-brand-500)] focus-visible:ring-offset-1',
  'disabled:opacity-40 disabled:pointer-events-none',
].join(' ');

// ─── HeaderIcon ───────────────────────────────────────────────────────────────

/**
 * Icon button sized for application headers. Use for settings, help, search, etc.
 */
export function HeaderIcon({
  icon,
  active    = false,
  disabled  = false,
  href,
  onClick,
  className = '',
  ...props
}: HeaderIconProps) {
  const classes = [
    ICON_BASE,
    active ? 'bg-[var(--ds-bg-subtle)] text-[var(--ds-text-primary)]' : '',
    className,
  ].filter(Boolean).join(' ');

  if (href && !disabled) {
    return (
      <a href={href} className={classes} {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>
        <span className="h-[18px] w-[18px] flex items-center justify-center" aria-hidden="true">{icon}</span>
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={classes}
      aria-pressed={active || undefined}
      {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      <span className="h-[18px] w-[18px] flex items-center justify-center" aria-hidden="true">{icon}</span>
    </button>
  );
}

// ─── HeaderIconNotification ───────────────────────────────────────────────────

/**
 * HeaderIcon with a notification badge. Typically used for the notification bell.
 * - `count` renders a number badge (capped at 99+)
 * - `showDot` renders a simple unread indicator dot
 * - Both props can coexist; if `count` is provided, it takes precedence over `showDot`
 */
export function HeaderIconNotification({
  count,
  showDot = false,
  ...iconProps
}: HeaderIconNotificationProps) {
  const hasBadge  = count !== undefined && count > 0;
  const hasAny    = hasBadge || showDot;
  const badgeText = hasBadge ? (count > 99 ? '99+' : String(count)) : null;

  return (
    <div className="relative inline-flex">
      <HeaderIcon {...iconProps} />
      {hasAny && (
        <span
          aria-hidden="true"
          className={[
            'absolute -top-0.5 -right-0.5 flex items-center justify-center',
            'rounded-full bg-[var(--ds-danger-icon)] text-white font-semibold',
            'border-2 border-[var(--ds-bg-surface)]',
            badgeText
              ? 'min-w-[16px] h-4 px-1 text-[9px] leading-none'
              : 'h-2 w-2',
          ].join(' ')}
        >
          {badgeText}
        </span>
      )}
    </div>
  );
}
