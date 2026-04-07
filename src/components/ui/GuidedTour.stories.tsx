import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { GuidedTour, SpotlightTooltip } from './GuidedTour';

const meta: Meta<typeof GuidedTour> = {
  title: 'Patterns/GuidedTour',
  component: GuidedTour,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A product tour / feature discovery overlay. Renders a dark backdrop and a floating tooltip anchored to a CSS selector target. Steps cycle via Next/Prev buttons or skip the whole tour. The `SpotlightTooltip` is also exported standalone for custom positioning. The overlay closes on backdrop click if `onSkip` is provided.',
      },
    },
    layout: 'fullscreen',
  },
  argTypes: {
    active:          { control: { type: 'boolean' } },
    overlayOpacity:  { control: { type: 'range', min: 0.1, max: 0.9, step: 0.05 } },
    steps:           { control: false },
    onComplete:      { action: 'completed' },
    onSkip:          { action: 'skipped'   },
  },
};
export default meta;
type Story = StoryObj<typeof GuidedTour>;

export const Playground: Story = {
  render: (args) => {
    const [active, setActive] = useState(false);
    return (
      <div className="p-8 min-h-screen bg-[var(--ds-bg-base)]">
        {/* Mock UI for the tour to target */}
        <div className="max-w-2xl mx-auto space-y-4">
          <div id="tour-header" className="bg-[var(--ds-bg-surface)] border border-[var(--ds-border-base)] rounded-xl p-4">
            <h2 className="text-sm font-semibold text-[var(--ds-text-primary)]">Dashboard header</h2>
          </div>
          <div className="flex gap-4">
            <div id="tour-sidebar" className="w-48 bg-[var(--ds-bg-surface)] border border-[var(--ds-border-base)] rounded-xl p-4 h-40 flex items-center justify-center text-xs text-[var(--ds-text-muted)]">
              Sidebar
            </div>
            <div id="tour-main" className="flex-1 bg-[var(--ds-bg-surface)] border border-[var(--ds-border-base)] rounded-xl p-4 h-40 flex items-center justify-center text-xs text-[var(--ds-text-muted)]">
              Main content
            </div>
          </div>
          <button
            id="tour-action"
            className="px-4 py-2 text-sm rounded-lg bg-[var(--ds-brand-600)] text-white hover:bg-[var(--ds-brand-700)]"
          >
            Primary action
          </button>
        </div>

        {/* Start button */}
        {!active && (
          <div className="fixed bottom-6 right-6">
            <button
              onClick={() => setActive(true)}
              className="px-4 py-2 text-sm rounded-xl bg-[var(--ds-brand-600)] text-white hover:bg-[var(--ds-brand-700)] shadow-lg"
            >
              Start tour
            </button>
          </div>
        )}

        <GuidedTour
          {...args}
          active={active}
          steps={[
            { target: '#tour-header',  title: 'Dashboard header', content: 'This is your main dashboard header. It shows your workspace name and key navigation.', placement: 'bottom' },
            { target: '#tour-sidebar', title: 'Navigation sidebar', content: 'Use the sidebar to navigate between Vendors, Reports, Audits, and Settings.', placement: 'right' },
            { target: '#tour-main',    title: 'Content area', content: 'Your main content appears here. Sections and data grids are rendered in this panel.', placement: 'left' },
            { target: '#tour-action',  title: 'Primary actions', content: 'Use this button to create new records, run reports, or start workflows.', placement: 'top' },
          ]}
          onComplete={() => { setActive(false); args.onComplete?.(); }}
          onSkip={() => { setActive(false); args.onSkip?.(); }}
        />
      </div>
    );
  },
  args: { overlayOpacity: 0.5 },
};

export const TooltipStandalone: Story = {
  name: 'SpotlightTooltip (standalone)',
  render: () => (
    <div className="p-8 flex items-center justify-center min-h-screen bg-[var(--ds-bg-base)]">
      <div style={{ position: 'relative', width: 300 }}>
        <SpotlightTooltip
          step={{
            title: 'Bulk actions bar',
            content: 'When you select rows in any table, this bar appears with actions for the selection.',
          }}
          currentStep={1}
          totalSteps={4}
          targetRect={null}
          onNext={() => {}}
          onPrev={() => {}}
          onSkip={() => {}}
          onClose={() => {}}
          isLast={false}
          isFirst={false}
        />
      </div>
    </div>
  ),
};
