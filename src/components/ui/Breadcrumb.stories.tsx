import type { Meta, StoryObj } from '@storybook/react';
import { HouseIcon, ShieldCheckIcon, UsersIcon } from '@phosphor-icons/react';
import { Breadcrumb } from './Breadcrumb';

const meta: Meta<typeof Breadcrumb> = {
  title: 'UI/Breadcrumb',
  component: Breadcrumb,
  parameters: {
    docs: {
      description: {
        component: 'Navigation hierarchy trail. Items support `href`, `onClick`, and `icon`. Last item is automatically `aria-current="page"`. Custom `separator` prop — defaults to caret icon. ARIA `nav` + `ol` structure.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Breadcrumb>;

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {
  render: () => (
    <Breadcrumb
      items={[
        { label: 'Home',       href: '#', icon: <HouseIcon size={14} /> },
        { label: 'Compliance', href: '#' },
        { label: 'Vendors',    href: '#' },
        { label: 'Acme Corp' },
      ]}
    />
  ),
};

// ─── All Variants ─────────────────────────────────────────────────────────────

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-6 max-w-xl">

      {/* Simple text */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-[var(--ds-text-muted)] mb-2">Text only</p>
        <Breadcrumb
          items={[
            { label: 'Dashboard', href: '#' },
            { label: 'Vendors', href: '#' },
            { label: 'Acme Corp' },
          ]}
        />
      </div>

      {/* With icons */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-[var(--ds-text-muted)] mb-2">With icons</p>
        <Breadcrumb
          items={[
            { label: 'Home',         href: '#', icon: <HouseIcon size={14} /> },
            { label: 'Compliance',   href: '#', icon: <ShieldCheckIcon size={14} /> },
            { label: 'Vendors',      href: '#', icon: <UsersIcon size={14} /> },
            { label: 'Acme Corp' },
          ]}
        />
      </div>

      {/* Slash separator */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-[var(--ds-text-muted)] mb-2">Slash separator</p>
        <Breadcrumb
          separator={<span className="text-[var(--ds-border-strong)] text-xs">/</span>}
          items={[
            { label: 'IT Ops', href: '#' },
            { label: 'Incidents', href: '#' },
            { label: 'INC-2847' },
          ]}
        />
      </div>

      {/* Deep path */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-[var(--ds-text-muted)] mb-2">Deep path</p>
        <Breadcrumb
          items={[
            { label: 'Analytics', href: '#' },
            { label: 'Dashboards', href: '#' },
            { label: 'Q1 2026', href: '#' },
            { label: 'Revenue by Region', href: '#' },
            { label: 'Enterprise Suite' },
          ]}
        />
      </div>

      {/* onClick only — no href */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-[var(--ds-text-muted)] mb-2">onClick (SPA navigation)</p>
        <Breadcrumb
          items={[
            { label: 'Dashboard', onClick: () => {} },
            { label: 'Settings',  onClick: () => {} },
            { label: 'Integrations' },
          ]}
        />
      </div>

    </div>
  ),
};
