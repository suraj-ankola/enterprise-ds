import React from 'react';

export type CardVariant = 'default' | 'outlined' | 'elevated' | 'ghost';
export type CardPadding = 'none' | 'sm' | 'md' | 'lg';

// ─── Card (root) ──────────────────────────────────────────────────────────────

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?:   CardVariant;
  padding?:   CardPadding;
  clickable?: boolean;
  children:   React.ReactNode;
}

const VARIANT: Record<CardVariant, string> = {
  default:  'bg-[var(--ds-bg-surface)] border border-[var(--ds-border-base)]',
  outlined: 'bg-[var(--ds-bg-surface)] border-2 border-[var(--ds-border-strong)]',
  elevated: 'bg-[var(--ds-bg-surface)] border border-[var(--ds-border-base)] shadow-md',
  ghost:    'bg-transparent border border-transparent',
};

const PADDING: Record<CardPadding, string> = {
  none: '',
  sm:   'p-3',
  md:   'p-5',
  lg:   'p-6',
};

const CLICKABLE = [
  'cursor-pointer',
  'hover:border-[var(--ds-brand-400)] hover:shadow-md',
  'active:shadow-sm',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ds-brand-500)] focus-visible:ring-offset-2',
  'transition-all',
].join(' ');

export function Card({
  variant   = 'default',
  padding   = 'md',
  clickable = false,
  className = '',
  children,
  onClick,
  onKeyDown,
  ...props
}: CardProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (clickable && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      (e.currentTarget as HTMLElement).click();
    }
    onKeyDown?.(e);
  };

  return (
    <div
      className={[
        'rounded-xl transition-colors duration-150',
        VARIANT[variant],
        PADDING[padding],
        clickable ? CLICKABLE : '',
        className,
      ].filter(Boolean).join(' ')}
      role={clickable ? 'button' : undefined}
      tabIndex={clickable ? 0 : undefined}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      {...props}
    >
      {children}
    </div>
  );
}

// ─── CardHeader ───────────────────────────────────────────────────────────────

export interface CardHeaderProps {
  title:     string;
  subtitle?: string;
  icon?:     React.ReactNode;
  action?:   React.ReactNode;
  className?: string;
}

export function CardHeader({ title, subtitle, icon, action, className = '' }: CardHeaderProps) {
  return (
    <div className={['flex items-start justify-between gap-4 mb-4', className].join(' ')}>
      <div className="flex items-start gap-3 min-w-0">
        {icon && (
          <span className="mt-0.5 shrink-0 text-[var(--ds-text-muted)]">{icon}</span>
        )}
        <div className="min-w-0">
          <h3 className="text-sm font-semibold text-[var(--ds-text-primary)] truncate">
            {title}
          </h3>
          {subtitle && (
            <p className="mt-0.5 text-xs text-[var(--ds-text-muted)] truncate">
              {subtitle}
            </p>
          )}
        </div>
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

// ─── CardBody ─────────────────────────────────────────────────────────────────

export function CardBody({ className = '', children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={['text-sm text-[var(--ds-text-secondary)]', className].join(' ')}>
      {children}
    </div>
  );
}

// ─── CardFooter ───────────────────────────────────────────────────────────────

export function CardFooter({
  divider = false,
  className = '',
  children,
}: { divider?: boolean; className?: string; children: React.ReactNode }) {
  return (
    <div className={[
      'mt-4 flex items-center justify-between gap-2',
      divider ? 'pt-4 border-t border-[var(--ds-border-base)]' : '',
      className,
    ].filter(Boolean).join(' ')}>
      {children}
    </div>
  );
}

// ─── CardDivider ──────────────────────────────────────────────────────────────

export function CardDivider({ className = '' }: { className?: string }) {
  return <hr className={['my-4 border-[var(--ds-border-base)]', className].join(' ')} />;
}

// ─── CardSkeleton ─────────────────────────────────────────────────────────────

function SkeletonLine({ width = 'full' }: { width?: 'full' | '3/4' | '1/2' | '1/3' }) {
  return (
    <div className={[
      'h-3 rounded-md bg-[var(--ds-bg-subtle)] animate-pulse',
      width === 'full' ? 'w-full' : width === '3/4' ? 'w-3/4' : width === '1/2' ? 'w-1/2' : 'w-1/3',
    ].join(' ')} />
  );
}

export function CardSkeleton({
  lines = 3,
  showHeader = true,
  className = '',
}: { lines?: number; showHeader?: boolean; className?: string }) {
  return (
    <Card className={className}>
      {showHeader && (
        <div className="flex items-center gap-3 mb-4">
          <div className="h-8 w-8 rounded-lg bg-[var(--ds-bg-subtle)] animate-pulse shrink-0" />
          <div className="flex-1 space-y-2">
            <SkeletonLine width="1/2" />
            <SkeletonLine width="1/3" />
          </div>
        </div>
      )}
      <div className="space-y-2.5">
        {Array.from({ length: lines }).map((_, i) => (
          <SkeletonLine key={i} width={i === lines - 1 ? '3/4' : 'full'} />
        ))}
      </div>
    </Card>
  );
}
