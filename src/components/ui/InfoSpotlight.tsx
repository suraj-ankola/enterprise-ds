'use client';

import React from 'react';
import { XIcon, ArrowLeftIcon, ArrowRightIcon } from '@phosphor-icons/react';

// ─── Types ────────────────────────────────────────────────────────────────────

export type InfoSpotlightPlacement = 'top' | 'bottom' | 'left' | 'right';

export interface InfoSpotlightProps {
  title:          string;
  body:           React.ReactNode;
  /** Current step (1-based) */
  step?:          number;
  /** Total steps in the tour */
  totalSteps?:    number;
  placement?:     InfoSpotlightPlacement;
  onClose?:       () => void;
  onNext?:        () => void;
  onPrev?:        () => void;
  /** Custom label for the final step CTA */
  doneLabel?:     string;
  /** Dim the rest of the page behind the spotlight */
  showOverlay?:   boolean;
  onOverlayClick?: () => void;
  className?:     string;
}

// ─── Arrow placement ─────────────────────────────────────────────────────────

// The arrow points TOWARD the target element, so if placement="bottom" (bubble below target)
// the arrow points up (toward the target).
const ARROW: Record<InfoSpotlightPlacement, { wrapper: string; triangle: string }> = {
  top: {
    wrapper:  'bottom-full left-1/2 -translate-x-1/2 pb-2',
    triangle: 'absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-[var(--ds-bg-surface)]',
  },
  bottom: {
    wrapper:  'top-full left-1/2 -translate-x-1/2 pt-2',
    triangle: 'absolute bottom-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-[var(--ds-bg-surface)]',
  },
  left: {
    wrapper:  'right-full top-1/2 -translate-y-1/2 pr-2',
    triangle: 'absolute left-full top-1/2 -translate-y-1/2 w-0 h-0 border-t-8 border-b-8 border-l-8 border-t-transparent border-b-transparent border-l-[var(--ds-bg-surface)]',
  },
  right: {
    wrapper:  'left-full top-1/2 -translate-y-1/2 pl-2',
    triangle: 'absolute right-full top-1/2 -translate-y-1/2 w-0 h-0 border-t-8 border-b-8 border-r-8 border-t-transparent border-b-transparent border-r-[var(--ds-bg-surface)]',
  },
};

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * Coach-mark bubble for feature announcements and onboarding tours.
 * Position this absolutely relative to its anchor element using the `placement` prop.
 * The parent element should have `position: relative`.
 */
export function InfoSpotlight({
  title,
  body,
  step,
  totalSteps,
  placement      = 'bottom',
  onClose,
  onNext,
  onPrev,
  doneLabel      = 'Done',
  showOverlay    = false,
  onOverlayClick,
  className      = '',
}: InfoSpotlightProps) {
  const hasPagination = step !== undefined && totalSteps !== undefined;
  const isLast        = hasPagination && step === totalSteps;
  const arrow         = ARROW[placement];

  return (
    <>
      {/* Backdrop overlay */}
      {showOverlay && (
        <div
          className="fixed inset-0 z-40 bg-black/40"
          aria-hidden="true"
          onClick={onOverlayClick}
        />
      )}

      {/* Bubble */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={[
          'absolute z-50 flex flex-col gap-3',
          'w-72 p-4 rounded-xl',
          'bg-[var(--ds-bg-surface)] shadow-xl',
          'border border-[var(--ds-border-base)]',
          arrow.wrapper,
          className,
        ].filter(Boolean).join(' ')}
      >
        {/* Arrow */}
        <div className={arrow.triangle} aria-hidden="true" />

        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <p className="text-sm font-semibold text-[var(--ds-text-primary)] leading-snug">
            {title}
          </p>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className={[
                'shrink-0 -mt-0.5 -mr-0.5 h-6 w-6 rounded flex items-center justify-center',
                'text-[var(--ds-text-muted)] hover:text-[var(--ds-text-primary)]',
                'hover:bg-[var(--ds-bg-subtle)] transition-colors',
              ].join(' ')}
            >
              <XIcon size={14} />
            </button>
          )}
        </div>

        {/* Body */}
        <div className="text-sm text-[var(--ds-text-secondary)] leading-relaxed">
          {body}
        </div>

        {/* Footer: pagination + navigation */}
        {(hasPagination || onNext || onPrev) && (
          <div className="flex items-center justify-between gap-2 pt-1">
            {/* Step dots */}
            {hasPagination && (
              <div className="flex items-center gap-1">
                {Array.from({ length: totalSteps! }, (_, i) => (
                  <span
                    key={i}
                    className={[
                      'rounded-full transition-all',
                      i + 1 === step
                        ? 'h-1.5 w-4 bg-[var(--ds-brand-600)]'
                        : 'h-1.5 w-1.5 bg-[var(--ds-border-strong)]',
                    ].join(' ')}
                    aria-hidden="true"
                  />
                ))}
              </div>
            )}

            {/* Nav buttons */}
            <div className="flex items-center gap-1.5 ml-auto">
              {onPrev && step !== undefined && step > 1 && (
                <button
                  type="button"
                  onClick={onPrev}
                  className={[
                    'inline-flex items-center gap-1 px-2.5 h-7 rounded-lg text-xs font-medium',
                    'text-[var(--ds-text-secondary)] hover:text-[var(--ds-text-primary)]',
                    'hover:bg-[var(--ds-bg-subtle)] transition-colors',
                  ].join(' ')}
                >
                  <ArrowLeftIcon size={12} /> Back
                </button>
              )}
              {onNext && (
                <button
                  type="button"
                  onClick={onNext}
                  className={[
                    'inline-flex items-center gap-1 px-2.5 h-7 rounded-lg text-xs font-medium',
                    'bg-[var(--ds-brand-600)] text-[var(--ds-brand-text)] hover:bg-[var(--ds-brand-700)]',
                    'transition-colors',
                  ].join(' ')}
                >
                  {isLast ? doneLabel : <><span>Next</span><ArrowRightIcon size={12} /></>}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
