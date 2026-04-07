import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { OnboardingFlow, type OnboardingStep } from './OnboardingFlow';
import {
  BuildingsIcon,
  UserIcon,
  PlugsConnectedIcon,
  BellIcon,
  RocketLaunchIcon,
} from '@phosphor-icons/react';

const meta: Meta<typeof OnboardingFlow> = {
  title: 'Workflow/OnboardingFlow',
  component: OnboardingFlow,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Multi-step onboarding wizard with progress bar, clickable step indicators, back/continue navigation, and optional skip. Each step can include arbitrary content, a custom icon, a next button label, and a validate function to block progression. Fires `onComplete` after the final step.',
      },
    },
    layout: 'padded',
  },
  argTypes: {
    showProgress:   { control: { type: 'boolean' } },
    clickableSteps: { control: { type: 'boolean' } },
    steps:          { control: false },
    onComplete:     { action: 'completed' },
    onSkip:         { action: 'skipped'   },
    onStepChange:   { action: 'stepChanged' },
  },
  args: {
    showProgress:   true,
    clickableSteps: true,
  },
};
export default meta;
type Story = StoryObj<typeof OnboardingFlow>;

const inputCls = 'h-9 px-3 rounded-lg border border-[var(--ds-border-base)] bg-[var(--ds-bg-surface)] text-sm text-[var(--ds-text-primary)] w-full focus-visible:outline-none';

function OrgStep() {
  return (
    <div className="space-y-3">
      <div className="space-y-1">
        <label className="text-sm font-medium text-[var(--ds-text-primary)]">Organisation name</label>
        <input type="text" placeholder="Acme Corp" className={inputCls} />
      </div>
      <div className="space-y-1">
        <label className="text-sm font-medium text-[var(--ds-text-primary)]">Industry</label>
        <select className={inputCls}>
          <option value="">Select industry</option>
          <option>Financial Services</option>
          <option>Healthcare</option>
          <option>Technology</option>
          <option>Manufacturing</option>
        </select>
      </div>
    </div>
  );
}

function ProfileStep() {
  return (
    <div className="space-y-3">
      <div className="flex gap-3">
        <div className="flex-1 space-y-1">
          <label className="text-sm font-medium text-[var(--ds-text-primary)]">First name</label>
          <input type="text" placeholder="Suraj" className={inputCls} />
        </div>
        <div className="flex-1 space-y-1">
          <label className="text-sm font-medium text-[var(--ds-text-primary)]">Last name</label>
          <input type="text" placeholder="Naik" className={inputCls} />
        </div>
      </div>
      <div className="space-y-1">
        <label className="text-sm font-medium text-[var(--ds-text-primary)]">Job title</label>
        <input type="text" placeholder="Risk Manager" className={inputCls} />
      </div>
    </div>
  );
}

function NotificationsStep() {
  return (
    <div className="space-y-3">
      {[
        { label: 'Weekly risk digest',      desc: 'Summary of changes in your vendor risk scores' },
        { label: 'Critical alerts',         desc: 'Immediate notification for critical risk events' },
        { label: 'Audit due reminders',     desc: '7-day advance notice for upcoming audits'       },
        { label: 'New vendor assigned',     desc: 'When a vendor is assigned to you'               },
      ].map(item => (
        <label key={item.label} className="flex items-start gap-3 p-3 rounded-lg hover:bg-[var(--ds-bg-subtle)] cursor-pointer">
          <input type="checkbox" defaultChecked className="mt-0.5 h-4 w-4 rounded accent-[var(--ds-brand-600)]" />
          <div>
            <p className="text-sm font-medium text-[var(--ds-text-primary)]">{item.label}</p>
            <p className="text-xs text-[var(--ds-text-muted)]">{item.desc}</p>
          </div>
        </label>
      ))}
    </div>
  );
}

function IntegrationsStep() {
  return (
    <div className="grid grid-cols-2 gap-3">
      {['Slack', 'Jira', 'Microsoft Teams', 'Salesforce'].map(name => (
        <label key={name} className="flex items-center gap-3 p-3 rounded-xl border border-[var(--ds-border-base)] hover:border-[var(--ds-brand-400)] cursor-pointer transition-colors">
          <input type="checkbox" className="h-4 w-4 rounded accent-[var(--ds-brand-600)]" />
          <span className="text-sm font-medium text-[var(--ds-text-primary)]">{name}</span>
        </label>
      ))}
    </div>
  );
}

const VENDOR_ONBOARDING: OnboardingStep[] = [
  {
    id: 'org',
    title: 'Set up your organisation',
    description: 'Tell us about your company so we can tailor your experience.',
    icon: <BuildingsIcon size={18} />,
    content: <OrgStep />,
    nextLabel: "Next: Your profile",
  },
  {
    id: 'profile',
    title: 'Create your profile',
    description: "We'll use this to personalise your dashboard.",
    icon: <UserIcon size={18} />,
    content: <ProfileStep />,
  },
  {
    id: 'notifications',
    title: 'Configure notifications',
    description: 'Choose what alerts you want to receive.',
    icon: <BellIcon size={18} />,
    content: <NotificationsStep />,
  },
  {
    id: 'integrations',
    title: 'Connect your tools',
    description: 'Optional — connect your existing workflow tools.',
    icon: <PlugsConnectedIcon size={18} />,
    content: <IntegrationsStep />,
    nextLabel: "Finish setup",
  },
];

export const Playground: Story = {
  render: (args) => {
    const [done, setDone] = useState(false);
    if (done) {
      return (
        <div className="flex flex-col items-center justify-center py-16 gap-3">
          <RocketLaunchIcon size={40} className="text-[var(--ds-brand-600)]" weight="fill" />
          <p className="text-lg font-semibold text-[var(--ds-text-primary)]">You're all set!</p>
          <button onClick={() => setDone(false)} className="text-sm text-[var(--ds-brand-600)]">Restart demo</button>
        </div>
      );
    }
    return (
      <div className="max-w-lg mx-auto">
        <OnboardingFlow
          {...args}
          steps={VENDOR_ONBOARDING}
          onComplete={() => { setDone(true); args.onComplete?.(); }}
          onSkip={() => { setDone(true); args.onSkip?.(); }}
        />
      </div>
    );
  },
};

export const TwoSteps: Story = {
  name: 'Minimal (2 steps)',
  render: () => {
    const [done, setDone] = useState(false);
    const STEPS: OnboardingStep[] = [
      { id: 's1', title: 'Name your workspace', description: 'Give your team space a name.', content: <div className="space-y-1"><label className="text-sm font-medium text-[var(--ds-text-primary)]">Workspace name</label><input type="text" placeholder="Acme Risk Team" className={inputCls} /></div> },
      { id: 's2', title: 'Invite your team',     description: 'Add colleagues to get started.', content: <div className="space-y-1"><label className="text-sm font-medium text-[var(--ds-text-primary)]">Email addresses</label><input type="text" placeholder="colleague@example.com" className={inputCls} /></div>, nextLabel: "Send invites & go" },
    ];
    return done ? (
      <p className="text-sm text-[var(--ds-success-text)] p-4">Onboarding complete! <button onClick={() => setDone(false)} className="underline">Reset</button></p>
    ) : (
      <div className="max-w-md">
        <OnboardingFlow steps={STEPS} onComplete={() => setDone(true)} />
      </div>
    );
  },
};
