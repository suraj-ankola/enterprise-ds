import React, { useId, useRef, useState } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

export type TooltipSide = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps {
  content:    React.ReactNode;
  children:   React.ReactNode;
  side?:      TooltipSide;
  /** Delay before showing on hover (ms). Focus shows immediately. */
  delay?:     number;
  className?: string;
}

// ─── Position maps ────────────────────────────────────────────────────────────

const TOOLTIP_POS: Record<TooltipSide, string> = {
  top:    'bottom-full left-1/2 -translate-x-1/2 mb-2',
  bottom: 'top-full    left-1/2 -translate-x-1/2 mt-2',
  left:   'right-full  top-1/2  -translate-y-1/2 mr-2',
  right:  'left-full   top-1/2  -translate-y-1/2 ml-2',
};

const ARROW_POS: Record<TooltipSide, string> = {
  top:    'top-full   left-1/2 -translate-x-1/2 border-t-[var(--ds-bg-inverse)]    border-x-transparent border-b-transparent border-4',
  bottom: 'bottom-full left-1/2 -translate-x-1/2 border-b-[var(--ds-bg-inverse)]   border-x-transparent border-t-transparent border-4',
  left:   'left-full   top-1/2  -translate-y-1/2 border-l-[var(--ds-bg-inverse)]   border-y-transparent border-r-transparent border-4',
  right:  'right-full  top-1/2  -translate-y-1/2 border-r-[var(--ds-bg-inverse)]   border-y-transparent border-l-transparent border-4',
};

// ─── Component ────────────────────────────────────────────────────────────────

export function Tooltip({
  content,
  children,
  side    = 'top',
  delay   = 500,
  className = '',
}: TooltipProps) {
  const id             = useId();
  const [visible, setVisible] = useState(false);
  const timer          = useRef<ReturnType<typeof setTimeout> | null>(null);

  function show(immediate = false) {
    if (timer.current) clearTimeout(timer.current);
    if (immediate || delay === 0) {
      setVisible(true);
    } else {
      timer.current = setTimeout(() => setVisible(true), delay);
    }
  }
  function hide() {
    if (timer.current) clearTimeout(timer.current);
    setVisible(false);
  }

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={() => show()}
      onMouseLeave={hide}
      onFocus={() => show(true)}
      onBlur={hide}
    >
      {/* Trigger — inject aria-describedby */}
      {React.isValidElement(children)
        ? React.cloneElement(children as React.ReactElement<React.HTMLAttributes<HTMLElement>>, {
            'aria-describedby': visible ? id : undefined,
          })
        : children
      }

      {/* Tooltip */}
      {visible && (
        <div
          id={id}
          role="tooltip"
          className={[
            'absolute z-[var(--ds-z-tooltip)] pointer-events-none',
            'whitespace-nowrap max-w-xs',
            TOOLTIP_POS[side],
            className,
          ].filter(Boolean).join(' ')}
        >
          <div className="bg-[var(--ds-bg-inverse)] text-[var(--ds-text-inverse)] text-xs font-medium px-2.5 py-1.5 rounded-md shadow-lg">
            {content}
          </div>
          {/* Arrow */}
          <span
            className={['absolute', ARROW_POS[side]].join(' ')}
            aria-hidden="true"
          />
        </div>
      )}
    </div>
  );
}
