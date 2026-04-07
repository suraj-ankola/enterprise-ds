'use client';
import React, { useEffect, useRef, useState } from 'react';
import { XIcon, ArrowLeftIcon, ArrowRightIcon, SparkleIcon } from '@phosphor-icons/react';

// ─── Types ────────────────────────────────────────────────────────────────────

export type TourPlacement = 'top' | 'bottom' | 'left' | 'right' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end';

export interface TourStep {
  /** CSS selector or element ref for the target element */
  target?:      string;
  title:        string;
  content:      React.ReactNode;
  placement?:   TourPlacement;
}

export interface GuidedTourProps {
  steps:        TourStep[];
  active:       boolean;
  onComplete:   () => void;
  onSkip?:      () => void;
  /** Overlay opacity, 0–1. Default 0.5 */
  overlayOpacity?: number;
  className?:   string;
}

// ─── Spotlight Tooltip ────────────────────────────────────────────────────────
// Used standalone when you have the target element rect

export interface SpotlightTooltipProps {
  step:        TourStep;
  currentStep: number;
  totalSteps:  number;
  targetRect?: DOMRect | null;
  onNext:      () => void;
  onPrev:      () => void;
  onSkip?:     () => void;
  onClose:     () => void;
  isLast:      boolean;
  isFirst:     boolean;
}

function getTooltipPosition(
  rect: DOMRect | null | undefined,
  placement: TourPlacement = 'bottom',
  tooltipW = 300,
  tooltipH = 160,
  padding = 12,
) {
  if (!rect) return { top: '50%', left: '50%', transform: 'translate(-50%,-50%)' };

  const vw = window.innerWidth;
  const vh = window.innerHeight;

  let top = 0;
  let left = 0;

  switch (placement) {
    case 'bottom':
    case 'bottom-start':
    case 'bottom-end':
      top  = rect.bottom + padding;
      left = placement === 'bottom-end' ? rect.right - tooltipW :
             placement === 'bottom-start' ? rect.left :
             rect.left + rect.width / 2 - tooltipW / 2;
      break;
    case 'top':
    case 'top-start':
    case 'top-end':
      top  = rect.top - tooltipH - padding;
      left = placement === 'top-end' ? rect.right - tooltipW :
             placement === 'top-start' ? rect.left :
             rect.left + rect.width / 2 - tooltipW / 2;
      break;
    case 'left':
      top  = rect.top + rect.height / 2 - tooltipH / 2;
      left = rect.left - tooltipW - padding;
      break;
    case 'right':
      top  = rect.top + rect.height / 2 - tooltipH / 2;
      left = rect.right + padding;
      break;
  }

  // Clamp to viewport
  left = Math.max(8, Math.min(left, vw - tooltipW - 8));
  top  = Math.max(8, Math.min(top,  vh - tooltipH - 8));

  return { top: `${top}px`, left: `${left}px` };
}

export function SpotlightTooltip({
  step,
  currentStep,
  totalSteps,
  targetRect,
  onNext,
  onPrev,
  onSkip,
  onClose,
  isLast,
  isFirst,
}: SpotlightTooltipProps) {
  const pos = getTooltipPosition(targetRect, step.placement);

  return (
    <div
      style={{ ...pos, position: 'fixed', zIndex: 10000, width: 300 }}
      className="bg-[var(--ds-bg-raised)] border border-[var(--ds-border-base)] rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-200"
    >
      {/* Header */}
      <div className="flex items-start justify-between px-4 pt-4 pb-2">
        <div className="flex items-center gap-2">
          <SparkleIcon size={14} className="text-[var(--ds-brand-500)]" weight="fill" />
          <span className="text-[10px] font-bold text-[var(--ds-brand-600)] uppercase tracking-wide">
            {currentStep + 1} / {totalSteps}
          </span>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="p-0.5 rounded text-[var(--ds-text-muted)] hover:text-[var(--ds-text-primary)]"
        >
          <XIcon size={13} />
        </button>
      </div>

      {/* Content */}
      <div className="px-4 pb-3 space-y-1">
        <h3 className="text-sm font-semibold text-[var(--ds-text-primary)]">{step.title}</h3>
        <div className="text-xs text-[var(--ds-text-secondary)] leading-relaxed">{step.content}</div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-4 py-3 bg-[var(--ds-bg-subtle)] border-t border-[var(--ds-border-base)]">
        <div className="flex gap-1">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div
              key={i}
              className={[
                'h-1.5 rounded-full transition-all',
                i === currentStep ? 'w-4 bg-[var(--ds-brand-500)]' : 'w-1.5 bg-[var(--ds-border-base)]',
              ].join(' ')}
            />
          ))}
        </div>
        <div className="flex items-center gap-1">
          {onSkip && !isLast && (
            <button
              type="button"
              onClick={onSkip}
              className="px-2 py-1 text-[11px] text-[var(--ds-text-muted)] hover:text-[var(--ds-text-primary)]"
            >
              Skip tour
            </button>
          )}
          {!isFirst && (
            <button
              type="button"
              onClick={onPrev}
              className="p-1.5 rounded-lg border border-[var(--ds-border-base)] hover:bg-[var(--ds-bg-raised)] text-[var(--ds-text-muted)]"
            >
              <ArrowLeftIcon size={12} />
            </button>
          )}
          <button
            type="button"
            onClick={onNext}
            className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg bg-[var(--ds-brand-600)] text-white hover:bg-[var(--ds-brand-700)]"
          >
            {isLast ? 'Done' : 'Next'}
            {!isLast && <ArrowRightIcon size={11} />}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── GuidedTour ───────────────────────────────────────────────────────────────

export function GuidedTour({
  steps,
  active,
  onComplete,
  onSkip,
  overlayOpacity = 0.5,
  className = '',
}: GuidedTourProps) {
  const [current, setCurrent]     = useState(0);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);

  const step   = steps[current];
  const isLast  = current === steps.length - 1;
  const isFirst = current === 0;

  useEffect(() => {
    if (!active) return;
    if (!step.target) { setTargetRect(null); return; }
    const el = document.querySelector(step.target);
    if (el) {
      setTargetRect(el.getBoundingClientRect());
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      setTargetRect(null);
    }
  }, [active, current, step.target]);

  if (!active) return null;

  function next() {
    if (isLast) onComplete();
    else setCurrent(c => c + 1);
  }

  function prev() {
    if (!isFirst) setCurrent(c => c - 1);
  }

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-[9999]"
        style={{ background: `rgba(0,0,0,${overlayOpacity})` }}
        onClick={onSkip ?? onComplete}
      />
      {/* Tooltip */}
      <SpotlightTooltip
        step={step}
        currentStep={current}
        totalSteps={steps.length}
        targetRect={targetRect}
        onNext={next}
        onPrev={prev}
        onSkip={onSkip}
        onClose={onSkip ?? onComplete}
        isLast={isLast}
        isFirst={isFirst}
      />
    </>
  );
}
