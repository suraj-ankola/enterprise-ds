import React from 'react';
import { UserIcon } from '@phosphor-icons/react';

// ─── Types ────────────────────────────────────────────────────────────────────

export type AvatarSize   = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type AvatarShape  = 'circle' | 'square';
export type AvatarStatus = 'online' | 'offline' | 'away' | 'busy';

export interface AvatarProps {
  /** Image URL */
  src?:      string;
  /** Alt text for image */
  alt?:      string;
  /** Initials fallback (e.g. "SN") */
  initials?: string;
  size?:     AvatarSize;
  shape?:    AvatarShape;
  status?:   AvatarStatus;
  className?: string;
}

export interface AvatarGroupProps {
  children:    React.ReactNode;
  /** Max avatars to show before showing +N */
  max?:        number;
  size?:       AvatarSize;
  /** Total count (if > children count) for overflow */
  total?:      number;
  className?:  string;
}

// ─── Size maps ────────────────────────────────────────────────────────────────

const SIZE: Record<AvatarSize, string> = {
  xs: 'h-6  w-6  text-[9px]',
  sm: 'h-7  w-7  text-[10px]',
  md: 'h-8  w-8  text-xs',
  lg: 'h-10 w-10 text-sm',
  xl: 'h-14 w-14 text-base',
};

const ICON_SIZE: Record<AvatarSize, number> = { xs: 10, sm: 12, md: 14, lg: 18, xl: 24 };

const STATUS_DOT: Record<AvatarSize, string> = {
  xs: 'h-1.5 w-1.5',
  sm: 'h-2   w-2',
  md: 'h-2   w-2',
  lg: 'h-2.5 w-2.5',
  xl: 'h-3   w-3',
};

const STATUS_COLOR: Record<AvatarStatus, string> = {
  online:  'bg-[var(--ds-success-icon)]',
  offline: 'bg-[var(--ds-text-muted)]',
  away:    'bg-[var(--ds-warning-icon)]',
  busy:    'bg-[var(--ds-danger-icon)]',
};

// ─── Avatar ───────────────────────────────────────────────────────────────────

export function Avatar({
  src,
  alt       = '',
  initials,
  size      = 'md',
  shape     = 'circle',
  status,
  className = '',
}: AvatarProps) {
  const rounded = shape === 'circle' ? 'rounded-full' : 'rounded-lg';

  return (
    <span className={['relative inline-flex shrink-0', className].filter(Boolean).join(' ')}>
      <span
        className={[
          'flex items-center justify-center overflow-hidden',
          'bg-[var(--ds-brand-600)] text-white font-semibold select-none',
          SIZE[size],
          rounded,
        ].join(' ')}
      >
        {src ? (
          <img
            src={src}
            alt={alt}
            className="h-full w-full object-cover"
            onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
          />
        ) : initials ? (
          <span aria-label={alt || initials}>{initials.slice(0, 2).toUpperCase()}</span>
        ) : (
          <UserIcon size={ICON_SIZE[size]} weight="fill" aria-hidden="true" />
        )}
      </span>

      {/* Status dot */}
      {status && (
        <span
          aria-label={status}
          className={[
            'absolute bottom-0 right-0 rounded-full ring-2 ring-[var(--ds-bg-surface)]',
            STATUS_DOT[size],
            STATUS_COLOR[status],
          ].join(' ')}
        />
      )}
    </span>
  );
}

// ─── AvatarGroup ──────────────────────────────────────────────────────────────

export function AvatarGroup({
  children,
  max       = 4,
  size      = 'md',
  total,
  className = '',
}: AvatarGroupProps) {
  const childArray = React.Children.toArray(children);
  const visible    = childArray.slice(0, max);
  const hidden     = total !== undefined ? total - max : childArray.length - max;

  return (
    <div className={['flex items-center', className].filter(Boolean).join(' ')}>
      {visible.map((child, i) => (
        <span
          key={i}
          className="ring-2 ring-[var(--ds-bg-surface)] rounded-full -ml-2 first:ml-0"
        >
          {React.isValidElement(child)
            ? React.cloneElement(child as React.ReactElement<AvatarProps>, { size })
            : child}
        </span>
      ))}
      {hidden > 0 && (
        <span
          className={[
            'flex items-center justify-center rounded-full ring-2 ring-[var(--ds-bg-surface)]',
            'bg-[var(--ds-bg-subtle)] text-[var(--ds-text-secondary)] font-medium',
            '-ml-2',
            SIZE[size],
          ].join(' ')}
          aria-label={`${hidden} more`}
        >
          +{hidden}
        </span>
      )}
    </div>
  );
}
