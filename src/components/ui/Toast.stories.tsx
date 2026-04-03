import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';
import { Toast, ToastProvider, useToast } from './Toast';

const meta: Meta = {
  title: 'UI/Toast',
  component: Toast,
  parameters: {
    docs: {
      description: {
        component: 'Wrap your app in `<ToastProvider>` then call `useToast()` to fire notifications. 5 variants. `duration: 0` = persistent. Auto-dismiss timer is per-toast — dismissing one never cancels others. `Toast` export is a standalone visual for static Storybook previews.',
      },
    },
  },
  decorators: [
    Story => (
      <ToastProvider>
        <Story />
      </ToastProvider>
    ),
  ],
};
export default meta;

// ─── Visual preview (no provider needed) ─────────────────────────────────────

export const AllVariants: StoryObj = {
  render: () => (
    <div className="flex flex-col gap-2 w-80">
      <Toast title="Default notification" description="Something happened in the system." />
      <Toast variant="success" title="Vendor onboarded" description="Acme Corp has been added to monitoring." />
      <Toast variant="warning" title="Audit overdue" description="Beta Systems audit is 14 days past due." />
      <Toast variant="danger"  title="Integration failed" description="Slack webhook returned 401 Unauthorized." />
      <Toast variant="info"    title="New framework available" description="ISO 27001:2022 mapping is now available." />
      <Toast
        variant="success"
        title="Report exported"
        description="Your CSV is ready."
        action={{ label: 'Download', onClick: () => {} }}
      />
    </div>
  ),
};

// ─── Live demo (with provider + hook) ────────────────────────────────────────

function ToastDemo() {
  const { toast } = useToast();
  return (
    <div className="flex flex-wrap gap-2">
      <Button variant="secondary" size="sm" onClick={() => toast({ title: 'Settings saved' })}>
        Default
      </Button>
      <Button variant="secondary" size="sm" onClick={() =>
        toast({ title: 'Vendor onboarded', description: 'Acme Corp added.', variant: 'success' })
      }>
        Success
      </Button>
      <Button variant="secondary" size="sm" onClick={() =>
        toast({ title: 'Audit overdue', description: '3 vendors need attention.', variant: 'warning' })
      }>
        Warning
      </Button>
      <Button variant="secondary" size="sm" onClick={() =>
        toast({ title: 'Sync failed', description: 'API returned 503.', variant: 'danger' })
      }>
        Danger
      </Button>
      <Button variant="secondary" size="sm" onClick={() =>
        toast({ title: 'New framework', variant: 'info', duration: 6000 })
      }>
        Info (6s)
      </Button>
      <Button variant="secondary" size="sm" onClick={() =>
        toast({
          title: 'Report ready',
          variant: 'success',
          action: { label: 'Download', onClick: () => alert('downloading') },
        })
      }>
        With action
      </Button>
      <Button variant="secondary" size="sm" onClick={() =>
        toast({ title: 'Persistent toast', description: 'Will not auto-dismiss.', duration: 0 })
      }>
        Persistent
      </Button>
    </div>
  );
}

export const LiveDemo: StoryObj = {
  render: () => <ToastDemo />,
};
