import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { PageSlider } from './PageSlider';
import { ShieldCheckIcon, ChartBarIcon, BrainIcon } from '@phosphor-icons/react';
import { Button } from './Button';

const meta: Meta<typeof PageSlider> = {
  title: 'Navigation/PageSlider',
  component: PageSlider,
  tags: ['autodocs'],
  argTypes: {
    showArrows: { control: 'boolean' },
    showDots:   { control: 'boolean' },
    swipeable:  { control: 'boolean' },
  },
  args: { showArrows: true, showDots: true, swipeable: true },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Full-width page-at-a-time slider with CSS translate transition. Swipeable on touch/mouse. Supports controlled and uncontrolled modes. Use for onboarding flows, multi-step wizards, or paginated content sections.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof PageSlider>;

const SLIDE_COLORS = [
  { bg: 'bg-[var(--ds-brand-50)]',   icon: <ShieldCheckIcon size={40} className="text-[var(--ds-brand-600)]" />, title: 'Vendor Risk Management',   body: 'AI continuously monitors and scores all your vendor relationships in real time.' },
  { bg: 'bg-[var(--ds-success-bg-subtle)]', icon: <ChartBarIcon size={40} className="text-[var(--ds-success-icon)]" />, title: 'Compliance Analytics',  body: 'Unified compliance view across regions, frameworks, and audit cycles.' },
  { bg: 'bg-[var(--ds-info-bg-subtle)]',    icon: <BrainIcon size={40} className="text-[var(--ds-info-icon)]" />,    title: 'AI-Powered Insights',   body: 'Natural language queries for instant answers across your vendor data.' },
];

function Slide({ bg, icon, title, body }: typeof SLIDE_COLORS[0]) {
  return (
    <div className={`${bg} flex flex-col items-center justify-center gap-4 p-12 min-h-64 text-center`}>
      {icon}
      <h3 className="text-lg font-bold text-[var(--ds-text-primary)]">{title}</h3>
      <p className="text-sm text-[var(--ds-text-muted)] max-w-sm">{body}</p>
    </div>
  );
}

export const Default: Story = {
  render: (args) => (
    <div className="max-w-2xl mx-auto border border-[var(--ds-border-base)] rounded-xl overflow-hidden">
      <PageSlider {...args}>
        {SLIDE_COLORS.map((s) => <Slide key={s.title} {...s} />)}
      </PageSlider>
    </div>
  ),
};

export const DotsOnly: Story = {
  name: 'Dots only (no arrows)',
  args: { showArrows: false },
  render: (args) => (
    <div className="max-w-2xl mx-auto border border-[var(--ds-border-base)] rounded-xl overflow-hidden">
      <PageSlider {...args}>
        {SLIDE_COLORS.map((s) => <Slide key={s.title} {...s} />)}
      </PageSlider>
    </div>
  ),
};

export const Controlled: Story = {
  name: 'Controlled — external step navigation',
  render: () => {
    const [page, setPage] = useState(0);
    const steps = ['Account', 'Company details', 'Invite team', 'Done'];
    return (
      <div className="max-w-2xl mx-auto flex flex-col gap-4">
        {/* External stepper */}
        <div className="flex items-center gap-2 px-4">
          {steps.map((s, i) => (
            <React.Fragment key={s}>
              <button
                type="button"
                onClick={() => setPage(i)}
                className={[
                  'text-xs font-medium transition-colors',
                  i === page ? 'text-[var(--ds-brand-600)]' : 'text-[var(--ds-text-muted)]',
                ].join(' ')}
              >
                {s}
              </button>
              {i < steps.length - 1 && <span className="text-[var(--ds-border-strong)] text-xs">›</span>}
            </React.Fragment>
          ))}
        </div>
        <div className="border border-[var(--ds-border-base)] rounded-xl overflow-hidden">
          <PageSlider currentPage={page} onChange={setPage} showArrows showDots>
            {SLIDE_COLORS.map((s) => <Slide key={s.title} {...s} />)}
          </PageSlider>
        </div>
      </div>
    );
  },
};
