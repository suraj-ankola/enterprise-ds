import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { InfoSpotlight } from './InfoSpotlight';
import { Button } from './Button';

const meta: Meta<typeof InfoSpotlight> = {
  title: 'Overlay/InfoSpotlight',
  component: InfoSpotlight,
  tags: ['autodocs'],
  argTypes: {
    placement:  { control: 'select', options: ['top', 'bottom', 'left', 'right'] },
    step:       { control: 'number' },
    totalSteps: { control: 'number' },
    title:      { control: 'text' },
    showOverlay: { control: 'boolean' },
  },
  args: {
    title: 'New: AI Risk Scoring',
    body: 'Vendors are now automatically scored based on compliance signals. Click any vendor to see their full risk breakdown.',
    placement: 'bottom',
    showOverlay: false,
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Coach-mark bubble for feature announcements and onboarding tours. Position absolutely inside a `position: relative` container. Supports step pagination with dot indicators, prev/next navigation, an optional backdrop overlay, and four placement directions with an auto-pointing arrow.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof InfoSpotlight>;

// ─── Static placements ────────────────────────────────────────────────────────

const Anchor = ({ children }: { children: React.ReactNode }) => (
  <div className="relative w-72 flex items-center justify-center">
    <div className="px-4 py-2 rounded-lg bg-[var(--ds-bg-subtle)] border border-[var(--ds-border-base)] text-sm text-[var(--ds-text-primary)]">
      Target element
    </div>
    {children}
  </div>
);

export const PlacementBottom: Story = {
  name: 'Placement — Bottom',
  render: (args) => (
    <div className="pt-16">
      <Anchor><InfoSpotlight {...args} placement="bottom" /></Anchor>
    </div>
  ),
};

export const PlacementTop: Story = {
  name: 'Placement — Top',
  render: (args) => (
    <div className="pb-16">
      <Anchor><InfoSpotlight {...args} placement="top" /></Anchor>
    </div>
  ),
};

export const PlacementRight: Story = {
  name: 'Placement — Right',
  render: (args) => (
    <div className="pr-80">
      <Anchor><InfoSpotlight {...args} placement="right" /></Anchor>
    </div>
  ),
};

// ─── With close button ────────────────────────────────────────────────────────

export const WithClose: Story = {
  render: () => {
    const [open, setOpen] = useState(true);
    return (
      <div className="flex flex-col items-center gap-4">
        {!open && (
          <Button size="sm" variant="secondary" onClick={() => setOpen(true)}>Show again</Button>
        )}
        {open && (
          <Anchor>
            <InfoSpotlight
              title="New: AI Risk Scoring"
              body="Vendors are now automatically scored based on compliance signals."
              placement="bottom"
              onClose={() => setOpen(false)}
            />
          </Anchor>
        )}
      </div>
    );
  },
};

// ─── Tour (multi-step) ────────────────────────────────────────────────────────

const TOUR_STEPS = [
  { title: 'Welcome to ComplianceIQ', body: 'This is your compliance dashboard. Let\'s take a quick tour of the key features.' },
  { title: 'Vendor Risk Scores', body: 'Every vendor is automatically scored based on compliance signals, contract status, and audit history.' },
  { title: 'AI-Powered Alerts', body: 'Our AI monitors vendor activity 24/7 and flags anomalies before they become incidents.' },
  { title: 'You\'re all set!', body: 'You can revisit this tour anytime from the Help menu. Start exploring your vendors.' },
];

export const MultiStepTour: Story = {
  name: 'Multi-step tour',
  render: () => {
    const [step,    setStep]    = useState(1);
    const [visible, setVisible] = useState(true);

    if (!visible) return (
      <Button size="sm" variant="secondary" onClick={() => { setStep(1); setVisible(true); }}>
        Restart tour
      </Button>
    );

    const current = TOUR_STEPS[step - 1];
    return (
      <div className="pt-16">
        <Anchor>
          <InfoSpotlight
            title={current.title}
            body={current.body}
            placement="bottom"
            step={step}
            totalSteps={TOUR_STEPS.length}
            onClose={() => setVisible(false)}
            onPrev={step > 1 ? () => setStep(s => s - 1) : undefined}
            onNext={() => step < TOUR_STEPS.length ? setStep(s => s + 1) : setVisible(false)}
            doneLabel="Get started"
          />
        </Anchor>
      </div>
    );
  },
};
