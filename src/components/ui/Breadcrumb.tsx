import React from 'react';
import { CaretRightIcon } from '@phosphor-icons/react';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface BreadcrumbItem {
  label:    React.ReactNode;
  href?:    string;
  onClick?: () => void;
  icon?:    React.ReactNode;
}

export interface BreadcrumbProps {
  items:      BreadcrumbItem[];
  /** Custom separator — defaults to CaretRight icon */
  separator?: React.ReactNode;
  className?: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function Breadcrumb({ items, separator, className = '' }: BreadcrumbProps) {
  const sep = separator ?? <CaretRightIcon size={12} className="text-[var(--ds-text-muted)]" aria-hidden="true" />;

  return (
    <nav aria-label="Breadcrumb" className={['flex items-center', className].filter(Boolean).join(' ')}>
      <ol className="flex items-center flex-wrap gap-1" role="list">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;

          const content = (
            <span className="flex items-center gap-1.5">
              {item.icon && (
                <span className="shrink-0 flex items-center" aria-hidden="true">{item.icon}</span>
              )}
              {item.label}
            </span>
          );

          return (
            <li key={i} className="flex items-center gap-1">
              {isLast ? (
                <span
                  aria-current="page"
                  className="text-sm font-medium text-[var(--ds-text-primary)] truncate max-w-[200px]"
                >
                  {content}
                </span>
              ) : (item.href || item.onClick) ? (
                <a
                  href={item.href}
                  onClick={item.onClick ? (e) => { if (!item.href) e.preventDefault(); item.onClick!(); } : undefined}
                  className={[
                    'text-sm text-[var(--ds-text-muted)] hover:text-[var(--ds-text-primary)] transition-colors',
                    'truncate max-w-[160px]',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ds-brand-500)] rounded',
                  ].join(' ')}
                >
                  {content}
                </a>
              ) : (
                <span className="text-sm text-[var(--ds-text-muted)] truncate max-w-[160px]">
                  {content}
                </span>
              )}

              {!isLast && (
                <span className="shrink-0 flex items-center">{sep}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
