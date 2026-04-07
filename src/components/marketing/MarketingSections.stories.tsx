import type { Meta, StoryObj } from '@storybook/react';
import {
  LogoCloud, StatsSection, FeatureSection,
  PricingSection, TestimonialsSection, CTABanner,
} from './MarketingSections';
import {
  ShieldCheckIcon, ChartBarIcon, BellIcon,
  RocketLaunchIcon, LockIcon, DatabaseIcon,
} from '@phosphor-icons/react';

const meta = {
  title: 'Marketing/Sections',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Composable marketing sections: LogoCloud, StatsSection, FeatureSection (grid/list), PricingSection, TestimonialsSection, CTABanner.',
      },
    },
  },
} satisfies Meta;
export default meta;
type Story = StoryObj;

// ─── Shared data ──────────────────────────────────────────────────────────────

const LOGOS = ['Acme', 'Stripe', 'Notion', 'Linear', 'Vercel', 'GitHub'].map(name => ({
  name,
  logo: <span style={{ fontSize: 14, fontWeight: 700, letterSpacing: '-0.03em', color: 'currentColor' }}>{name}</span>,
}));

const STATS = [
  { value: '500+',  label: 'Enterprise customers',   description: 'Teams from 40 countries' },
  { value: '2M+',   label: 'Vendors assessed',        description: 'Across all tiers' },
  { value: '99.9%', label: 'Platform uptime',         description: 'SLA-backed availability' },
  { value: '40%',   label: 'Avg. risk reduction',     description: 'Within 90 days' },
];

const FEATURES = [
  { icon: <ShieldCheckIcon size={18} />, title: 'Automated risk scoring',      description: 'Get a full risk profile for every vendor automatically — no questionnaires required.' },
  { icon: <ChartBarIcon size={18} />,    title: 'Real-time dashboards',         description: 'Live risk heatmaps, trend charts, and compliance coverage across your entire estate.' },
  { icon: <BellIcon size={18} />,        title: 'Instant alerts',               description: "Be the first to know when a vendor's risk posture changes — before incidents happen." },
  { icon: <RocketLaunchIcon size={18} />, title: 'Fast onboarding',             description: 'Connect existing GRC tools and vendor lists in under 2 hours. No rip-and-replace.' },
  { icon: <LockIcon size={18} />,        title: 'SOC 2 Type II certified',      description: 'We eat our own cooking. Full transparency on how we protect your data.' },
  { icon: <DatabaseIcon size={18} />,    title: '200+ data sources',            description: 'Dark web feeds, public breach databases, and proprietary signals all in one place.' },
];

const TESTIMONIALS = [
  { quote: 'riskOS cut our vendor review time by 70%. We used to dread quarterly audits — now they\'re almost automatic.', name: 'Sarah Chen', title: 'Head of GRC', company: 'Finova' },
  { quote: 'The real-time alerts are a game changer. We caught a critical supplier breach 3 days before they disclosed it.', name: 'Marcus Webb', title: 'CISO', company: 'Meridian Health' },
  { quote: 'Best-in-class UX for a compliance tool. My team actually enjoys using it, which I never thought I\'d say.', name: 'Priya Nair', title: 'VP Compliance', company: 'Aether Capital' },
  { quote: 'We manage 800+ vendors. riskOS is the only platform that scales with us without sacrificing depth.', name: 'Tom Birch', title: 'Risk Director', company: 'NovaTech' },
  { quote: 'Onboarded in a day. Saw ROI in a week. I can\'t recommend it enough to other compliance teams.', name: 'Lena Hoffman', title: 'Compliance Lead', company: 'CloudBase' },
];

const TIERS = [
  {
    name:        'Starter',
    price:       '$149',
    period:      'per month · up to 25 vendors',
    description: 'For small teams getting started with third-party risk.',
    features:    ['Up to 25 vendors', 'Automated risk scoring', 'Email alerts', 'SOC 2 & ISO reports', '5 user seats'],
    cta:         <button className="w-full h-10 rounded-xl border border-[var(--ds-border-base)] text-sm font-semibold text-[var(--ds-text-primary)] hover:bg-[var(--ds-bg-subtle)] transition-colors">Start free trial</button>,
  },
  {
    name:        'Growth',
    price:       '$499',
    period:      'per month · up to 200 vendors',
    description: 'Everything in Starter plus AI insights and integrations.',
    features:    ['Up to 200 vendors', 'AI-powered insights', 'Slack & Jira integrations', 'Custom risk frameworks', '20 user seats'],
    cta:         <button className="w-full h-10 rounded-xl bg-white text-[var(--ds-brand-600)] text-sm font-semibold hover:bg-white/90 transition-colors">Start free trial</button>,
    highlighted: true,
    badge:       'Most popular',
  },
  {
    name:        'Enterprise',
    price:       'Custom',
    period:      'talk to sales',
    description: 'Unlimited vendors, dedicated support, and SSO.',
    features:    ['Unlimited vendors', 'Dedicated CSM', 'SSO & SCIM', 'SLA uptime guarantee', 'Unlimited seats'],
    cta:         <button className="w-full h-10 rounded-xl border border-[var(--ds-border-base)] text-sm font-semibold text-[var(--ds-text-primary)] hover:bg-[var(--ds-bg-subtle)] transition-colors">Talk to sales</button>,
  },
];

// ─── Stories ─────────────────────────────────────────────────────────────────

export const LogoCloudStory: Story = {
  name: 'LogoCloud',
  render: () => <LogoCloud logos={LOGOS} />,
};

export const LogoCloudDark: Story = {
  name: 'LogoCloud — dark',
  render: () => <LogoCloud logos={LOGOS} dark />,
};

export const StatsSectionStory: Story = {
  name: 'StatsSection',
  render: () => (
    <StatsSection
      eyebrow="By the numbers"
      heading="Results that speak for themselves"
      stats={STATS}
    />
  ),
};

export const FeatureGrid: Story = {
  name: 'FeatureSection — grid',
  render: () => (
    <FeatureSection
      eyebrow="Everything you need"
      heading="Built for modern compliance teams"
      subheading="From initial vendor onboarding to continuous monitoring — riskOS handles the full lifecycle."
      features={FEATURES}
      layout="grid"
    />
  ),
};

export const FeatureList: Story = {
  name: 'FeatureSection — list',
  render: () => (
    <FeatureSection
      eyebrow="Why riskOS"
      heading="Everything your GRC team needs"
      features={FEATURES}
      layout="list"
      dark
    />
  ),
};

export const PricingSectionStory: Story = {
  name: 'PricingSection',
  render: () => (
    <PricingSection
      eyebrow="Simple pricing"
      heading="Plans for every stage"
      tiers={TIERS}
    />
  ),
};

export const TestimonialsSectionStory: Story = {
  name: 'TestimonialsSection',
  render: () => (
    <TestimonialsSection
      eyebrow="Customer stories"
      heading="Trusted by 500+ compliance teams"
      testimonials={TESTIMONIALS}
    />
  ),
};

export const CTAGradient: Story = {
  name: 'CTABanner — gradient',
  render: () => (
    <CTABanner
      heading="Ready to take control of vendor risk?"
      subheading="Join 500+ teams that use riskOS to automate compliance and reduce third-party risk."
      actions={
        <>
          <button className="h-11 px-6 rounded-xl bg-[var(--ds-brand-600)] text-white text-sm font-semibold hover:bg-[var(--ds-brand-700)] transition-colors">Start free trial</button>
          <button className="h-11 px-6 rounded-xl border border-white/20 text-white text-sm font-semibold hover:bg-white/10 transition-colors">Talk to sales</button>
        </>
      }
    />
  ),
};

export const CTABrand: Story = {
  name: 'CTABanner — brand fill',
  render: () => (
    <div className="bg-[var(--ds-bg-base)] py-8">
      <CTABanner
        variant="brand"
        heading="Start your free 14-day trial"
        subheading="No credit card required. Cancel anytime."
        actions={
          <button className="h-11 px-6 rounded-xl bg-white text-[var(--ds-brand-600)] text-sm font-semibold hover:bg-white/90 transition-colors">Get started free</button>
        }
      />
    </div>
  ),
};

export const FullLandingPage: Story = {
  name: 'Full landing page composition',
  render: () => (
    <div>
      <LogoCloud logos={LOGOS} />
      <StatsSection eyebrow="By the numbers" heading="Results that speak for themselves" stats={STATS} />
      <FeatureSection eyebrow="Everything you need" heading="Built for modern compliance teams" features={FEATURES} layout="grid" />
      <TestimonialsSection eyebrow="Customer stories" heading="Trusted by 500+ teams" testimonials={TESTIMONIALS} />
      <PricingSection eyebrow="Simple pricing" heading="Plans for every stage" tiers={TIERS} />
      <CTABanner
        heading="Ready to take control of vendor risk?"
        subheading="Join 500+ teams using riskOS."
        actions={<button className="h-11 px-6 rounded-xl bg-[var(--ds-brand-600)] text-white text-sm font-semibold">Start free trial</button>}
      />
    </div>
  ),
};
