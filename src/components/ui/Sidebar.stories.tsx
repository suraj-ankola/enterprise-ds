import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import {
  ShieldCheckIcon, HouseIcon, UsersIcon, FileTextIcon, BellIcon,
  GearIcon, ChartBarIcon, ArrowsClockwiseIcon, DatabaseIcon,
  TerminalIcon, NetworkIcon, WarningCircleIcon, RobotIcon,
  MagnifyingGlassIcon, PlugsIcon,
} from '@phosphor-icons/react';
import { Badge } from './Badge';
import { AppShell, Sidebar } from './Sidebar';

const meta: Meta = {
  title: 'UI/Sidebar',
  component: Sidebar,
  parameters: {
    docs: {
      description: {
        component: '`AppShell` is a flex wrapper — sidebar and main content are siblings. `Sidebar` supports controlled/uncontrolled collapse. Collapse toggle lives inside the header row (no absolute positioning) so `overflow-hidden` on the sidebar does not clip it. Sections support group labels and badge slots.',
      },
    },
  },
};
export default meta;

// ─── Playground — full AppShell demo ─────────────────────────────────────────

export const Playground: StoryObj = {
  render: () => {
    const [active, setActive] = useState('dashboard');
    const [collapsed, setCollapsed] = useState(false);

    const nav = [
      {
        key: 'main',
        items: [
          { key: 'dashboard', label: 'Dashboard',   icon: <HouseIcon size={18} />,       active: active === 'dashboard',   onClick: () => setActive('dashboard') },
          { key: 'vendors',   label: 'Vendors',     icon: <UsersIcon size={18} />,        active: active === 'vendors',     onClick: () => setActive('vendors') },
          { key: 'reports',   label: 'Reports',     icon: <FileTextIcon size={18} />,     active: active === 'reports',     onClick: () => setActive('reports') },
          {
            key: 'alerts', label: 'Alerts', icon: <BellIcon size={18} />, active: active === 'alerts', onClick: () => setActive('alerts'),
            badge: <Badge variant="danger" size="sm" appearance="solid">4</Badge>,
          },
        ],
      },
      {
        key: 'system',
        label: 'System',
        items: [
          { key: 'compliance', label: 'Compliance',  icon: <ShieldCheckIcon size={18} />, active: active === 'compliance', onClick: () => setActive('compliance') },
          { key: 'settings',   label: 'Settings',   icon: <GearIcon size={18} />,        active: active === 'settings',   onClick: () => setActive('settings') },
        ],
      },
    ];

    return (
      <div className="h-[600px] border border-[var(--ds-border-base)] rounded-xl overflow-hidden">
        <AppShell
          sidebar={
            <Sidebar
              brand={{
                icon: (
                  <div className="h-8 w-8 rounded-lg bg-[var(--ds-brand-600)] flex items-center justify-center">
                    <ShieldCheckIcon size={18} weight="fill" className="text-white" />
                  </div>
                ),
                name:    'Compliance Risk',
                tagline: 'Vendor monitoring platform',
              }}
              nav={nav}
              collapsed={collapsed}
              onCollapsedChange={setCollapsed}
              footer={
                <button
                  type="button"
                  className={[
                    'flex items-center gap-3 w-full px-2 py-2 rounded-lg',
                    'hover:bg-[var(--ds-bg-subtle)] transition-colors text-left',
                    collapsed ? 'justify-center' : '',
                  ].join(' ')}
                >
                  <div className="h-7 w-7 rounded-full bg-[var(--ds-brand-600)] flex items-center justify-center text-xs font-semibold text-white shrink-0">
                    SN
                  </div>
                  {!collapsed && (
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-[var(--ds-text-primary)] truncate">Suraj Naik</p>
                      <p className="text-[10px] text-[var(--ds-text-muted)] truncate">Admin</p>
                    </div>
                  )}
                </button>
              }
            />
          }
        >
          <div className="p-6">
            <h1 className="text-lg font-semibold text-[var(--ds-text-primary)] mb-1 capitalize">{active}</h1>
            <p className="text-sm text-[var(--ds-text-muted)]">Click nav items or the collapse toggle to explore.</p>
          </div>
        </AppShell>
      </div>
    );
  },
};

// ─── All three product themes ─────────────────────────────────────────────────

export const ThreeProducts: StoryObj = {
  name: 'Three Products',
  render: () => (
    <div className="grid grid-cols-3 gap-4 h-[520px]">

      {/* Compliance Risk Platform */}
      <div className="border border-[var(--ds-border-base)] rounded-xl overflow-hidden" data-theme="compliance">
        <Sidebar
          className="h-full"
          brand={{
            icon: <div className="h-8 w-8 rounded-lg bg-[var(--ds-brand-600)] flex items-center justify-center"><ShieldCheckIcon size={18} weight="fill" className="text-white" /></div>,
            name: 'Compliance Risk',
            tagline: 'Vendor monitoring',
          }}
          nav={[
            { key: 'main', items: [
              { key: 'dashboard', label: 'Dashboard',  icon: <HouseIcon size={16} />, active: true },
              { key: 'vendors',   label: 'Vendors',    icon: <UsersIcon size={16} />, badge: <Badge variant="warning" size="sm">12</Badge> },
              { key: 'audits',    label: 'Audits',     icon: <FileTextIcon size={16} /> },
              { key: 'alerts',    label: 'Alerts',     icon: <BellIcon size={16} />, badge: <Badge variant="danger" size="sm" appearance="solid">4</Badge> },
            ]},
            { key: 'config', label: 'Config', items: [
              { key: 'frameworks', label: 'Frameworks', icon: <ShieldCheckIcon size={16} /> },
              { key: 'settings',   label: 'Settings',   icon: <GearIcon size={16} /> },
            ]},
          ]}
        />
      </div>

      {/* IT Ops AI Copilot */}
      <div className="border border-[var(--ds-border-base)] rounded-xl overflow-hidden" data-theme="itops">
        <Sidebar
          className="h-full"
          brand={{
            icon: <div className="h-8 w-8 rounded-lg bg-[var(--ds-brand-600)] flex items-center justify-center"><RobotIcon size={18} weight="fill" className="text-white" /></div>,
            name: 'IT Ops Copilot',
            tagline: 'AI-powered ops center',
          }}
          nav={[
            { key: 'main', items: [
              { key: 'incidents',  label: 'Incidents',    icon: <WarningCircleIcon size={16} />, active: true, badge: <Badge variant="danger" size="sm" appearance="solid">2</Badge> },
              { key: 'chat',       label: 'AI Copilot',   icon: <RobotIcon size={16} /> },
              { key: 'network',    label: 'Network',      icon: <NetworkIcon size={16} /> },
              { key: 'services',   label: 'Services',     icon: <ArrowsClockwiseIcon size={16} /> },
            ]},
            { key: 'tools', label: 'Tools', items: [
              { key: 'terminal',   label: 'Terminal',     icon: <TerminalIcon size={16} /> },
              { key: 'database',   label: 'Databases',    icon: <DatabaseIcon size={16} /> },
              { key: 'integrations', label: 'Integrations', icon: <PlugsIcon size={16} /> },
            ]},
          ]}
        />
      </div>

      {/* Self-Serve Analytics */}
      <div className="border border-[var(--ds-border-base)] rounded-xl overflow-hidden" data-theme="analytics">
        <Sidebar
          className="h-full"
          brand={{
            icon: <div className="h-8 w-8 rounded-lg bg-[var(--ds-brand-600)] flex items-center justify-center"><ChartBarIcon size={18} weight="fill" className="text-white" /></div>,
            name: 'Analytics',
            tagline: 'Self-serve data platform',
          }}
          nav={[
            { key: 'main', items: [
              { key: 'explore',  label: 'Explore',     icon: <MagnifyingGlassIcon size={16} />, active: true },
              { key: 'charts',   label: 'Charts',      icon: <ChartBarIcon size={16} /> },
              { key: 'reports',  label: 'Reports',     icon: <FileTextIcon size={16} /> },
              { key: 'sources',  label: 'Data Sources', icon: <DatabaseIcon size={16} /> },
            ]},
            { key: 'team', label: 'Team', items: [
              { key: 'shared',   label: 'Shared',      icon: <UsersIcon size={16} /> },
              { key: 'settings', label: 'Settings',    icon: <GearIcon size={16} /> },
            ]},
          ]}
        />
      </div>

    </div>
  ),
};
