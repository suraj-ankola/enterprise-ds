import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Button } from './Button';
import { Input } from './Input';
import { Badge } from './Badge';
import { Drawer } from './Drawer';

const meta: Meta<typeof Drawer> = {
  title: 'UI/Drawer',
  component: Drawer,
  parameters: {
    docs: {
      description: {
        component: 'Slide-in side panel (right · left · bottom). Portal-based with body scroll lock, ESC-to-close, and backdrop dismiss. Animated open/close via CSS `transition-transform`. `footer` slot for action buttons.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Drawer>;

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Drawer</Button>
        <Drawer
          open={open}
          onClose={() => setOpen(false)}
          title="Vendor Details"
          description="Acme Corp · VND-00234"
          footer={
            <>
              <Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button>
              <Button onClick={() => setOpen(false)}>Save changes</Button>
            </>
          }
        >
          <div className="flex flex-col gap-4">
            <Input label="Vendor name" defaultValue="Acme Corp" fullWidth />
            <Input label="Contact email" defaultValue="security@acme.com" fullWidth />
            <Input label="Website" defaultValue="https://acme.com" fullWidth />
          </div>
        </Drawer>
      </>
    );
  },
};

// ─── All Variants ─────────────────────────────────────────────────────────────

export const AllVariants: Story = {
  render: () => {
    const [which, setWhich] = useState<string | null>(null);

    return (
      <>
        <div className="flex flex-wrap gap-2">
          <Button variant="secondary" onClick={() => setWhich('right')}>Right (default)</Button>
          <Button variant="secondary" onClick={() => setWhich('left')}>Left</Button>
          <Button variant="secondary" onClick={() => setWhich('bottom')}>Bottom sheet</Button>
          <Button variant="secondary" onClick={() => setWhich('lg')}>Large (lg)</Button>
          <Button variant="secondary" onClick={() => setWhich('incident')}>IT Incident detail</Button>
        </div>

        {/* Right */}
        <Drawer open={which === 'right'} onClose={() => setWhich(null)} title="Right drawer" side="right" size="md">
          <p className="text-[var(--ds-text-secondary)]">Content slides in from the right — the default for detail panels.</p>
        </Drawer>

        {/* Left */}
        <Drawer open={which === 'left'} onClose={() => setWhich(null)} title="Left drawer" side="left" size="md">
          <p className="text-[var(--ds-text-secondary)]">Content slides in from the left — use for navigation or filters.</p>
        </Drawer>

        {/* Bottom */}
        <Drawer open={which === 'bottom'} onClose={() => setWhich(null)} title="Bottom sheet" side="bottom" size="md">
          <p className="text-[var(--ds-text-secondary)]">Bottom sheet pattern — common on mobile or for quick actions.</p>
        </Drawer>

        {/* Large */}
        <Drawer open={which === 'lg'} onClose={() => setWhich(null)} title="Large drawer" side="right" size="lg">
          <p className="text-[var(--ds-text-secondary)]">Wider panel — good for edit forms or rich detail views.</p>
        </Drawer>

        {/* Incident detail — IT Ops pattern */}
        <Drawer
          open={which === 'incident'}
          onClose={() => setWhich(null)}
          side="right"
          size="lg"
          title="INC-2847 — API Gateway P1"
          description="Opened 14 minutes ago · Assigned to on-call"
          footer={
            <>
              <Button variant="secondary" onClick={() => setWhich(null)}>Escalate</Button>
              <Button onClick={() => setWhich(null)}>Apply auto-fix</Button>
            </>
          }
        >
          <div className="flex flex-col gap-5">
            <div className="flex gap-2 flex-wrap">
              <Badge variant="danger" appearance="solid">P1</Badge>
              <Badge variant="warning">API Gateway</Badge>
              <Badge variant="info">Auto-resolution suggested</Badge>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-xs font-semibold text-[var(--ds-text-muted)] uppercase tracking-wide">Summary</p>
              <p className="text-sm text-[var(--ds-text-secondary)]">
                Error rate spiked to 34% at 14:23 UTC. Root cause: downstream auth service returning 503. 847 requests affected.
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-xs font-semibold text-[var(--ds-text-muted)] uppercase tracking-wide">Suggested fix</p>
              <pre className="text-xs font-mono bg-[var(--ds-bg-subtle)] rounded-lg p-3 text-[var(--ds-text-primary)] overflow-x-auto">
                {`kubectl scale deploy auth-svc --replicas=6\nkubectl rollout restart deploy/auth-svc`}
              </pre>
            </div>
          </div>
        </Drawer>
      </>
    );
  },
};
