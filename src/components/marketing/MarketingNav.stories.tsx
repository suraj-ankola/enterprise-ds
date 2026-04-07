import type { Meta, StoryObj } from '@storybook/react';
import { MarketingNav } from './MarketingNav';

const meta: Meta<typeof MarketingNav> = {
  title: 'Marketing/MarketingNav',
  component: MarketingNav,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Fixed top navigation for marketing / landing pages. Transparent on load, opaque on scroll (when `transparent` is set). Responsive mobile drawer. Supports mega-dropdown sub-items.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof MarketingNav>;

const Logo = ({ dark = true }: { dark?: boolean }) => (
  <div className="flex items-center gap-2">
    <div className="h-7 w-7 rounded-lg bg-[var(--ds-brand-600)] flex items-center justify-center">
      <span className="text-white text-xs font-bold">R</span>
    </div>
    <span className={['text-sm font-bold', dark ? 'text-white' : 'text-[var(--ds-text-primary)]'].join(' ')}>riskOS</span>
  </div>
);

const NAV_ITEMS = [
  {
    label: 'Product',
    children: [
      { label: 'Vendor risk scoring',    href: '#', description: 'Automated risk scores across 200+ signals' },
      { label: 'Compliance tracking',    href: '#', description: 'ISO 27001, SOC 2, GDPR and more' },
      { label: 'Continuous monitoring',  href: '#', description: 'Real-time alerts and anomaly detection' },
    ],
  },
  { label: 'Pricing',    href: '#' },
  { label: 'Customers',  href: '#' },
  { label: 'Blog',       href: '#' },
  { label: 'Docs',       href: '#' },
];

export const Dark: Story = {
  render: () => (
    <div className="bg-gray-950 h-32">
      <MarketingNav
        logo={<Logo />}
        items={NAV_ITEMS}
        actions={
          <>
            <a href="#" className="text-sm font-medium text-white/70 hover:text-white px-3 py-2 transition-colors">Sign in</a>
            <button className="h-9 px-4 rounded-xl bg-[var(--ds-brand-600)] text-white text-sm font-semibold hover:bg-[var(--ds-brand-700)] transition-colors">
              Get started
            </button>
          </>
        }
      />
    </div>
  ),
};

export const Light: Story = {
  render: () => (
    <div className="bg-[var(--ds-bg-base)] h-32">
      <MarketingNav
        dark={false}
        logo={<Logo dark={false} />}
        items={NAV_ITEMS}
        actions={
          <>
            <a href="#" className="text-sm font-medium text-[var(--ds-text-muted)] hover:text-[var(--ds-text-primary)] px-3 py-2 transition-colors">Sign in</a>
            <button className="h-9 px-4 rounded-xl bg-[var(--ds-brand-600)] text-white text-sm font-semibold hover:bg-[var(--ds-brand-700)] transition-colors">
              Get started
            </button>
          </>
        }
      />
    </div>
  ),
};
