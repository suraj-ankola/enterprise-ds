import type { Meta, StoryObj } from '@storybook/react';
import { InfoIcon } from '@phosphor-icons/react';
import { Button } from './Button';
import { Badge } from './Badge';
import { Tooltip } from './Tooltip';

const meta: Meta<typeof Tooltip> = {
  title: 'UI/Tooltip',
  component: Tooltip,
  parameters: {
    docs: {
      description: {
        component: 'Injects `aria-describedby` onto any trigger via `React.cloneElement` — trigger does not need to know about the tooltip. 4 sides. Hover shows after `delay` ms (default 500ms); focus shows immediately. Pure CSS arrow triangle.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Playground: Story = {
  args: {
    content: 'This is a tooltip',
    side:    'top',
    delay:   500,
  },
  render: args => (
    <div className="flex items-center justify-center h-32">
      <Tooltip {...args}>
        <Button variant="secondary">Hover me</Button>
      </Tooltip>
    </div>
  ),
};

export const AllSides: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-16 place-items-center p-16">
      {(['top', 'bottom', 'left', 'right'] as const).map(side => (
        <Tooltip key={side} content={`Tooltip on ${side}`} side={side} delay={0}>
          <Button variant="secondary" size="sm">{side}</Button>
        </Tooltip>
      ))}
    </div>
  ),
};

export const CommonPatterns: Story = {
  render: () => (
    <div className="flex flex-wrap gap-6 items-center p-8">
      {/* Info icon */}
      <Tooltip content="Risk score is calculated from framework compliance, audit recency, and incident history." delay={0}>
        <button type="button" className="text-[var(--ds-text-muted)] hover:text-[var(--ds-text-primary)] transition-colors focus-visible:outline-none">
          <InfoIcon size={16} />
        </button>
      </Tooltip>

      {/* Disabled button */}
      <Tooltip content="You don't have permission to delete vendors." delay={0}>
        <span className="inline-flex">
          <Button variant="danger" size="sm" disabled>Delete</Button>
        </span>
      </Tooltip>

      {/* Badge with extra context */}
      <Tooltip content="Last checked 2 hours ago" delay={0}>
        <Badge variant="success" dot>Compliant</Badge>
      </Tooltip>

      {/* Truncated text */}
      <Tooltip content="Acme Corporation — External vendor since 2022" delay={0}>
        <span className="text-sm text-[var(--ds-text-primary)] underline decoration-dotted cursor-default truncate max-w-[120px] block">
          Acme Corporation — External
        </span>
      </Tooltip>
    </div>
  ),
};
