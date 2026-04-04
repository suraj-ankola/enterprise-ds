import React from 'react';
import { TrendUpIcon, TrendDownIcon, MinusIcon } from '@phosphor-icons/react';
import { Sparkline } from './Chart';
import { Badge } from './Badge';

// ─── Types ────────────────────────────────────────────────────────────────────

export type StatTrend = 'up' | 'down' | 'neutral';

export interface StatCardProps {
  /** Metric label */
  label:         string;
  /** Formatted value string — e.g. "91%", "$4.2M", "23" */
  value:         string;
  /** Change vs previous period — e.g. "+4%", "-8", "No change" */
  delta?:        string;
  /** Semantic meaning of the delta — drives colour */
  trend?:        StatTrend;
  /** Whether up is good (success) or bad (danger). Default: true. */
  positiveIsGood?: boolean;
  /** Comparison period label — e.g. "vs last month" */
  period?:       string;
  /** Icon in top-left corner */
  icon?:         React.ReactNode;
  /** Mini trend line — pass last N data points */
  sparkline?:    number[];
  /** Additional info/annotation shown below the value */
  annotation?:   string;
  /** Loading skeleton state */
  loading?:      boolean;
  /** onClick makes the card interactive (clickable → navigates to detail) */
  onClick?:      () => void;
  className?:    string;
}

// ─── Trend → colour map ───────────────────────────────────────────────────────

function trendVariant(
  trend: StatTrend | undefined,
  positiveIsGood: boolean,
): 'success' | 'danger' | 'neutral' {
  if (!trend || trend === 'neutral') return 'neutral';
  if (positiveIsGood) return trend === 'up' ? 'success' : 'danger';
  return trend === 'up' ? 'danger' : 'success';
}

const TREND_ICON: Record<StatTrend, React.ElementType> = {
  up:      TrendUpIcon,
  down:    TrendDownIcon,
  neutral: MinusIcon,
};

const BADGE_VARIANT_MAP: Record<'success' | 'danger' | 'neutral', 'success' | 'danger' | 'neutral'> = {
  success: 'success',
  danger:  'danger',
  neutral: 'neutral',
};

// ─── Skeleton pulse ───────────────────────────────────────────────────────────

function Pulse({ className = '' }: { className?: string }) {
  return (
    <div className={['rounded-md bg-[var(--ds-bg-subtle)] animate-pulse', className].join(' ')} />
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export function StatCard({
  label,
  value,
  delta,
  trend,
  positiveIsGood = true,
  period,
  icon,
  sparkline,
  annotation,
  loading = false,
  onClick,
  className = '',
}: StatCardProps) {
  const variant    = trendVariant(trend, positiveIsGood);
  const TrendIconEl = trend ? TREND_ICON[trend] : null;

  const interactive = Boolean(onClick);

  if (loading) {
    return (
      <div className={['bg-[var(--ds-bg-surface)] border border-[var(--ds-border-base)] rounded-xl p-5', className].join(' ')}>
        <div className="flex items-center justify-between mb-4">
          <Pulse className="h-8 w-8" />
          <Pulse className="h-5 w-16" />
        </div>
        <Pulse className="h-8 w-24 mb-2" />
        <Pulse className="h-3 w-32" />
      </div>
    );
  }

  return (
    <div
      className={[
        'bg-[var(--ds-bg-surface)] border border-[var(--ds-border-base)] rounded-xl p-5',
        'flex flex-col gap-3',
        interactive ? [
          'cursor-pointer',
          'hover:border-[var(--ds-brand-400)] hover:shadow-md',
          'active:shadow-sm',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ds-brand-500)] focus-visible:ring-offset-2',
          'transition-all duration-[var(--ds-duration-base)]',
        ].join(' ') : '',
        className,
      ].filter(Boolean).join(' ')}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      onClick={onClick}
      onKeyDown={interactive ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      } : undefined}
    >
      {/* Top row: label + icon */}
      <div className="flex items-center justify-between gap-2">
        <p className="text-sm text-[var(--ds-text-muted)] font-medium truncate">{label}</p>
        {icon && (
          <span className="shrink-0 h-8 w-8 flex items-center justify-center rounded-lg bg-[var(--ds-bg-subtle)] text-[var(--ds-text-muted)]" aria-hidden="true">
            {icon}
          </span>
        )}
      </div>

      {/* Value row */}
      <div className="flex items-end justify-between gap-2">
        <p className="text-3xl font-bold text-[var(--ds-text-primary)] leading-none tabular-nums">
          {value}
        </p>

        {/* Sparkline */}
        {sparkline && sparkline.length > 1 && (
          <Sparkline
            data={sparkline}
            trend={
              variant === 'success' ? 'positive' :
              variant === 'danger'  ? 'negative' : 'neutral'
            }
            width={80}
            height={36}
          />
        )}
      </div>

      {/* Delta + period */}
      {(delta || annotation) && (
        <div className="flex items-center gap-2 flex-wrap">
          {delta && (
            <Badge
              variant={BADGE_VARIANT_MAP[variant]}
              appearance="subtle"
              size="sm"
              icon={TrendIconEl ? <TrendIconEl size={11} weight="bold" /> : undefined}
            >
              {delta}
            </Badge>
          )}
          {period && (
            <span className="text-xs text-[var(--ds-text-muted)]">{period}</span>
          )}
          {annotation && !delta && (
            <span className="text-xs text-[var(--ds-text-muted)]">{annotation}</span>
          )}
        </div>
      )}

      {annotation && delta && (
        <p className="text-xs text-[var(--ds-text-muted)] -mt-1">{annotation}</p>
      )}
    </div>
  );
}

// ─── StatCardGroup ────────────────────────────────────────────────────────────
// Responsive grid that auto-fits 2–4 columns

export interface StatCardGroupProps {
  children:   React.ReactNode;
  cols?:      2 | 3 | 4;
  className?: string;
}

const COLS: Record<2 | 3 | 4, string> = {
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
};

export function StatCardGroup({ children, cols = 4, className = '' }: StatCardGroupProps) {
  return (
    <div className={['grid gap-4', COLS[cols], className].join(' ')}>
      {children}
    </div>
  );
}
