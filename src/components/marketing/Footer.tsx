'use client';
import React from 'react';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function sanitizeHref(href: string): string {
  if (/^(javascript|data):/i.test(href.trim())) return '#';
  return href;
}

// ─── Types ────────────────────────────────────────────────────────────────────

export interface FooterColumn {
  heading:  string;
  links:    { label: string; href: string; badge?: string }[];
}

export interface FooterProps {
  logo:          React.ReactNode;
  tagline?:      React.ReactNode;
  columns?:      FooterColumn[];
  socialLinks?:  { label: string; href: string; icon: React.ReactNode }[];
  bottomLeft?:   React.ReactNode;
  bottomRight?:  React.ReactNode;
  dark?:         boolean;
  className?:    string;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function Footer({
  logo,
  tagline,
  columns      = [],
  socialLinks  = [],
  bottomLeft,
  bottomRight,
  dark         = true,
  className    = '',
}: FooterProps) {
  const bg            = dark ? 'bg-gray-950 border-t border-white/10'                        : 'bg-[var(--ds-bg-surface)] border-t border-[var(--ds-border-base)]';
  const textPrimary   = dark ? 'text-white'                                                   : 'text-[var(--ds-text-primary)]';
  const textSecondary = dark ? 'text-white/60 hover:text-white'                              : 'text-[var(--ds-text-secondary)] hover:text-[var(--ds-text-primary)]';
  const textMuted     = dark ? 'text-white/40'                                                : 'text-[var(--ds-text-muted)]';
  const divider       = dark ? 'border-white/10'                                              : 'border-[var(--ds-border-base)]';

  return (
    <footer className={[bg, className].join(' ')}>
      <div className="mx-auto max-w-7xl px-4 py-16">
        {/* Top grid */}
        <div className={['grid gap-12', columns.length > 0 ? 'lg:grid-cols-[2fr_repeat(auto-fill,minmax(120px,1fr))]' : 'max-w-md'].join(' ')}>
          {/* Brand column */}
          <div className="space-y-4">
            <div>{logo}</div>
            {tagline && <p className={['text-sm leading-relaxed max-w-xs', textMuted].join(' ')}>{tagline}</p>}
            {socialLinks.length > 0 && (
              <div className="flex gap-3">
                {socialLinks.map(s => (
                  <a
                    key={s.label}
                    href={sanitizeHref(s.href)}
                    aria-label={s.label}
                    className={['p-2 rounded-lg border transition-colors', dark ? 'border-white/10 hover:bg-white/10 text-white/60 hover:text-white' : 'border-[var(--ds-border-base)] hover:bg-[var(--ds-bg-subtle)] text-[var(--ds-text-muted)] hover:text-[var(--ds-text-primary)]'].join(' ')}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Link columns */}
          {columns.map(col => (
            <div key={col.heading} className="space-y-4">
              <h3 className={['text-xs font-semibold uppercase tracking-widest', textPrimary].join(' ')}>
                {col.heading}
              </h3>
              <ul className="space-y-2.5">
                {col.links.map(link => (
                  <li key={link.label}>
                    <a
                      href={sanitizeHref(link.href)}
                      className={['text-sm transition-colors flex items-center gap-2', textSecondary].join(' ')}
                    >
                      {link.label}
                      {link.badge && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[var(--ds-brand-600)] text-white font-medium">
                          {link.badge}
                        </span>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className={['mt-16 pt-8 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4', divider].join(' ')}>
          <div className={['text-xs', textMuted].join(' ')}>
            {bottomLeft ?? <>© {new Date().getFullYear()} All rights reserved.</>}
          </div>
          {bottomRight && (
            <div className={['text-xs flex items-center gap-4', textMuted].join(' ')}>
              {bottomRight}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}
