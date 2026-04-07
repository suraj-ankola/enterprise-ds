import type { Meta, StoryObj } from '@storybook/react';
import { CodeBlock } from './CodeBlock';

const meta: Meta<typeof CodeBlock> = {
  title: 'Content/CodeBlock',
  component: CodeBlock,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Syntax-highlighted code display using highlight.js. DS-themed token colours follow dark mode and brand theme automatically. Supports line numbers, line highlighting, copy button, filename header, and scroll-capped max height. 10 languages: JavaScript, TypeScript, Python, Bash, JSON, XML/HTML, YAML, SQL, CSS, Go.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof CodeBlock>;

// ─── Sample code fixtures ─────────────────────────────────────────────────────

const TS_EXAMPLE = `import type { VendorRisk } from '@/types';

export async function getVendorRiskScore(
  vendorId: string,
): Promise<VendorRisk> {
  const response = await fetch(\`/api/vendors/\${vendorId}/risk\`);

  if (!response.ok) {
    throw new Error(\`Failed to fetch risk score: \${response.statusText}\`);
  }

  const data = await response.json();

  return {
    score:      data.score,
    level:      data.level as VendorRisk['level'],
    frameworks: data.frameworks,
    updatedAt:  new Date(data.updatedAt),
  };
}`.trim();

const PYTHON_EXAMPLE = `from typing import Optional
from datetime import datetime

class ComplianceChecker:
    """Evaluates control compliance against a given framework."""

    def __init__(self, framework: str, threshold: float = 0.8):
        self.framework = framework
        self.threshold = threshold

    def evaluate(
        self,
        controls: list[dict],
        as_of: Optional[datetime] = None,
    ) -> dict:
        passed  = [c for c in controls if c["status"] == "implemented"]
        score   = len(passed) / len(controls) if controls else 0

        return {
            "framework":  self.framework,
            "score":      round(score, 4),
            "passed":     len(passed),
            "total":      len(controls),
            "compliant":  score >= self.threshold,
        }`.trim();

const JSON_EXAMPLE = `{
  "vendor": {
    "id": "VND-00234",
    "name": "Acme Corp",
    "location": "Mumbai, India",
    "riskLevel": "critical",
    "riskScore": 78,
    "frameworks": ["ISO 27001", "SOC 2 Type II", "GDPR"],
    "lastAudit": "2025-11-14",
    "contacts": [
      {
        "name": "Rohan Desai",
        "role": "Security Lead",
        "email": "rohan@acme.example"
      }
    ],
    "gaps": [
      { "control": "A.9.2.3", "severity": "high",   "status": "open"     },
      { "control": "A.12.4.1","severity": "medium",  "status": "open"     },
      { "control": "A.18.1.3","severity": "low",     "status": "resolved" }
    ]
  }
}`.trim();

const BASH_EXAMPLE = `#!/usr/bin/env bash
# Deploy compliance-api to production

set -euo pipefail

IMAGE="registry.acme.internal/compliance-api"
TAG="\${1:-latest}"

echo "Building \${IMAGE}:\${TAG}..."
docker build -t "\${IMAGE}:\${TAG}" .

echo "Pushing to registry..."
docker push "\${IMAGE}:\${TAG}"

echo "Updating Kubernetes deployment..."
kubectl set image deployment/compliance-api \\
  compliance-api="\${IMAGE}:\${TAG}" \\
  --namespace=production

kubectl rollout status deployment/compliance-api \\
  --namespace=production

echo "Deploy complete."`.trim();

const SQL_EXAMPLE = `-- Top 10 vendors by composite risk score
SELECT
  v.id,
  v.name,
  v.location,
  v.risk_level,
  v.risk_score,
  COUNT(g.id)                                     AS open_gaps,
  MAX(a.completed_at)                             AS last_audit_date,
  DATEDIFF(NOW(), MAX(a.completed_at))            AS days_since_audit
FROM vendors v
  LEFT JOIN audit_gaps g
    ON g.vendor_id = v.id AND g.status = 'open'
  LEFT JOIN audits a
    ON a.vendor_id = v.id AND a.status = 'completed'
WHERE
  v.is_active = TRUE
  AND v.risk_level IN ('critical', 'high')
GROUP BY
  v.id, v.name, v.location, v.risk_level, v.risk_score
ORDER BY
  v.risk_score DESC,
  open_gaps DESC
LIMIT 10;`.trim();

const YAML_EXAMPLE = `# compliance-api Kubernetes deployment
apiVersion: apps/v1
kind: Deployment
metadata:
  name: compliance-api
  namespace: production
  labels:
    app: compliance-api
    team: platform
spec:
  replicas: 3
  selector:
    matchLabels:
      app: compliance-api
  template:
    spec:
      containers:
        - name: compliance-api
          image: registry.acme.internal/compliance-api:v2.9.0
          ports:
            - containerPort: 8080
          env:
            - name: DATABASE_URL
              valueFrom:
                secretKeyRef:
                  name: compliance-api-secrets
                  key: DATABASE_URL
          resources:
            requests:
              cpu: "250m"
              memory: "256Mi"
            limits:
              cpu: "500m"
              memory: "512Mi"`.trim();

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {
  render: () => (
    <div className="p-8 bg-[var(--ds-bg-base)] max-w-3xl">
      <CodeBlock
        code={TS_EXAMPLE}
        language="typescript"
        filename="getVendorRiskScore.ts"
        lineNumbers
        highlightLines={[9, 10, 11]}
      />
    </div>
  ),
};

// ─── All languages ────────────────────────────────────────────────────────────

export const AllLanguages: Story = {
  render: () => (
    <div className="p-8 bg-[var(--ds-bg-base)] space-y-6 max-w-3xl">

      <div>
        <p className="text-xs text-[var(--ds-text-muted)] mb-2">TypeScript</p>
        <CodeBlock code={TS_EXAMPLE} language="typescript" filename="vendorRisk.ts" />
      </div>

      <div>
        <p className="text-xs text-[var(--ds-text-muted)] mb-2">Python</p>
        <CodeBlock code={PYTHON_EXAMPLE} language="python" filename="compliance_checker.py" />
      </div>

      <div>
        <p className="text-xs text-[var(--ds-text-muted)] mb-2">JSON</p>
        <CodeBlock code={JSON_EXAMPLE} language="json" filename="vendor.json" />
      </div>

      <div>
        <p className="text-xs text-[var(--ds-text-muted)] mb-2">Bash</p>
        <CodeBlock code={BASH_EXAMPLE} language="bash" filename="deploy.sh" />
      </div>

      <div>
        <p className="text-xs text-[var(--ds-text-muted)] mb-2">SQL</p>
        <CodeBlock code={SQL_EXAMPLE} language="sql" />
      </div>

      <div>
        <p className="text-xs text-[var(--ds-text-muted)] mb-2">YAML</p>
        <CodeBlock code={YAML_EXAMPLE} language="yaml" filename="k8s-deployment.yaml" />
      </div>

    </div>
  ),
};

// ─── Line numbers + highlight ─────────────────────────────────────────────────

export const LineNumbersAndHighlight: Story = {
  name: 'Line numbers & highlighted lines',
  render: () => (
    <div className="p-8 bg-[var(--ds-bg-base)] max-w-3xl space-y-6">

      <div>
        <p className="text-xs text-[var(--ds-text-muted)] mb-2">Line numbers only</p>
        <CodeBlock code={TS_EXAMPLE} language="typescript" lineNumbers />
      </div>

      <div>
        <p className="text-xs text-[var(--ds-text-muted)] mb-2">Line numbers + highlighted lines 9–11</p>
        <CodeBlock
          code={TS_EXAMPLE}
          language="typescript"
          filename="vendorRisk.ts"
          lineNumbers
          highlightLines={[9, 10, 11]}
        />
      </div>

    </div>
  ),
};

// ─── Max height scroll ────────────────────────────────────────────────────────

export const MaxHeight: Story = {
  name: 'Scroll-capped max height',
  render: () => (
    <div className="p-8 bg-[var(--ds-bg-base)] max-w-3xl">
      <p className="text-xs text-[var(--ds-text-muted)] mb-2">maxHeight={200} — scrollable</p>
      <CodeBlock
        code={SQL_EXAMPLE}
        language="sql"
        filename="vendor-risk-query.sql"
        lineNumbers
        maxHeight={200}
      />
    </div>
  ),
};

// ─── Bare (no card) ───────────────────────────────────────────────────────────

export const BareMode: Story = {
  name: 'Bare — no card frame',
  render: () => (
    <div className="p-8 bg-[var(--ds-bg-surface)] border border-[var(--ds-border-base)] rounded-xl max-w-3xl">
      <p className="text-sm font-semibold text-[var(--ds-text-primary)] mb-3">
        Example: getVendorRiskScore()
      </p>
      <CodeBlock code={TS_EXAMPLE} language="typescript" bare />
    </div>
  ),
};

// ─── No copy button ───────────────────────────────────────────────────────────

export const NoCopy: Story = {
  render: () => (
    <div className="p-8 bg-[var(--ds-bg-base)] max-w-3xl">
      <CodeBlock
        code={JSON_EXAMPLE}
        language="json"
        filename="vendor.json"
        showCopy={false}
      />
    </div>
  ),
};
