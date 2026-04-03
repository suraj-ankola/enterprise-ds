import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { CircleNotchIcon, CheckCircleIcon, XCircleIcon, WarningIcon } from '@phosphor-icons/react';

// ─── Shared helpers ───────────────────────────────────────────────────────────

function Section({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return (
    <section className="mb-12">
      <h2 className="text-base font-semibold text-[var(--ds-text-primary)]">{title}</h2>
      {description && <p className="mt-1 text-sm text-[var(--ds-text-muted)] mb-5">{description}</p>}
      {!description && <div className="mb-5" />}
      {children}
    </section>
  );
}

function StateLabel({ state, color = 'default' }: { state: string; color?: 'default' | 'green' | 'red' | 'yellow' | 'blue' }) {
  const colors = {
    default: 'bg-[var(--ds-bg-subtle)] text-[var(--ds-text-muted)]',
    green:   'bg-[var(--ds-success-bg)] text-[var(--ds-success-text)]',
    red:     'bg-[var(--ds-danger-bg)]  text-[var(--ds-danger-text)]',
    yellow:  'bg-[var(--ds-warning-bg)] text-[var(--ds-warning-text)]',
    blue:    'bg-[var(--ds-brand-100)]  text-[var(--ds-brand-700)]',
  };
  return (
    <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider ${colors[color]}`}>
      {state}
    </span>
  );
}

function Row({ label, state, children }: { label?: string; state?: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-6 py-4 border-b border-[var(--ds-border-base)] last:border-0">
      {state && <div className="w-24 shrink-0"><StateLabel state={state} /></div>}
      {label && <p className="w-24 shrink-0 text-xs text-[var(--ds-text-muted)]">{label}</p>}
      <div className="flex items-center gap-4 flex-wrap">{children}</div>
    </div>
  );
}

// ─── Button states ────────────────────────────────────────────────────────────

const BTN_BASE = 'inline-flex items-center justify-center h-9 px-4 rounded-lg text-sm font-semibold border shadow-sm transition-all duration-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2';

function ButtonStates() {
  return (
    <div className="rounded-xl border border-[var(--ds-border-base)] bg-[var(--ds-bg-surface)] overflow-hidden">
      <div className="grid grid-cols-[96px_1fr_1fr_1fr_1fr] gap-4 px-5 py-2.5 bg-[var(--ds-bg-subtle)] border-b border-[var(--ds-border-base)]">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--ds-text-muted)]">State</span>
        {['Primary', 'Secondary', 'Ghost', 'Danger'].map(v => (
          <span key={v} className="text-[10px] font-semibold uppercase tracking-wider text-[var(--ds-text-muted)]">{v}</span>
        ))}
      </div>

      {/* Default */}
      <div className="grid grid-cols-[96px_1fr_1fr_1fr_1fr] gap-4 items-center px-5 py-3.5 border-b border-[var(--ds-border-base)]">
        <StateLabel state="Default" />
        <button className={`${BTN_BASE} bg-[var(--ds-brand-600)] text-white border-[var(--ds-brand-600)] focus-visible:ring-[var(--ds-brand-500)]`}>Button</button>
        <button className={`${BTN_BASE} bg-[var(--ds-bg-surface)] text-[var(--ds-text-primary)] border-[var(--ds-border-strong)] focus-visible:ring-[var(--ds-brand-500)]`}>Button</button>
        <button className={`${BTN_BASE} bg-transparent text-[var(--ds-text-secondary)] border-transparent shadow-none`}>Button</button>
        <button className={`${BTN_BASE} bg-[var(--ds-danger-icon)] text-white border-[var(--ds-danger-icon)] focus-visible:ring-[var(--ds-danger-icon)]`}>Button</button>
      </div>

      {/* Hover — force via class */}
      <div className="grid grid-cols-[96px_1fr_1fr_1fr_1fr] gap-4 items-center px-5 py-3.5 border-b border-[var(--ds-border-base)]">
        <StateLabel state="Hover" color="blue" />
        <button className={`${BTN_BASE} bg-[var(--ds-brand-700)] text-white border-[var(--ds-brand-700)] shadow-md`}>Button</button>
        <button className={`${BTN_BASE} bg-[var(--ds-bg-subtle)] text-[var(--ds-text-primary)] border-[var(--ds-border-strong)] shadow-md`}>Button</button>
        <button className={`${BTN_BASE} bg-[var(--ds-bg-subtle)] text-[var(--ds-text-primary)] border-transparent shadow-none`}>Button</button>
        <button className={`${BTN_BASE} bg-red-700 text-white border-red-700 shadow-md`}>Button</button>
      </div>

      {/* Focus */}
      <div className="grid grid-cols-[96px_1fr_1fr_1fr_1fr] gap-4 items-center px-5 py-3.5 border-b border-[var(--ds-border-base)]">
        <StateLabel state="Focus" color="blue" />
        <button className={`${BTN_BASE} bg-[var(--ds-brand-600)] text-white border-[var(--ds-brand-600)] ring-2 ring-[var(--ds-brand-500)] ring-offset-2`}>Button</button>
        <button className={`${BTN_BASE} bg-[var(--ds-bg-surface)] text-[var(--ds-text-primary)] border-[var(--ds-border-strong)] ring-2 ring-[var(--ds-brand-500)] ring-offset-2`}>Button</button>
        <button className={`${BTN_BASE} bg-[var(--ds-bg-subtle)] text-[var(--ds-text-primary)] border-transparent shadow-none ring-2 ring-[var(--ds-brand-500)] ring-offset-2`}>Button</button>
        <button className={`${BTN_BASE} bg-[var(--ds-danger-icon)] text-white border-[var(--ds-danger-icon)] ring-2 ring-[var(--ds-danger-icon)] ring-offset-2`}>Button</button>
      </div>

      {/* Active */}
      <div className="grid grid-cols-[96px_1fr_1fr_1fr_1fr] gap-4 items-center px-5 py-3.5 border-b border-[var(--ds-border-base)]">
        <StateLabel state="Active" color="blue" />
        <button className={`${BTN_BASE} bg-[var(--ds-brand-800)] text-white border-[var(--ds-brand-800)] scale-[0.98]`}>Button</button>
        <button className={`${BTN_BASE} bg-[var(--ds-border-base)] text-[var(--ds-text-primary)] border-[var(--ds-border-strong)] scale-[0.98]`}>Button</button>
        <button className={`${BTN_BASE} bg-[var(--ds-border-base)] text-[var(--ds-text-primary)] border-transparent shadow-none scale-[0.98]`}>Button</button>
        <button className={`${BTN_BASE} bg-red-800 text-white border-red-800 scale-[0.98]`}>Button</button>
      </div>

      {/* Disabled */}
      <div className="grid grid-cols-[96px_1fr_1fr_1fr_1fr] gap-4 items-center px-5 py-3.5 border-b border-[var(--ds-border-base)]">
        <StateLabel state="Disabled" />
        <button disabled className={`${BTN_BASE} bg-[var(--ds-brand-600)] text-white border-[var(--ds-brand-600)] opacity-50 cursor-not-allowed`}>Button</button>
        <button disabled className={`${BTN_BASE} bg-[var(--ds-bg-surface)] text-[var(--ds-text-primary)] border-[var(--ds-border-strong)] opacity-50 cursor-not-allowed`}>Button</button>
        <button disabled className={`${BTN_BASE} bg-transparent text-[var(--ds-text-secondary)] border-transparent shadow-none opacity-50 cursor-not-allowed`}>Button</button>
        <button disabled className={`${BTN_BASE} bg-[var(--ds-danger-icon)] text-white border-[var(--ds-danger-icon)] opacity-50 cursor-not-allowed`}>Button</button>
      </div>

      {/* Loading */}
      <div className="grid grid-cols-[96px_1fr_1fr_1fr_1fr] gap-4 items-center px-5 py-3.5">
        <StateLabel state="Loading" color="blue" />
        {['bg-[var(--ds-brand-600)] text-white border-[var(--ds-brand-600)]',
          'bg-[var(--ds-bg-surface)] text-[var(--ds-text-primary)] border-[var(--ds-border-strong)]',
          'bg-transparent text-[var(--ds-text-secondary)] border-transparent shadow-none',
          'bg-[var(--ds-danger-icon)] text-white border-[var(--ds-danger-icon)]',
        ].map((cls, i) => (
          <button key={i} disabled aria-busy className={`${BTN_BASE} ${cls} gap-2`}>
            <CircleNotchIcon size={16} className="animate-spin" />
            Loading
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Input states ─────────────────────────────────────────────────────────────

const INPUT_BASE = 'block h-10 px-3 rounded-lg border text-sm outline-none transition-colors bg-[var(--ds-bg-surface)] text-[var(--ds-text-primary)] placeholder-[var(--ds-text-muted)]';

function InputStates() {
  return (
    <div className="rounded-xl border border-[var(--ds-border-base)] bg-[var(--ds-bg-surface)] overflow-hidden">
      {[
        { state: 'Default',  cls: `border-[var(--ds-border-strong)]`,                     extra: '',         value: '' },
        { state: 'Hover',    cls: `border-[var(--ds-border-strong)]`,                     extra: 'shadow-sm',value: '' },
        { state: 'Focus',    cls: `border-[var(--ds-brand-600)] ring-2 ring-[var(--ds-brand-500)] ring-offset-0`, extra: '', value: '' },
        { state: 'Disabled', cls: `border-[var(--ds-border-base)] opacity-50 cursor-not-allowed bg-[var(--ds-bg-subtle)]`, extra: '', value: 'Disabled value' },
        { state: 'ReadOnly', cls: `border-[var(--ds-border-base)] bg-[var(--ds-bg-subtle)] cursor-default`,    extra: '', value: 'Read-only value' },
        { state: 'Error',    cls: `border-[var(--ds-danger-border)] ring-2 ring-[var(--ds-danger-icon)] ring-offset-0`, extra: '', value: 'invalid@' },
        { state: 'Success',  cls: `border-[var(--ds-success-border)] ring-2 ring-[var(--ds-success-icon)] ring-offset-0`, extra: '', value: 'valid@email.com' },
      ].map(({ state, cls, extra, value }) => (
        <div key={state} className="flex items-center gap-6 px-5 py-3.5 border-b border-[var(--ds-border-base)] last:border-0">
          <div className="w-24 shrink-0"><StateLabel state={state} color={state === 'Error' ? 'red' : state === 'Success' ? 'green' : state === 'Focus' ? 'blue' : 'default'} /></div>
          <input
            readOnly
            defaultValue={value}
            placeholder={!value ? 'Placeholder text' : undefined}
            className={`${INPUT_BASE} ${cls} ${extra} w-64`}
          />
          {state === 'Error'   && <p className="text-xs text-[var(--ds-danger-text)]">Enter a valid email address.</p>}
          {state === 'Success' && <p className="text-xs text-[var(--ds-success-text)]">Email is available.</p>}
        </div>
      ))}
    </div>
  );
}

// ─── Card states ──────────────────────────────────────────────────────────────

function CardStates() {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {[
        { state: 'Default',   cls: 'bg-[var(--ds-bg-surface)] border border-[var(--ds-border-base)]' },
        { state: 'Hover',     cls: 'bg-[var(--ds-bg-surface)] border border-[var(--ds-brand-400)] shadow-md' },
        { state: 'Focus',     cls: 'bg-[var(--ds-bg-surface)] border border-[var(--ds-brand-400)] ring-2 ring-[var(--ds-brand-500)] ring-offset-2 outline-none' },
        { state: 'Clickable', cls: 'bg-[var(--ds-bg-surface)] border border-[var(--ds-border-base)] cursor-pointer' },
      ].map(({ state, cls }) => (
        <div key={state} className="space-y-2">
          <StateLabel state={state} color={state === 'Hover' || state === 'Focus' ? 'blue' : 'default'} />
          <div className={`rounded-xl p-4 ${cls}`}>
            <p className="text-xs font-semibold text-[var(--ds-text-primary)]">Card Title</p>
            <p className="text-xs text-[var(--ds-text-muted)] mt-1">Supporting content</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── State rules reference ────────────────────────────────────────────────────

const STATE_RULES = [
  { state: 'Default',  description: 'Resting state. No interaction. Base visual weight.' },
  { state: 'Hover',    description: 'Mouse enters element. Lighten/darken bg by one step. Add subtle shadow. Duration: 100ms.' },
  { state: 'Focus',    description: 'Keyboard navigation. 2px brand-colored outline, 2px offset. Only :focus-visible.' },
  { state: 'Active',   description: 'Element being pressed/clicked. Darken by two steps. Scale 0.98. Duration: 50ms.' },
  { state: 'Disabled', description: 'Not interactable. 50% opacity. cursor: not-allowed. Preserve visual form.' },
  { state: 'Loading',  description: 'Async operation in progress. Spinner replaces/precedes label. Disable interaction.' },
  { state: 'Error',    description: 'Invalid input or failed operation. Danger red border/text. Error message below.' },
  { state: 'Success',  description: 'Valid input or completed operation. Success green border/text. Confirmation below.' },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

function StatesPage() {
  return (
    <div className="min-h-screen bg-[var(--ds-bg-base)] font-sans">
      <div className="ds-container py-8">
        <h1 className="text-3xl font-bold text-[var(--ds-text-primary)]">Component States</h1>
        <p className="mt-2 text-sm text-[var(--ds-text-secondary)] max-w-2xl">
          Every interactive component must implement all 8 states. This page documents what each state looks like
          and the rules for applying them consistently across the design system.
        </p>
      </div>

      <div className="ds-container pb-12 space-y-12">

        {/* State rules */}
        <section>
          <h2 className="text-base font-semibold text-[var(--ds-text-primary)] mb-4">State Rules</h2>
          <div className="rounded-xl border border-[var(--ds-border-base)] bg-[var(--ds-bg-surface)] overflow-hidden">
            {STATE_RULES.map(({ state, description }, i) => (
              <div key={state} className="flex gap-6 px-5 py-3.5 border-b border-[var(--ds-border-base)] last:border-0">
                <div className="w-24 shrink-0 pt-0.5">
                  <StateLabel
                    state={state}
                    color={state === 'Error' ? 'red' : state === 'Success' ? 'green' : state === 'Loading' || state === 'Hover' || state === 'Focus' || state === 'Active' ? 'blue' : 'default'}
                  />
                </div>
                <p className="text-sm text-[var(--ds-text-secondary)]">{description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Button states */}
        <Section title="Button States" description="All 4 variants × 7 states. Tab through the table to trigger live focus.">
          <ButtonStates />
        </Section>

        {/* Input states */}
        <Section title="Input States" description="All interaction states for text inputs.">
          <InputStates />
        </Section>

        {/* Card states */}
        <Section title="Card States" description="Card states when used as a clickable/interactive element.">
          <CardStates />
        </Section>

      </div>
    </div>
  );
}

const meta: Meta = {
  title: 'Foundations/States',
  parameters: { layout: 'fullscreen' },
};
export default meta;

export const ComponentStates: StoryObj = {
  name: 'Component States',
  render: () => <StatesPage />,
};
