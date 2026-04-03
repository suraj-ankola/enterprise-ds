import type { Meta, StoryObj } from '@storybook/react';
import { Toggle } from './Toggle';

const meta: Meta<typeof Toggle> = {
  title: 'UI/Toggle',
  component: Toggle,
  argTypes: { onChange: { control: false } },
  parameters: {
    docs: {
      description: {
        component: '`role="switch"` + `aria-checked`. Controlled/uncontrolled. 3 sizes on the 8pt grid. Thumb positioned with `translate-x` — track uses `items-center` to keep the thumb circular regardless of track height.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Toggle>;

export const Playground: Story = {
  args: {
    label:         'Enable notifications',
    labelPosition: 'right',
    size:          'md',
    disabled:      false,
    defaultChecked: false,
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      {/* Sizes */}
      {(['sm', 'md', 'lg'] as const).map(size => (
        <div key={size} className="flex flex-col gap-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-[var(--ds-text-muted)]">
            {size}
          </p>
          <div className="flex flex-wrap gap-6 items-center">
            <Toggle size={size} />
            <Toggle size={size} defaultChecked />
            <Toggle size={size} label="Off" />
            <Toggle size={size} label="On" defaultChecked />
            <Toggle size={size} label="Disabled off" disabled />
            <Toggle size={size} label="Disabled on" disabled defaultChecked />
          </div>
        </div>
      ))}

      {/* Label positions */}
      <div className="flex flex-col gap-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-[var(--ds-text-muted)]">
          Label position
        </p>
        <div className="flex flex-col gap-3 max-w-xs">
          <Toggle label="Label on right (default)" defaultChecked />
          <Toggle label="Label on left" labelPosition="left" defaultChecked />
        </div>
      </div>

      {/* Settings list pattern */}
      <div className="flex flex-col gap-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-[var(--ds-text-muted)]">
          Settings list pattern
        </p>
        <div className="flex flex-col divide-y divide-[var(--ds-border-base)] border border-[var(--ds-border-base)] rounded-lg overflow-hidden max-w-sm">
          {[
            { label: 'Email alerts',         on: true  },
            { label: 'Slack notifications',  on: true  },
            { label: 'Weekly digest',        on: false },
            { label: 'Audit log export',     on: false, disabled: true },
          ].map(({ label, on, disabled }) => (
            <div key={label} className="flex items-center justify-between px-4 py-3 bg-[var(--ds-bg-surface)]">
              <span className="text-sm text-[var(--ds-text-primary)]">{label}</span>
              <Toggle defaultChecked={on} disabled={disabled} />
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
};
