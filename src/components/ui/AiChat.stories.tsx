import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { ShieldCheckIcon, RobotIcon, ChartBarIcon } from '@phosphor-icons/react';
import { ChatWindow } from './AiChat';
import type { ChatMessage } from './AiChat';

const meta: Meta = {
  title: 'AI/AiChat',
  component: ChatWindow,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: '`ChatWindow` renders user, assistant, and system messages. Assistant messages support `sources` (citation chips) and `actions` (follow-up buttons). `isStreaming` on a message shows a pulsing cursor. `suggestions` renders prompt chips in the empty state. Input auto-grows up to 180px.',
      },
    },
  },
};
export default meta;

// ─── helpers ──────────────────────────────────────────────────────────────────

function msg(role: ChatMessage['role'], content: string, extras?: Partial<ChatMessage>): ChatMessage {
  return { id: Math.random().toString(36).slice(2), role, content, timestamp: new Date(), ...extras };
}

// ─── Playground — live interactive demo ───────────────────────────────────────

export const Playground: StoryObj = {
  render: () => {
    const [messages, setMessages] = useState<ChatMessage[]>([
      msg('assistant', 'Hello! I\'m your AI Copilot. How can I help you today?', {
        actions: [
          { label: 'Show risk summary', onClick: () => {} },
          { label: 'List overdue audits', onClick: () => {} },
        ],
      }),
    ]);
    const [loading, setLoading] = useState(false);

    function handleSend(text: string) {
      setMessages(prev => [...prev, msg('user', text)]);
      setLoading(true);
      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          msg('assistant', `You asked: "${text}"\n\nThis is a simulated response. In production this would stream from your AI backend.`, {
            sources: [{ label: 'Vendor Policy v2.3' }, { label: 'SOC 2 Framework' }],
          }),
        ]);
        setLoading(false);
      }, 1500);
    }

    return (
      <div className="h-[560px] border border-[var(--ds-border-base)] rounded-xl overflow-hidden">
        <ChatWindow
          messages={messages}
          onSend={handleSend}
          isLoading={loading}
          onStop={() => setLoading(false)}
          suggestions={[
            'Show top 5 high-risk vendors',
            'Which audits are overdue?',
            'Summarise last month\'s incidents',
          ]}
          userName="SN"
        />
      </div>
    );
  },
};

// ─── Three product demos ───────────────────────────────────────────────────────

export const ThreeProducts: StoryObj = {
  name: 'Three Products',
  render: () => (
    <div className="grid grid-cols-3 gap-4 h-[580px]">

      {/* ── Compliance Risk Platform ───────────────────── */}
      <div className="border border-[var(--ds-border-base)] rounded-xl overflow-hidden flex flex-col" data-theme="compliance">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--ds-border-base)] bg-[var(--ds-bg-surface)] shrink-0">
          <div className="h-6 w-6 rounded-md bg-[var(--ds-brand-600)] flex items-center justify-center">
            <ShieldCheckIcon size={13} weight="fill" className="text-white" />
          </div>
          <span className="text-sm font-semibold text-[var(--ds-text-primary)]">Compliance Copilot</span>
        </div>
        <ChatWindow
          className="flex-1"
          userName="SN"
          messages={[
            msg('assistant', 'I monitor your vendor compliance across SOC 2, ISO 27001, and GDPR. What would you like to review?', {
              actions: [
                { label: 'High-risk vendors', onClick: () => {} },
                { label: 'Overdue audits', onClick: () => {} },
              ],
            }),
            msg('user', 'Which vendors are at critical risk?'),
            msg('assistant', 'I found **3 vendors** at critical risk:\n\n1. Acme Corp — SOC 2 expired 45 days ago\n2. DataFlow Inc — Missing GDPR DPA\n3. CloudBase — Pentest overdue by 90 days\n\nWould you like me to draft remediation requests?', {
              sources: [{ label: 'Risk Engine v4' }, { label: 'Vendor Registry' }],
              actions: [
                { label: 'Draft remediations', onClick: () => {} },
                { label: 'Export to CSV', onClick: () => {} },
              ],
            }),
          ]}
          onSend={() => {}}
          suggestions={['Overdue audits', 'GDPR gaps', 'Generate report']}
        />
      </div>

      {/* ── IT Ops AI Copilot ─────────────────────────── */}
      <div className="border border-[var(--ds-border-base)] rounded-xl overflow-hidden flex flex-col" data-theme="itops">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--ds-border-base)] bg-[var(--ds-bg-surface)] shrink-0">
          <div className="h-6 w-6 rounded-md bg-[var(--ds-brand-600)] flex items-center justify-center">
            <RobotIcon size={13} weight="fill" className="text-white" />
          </div>
          <span className="text-sm font-semibold text-[var(--ds-text-primary)]">IT Ops Copilot</span>
        </div>
        <ChatWindow
          className="flex-1"
          userName="SN"
          messages={[
            msg('system', 'Incident INC-2847 auto-assigned · P1 · API Gateway'),
            msg('assistant', 'I detected a P1 incident on the API Gateway. Here\'s what I found:\n\n• Error rate spiked to 34% at 14:23 UTC\n• Root cause: downstream auth service returning 503\n• 847 requests affected in the last 5 minutes\n\nI\'ve already identified a fix. Shall I apply it?', {
              sources: [{ label: 'INC-2847' }, { label: 'Runbook: API-503' }],
              actions: [
                { label: 'Apply auto-fix', onClick: () => {} },
                { label: 'Show full trace', onClick: () => {} },
              ],
            }),
            msg('user', 'What\'s the auto-fix?'),
            msg('assistant', 'The fix is to scale the auth service and clear the connection pool:\n\n```bash\nkubectl scale deploy auth-svc --replicas=6\nkubectl rollout restart deploy/auth-svc\n```\n\nEstimated recovery time: ~90 seconds. This approach resolved the same pattern in INC-2791 last month.', {
              sources: [{ label: 'INC-2791 (resolved)' }],
            }),
          ]}
          onSend={() => {}}
          suggestions={['Active incidents', 'CPU alerts', 'Check deploys']}
        />
      </div>

      {/* ── Self-Serve Analytics ──────────────────────── */}
      <div className="border border-[var(--ds-border-base)] rounded-xl overflow-hidden flex flex-col" data-theme="analytics">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--ds-border-base)] bg-[var(--ds-bg-surface)] shrink-0">
          <div className="h-6 w-6 rounded-md bg-[var(--ds-brand-600)] flex items-center justify-center">
            <ChartBarIcon size={13} weight="fill" className="text-white" />
          </div>
          <span className="text-sm font-semibold text-[var(--ds-text-primary)]">Analytics Copilot</span>
        </div>
        <ChatWindow
          className="flex-1"
          userName="SN"
          messages={[
            msg('assistant', 'Ask me anything about your data — in plain English. I\'ll write the query and show the results.', {
              actions: [
                { label: 'Revenue last 30 days', onClick: () => {} },
                { label: 'Top products by region', onClick: () => {} },
              ],
            }),
            msg('user', 'What were our top 3 revenue products last quarter?'),
            msg('assistant', 'Here are your top 3 products by revenue in Q1 2026:\n\n1. Enterprise Suite — $2.4M (↑18% vs Q4)\n2. Pro Plan — $1.1M (↑6% vs Q4)\n3. Add-ons Bundle — $340K (↓3% vs Q4)\n\nTotal Q1 revenue: $3.84M · YoY growth: +22%', {
              sources: [{ label: 'sales_orders (live)' }, { label: 'product_catalogue' }],
              actions: [
                { label: 'Drill into Enterprise Suite', onClick: () => {} },
                { label: 'Export to spreadsheet', onClick: () => {} },
              ],
            }),
          ]}
          onSend={() => {}}
          suggestions={['Monthly revenue trend', 'Churn rate', 'Active users by plan']}
        />
      </div>

    </div>
  ),
};
