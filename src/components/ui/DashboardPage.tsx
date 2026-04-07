'use client';
import React from 'react';
import {
  TrendUpIcon,
  TrendDownIcon,
  ClockIcon,
} from '@phosphor-icons/react';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface DashboardStat {
  label:      string;
  value:      string | number;
  change?:    number;  // percentage, positive = good, negative = bad
  icon?:      React.ReactNode;
  description?: string;
}

export interface DashboardActivity {
  id:     string;
  text:   string;
  time:   string;
  icon?:  React.ReactNode;
  type?:  'default' | 'warning' | 'success' | 'danger';
}

export interface DashboardChartSection {
  title:    string;
  children: React.ReactNode;
}

export interface DashboardPageProps {
  /** Page title */
  title:          string;
  subtitle?:      string;
  /** Actions in the page header */
  actions?:       React.ReactNode;
  /** Stat cards row */
  stats?:         DashboardStat[];
  /** Recent activity feed */
  activity?:      DashboardActivity[];
  /** Main chart or data area */
  mainContent?:   React.ReactNode;
  /** Secondary side panel content */
  sideContent?:   React.ReactNode;
  /** Below main content — full-width */
  belowContent?:  React.ReactNode;
  /** Show stats skeleton placeholders instead of actual stats */
  loading?:       boolean;
  className?:     string;
}

// ─── StatCard ─────────────────────────────────────────────────────────────────

const ICON_BG: Record<string, string> = {
  default: 'bg-[var(--ds-brand-50)]   text-[var(--ds-brand-600)]',
  success: 'bg-[var(--ds-success-bg)] text-[var(--ds-success-text)]',
  warning: 'bg-[var(--ds-warning-bg)] text-[var(--ds-warning-text)]',
  danger:  'bg-[var(--ds-danger-bg)]  text-[var(--ds-danger-text)]',
};

function StatCard({ stat }: { stat: DashboardStat }) {
  const isPositive  = (stat.change ?? 0) >= 0;
  return (
    <div className="bg-[var(--ds-bg-surface)] border border-[var(--ds-border-base)] rounded-xl p-5 flex flex-col gap-3">
      <div className="flex items-start justify-between">
        <p className="text-xs font-semibold text-[var(--ds-text-muted)] uppercase tracking-wide">{stat.label}</p>
        {stat.icon && (
          <div className={['h-8 w-8 rounded-lg flex items-center justify-center', ICON_BG.default].join(' ')}>
            {stat.icon}
          </div>
        )}
      </div>
      <div>
        <p className="text-2xl font-bold text-[var(--ds-text-primary)] tabular-nums">{stat.value}</p>
        {stat.change !== undefined && (
          <div className={['flex items-center gap-1 mt-1 text-xs font-medium', isPositive ? 'text-[var(--ds-success-text)]' : 'text-[var(--ds-danger-text)]'].join(' ')}>
            {isPositive ? <TrendUpIcon size={13} /> : <TrendDownIcon size={13} />}
            {Math.abs(stat.change)}% vs last period
          </div>
        )}
        {stat.description && (
          <p className="text-xs text-[var(--ds-text-muted)] mt-0.5">{stat.description}</p>
        )}
      </div>
    </div>
  );
}

function StatCardSkeleton() {
  return (
    <div className="bg-[var(--ds-bg-surface)] border border-[var(--ds-border-base)] rounded-xl p-5 space-y-3 animate-pulse">
      <div className="h-3 w-24 rounded bg-[var(--ds-bg-subtle)]" />
      <div className="h-8 w-20 rounded bg-[var(--ds-bg-subtle)]" />
      <div className="h-3 w-32 rounded bg-[var(--ds-bg-subtle)]" />
    </div>
  );
}

// ─── ActivityFeed ─────────────────────────────────────────────────────────────

const ACTIVITY_ICON_CLS: Record<NonNullable<DashboardActivity['type']>, string> = {
  default: 'bg-[var(--ds-bg-subtle)]   text-[var(--ds-text-muted)]',
  success: 'bg-[var(--ds-success-bg)]  text-[var(--ds-success-text)]',
  warning: 'bg-[var(--ds-warning-bg)]  text-[var(--ds-warning-text)]',
  danger:  'bg-[var(--ds-danger-bg)]   text-[var(--ds-danger-text)]',
};

function ActivityFeed({ items }: { items: DashboardActivity[] }) {
  return (
    <div className="space-y-0 divide-y divide-[var(--ds-border-base)]">
      {items.map(item => (
        <div key={item.id} className="flex items-start gap-3 py-3">
          <div className={['h-7 w-7 rounded-full flex items-center justify-center shrink-0', ACTIVITY_ICON_CLS[item.type ?? 'default']].join(' ')}>
            {item.icon ?? <ClockIcon size={13} />}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-[var(--ds-text-primary)] leading-snug">{item.text}</p>
            <p className="text-[11px] text-[var(--ds-text-muted)] mt-0.5">{item.time}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── DashboardPage ────────────────────────────────────────────────────────────

export function DashboardPage({
  title,
  subtitle,
  actions,
  stats,
  activity,
  mainContent,
  sideContent,
  belowContent,
  loading = false,
  className = '',
}: DashboardPageProps) {
  return (
    <div className={['min-h-screen bg-[var(--ds-bg-base)] flex flex-col', className].join(' ')}>
      {/* Page header */}
      <div className="bg-[var(--ds-bg-surface)] border-b border-[var(--ds-border-base)] px-6 py-5">
        <div className="max-w-screen-xl mx-auto flex items-start justify-between gap-4">
          <div>
            <h1 className="text-lg font-semibold text-[var(--ds-text-primary)]">{title}</h1>
            {subtitle && <p className="text-sm text-[var(--ds-text-muted)] mt-0.5">{subtitle}</p>}
          </div>
          {actions && <div className="flex items-center gap-2 shrink-0">{actions}</div>}
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 max-w-screen-xl mx-auto w-full px-6 py-6 space-y-6">
        {/* Stats row */}
        {(stats || loading) && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {loading
              ? Array.from({ length: 4 }).map((_, i) => <StatCardSkeleton key={i} />)
              : stats!.map((s, i) => <StatCard key={i} stat={s} />)}
          </div>
        )}

        {/* Main + side layout */}
        {(mainContent || sideContent || activity) && (
          <div className={['flex gap-6', sideContent || activity ? 'lg:grid lg:grid-cols-[1fr_320px]' : ''].join(' ')}>
            {/* Main content */}
            {mainContent && (
              <div className="flex-1 min-w-0 bg-[var(--ds-bg-surface)] border border-[var(--ds-border-base)] rounded-xl overflow-hidden">
                {mainContent}
              </div>
            )}

            {/* Side panel */}
            <div className="space-y-4">
              {sideContent}
              {activity && activity.length > 0 && (
                <div className="bg-[var(--ds-bg-surface)] border border-[var(--ds-border-base)] rounded-xl overflow-hidden">
                  <div className="px-4 py-3 border-b border-[var(--ds-border-base)]">
                    <h3 className="text-sm font-semibold text-[var(--ds-text-primary)]">Recent activity</h3>
                  </div>
                  <div className="px-4 py-2">
                    <ActivityFeed items={activity} />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Below content */}
        {belowContent && (
          <div>{belowContent}</div>
        )}
      </div>
    </div>
  );
}
