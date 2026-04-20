import React from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface HeroSectionProps {
  /** Small eyebrow label above headline */
  eyebrow?:     string;
  headline:     string;
  /** Highlighted portion of headline (rendered with brand color) */
  headlineAccent?: string;
  subheadline?: string;
  primaryCta?:  React.ReactNode;
  secondaryCta?: React.ReactNode;
  /** Visual element on the right (screenshot, illustration, etc.) */
  visual?:      React.ReactNode;
  /** Social proof row below CTAs */
  socialProof?: React.ReactNode;
  /** Alignment — centered or split (text left, visual right) */
  layout?:      'centered' | 'split';
  className?:   string;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function HeroSection({
  eyebrow,
  headline,
  headlineAccent,
  subheadline,
  primaryCta,
  secondaryCta,
  visual,
  socialProof,
  layout    = 'split',
  className = '',
}: HeroSectionProps) {
  const isCentered = layout === 'centered';

  const textBlock = (
    <div className={['flex flex-col gap-6', isCentered ? 'items-center text-center' : 'items-start'].join(' ')}>
      {eyebrow && (
        <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold tracking-wide uppercase bg-[var(--ds-brand-100)] text-[var(--ds-brand-700)]">
          {eyebrow}
        </span>
      )}

      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-[var(--ds-text-primary)]">
        {headlineAccent
          ? headline.split(headlineAccent).flatMap((part, i, arr) =>
              i < arr.length - 1
                ? [part, <span key={i} className="text-[var(--ds-brand-600)]">{headlineAccent}</span>]
                : [part]
            )
          : headline}
      </h1>

      {subheadline && (
        <p className="text-lg text-[var(--ds-text-secondary)] max-w-xl leading-relaxed">
          {subheadline}
        </p>
      )}

      {(primaryCta || secondaryCta) && (
        <div className={['flex flex-wrap gap-3', isCentered ? 'justify-center' : ''].join(' ')}>
          {primaryCta}
          {secondaryCta}
        </div>
      )}

      {socialProof && (
        <div className="mt-2">{socialProof}</div>
      )}
    </div>
  );

  if (isCentered) {
    return (
      <section
        className={[
          'w-full py-20 lg:py-28 px-6',
          'bg-gradient-to-b from-[var(--ds-brand-50)] to-[var(--ds-bg-base)]',
          className,
        ].filter(Boolean).join(' ')}
      >
        <div className="max-w-[1280px] mx-auto flex flex-col items-center gap-12">
          {textBlock}
          {visual && <div className="w-full max-w-3xl">{visual}</div>}
        </div>
      </section>
    );
  }

  return (
    <section
      className={[
        'w-full py-16 lg:py-24 px-6',
        'bg-gradient-to-br from-[var(--ds-bg-surface)] via-[var(--ds-brand-50)] to-[var(--ds-bg-base)]',
        className,
      ].filter(Boolean).join(' ')}
    >
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {textBlock}
        {visual && (
          <div className="flex items-center justify-center lg:justify-end">
            {visual}
          </div>
        )}
      </div>
    </section>
  );
}
