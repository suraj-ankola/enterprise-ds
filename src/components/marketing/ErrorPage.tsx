'use client';
import React from 'react';
import { BackgroundElements } from './BackgroundElements';

// ─── Types ────────────────────────────────────────────────────────────────────

export type ErrorPageVariant = '404' | '500' | '503' | 'maintenance' | 'forbidden' | 'custom';

export interface ErrorPageProps {
  variant?:      ErrorPageVariant;
  code?:         string;
  title?:        string;
  description?:  string;
  actions?:      React.ReactNode;
  illustration?: React.ReactNode;
  dark?:         boolean;
  className?:    string;
}

// ─── Default content per variant ──────────────────────────────────────────────

const DEFAULTS: Record<Exclude<ErrorPageVariant, 'custom'>, { code: string; title: string; description: string }> = {
  '404': {
    code:        '404',
    title:       'Page not found',
    description: "The page you're looking for doesn't exist or has been moved. Check the URL or go back home.",
  },
  '500': {
    code:        '500',
    title:       'Server error',
    description: 'Something went wrong on our end. Our engineers have been notified and are working on a fix.',
  },
  '503': {
    code:        '503',
    title:       'Service unavailable',
    description: "We're having trouble reaching our servers. Please check your connection and try again.",
  },
  maintenance: {
    code:        '🔧',
    title:       'Down for maintenance',
    description: "We're upgrading the platform to serve you better. We'll be back shortly.",
  },
  forbidden: {
    code:        '403',
    title:       'Access denied',
    description: "You don't have permission to view this page. Contact your administrator if you think this is a mistake.",
  },
};

// ─── Illustration ─────────────────────────────────────────────────────────────

function DefaultIllustration({ code, dark }: { code: string; dark: boolean }) {
  return (
    <div className="relative flex items-center justify-center mb-8">
      {/* Glow ring */}
      <div
        className="absolute w-48 h-48 rounded-full blur-[60px]"
        style={{ background: 'var(--ds-brand-600)', opacity: 0.15 }}
      />
      <span
        className={['relative text-8xl font-black tracking-tighter select-none', dark ? 'text-white/10' : 'text-[var(--ds-text-primary)]/10'].join(' ')}
        aria-hidden="true"
      >
        {code}
      </span>
    </div>
  );
}

// ─── ErrorPage ────────────────────────────────────────────────────────────────

export function ErrorPage({
  variant      = '404',
  code:        codeProp,
  title:       titleProp,
  description: descProp,
  actions,
  illustration,
  dark         = false,
  className    = '',
}: ErrorPageProps) {
  const defaults  = variant !== 'custom' ? DEFAULTS[variant] : undefined;
  const code      = codeProp      ?? defaults?.code      ?? '';
  const title     = titleProp     ?? defaults?.title     ?? 'Something went wrong';
  const desc      = descProp      ?? defaults?.description ?? '';

  const bg          = dark ? 'bg-gray-950' : 'bg-[var(--ds-bg-base)]';
  const textPrimary = dark ? 'text-white'  : 'text-[var(--ds-text-primary)]';
  const textMuted   = dark ? 'text-white/60' : 'text-[var(--ds-text-secondary)]';

  return (
    <div className={['relative min-h-screen flex flex-col items-center justify-center text-center px-4 py-20', bg, className].join(' ')}>
      <BackgroundElements variant="grid" opacity={dark ? 0.3 : 0.2} />

      <div className="relative z-10 max-w-md mx-auto space-y-4">
        {illustration ?? <DefaultIllustration code={code} dark={dark} />}

        <h1 className={['text-2xl font-bold', textPrimary].join(' ')}>{title}</h1>
        <p className={['text-sm leading-relaxed', textMuted].join(' ')}>{desc}</p>

        {actions && (
          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
}
