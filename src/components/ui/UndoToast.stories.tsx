import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { UndoToast, useUndoToast, type UndoToastItem } from './UndoToast';

const meta: Meta<typeof UndoToast> = {
  title: 'Feedback/UndoToast',
  component: UndoToast,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Transient notification toasts with optional Undo action. Each toast auto-dismisses after a configurable duration with an animated progress bar. Stacks vertically when multiple toasts are active. Comes with a `useUndoToast` hook for ergonomic usage. Ideal for destructive actions (delete, archive) where an escape hatch is valuable.',
      },
    },
    layout: 'fullscreen',
  },
  argTypes: {
    position: {
      description: 'Screen position of the toast stack',
      control: { type: 'select' },
      options: ['bottom-center', 'bottom-right', 'bottom-left', 'top-center', 'top-right'],
    },
    toasts: { control: false },
    onRemove: { action: 'removed' },
  },
};
export default meta;
type Story = StoryObj<typeof UndoToast>;

// ── Playground ────────────────────────────────────────────────────────────────

export const Playground: Story = {
  render: (args) => {
    const { toasts, add, remove } = useUndoToast();
    return (
      <div className="p-8 flex flex-col gap-2 items-start">
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => add({ message: '3 vendors deleted', variant: 'danger', onUndo: () => alert('Undone!') })}
            className="px-3 py-1.5 text-sm rounded-lg bg-[var(--ds-danger-bg)] text-[var(--ds-danger-text)] border border-[var(--ds-danger-border)] hover:opacity-90"
          >
            Delete vendors
          </button>
          <button
            type="button"
            onClick={() => add({ message: 'Vendor archived', variant: 'success', onUndo: () => alert('Unarchived!') })}
            className="px-3 py-1.5 text-sm rounded-lg bg-[var(--ds-success-bg)] text-[var(--ds-success-text)] border border-[var(--ds-success-border)] hover:opacity-90"
          >
            Archive vendor
          </button>
          <button
            type="button"
            onClick={() => add({ message: 'Settings saved', variant: 'success' })}
            className="px-3 py-1.5 text-sm rounded-lg bg-[var(--ds-bg-subtle)] text-[var(--ds-text-secondary)] border border-[var(--ds-border-base)] hover:bg-[var(--ds-bg-raised)]"
          >
            Save settings
          </button>
          <button
            type="button"
            onClick={() => add({ message: 'Export in progress…', variant: 'info', duration: 8000 })}
            className="px-3 py-1.5 text-sm rounded-lg bg-[var(--ds-info-bg)] text-[var(--ds-info-text)] border border-[var(--ds-info-border)] hover:opacity-90"
          >
            Start export
          </button>
        </div>
        <UndoToast {...args} toasts={toasts} onRemove={remove} />
      </div>
    );
  },
  args: { position: 'bottom-center' },
};

// ── Variants ──────────────────────────────────────────────────────────────────

export const AllVariants: Story = {
  name: 'All variants',
  render: () => {
    const items: UndoToastItem[] = [
      { id: '1', message: '3 records deleted',    variant: 'danger',  duration: 0, onUndo: () => {} },
      { id: '2', message: 'Changes saved',         variant: 'success', duration: 0 },
      { id: '3', message: 'Sync in progress',      variant: 'info',    duration: 0 },
      { id: '4', message: 'Storage limit at 90%',  variant: 'warning', duration: 0 },
    ];
    return (
      <div className="p-8 flex flex-col gap-2 max-w-sm">
        {items.map(t => (
          <div key={t.id} className="relative overflow-hidden flex items-center gap-3 px-4 py-3 bg-[var(--ds-bg-raised)] border border-[var(--ds-border-base)] rounded-xl shadow">
            <span className="flex-1 text-sm text-[var(--ds-text-primary)]">{t.message}</span>
            {t.onUndo && (
              <span className="text-xs font-semibold text-[var(--ds-brand-600)]">Undo</span>
            )}
          </div>
        ))}
        <p className="text-xs text-[var(--ds-text-muted)] mt-2">
          Static preview — use the Playground story for interactive toasts
        </p>
      </div>
    );
  },
};

// ── Positions ─────────────────────────────────────────────────────────────────

export const BottomRight: Story = {
  render: () => {
    const { toasts, add, remove } = useUndoToast();
    return (
      <div className="p-8">
        <button
          type="button"
          onClick={() => add({ message: 'Row deleted', variant: 'danger', onUndo: () => {} })}
          className="px-3 py-1.5 text-sm rounded-lg border border-[var(--ds-border-base)] hover:bg-[var(--ds-bg-subtle)]"
        >
          Trigger toast
        </button>
        <UndoToast toasts={toasts} onRemove={remove} position="bottom-right" />
      </div>
    );
  },
};

// ── No undo ───────────────────────────────────────────────────────────────────

export const NoUndoAction: Story = {
  name: 'Without undo action',
  render: () => {
    const { toasts, add, remove } = useUndoToast();
    return (
      <div className="p-8">
        <button
          type="button"
          onClick={() => add({ message: 'Profile updated successfully', variant: 'success' })}
          className="px-3 py-1.5 text-sm rounded-lg border border-[var(--ds-border-base)] hover:bg-[var(--ds-bg-subtle)]"
        >
          Save profile
        </button>
        <UndoToast toasts={toasts} onRemove={remove} />
      </div>
    );
  },
};
