import React from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

export type FormPageLayout = 'centered' | 'split' | 'wide';

export interface FormPageProps {
  /** Form title */
  title:          React.ReactNode;
  description?:   React.ReactNode;
  /** Optional visual aside (split layout only) */
  aside?:         React.ReactNode;
  children:       React.ReactNode;
  /** Action buttons row (rendered below the form body) */
  actions?:       React.ReactNode;
  layout?:        FormPageLayout;
  /** Back link node */
  back?:          React.ReactNode;
  /** Step indicator node (e.g. Stepper) */
  steps?:         React.ReactNode;
  className?:     string;
}

// ─── FormSection ─────────────────────────────────────────────────────────────

export interface FormSectionProps {
  title?:       React.ReactNode;
  description?: React.ReactNode;
  children:     React.ReactNode;
  className?:   string;
}

export function FormSection({ title, description, children, className = '' }: FormSectionProps) {
  return (
    <section className={['space-y-4', className].join(' ')}>
      {(title || description) && (
        <div className="space-y-0.5">
          {title && <h3 className="text-sm font-semibold text-[var(--ds-text-primary)]">{title}</h3>}
          {description && <p className="text-xs text-[var(--ds-text-muted)]">{description}</p>}
        </div>
      )}
      {children}
    </section>
  );
}

// ─── FormRow ──────────────────────────────────────────────────────────────────

export interface FormRowProps {
  children:   React.ReactNode;
  cols?:      2 | 3;
  className?: string;
}

export function FormRow({ children, cols = 2, className = '' }: FormRowProps) {
  return (
    <div className={[`grid gap-4`, cols === 2 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1 sm:grid-cols-3', className].join(' ')}>
      {children}
    </div>
  );
}

// ─── FormPage ─────────────────────────────────────────────────────────────────

export function FormPage({
  title,
  description,
  aside,
  children,
  actions,
  layout    = 'centered',
  back,
  steps,
  className = '',
}: FormPageProps) {
  // ── Split layout ──────────────────────────────────────────────────────────
  if (layout === 'split') {
    return (
      <div className={['min-h-screen flex bg-[var(--ds-bg-base)]', className].join(' ')}>
        {/* Aside */}
        <div className="hidden lg:flex w-[420px] shrink-0 bg-[var(--ds-brand-600)] flex-col justify-between p-10">
          {aside ?? (
            <div className="space-y-6">
              <div className="h-8 w-8 rounded-lg bg-white/20" />
              <div>
                <p className="text-xl font-bold text-white leading-snug">{title}</p>
                {description && <p className="mt-2 text-sm text-white/70 leading-relaxed">{description}</p>}
              </div>
            </div>
          )}
        </div>

        {/* Form panel */}
        <div className="flex-1 flex items-start justify-center py-12 px-6">
          <div className="w-full max-w-lg">
            {back && <div className="mb-6">{back}</div>}
            <div className="mb-8">
              <h1 className="text-xl font-bold text-[var(--ds-text-primary)] lg:hidden">{title}</h1>
              {description && <p className="mt-1 text-sm text-[var(--ds-text-secondary)] lg:hidden">{description}</p>}
            </div>
            {steps && <div className="mb-8">{steps}</div>}
            <div className="space-y-6">{children}</div>
            {actions && (
              <div className="mt-8 pt-5 border-t border-[var(--ds-border-base)] flex items-center justify-end gap-3">
                {actions}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ── Centered + Wide layouts ───────────────────────────────────────────────
  const maxW = layout === 'wide' ? 'max-w-3xl' : 'max-w-xl';

  return (
    <div className={['min-h-screen bg-[var(--ds-bg-base)] py-12 px-4', className].join(' ')}>
      <div className={['mx-auto w-full', maxW].join(' ')}>
        {back && <div className="mb-6">{back}</div>}

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-xl font-bold text-[var(--ds-text-primary)]">{title}</h1>
          {description && <p className="mt-1 text-sm text-[var(--ds-text-secondary)]">{description}</p>}
        </div>

        {steps && <div className="mb-8">{steps}</div>}

        {/* Body */}
        <div className="bg-[var(--ds-bg-surface)] border border-[var(--ds-border-base)] rounded-xl divide-y divide-[var(--ds-border-base)]">
          <div className="p-6 space-y-6">{children}</div>

          {actions && (
            <div className="px-6 py-4 flex items-center justify-end gap-3 bg-[var(--ds-bg-subtle)] rounded-b-xl">
              {actions}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
