import type { Meta, StoryObj } from '@storybook/react';
import { useState, useEffect } from 'react';
import {
  HouseIcon, UsersIcon, ShieldCheckIcon, FileTextIcon, BellIcon, GearIcon,
  WarningCircleIcon, RobotIcon, MagnifyingGlassIcon, ChartBarIcon,
  ArrowSquareOutIcon, DownloadSimpleIcon, PlusIcon, TrashIcon,
} from '@phosphor-icons/react';
import { Button } from './Button';
import { CommandPalette } from './CommandPalette';
import type { CommandItem } from './CommandPalette';

const meta: Meta<typeof CommandPalette> = {
  title: 'UI/CommandPalette',
  component: CommandPalette,
  parameters: {
    docs: {
      description: {
        component: 'Cmd+K command palette. Full keyboard navigation (↑↓ navigate, Enter select, Esc close). Items support groups, icons, shortcut hints, and detail text. Fuzzy search filters label + detail. Portal-rendered on `document.body`.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof CommandPalette>;

// ─── Shared items ──────────────────────────────────────────────────────────────

const COMPLIANCE_ITEMS: CommandItem[] = [
  // Navigation
  { key: 'nav-dash',      group: 'Navigation', label: 'Dashboard',        icon: <HouseIcon size={16} />,        shortcut: ['G', 'D'], onSelect: () => {} },
  { key: 'nav-vendors',   group: 'Navigation', label: 'Vendors',           icon: <UsersIcon size={16} />,        shortcut: ['G', 'V'], onSelect: () => {} },
  { key: 'nav-audits',    group: 'Navigation', label: 'Audits',            icon: <FileTextIcon size={16} />,     shortcut: ['G', 'A'], onSelect: () => {} },
  { key: 'nav-alerts',    group: 'Navigation', label: 'Alerts',            icon: <BellIcon size={16} />,         shortcut: ['G', 'L'], onSelect: () => {} },
  { key: 'nav-settings',  group: 'Navigation', label: 'Settings',          icon: <GearIcon size={16} />,         shortcut: ['G', 'S'], onSelect: () => {} },
  // Actions
  { key: 'act-add',       group: 'Actions', label: 'Add vendor',           icon: <PlusIcon size={16} />,         shortcut: ['N'],      onSelect: () => {} },
  { key: 'act-export',    group: 'Actions', label: 'Export report',        icon: <DownloadSimpleIcon size={16} />,                      onSelect: () => {} },
  { key: 'act-audit',     group: 'Actions', label: 'Schedule audit',       icon: <ShieldCheckIcon size={16} />,                         onSelect: () => {} },
  { key: 'act-delete',    group: 'Actions', label: 'Delete vendor',        icon: <TrashIcon size={16} />,        detail: 'Acme Corp',  onSelect: () => {} },
  // Recent
  { key: 'rec-acme',      group: 'Recent', label: 'Acme Corp',             icon: <ArrowSquareOutIcon size={16} />, detail: 'VND-00234 · Critical', onSelect: () => {} },
  { key: 'rec-beta',      group: 'Recent', label: 'Beta Systems',          icon: <ArrowSquareOutIcon size={16} />, detail: 'VND-00891 · High',     onSelect: () => {} },
];

const ITOPS_ITEMS: CommandItem[] = [
  { key: 'nav-incidents',  group: 'Navigation', label: 'Incidents',        icon: <WarningCircleIcon size={16} />, shortcut: ['G', 'I'], onSelect: () => {} },
  { key: 'nav-copilot',    group: 'Navigation', label: 'AI Copilot',       icon: <RobotIcon size={16} />,         shortcut: ['G', 'C'], onSelect: () => {} },
  { key: 'nav-network',    group: 'Navigation', label: 'Network',          icon: <MagnifyingGlassIcon size={16} />,                     onSelect: () => {} },
  { key: 'act-resolve',    group: 'Actions', label: 'Resolve INC-2847',    icon: <ShieldCheckIcon size={16} />,   detail: 'API Gateway P1', onSelect: () => {} },
  { key: 'act-runbook',    group: 'Actions', label: 'Run runbook',         icon: <FileTextIcon size={16} />,      detail: 'API-503',    onSelect: () => {} },
  { key: 'act-scale',      group: 'Actions', label: 'Scale auth-svc',      icon: <ArrowSquareOutIcon size={16} />,                      onSelect: () => {} },
];

const ANALYTICS_ITEMS: CommandItem[] = [
  { key: 'nav-explore',    group: 'Navigation', label: 'Explore',          icon: <MagnifyingGlassIcon size={16} />, shortcut: ['G', 'E'], onSelect: () => {} },
  { key: 'nav-charts',     group: 'Navigation', label: 'Charts',           icon: <ChartBarIcon size={16} />,        shortcut: ['G', 'C'], onSelect: () => {} },
  { key: 'act-query',      group: 'Actions', label: 'New query',           icon: <PlusIcon size={16} />,            shortcut: ['N'],      onSelect: () => {} },
  { key: 'act-export',     group: 'Actions', label: 'Export to CSV',       icon: <DownloadSimpleIcon size={16} />,                       onSelect: () => {} },
  { key: 'rec-revenue',    group: 'Recent', label: 'Revenue last 30 days', icon: <ChartBarIcon size={16} />,        detail: 'Saved query', onSelect: () => {} },
  { key: 'rec-churn',      group: 'Recent', label: 'Churn rate by plan',   icon: <ChartBarIcon size={16} />,        detail: 'Saved query', onSelect: () => {} },
];

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    useEffect(() => {
      function onKeyDown(e: KeyboardEvent) {
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
          e.preventDefault();
          setOpen(v => !v);
        }
      }
      window.addEventListener('keydown', onKeyDown);
      return () => window.removeEventListener('keydown', onKeyDown);
    }, []);

    return (
      <div className="flex flex-col items-center gap-4 py-8">
        <Button onClick={() => setOpen(true)} leftIcon={<MagnifyingGlassIcon size={15} />} variant="secondary">
          Search commands
          <kbd className="ml-2 text-[10px] font-mono text-[var(--ds-text-muted)]">⌘K</kbd>
        </Button>
        <p className="text-xs text-[var(--ds-text-muted)]">or press ⌘K / Ctrl+K</p>
        <CommandPalette
          open={open}
          onClose={() => setOpen(false)}
          items={COMPLIANCE_ITEMS}
          placeholder="Search vendors, audits, actions…"
        />
      </div>
    );
  },
};

// ─── All Variants ─────────────────────────────────────────────────────────────

export const AllVariants: Story = {
  render: () => {
    const [which, setWhich] = useState<string | null>(null);

    return (
      <div className="flex flex-wrap gap-3 p-8">
        <div className="flex flex-col gap-1 items-center">
          <Button variant="secondary" size="sm" onClick={() => setWhich('compliance')}>Compliance Copilot</Button>
          <p className="text-[10px] text-[var(--ds-text-muted)]">Vendors, audits, risk</p>
        </div>
        <div className="flex flex-col gap-1 items-center">
          <Button variant="secondary" size="sm" onClick={() => setWhich('itops')}>IT Ops Copilot</Button>
          <p className="text-[10px] text-[var(--ds-text-muted)]">Incidents, runbooks</p>
        </div>
        <div className="flex flex-col gap-1 items-center">
          <Button variant="secondary" size="sm" onClick={() => setWhich('analytics')}>Analytics Copilot</Button>
          <p className="text-[10px] text-[var(--ds-text-muted)]">Queries, charts</p>
        </div>

        <CommandPalette
          open={which === 'compliance'}
          onClose={() => setWhich(null)}
          items={COMPLIANCE_ITEMS}
          placeholder="Search vendors, audits, actions…"
        />
        <CommandPalette
          open={which === 'itops'}
          onClose={() => setWhich(null)}
          items={ITOPS_ITEMS}
          placeholder="Search incidents, runbooks, actions…"
        />
        <CommandPalette
          open={which === 'analytics'}
          onClose={() => setWhich(null)}
          items={ANALYTICS_ITEMS}
          placeholder="Search queries, charts, reports…"
        />
      </div>
    );
  },
};
