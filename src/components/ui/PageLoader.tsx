import React from 'react';
import { Spinner } from './Spinner';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface PageLoaderProps {
  /** Primary message shown below the spinner */
  message?:    string;
  /** Smaller supporting text */
  subMessage?: string;
  /** Logo or app icon shown above the spinner */
  logo?:       React.ReactNode;
  /** Fill the parent container instead of the full viewport */
  contained?:  boolean;
  className?:  string;
}

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * Full-page (or full-container) loading state.
 * Use for initial page loads, route transitions, or gated content.
 * For smaller panel loading states use `SpinnerOverlay` from Spinner.tsx.
 */
export function PageLoader({
  message     = 'Loading…',
  subMessage,
  logo,
  contained   = false,
  className   = '',
}: PageLoaderProps) {
  return (
    <div
      role="status"
      aria-label={message}
      aria-busy="true"
      className={[
        'flex flex-col items-center justify-center gap-4',
        'bg-[var(--ds-bg-base)]',
        contained ? 'w-full h-full min-h-[240px]' : 'fixed inset-0 z-50',
        className,
      ].filter(Boolean).join(' ')}
    >
      {logo && (
        <div className="mb-2">{logo}</div>
      )}

      <Spinner size="lg" variant="brand" label={message} />

      <div className="flex flex-col items-center gap-1 text-center">
        {message && (
          <p className="text-sm font-medium text-[var(--ds-text-primary)]">
            {message}
          </p>
        )}
        {subMessage && (
          <p className="text-xs text-[var(--ds-text-muted)] max-w-xs">
            {subMessage}
          </p>
        )}
      </div>
    </div>
  );
}
