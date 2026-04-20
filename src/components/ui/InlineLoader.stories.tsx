import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { InlineLoader } from './InlineLoader';

const meta: Meta<typeof InlineLoader> = {
  title: 'Feedback/InlineLoader',
  component: InlineLoader,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    size:  { control: 'select', options: ['xs', 'sm', 'md'] },
  },
  args: { label: 'Loading…', size: 'sm' },
  parameters: {
    docs: {
      description: {
        component:
          'Minimal spinner + label for inline loading states — table cells, form fields, dropdowns, or anywhere a full Spinner would be too heavy.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof InlineLoader>;

export const Default: Story = {};
export const NoLabel: Story = { args: { label: undefined } };
export const Fetching: Story = { args: { label: 'Fetching results…' } };
export const Saving:   Story = { args: { label: 'Saving…' } };

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <InlineLoader size="xs" label="xs — Loading…" />
      <InlineLoader size="sm" label="sm — Loading…" />
      <InlineLoader size="md" label="md — Loading…" />
    </div>
  ),
};

export const InContext: Story = {
  name: 'In-context — table cell',
  render: () => (
    <div className="border border-[var(--ds-border-base)] rounded-lg overflow-hidden w-72">
      {['Acme Corp', 'Globex Industries'].map((name) => (
        <div key={name} className="flex items-center justify-between px-4 py-3 border-b border-[var(--ds-border-base)] last:border-0">
          <span className="text-sm text-[var(--ds-text-primary)]">{name}</span>
          <InlineLoader size="xs" label="Checking…" />
        </div>
      ))}
    </div>
  ),
};
