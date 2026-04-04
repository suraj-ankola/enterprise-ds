import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Button } from './Button';
import { Input } from './Input';
import { Stepper } from './Stepper';
import type { Step } from './Stepper';

const meta: Meta<typeof Stepper> = {
  title: 'UI/Stepper',
  component: Stepper,
  parameters: {
    docs: {
      description: {
        component: 'Multi-step progress indicator. Horizontal and vertical orientations. Status is auto-computed from `currentStep` index or overridden per-step. Completed steps are clickable via `onStepClick`. Connector line colour tracks completion.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Stepper>;

const VENDOR_STEPS: Step[] = [
  { key: 'info',       label: 'Basic info',      description: 'Name, website, region' },
  { key: 'compliance', label: 'Compliance',       description: 'Frameworks and certifications' },
  { key: 'contacts',   label: 'Contacts',         description: 'Security contacts', optional: true },
  { key: 'review',     label: 'Review & submit',  description: 'Confirm before onboarding' },
];

const INCIDENT_STEPS: Step[] = [
  { key: 'detect',   label: 'Detected' },
  { key: 'triage',   label: 'Triaged' },
  { key: 'fix',      label: 'Fix applied' },
  { key: 'validate', label: 'Validated' },
  { key: 'resolved', label: 'Resolved' },
];

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {
  render: () => {
    const [step, setStep] = useState(1);
    return (
      <div className="max-w-2xl flex flex-col gap-6">
        <Stepper steps={VENDOR_STEPS} currentStep={step} onStepClick={setStep} />
        <div className="rounded-xl border border-[var(--ds-border-base)] p-6 bg-[var(--ds-bg-surface)]">
          {step === 0 && (
            <div className="flex flex-col gap-4">
              <Input label="Vendor name" placeholder="e.g. Acme Corp" fullWidth />
              <Input label="Website" placeholder="https://vendor.com" fullWidth />
            </div>
          )}
          {step === 1 && (
            <div className="flex flex-col gap-2">
              <p className="text-sm text-[var(--ds-text-secondary)]">Select applicable frameworks…</p>
            </div>
          )}
          {step >= 2 && (
            <p className="text-sm text-[var(--ds-text-secondary)]">Step {step + 1} content</p>
          )}
        </div>
        <div className="flex justify-between">
          <Button variant="secondary" disabled={step === 0} onClick={() => setStep(s => s - 1)}>Back</Button>
          <Button
            onClick={() => step < VENDOR_STEPS.length - 1 ? setStep(s => s + 1) : undefined}
          >
            {step === VENDOR_STEPS.length - 1 ? 'Submit' : 'Continue'}
          </Button>
        </div>
      </div>
    );
  },
};

// ─── All Variants ─────────────────────────────────────────────────────────────

export const AllVariants: Story = {
  render: () => {
    const [hStep, setHStep] = useState(2);
    const [vStep, setVStep] = useState(1);

    return (
      <div className="flex flex-col gap-12 max-w-2xl">

        {/* Horizontal */}
        <div className="flex flex-col gap-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-[var(--ds-text-muted)]">Horizontal</p>
          <Stepper steps={VENDOR_STEPS} currentStep={hStep} onStepClick={setHStep} />
          <div className="flex gap-2 justify-center">
            <Button size="sm" variant="secondary" disabled={hStep === 0} onClick={() => setHStep(s => s - 1)}>← Prev</Button>
            <Button size="sm" disabled={hStep === VENDOR_STEPS.length - 1} onClick={() => setHStep(s => s + 1)}>Next →</Button>
          </div>
        </div>

        {/* Vertical */}
        <div className="flex gap-12 items-start">
          <div className="flex flex-col gap-4 flex-1">
            <p className="text-xs font-semibold uppercase tracking-wide text-[var(--ds-text-muted)]">Vertical</p>
            <Stepper steps={VENDOR_STEPS} currentStep={vStep} orientation="vertical" onStepClick={setVStep} />
          </div>

          {/* Incident resolved — all complete */}
          <div className="flex flex-col gap-4 flex-1">
            <p className="text-xs font-semibold uppercase tracking-wide text-[var(--ds-text-muted)]">All complete</p>
            <Stepper steps={INCIDENT_STEPS} currentStep={INCIDENT_STEPS.length} orientation="vertical" />
          </div>
        </div>

        {/* Incident — compact horizontal */}
        <div className="flex flex-col gap-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-[var(--ds-text-muted)]">Compact — IT incident resolution</p>
          <Stepper steps={INCIDENT_STEPS} currentStep={2} />
        </div>

      </div>
    );
  },
};
