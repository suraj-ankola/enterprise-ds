import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ShieldCheckIcon } from '@phosphor-icons/react';
import { PageLoader } from './PageLoader';

const meta: Meta<typeof PageLoader> = {
  title: 'Feedback/PageLoader',
  component: PageLoader,
  tags: ['autodocs'],
  argTypes: {
    message:    { control: 'text' },
    subMessage: { control: 'text' },
    contained:  { control: 'boolean' },
    logo:       { control: false },
  },
  args: { message: 'Loading…', contained: true },
  parameters: {
    docs: {
      description: {
        component:
          'Full-page or full-container loading state. Use `contained` to fill a parent element instead of the viewport. For smaller panel loading use `SpinnerOverlay` from Spinner.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof PageLoader>;

export const Default: Story = {};

export const WithMessages: Story = {
  args: {
    message:    'Loading your workspace…',
    subMessage: 'Fetching vendors, contracts, and compliance data.',
  },
};

export const WithLogo: Story = {
  args: {
    message: 'Starting ComplianceIQ…',
    logo: (
      <div className="h-12 w-12 rounded-2xl bg-[var(--ds-brand-600)] flex items-center justify-center shadow-lg">
        <ShieldCheckIcon size={28} className="text-white" />
      </div>
    ),
  },
};

export const ContainedInCard: Story = {
  name: 'Contained — inside a card',
  render: () => (
    <div className="border border-[var(--ds-border-base)] rounded-xl overflow-hidden w-80 h-48 relative">
      <PageLoader message="Loading vendor data…" contained />
    </div>
  ),
};
