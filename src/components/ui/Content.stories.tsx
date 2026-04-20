import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Content } from './Content';

const meta: Meta<typeof Content> = {
  title: 'Layout/Content',
  component: Content,
  tags: ['autodocs'],
  argTypes: {
    width:   { control: 'select', options: ['sm', 'md', 'lg', 'xl', '2xl', 'full'] },
    padding: { control: 'select', options: ['none', 'sm', 'md', 'lg'] },
    centered: { control: 'boolean' },
    flush:    { control: 'boolean' },
  },
  args: { width: 'xl', padding: 'md', centered: true, flush: false },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Layout wrapper that constrains content width and adds consistent horizontal padding. Drop inside any page to keep content readable at wide viewports. Supports polymorphic `as` prop.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Content>;

function Placeholder({ label }: { label: string }) {
  return (
    <div className="rounded-lg border border-dashed border-[var(--ds-border-base)] bg-[var(--ds-bg-subtle)] p-6 text-sm text-[var(--ds-text-muted)] text-center">
      {label}
    </div>
  );
}

export const Default: Story = {
  render: (args) => (
    <div className="bg-[var(--ds-bg-base)] min-h-screen">
      <Content {...args}>
        <Placeholder label="Content area — max-width xl, padding md" />
      </Content>
    </div>
  ),
};

export const AllWidths: Story = {
  name: 'All widths',
  render: () => (
    <div className="bg-[var(--ds-bg-base)] flex flex-col">
      {(['sm', 'md', 'lg', 'xl', '2xl', 'full'] as const).map((w) => (
        <Content key={w} width={w} padding="md">
          <div className="rounded-lg bg-[var(--ds-brand-50)] border border-[var(--ds-brand-200)] px-4 py-3 text-sm font-medium text-[var(--ds-brand-700)]">
            width="{w}"
          </div>
        </Content>
      ))}
    </div>
  ),
};

export const AllPaddings: Story = {
  name: 'All padding sizes',
  render: () => (
    <div className="bg-[var(--ds-bg-base)] flex flex-col">
      {(['none', 'sm', 'md', 'lg'] as const).map((p) => (
        <Content key={p} width="lg" padding={p}>
          <div className="rounded-lg bg-[var(--ds-success-bg-subtle)] border border-[var(--ds-success-border)] px-4 py-3 text-sm font-medium text-[var(--ds-success-text)]">
            padding="{p}"
          </div>
        </Content>
      ))}
    </div>
  ),
};

export const Flush: Story = {
  name: 'Flush — no vertical padding',
  render: () => (
    <div className="bg-[var(--ds-bg-base)]">
      <Content width="lg" padding="md" flush>
        <Placeholder label="flush — no py-6" />
      </Content>
    </div>
  ),
};

export const AsSection: Story = {
  name: 'Polymorphic — as="section"',
  render: () => (
    <div className="bg-[var(--ds-bg-base)]">
      <Content as="section" width="md" padding="lg">
        <h2 className="text-xl font-bold text-[var(--ds-text-primary)] mb-3">Section heading</h2>
        <p className="text-sm text-[var(--ds-text-secondary)]">
          This Content renders as a semantic &lt;section&gt; element. Use the <code>as</code> prop
          to emit any HTML element or React component.
        </p>
      </Content>
    </div>
  ),
};

export const PageLayout: Story = {
  name: 'Typical page layout',
  render: () => (
    <div className="bg-[var(--ds-bg-base)] min-h-screen">
      {/* Full-width header */}
      <div className="border-b border-[var(--ds-border-base)] bg-[var(--ds-bg-surface)] sticky top-0 z-10">
        <Content width="xl" padding="md" flush>
          <div className="h-14 flex items-center justify-between">
            <span className="font-bold text-[var(--ds-text-primary)]">App Name</span>
            <span className="text-sm text-[var(--ds-text-muted)]">Nav links here</span>
          </div>
        </Content>
      </div>

      {/* Page body */}
      <Content width="xl" padding="md">
        <div className="grid grid-cols-3 gap-4">
          {['Summary', 'Analytics', 'Activity'].map((t) => (
            <Placeholder key={t} label={t} />
          ))}
        </div>
        <Placeholder label="Main content area" />
      </Content>
    </div>
  ),
};
