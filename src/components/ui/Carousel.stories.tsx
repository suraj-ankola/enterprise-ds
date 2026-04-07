import type { Meta, StoryObj } from '@storybook/react';
import { Carousel, CarouselSlide } from './Carousel';

const meta: Meta<typeof Carousel> = {
  title: 'Content/Carousel',
  component: Carousel,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Swipeable, keyboard-navigable slide carousel. Supports multi-slide view, autoplay, loop, drag-to-swipe, and dot/arrow navigation. Wrap slides in `CarouselSlide` for consistent sizing.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Carousel>;

// ─── Shared slide content ─────────────────────────────────────────────────────

const VENDOR_SLIDES = [
  { name: 'Acme Corp',   score: 78, tag: 'ISO 27001',  color: 'var(--ds-brand-600)' },
  { name: 'GlobalSys',  score: 94, tag: 'SOC 2',       color: 'var(--ds-success-icon)' },
  { name: 'DataVault',  score: 31, tag: 'Non-compliant', color: 'var(--ds-danger-icon)' },
  { name: 'SecureBase', score: 55, tag: 'GDPR',         color: 'var(--ds-warning-icon)' },
  { name: 'CloudTrust', score: 82, tag: 'HIPAA',        color: 'var(--ds-brand-600)' },
];

const FEATURE_SLIDES = [
  { title: 'Vendor risk scoring',   body: 'Automated risk scores across 200+ signals — updated daily.',    emoji: '🛡️' },
  { title: 'Compliance tracking',   body: 'Track SOC 2, ISO 27001, GDPR, and HIPAA in one dashboard.',    emoji: '✅' },
  { title: 'AI-powered insights',   body: 'Surface risks before audits with ML-driven anomaly detection.', emoji: '🤖' },
  { title: 'Continuous monitoring', body: "Real-time alerts when a vendor's risk profile changes.",        emoji: '🔔' },
];

// ─── Stories ─────────────────────────────────────────────────────────────────

export const Playground: Story = {
  render: () => (
    <div className="p-8 bg-[var(--ds-bg-base)] max-w-sm">
      <Carousel>
        {VENDOR_SLIDES.map(v => (
          <CarouselSlide key={v.name}>
            <div className="bg-[var(--ds-bg-surface)] border border-[var(--ds-border-base)] rounded-xl p-5">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-semibold text-[var(--ds-text-primary)]">{v.name}</p>
                <span className="text-xs px-2 py-0.5 rounded-full border border-[var(--ds-border-base)] text-[var(--ds-text-muted)]">{v.tag}</span>
              </div>
              <p className="text-3xl font-bold" style={{ color: v.color }}>{v.score}</p>
              <p className="text-xs text-[var(--ds-text-muted)] mt-1">Risk score</p>
            </div>
          </CarouselSlide>
        ))}
      </Carousel>
    </div>
  ),
};

export const MultiSlide: Story = {
  name: 'Multi-slide view',
  render: () => (
    <div className="p-8 bg-[var(--ds-bg-base)] max-w-2xl">
      <Carousel slidesPerView={3} gap={12}>
        {VENDOR_SLIDES.map(v => (
          <CarouselSlide key={v.name}>
            <div className="bg-[var(--ds-bg-surface)] border border-[var(--ds-border-base)] rounded-xl p-4 text-center">
              <p className="text-2xl font-bold mb-1" style={{ color: v.color }}>{v.score}</p>
              <p className="text-xs font-medium text-[var(--ds-text-primary)]">{v.name}</p>
              <p className="text-[10px] text-[var(--ds-text-muted)]">{v.tag}</p>
            </div>
          </CarouselSlide>
        ))}
      </Carousel>
    </div>
  ),
};

export const AutoPlay: Story = {
  name: 'Autoplay + loop',
  render: () => (
    <div className="p-8 bg-[var(--ds-bg-base)] max-w-md">
      <Carousel autoPlay loop autoPlayInterval={2500}>
        {FEATURE_SLIDES.map(f => (
          <CarouselSlide key={f.title}>
            <div className="bg-[var(--ds-bg-surface)] border border-[var(--ds-border-base)] rounded-xl p-6 min-h-[120px] flex items-start gap-4">
              <span className="text-3xl">{f.emoji}</span>
              <div>
                <p className="text-sm font-semibold text-[var(--ds-text-primary)] mb-1">{f.title}</p>
                <p className="text-xs text-[var(--ds-text-secondary)] leading-relaxed">{f.body}</p>
              </div>
            </div>
          </CarouselSlide>
        ))}
      </Carousel>
      <p className="mt-2 text-xs text-[var(--ds-text-muted)]">Hover to pause autoplay.</p>
    </div>
  ),
};

export const DotsOnly: Story = {
  name: 'Dots only (no arrows)',
  render: () => (
    <div className="p-8 bg-[var(--ds-bg-base)] max-w-sm">
      <Carousel showArrows={false}>
        {FEATURE_SLIDES.map(f => (
          <CarouselSlide key={f.title}>
            <div className="bg-[var(--ds-bg-surface)] border border-[var(--ds-border-base)] rounded-xl p-6 min-h-[110px] text-center space-y-2">
              <span className="text-3xl block">{f.emoji}</span>
              <p className="text-sm font-semibold text-[var(--ds-text-primary)]">{f.title}</p>
            </div>
          </CarouselSlide>
        ))}
      </Carousel>
    </div>
  ),
};

export const ImageLike: Story = {
  name: 'Image / media slides',
  render: () => (
    <div className="p-8 bg-[var(--ds-bg-base)] max-w-md">
      <Carousel loop>
        {['var(--ds-brand-600)', 'var(--ds-success-icon)', 'var(--ds-warning-icon)', 'var(--ds-danger-icon)'].map((c, i) => (
          <CarouselSlide key={i}>
            <div
              className="h-48 rounded-xl flex items-center justify-center"
              style={{ background: `color-mix(in srgb, ${c} 15%, var(--ds-bg-subtle))` }}
            >
              <p className="text-sm font-medium text-[var(--ds-text-secondary)]">Slide {i + 1}</p>
            </div>
          </CarouselSlide>
        ))}
      </Carousel>
    </div>
  ),
};

export const Minimal: Story = {
  name: 'Minimal (no dots, no arrows)',
  render: () => (
    <div className="p-8 bg-[var(--ds-bg-base)] max-w-sm">
      <p className="text-xs text-[var(--ds-text-muted)] mb-2">Swipe or use keyboard ←→ to navigate</p>
      <Carousel showArrows={false} showDots={false}>
        {VENDOR_SLIDES.map(v => (
          <CarouselSlide key={v.name}>
            <div className="bg-[var(--ds-bg-surface)] border border-[var(--ds-border-base)] rounded-xl p-5">
              <p className="text-sm font-semibold text-[var(--ds-text-primary)]">{v.name}</p>
              <p className="text-xs text-[var(--ds-text-muted)]">{v.tag}</p>
            </div>
          </CarouselSlide>
        ))}
      </Carousel>
    </div>
  ),
};
