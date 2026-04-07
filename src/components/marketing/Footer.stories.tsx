import type { Meta, StoryObj } from '@storybook/react';
import { Footer } from './Footer';

const meta: Meta<typeof Footer> = {
  title: 'Marketing/Footer',
  component: Footer,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Marketing footer with brand column, multi-column links, social icons, and bottom bar. Dark and light themes. Badge support on individual links (e.g. "New").',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Footer>;

const Logo = ({ dark = true }: { dark?: boolean }) => (
  <div className="flex items-center gap-2">
    <div className="h-7 w-7 rounded-lg bg-[var(--ds-brand-600)] flex items-center justify-center">
      <span className="text-white text-xs font-bold">R</span>
    </div>
    <span className={['text-sm font-bold', dark ? 'text-white' : 'text-[var(--ds-text-primary)]'].join(' ')}>riskOS</span>
  </div>
);

const GitHubIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.39.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.54-1.37-1.32-1.74-1.32-1.74-1.08-.74.08-.73.08-.73 1.2.08 1.83 1.23 1.83 1.23 1.06 1.82 2.79 1.3 3.47.99.1-.77.41-1.3.75-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.23-3.22-.12-.3-.53-1.52.12-3.17 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.3-1.55 3.3-1.23 3.3-1.23.65 1.65.24 2.87.12 3.17.77.84 1.23 1.91 1.23 3.22 0 4.61-2.8 5.63-5.48 5.92.43.37.82 1.1.82 2.22v3.29c0 .32.22.7.83.58C20.57 21.8 24 17.3 24 12 24 5.37 18.63 0 12 0z" />
  </svg>
);
const TwitterIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);
const LinkedInIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const COLUMNS = [
  {
    heading: 'Product',
    links: [
      { label: 'Vendor risk scoring',   href: '#' },
      { label: 'Compliance tracking',   href: '#' },
      { label: 'AI insights',           href: '#', badge: 'New' },
      { label: 'Integrations',          href: '#' },
      { label: 'Changelog',             href: '#' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About',     href: '#' },
      { label: 'Blog',      href: '#' },
      { label: 'Customers', href: '#' },
      { label: 'Careers',   href: '#', badge: 'Hiring' },
      { label: 'Press',     href: '#' },
    ],
  },
  {
    heading: 'Resources',
    links: [
      { label: 'Documentation', href: '#' },
      { label: 'API reference',  href: '#' },
      { label: 'Status',         href: '#' },
      { label: 'Security',       href: '#' },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { label: 'Privacy policy', href: '#' },
      { label: 'Terms of use',   href: '#' },
      { label: 'Cookie policy',  href: '#' },
      { label: 'DPA',            href: '#' },
    ],
  },
];

export const Dark: Story = {
  render: () => (
    <Footer
      logo={<Logo />}
      tagline="Enterprise vendor risk management — automated, continuous, and built for compliance teams."
      columns={COLUMNS}
      socialLinks={[
        { label: 'GitHub',   href: '#', icon: <GitHubIcon /> },
        { label: 'Twitter',  href: '#', icon: <TwitterIcon /> },
        { label: 'LinkedIn', href: '#', icon: <LinkedInIcon /> },
      ]}
      bottomLeft={<>© 2026 riskOS, Inc. All rights reserved.</>}
      bottomRight={
        <>
          <a href="#" className="hover:text-white transition-colors">Privacy</a>
          <a href="#" className="hover:text-white transition-colors">Terms</a>
          <a href="#" className="hover:text-white transition-colors">Cookies</a>
        </>
      }
    />
  ),
};

export const Light: Story = {
  render: () => (
    <Footer
      dark={false}
      logo={<Logo dark={false} />}
      tagline="Enterprise vendor risk management — automated, continuous, and built for compliance teams."
      columns={COLUMNS}
      socialLinks={[
        { label: 'GitHub',   href: '#', icon: <GitHubIcon /> },
        { label: 'Twitter',  href: '#', icon: <TwitterIcon /> },
        { label: 'LinkedIn', href: '#', icon: <LinkedInIcon /> },
      ]}
      bottomLeft={<>© 2026 riskOS, Inc. All rights reserved.</>}
    />
  ),
};

export const Minimal: Story = {
  render: () => (
    <Footer
      logo={<Logo />}
      tagline="Trusted by 500+ compliance teams worldwide."
      bottomLeft={<>© 2026 riskOS, Inc.</>}
      bottomRight={
        <>
          <a href="#" className="hover:text-white transition-colors">Privacy</a>
          <a href="#" className="hover:text-white transition-colors">Terms</a>
        </>
      }
    />
  ),
};
