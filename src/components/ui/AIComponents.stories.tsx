import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import {
  AIConfidencePanel,
  AIModelSelector,
  AIFeedback,
  AIPromptBuilder,
  type AIModel,
} from './AIComponents';

// ─── AIConfidencePanel ────────────────────────────────────────────────────────

const confidenceMeta: Meta<typeof AIConfidencePanel> = {
  title: 'AI/AIConfidencePanel',
  component: AIConfidencePanel,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Displays an AI confidence score (0–100) with a colour-coded band (high ≥ 75%, medium ≥ 45%, low < 45%). Optionally shows a rationale string and per-signal breakdown bars. Use it alongside AI-generated risk scores, recommendations, or classification results.',
      },
    },
    layout: 'padded',
  },
  argTypes: {
    score: {
      description: 'Confidence score 0–100',
      control: { type: 'range', min: 0, max: 100 },
    },
    label: {
      description: 'Override label (defaults to High/Medium/Low confidence)',
      control: { type: 'text' },
    },
    rationale: {
      description: 'Short explanation of the score',
      control: { type: 'text' },
    },
    signals: { control: false },
  },
  args: {
    score:     82,
    rationale: 'Based on 12 months of audit history and SOC 2 certification.',
  },
};
export default confidenceMeta;
type ConfidenceStory = StoryObj<typeof AIConfidencePanel>;

export const Playground: ConfidenceStory = {
  render: (args) => (
    <div className="max-w-xs">
      <AIConfidencePanel {...args} />
    </div>
  ),
};

export const AllLevels: ConfidenceStory = {
  name: 'All confidence levels',
  render: () => (
    <div className="space-y-3 max-w-xs">
      <AIConfidencePanel score={88} rationale="Strong compliance record with no critical findings." />
      <AIConfidencePanel score={61} rationale="Partial documentation; some controls unverified." />
      <AIConfidencePanel score={28} rationale="Limited data — only one audit on record." />
    </div>
  ),
};

export const WithSignals: ConfidenceStory = {
  name: 'With signal breakdown',
  render: () => (
    <div className="max-w-xs">
      <AIConfidencePanel
        score={74}
        label="Risk assessment confidence"
        rationale="Computed from 4 weighted signals."
        signals={[
          { label: 'Audit coverage',  score: 90 },
          { label: 'Data freshness',  score: 72 },
          { label: 'Framework match', score: 65 },
          { label: 'History length',  score: 55 },
        ]}
      />
    </div>
  ),
};

// ─── AIModelSelector ─────────────────────────────────────────────────────────

export const ModelSelector: StoryObj = {
  name: 'AIModelSelector',
  render: () => {
    const models: AIModel[] = [
      { id: 'claude-opus-4-6',    name: 'Claude Opus 4.6',    provider: 'Anthropic', description: 'Most capable, complex tasks', tags: ['reasoning', 'long-context'], costTier: 3, latency: 'slow' },
      { id: 'claude-sonnet-4-6',  name: 'Claude Sonnet 4.6',  provider: 'Anthropic', description: 'Balanced performance and speed', tags: ['general'], costTier: 2, latency: 'medium' },
      { id: 'claude-haiku-4-5',   name: 'Claude Haiku 4.5',   provider: 'Anthropic', description: 'Fast, lightweight tasks', tags: ['classification', 'routing'], costTier: 1, latency: 'fast' },
    ];
    const [model, setModel] = useState('claude-sonnet-4-6');
    return (
      <div className="max-w-xs space-y-2">
        <AIModelSelector models={models} value={model} onChange={setModel} />
        <p className="text-xs text-[var(--ds-text-muted)]">Selected: {model}</p>
      </div>
    );
  },
};

// ─── AIFeedback ───────────────────────────────────────────────────────────────

export const FeedbackWidget: StoryObj = {
  name: 'AIFeedback',
  render: () => {
    return (
      <div className="space-y-6 max-w-xs">
        <div>
          <p className="text-xs text-[var(--ds-text-muted)] mb-2">With comment (default)</p>
          <AIFeedback onFeedback={(v, c) => alert(`${v}: ${c}`)} allowComment />
        </div>
        <div>
          <p className="text-xs text-[var(--ds-text-muted)] mb-2">Without comment</p>
          <AIFeedback onFeedback={(v) => alert(v ?? 'cleared')} allowComment={false} />
        </div>
      </div>
    );
  },
};

// ─── AIPromptBuilder ──────────────────────────────────────────────────────────

export const PromptBuilder: StoryObj = {
  name: 'AIPromptBuilder',
  render: () => {
    const [result, setResult] = useState<string | null>(null);
    return (
      <div className="max-w-lg space-y-4">
        <AIPromptBuilder
          onSubmit={async (p) => {
            await new Promise(r => setTimeout(r, 1000));
            setResult(`Received: "${p.slice(0, 80)}…"`);
          }}
        />
        {result && (
          <p className="text-xs p-3 bg-[var(--ds-bg-subtle)] rounded-lg text-[var(--ds-text-muted)]">{result}</p>
        )}
      </div>
    );
  },
};

// ─── Combined AI panel ────────────────────────────────────────────────────────

export const AIPanel: StoryObj = {
  name: 'In context — full AI panel',
  render: () => {
    const models: AIModel[] = [
      { id: 'claude-sonnet-4-6', name: 'Claude Sonnet 4.6', provider: 'Anthropic', latency: 'medium', costTier: 2 },
      { id: 'claude-haiku-4-5',  name: 'Claude Haiku 4.5',  provider: 'Anthropic', latency: 'fast',   costTier: 1 },
    ];
    const [model, setModel] = useState('claude-sonnet-4-6');
    const [answer, setAnswer] = useState<string | null>(null);

    return (
      <div className="max-w-lg bg-[var(--ds-bg-surface)] border border-[var(--ds-border-base)] rounded-xl overflow-hidden">
        {/* Header */}
        <div className="px-5 py-4 border-b border-[var(--ds-border-base)] flex items-center justify-between">
          <p className="text-sm font-semibold text-[var(--ds-text-primary)]">AI Assistant</p>
          <div className="w-56">
            <AIModelSelector models={models} value={model} onChange={setModel} />
          </div>
        </div>

        {/* Confidence banner */}
        <div className="px-5 pt-4">
          <AIConfidencePanel
            score={78}
            rationale="Score based on current vendor dataset (1,284 records)."
          />
        </div>

        {/* Prompt */}
        <div className="p-5">
          <AIPromptBuilder
            onSubmit={async (p) => {
              await new Promise(r => setTimeout(r, 1200));
              setAnswer(`This is a simulated AI response to: "${p.slice(0, 60)}…"`);
            }}
          />
        </div>

        {/* Answer + feedback */}
        {answer && (
          <div className="px-5 pb-5 space-y-3">
            <div className="p-3 bg-[var(--ds-bg-subtle)] rounded-xl text-sm text-[var(--ds-text-primary)]">{answer}</div>
            <AIFeedback onFeedback={() => {}} />
          </div>
        )}
      </div>
    );
  },
};
