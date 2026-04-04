import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Button } from './Button';
import { Alert } from './Alert';

const meta: Meta<typeof Alert> = {
  title: 'UI/Alert',
  component: Alert,
  parameters: {
    docs: {
      description: {
        component: 'Inline feedback banner for persistent messages. 4 variants. `title` + `children` for heading + body. `onDismiss` adds a close button. `action` slot for CTAs. `icon={null}` hides the icon. Unlike Toast, Alert stays in the document flow.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Alert>;

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {
  render: () => {
    const [visible, setVisible] = useState(true);
    return (
      <div className="max-w-xl flex flex-col gap-3">
        {visible ? (
          <Alert
            variant="warning"
            title="Audit overdue"
            onDismiss={() => setVisible(false)}
            action={<Button size="sm" variant="secondary">Schedule Audit</Button>}
          >
            Beta Systems SOC 2 audit is 14 days past due. Unresolved audits affect your risk score.
          </Alert>
        ) : (
          <Button size="sm" variant="ghost" onClick={() => setVisible(true)}>Reset</Button>
        )}
      </div>
    );
  },
};

// ─── All Variants ─────────────────────────────────────────────────────────────

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-3 max-w-xl">
      <Alert variant="info" title="Framework update available">
        ISO 27001:2022 mapping has been updated. Review the changes before your next audit.
      </Alert>
      <Alert variant="success" title="Vendor onboarded">
        Acme Corp has been added to monitoring and is now active.
      </Alert>
      <Alert variant="warning" title="Audit overdue">
        Beta Systems SOC 2 audit is 14 days past due.
      </Alert>
      <Alert variant="danger" title="Integration failed">
        Slack webhook returned 401 Unauthorized. Check your API credentials.
      </Alert>

      {/* No title — body only */}
      <Alert variant="info">
        Your session will expire in 5 minutes. Save your work to avoid losing changes.
      </Alert>

      {/* With action */}
      <Alert
        variant="danger"
        title="3 vendors at critical risk"
        action={<Button size="sm" variant="danger">View vendors</Button>}
      >
        Immediate remediation required to maintain compliance.
      </Alert>

      {/* No icon */}
      <Alert variant="success" icon={null} title="Report exported">
        Your Q1 compliance report is ready to download.
      </Alert>
    </div>
  ),
};
