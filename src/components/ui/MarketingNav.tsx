'use client';

import React, { useState, useEffect } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface MarketingNavLink {
  label:   string;
  href:    string;
}

export interface MarketingNavProps {
  /** Brand name or logo node */
  logo?:       React.ReactNode;
  appName?:    string;
  links?:      MarketingNavLink[];
  /** Primary CTA (e.g. "Get started") */
  cta?:        React.ReactNode;
  /** Secondary action (e.g. "Sign in") */
  secondary?:  React.ReactNode;
  /** Darken background on scroll */
  scrolled?:   boolean;
  className?:  string;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function MarketingNav({
  logo,
  appName = 'Enterprise DS',
  links   = [],
  cta,
  secondary,
  className = '',
}: MarketingNavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function onScroll() { setScrolled(window.scrollY > 8); }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={[
        'sticky top-0 z-[var(--ds-z-sticky)] w-full transition-shadow duration-200',
        scrolled
          ? 'bg-[var(--ds-bg-surface)] shadow-[var(--ds-shadow-sm)]'
          : 'bg-[var(--ds-bg-surface)]/90 backdrop-blur-md',
        'border-b border-[var(--ds-border-base)]',
        className,
      ].filter(Boolean).join(' ')}
    >
      <nav
        aria-label="Main navigation"
        className="max-w-[1280px] mx-auto px-6 h-16 flex items-center justify-between gap-6"
      >
        {/* Brand */}
        <a href="/" className="flex items-center gap-2 shrink-0">
          {logo ?? (
            <span className="h-8 w-8 rounded-lg bg-[var(--ds-brand-600)] flex items-center justify-center text-white text-sm font-bold select-none">
              {appName[0]}
            </span>
          )}
          <span className="font-semibold text-[var(--ds-text-primary)] text-sm">{appName}</span>
        </a>

        {/* Desktop links */}
        {links.length > 0 && (
          <ul className="hidden md:flex items-center gap-6" role="list">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="text-sm text-[var(--ds-text-secondary)] hover:text-[var(--ds-text-primary)] transition-colors"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        )}

        {/* Desktop actions */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          {secondary}
          {cta}
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
          className="md:hidden inline-flex flex-col gap-[5px] p-2 rounded-lg hover:bg-[var(--ds-bg-subtle)]"
        >
          <span className={['block w-5 h-0.5 bg-[var(--ds-text-primary)] transition-transform duration-200', menuOpen ? 'translate-y-[7px] rotate-45' : ''].join(' ')} />
          <span className={['block w-5 h-0.5 bg-[var(--ds-text-primary)] transition-opacity duration-200', menuOpen ? 'opacity-0' : ''].join(' ')} />
          <span className={['block w-5 h-0.5 bg-[var(--ds-text-primary)] transition-transform duration-200', menuOpen ? '-translate-y-[7px] -rotate-45' : ''].join(' ')} />
        </button>
      </nav>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="md:hidden border-t border-[var(--ds-border-base)] bg-[var(--ds-bg-surface)] px-6 py-4 flex flex-col gap-3">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-[var(--ds-text-secondary)] hover:text-[var(--ds-text-primary)] py-1"
              onClick={() => setMenuOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <div className="flex flex-col gap-2 pt-2 border-t border-[var(--ds-border-base)]">
            {secondary}
            {cta}
          </div>
        </div>
      )}
    </header>
  );
}
