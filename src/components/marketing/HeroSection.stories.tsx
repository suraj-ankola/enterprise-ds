import type { Meta, StoryObj } from '@storybook/react';
import { HeroSection } from './HeroSection';
import { AnimatedBackground } from './BackgroundElements';

const meta: Meta<typeof HeroSection> = {
  title: 'Marketing/HeroSection',
  component: HeroSection,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          '4 hero variants: centered (big splash), split (text + visual), video (full-bleed bg), minimal (editorial). Composes `BackgroundElements` and `AnimatedBackground` internally. Pass custom `background` to override.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof HeroSection>;

const PrimaryBtn = ({ children }: { children: React.ReactNode }) => (
  <button className="h-11 px-6 rounded-xl bg-[var(--ds-brand-600)] text-white text-sm font-semibold hover:bg-[var(--ds-brand-700)] transition-colors">
    {children}
  </button>
);
const SecondaryBtn = ({ children }: { children: React.ReactNode }) => (
  <button className="h-11 px-6 rounded-xl border border-white/20 text-white text-sm font-semibold hover:bg-white/10 transition-colors">
    {children}
  </button>
);

export const Centered: Story = {
  render: () => (
    <HeroSection
      variant="centered"
      announcement={<>🎉 Just launched — SOC 2 continuous monitoring</>}
      eyebrow="Enterprise risk intelligence"
      heading={<>Stop managing vendors.<br />Start trusting them.</>}
      subheading="Automate vendor risk scoring, compliance tracking, and audit readiness — across all your third-party relationships."
      actions={
        <>
          <PrimaryBtn>Start free trial</PrimaryBtn>
          <SecondaryBtn>Watch demo</SecondaryBtn>
        </>
      }
      stats={[
        { value: '500+', label: 'Enterprise customers' },
        { value: '2M+',  label: 'Vendors assessed' },
        { value: '99.9%', label: 'Uptime SLA' },
      ]}
    />
  ),
};

export const Split: Story = {
  render: () => (
    <HeroSection
      variant="split"
      eyebrow="Third-party risk management"
      heading={<>Vendor risk, under control</>}
      subheading="Get full visibility into your vendor ecosystem — risk scores, compliance status, and real-time alerts in one platform."
      actions={
        <>
          <PrimaryBtn>Get started</PrimaryBtn>
          <SecondaryBtn>Book a demo</SecondaryBtn>
        </>
      }
      visual={
        <div className="w-full max-w-sm aspect-video rounded-xl bg-white/10 border border-white/20 backdrop-blur-sm flex items-center justify-center">
          <span className="text-white/40 text-sm">Product screenshot</span>
        </div>
      }
      stats={[
        { value: '4.9★', label: 'G2 rating' },
        { value: '<2h',  label: 'Avg. onboarding' },
        { value: '40%',  label: 'Risk reduction' },
      ]}
    />
  ),
};

export const Minimal: Story = {
  render: () => (
    <HeroSection
      variant="minimal"
      eyebrow="New in 2026"
      heading="AI-powered vendor intelligence"
      subheading="Surface hidden risks before they become incidents. Our ML models analyse 200+ signals across your entire vendor estate."
      actions={
        <>
          <PrimaryBtn>Get early access</PrimaryBtn>
        </>
      }
    />
  ),
};

export const VideoHero: Story = {
  name: 'Video background',
  render: () => (
    <HeroSection
      variant="video"
      eyebrow="Live now"
      heading={<>Risk intelligence, always on</>}
      subheading="Continuous monitoring that never sleeps. Know the moment a vendor's risk profile changes."
      background={
        <AnimatedBackground variant="mesh" />
      }
      actions={
        <>
          <PrimaryBtn>Start free trial</PrimaryBtn>
          <SecondaryBtn>See how it works</SecondaryBtn>
        </>
      }
    />
  ),
};

export const LightTheme: Story = {
  name: 'Light theme (dark=false)',
  render: () => (
    <HeroSection
      variant="centered"
      dark={false}
      eyebrow="Trusted by compliance teams"
      heading="The smarter way to manage vendor risk"
      subheading="From questionnaires to continuous monitoring — riskOS gives you end-to-end vendor oversight."
      actions={
        <>
          <button className="h-11 px-6 rounded-xl bg-[var(--ds-brand-600)] text-white text-sm font-semibold hover:bg-[var(--ds-brand-700)] transition-colors">
            Start for free
          </button>
          <button className="h-11 px-6 rounded-xl border border-[var(--ds-border-base)] text-[var(--ds-text-secondary)] text-sm font-semibold hover:bg-[var(--ds-bg-subtle)] transition-colors">
            See pricing
          </button>
        </>
      }
    />
  ),
};
