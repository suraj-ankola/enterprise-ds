'use client';
import React from 'react';
import {
  BellIcon,
  CheckIcon,
  XIcon,
  InfoIcon,
  WarningIcon,
  CheckCircleIcon,
  XCircleIcon,
} from '@phosphor-icons/react';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function sanitizeHref(href: string): string {
  if (/^(javascript|data):/i.test(href.trim())) return '#';
  return href;
}

// ─── Types ────────────────────────────────────────────────────────────────────

export type NotificationType = 'info' | 'warning' | 'success' | 'danger';
export type NotificationFilter = 'all' | 'unread' | (string & {});

export interface NotificationAction {
  label:    string;
  href?:    string;
  onClick?: () => void;
}

export interface Notification {
  id:         string;
  title:      string;
  body:       string;
  type:       NotificationType;
  timestamp:  string;
  read:       boolean;
  category?:  string;
  action?:    NotificationAction;
}

export interface NotificationsCenterProps {
  notifications:  Notification[];
  onMarkRead:     (id: string) => void;
  onMarkAllRead:  () => void;
  onDismiss:      (id: string) => void;
  onClearAll:     () => void;
  filter:         NotificationFilter;
  onFilterChange: (filter: NotificationFilter) => void;
  loading:        boolean;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const TYPE_META: Record<NotificationType, {
  icon:   React.ReactNode;
  iconBg: string;
  iconFg: string;
}> = {
  info: {
    icon:   <InfoIcon size={16} weight="fill" />,
    iconBg: 'bg-[var(--ds-info-bg)]',
    iconFg: 'text-[var(--ds-info-text)]',
  },
  warning: {
    icon:   <WarningIcon size={16} weight="fill" />,
    iconBg: 'bg-[var(--ds-warning-bg)]',
    iconFg: 'text-[var(--ds-warning-text)]',
  },
  success: {
    icon:   <CheckCircleIcon size={16} weight="fill" />,
    iconBg: 'bg-[var(--ds-success-bg)]',
    iconFg: 'text-[var(--ds-success-text)]',
  },
  danger: {
    icon:   <XCircleIcon size={16} weight="fill" />,
    iconBg: 'bg-[var(--ds-danger-bg)]',
    iconFg: 'text-[var(--ds-danger-text)]',
  },
};

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function SkeletonRow() {
  return (
    <div className="flex items-start gap-3 px-5 py-4 animate-pulse">
      <div className="h-8 w-8 rounded-full bg-[var(--ds-bg-subtle)] shrink-0" />
      <div className="flex-1 space-y-2 pt-0.5">
        <div className="h-3 w-2/5 rounded bg-[var(--ds-bg-subtle)]" />
        <div className="h-2.5 w-4/5 rounded bg-[var(--ds-bg-subtle)]" />
        <div className="h-2 w-1/4 rounded bg-[var(--ds-bg-subtle)]" />
      </div>
    </div>
  );
}

// ─── Notification Row ─────────────────────────────────────────────────────────

interface NotificationRowProps {
  notification: Notification;
  onMarkRead:   (id: string) => void;
  onDismiss:    (id: string) => void;
}

function NotificationRow({ notification, onMarkRead, onDismiss }: NotificationRowProps) {
  const meta = TYPE_META[notification.type];

  return (
    <div
      className={[
        'group flex items-start gap-3 px-5 py-4 relative transition-colors',
        'border-b border-[var(--ds-border-base)] last:border-b-0',
        !notification.read
          ? 'bg-[var(--ds-bg-subtle)]'
          : 'bg-[var(--ds-bg-surface)] hover:bg-[var(--ds-bg-subtle)]',
      ].join(' ')}
    >
      {/* Unread dot */}
      {!notification.read && (
        <span
          aria-label="Unread"
          className="absolute left-2 top-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-[var(--ds-brand-600)]"
        />
      )}

      {/* Type icon */}
      <div className={['h-8 w-8 rounded-full flex items-center justify-center shrink-0 mt-0.5', meta.iconBg, meta.iconFg].join(' ')}>
        {meta.icon}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className={['text-sm leading-snug text-[var(--ds-text-primary)]', !notification.read ? 'font-semibold' : 'font-medium'].join(' ')}>
          {notification.title}
        </p>
        <p className="text-xs text-[var(--ds-text-secondary)] mt-0.5 leading-relaxed">
          {notification.body}
        </p>
        <div className="flex items-center gap-3 mt-1.5 flex-wrap">
          <span className="text-[11px] text-[var(--ds-text-muted)]">{notification.timestamp}</span>
          {notification.category && (
            <span className="text-[11px] px-1.5 py-0.5 rounded-md bg-[var(--ds-bg-raised)] text-[var(--ds-text-muted)] border border-[var(--ds-border-base)]">
              {notification.category}
            </span>
          )}
          {notification.action && (
            notification.action.href ? (
              <a
                href={sanitizeHref(notification.action.href)}
                className="text-[11px] font-medium text-[var(--ds-brand-600)] hover:text-[var(--ds-brand-700)] underline-offset-2 hover:underline"
                onClick={() => { if (!notification.read) onMarkRead(notification.id); }}
              >
                {notification.action.label}
              </a>
            ) : (
              <button
                type="button"
                onClick={() => {
                  notification.action?.onClick?.();
                  if (!notification.read) onMarkRead(notification.id);
                }}
                className="text-[11px] font-medium text-[var(--ds-brand-600)] hover:text-[var(--ds-brand-700)] underline-offset-2 hover:underline"
              >
                {notification.action.label}
              </button>
            )
          )}
        </div>
      </div>

      {/* Hover actions */}
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
        {!notification.read && (
          <button
            type="button"
            aria-label="Mark as read"
            onClick={() => onMarkRead(notification.id)}
            className="p-1.5 rounded-md text-[var(--ds-text-muted)] hover:text-[var(--ds-text-primary)] hover:bg-[var(--ds-bg-raised)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ds-brand-500)]"
          >
            <CheckIcon size={14} />
          </button>
        )}
        <button
          type="button"
          aria-label="Dismiss notification"
          onClick={() => onDismiss(notification.id)}
          className="p-1.5 rounded-md text-[var(--ds-text-muted)] hover:text-[var(--ds-danger-text)] hover:bg-[var(--ds-danger-bg)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ds-brand-500)]"
        >
          <XIcon size={14} />
        </button>
      </div>
    </div>
  );
}

// ─── Empty State ──────────────────────────────────────────────────────────────

function EmptyState({ filter }: { filter: NotificationFilter }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <div className="h-12 w-12 rounded-full bg-[var(--ds-bg-subtle)] flex items-center justify-center mb-4 text-[var(--ds-text-muted)]">
        <BellIcon size={24} />
      </div>
      <p className="text-sm font-medium text-[var(--ds-text-primary)]">
        {filter === 'unread' ? 'No unread notifications' : 'No notifications'}
      </p>
      <p className="text-xs text-[var(--ds-text-muted)] mt-1">
        {filter === 'unread'
          ? "You're all caught up."
          : filter === 'all'
          ? "You'll see alerts and updates here."
          : `No notifications in "${filter}".`}
      </p>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function NotificationsCenter({
  notifications,
  onMarkRead,
  onMarkAllRead,
  onDismiss,
  onClearAll,
  filter,
  onFilterChange,
  loading,
}: NotificationsCenterProps) {
  // Derive unique categories
  const categories = Array.from(
    new Set(notifications.map(n => n.category).filter(Boolean) as string[])
  );

  const tabs: { key: NotificationFilter; label: string }[] = [
    { key: 'all',    label: 'All' },
    { key: 'unread', label: 'Unread' },
    ...categories.map(c => ({ key: c as NotificationFilter, label: c })),
  ];

  // Filtered list
  const filtered = notifications.filter(n => {
    if (filter === 'all')    return true;
    if (filter === 'unread') return !n.read;
    return n.category === filter;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="flex flex-col h-full min-h-0 bg-[var(--ds-bg-surface)]">
      {/* ── Header ── */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--ds-border-base)] shrink-0">
        <div className="flex items-center gap-2">
          <BellIcon size={20} className="text-[var(--ds-text-primary)]" />
          <h1 className="text-base font-semibold text-[var(--ds-text-primary)]">Notifications</h1>
          {unreadCount > 0 && (
            <span className="inline-flex items-center justify-center h-5 min-w-[20px] px-1.5 rounded-full text-[11px] font-semibold bg-[var(--ds-brand-600)] text-white">
              {unreadCount}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <button
              type="button"
              onClick={onMarkAllRead}
              className="flex items-center gap-1.5 text-xs font-medium text-[var(--ds-brand-600)] hover:text-[var(--ds-brand-700)] px-2.5 py-1.5 rounded-lg hover:bg-[var(--ds-bg-subtle)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ds-brand-500)]"
            >
              <CheckIcon size={13} />
              Mark all read
            </button>
          )}
          {notifications.length > 0 && (
            <button
              type="button"
              onClick={onClearAll}
              className="flex items-center gap-1.5 text-xs font-medium text-[var(--ds-text-muted)] hover:text-[var(--ds-danger-text)] px-2.5 py-1.5 rounded-lg hover:bg-[var(--ds-danger-bg)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ds-brand-500)]"
            >
              <XIcon size={13} />
              Clear all
            </button>
          )}
        </div>
      </div>

      {/* ── Filter tabs ── */}
      <div className="flex items-center gap-1 px-5 py-2.5 border-b border-[var(--ds-border-base)] shrink-0 overflow-x-auto scrollbar-none">
        {tabs.map(tab => {
          const isActive = filter === tab.key;
          const tabUnread = tab.key === 'unread'
            ? unreadCount
            : tab.key !== 'all'
            ? notifications.filter(n => !n.read && n.category === tab.key).length
            : 0;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => onFilterChange(tab.key)}
              className={[
                'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ds-brand-500)]',
                isActive
                  ? 'bg-[var(--ds-brand-600)] text-white'
                  : 'text-[var(--ds-text-secondary)] hover:text-[var(--ds-text-primary)] hover:bg-[var(--ds-bg-subtle)]',
              ].join(' ')}
            >
              {tab.label}
              {tabUnread > 0 && (
                <span className={[
                  'inline-flex items-center justify-center h-4 min-w-[16px] px-1 rounded-full text-[10px] font-semibold',
                  isActive ? 'bg-white/25 text-white' : 'bg-[var(--ds-bg-raised)] text-[var(--ds-text-muted)]',
                ].join(' ')}>
                  {tabUnread}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* ── List ── */}
      <div className="flex-1 overflow-y-auto min-h-0">
        {loading ? (
          <>
            <SkeletonRow />
            <SkeletonRow />
            <SkeletonRow />
            <SkeletonRow />
            <SkeletonRow />
          </>
        ) : filtered.length === 0 ? (
          <EmptyState filter={filter} />
        ) : (
          filtered.map(n => (
            <NotificationRow
              key={n.id}
              notification={n}
              onMarkRead={onMarkRead}
              onDismiss={onDismiss}
            />
          ))
        )}
      </div>
    </div>
  );
}
