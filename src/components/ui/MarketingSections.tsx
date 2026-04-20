import React from 'react';

// ─── LogoBar ──────────────────────────────────────────────────────────────────

export interface LogoBarProps {
  label?:    string;
  logos:     React.ReactNode[];
  className?: string;
}

export function LogoBar({ label = 'Trusted by teams at', logos, className = '' }: LogoBarProps) {
  return (
    <section className={['w-full py-12 px-6 border-y border-[var(--ds-border-base)] bg-[var(--ds-bg-surface)]', className].join(' ')}>
      <div className="max-w-[1280px] mx-auto flex flex-col items-center gap-6">
        {label && (
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--ds-text-muted)]">{label}</p>
        )}
        <div className="flex flex-wrap items-center justify-center gap-8 opacity-60">
          {logos}
        </div>
      </div>
    </section>
  );
}

// ─── FeatureGrid ──────────────────────────────────────────────────────────────

export interface FeatureItem {
  icon:        React.ReactNode;
  title:       string;
  description: string;
}

export interface FeatureGridProps {
  eyebrow?:   string;
  headline?:  string;
  subheadline?: string;
  features:   FeatureItem[];
  columns?:   2 | 3 | 4;
  className?: string;
}

const GRID_COLS: Record<2 | 3 | 4, string> = {
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
};

export function FeatureGrid({
  eyebrow,
  headline,
  subheadline,
  features,
  columns  = 3,
  className = '',
}: FeatureGridProps) {
  return (
    <section className={['w-full py-16 lg:py-24 px-6', className].join(' ')}>
      <div className="max-w-[1280px] mx-auto flex flex-col gap-12">
        {(eyebrow || headline || subheadline) && (
          <div className="flex flex-col items-center text-center gap-3 max-w-2xl mx-auto">
            {eyebrow && (
              <span className="text-xs font-semibold uppercase tracking-widest text-[var(--ds-brand-600)]">{eyebrow}</span>
            )}
            {headline && (
              <h2 className="text-3xl sm:text-4xl font-bold text-[var(--ds-text-primary)] leading-tight">{headline}</h2>
            )}
            {subheadline && (
              <p className="text-base text-[var(--ds-text-secondary)]">{subheadline}</p>
            )}
          </div>
        )}

        <div className={['grid gap-8', GRID_COLS[columns]].join(' ')}>
          {features.map((f, i) => (
            <div key={i} className="flex flex-col gap-3 p-6 rounded-xl bg-[var(--ds-bg-surface)] border border-[var(--ds-border-base)] hover:shadow-[var(--ds-shadow-md)] transition-shadow">
              <span className="h-10 w-10 flex items-center justify-center rounded-xl bg-[var(--ds-brand-100)] text-[var(--ds-brand-600)]">
                {f.icon}
              </span>
              <h3 className="text-base font-semibold text-[var(--ds-text-primary)]">{f.title}</h3>
              <p className="text-sm text-[var(--ds-text-secondary)] leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── SplitFeature ─────────────────────────────────────────────────────────────

export interface SplitFeatureProps {
  eyebrow?:    string;
  headline:    string;
  description: string;
  bullets?:    string[];
  cta?:        React.ReactNode;
  visual:      React.ReactNode;
  /** Which side the text is on */
  textSide?:   'left' | 'right';
  bg?:         'base' | 'surface' | 'brand';
  className?:  string;
}

const SPLIT_BG: Record<'base' | 'surface' | 'brand', string> = {
  base:    'bg-[var(--ds-bg-base)]',
  surface: 'bg-[var(--ds-bg-surface)]',
  brand:   'bg-gradient-to-br from-[var(--ds-brand-600)] to-[var(--ds-brand-800)]',
};

export function SplitFeature({
  eyebrow,
  headline,
  description,
  bullets,
  cta,
  visual,
  textSide  = 'left',
  bg        = 'surface',
  className = '',
}: SplitFeatureProps) {
  const isBrand  = bg === 'brand';
  const textColor = isBrand ? 'text-white' : 'text-[var(--ds-text-primary)]';
  const mutedColor = isBrand ? 'text-white/70' : 'text-[var(--ds-text-secondary)]';

  const textBlock = (
    <div className="flex flex-col gap-5">
      {eyebrow && (
        <span className={['text-xs font-semibold uppercase tracking-widest', isBrand ? 'text-white/60' : 'text-[var(--ds-brand-600)]'].join(' ')}>
          {eyebrow}
        </span>
      )}
      <h2 className={['text-3xl sm:text-4xl font-bold leading-tight', textColor].join(' ')}>{headline}</h2>
      <p className={['text-base leading-relaxed', mutedColor].join(' ')}>{description}</p>
      {bullets && (
        <ul className="flex flex-col gap-2">
          {bullets.map((b, i) => (
            <li key={i} className={['flex items-start gap-2 text-sm', mutedColor].join(' ')}>
              <span className={['mt-0.5 h-4 w-4 shrink-0 rounded-full flex items-center justify-center text-[10px] font-bold', isBrand ? 'bg-white/20 text-white' : 'bg-[var(--ds-brand-100)] text-[var(--ds-brand-600)]'].join(' ')}>✓</span>
              {b}
            </li>
          ))}
        </ul>
      )}
      {cta && <div className="mt-2">{cta}</div>}
    </div>
  );

  const visualBlock = (
    <div className="flex items-center justify-center">{visual}</div>
  );

  const [first, second] = textSide === 'left'
    ? [textBlock, visualBlock]
    : [visualBlock, textBlock];

  return (
    <section className={[SPLIT_BG[bg], 'w-full py-16 lg:py-24 px-6', className].join(' ')}>
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {first}
        {second}
      </div>
    </section>
  );
}

// ─── TestimonialGrid ──────────────────────────────────────────────────────────

export interface TestimonialItem {
  quote:    string;
  name:     string;
  role:     string;
  company?: string;
  avatar?:  React.ReactNode;
}

export interface TestimonialGridProps {
  headline?:     string;
  testimonials:  TestimonialItem[];
  className?:    string;
}

export function TestimonialGrid({ headline, testimonials, className = '' }: TestimonialGridProps) {
  return (
    <section className={['w-full py-16 lg:py-24 px-6 bg-[var(--ds-bg-subtle)]', className].join(' ')}>
      <div className="max-w-[1280px] mx-auto flex flex-col gap-12">
        {headline && (
          <h2 className="text-3xl font-bold text-[var(--ds-text-primary)] text-center">{headline}</h2>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <figure
              key={i}
              className="flex flex-col gap-4 p-6 rounded-xl bg-[var(--ds-bg-surface)] border border-[var(--ds-border-base)] shadow-[var(--ds-shadow-xs)]"
            >
              <blockquote className="text-sm text-[var(--ds-text-secondary)] leading-relaxed italic">
                "{t.quote}"
              </blockquote>
              <figcaption className="flex items-center gap-3 mt-auto">
                {t.avatar ?? (
                  <span className="h-9 w-9 rounded-full bg-[var(--ds-brand-100)] flex items-center justify-center text-sm font-bold text-[var(--ds-brand-600)] shrink-0">
                    {t.name[0]}
                  </span>
                )}
                <div>
                  <p className="text-sm font-semibold text-[var(--ds-text-primary)]">{t.name}</p>
                  <p className="text-xs text-[var(--ds-text-muted)]">
                    {t.role}{t.company ? `, ${t.company}` : ''}
                  </p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CtaBanner ────────────────────────────────────────────────────────────────

export interface CtaBannerProps {
  headline:    string;
  subheadline?: string;
  primaryCta?: React.ReactNode;
  secondaryCta?: React.ReactNode;
  variant?:    'brand' | 'subtle';
  className?:  string;
}

export function CtaBanner({
  headline,
  subheadline,
  primaryCta,
  secondaryCta,
  variant   = 'brand',
  className = '',
}: CtaBannerProps) {
  return (
    <section
      className={[
        'w-full py-16 lg:py-20 px-6',
        variant === 'brand'
          ? 'bg-gradient-to-r from-[var(--ds-brand-600)] to-[var(--ds-brand-700)]'
          : 'bg-[var(--ds-bg-surface)] border-y border-[var(--ds-border-base)]',
        className,
      ].filter(Boolean).join(' ')}
    >
      <div className="max-w-[1280px] mx-auto flex flex-col items-center text-center gap-6">
        <h2 className={['text-3xl sm:text-4xl font-bold leading-tight', variant === 'brand' ? 'text-white' : 'text-[var(--ds-text-primary)]'].join(' ')}>
          {headline}
        </h2>
        {subheadline && (
          <p className={['text-base max-w-xl', variant === 'brand' ? 'text-white/80' : 'text-[var(--ds-text-secondary)]'].join(' ')}>
            {subheadline}
          </p>
        )}
        {(primaryCta || secondaryCta) && (
          <div className="flex flex-wrap items-center justify-center gap-3">
            {primaryCta}
            {secondaryCta}
          </div>
        )}
      </div>
    </section>
  );
}
