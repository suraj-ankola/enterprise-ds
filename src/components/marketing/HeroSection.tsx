'use client';
import React from 'react';
import { BackgroundElements, AnimatedBackground } from './BackgroundElements';

// ─── Types ────────────────────────────────────────────────────────────────────

export type HeroVariant = 'centered' | 'split' | 'video' | 'minimal';

export interface HeroSectionProps {
  variant?:     HeroVariant;
  /** Top-of-page announcement chip */
  announcement?: React.ReactNode;
  eyebrow?:     React.ReactNode;
  heading:      React.ReactNode;
  subheading?:  React.ReactNode;
  actions?:     React.ReactNode;
  /** Visual element (image, illustration, video) for split variant */
  visual?:      React.ReactNode;
  /** Stats row shown below CTA */
  stats?:       { label: string; value: React.ReactNode }[];
  /** Background override */
  background?:  React.ReactNode;
  dark?:        boolean;
  className?:   string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function HeroStats({ stats }: { stats: { label: string; value: React.ReactNode }[] }) {
  return (
    <div className="flex flex-wrap items-center gap-x-8 gap-y-4 pt-8 mt-8 border-t border-white/10">
      {stats.map(s => (
        <div key={s.label} className="text-center">
          <p className="text-2xl font-bold text-white">{s.value}</p>
          <p className="text-xs text-white/60 mt-0.5">{s.label}</p>
        </div>
      ))}
    </div>
  );
}

// ─── HeroSection ─────────────────────────────────────────────────────────────

export function HeroSection({
  variant      = 'centered',
  announcement,
  eyebrow,
  heading,
  subheading,
  actions,
  visual,
  stats,
  background,
  dark         = true,
  className    = '',
}: HeroSectionProps) {
  const textPrimary   = dark ? 'text-white'     : 'text-[var(--ds-text-primary)]';
  const textSecondary = dark ? 'text-white/70'  : 'text-[var(--ds-text-secondary)]';
  const bg            = dark ? 'bg-gray-950'    : 'bg-[var(--ds-bg-base)]';

  // ── Centered ──────────────────────────────────────────────────────────────
  if (variant === 'centered') {
    return (
      <section className={['relative overflow-hidden py-24 px-4', bg, className].join(' ')}>
        {background ?? <AnimatedBackground variant="aurora" />}
        <BackgroundElements variant="grid" opacity={0.3} />

        <div className="relative z-10 mx-auto max-w-3xl text-center space-y-6">
          {announcement && (
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/20 bg-white/5 text-xs font-medium text-white/80 backdrop-blur-sm">
              {announcement}
            </div>
          )}
          {eyebrow && <p className={['text-sm font-semibold uppercase tracking-widest', dark ? 'text-[var(--ds-brand-400)]' : 'text-[var(--ds-brand-600)]'].join(' ')}>{eyebrow}</p>}
          <h1 className={['text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight', textPrimary].join(' ')}>
            {heading}
          </h1>
          {subheading && <p className={['text-lg leading-relaxed max-w-xl mx-auto', textSecondary].join(' ')}>{subheading}</p>}
          {actions && <div className="flex flex-wrap items-center justify-center gap-3 pt-2">{actions}</div>}
          {stats && <HeroStats stats={stats} />}
        </div>
      </section>
    );
  }

  // ── Split ─────────────────────────────────────────────────────────────────
  if (variant === 'split') {
    return (
      <section className={['relative overflow-hidden py-20 px-4', bg, className].join(' ')}>
        {background ?? <BackgroundElements variant="gradient" opacity={0.6} />}

        <div className="relative z-10 mx-auto max-w-6xl grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            {announcement && (
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/20 bg-white/5 text-xs font-medium text-white/80">
                {announcement}
              </div>
            )}
            {eyebrow && <p className={['text-sm font-semibold uppercase tracking-widest', dark ? 'text-[var(--ds-brand-400)]' : 'text-[var(--ds-brand-600)]'].join(' ')}>{eyebrow}</p>}
            <h1 className={['text-4xl sm:text-5xl font-bold leading-tight tracking-tight', textPrimary].join(' ')}>
              {heading}
            </h1>
            {subheading && <p className={['text-lg leading-relaxed', textSecondary].join(' ')}>{subheading}</p>}
            {actions && <div className="flex flex-wrap items-center gap-3">{actions}</div>}
            {stats && <HeroStats stats={stats} />}
          </div>
          {visual && (
            <div className="relative lg:flex items-center justify-center">
              {visual}
            </div>
          )}
        </div>
      </section>
    );
  }

  // ── Video ─────────────────────────────────────────────────────────────────
  if (variant === 'video') {
    return (
      <section className={['relative overflow-hidden min-h-[600px] flex items-center py-20 px-4', className].join(' ')}>
        {/* Video background slot */}
        <div className="absolute inset-0 bg-gray-950">
          {background}
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="relative z-10 mx-auto max-w-3xl text-center space-y-6">
          {eyebrow && <p className="text-sm font-semibold uppercase tracking-widest text-[var(--ds-brand-400)]">{eyebrow}</p>}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-white">
            {heading}
          </h1>
          {subheading && <p className="text-lg text-white/70 leading-relaxed max-w-xl mx-auto">{subheading}</p>}
          {actions && <div className="flex flex-wrap items-center justify-center gap-3 pt-2">{actions}</div>}
        </div>
      </section>
    );
  }

  // ── Minimal ───────────────────────────────────────────────────────────────
  return (
    <section className={['py-20 px-4', dark ? 'bg-gray-950' : 'bg-[var(--ds-bg-base)]', className].join(' ')}>
      <div className="mx-auto max-w-2xl space-y-5">
        {eyebrow && <p className={['text-sm font-semibold uppercase tracking-widest', dark ? 'text-[var(--ds-brand-400)]' : 'text-[var(--ds-brand-600)]'].join(' ')}>{eyebrow}</p>}
        <h1 className={['text-4xl sm:text-5xl font-bold leading-tight', textPrimary].join(' ')}>{heading}</h1>
        {subheading && <p className={['text-lg leading-relaxed', textSecondary].join(' ')}>{subheading}</p>}
        {actions && <div className="flex flex-wrap items-center gap-3 pt-2">{actions}</div>}
      </div>
    </section>
  );
}
