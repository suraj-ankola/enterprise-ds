'use client';
import React, { useState } from 'react';
import {
  CheckCircleIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  XIcon,
  SparkleIcon,
} from '@phosphor-icons/react';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface OnboardingStep {
  id:           string;
  title:        string;
  description?: string;
  /** Visual content rendered in the card body */
  content?:     React.ReactNode;
  /** Icon rendered in the step indicator */
  icon?:        React.ReactNode;
  /** If true, user cannot proceed until this step is explicitly completed */
  required?:    boolean;
  /** Override the "Next" button label */
  nextLabel?:   string;
  /** Validation — return an error string to block progression, null/undefined to allow */
  validate?:    () => string | null | undefined;
}

export interface OnboardingFlowProps {
  steps:          OnboardingStep[];
  onComplete:     () => void;
  onSkip?:        () => void;
  onStepChange?:  (index: number, step: OnboardingStep) => void;
  /** Show progress bar */
  showProgress?:  boolean;
  /** Allow clicking already-completed steps to go back */
  clickableSteps?: boolean;
  className?:     string;
}

// ─── ProgressBar ─────────────────────────────────────────────────────────────

function ProgressBar({ current, total }: { current: number; total: number }) {
  const pct = total === 1 ? 100 : Math.round((current / (total - 1)) * 100);
  return (
    <div className="h-1 rounded-full bg-[var(--ds-bg-subtle)] overflow-hidden">
      <div
        className="h-full rounded-full bg-[var(--ds-brand-500)] transition-all duration-500"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

// ─── StepIndicator ────────────────────────────────────────────────────────────

function StepIndicator({
  steps,
  current,
  completed,
  clickable,
  onGoto,
}: {
  steps:    OnboardingStep[];
  current:  number;
  completed: Set<number>;
  clickable: boolean;
  onGoto:   (i: number) => void;
}) {
  return (
    <div className="flex items-center gap-1">
      {steps.map((step, i) => {
        const isDone    = completed.has(i);
        const isCurrent = i === current;
        const canClick  = clickable && (isDone || i < current);

        return (
          <React.Fragment key={step.id}>
            <button
              type="button"
              disabled={!canClick}
              onClick={() => canClick && onGoto(i)}
              className={[
                'flex items-center justify-center rounded-full transition-all',
                isCurrent  ? 'h-7 w-7 bg-[var(--ds-brand-600)] text-white shadow-md'              :
                isDone     ? 'h-6 w-6 bg-[var(--ds-success-bg)] text-[var(--ds-success-text)] border border-[var(--ds-success-border)] hover:opacity-80' :
                             'h-6 w-6 bg-[var(--ds-bg-subtle)] text-[var(--ds-text-muted)] border border-[var(--ds-border-base)]',
                canClick ? 'cursor-pointer' : 'cursor-default',
              ].join(' ')}
              title={step.title}
            >
              {isDone && !isCurrent
                ? <CheckCircleIcon size={14} weight="fill" />
                : <span className="text-[11px] font-bold">{i + 1}</span>}
            </button>
            {i < steps.length - 1 && (
              <div className={['flex-1 h-px mx-0.5', isDone ? 'bg-[var(--ds-success-border)]' : 'bg-[var(--ds-border-base)]'].join(' ')} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

// ─── OnboardingFlow ───────────────────────────────────────────────────────────

export function OnboardingFlow({
  steps,
  onComplete,
  onSkip,
  onStepChange,
  showProgress  = true,
  clickableSteps = true,
  className = '',
}: OnboardingFlowProps) {
  const [current,   setCurrent]   = useState(0);
  const [completed, setCompleted] = useState<Set<number>>(new Set());
  const [error,     setError]     = useState<string | null>(null);

  const step    = steps[current];
  const isLast  = current === steps.length - 1;
  const isFirst = current === 0;

  function gotoStep(index: number) {
    setCurrent(index);
    setError(null);
    onStepChange?.(index, steps[index]);
  }

  function next() {
    const err = step.validate?.();
    if (err) { setError(err); return; }
    setError(null);
    setCompleted(prev => new Set([...prev, current]));
    if (isLast) {
      onComplete();
    } else {
      gotoStep(current + 1);
    }
  }

  function back() {
    if (!isFirst) gotoStep(current - 1);
  }

  return (
    <div className={['flex flex-col gap-6', className].join(' ')}>
      {/* Header with step indicator */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <SparkleIcon size={16} className="text-[var(--ds-brand-600)]" weight="fill" />
            <span className="text-xs font-semibold text-[var(--ds-text-muted)]">
              Step {current + 1} of {steps.length}
            </span>
          </div>
          {onSkip && (
            <button
              type="button"
              onClick={onSkip}
              className="flex items-center gap-1 text-xs text-[var(--ds-text-muted)] hover:text-[var(--ds-text-primary)]"
            >
              <XIcon size={12} /> Skip setup
            </button>
          )}
        </div>
        <StepIndicator
          steps={steps}
          current={current}
          completed={completed}
          clickable={clickableSteps}
          onGoto={gotoStep}
        />
        {showProgress && <ProgressBar current={current} total={steps.length} />}
      </div>

      {/* Step card */}
      <div className="bg-[var(--ds-bg-surface)] border border-[var(--ds-border-base)] rounded-xl overflow-hidden">
        <div className="px-6 py-5 border-b border-[var(--ds-border-base)]">
          <div className="flex items-start gap-3">
            {step.icon && (
              <div className="h-9 w-9 rounded-xl bg-[var(--ds-brand-50)] flex items-center justify-center text-[var(--ds-brand-600)] shrink-0">
                {step.icon}
              </div>
            )}
            <div>
              <h2 className="text-base font-semibold text-[var(--ds-text-primary)]">{step.title}</h2>
              {step.description && <p className="text-sm text-[var(--ds-text-muted)] mt-0.5">{step.description}</p>}
            </div>
          </div>
        </div>

        {step.content && (
          <div className="px-6 py-5">{step.content}</div>
        )}

        {error && (
          <div className="px-6 pb-4">
            <p className="text-sm text-[var(--ds-danger-text)] bg-[var(--ds-danger-bg)] border border-[var(--ds-danger-border)] rounded-lg px-3 py-2">
              {error}
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="px-6 py-4 bg-[var(--ds-bg-subtle)] border-t border-[var(--ds-border-base)] flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={back}
            disabled={isFirst}
            className="flex items-center gap-1.5 px-4 py-2 text-sm rounded-lg border border-[var(--ds-border-base)] hover:bg-[var(--ds-bg-raised)] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <ArrowLeftIcon size={14} /> Back
          </button>

          <div className="flex items-center gap-2">
            {/* Completed dots */}
            <div className="flex gap-1">
              {steps.map((_, i) => (
                <div
                  key={i}
                  className={[
                    'h-1.5 w-1.5 rounded-full transition-all',
                    i === current ? 'w-4 bg-[var(--ds-brand-500)]' :
                    completed.has(i) ? 'bg-[var(--ds-success-icon)]' :
                    'bg-[var(--ds-border-base)]',
                  ].join(' ')}
                />
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={next}
            className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg bg-[var(--ds-brand-600)] text-white hover:bg-[var(--ds-brand-700)] transition-colors"
          >
            {step.nextLabel ?? (isLast ? 'Finish' : 'Continue')}
            {!isLast && <ArrowRightIcon size={14} />}
            {isLast && <CheckCircleIcon size={14} />}
          </button>
        </div>
      </div>
    </div>
  );
}
