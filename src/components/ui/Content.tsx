import React from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

export type ContentWidth = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
export type ContentPadding = 'none' | 'sm' | 'md' | 'lg';

export interface ContentProps {
  children:    React.ReactNode;
  /** Max-width constraint */
  width?:      ContentWidth;
  /** Horizontal padding */
  padding?:    ContentPadding;
  /** Center the container horizontally */
  centered?:   boolean;
  /** Remove default vertical spacing between children */
  flush?:      boolean;
  as?:         React.ElementType;
  className?:  string;
}

// ─── Maps ─────────────────────────────────────────────────────────────────────

const MAX_W: Record<ContentWidth, string> = {
  sm:   'max-w-[640px]',
  md:   'max-w-[768px]',
  lg:   'max-w-[1024px]',
  xl:   'max-w-[1280px]',
  '2xl':'max-w-[1536px]',
  full: 'max-w-full',
};

const PX: Record<ContentPadding, string> = {
  none: '',
  sm:   'px-4',
  md:   'px-6',
  lg:   'px-8',
};

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * Layout wrapper that constrains content width and adds consistent horizontal padding.
 * Drop inside any page layout to keep content readable at wide viewports.
 */
export function Content({
  children,
  width    = 'xl',
  padding  = 'md',
  centered = true,
  flush    = false,
  as: Tag  = 'div',
  className = '',
}: ContentProps) {
  return (
    <Tag
      className={[
        'w-full',
        MAX_W[width],
        PX[padding],
        centered ? 'mx-auto' : '',
        !flush ? 'py-6' : '',
        className,
      ].filter(Boolean).join(' ')}
    >
      {children}
    </Tag>
  );
}
