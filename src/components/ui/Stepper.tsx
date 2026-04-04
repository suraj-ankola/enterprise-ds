import React from 'react';
import { CheckIcon } from '@phosphor-icons/react';

// ─── Types ────────────────────────────────────────────────────────────────────

export type StepStatus = 'complete' | 'current' | 'upcoming';
export type StepperOrientation = 'horizontal' | 'vertical';

export interface Step {
  key:         string;
  label:       string;
  description?: string;
  /** Override auto-computed status */
  status?:     StepStatus;
  icon?:       React.ReactNode;
  optional?:   boolean;
}

export interface StepperProps {
  steps:         Step[];
  /** Index of the current step (0-based) */
  currentStep:   number;
  orientation?:  StepperOrientation;
  /** Call when a completed step label is clicked */
  onStepClick?:  (index: number) => void;
  className?:    string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function resolveStatus(index: number, currentStep: number, override?: StepStatus): StepStatus {
  if (override) return override;
  if (index < currentStep)  return 'complete';
  if (index === currentStep) return 'current';
  return 'upcoming';
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function StepIndicator({ step, index, currentStep, status, onClick }: {
  step: Step; index: number; currentStep: number; status: StepStatus; onClick?: () => void;
}) {
  const isClickable = status === 'complete' && onClick;

  const circle = (
    <span
      className={[
        'flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold transition-colors',
        status === 'complete'
          ? 'bg-[var(--ds-brand-600)] text-white'
          : status === 'current'
            ? 'border-2 border-[var(--ds-brand-600)] text-[var(--ds-brand-600)] bg-[var(--ds-bg-surface)]'
            : 'border-2 border-[var(--ds-border-strong)] text-[var(--ds-text-muted)] bg-[var(--ds-bg-surface)]',
      ].join(' ')}
    >
      {status === 'complete'
        ? (step.icon ?? <CheckIcon size={15} weight="bold" />)
        : step.icon ?? (index + 1)}
    </span>
  );

  if (isClickable) {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-label={`Go to step ${index + 1}: ${step.label}`}
        className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ds-brand-500)] rounded-full"
      >
        {circle}
      </button>
    );
  }

  return circle;
}

// ─── Main component ───────────────────────────────────────────────────────────

export function Stepper({
  steps,
  currentStep,
  orientation = 'horizontal',
  onStepClick,
  className   = '',
}: StepperProps) {
  if (orientation === 'vertical') {
    return (
      <nav aria-label="Progress" className={['flex flex-col', className].filter(Boolean).join(' ')}>
        <ol role="list" className="flex flex-col gap-0">
          {steps.map((step, i) => {
            const status    = resolveStatus(i, currentStep, step.status);
            const isLast    = i === steps.length - 1;

            return (
              <li key={step.key} className="relative flex gap-4">
                {/* Connector line */}
                {!isLast && (
                  <div
                    className={[
                      'absolute left-4 top-8 w-0.5 bottom-0 -mb-4',
                      status === 'complete' ? 'bg-[var(--ds-brand-600)]' : 'bg-[var(--ds-border-base)]',
                    ].join(' ')}
                    aria-hidden="true"
                  />
                )}

                <StepIndicator step={step} index={i} currentStep={currentStep} status={status}
                  onClick={onStepClick ? () => onStepClick(i) : undefined} />

                <div className="pb-8 min-w-0">
                  <p className={[
                    'text-sm font-medium leading-snug',
                    status === 'current'
                      ? 'text-[var(--ds-brand-700)]'
                      : status === 'complete'
                        ? 'text-[var(--ds-text-primary)]'
                        : 'text-[var(--ds-text-muted)]',
                  ].join(' ')}>
                    {step.label}
                    {step.optional && (
                      <span className="ml-1 text-xs font-normal text-[var(--ds-text-muted)]">(optional)</span>
                    )}
                  </p>
                  {step.description && (
                    <p className="mt-0.5 text-xs text-[var(--ds-text-muted)] leading-relaxed">{step.description}</p>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </nav>
    );
  }

  // Horizontal
  return (
    <nav aria-label="Progress" className={['w-full', className].filter(Boolean).join(' ')}>
      <ol role="list" className="flex items-start">
        {steps.map((step, i) => {
          const status = resolveStatus(i, currentStep, step.status);
          const isLast = i === steps.length - 1;

          return (
            <li key={step.key} className={['relative flex flex-col items-center', !isLast ? 'flex-1' : ''].join(' ')}>
              {/* Connector */}
              {!isLast && (
                <div className="absolute top-4 left-1/2 w-full h-0.5 -translate-y-1/2 z-0" aria-hidden="true">
                  <div
                    className={[
                      'h-full transition-colors duration-300',
                      status === 'complete' ? 'bg-[var(--ds-brand-600)]' : 'bg-[var(--ds-border-base)]',
                    ].join(' ')}
                  />
                </div>
              )}

              {/* Circle */}
              <div className="relative z-10">
                <StepIndicator step={step} index={i} currentStep={currentStep} status={status}
                  onClick={onStepClick ? () => onStepClick(i) : undefined} />
              </div>

              {/* Label */}
              <div className="mt-2 text-center px-1">
                <p className={[
                  'text-xs font-medium leading-tight',
                  status === 'current'
                    ? 'text-[var(--ds-brand-700)]'
                    : status === 'complete'
                      ? 'text-[var(--ds-text-primary)]'
                      : 'text-[var(--ds-text-muted)]',
                ].join(' ')}>
                  {step.label}
                </p>
                {step.optional && (
                  <p className="text-[10px] text-[var(--ds-text-muted)]">Optional</p>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
