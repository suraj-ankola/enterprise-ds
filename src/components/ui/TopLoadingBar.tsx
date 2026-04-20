'use client';

import React, { useEffect, useRef, useState } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

export type TopLoadingBarVariant = 'brand' | 'success' | 'warning' | 'danger';

export interface TopLoadingBarProps {
  /** 0–100. When 100 the bar completes and fades out automatically. */
  progress?:  number;
  /** Animate an indeterminate bar that doesn't require manual progress updates */
  indeterminate?: boolean;
  variant?:   TopLoadingBarVariant;
  /** Bar height in px */
  height?:    number;
  className?: string;
}

// ─── Colour map ───────────────────────────────────────────────────────────────

const COLOR: Record<TopLoadingBarVariant, string> = {
  brand:   'bg-[var(--ds-brand-600)]',
  success: 'bg-[var(--ds-success-icon)]',
  warning: 'bg-[var(--ds-warning-icon)]',
  danger:  'bg-[var(--ds-danger-icon)]',
};

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * Thin progress bar pinned to the top of its nearest positioned ancestor.
 * - Deterministic: pass `progress` (0–100) to control position
 * - Indeterminate: pass `indeterminate` for an animated sweep
 * - At progress=100 the bar finishes and fades out after 400ms
 *
 * Typical usage: wrap a page layout or portal-render at the document root.
 */
export function TopLoadingBar({
  progress      = 0,
  indeterminate = false,
  variant       = 'brand',
  height        = 3,
  className     = '',
}: TopLoadingBarProps) {
  const [visible, setVisible] = useState(true);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clampedProgress = Math.max(0, Math.min(100, progress));
  const complete        = !indeterminate && clampedProgress >= 100;

  // Fade out when complete
  useEffect(() => {
    if (complete) {
      timerRef.current = setTimeout(() => setVisible(false), 400);
    } else {
      setVisible(true);
      if (timerRef.current) clearTimeout(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [complete]);

  if (!visible) return null;

  return (
    <div
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={indeterminate ? undefined : clampedProgress}
      aria-label="Page loading"
      className={[
        'absolute top-0 left-0 right-0 overflow-hidden',
        className,
      ].filter(Boolean).join(' ')}
      style={{ height }}
    >
      {indeterminate ? (
        // Indeterminate — CSS-animated sweep via inline keyframes
        <div
          className={['h-full rounded-r-full', COLOR[variant]].join(' ')}
          style={{
            animation: 'topbar-indeterminate 1.5s ease-in-out infinite',
            width: '40%',
          }}
        />
      ) : (
        <div
          className={[
            'h-full rounded-r-full transition-all duration-300 ease-out',
            COLOR[variant],
          ].join(' ')}
          style={{ width: `${clampedProgress}%` }}
        />
      )}

      {/* Keyframes injected once via a style tag */}
      <style>{`
        @keyframes topbar-indeterminate {
          0%   { transform: translateX(-100%); }
          60%  { transform: translateX(160%); }
          100% { transform: translateX(160%); }
        }
      `}</style>
    </div>
  );
}
