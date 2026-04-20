import React from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface FooterLink {
  label: string;
  href:  string;
}

export interface FooterColumn {
  heading: string;
  links:   FooterLink[];
}

export interface MarketingFooterProps {
  logo?:       React.ReactNode;
  appName?:    string;
  tagline?:    string;
  columns?:    FooterColumn[];
  /** Social icon links */
  social?:     React.ReactNode[];
  copyright?:  string;
  className?:  string;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function MarketingFooter({
  logo,
  appName   = 'Enterprise DS',
  tagline,
  columns   = [],
  social    = [],
  copyright,
  className = '',
}: MarketingFooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer
      className={[
        'w-full bg-[var(--ds-bg-surface)] border-t border-[var(--ds-border-base)]',
        className,
      ].join(' ')}
    >
      <div className="max-w-[1280px] mx-auto px-6 py-12">
        {/* Top row: brand + columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_repeat(3,1fr)] gap-10">
          {/* Brand column */}
          <div className="flex flex-col gap-4">
            <a href="/" className="flex items-center gap-2">
              {logo ?? (
                <span className="h-8 w-8 rounded-lg bg-[var(--ds-brand-600)] flex items-center justify-center text-white text-sm font-bold">
                  {appName[0]}
                </span>
              )}
              <span className="font-semibold text-[var(--ds-text-primary)] text-sm">{appName}</span>
            </a>
            {tagline && (
              <p className="text-sm text-[var(--ds-text-muted)] max-w-xs leading-relaxed">{tagline}</p>
            )}
            {social.length > 0 && (
              <div className="flex items-center gap-3">
                {social.map((icon, i) => (
                  <span key={i} className="text-[var(--ds-text-muted)] hover:text-[var(--ds-text-primary)] transition-colors cursor-pointer">
                    {icon}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.heading} className="flex flex-col gap-3">
              <p className="text-xs font-semibold uppercase tracking-widest text-[var(--ds-text-primary)]">
                {col.heading}
              </p>
              <ul className="flex flex-col gap-2" role="list">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      className="text-sm text-[var(--ds-text-muted)] hover:text-[var(--ds-text-primary)] transition-colors"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom: copyright + legal links */}
        <div className="mt-10 pt-6 border-t border-[var(--ds-border-base)] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[var(--ds-text-muted)]">
            {copyright ?? `© ${year} ${appName}. All rights reserved.`}
          </p>
          <div className="flex items-center gap-4">
            {['Privacy Policy', 'Terms of Service', 'Security'].map((label) => (
              <a
                key={label}
                href="#"
                className="text-xs text-[var(--ds-text-muted)] hover:text-[var(--ds-text-primary)] transition-colors"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
