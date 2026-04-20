import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import {
  ShieldCheckIcon,
  ChartBarIcon,
  BrainIcon,
  LightningIcon,
  LockKeyIcon,
  CloudIcon,
  GlobeIcon,
  CodeIcon,
} from '@phosphor-icons/react';

import { MarketingNav }    from './MarketingNav';
import { HeroSection }     from './HeroSection';
import { FeatureGrid, SplitFeature, TestimonialGrid, CtaBanner, LogoBar } from './MarketingSections';
import { MarketingFooter } from './MarketingFooter';
import { Button }          from './Button';
import { Badge }           from './Badge';

const meta: Meta = {
  title: 'Pages/LandingPage',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Assembled enterprise SaaS landing page composed from MarketingNav, HeroSection, FeatureGrid, SplitFeature, TestimonialGrid, CtaBanner, and MarketingFooter. Demonstrates how marketing layout primitives compose into a complete page.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

// ─── Shared content fixtures ──────────────────────────────────────────────────

const NAV_LINKS = [
  { label: 'Product',   href: '#product' },
  { label: 'Features',  href: '#features' },
  { label: 'Pricing',   href: '#pricing' },
  { label: 'Docs',      href: '#docs' },
];

const FEATURES = [
  {
    icon: <ShieldCheckIcon size={20} weight="duotone" />,
    title: 'Vendor Risk AI',
    description: 'Continuous monitoring and AI-powered risk scoring for every vendor relationship in your ecosystem.',
  },
  {
    icon: <ChartBarIcon size={20} weight="duotone" />,
    title: 'Compliance Analytics',
    description: 'Unified compliance dashboard across SOC 2, ISO 27001, GDPR, and custom frameworks.',
  },
  {
    icon: <BrainIcon size={20} weight="duotone" />,
    title: 'AI Insights',
    description: 'Natural language queries for instant answers across all your audit and vendor data.',
  },
  {
    icon: <LightningIcon size={20} weight="duotone" />,
    title: 'Automated Workflows',
    description: 'Evidence collection, questionnaire routing, and remediation tracking — on autopilot.',
  },
  {
    icon: <LockKeyIcon size={20} weight="duotone" />,
    title: 'Access Controls',
    description: 'Role-based permissions, SSO, and granular audit trails meet the strictest compliance requirements.',
  },
  {
    icon: <CloudIcon size={20} weight="duotone" />,
    title: 'Cloud-Native',
    description: 'SOC 2 Type II certified infrastructure. 99.99% uptime SLA with data residency options.',
  },
];

const TESTIMONIALS = [
  {
    quote: "We reduced our vendor review cycle from 3 weeks to 2 days. The AI flagged a critical supply chain risk we'd completely missed.",
    name: 'Priya Sharma',
    role: 'CISO',
    company: 'NovaPay',
  },
  {
    quote: "Finally a compliance platform that speaks plain English. My team stopped dreading audit season.",
    name: 'James Okonkwo',
    role: 'VP of GRC',
    company: 'Meridian Health',
  },
  {
    quote: "The multi-framework mapping alone saved us 6 months of consultant fees. SOC 2 + ISO + GDPR in one place.",
    name: 'Lin Wei',
    role: 'Head of Security',
    company: 'Datavault AI',
  },
];

const LOGO_PLACEHOLDERS = ['Acme Corp', 'NovaPay', 'StackCo', 'Meridian', 'Verity', 'Cloudex'].map((name) => (
  <span key={name} className="text-sm font-bold tracking-tight text-[var(--ds-text-muted)]">{name}</span>
));

// ─── Product visual placeholder ───────────────────────────────────────────────

function ProductVisual() {
  return (
    <div className="w-full max-w-lg rounded-2xl overflow-hidden border border-[var(--ds-border-base)] shadow-[var(--ds-shadow-xl)] bg-[var(--ds-bg-surface)]">
      {/* Fake browser chrome */}
      <div className="flex items-center gap-1.5 px-4 py-3 border-b border-[var(--ds-border-base)] bg-[var(--ds-bg-subtle)]">
        <span className="w-3 h-3 rounded-full bg-[var(--ds-danger-icon)]" />
        <span className="w-3 h-3 rounded-full bg-[var(--ds-warning-icon)]" />
        <span className="w-3 h-3 rounded-full bg-[var(--ds-success-icon)]" />
        <div className="ml-3 flex-1 h-5 rounded bg-[var(--ds-border-base)]" />
      </div>

      {/* Fake dashboard content */}
      <div className="p-4 flex flex-col gap-3">
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: 'Risk Score', value: '94 / 100', color: 'bg-[var(--ds-success-bg-subtle)] text-[var(--ds-success-text)]' },
            { label: 'Vendors',    value: '142',       color: 'bg-[var(--ds-brand-50)] text-[var(--ds-brand-700)]' },
            { label: 'Open Items', value: '3',         color: 'bg-[var(--ds-warning-bg-subtle)] text-[var(--ds-warning-text)]' },
          ].map((s) => (
            <div key={s.label} className={`rounded-lg p-3 ${s.color}`}>
              <p className="text-lg font-bold">{s.value}</p>
              <p className="text-xs mt-0.5 opacity-80">{s.label}</p>
            </div>
          ))}
        </div>
        <div className="rounded-lg border border-[var(--ds-border-base)] overflow-hidden">
          {['Acme Inc — Low Risk', 'StackPro — Medium Risk', 'DataFlow — Review'].map((row, i) => (
            <div key={i} className="flex items-center justify-between px-3 py-2.5 border-b last:border-b-0 border-[var(--ds-border-base)] bg-[var(--ds-bg-surface)] text-xs">
              <span className="text-[var(--ds-text-secondary)]">{row}</span>
              <span className={i === 1 ? 'text-[var(--ds-warning-text)] font-medium' : i === 2 ? 'text-[var(--ds-danger-text)] font-medium' : 'text-[var(--ds-success-text)] font-medium'}>
                {i === 0 ? '92' : i === 1 ? '67' : '—'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Stories ──────────────────────────────────────────────────────────────────

export const FullPage: Story = {
  name: 'Full landing page',
  render: () => (
    <div className="min-h-screen bg-[var(--ds-bg-base)]">
      <MarketingNav
        appName="Comply AI"
        links={NAV_LINKS}
        secondary={<Button variant="ghost" size="sm">Sign in</Button>}
        cta={<Button variant="primary" size="sm">Get started free</Button>}
      />

      <HeroSection
        eyebrow="Now in GA — SOC 2 + ISO 27001 + GDPR"
        headline="Vendor risk and compliance, powered by AI"
        headlineAccent="powered by AI"
        subheadline="Comply AI continuously monitors your vendor ecosystem, automates evidence collection, and gives your team instant answers across every framework."
        primaryCta={<Button variant="primary" size="lg">Start free trial</Button>}
        secondaryCta={<Button variant="secondary" size="lg">Watch demo</Button>}
        socialProof={
          <p className="text-xs text-[var(--ds-text-muted)]">
            No credit card required · Setup in 15 minutes · SOC 2 certified
          </p>
        }
        visual={<ProductVisual />}
        layout="split"
      />

      <LogoBar
        label="Trusted by security teams at"
        logos={LOGO_PLACEHOLDERS}
      />

      <FeatureGrid
        eyebrow="Platform capabilities"
        headline="Everything your GRC team needs"
        subheadline="From first-party risk assessments to continuous vendor monitoring, Comply AI handles the heavy lifting so your team can focus on what matters."
        features={FEATURES}
        columns={3}
      />

      <SplitFeature
        eyebrow="Vendor Risk Management"
        headline="Know your vendors before they become your problem"
        description="Comply AI ingests questionnaire responses, certifications, breach history, and real-time threat feeds to build a living risk score for every vendor."
        bullets={[
          'Automated questionnaire distribution and follow-up',
          'AI-mapped answers to your security controls',
          'Continuous monitoring with instant alerts',
          'Side-by-side vendor comparisons',
        ]}
        cta={<Button variant="primary">See vendor risk in action</Button>}
        visual={<ProductVisual />}
        textSide="left"
        bg="surface"
      />

      <SplitFeature
        eyebrow="Compliance Automation"
        headline="Audit season is just another week"
        description="Map controls once, satisfy multiple frameworks automatically. When auditors ask, your evidence is already organized and ready to export."
        bullets={[
          'Single control mapped to SOC 2, ISO, GDPR simultaneously',
          'Auto-collected evidence from 200+ integrations',
          'Auditor-ready reports in one click',
          'Continuous monitoring replaces point-in-time audits',
        ]}
        cta={<Button variant="primary" className="bg-white text-[var(--ds-brand-600)] hover:bg-white/90">See compliance automation</Button>}
        visual={<ProductVisual />}
        textSide="right"
        bg="brand"
      />

      <TestimonialGrid
        headline="Loved by security and compliance teams"
        testimonials={TESTIMONIALS}
      />

      <CtaBanner
        headline="Ready to close the compliance gap?"
        subheadline="Join 500+ enterprise security teams who've cut their compliance overhead by 70%."
        primaryCta={<Button variant="primary" size="lg" className="bg-white text-[var(--ds-brand-600)] hover:bg-white/90">Start free trial</Button>}
        secondaryCta={<Button variant="ghost" size="lg" className="text-white hover:bg-white/10 border-white/30 border">Talk to sales</Button>}
        variant="brand"
      />

      <MarketingFooter
        appName="Comply AI"
        tagline="The AI-powered platform for vendor risk management and compliance automation."
        columns={[
          {
            heading: 'Product',
            links: [
              { label: 'Vendor Risk',   href: '#' },
              { label: 'Compliance',    href: '#' },
              { label: 'AI Insights',   href: '#' },
              { label: 'Integrations',  href: '#' },
            ],
          },
          {
            heading: 'Company',
            links: [
              { label: 'About',         href: '#' },
              { label: 'Blog',          href: '#' },
              { label: 'Careers',       href: '#' },
              { label: 'Contact',       href: '#' },
            ],
          },
          {
            heading: 'Resources',
            links: [
              { label: 'Documentation', href: '#' },
              { label: 'API Reference', href: '#' },
              { label: 'Status',        href: '#' },
              { label: 'Changelog',     href: '#' },
            ],
          },
        ]}
      />
    </div>
  ),
};

export const HeroOnly: Story = {
  name: 'Hero — split layout',
  render: () => (
    <div className="bg-[var(--ds-bg-base)]">
      <MarketingNav
        appName="Comply AI"
        links={NAV_LINKS}
        secondary={<Button variant="ghost" size="sm">Sign in</Button>}
        cta={<Button variant="primary" size="sm">Get started free</Button>}
      />
      <HeroSection
        eyebrow="Now in GA"
        headline="Vendor risk and compliance, powered by AI"
        headlineAccent="powered by AI"
        subheadline="Monitor vendors, automate evidence collection, and get instant answers across every compliance framework."
        primaryCta={<Button variant="primary" size="lg">Start free trial</Button>}
        secondaryCta={<Button variant="secondary" size="lg">Watch demo</Button>}
        visual={<ProductVisual />}
        layout="split"
      />
    </div>
  ),
};

export const HeroCentered: Story = {
  name: 'Hero — centered layout',
  render: () => (
    <div className="bg-[var(--ds-bg-base)]">
      <MarketingNav
        appName="Comply AI"
        links={NAV_LINKS}
        cta={<Button variant="primary" size="sm">Get started</Button>}
      />
      <HeroSection
        eyebrow="Now in GA"
        headline="Compliance automation for the AI era"
        headlineAccent="AI era"
        subheadline="Comply AI continuously monitors your vendor ecosystem and automates evidence collection across SOC 2, ISO 27001, and GDPR."
        primaryCta={<Button variant="primary" size="lg">Start free trial</Button>}
        secondaryCta={<Button variant="secondary" size="lg">See pricing</Button>}
        visual={<ProductVisual />}
        layout="centered"
      />
    </div>
  ),
};

export const FeaturesOnly: Story = {
  name: 'Feature grid',
  render: () => (
    <div className="bg-[var(--ds-bg-base)]">
      <FeatureGrid
        eyebrow="Platform capabilities"
        headline="Everything your GRC team needs"
        subheadline="From first-party risk assessments to continuous vendor monitoring."
        features={FEATURES}
        columns={3}
      />
    </div>
  ),
};
