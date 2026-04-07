import React, { useCallback, useEffect, useRef, useState } from 'react';
import { CaretLeftIcon, CaretRightIcon } from '@phosphor-icons/react';

// ─── Types ────────────────────────────────────────────────────────────────────

export type CarouselOrientation = 'horizontal' | 'vertical';

export interface CarouselProps {
  children:        React.ReactNode;
  /** How many slides visible at once */
  slidesPerView?:  number;
  /** Gap between slides in px */
  gap?:            number;
  autoPlay?:       boolean;
  autoPlayInterval?: number;
  loop?:           boolean;
  showArrows?:     boolean;
  showDots?:       boolean;
  /** Pause autoplay on hover */
  pauseOnHover?:   boolean;
  className?:      string;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function Carousel({
  children,
  slidesPerView    = 1,
  gap              = 16,
  autoPlay         = false,
  autoPlayInterval = 4000,
  loop             = false,
  showArrows       = true,
  showDots         = true,
  pauseOnHover     = true,
  className        = '',
}: CarouselProps) {
  const slides = React.Children.toArray(children);
  const total  = slides.length;
  const maxIdx = Math.max(0, total - slidesPerView);

  const [current,   setCurrent]   = useState(0);
  const [paused,    setPaused]    = useState(false);
  const [dragging,  setDragging]  = useState(false);
  const dragStart                  = useRef(0);
  const trackRef                   = useRef<HTMLDivElement>(null);

  const prev = useCallback(() => {
    setCurrent(i => {
      if (i === 0) return loop ? maxIdx : 0;
      return i - 1;
    });
  }, [loop, maxIdx]);

  const next = useCallback(() => {
    setCurrent(i => {
      if (i >= maxIdx) return loop ? 0 : maxIdx;
      return i + 1;
    });
  }, [loop, maxIdx]);

  // Autoplay
  useEffect(() => {
    if (!autoPlay || paused) return;
    const id = setInterval(next, autoPlayInterval);
    return () => clearInterval(id);
  }, [autoPlay, paused, autoPlayInterval, next]);

  // Drag / swipe
  function onPointerDown(e: React.PointerEvent) {
    setDragging(true);
    dragStart.current = e.clientX;
    trackRef.current?.setPointerCapture(e.pointerId);
  }
  function onPointerUp(e: React.PointerEvent) {
    if (!dragging) return;
    setDragging(false);
    const delta = e.clientX - dragStart.current;
    if (delta < -40) next();
    else if (delta > 40) prev();
  }

  // Keyboard
  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'ArrowLeft')  { e.preventDefault(); prev(); }
    if (e.key === 'ArrowRight') { e.preventDefault(); next(); }
  }

  const slideWidthPct = 100 / slidesPerView;
  const translateX    = `calc(-${current * slideWidthPct}% - ${current * gap / slidesPerView}px)`;

  const canPrev = current > 0 || loop;
  const canNext = current < maxIdx || loop;

  const arrowBtn = (enabled: boolean) => [
    'absolute top-1/2 -translate-y-1/2 z-10',
    'h-9 w-9 flex items-center justify-center rounded-full',
    'bg-[var(--ds-bg-surface)] border border-[var(--ds-border-base)] shadow-sm',
    'transition-all duration-[var(--ds-duration-base)]',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ds-brand-500)]',
    enabled
      ? 'text-[var(--ds-text-primary)] hover:bg-[var(--ds-bg-subtle)] cursor-pointer'
      : 'text-[var(--ds-text-muted)] opacity-40 cursor-not-allowed',
  ].join(' ');

  return (
    <div
      className={['relative select-none', className].join(' ')}
      onMouseEnter={() => pauseOnHover && setPaused(true)}
      onMouseLeave={() => pauseOnHover && setPaused(false)}
    >
      {/* Track */}
      <div className="overflow-hidden rounded-xl">
        <div
          ref={trackRef}
          role="region"
          aria-roledescription="carousel"
          aria-live="polite"
          tabIndex={0}
          onKeyDown={onKeyDown}
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          style={{ transform: `translateX(${translateX})`, gap: `${gap}px` }}
          className="flex transition-transform duration-300 ease-in-out cursor-grab active:cursor-grabbing focus-visible:outline-none"
        >
          {slides.map((slide, i) => (
            <div
              key={i}
              role="group"
              aria-roledescription="slide"
              aria-label={`Slide ${i + 1} of ${total}`}
              style={{ minWidth: `calc(${slideWidthPct}% - ${gap * (slidesPerView - 1) / slidesPerView}px)` }}
              className="shrink-0"
            >
              {slide}
            </div>
          ))}
        </div>
      </div>

      {/* Arrows */}
      {showArrows && total > slidesPerView && (
        <>
          <button
            type="button"
            aria-label="Previous slide"
            disabled={!canPrev}
            onClick={prev}
            className={[arrowBtn(canPrev), 'left-2 -translate-x-0'].join(' ')}
          >
            <CaretLeftIcon size={16} weight="bold" />
          </button>
          <button
            type="button"
            aria-label="Next slide"
            disabled={!canNext}
            onClick={next}
            className={[arrowBtn(canNext), 'right-2'].join(' ')}
          >
            <CaretRightIcon size={16} weight="bold" />
          </button>
        </>
      )}

      {/* Dots */}
      {showDots && total > slidesPerView && (
        <div role="tablist" aria-label="Slides" className="flex justify-center gap-1.5 mt-3">
          {Array.from({ length: maxIdx + 1 }).map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === current}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => setCurrent(i)}
              className={[
                'h-1.5 rounded-full transition-all duration-[var(--ds-duration-base)]',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ds-brand-500)]',
                i === current
                  ? 'w-5 bg-[var(--ds-brand-600)]'
                  : 'w-1.5 bg-[var(--ds-border-strong)] hover:bg-[var(--ds-text-muted)]',
              ].join(' ')}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ─── CarouselSlide ────────────────────────────────────────────────────────────

export interface CarouselSlideProps {
  children:  React.ReactNode;
  className?: string;
}

export function CarouselSlide({ children, className = '' }: CarouselSlideProps) {
  return (
    <div className={['w-full', className].join(' ')}>
      {children}
    </div>
  );
}
