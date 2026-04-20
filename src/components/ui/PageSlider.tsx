'use client';

import React, { useState, useCallback, useRef } from 'react';
import { ArrowLeftIcon, ArrowRightIcon } from '@phosphor-icons/react';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface PageSliderProps {
  children:           React.ReactNode[];
  /** Controlled page index (0-based) */
  currentPage?:       number;
  /** Initial page for uncontrolled usage */
  defaultPage?:       number;
  onChange?:          (page: number) => void;
  /** Show prev/next arrow buttons */
  showArrows?:        boolean;
  /** Show dot indicator at bottom */
  showDots?:          boolean;
  /** Swipe to navigate on touch/mouse drag */
  swipeable?:         boolean;
  className?:         string;
}

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * Full-width slider that shows one page at a time with a slide transition.
 * Use for onboarding flows, multi-step wizards, or any paginated page layout.
 */
export function PageSlider({
  children,
  currentPage,
  defaultPage   = 0,
  onChange,
  showArrows    = true,
  showDots      = true,
  swipeable     = true,
  className     = '',
}: PageSliderProps) {
  const total        = React.Children.count(children);
  const isControlled = currentPage !== undefined;
  const [internal, setInternal] = useState(defaultPage);
  const page = isControlled ? (currentPage ?? 0) : internal;

  const dragStart = useRef<number | null>(null);

  const goTo = useCallback((next: number) => {
    const clamped = Math.max(0, Math.min(next, total - 1));
    if (!isControlled) setInternal(clamped);
    onChange?.(clamped);
  }, [isControlled, onChange, total]);

  // Touch / mouse swipe
  function onPointerDown(e: React.PointerEvent) {
    if (!swipeable) return;
    dragStart.current = e.clientX;
  }
  function onPointerUp(e: React.PointerEvent) {
    if (!swipeable || dragStart.current === null) return;
    const delta = dragStart.current - e.clientX;
    if (Math.abs(delta) > 40) goTo(page + (delta > 0 ? 1 : -1));
    dragStart.current = null;
  }

  return (
    <div className={['relative flex flex-col overflow-hidden', className].filter(Boolean).join(' ')}>

      {/* Slide track */}
      <div
        className="flex transition-transform duration-300 ease-[var(--ds-ease-out)]"
        style={{ transform: `translateX(-${page * 100}%)` }}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
      >
        {React.Children.map(children, (child, i) => (
          <div
            key={i}
            className="w-full shrink-0"
            aria-hidden={i !== page}
            role="tabpanel"
            id={`page-slide-${i}`}
          >
            {child}
          </div>
        ))}
      </div>

      {/* Controls row */}
      {(showArrows || showDots) && (
        <div className="flex items-center justify-between gap-4 px-4 py-3">

          {showArrows ? (
            <button
              type="button"
              onClick={() => goTo(page - 1)}
              disabled={page === 0}
              aria-label="Previous page"
              className={[
                'inline-flex items-center gap-1.5 px-3 h-8 rounded-lg text-sm font-medium transition-colors',
                'text-[var(--ds-text-secondary)] hover:text-[var(--ds-text-primary)]',
                'hover:bg-[var(--ds-bg-subtle)]',
                'disabled:opacity-30 disabled:pointer-events-none',
              ].join(' ')}
            >
              <ArrowLeftIcon size={14} /> Back
            </button>
          ) : <span />}

          {showDots && (
            <div className="flex items-center gap-1.5" role="tablist" aria-label="Pages">
              {Array.from({ length: total }, (_, i) => (
                <button
                  key={i}
                  type="button"
                  role="tab"
                  aria-selected={i === page}
                  aria-controls={`page-slide-${i}`}
                  onClick={() => goTo(i)}
                  className={[
                    'rounded-full transition-all duration-200',
                    i === page
                      ? 'w-5 h-2 bg-[var(--ds-brand-600)]'
                      : 'w-2 h-2 bg-[var(--ds-border-strong)] hover:bg-[var(--ds-text-muted)]',
                  ].join(' ')}
                  aria-label={`Go to page ${i + 1}`}
                />
              ))}
            </div>
          )}

          {showArrows ? (
            <button
              type="button"
              onClick={() => goTo(page + 1)}
              disabled={page === total - 1}
              aria-label="Next page"
              className={[
                'inline-flex items-center gap-1.5 px-3 h-8 rounded-lg text-sm font-medium transition-colors',
                'text-[var(--ds-text-secondary)] hover:text-[var(--ds-text-primary)]',
                'hover:bg-[var(--ds-bg-subtle)]',
                'disabled:opacity-30 disabled:pointer-events-none',
              ].join(' ')}
            >
              Next <ArrowRightIcon size={14} />
            </button>
          ) : <span />}
        </div>
      )}
    </div>
  );
}
