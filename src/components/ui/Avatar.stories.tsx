import type { Meta, StoryObj } from '@storybook/react';
import { Avatar, AvatarGroup } from './Avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Layout/Avatar',
  component: Avatar,
  parameters: {
    docs: {
      description: {
        component: 'User representation with image, initials, and icon fallback (in priority order). 5 sizes, circle and square shapes. `status` prop adds a coloured dot (online · offline · away · busy). `AvatarGroup` stacks avatars with an overflow +N indicator.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Avatar>;

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {
  render: () => (
    <div className="flex items-end gap-4 flex-wrap">
      <Avatar size="xs" initials="SN" />
      <Avatar size="sm" initials="SN" />
      <Avatar size="md" initials="SN" />
      <Avatar size="lg" initials="SN" />
      <Avatar size="xl" initials="SN" />
    </div>
  ),
};

// ─── All Variants ─────────────────────────────────────────────────────────────

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-8">

      {/* Fallback states */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-[var(--ds-text-muted)] mb-3">Fallback priority</p>
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-center gap-1">
            <Avatar initials="SN" />
            <p className="text-[10px] text-[var(--ds-text-muted)]">Initials</p>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Avatar />
            <p className="text-[10px] text-[var(--ds-text-muted)]">Icon</p>
          </div>
        </div>
      </div>

      {/* Sizes */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-[var(--ds-text-muted)] mb-3">Sizes</p>
        <div className="flex items-end gap-4">
          {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map(s => (
            <div key={s} className="flex flex-col items-center gap-1">
              <Avatar size={s} initials="SN" />
              <p className="text-[10px] text-[var(--ds-text-muted)]">{s}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Shape */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-[var(--ds-text-muted)] mb-3">Shapes</p>
        <div className="flex gap-4">
          <div className="flex flex-col items-center gap-1">
            <Avatar initials="SN" shape="circle" />
            <p className="text-[10px] text-[var(--ds-text-muted)]">Circle</p>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Avatar initials="SN" shape="square" />
            <p className="text-[10px] text-[var(--ds-text-muted)]">Square</p>
          </div>
        </div>
      </div>

      {/* Status */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-[var(--ds-text-muted)] mb-3">Status indicators</p>
        <div className="flex gap-4">
          {(['online', 'offline', 'away', 'busy'] as const).map(s => (
            <div key={s} className="flex flex-col items-center gap-1">
              <Avatar initials="SN" status={s} size="md" />
              <p className="text-[10px] text-[var(--ds-text-muted)]">{s}</p>
            </div>
          ))}
        </div>
      </div>

      {/* AvatarGroup */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-[var(--ds-text-muted)] mb-3">AvatarGroup</p>
        <div className="flex flex-col gap-4">
          <AvatarGroup max={4} total={12}>
            <Avatar initials="SN" />
            <Avatar initials="RK" />
            <Avatar initials="AM" />
            <Avatar initials="VP" />
          </AvatarGroup>
          <AvatarGroup max={3} total={8} size="sm">
            <Avatar initials="SN" />
            <Avatar initials="RK" />
            <Avatar initials="AM" />
          </AvatarGroup>
          <div className="flex items-center gap-3">
            <AvatarGroup max={4}>
              <Avatar initials="SN" status="online" />
              <Avatar initials="RK" status="away" />
              <Avatar initials="AM" status="online" />
              <Avatar initials="VP" status="busy" />
            </AvatarGroup>
            <span className="text-sm text-[var(--ds-text-secondary)]">4 team members</span>
          </div>
        </div>
      </div>
    </div>
  ),
};
