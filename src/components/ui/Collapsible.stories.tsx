import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Collapsible } from './Collapsible';

const meta: Meta<typeof Collapsible> = {
  title: 'Layout/Collapsible',
  component: Collapsible,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Single expand/collapse panel — simpler than Accordion when you need one standalone section. Controlled or uncontrolled. Optional border wrapping. Keyboard accessible.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Collapsible>;

export const Playground: Story = {
  render: () => (
    <div className="p-8 bg-[var(--ds-bg-base)] max-w-md">
      <Collapsible trigger="Advanced filters" bordered>
        <div className="space-y-2 text-sm text-[var(--ds-text-secondary)]">
          <p>Date range: Last 90 days</p>
          <p>Risk level: Critical, High</p>
          <p>Frameworks: ISO 27001, SOC 2</p>
        </div>
      </Collapsible>
    </div>
  ),
};

export const Borderless: Story = {
  name: 'Borderless (inline)',
  render: () => (
    <div className="p-8 bg-[var(--ds-bg-base)] max-w-md">
      <div className="bg-[var(--ds-bg-surface)] border border-[var(--ds-border-base)] rounded-xl p-5 space-y-4">
        <p className="text-sm font-semibold text-[var(--ds-text-primary)]">Vendor details</p>
        <div className="text-sm text-[var(--ds-text-secondary)] space-y-1">
          <p>Risk score: 78</p>
          <p>Framework: ISO 27001</p>
        </div>
        <Collapsible trigger="Show audit history">
          <ul className="mt-1 space-y-1 text-sm text-[var(--ds-text-muted)]">
            <li>Nov 14 2025 — Full audit passed</li>
            <li>May 22 2025 — Surveillance audit</li>
            <li>Nov 10 2024 — Full audit passed</li>
          </ul>
        </Collapsible>
      </div>
    </div>
  ),
};

export const DefaultOpen: Story = {
  render: () => (
    <div className="p-8 bg-[var(--ds-bg-base)] max-w-md">
      <Collapsible trigger="Remediation notes" bordered defaultOpen>
        <p className="text-sm text-[var(--ds-text-secondary)]">
          Vendor must provide updated penetration test report by 2026-01-31. MFA enforcement confirmed on production systems. Awaiting DPA counter-signature.
        </p>
      </Collapsible>
    </div>
  ),
};

export const DisabledState: Story = {
  render: () => (
    <div className="p-8 bg-[var(--ds-bg-base)] max-w-md space-y-3">
      <Collapsible trigger="Available section" bordered>
        <p className="text-sm text-[var(--ds-text-secondary)]">This section is accessible.</p>
      </Collapsible>
      <Collapsible trigger="Locked section (requires admin)" bordered disabled>
        <p className="text-sm text-[var(--ds-text-secondary)]">Hidden content.</p>
      </Collapsible>
    </div>
  ),
};

export const ControlledExample: Story = {
  name: 'Controlled',
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div className="p-8 bg-[var(--ds-bg-base)] max-w-md space-y-4">
        <button
          type="button"
          onClick={() => setOpen(o => !o)}
          className="px-3 py-1.5 rounded-lg text-sm bg-[var(--ds-brand-600)] text-white hover:bg-[var(--ds-brand-700)]"
        >
          {open ? 'Collapse' : 'Expand'} from outside
        </button>
        <Collapsible
          trigger="Controlled section"
          bordered
          open={open}
          onOpenChange={setOpen}
        >
          <p className="text-sm text-[var(--ds-text-secondary)]">
            Open state is controlled externally. The button above toggles it.
          </p>
        </Collapsible>
      </div>
    );
  },
};
