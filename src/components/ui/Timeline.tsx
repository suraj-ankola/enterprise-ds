import React from 'react';
import { Badge } from './Badge';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function sanitizeHref(href: string): string {
  if (/^(javascript|data):/i.test(href.trim())) return '#';
  return href;
}

// ─── Types ────────────────────────────────────────────────────────────────────

export type TimelineItemVariant = 'default' | 'success' | 'warning' | 'danger' | 'info' | 'brand';
export type TimelineLayout      = 'left' | 'alternate';

export interface TimelineItem {
  id:          string;
  /** Dot icon — any React node, typically a Phosphor icon */
  icon?:       React.ReactNode;
  variant?:    TimelineItemVariant;
  title:       string;
  description?: string;
  /** Timestamp label — formatted string, e.g. "2h ago", "Nov 14, 2025" */
  timestamp?:  string;
  /** Badge label — e.g. "New", "Resolved", "Critical" */
  badge?:      string;
  badgeVariant?: TimelineItemVariant;
  /** Extra content slot — rendered below description */
  content?:    React.ReactNode;
}

export interface TimelineProps {
  items:      TimelineItem[];
  layout?:    TimelineLayout;
  /** Remove the connector line on the last item */
  lastNoLine?: boolean;
  className?:  string;
}

// ─── Variant → dot colours ────────────────────────────────────────────────────

const DOT_BG: Record<TimelineItemVariant, string> = {
  default: 'bg-[var(--ds-bg-subtle)]          border-[var(--ds-border-strong)]',
  brand:   'bg-[var(--ds-brand-600)]          border-[var(--ds-brand-600)]',
  success: 'bg-[var(--ds-success-icon)]       border-[var(--ds-success-icon)]',
  warning: 'bg-[var(--ds-warning-icon)]       border-[var(--ds-warning-icon)]',
  danger:  'bg-[var(--ds-danger-icon)]        border-[var(--ds-danger-icon)]',
  info:    'bg-[var(--ds-info-icon)]          border-[var(--ds-info-icon)]',
};

const DOT_ICON_COLOR: Record<TimelineItemVariant, string> = {
  default: 'text-[var(--ds-text-muted)]',
  brand:   'text-white',
  success: 'text-white',
  warning: 'text-white',
  danger:  'text-white',
  info:    'text-white',
};

const BADGE_VARIANT_MAP: Record<TimelineItemVariant, 'neutral' | 'brand' | 'success' | 'warning' | 'danger' | 'info'> = {
  default: 'neutral',
  brand:   'brand',
  success: 'success',
  warning: 'warning',
  danger:  'danger',
  info:    'info',
};

// ─── TimelineItemRow ──────────────────────────────────────────────────────────

interface TimelineItemRowProps {
  item:       TimelineItem;
  isLast:     boolean;
  lastNoLine: boolean;
}

function TimelineItemRow({ item, isLast, lastNoLine }: TimelineItemRowProps) {
  const variant = item.variant ?? 'default';
  const showLine = !(isLast && lastNoLine);

  return (
    <div className="relative flex gap-4">
      {/* Left: dot + connector line */}
      <div className="relative flex flex-col items-center">
        {/* Dot */}
        <div
          className={[
            'relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2',
            DOT_BG[variant],
            DOT_ICON_COLOR[variant],
          ].join(' ')}
          aria-hidden="true"
        >
          {item.icon ? (
            <span className="flex items-center justify-center text-[inherit]">
              {item.icon}
            </span>
          ) : (
            <span className="h-2 w-2 rounded-full bg-current opacity-70" />
          )}
        </div>

        {/* Connector line */}
        {showLine && (
          <div className="w-px flex-1 bg-[var(--ds-border-base)] mt-1" />
        )}
      </div>

      {/* Right: content */}
      <div className={['flex-1 min-w-0', isLast ? 'pb-0' : 'pb-6'].join(' ')}>
        {/* Header row */}
        <div className="flex items-start justify-between gap-3 -mt-0.5 mb-1">
          <div className="flex items-center gap-2 flex-wrap min-w-0">
            <p className="text-sm font-semibold text-[var(--ds-text-primary)] leading-snug">
              {item.title}
            </p>
            {item.badge && (
              <Badge
                variant={BADGE_VARIANT_MAP[item.badgeVariant ?? item.variant ?? 'default']}
                size="sm"
              >
                {item.badge}
              </Badge>
            )}
          </div>
          {item.timestamp && (
            <time className="shrink-0 text-xs text-[var(--ds-text-muted)] mt-0.5 whitespace-nowrap">
              {item.timestamp}
            </time>
          )}
        </div>

        {/* Description */}
        {item.description && (
          <p className="text-sm text-[var(--ds-text-muted)] leading-relaxed">
            {item.description}
          </p>
        )}

        {/* Extra content slot */}
        {item.content && (
          <div className="mt-2">
            {item.content}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Timeline ─────────────────────────────────────────────────────────────────

export function Timeline({
  items,
  layout      = 'left',
  lastNoLine  = true,
  className   = '',
}: TimelineProps) {
  if (items.length === 0) return null;

  return (
    <ol
      role="list"
      aria-label="Activity timeline"
      className={['', className].join(' ')}
    >
      {items.map((item, i) => (
        <li key={item.id}>
          <TimelineItemRow
            item={item}
            isLast={i === items.length - 1}
            lastNoLine={lastNoLine}
          />
        </li>
      ))}
    </ol>
  );
}

// ─── ActivityFeed ─────────────────────────────────────────────────────────────
// Opinionated wrapper: card with header + scrollable feed

export interface ActivityFeedProps {
  title?:     string;
  items:      TimelineItem[];
  /** Max visible items before scroll */
  maxHeight?: number;
  /** Link text to navigate to full log */
  viewAllHref?:   string;
  onViewAll?:     () => void;
  loading?:   boolean;
  className?: string;
}

function FeedSkeleton() {
  return (
    <div className="space-y-4 p-5">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex gap-3">
          <div className="h-8 w-8 shrink-0 rounded-full bg-[var(--ds-bg-subtle)] animate-pulse" />
          <div className="flex-1 space-y-2 pt-1">
            <div className="h-3 rounded bg-[var(--ds-bg-subtle)] animate-pulse w-3/4" />
            <div className="h-3 rounded bg-[var(--ds-bg-subtle)] animate-pulse w-full" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function ActivityFeed({
  title      = 'Activity',
  items,
  maxHeight  = 480,
  viewAllHref,
  onViewAll,
  loading    = false,
  className  = '',
}: ActivityFeedProps) {
  return (
    <div className={[
      'bg-[var(--ds-bg-surface)] border border-[var(--ds-border-base)] rounded-xl overflow-hidden',
      className,
    ].join(' ')}>
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--ds-border-base)]">
        <p className="text-sm font-semibold text-[var(--ds-text-primary)]">{title}</p>
        {(viewAllHref || onViewAll) && (
          <a
            href={viewAllHref ? sanitizeHref(viewAllHref) : '#'}
            onClick={onViewAll ? (e) => { e.preventDefault(); onViewAll(); } : undefined}
            className="text-xs text-[var(--ds-brand-600)] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ds-brand-500)] rounded"
          >
            View all
          </a>
        )}
      </div>

      {/* Feed body */}
      {loading ? (
        <FeedSkeleton />
      ) : items.length === 0 ? (
        <div className="py-12 text-center">
          <p className="text-sm text-[var(--ds-text-muted)]">No activity yet</p>
        </div>
      ) : (
        <div
          className="overflow-y-auto px-5 py-4"
          style={{ maxHeight }}
        >
          <Timeline items={items} />
        </div>
      )}
    </div>
  );
}
