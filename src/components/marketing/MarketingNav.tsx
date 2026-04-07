'use client';
import React, { useEffect, useRef, useState } from 'react';
import { ListIcon, XIcon, CaretDownIcon } from '@phosphor-icons/react';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function sanitizeHref(href: string): string {
  if (/^(javascript|data):/i.test(href.trim())) return '#';
  return href;
}

// ─── Types ────────────────────────────────────────────────────────────────────

export interface NavItem {
  label:      string;
  href?:      string;
  children?:  { label: string; href: string; description?: string }[];
}

export interface MarketingNavProps {
  logo:        React.ReactNode;
  items?:      NavItem[];
  actions?:    React.ReactNode;
  /** Transparent on top, opaque on scroll */
  transparent?: boolean;
  dark?:        boolean;
  className?:   string;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function MarketingNav({
  logo,
  items        = [],
  actions,
  transparent  = false,
  dark         = true,
  className    = '',
}: MarketingNavProps) {
  const [scrolled,  setScrolled]  = useState(false);
  const [mobileOpen, setMobile]   = useState(false);
  const [openDrop,  setOpenDrop]  = useState<string | null>(null);
  const dropRef                    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onScroll() { setScrolled(window.scrollY > 20); }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    function onMouseDown(e: MouseEvent) {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) setOpenDrop(null);
    }
    document.addEventListener('mousedown', onMouseDown);
    return () => document.removeEventListener('mousedown', onMouseDown);
  }, []);

  const isOpaque = !transparent || scrolled || mobileOpen;

  const textColor = dark
    ? isOpaque ? 'text-white'     : 'text-white'
    : isOpaque ? 'text-[var(--ds-text-primary)]' : 'text-white';

  const bg = isOpaque
    ? dark ? 'bg-gray-950/90 backdrop-blur-md border-b border-white/10'
           : 'bg-[var(--ds-bg-surface)]/90 backdrop-blur-md border-b border-[var(--ds-border-base)]'
    : 'bg-transparent';

  return (
    <header className={['fixed inset-x-0 top-0 z-50 transition-all duration-300', bg, className].join(' ')}>
      <nav className="mx-auto max-w-7xl px-4 h-16 flex items-center justify-between" aria-label="Main navigation">
        {/* Logo */}
        <div className="shrink-0">{logo}</div>

        {/* Desktop items */}
        <div ref={dropRef} className="hidden md:flex items-center gap-1">
          {items.map(item => (
            <div key={item.label} className="relative">
              {item.children ? (
                <>
                  <button
                    type="button"
                    onClick={() => setOpenDrop(openDrop === item.label ? null : item.label)}
                    className={['flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors', textColor, 'hover:bg-white/10'].join(' ')}
                  >
                    {item.label}
                    <CaretDownIcon size={12} className={['transition-transform', openDrop === item.label ? 'rotate-180' : ''].join(' ')} />
                  </button>
                  {openDrop === item.label && (
                    <div className="absolute top-full mt-1 left-0 w-56 bg-[var(--ds-bg-surface)] border border-[var(--ds-border-base)] rounded-xl shadow-xl p-1.5 z-50">
                      {item.children.map(child => (
                        <a
                          key={child.label}
                          href={sanitizeHref(child.href)}
                          className="block px-3 py-2 rounded-lg hover:bg-[var(--ds-bg-subtle)] transition-colors"
                        >
                          <p className="text-sm font-medium text-[var(--ds-text-primary)]">{child.label}</p>
                          {child.description && <p className="text-xs text-[var(--ds-text-muted)] mt-0.5">{child.description}</p>}
                        </a>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <a
                  href={item.href ? sanitizeHref(item.href) : '#'}
                  className={['px-3 py-2 rounded-lg text-sm font-medium transition-colors', textColor, 'hover:bg-white/10'].join(' ')}
                >
                  {item.label}
                </a>
              )}
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-2">
          {actions}
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={mobileOpen}
          onClick={() => setMobile(v => !v)}
          className={['md:hidden p-2 rounded-lg transition-colors', textColor, 'hover:bg-white/10'].join(' ')}
        >
          {mobileOpen ? <XIcon size={20} /> : <ListIcon size={20} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className={['md:hidden border-t', dark ? 'border-white/10 bg-gray-950' : 'border-[var(--ds-border-base)] bg-[var(--ds-bg-surface)]'].join(' ')}>
          <div className="px-4 py-4 space-y-1">
            {items.map(item => (
              <div key={item.label}>
                <a
                  href={item.href ? sanitizeHref(item.href) : '#'}
                  className={['block px-3 py-2 rounded-lg text-sm font-medium transition-colors', textColor, 'hover:bg-white/10'].join(' ')}
                >
                  {item.label}
                </a>
                {item.children?.map(child => (
                  <a
                    key={child.label}
                    href={sanitizeHref(child.href)}
                    className="block pl-6 py-1.5 text-sm text-[var(--ds-text-muted)] hover:text-[var(--ds-text-primary)] transition-colors"
                  >
                    {child.label}
                  </a>
                ))}
              </div>
            ))}
            <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
              {actions}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
