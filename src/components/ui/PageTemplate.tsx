import React from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface PageHeaderProps {
  /** Page title */
  title:         string;
  /** Subtitle / description below title */
  subtitle?:     string;
  /** Icon or illustration to the left of the title */
  icon?:         React.ReactNode;
  /** Status badge or meta info (rendered left of actions) */
  meta?:         React.ReactNode;
  /** Primary / secondary action buttons */
  actions?:      React.ReactNode;
  /** Breadcrumb navigation — rendered above title */
  breadcrumb?:   React.ReactNode;
  /** Tabs — rendered below title row, inside the header */
  tabs?:         React.ReactNode;
  className?:    string;
}

export interface PageContentProps extends React.HTMLAttributes<HTMLElement> {
  children:   React.ReactNode;
  /** Remove default horizontal padding (for full-bleed tables/charts) */
  noPadding?: boolean;
  className?: string;
}

export interface PageProps {
  children:   React.ReactNode;
  className?: string;
}

export interface SectionProps {
  title?:      string;
  description?: string;
  action?:     React.ReactNode;
  children:    React.ReactNode;
  className?:  string;
}

export interface TwoColumnLayoutProps {
  /** Main content — 2/3 width on large screens */
  main:       React.ReactNode;
  /** Sidebar — 1/3 width on large screens */
  aside:      React.ReactNode;
  /** Sidebar position */
  sidebarSide?: 'left' | 'right';
  className?: string;
}

export interface ThreeColumnLayoutProps {
  left:       React.ReactNode;
  center:     React.ReactNode;
  right:      React.ReactNode;
  className?: string;
}

export interface SplitPaneProps {
  /** Fixed left panel — navigation, filters, etc. */
  panel:       React.ReactNode;
  /** Scrollable right content area */
  content:     React.ReactNode;
  /** Panel width — default 280px */
  panelWidth?: number | string;
  className?:  string;
}

// ─── Page ─────────────────────────────────────────────────────────────────────
// Root wrapper — full-height flex column, bg-base

export function Page({ children, className = '' }: PageProps) {
  return (
    <div className={['min-h-screen bg-[var(--ds-bg-base)] flex flex-col', className].join(' ')}>
      {children}
    </div>
  );
}

// ─── PageHeader ───────────────────────────────────────────────────────────────
// Sticky white header with title, subtitle, icon, breadcrumb, actions, tabs

export function PageHeader({
  title,
  subtitle,
  icon,
  meta,
  actions,
  breadcrumb,
  tabs,
  className = '',
}: PageHeaderProps) {
  return (
    <header
      className={[
        'bg-[var(--ds-bg-surface)] border-b border-[var(--ds-border-base)]',
        'sticky top-0 z-[var(--ds-z-sticky)]',
        className,
      ].join(' ')}
    >
      <div className="px-6 pt-5 pb-0">
        {/* Breadcrumb */}
        {breadcrumb && (
          <div className="mb-3">{breadcrumb}</div>
        )}

        {/* Title row */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            {icon && (
              <span className="shrink-0 h-10 w-10 flex items-center justify-center rounded-xl bg-[var(--ds-brand-100)] text-[var(--ds-brand-600)]" aria-hidden="true">
                {icon}
              </span>
            )}
            <div className="min-w-0">
              <h1 className="text-xl font-bold text-[var(--ds-text-primary)] truncate leading-tight">
                {title}
              </h1>
              {subtitle && (
                <p className="mt-0.5 text-sm text-[var(--ds-text-muted)] truncate">
                  {subtitle}
                </p>
              )}
            </div>
          </div>

          {/* Right: meta + actions */}
          <div className="shrink-0 flex items-center gap-3">
            {meta && (
              <div className="flex items-center gap-2">{meta}</div>
            )}
            {actions && (
              <div className="flex items-center gap-2">{actions}</div>
            )}
          </div>
        </div>

        {/* Tabs — flush with bottom border */}
        {tabs && (
          <div className="mt-4">{tabs}</div>
        )}
      </div>
    </header>
  );
}

// ─── PageContent ──────────────────────────────────────────────────────────────

export function PageContent({ children, noPadding = false, className = '', ...props }: PageContentProps) {
  return (
    <main
      className={[
        'flex-1',
        noPadding ? '' : 'px-6 py-6',
        className,
      ].filter(Boolean).join(' ')}
      {...props}
    >
      {children}
    </main>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────
// Groups related content with a heading + optional action

export function Section({ title, description, action, children, className = '' }: SectionProps) {
  return (
    <section className={['mb-8', className].join(' ')}>
      {(title || action) && (
        <div className="flex items-start justify-between gap-4 mb-4">
          {title && (
            <div>
              <h2 className="text-base font-semibold text-[var(--ds-text-primary)]">{title}</h2>
              {description && (
                <p className="mt-0.5 text-sm text-[var(--ds-text-muted)]">{description}</p>
              )}
            </div>
          )}
          {action && <div className="shrink-0">{action}</div>}
        </div>
      )}
      {children}
    </section>
  );
}

// ─── TwoColumnLayout ──────────────────────────────────────────────────────────
// Main content 2/3 + sidebar 1/3, stacks on small screens

export function TwoColumnLayout({
  main,
  aside,
  sidebarSide = 'right',
  className   = '',
}: TwoColumnLayoutProps) {
  const items = sidebarSide === 'right'
    ? [
        <div key="main"  className="lg:col-span-2 min-w-0">{main}</div>,
        <div key="aside" className="lg:col-span-1 min-w-0">{aside}</div>,
      ]
    : [
        <div key="aside" className="lg:col-span-1 min-w-0">{aside}</div>,
        <div key="main"  className="lg:col-span-2 min-w-0">{main}</div>,
      ];

  return (
    <div className={['grid grid-cols-1 lg:grid-cols-3 gap-6', className].join(' ')}>
      {items}
    </div>
  );
}

// ─── ThreeColumnLayout ────────────────────────────────────────────────────────

export function ThreeColumnLayout({ left, center, right, className = '' }: ThreeColumnLayoutProps) {
  return (
    <div className={['grid grid-cols-1 md:grid-cols-3 gap-6', className].join(' ')}>
      <div className="min-w-0">{left}</div>
      <div className="min-w-0">{center}</div>
      <div className="min-w-0">{right}</div>
    </div>
  );
}

// ─── SplitPane ────────────────────────────────────────────────────────────────
// Fixed left panel + scrollable right — used for master-detail layouts

export function SplitPane({
  panel,
  content,
  panelWidth = 280,
  className  = '',
}: SplitPaneProps) {
  const w = typeof panelWidth === 'number' ? `${panelWidth}px` : panelWidth;

  return (
    <div className={['flex h-full min-h-0 overflow-hidden', className].join(' ')}>
      {/* Fixed panel */}
      <aside
        className="shrink-0 overflow-y-auto border-r border-[var(--ds-border-base)] bg-[var(--ds-bg-surface)]"
        style={{ width: w }}
      >
        {panel}
      </aside>

      {/* Scrollable content */}
      <div className="flex-1 min-w-0 overflow-y-auto bg-[var(--ds-bg-base)]">
        {content}
      </div>
    </div>
  );
}

// ─── DashboardGrid ────────────────────────────────────────────────────────────
// Standard 12-column responsive grid for dashboard widget placement

export interface DashboardGridProps {
  children:   React.ReactNode;
  className?: string;
}

export function DashboardGrid({ children, className = '' }: DashboardGridProps) {
  return (
    <div className={[
      'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5',
      className,
    ].join(' ')}>
      {children}
    </div>
  );
}

// ─── DashboardWidget ──────────────────────────────────────────────────────────
// Grid span helper — wrap chart/card in the right column span

export type WidgetSpan = 1 | 2 | 3 | 4;

export interface DashboardWidgetProps {
  children:    React.ReactNode;
  span?:       WidgetSpan;
  spanSm?:     WidgetSpan;
  className?:  string;
}

const SPAN: Record<WidgetSpan, string> = {
  1: 'col-span-1',
  2: 'col-span-1 sm:col-span-2',
  3: 'col-span-1 sm:col-span-2 lg:col-span-3',
  4: 'col-span-1 sm:col-span-2 lg:col-span-3 xl:col-span-4',
};

export function DashboardWidget({ children, span = 1, className = '' }: DashboardWidgetProps) {
  return (
    <div className={[SPAN[span], className].join(' ')}>
      {children}
    </div>
  );
}
