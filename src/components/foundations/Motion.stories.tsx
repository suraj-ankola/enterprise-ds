import React, { useState, useEffect } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { CheckCircleIcon, XCircleIcon, CircleNotchIcon } from '@phosphor-icons/react';

const DURATIONS = [
  { name: 'Instant', var: '--ds-duration-instant', value: '50ms',  usage: 'State flashes, immediate feedback (e.g. checkbox check)' },
  { name: 'Fast',    var: '--ds-duration-fast',    value: '100ms', usage: 'Hover fills, icon swaps, micro-animations' },
  { name: 'Base',    var: '--ds-duration-base',    value: '150ms', usage: 'Button press, border changes, focus rings — default' },
  { name: 'Slow',    var: '--ds-duration-slow',    value: '250ms', usage: 'Dropdown open, card expand, badge pulse' },
  { name: 'Slower',  var: '--ds-duration-slower',  value: '400ms', usage: 'Skeleton pulse, progress bars' },
  { name: 'Page',    var: '--ds-duration-page',    value: '300ms', usage: 'Page route transitions, modal open/close' },
];

const EASINGS = [
  { name: 'Default', var: '--ds-ease-default', value: 'cubic-bezier(0.4, 0, 0.2, 1)',    desc: 'General transitions. Smooth in, smooth out. Use for most things.' },
  { name: 'Ease In', var: '--ds-ease-in',      value: 'cubic-bezier(0.4, 0, 1, 1)',       desc: 'Elements leaving the screen — drawers closing, modals dismissing.' },
  { name: 'Ease Out',var: '--ds-ease-out',     value: 'cubic-bezier(0, 0, 0.2, 1)',       desc: 'Elements entering the screen — modals appearing, drawers opening.' },
  { name: 'Spring',  var: '--ds-ease-spring',  value: 'cubic-bezier(0.34, 1.56, 0.64, 1)',desc: 'Bouncy overshoot. Toast slide-in, notification badge count pop.' },
  { name: 'Bounce',  var: '--ds-ease-bounce',  value: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)', desc: 'Playful bounce. Use sparingly — success confirmations, celebrations.' },
];

const MICRO_INTERACTIONS = [
  { name: 'Button hover', duration: '100ms', easing: 'default', property: 'background-color + border-color' },
  { name: 'Button active (press)', duration: '50ms', easing: 'default', property: 'background-color (darken)' },
  { name: 'Input focus ring', duration: '100ms', easing: 'default', property: 'outline, border-color' },
  { name: 'Card hover', duration: '150ms', easing: 'default', property: 'border-color, box-shadow' },
  { name: 'Badge count', duration: '150ms', easing: 'spring', property: 'scale + opacity' },
  { name: 'Checkbox check', duration: '50ms', easing: 'default', property: 'background-color, opacity' },
  { name: 'Toggle switch', duration: '150ms', easing: 'spring', property: 'transform (translate)' },
  { name: 'Icon swap', duration: '100ms', easing: 'default', property: 'opacity (cross-fade)' },
  { name: 'Skeleton shimmer', duration: '400ms', easing: 'default', property: 'opacity (pulse loop)' },
  { name: 'Tooltip appear', duration: '100ms', easing: 'out', property: 'opacity + scale' },
];

const PAGE_TRANSITIONS = [
  { name: 'Route change', duration: '300ms', easing: 'default', technique: 'Fade out → navigate → fade in' },
  { name: 'Modal open', duration: '250ms', easing: 'out', technique: 'Overlay fade in + modal scale(0.95→1) + translate-y' },
  { name: 'Modal close', duration: '150ms', easing: 'in', technique: 'Reverse: scale + fade. Faster than open.' },
  { name: 'Drawer open', duration: '300ms', easing: 'out', technique: 'translateX from off-screen + overlay fade' },
  { name: 'Drawer close', duration: '200ms', easing: 'in', technique: 'Reverse translateX. Faster.' },
  { name: 'Toast slide in', duration: '250ms', easing: 'spring', technique: 'Slide from bottom/top + spring overshoot' },
  { name: 'Toast dismiss', duration: '150ms', easing: 'in', technique: 'Fade + scale down' },
  { name: 'Tab switch', duration: '150ms', easing: 'default', technique: 'Content fade cross-dissolve' },
  { name: 'Accordion expand', duration: '250ms', easing: 'out', technique: 'max-height animation + opacity' },
  { name: 'Page skeleton → content', duration: '400ms', easing: 'out', technique: 'Staggered fade-in on content blocks' },
];

// ─── Live demo components ─────────────────────────────────────────────────────

function EasingDemo({ name, value }: { name: string; value: string }) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setActive(p => !p), 1800);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="rounded-xl border border-[var(--ds-border-base)] bg-[var(--ds-bg-surface)] p-4">
      <p className="text-xs font-semibold text-[var(--ds-text-primary)] mb-1">{name}</p>
      <p className="font-mono text-[9px] text-[var(--ds-text-muted)] mb-4 truncate">{value}</p>
      <div className="relative h-6">
        <div
          className="absolute top-0 h-6 w-6 rounded-full bg-[var(--ds-brand-600)]"
          style={{
            transition: `transform 600ms ${value}`,
            transform: active ? 'translateX(calc(100% * 4))' : 'translateX(0)',
          }}
        />
      </div>
      <p className="text-[9px] text-[var(--ds-text-muted)] mt-2">Auto-animating</p>
    </div>
  );
}

function DurationDemo({ name, value }: { name: string; value: string }) {
  const [on, setOn] = useState(false);
  return (
    <button
      onClick={() => setOn(p => !p)}
      className="rounded-xl border border-[var(--ds-border-base)] bg-[var(--ds-bg-surface)] p-4 text-left w-full hover:bg-[var(--ds-bg-subtle)] transition-colors"
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold text-[var(--ds-text-primary)]">{name}</span>
        <span className="font-mono text-[10px] bg-[var(--ds-bg-subtle)] px-2 py-0.5 rounded-full text-[var(--ds-brand-600)]">{value}</span>
      </div>
      <div
        className="h-8 rounded-lg"
        style={{
          transition: `background-color ${value} cubic-bezier(0.4, 0, 0.2, 1)`,
          backgroundColor: on ? 'var(--ds-brand-600)' : 'var(--ds-bg-subtle)',
        }}
      />
      <p className="text-[9px] text-[var(--ds-text-muted)] mt-2">Click to toggle</p>
    </button>
  );
}

function ButtonMicroDemo() {
  return (
    <div className="flex flex-wrap gap-3 p-5 rounded-xl border border-[var(--ds-border-base)] bg-[var(--ds-bg-surface)]">
      <button className="h-9 px-4 rounded-lg bg-[var(--ds-brand-600)] text-white text-sm font-semibold shadow-sm
        transition-[background-color,box-shadow] duration-[100ms] ease-[cubic-bezier(0.4,0,0.2,1)]
        hover:bg-[var(--ds-brand-700)] hover:shadow-md
        active:bg-[var(--ds-brand-800)] active:shadow-xs active:scale-[0.98]
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ds-brand-500)] focus-visible:ring-offset-2">
        Hover / Click me
      </button>
      <button className="h-9 px-4 rounded-lg border border-[var(--ds-border-strong)] bg-[var(--ds-bg-surface)] text-[var(--ds-text-primary)] text-sm font-semibold shadow-sm
        transition-[background-color,border-color,box-shadow] duration-[100ms] ease-[cubic-bezier(0.4,0,0.2,1)]
        hover:bg-[var(--ds-bg-subtle)] hover:shadow-md
        active:scale-[0.98]
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ds-brand-500)] focus-visible:ring-offset-2">
        Secondary
      </button>
      <input
        className="h-9 px-3 rounded-lg border border-[var(--ds-border-strong)] bg-[var(--ds-bg-surface)] text-sm text-[var(--ds-text-primary)]
          outline-none
          transition-[border-color,box-shadow] duration-[100ms] ease-[cubic-bezier(0.4,0,0.2,1)]
          focus:border-[var(--ds-brand-600)] focus:ring-2 focus:ring-[var(--ds-brand-500)] focus:ring-offset-0"
        placeholder="Focus me"
      />
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

function MotionPage() {
  return (
    <div className="min-h-screen bg-[var(--ds-bg-base)] font-sans">
      <div className="ds-container py-8 space-y-12">

        <div>
          <h1 className="text-3xl font-bold text-[var(--ds-text-primary)]">Motion</h1>
          <p className="mt-2 text-sm text-[var(--ds-text-secondary)] max-w-2xl">
            Motion communicates state, hierarchy, and brand personality. All tokens defined in
            <code className="bg-[var(--ds-bg-subtle)] px-1 rounded text-xs mx-1">globals.css :root</code>.
            Respect <code className="bg-[var(--ds-bg-subtle)] px-1 rounded text-xs">prefers-reduced-motion</code> — handled globally.
          </p>
        </div>

        {/* Duration — live demos */}
        <section>
          <h2 className="text-base font-semibold text-[var(--ds-text-primary)] mb-1">Duration Scale</h2>
          <p className="text-sm text-[var(--ds-text-muted)] mb-4">Click each card to see the duration live.</p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {DURATIONS.map(d => <DurationDemo key={d.name} name={d.name} value={d.value} />)}
          </div>
          <div className="mt-4 rounded-xl border border-[var(--ds-border-base)] bg-[var(--ds-bg-surface)] overflow-hidden">
            <div className="grid grid-cols-[80px_80px_80px_1fr] gap-4 px-5 py-2.5 bg-[var(--ds-bg-subtle)] border-b border-[var(--ds-border-base)]">
              {['Name', 'Token', 'Value', 'Usage'].map(h => (
                <span key={h} className="text-[10px] font-semibold uppercase tracking-wider text-[var(--ds-text-muted)]">{h}</span>
              ))}
            </div>
            {DURATIONS.map(({ name, var: cssVar, value, usage }) => (
              <div key={name} className="grid grid-cols-[80px_80px_80px_1fr] gap-4 items-center px-5 py-3 border-b border-[var(--ds-border-base)] last:border-0">
                <span className="text-sm font-medium text-[var(--ds-text-primary)]">{name}</span>
                <span className="font-mono text-[10px] text-[var(--ds-brand-600)] break-all">{cssVar}</span>
                <span className="font-mono text-xs text-[var(--ds-text-muted)]">{value}</span>
                <span className="text-xs text-[var(--ds-text-secondary)]">{usage}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Easing — live demos */}
        <section>
          <h2 className="text-base font-semibold text-[var(--ds-text-primary)] mb-1">Easing Functions</h2>
          <p className="text-sm text-[var(--ds-text-muted)] mb-4">Watch the ball — each curve gives a different feel. Auto-animating.</p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 mb-6">
            {EASINGS.map(e => <EasingDemo key={e.name} name={e.name} value={e.value} />)}
          </div>
          <div className="rounded-xl border border-[var(--ds-border-base)] bg-[var(--ds-bg-surface)] overflow-hidden">
            {EASINGS.map(({ name, var: cssVar, value, desc }) => (
              <div key={name} className="flex gap-6 px-5 py-3.5 border-b border-[var(--ds-border-base)] last:border-0">
                <span className="w-20 shrink-0 text-xs font-semibold text-[var(--ds-text-primary)]">{name}</span>
                <span className="w-32 shrink-0 font-mono text-[10px] text-[var(--ds-brand-600)] break-all">{value.slice(0, 30)}…</span>
                <span className="text-xs text-[var(--ds-text-secondary)]">{desc}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Micro-interactions live */}
        <section>
          <h2 className="text-base font-semibold text-[var(--ds-text-primary)] mb-1">Micro-interactions — Live</h2>
          <p className="text-sm text-[var(--ds-text-muted)] mb-4">Hover, click, and focus the elements below.</p>
          <ButtonMicroDemo />
          <div className="mt-4 rounded-xl border border-[var(--ds-border-base)] bg-[var(--ds-bg-surface)] overflow-hidden">
            <div className="grid grid-cols-[1fr_80px_80px_1fr] gap-4 px-5 py-2.5 bg-[var(--ds-bg-subtle)] border-b border-[var(--ds-border-base)]">
              {['Interaction', 'Duration', 'Easing', 'Property'].map(h => (
                <span key={h} className="text-[10px] font-semibold uppercase tracking-wider text-[var(--ds-text-muted)]">{h}</span>
              ))}
            </div>
            {MICRO_INTERACTIONS.map(({ name, duration, easing, property }) => (
              <div key={name} className="grid grid-cols-[1fr_80px_80px_1fr] gap-4 items-center px-5 py-3 border-b border-[var(--ds-border-base)] last:border-0">
                <span className="text-sm text-[var(--ds-text-primary)]">{name}</span>
                <span className="font-mono text-xs text-[var(--ds-text-muted)]">{duration}</span>
                <span className="font-mono text-xs text-[var(--ds-text-muted)]">{easing}</span>
                <span className="text-xs text-[var(--ds-text-secondary)]">{property}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Page transitions */}
        <section>
          <h2 className="text-base font-semibold text-[var(--ds-text-primary)] mb-1">Page Transitions</h2>
          <p className="text-sm text-[var(--ds-text-muted)] mb-4">Rules for larger motion — modals, drawers, route changes, toasts.</p>
          <div className="rounded-xl border border-[var(--ds-border-base)] bg-[var(--ds-bg-surface)] overflow-hidden">
            <div className="grid grid-cols-[1fr_80px_80px_1fr] gap-4 px-5 py-2.5 bg-[var(--ds-bg-subtle)] border-b border-[var(--ds-border-base)]">
              {['Transition', 'Duration', 'Easing', 'Technique'].map(h => (
                <span key={h} className="text-[10px] font-semibold uppercase tracking-wider text-[var(--ds-text-muted)]">{h}</span>
              ))}
            </div>
            {PAGE_TRANSITIONS.map(({ name, duration, easing, technique }) => (
              <div key={name} className="grid grid-cols-[1fr_80px_80px_1fr] gap-4 items-center px-5 py-3 border-b border-[var(--ds-border-base)] last:border-0">
                <span className="text-sm text-[var(--ds-text-primary)]">{name}</span>
                <span className="font-mono text-xs text-[var(--ds-text-muted)]">{duration}</span>
                <span className="font-mono text-xs text-[var(--ds-text-muted)]">{easing}</span>
                <span className="text-xs text-[var(--ds-text-secondary)]">{technique}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Reduced motion note */}
        <section>
          <div className="rounded-xl border border-[var(--ds-warning-border)] bg-[var(--ds-warning-bg)] p-5">
            <p className="text-sm font-semibold text-[var(--ds-warning-text)] mb-1">Accessibility — prefers-reduced-motion</p>
            <p className="text-sm text-[var(--ds-warning-text)]">
              All animations are globally disabled when the user has
              <code className="mx-1 font-mono text-xs">prefers-reduced-motion: reduce</code> set in their OS.
              This is handled in <code className="mx-1 font-mono text-xs">globals.css</code> via a media query override.
              Do not add <code className="mx-1 font-mono text-xs">!important</code> to animation properties in components.
            </p>
          </div>
        </section>

      </div>
    </div>
  );
}

const meta: Meta = {
  title: 'Foundations/Motion',
  parameters: { layout: 'fullscreen' },
};
export default meta;

export const MotionSystem: StoryObj = {
  name: 'Motion System',
  render: () => <MotionPage />,
};
