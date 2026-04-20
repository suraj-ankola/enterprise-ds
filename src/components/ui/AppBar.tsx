import React from 'react';
import { ArrowLeftIcon } from '@phosphor-icons/react';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface AppBarProps {
  title:        string;
  /** Subtitle / description rendered below the title */
  subtitle?:    string;
  /** Breadcrumb component or any node rendered above the title */
  breadcrumb?:  React.ReactNode;
  /** Buttons, menus, or any action nodes aligned to the right */
  actions?:     React.ReactNode;
  /** Renders a back arrow button (link when href provided, button when onBack provided) */
  backHref?:    string;
  onBack?:      () => void;
  /** Show a bottom border separating AppBar from page content */
  bordered?:    boolean;
  /** Stick to top of viewport on scroll */
  sticky?:      boolean;
  className?:   string;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function AppBar({
  title,
  subtitle,
  breadcrumb,
  actions,
  backHref,
  onBack,
  bordered  = true,
  sticky    = false,
  className = '',
}: AppBarProps) {
  const hasBack = backHref !== undefined || onBack !== undefined;

  const backButtonClasses = [
    'inline-flex items-center justify-center shrink-0',
    'h-8 w-8 rounded-lg -ml-1 mr-1',
    'text-[var(--ds-text-secondary)] hover:text-[var(--ds-text-primary)]',
    'hover:bg-[var(--ds-bg-subtle)] transition-colors',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ds-brand-500)]',
  ].join(' ');

  const BackElement = hasBack && (
    backHref ? (
      <a href={backHref} className={backButtonClasses} aria-label="Go back">
        <ArrowLeftIcon size={18} />
      </a>
    ) : (
      <button type="button" onClick={onBack} className={backButtonClasses} aria-label="Go back">
        <ArrowLeftIcon size={18} />
      </button>
    )
  );

  return (
    <header
      className={[
        'w-full bg-[var(--ds-bg-surface)]',
        bordered ? 'border-b border-[var(--ds-border-base)]' : '',
        sticky   ? 'sticky top-0 z-10' : '',
        className,
      ].filter(Boolean).join(' ')}
    >
      <div className="flex items-start justify-between gap-4 px-6 py-4">

        {/* Left: back + title block */}
        <div className="flex items-start gap-0 min-w-0">
          {BackElement}

          <div className="flex flex-col gap-0.5 min-w-0">
            {breadcrumb && (
              <div className="mb-1">{breadcrumb}</div>
            )}
            <h1 className="text-lg font-semibold leading-snug text-[var(--ds-text-primary)] truncate">
              {title}
            </h1>
            {subtitle && (
              <p className="text-sm text-[var(--ds-text-muted)] leading-snug">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {/* Right: actions */}
        {actions && (
          <div className="flex items-center gap-2 shrink-0 pt-0.5">
            {actions}
          </div>
        )}
      </div>
    </header>
  );
}
