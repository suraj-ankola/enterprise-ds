import type { Meta, StoryObj } from '@storybook/react';
import { VideoPlayer } from './VideoPlayer';

const meta: Meta<typeof VideoPlayer> = {
  title: 'Content/VideoPlayer',
  component: VideoPlayer,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Custom HTML5 video player with play/pause, seek bar, volume control, mute, and fullscreen. Controls auto-hide during playback. Accepts any browser-compatible video URL.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof VideoPlayer>;

// Use a small, freely-available sample video
const SAMPLE_VIDEO = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
const SAMPLE_POSTER = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg';

export const Playground: Story = {
  render: () => (
    <div className="p-8 bg-[var(--ds-bg-base)] max-w-lg">
      <VideoPlayer
        src={SAMPLE_VIDEO}
        poster={SAMPLE_POSTER}
        title="Big Buck Bunny"
      />
    </div>
  ),
};

export const WithTitle: Story = {
  name: 'With title overlay',
  render: () => (
    <div className="p-8 bg-[var(--ds-bg-base)] max-w-lg">
      <VideoPlayer
        src={SAMPLE_VIDEO}
        poster={SAMPLE_POSTER}
        title="Vendor onboarding walkthrough"
        showTitle
      />
    </div>
  ),
};

export const Muted: Story = {
  name: 'Muted (autoplay-safe)',
  render: () => (
    <div className="p-8 bg-[var(--ds-bg-base)] max-w-lg">
      <VideoPlayer
        src={SAMPLE_VIDEO}
        poster={SAMPLE_POSTER}
        muted
        autoPlay
        loop
      />
      <p className="mt-2 text-xs text-[var(--ds-text-muted)]">Muted + autoplay — suitable for hero background loops.</p>
    </div>
  ),
};

export const Compact: Story = {
  name: 'Compact card embed',
  render: () => (
    <div className="p-8 bg-[var(--ds-bg-base)] max-w-sm">
      <div className="bg-[var(--ds-bg-surface)] border border-[var(--ds-border-base)] rounded-xl overflow-hidden">
        <VideoPlayer src={SAMPLE_VIDEO} poster={SAMPLE_POSTER} className="rounded-none" />
        <div className="p-4">
          <p className="text-sm font-semibold text-[var(--ds-text-primary)]">Platform overview</p>
          <p className="text-xs text-[var(--ds-text-muted)] mt-1">3 min · Updated Dec 2025</p>
        </div>
      </div>
    </div>
  ),
};
