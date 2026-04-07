'use client';
import React from 'react';
import { CaretLeftIcon } from '@phosphor-icons/react';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface DetailTab {
  id:       string;
  label:    string;
  count?:   number;
}

export interface DetailPageProps {
  /** Back navigation label + handler */
  back?:          { label: string; onClick: () => void };
  /** Entity name / title */
  title:          string;
  subtitle?:      string;
  /** Avatar / icon area */
  avatar?:        React.ReactNode;
  /** Status badge */
  status?:        React.ReactNode;
  /** Meta row below title — e.g. tags, dates, owners */
  meta?:          React.ReactNode;
  /** Header action buttons */
  actions?:       React.ReactNode;
  /** Tabs — renders a tab nav below the header */
  tabs?:          DetailTab[];
  activeTab?:     string;
  onTabChange?:   (id: string) => void;
  /** Left column — main content */
  children:       React.ReactNode;
  /** Right column — sidebar cards (summary, activity, etc.) */
  sidebar?:       React.ReactNode;
  loading?:       boolean;
  className?:     string;
}

// ─── DetailPage ───────────────────────────────────────────────────────────────

export function DetailPage({
  back,
  title,
  subtitle,
  avatar,
  status,
  meta,
  actions,
  tabs,
  activeTab,
  onTabChange,
  children,
  sidebar,
  loading = false,
  className = '',
}: DetailPageProps) {
  return (
    <div className={['min-h-screen bg-[var(--ds-bg-base)]', className].join(' ')}>
      {/* Header */}
      <div className="bg-[var(--ds-bg-surface)] border-b border-[var(--ds-border-base)]">
        <div className="max-w-screen-xl mx-auto px-6">
          {/* Back nav */}
          {back && (
            <div className="pt-4">
              <button
                type="button"
                onClick={back.onClick}
                className="flex items-center gap-1 text-xs text-[var(--ds-text-muted)] hover:text-[var(--ds-text-primary)] transition-colors"
              >
                <CaretLeftIcon size={13} />
                {back.label}
              </button>
            </div>
          )}

          {/* Title row */}
          <div className="flex items-start justify-between gap-4 py-5">
            <div className="flex items-start gap-4">
              {avatar && (
                <div className="shrink-0">{avatar}</div>
              )}
              <div>
                {loading ? (
                  <div className="space-y-2 animate-pulse">
                    <div className="h-6 w-48 rounded bg-[var(--ds-bg-subtle)]" />
                    <div className="h-4 w-32 rounded bg-[var(--ds-bg-subtle)]" />
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h1 className="text-lg font-semibold text-[var(--ds-text-primary)]">{title}</h1>
                      {status}
                    </div>
                    {subtitle && <p className="text-sm text-[var(--ds-text-muted)] mt-0.5">{subtitle}</p>}
                    {meta && <div className="flex items-center gap-3 mt-2 flex-wrap">{meta}</div>}
                  </>
                )}
              </div>
            </div>
            {actions && (
              <div className="flex items-center gap-2 shrink-0">{actions}</div>
            )}
          </div>

          {/* Tab nav */}
          {tabs && tabs.length > 0 && (
            <nav className="flex gap-0 -mb-px" role="tablist">
              {tabs.map(tab => {
                const isActive = tab.id === activeTab;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => onTabChange?.(tab.id)}
                    className={[
                      'flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors',
                      isActive
                        ? 'border-[var(--ds-brand-600)] text-[var(--ds-brand-600)]'
                        : 'border-transparent text-[var(--ds-text-muted)] hover:text-[var(--ds-text-primary)] hover:border-[var(--ds-border-base)]',
                    ].join(' ')}
                  >
                    {tab.label}
                    {tab.count !== undefined && (
                      <span className={[
                        'text-[10px] px-1.5 py-0.5 rounded-full',
                        isActive ? 'bg-[var(--ds-brand-100)] text-[var(--ds-brand-700)]' : 'bg-[var(--ds-bg-subtle)] text-[var(--ds-text-muted)]',
                      ].join(' ')}>
                        {tab.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="max-w-screen-xl mx-auto px-6 py-6">
        {sidebar ? (
          <div className="flex gap-6 items-start">
            <div className="flex-1 min-w-0 space-y-4">{children}</div>
            <div className="w-72 shrink-0 space-y-4">{sidebar}</div>
          </div>
        ) : (
          <div className="space-y-4">{children}</div>
        )}
      </div>
    </div>
  );
}

// ─── DetailSection helper ─────────────────────────────────────────────────────

export interface DetailSectionProps {
  title?:     string;
  action?:    React.ReactNode;
  children:   React.ReactNode;
  className?: string;
}

export function DetailSection({ title, action, children, className = '' }: DetailSectionProps) {
  return (
    <div className={['bg-[var(--ds-bg-surface)] border border-[var(--ds-border-base)] rounded-xl overflow-hidden', className].join(' ')}>
      {(title || action) && (
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-[var(--ds-border-base)]">
          {title && <h3 className="text-sm font-semibold text-[var(--ds-text-primary)]">{title}</h3>}
          {action}
        </div>
      )}
      <div className="p-5">{children}</div>
    </div>
  );
}

// ─── FieldGrid helper ─────────────────────────────────────────────────────────

export interface FieldItem {
  label:  string;
  value:  React.ReactNode;
}

export function FieldGrid({ fields, cols = 2 }: { fields: FieldItem[]; cols?: 1 | 2 | 3 }) {
  const colCls = { 1: 'grid-cols-1', 2: 'grid-cols-2', 3: 'grid-cols-3' }[cols];
  return (
    <dl className={`grid ${colCls} gap-x-6 gap-y-4`}>
      {fields.map(f => (
        <div key={f.label}>
          <dt className="text-xs font-semibold text-[var(--ds-text-muted)] uppercase tracking-wide">{f.label}</dt>
          <dd className="mt-1 text-sm text-[var(--ds-text-primary)]">{f.value ?? <span className="text-[var(--ds-text-muted)]">—</span>}</dd>
        </div>
      ))}
    </dl>
  );
}
