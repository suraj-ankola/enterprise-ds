import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { FunnelIcon, BellIcon, InfoIcon } from '@phosphor-icons/react';
import { Button } from './Button';
import { Badge } from './Badge';
import { Checkbox } from './Checkbox';
import { Progress } from './Progress';
import { Popover } from './Popover';

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<typeof Popover> = {
  title: 'Overlays/Popover',
  component: Popover,
  tags: ['autodocs'],
  argTypes: {
    trigger: {
      control: false,
      description: 'Any ReactElement — props (aria-expanded, onClick) are injected via cloneElement',
    },
    children: {
      control: false,
      description: 'Content rendered inside the popover panel',
    },
    side: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
      description: 'Which side of the trigger the popover appears on',
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end'],
      description: 'Alignment of the popover relative to the trigger',
    },
    width: {
      control: 'text',
      description: 'CSS width of the popover panel (e.g. "280px")',
    },
  },
  args: {
    side:  'bottom',
    align: 'start',
    width: '280px',
  },
  parameters: {
    docs: {
      description: {
        component:
          'Non-modal anchored overlay. Trigger is any `ReactElement` — props injected via `cloneElement`. 4 sides × 3 alignment positions. Closes on outside click or Escape. Use for filters, quick info, and contextual pickers.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Popover>;

// ─── Default ──────────────────────────────────────────────────────────────────

export const Default: Story = {
  render: () => (
    <div className="p-16 flex justify-center">
      <Popover
        trigger={<Button variant="secondary" leftIcon={<FunnelIcon size={15} />}>Filters</Button>}
        width="260px"
      >
        <div className="p-4 flex flex-col gap-3">
          <p className="text-xs font-semibold text-[var(--ds-text-muted)] uppercase tracking-wide">Risk level</p>
          <div className="flex flex-col gap-2">
            <Checkbox label="Critical" defaultChecked />
            <Checkbox label="High" defaultChecked />
            <Checkbox label="Medium" />
            <Checkbox label="Low" />
          </div>
          <div className="pt-2 border-t border-[var(--ds-border-base)] flex justify-end gap-2">
            <Button size="sm" variant="ghost">Reset</Button>
            <Button size="sm">Apply</Button>
          </div>
        </div>
      </Popover>
    </div>
  ),
};

// ─── Sides ────────────────────────────────────────────────────────────────────

export const SideTop: Story = {
  name: 'Side — top',
  render: () => (
    <div className="p-24 flex justify-center">
      <Popover
        trigger={<Button variant="secondary">Hover above</Button>}
        side="top"
        width="200px"
      >
        <div className="p-3">
          <p className="text-sm text-[var(--ds-text-secondary)]">Popover appears above the trigger.</p>
        </div>
      </Popover>
    </div>
  ),
};

export const SideRight: Story = {
  name: 'Side — right',
  render: () => (
    <div className="p-16 flex justify-center">
      <Popover
        trigger={
          <button type="button" className="text-[var(--ds-text-muted)] hover:text-[var(--ds-text-primary)] transition-colors focus-visible:outline-none">
            <InfoIcon size={18} />
          </button>
        }
        side="right"
        width="220px"
      >
        <div className="p-3">
          <p className="text-xs font-semibold text-[var(--ds-text-primary)] mb-1">Risk score formula</p>
          <p className="text-xs text-[var(--ds-text-muted)] leading-relaxed">
            Calculated from framework compliance (40%), audit recency (35%), and incident history (25%).
          </p>
        </div>
      </Popover>
    </div>
  ),
};

// ─── All Variants ─────────────────────────────────────────────────────────────

export const AllVariants: Story = {
  render: () => {
    const [notifCount] = useState(3);

    return (
      <div className="p-16 flex flex-wrap gap-8 items-start">

        {/* Filter popover */}
        <div className="flex flex-col gap-2 items-center">
          <p className="text-xs text-[var(--ds-text-muted)]">Filter panel</p>
          <Popover
            trigger={<Button variant="secondary" leftIcon={<FunnelIcon size={15} />}>Filters</Button>}
            width="240px"
          >
            <div className="p-4 flex flex-col gap-3">
              <p className="text-xs font-semibold text-[var(--ds-text-muted)] uppercase tracking-wide">Status</p>
              <div className="flex flex-col gap-2">
                <Checkbox label="Compliant" defaultChecked />
                <Checkbox label="Under review" defaultChecked />
                <Checkbox label="Needs remediation" />
              </div>
            </div>
          </Popover>
        </div>

        {/* Notification bell */}
        <div className="flex flex-col gap-2 items-center">
          <p className="text-xs text-[var(--ds-text-muted)]">Notifications</p>
          <Popover
            trigger={
              <div className="relative inline-flex">
                <button
                  type="button"
                  className="p-2 rounded-lg text-[var(--ds-text-muted)] hover:text-[var(--ds-text-primary)] hover:bg-[var(--ds-bg-subtle)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ds-brand-500)]"
                >
                  <BellIcon size={20} />
                </button>
                {notifCount > 0 && (
                  <Badge variant="danger" appearance="solid" size="sm"
                    className="absolute -top-1 -right-1 min-w-[1.1rem] justify-center">
                    {notifCount}
                  </Badge>
                )}
              </div>
            }
            align="end"
            width="300px"
          >
            <div className="py-2">
              <p className="px-4 pb-2 text-xs font-semibold text-[var(--ds-text-muted)] uppercase tracking-wide border-b border-[var(--ds-border-base)]">
                Notifications
              </p>
              {[
                { title: 'Audit overdue',      desc: 'Beta Systems · 14 days past due',  variant: 'warning' as const },
                { title: 'Integration failed', desc: 'Slack webhook · 401 Unauthorized', variant: 'danger'  as const },
                { title: 'New framework',      desc: 'ISO 27001:2022 mapping available', variant: 'info'    as const },
              ].map(n => (
                <button key={n.title} type="button"
                  className="w-full px-4 py-3 flex gap-3 items-start hover:bg-[var(--ds-bg-subtle)] transition-colors text-left">
                  <Badge variant={n.variant} dot className="mt-0.5">{''}</Badge>
                  <div>
                    <p className="text-sm font-medium text-[var(--ds-text-primary)]">{n.title}</p>
                    <p className="text-xs text-[var(--ds-text-muted)]">{n.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </Popover>
        </div>

        {/* Info popover */}
        <div className="flex flex-col gap-2 items-center">
          <p className="text-xs text-[var(--ds-text-muted)]">Info popover</p>
          <Popover
            trigger={
              <button type="button" className="text-[var(--ds-text-muted)] hover:text-[var(--ds-text-primary)] transition-colors focus-visible:outline-none">
                <InfoIcon size={18} />
              </button>
            }
            side="right"
            width="220px"
          >
            <div className="p-3">
              <p className="text-xs font-semibold text-[var(--ds-text-primary)] mb-1">Risk score formula</p>
              <p className="text-xs text-[var(--ds-text-muted)] leading-relaxed">
                Calculated from framework compliance (40%), audit recency (35%), and incident history (25%).
              </p>
            </div>
          </Popover>
        </div>

        {/* Vendor quick view */}
        <div className="flex flex-col gap-2 items-center">
          <p className="text-xs text-[var(--ds-text-muted)]">Quick view</p>
          <Popover
            trigger={<Button variant="ghost" size="sm">Acme Corp</Button>}
            side="bottom"
            align="start"
            width="280px"
          >
            <div className="p-4 flex flex-col gap-3">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-semibold text-[var(--ds-text-primary)]">Acme Corp</p>
                  <p className="text-xs text-[var(--ds-text-muted)]">VND-00234 · Mumbai</p>
                </div>
                <Badge variant="danger" size="sm">Critical</Badge>
              </div>
              <Progress value={78} variant="danger" size="sm" label="Risk score" showValue />
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div><p className="text-[var(--ds-text-muted)]">Last audit</p><p className="font-medium text-[var(--ds-text-primary)]">Nov 14, 2025</p></div>
                <div><p className="text-[var(--ds-text-muted)]">Gaps</p><p className="font-medium text-[var(--ds-text-primary)]">3 open</p></div>
              </div>
              <div className="flex gap-2 pt-1 border-t border-[var(--ds-border-base)]">
                <Button size="sm" variant="secondary" fullWidth>View profile</Button>
                <Button size="sm" variant="danger" fullWidth>Remediate</Button>
              </div>
            </div>
          </Popover>
        </div>

      </div>
    );
  },
};
