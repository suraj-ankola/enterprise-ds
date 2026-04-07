'use client';
import React from 'react';
import { CheckIcon } from '@phosphor-icons/react';
import { BackgroundElements } from './BackgroundElements';

// ═══════════════════════════════════════════════════════════════════════════════
// LogoCloud
// ═══════════════════════════════════════════════════════════════════════════════

export interface LogoCloudProps {
  eyebrow?:  string;
  logos:     { name: string; logo: React.ReactNode }[];
  dark?:     boolean;
  className?: string;
}

export function LogoCloud({ eyebrow = 'Trusted by leading teams', logos, dark = false, className = '' }: LogoCloudProps) {
  const bg   = dark ? 'bg-gray-950 border-y border-white/10' : 'bg-[var(--ds-bg-subtle)] border-y border-[var(--ds-border-base)]';
  const text = dark ? 'text-white/40' : 'text-[var(--ds-text-muted)]';
  return (
    <section className={['py-12 px-4', bg, className].join(' ')}>
      <div className="mx-auto max-w-5xl text-center">
        {eyebrow && <p className={['text-xs font-semibold uppercase tracking-widest mb-8', text].join(' ')}>{eyebrow}</p>}
        <div className="flex flex-wrap items-center justify-center gap-8">
          {logos.map(l => (
            <div key={l.name} className={['grayscale opacity-50 hover:opacity-80 hover:grayscale-0 transition-all', text].join(' ')} aria-label={l.name}>
              {l.logo}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// StatsSection
// ═══════════════════════════════════════════════════════════════════════════════

export interface StatsSectionProps {
  eyebrow?:  string;
  heading?:  React.ReactNode;
  stats:     { value: string; label: string; description?: string }[];
  dark?:     boolean;
  className?: string;
}

export function StatsSection({ eyebrow, heading, stats, dark = true, className = '' }: StatsSectionProps) {
  const bg   = dark ? 'bg-gray-950' : 'bg-[var(--ds-bg-base)]';
  const text = dark ? 'text-white'  : 'text-[var(--ds-text-primary)]';
  const sub  = dark ? 'text-white/60' : 'text-[var(--ds-text-secondary)]';
  const muted = dark ? 'text-white/40' : 'text-[var(--ds-text-muted)]';
  return (
    <section className={['relative py-20 px-4 overflow-hidden', bg, className].join(' ')}>
      <BackgroundElements variant="grid" opacity={dark ? 0.2 : 0.15} />
      <div className="relative z-10 mx-auto max-w-5xl text-center space-y-12">
        {(eyebrow || heading) && (
          <div className="space-y-2">
            {eyebrow && <p className={['text-sm font-semibold uppercase tracking-widest', dark ? 'text-[var(--ds-brand-400)]' : 'text-[var(--ds-brand-600)]'].join(' ')}>{eyebrow}</p>}
            {heading  && <h2 className={['text-3xl font-bold', text].join(' ')}>{heading}</h2>}
          </div>
        )}
        <div className={['grid gap-8', stats.length >= 4 ? 'sm:grid-cols-4' : stats.length === 3 ? 'sm:grid-cols-3' : 'sm:grid-cols-2'].join(' ')}>
          {stats.map(s => (
            <div key={s.label} className="text-center space-y-1">
              <p className={['text-4xl font-black tracking-tight', text].join(' ')}>{s.value}</p>
              <p className={['text-sm font-semibold', sub].join(' ')}>{s.label}</p>
              {s.description && <p className={['text-xs leading-relaxed', muted].join(' ')}>{s.description}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// FeatureSection
// ═══════════════════════════════════════════════════════════════════════════════

export interface Feature {
  icon?:         React.ReactNode;
  title:         string;
  description:   string;
}

export type FeatureLayout = 'grid' | 'alternating' | 'list';

export interface FeatureSectionProps {
  eyebrow?:  string;
  heading:   React.ReactNode;
  subheading?: React.ReactNode;
  features:  Feature[];
  layout?:   FeatureLayout;
  dark?:     boolean;
  className?: string;
}

export function FeatureSection({ eyebrow, heading, subheading, features, layout = 'grid', dark = false, className = '' }: FeatureSectionProps) {
  const bg   = dark ? 'bg-gray-950' : 'bg-[var(--ds-bg-base)]';
  const text = dark ? 'text-white'  : 'text-[var(--ds-text-primary)]';
  const sub  = dark ? 'text-white/70' : 'text-[var(--ds-text-secondary)]';
  const cardBg = dark ? 'bg-white/5 border-white/10' : 'bg-[var(--ds-bg-surface)] border-[var(--ds-border-base)]';
  const iconBg = dark ? 'bg-[var(--ds-brand-600)]/20 text-[var(--ds-brand-400)]' : 'bg-[var(--ds-brand-50)] text-[var(--ds-brand-600)]';

  return (
    <section className={['py-20 px-4', bg, className].join(' ')}>
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="text-center mb-14 space-y-3">
          {eyebrow && <p className={['text-sm font-semibold uppercase tracking-widest', dark ? 'text-[var(--ds-brand-400)]' : 'text-[var(--ds-brand-600)]'].join(' ')}>{eyebrow}</p>}
          <h2 className={['text-3xl font-bold', text].join(' ')}>{heading}</h2>
          {subheading && <p className={['text-lg max-w-xl mx-auto', sub].join(' ')}>{subheading}</p>}
        </div>

        {layout === 'grid' && (
          <div className={['grid gap-6', features.length % 3 === 0 ? 'sm:grid-cols-3' : 'sm:grid-cols-2'].join(' ')}>
            {features.map(f => (
              <div key={f.title} className={['rounded-xl border p-5 space-y-3', cardBg].join(' ')}>
                {f.icon && <div className={['w-9 h-9 rounded-lg flex items-center justify-center', iconBg].join(' ')}>{f.icon}</div>}
                <p className={['font-semibold text-sm', text].join(' ')}>{f.title}</p>
                <p className={['text-sm leading-relaxed', sub].join(' ')}>{f.description}</p>
              </div>
            ))}
          </div>
        )}

        {layout === 'list' && (
          <div className="grid sm:grid-cols-2 gap-4">
            {features.map(f => (
              <div key={f.title} className="flex items-start gap-3">
                <div className={['mt-0.5 w-5 h-5 shrink-0 rounded-full flex items-center justify-center', iconBg].join(' ')}>
                  {f.icon ?? <CheckIcon size={12} weight="bold" />}
                </div>
                <div>
                  <p className={['font-semibold text-sm', text].join(' ')}>{f.title}</p>
                  <p className={['text-sm leading-relaxed', sub].join(' ')}>{f.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// PricingCard
// ═══════════════════════════════════════════════════════════════════════════════

export interface PricingTier {
  name:          string;
  price:         React.ReactNode;
  period?:       string;
  description:   string;
  features:      string[];
  cta:           React.ReactNode;
  highlighted?:  boolean;
  badge?:        string;
}

export interface PricingSectionProps {
  eyebrow?:  string;
  heading?:  React.ReactNode;
  tiers:     PricingTier[];
  dark?:     boolean;
  className?: string;
}

export function PricingSection({ eyebrow, heading, tiers, dark = false, className = '' }: PricingSectionProps) {
  const bg   = dark ? 'bg-gray-950' : 'bg-[var(--ds-bg-base)]';
  const text = dark ? 'text-white'  : 'text-[var(--ds-text-primary)]';
  const sub  = dark ? 'text-white/60' : 'text-[var(--ds-text-muted)]';

  return (
    <section className={['py-20 px-4', bg, className].join(' ')}>
      <div className="mx-auto max-w-5xl">
        {(eyebrow || heading) && (
          <div className="text-center mb-12 space-y-2">
            {eyebrow && <p className={['text-sm font-semibold uppercase tracking-widest', dark ? 'text-[var(--ds-brand-400)]' : 'text-[var(--ds-brand-600)]'].join(' ')}>{eyebrow}</p>}
            {heading  && <h2 className={['text-3xl font-bold', text].join(' ')}>{heading}</h2>}
          </div>
        )}

        <div className={['grid gap-6', tiers.length === 3 ? 'lg:grid-cols-3' : tiers.length === 2 ? 'lg:grid-cols-2' : 'lg:grid-cols-4'].join(' ')}>
          {tiers.map(tier => (
            <div
              key={tier.name}
              className={[
                'relative rounded-2xl border p-6 flex flex-col',
                tier.highlighted
                  ? 'bg-[var(--ds-brand-600)] border-[var(--ds-brand-600)] text-white'
                  : dark
                    ? 'bg-white/5 border-white/10'
                    : 'bg-[var(--ds-bg-surface)] border-[var(--ds-border-base)]',
              ].join(' ')}
            >
              {tier.badge && (
                <span className={['absolute -top-3 left-1/2 -translate-x-1/2 text-xs px-3 py-0.5 rounded-full font-semibold', tier.highlighted ? 'bg-white text-[var(--ds-brand-600)]' : 'bg-[var(--ds-brand-600)] text-white'].join(' ')}>
                  {tier.badge}
                </span>
              )}

              <div className="space-y-1 mb-4">
                <p className={['text-sm font-semibold', tier.highlighted ? 'text-white/80' : sub].join(' ')}>{tier.name}</p>
                <div className={['text-3xl font-black', tier.highlighted ? 'text-white' : text].join(' ')}>{tier.price}</div>
                {tier.period && <p className={['text-xs', tier.highlighted ? 'text-white/60' : sub].join(' ')}>{tier.period}</p>}
              </div>

              <p className={['text-sm mb-6', tier.highlighted ? 'text-white/70' : sub].join(' ')}>{tier.description}</p>

              <ul className="space-y-2.5 flex-1 mb-6">
                {tier.features.map(f => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <CheckIcon size={14} weight="bold" className={['mt-0.5 shrink-0', tier.highlighted ? 'text-white/80' : 'text-[var(--ds-brand-600)]'].join(' ')} />
                    <span className={tier.highlighted ? 'text-white/80' : sub}>{f}</span>
                  </li>
                ))}
              </ul>

              {tier.cta}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// Testimonials
// ═══════════════════════════════════════════════════════════════════════════════

export interface Testimonial {
  quote:    string;
  name:     string;
  title:    string;
  company?: string;
  avatar?:  React.ReactNode;
}

export interface TestimonialsSectionProps {
  eyebrow?:     string;
  heading?:     React.ReactNode;
  testimonials: Testimonial[];
  dark?:        boolean;
  className?:   string;
}

export function TestimonialsSection({ eyebrow, heading, testimonials, dark = false, className = '' }: TestimonialsSectionProps) {
  const bg   = dark ? 'bg-gray-950' : 'bg-[var(--ds-bg-subtle)]';
  const text = dark ? 'text-white'  : 'text-[var(--ds-text-primary)]';
  const sub  = dark ? 'text-white/70' : 'text-[var(--ds-text-secondary)]';
  const cardBg = dark ? 'bg-white/5 border-white/10' : 'bg-[var(--ds-bg-surface)] border-[var(--ds-border-base)]';

  return (
    <section className={['py-20 px-4', bg, className].join(' ')}>
      <div className="mx-auto max-w-5xl">
        {(eyebrow || heading) && (
          <div className="text-center mb-12 space-y-2">
            {eyebrow && <p className={['text-sm font-semibold uppercase tracking-widest', dark ? 'text-[var(--ds-brand-400)]' : 'text-[var(--ds-brand-600)]'].join(' ')}>{eyebrow}</p>}
            {heading  && <h2 className={['text-3xl font-bold', text].join(' ')}>{heading}</h2>}
          </div>
        )}

        <div className={['columns-1 sm:columns-2 lg:columns-3 gap-5'].join(' ')}>
          {testimonials.map(t => (
            <div key={t.name} className={['break-inside-avoid rounded-xl border p-5 mb-5', cardBg].join(' ')}>
              <p className={['text-sm leading-relaxed mb-4', sub].join(' ')}>"{t.quote}"</p>
              <div className="flex items-center gap-3">
                {t.avatar
                  ? t.avatar
                  : (
                    <div className="h-8 w-8 rounded-full bg-[var(--ds-brand-600)] flex items-center justify-center text-white text-xs font-bold shrink-0">
                      {t.name.charAt(0)}
                    </div>
                  )}
                <div>
                  <p className={['text-xs font-semibold', text].join(' ')}>{t.name}</p>
                  <p className={['text-[10px]', sub].join(' ')}>{t.title}{t.company ? `, ${t.company}` : ''}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// CTABanner
// ═══════════════════════════════════════════════════════════════════════════════

export interface CTABannerProps {
  heading:       React.ReactNode;
  subheading?:   React.ReactNode;
  actions:       React.ReactNode;
  dark?:         boolean;
  variant?:      'gradient' | 'brand' | 'outlined';
  className?:    string;
}

export function CTABanner({ heading, subheading, actions, dark = true, variant = 'gradient', className = '' }: CTABannerProps) {
  const bg =
    variant === 'brand'    ? 'bg-[var(--ds-brand-600)]' :
    variant === 'outlined' ? (dark ? 'bg-transparent border border-white/20' : 'bg-transparent border border-[var(--ds-border-base)]') :
    /* gradient */           (dark ? 'bg-gradient-to-r from-gray-900 via-[var(--ds-brand-900,#1e1b4b)] to-gray-900' : 'bg-gradient-to-r from-[var(--ds-brand-50)] to-[var(--ds-brand-100)]');

  const textH = variant === 'brand' || dark ? 'text-white' : 'text-[var(--ds-text-primary)]';
  const textS = variant === 'brand' ? 'text-white/80' : dark ? 'text-white/60' : 'text-[var(--ds-text-secondary)]';

  return (
    <section className={['py-16 px-4', dark && variant !== 'brand' ? 'bg-gray-950' : '', className].join(' ')}>
      <div className={['relative overflow-hidden mx-auto max-w-4xl rounded-2xl px-8 py-12 text-center', bg].join(' ')}>
        <BackgroundElements variant="dots" opacity={0.2} />
        <div className="relative z-10 space-y-4">
          <h2 className={['text-3xl font-bold', textH].join(' ')}>{heading}</h2>
          {subheading && <p className={['text-base max-w-xl mx-auto', textS].join(' ')}>{subheading}</p>}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">{actions}</div>
        </div>
      </div>
    </section>
  );
}
