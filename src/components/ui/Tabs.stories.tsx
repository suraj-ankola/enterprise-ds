import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { ShieldCheckIcon, BellIcon, ChartBarIcon, GearIcon } from '@phosphor-icons/react';
import { Badge } from './Badge';
import { Tabs, TabPanel } from './Tabs';

const meta: Meta<typeof Tabs> = {
  title: 'Navigation/Tabs',
  component: Tabs,
  argTypes: { onChange: { control: false } },
  parameters: {
    docs: {
      description: {
        component: '3 visual variants: `line` · `pill` · `boxed`. Roving tabindex keyboard model — Arrow keys move focus and activate immediately. `TabPanel` is a separate named export (`role="tabpanel"`) that can be placed anywhere. Supports icon + badge slots per tab.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Tabs>;

const BASIC_TABS = [
  { key: 'overview',  label: 'Overview' },
  { key: 'vendors',   label: 'Vendors' },
  { key: 'reports',   label: 'Reports' },
  { key: 'settings',  label: 'Settings', disabled: true },
];

export const Playground: Story = {
  args: {
    tabs:    BASIC_TABS,
    variant: 'line',
    size:    'md',
  },
};

export const AllVariants: Story = {
  render: () => {
    const [lineTab,  setLine]  = useState('vendors');
    const [pillTab,  setPill]  = useState('vendors');
    const [boxedTab, setBoxed] = useState('vendors');

    const tabs = [
      { key: 'overview', label: 'Overview' },
      { key: 'vendors',  label: 'Vendors' },
      { key: 'reports',  label: 'Reports' },
      { key: 'archived', label: 'Archived', disabled: true },
    ];

    const renderPanels = (id: string, active: string) => (
      <div className="mt-4 p-4 rounded-lg border border-[var(--ds-border-base)] text-sm text-[var(--ds-text-secondary)] min-h-[60px]">
        <TabPanel tabsId={id} tabKey="overview" activeKey={active}>Overview panel content</TabPanel>
        <TabPanel tabsId={id} tabKey="vendors"  activeKey={active}>Vendors panel content</TabPanel>
        <TabPanel tabsId={id} tabKey="reports"  activeKey={active}>Reports panel content</TabPanel>
      </div>
    );

    return (
      <div className="flex flex-col gap-10 max-w-xl">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-[var(--ds-text-muted)] mb-3">Line (default)</p>
          <Tabs id="line-demo" tabs={tabs} variant="line" value={lineTab} onChange={setLine} />
          {renderPanels('line-demo', lineTab)}
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-[var(--ds-text-muted)] mb-3">Pill</p>
          <Tabs id="pill-demo" tabs={tabs} variant="pill" value={pillTab} onChange={setPill} />
          {renderPanels('pill-demo', pillTab)}
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-[var(--ds-text-muted)] mb-3">Boxed</p>
          <Tabs id="boxed-demo" tabs={tabs} variant="boxed" value={boxedTab} onChange={setBoxed} />
          {renderPanels('boxed-demo', boxedTab)}
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-[var(--ds-text-muted)] mb-3">With icons + badges</p>
          <Tabs
            id="icon-demo"
            variant="line"
            defaultValue="alerts"
            tabs={[
              { key: 'overview', label: 'Overview',  icon: <ShieldCheckIcon size={14} /> },
              { key: 'alerts',   label: 'Alerts',    icon: <BellIcon size={14} />,
                badge: <Badge variant="danger" size="sm" appearance="solid">3</Badge> },
              { key: 'analytics',label: 'Analytics', icon: <ChartBarIcon size={14} /> },
              { key: 'settings', label: 'Settings',  icon: <GearIcon size={14} /> },
            ]}
          />
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-[var(--ds-text-muted)] mb-3">Full width — pill</p>
          <Tabs
            id="full-demo"
            variant="pill"
            fullWidth
            defaultValue="vendors"
            tabs={[
              { key: 'overview', label: 'Overview' },
              { key: 'vendors',  label: 'Vendors' },
              { key: 'reports',  label: 'Reports' },
            ]}
          />
        </div>
      </div>
    );
  },
};
