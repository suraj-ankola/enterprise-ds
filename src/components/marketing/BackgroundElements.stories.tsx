import type { Meta, StoryObj } from '@storybook/react';
import { BackgroundElements, AnimatedBackground, Blob } from './BackgroundElements';

const meta: Meta<typeof BackgroundElements> = {
  title: 'Marketing/BackgroundElements',
  component: BackgroundElements,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          '`BackgroundElements` provides static bg patterns (grid, dots, gradient, noise, aurora). `AnimatedBackground` adds motion (aurora, gradient-flow, mesh, particles). `Blob` is a raw blur orb for composing custom backgrounds. All are `absolute inset-0` — place inside a `relative` container.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof BackgroundElements>;

const Swatch = ({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) => (
  <div className={['relative h-64 overflow-hidden rounded-xl flex items-center justify-center', dark ? 'bg-gray-950' : 'bg-white'].join(' ')}>
    {children}
    <span className="relative z-10 text-sm font-medium opacity-60">Content on top</span>
  </div>
);

export const AllPatterns: Story = {
  render: () => (
    <div className="p-8 space-y-6 bg-neutral-100">
      {(['grid', 'dots', 'noise', 'gradient', 'aurora'] as const).map(v => (
        <div key={v}>
          <p className="text-xs font-semibold text-neutral-500 mb-2 uppercase tracking-wide">{v}</p>
          <Swatch dark={v === 'aurora'}>
            <BackgroundElements variant={v} />
          </Swatch>
        </div>
      ))}
    </div>
  ),
};

export const AnimatedVariants: Story = {
  name: 'AnimatedBackground variants',
  render: () => (
    <div className="p-8 space-y-6 bg-neutral-100">
      {(['aurora', 'mesh', 'particles', 'gradient-flow'] as const).map(v => (
        <div key={v}>
          <p className="text-xs font-semibold text-neutral-500 mb-2 uppercase tracking-wide">{v}</p>
          <Swatch dark>
            <AnimatedBackground variant={v} />
          </Swatch>
        </div>
      ))}
    </div>
  ),
};

export const CustomHue: Story = {
  name: 'Custom hue (aurora)',
  render: () => (
    <div className="p-8 grid grid-cols-3 gap-4 bg-neutral-100">
      {[0, 120, 240, 280, 30, 180].map(hue => (
        <Swatch key={hue} dark>
          <BackgroundElements variant="aurora" hue={hue} />
          <span className="relative z-10 text-xs font-mono text-white/60">{hue}°</span>
        </Swatch>
      ))}
    </div>
  ),
};

export const Composition: Story = {
  name: 'Composed — grid + gradient',
  render: () => (
    <div className="p-8 bg-neutral-100">
      <Swatch dark>
        <BackgroundElements variant="grid" hue={220} opacity={0.6} />
        <BackgroundElements variant="gradient" hue={220} opacity={0.8} />
      </Swatch>
    </div>
  ),
};

export const BlobShowcase: Story = {
  name: 'Blob primitives',
  render: () => (
    <div className="p-8 bg-neutral-100">
      <div className="relative h-80 bg-gray-950 rounded-xl overflow-hidden flex items-center justify-center">
        <Blob color="var(--ds-brand-600)" size={400} blur={100} opacity={0.25} className="-top-1/4 -left-1/4" />
        <Blob color="hsl(260 80% 60%)" size={300} blur={80} opacity={0.2} className="top-1/4 right-0" />
        <Blob color="hsl(180 70% 55%)" size={250} blur={90} opacity={0.15} className="bottom-0 left-1/3" />
        <span className="relative z-10 text-sm font-medium text-white/60">Custom blob composition</span>
      </div>
    </div>
  ),
};
