'use client';
import React from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

export type BgElementType = 'grid' | 'dots' | 'gradient' | 'noise' | 'aurora';

export interface BackgroundElementsProps {
  variant?:   BgElementType;
  /** Base hue for gradient/aurora (0-360) */
  hue?:       number;
  opacity?:   number;
  className?: string;
}

// ─── AnimatedBackground ───────────────────────────────────────────────────────

export interface AnimatedBackgroundProps {
  variant?: 'aurora' | 'particles' | 'gradient-flow' | 'mesh';
  className?: string;
}

// ─── BackgroundElements ───────────────────────────────────────────────────────

export function BackgroundElements({
  variant  = 'grid',
  hue      = 220,
  opacity  = 0.4,
  className = '',
}: BackgroundElementsProps) {
  const base = ['absolute inset-0 pointer-events-none overflow-hidden', className].join(' ');

  if (variant === 'grid') {
    return (
      <div
        className={base}
        style={{
          backgroundImage: `
            linear-gradient(to right, hsl(${hue} 40% 50% / ${opacity * 0.15}) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(${hue} 40% 50% / ${opacity * 0.15}) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />
    );
  }

  if (variant === 'dots') {
    return (
      <div
        className={base}
        style={{
          backgroundImage: `radial-gradient(circle, hsl(${hue} 40% 50% / ${opacity * 0.4}) 1px, transparent 1px)`,
          backgroundSize: '28px 28px',
        }}
      />
    );
  }

  if (variant === 'noise') {
    return (
      <div
        className={base}
        style={{
          opacity: opacity * 0.06,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '256px',
        }}
      />
    );
  }

  if (variant === 'gradient') {
    return (
      <div
        className={base}
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 50% -10%, hsl(${hue} 80% 60% / ${opacity * 0.25}), transparent),
            radial-gradient(ellipse 60% 40% at 90% 60%, hsl(${(hue + 40) % 360} 80% 65% / ${opacity * 0.15}), transparent)
          `,
        }}
      />
    );
  }

  // aurora
  return (
    <div className={base} aria-hidden="true">
      <div
        className="absolute -top-1/2 left-1/4 w-[600px] h-[600px] rounded-full blur-[120px] animate-[aurora1_8s_ease-in-out_infinite_alternate]"
        style={{ background: `hsl(${hue} 80% 60% / ${opacity * 0.2})` }}
      />
      <div
        className="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full blur-[100px] animate-[aurora2_10s_ease-in-out_infinite_alternate]"
        style={{ background: `hsl(${(hue + 60) % 360} 80% 65% / ${opacity * 0.2})` }}
      />
      <div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full blur-[90px] animate-[aurora3_12s_ease-in-out_infinite_alternate]"
        style={{ background: `hsl(${(hue + 120) % 360} 70% 60% / ${opacity * 0.15})` }}
      />
    </div>
  );
}

// ─── AnimatedBackground ───────────────────────────────────────────────────────

export function AnimatedBackground({ variant = 'aurora', className = '' }: AnimatedBackgroundProps) {
  const base = ['absolute inset-0 overflow-hidden pointer-events-none', className].join(' ');

  if (variant === 'gradient-flow') {
    return (
      <div
        className={[base, 'animate-[gradientShift_8s_ease_infinite]'].join(' ')}
        style={{
          background: 'linear-gradient(135deg, var(--ds-brand-600), hsl(260 80% 60%), var(--ds-brand-400), hsl(200 80% 60%))',
          backgroundSize: '300% 300%',
        }}
      />
    );
  }

  if (variant === 'mesh') {
    return (
      <div className={base}>
        {[
          { x: '10%',  y: '-10%', color: 'var(--ds-brand-600)', size: '500px', delay: '0s' },
          { x: '80%',  y: '20%',  color: 'hsl(260 80% 60%)',    size: '400px', delay: '2s' },
          { x: '20%',  y: '80%',  color: 'hsl(200 80% 60%)',    size: '350px', delay: '4s' },
          { x: '70%',  y: '70%',  color: 'var(--ds-brand-400)', size: '300px', delay: '6s' },
        ].map((blob, i) => (
          <div
            key={i}
            className="absolute rounded-full blur-[80px] animate-[meshBlob_8s_ease-in-out_infinite_alternate]"
            style={{
              width: blob.size, height: blob.size,
              left: blob.x, top: blob.y,
              background: blob.color,
              opacity: 0.15,
              animationDelay: blob.delay,
            }}
          />
        ))}
      </div>
    );
  }

  if (variant === 'particles') {
    return (
      <div className={base}>
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white animate-float"
            style={{
              width:  `${1 + (i % 3)}px`,
              height: `${1 + (i % 3)}px`,
              left:   `${(i * 37) % 100}%`,
              top:    `${(i * 53) % 100}%`,
              opacity: 0.2 + (i % 5) * 0.06,
              animationDuration: `${4 + (i % 8)}s`,
              animationDelay:    `${(i % 5) * 0.8}s`,
            }}
          />
        ))}
      </div>
    );
  }

  // aurora (default)
  return <BackgroundElements variant="aurora" className={className} />;
}

// ─── Blob ─────────────────────────────────────────────────────────────────────

export interface BlobProps {
  color?:     string;
  size?:      number;
  blur?:      number;
  opacity?:   number;
  className?: string;
}

export function Blob({ color = 'var(--ds-brand-600)', size = 400, blur = 80, opacity = 0.15, className = '' }: BlobProps) {
  return (
    <div
      className={['absolute rounded-full pointer-events-none', className].join(' ')}
      style={{
        width: size, height: size,
        background: color,
        filter: `blur(${blur}px)`,
        opacity,
      }}
    />
  );
}
