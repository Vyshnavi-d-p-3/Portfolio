export interface Project {
  slug: string;
  number: string;
  name: string;
  pitch: string;
  description: string;
  tech: string[];
  primaryTech: string[];
  /** Freeform short label (e.g. 'public · MIT', 'arXiv preprint · MIT'). Use {@link statusBadgeClass} to style. */
  status: string;
  category: string;
  problem: string;
  architecture: string;
  decisions: { decision: string; choice: string; why: string }[];
  results: { label: string; value: string; note: string }[];
  github?: string;
  demo?: string;
  paper?: string;
}

/** Map a freeform status label to the existing CSS badge class. */
export function statusBadgeClass(status: string): string {
  return /arxiv/i.test(status) ? 'status-arxiv' : 'status-in-progress';
}

export const projects: Project[] = [
  {
    slug: 'sentinel',
    number: '01',
    name: 'Sentinel',
    pitch: 'AI code review with hybrid retrieval and a deterministic eval harness.',
    description:
      'GitHub App that reviews PRs via BM25 + dense (pgvector) retrieval, cost guardrails, and a 98-fixture eval harness — per-category P/R/F1, regression-gated in CI.',
    tech: ['Python', 'FastAPI', 'Next.js', 'PostgreSQL', 'pgvector', 'BM25', 'Docker'],
    primaryTech: ['FastAPI', 'pgvector', 'BM25'],
    status: 'public · MIT',
    category: 'applied ai',
    problem:
      'The market is full of "AI code review" wrappers around a prompt. The hard part is not generating text — it is knowing whether the system catches real issues without fooling yourself. Sentinel separates the production pipeline, a deterministic scorer, and a curated eval set so quality is measurable, not vibed.',
    architecture:
      'GitHub webhook (HMAC verified, X-GitHub-Delivery idempotent) → FastAPI service → hybrid retrieval over PR history: BM25 for exact identifiers + pgvector dense embeddings, fused via RRF → structured Pydantic v2 review with cost guardrails (daily budget + per-PR cap + circuit breaker) → deterministic scorer over 98 fixtures yielding per-category P/R/F1 → CI gate that fails the build if any category regresses >5%.',
    decisions: [
      { decision: 'Retrieval', choice: 'Hybrid BM25 + dense (pgvector) with RRF', why: 'BM25 catches exact identifiers and rare tokens; dense catches semantic similarity. Fusion outperforms either alone on real PRs.' },
      { decision: 'Evaluation', choice: 'Hand-readable fixtures + deterministic scorer (not LLM-as-judge)', why: 'LLM-as-judge has circular validity. 98 realistic fixtures with explicit labels give a stable, reproducible score per category.' },
      { decision: 'Cost control', choice: 'Daily budgets + per-PR caps + circuit breaker', why: 'Production AI needs financial guardrails — one misconfigured repo should not drain the budget.' },
      { decision: 'Structured output', choice: 'Pydantic v2 with JSON mode', why: 'Type-safe review comments enable automated scoring and consistent GitHub annotations.' },
    ],
    results: [
      { label: 'Eval fixtures', value: '98', note: 'Hand-curated PR ground truth' },
      { label: 'Categories scored', value: '4', note: 'Security · bug · perf · style' },
      { label: 'CI gate', value: '−5% F1', note: 'Any category regression fails build' },
    ],
    github: 'https://github.com/Vyshnavi-d-p-3/Sentinel',
  },
  {
    slug: 'kairos',
    number: '02',
    name: 'Kairos',
    pitch: 'Multi-tenant OKR platform with database-enforced isolation.',
    description:
      'Spring Boot + Next.js SaaS with Postgres RLS, idempotent APIs (Stripe-style key), Redis sliding-window rate limits, and SSE progress dashboards.',
    tech: ['Java 21', 'Spring Boot', 'Next.js', 'Postgres RLS', 'Redis', 'SSE', 'Docker'],
    primaryTech: ['Spring Boot', 'Postgres RLS', 'Redis'],
    status: 'public · MIT',
    category: 'multi-tenant saas',
    problem:
      "Most OKR tools enforce multi-tenancy in the application layer — one missed WHERE clause and tenant A sees tenant B's strategy. Kairos pushes isolation into the database, so a bug in the API still cannot leak data across workspaces.",
    architecture:
      'Next.js 14 frontend → Spring Boot REST API → PostgreSQL with Row Level Security policies per tenant (`SET LOCAL app.current_workspace` set on every JDBC connection via a HikariCP customizer) → Redis-backed Idempotency-Key cache and ZSET sliding-window rate limits → SSE via SseEmitter fanned out across instances by Redis pub/sub → insert-only, monthly-partitioned audit log with before/after JSONB.',
    decisions: [
      { decision: 'Tenant isolation', choice: 'Postgres RLS over application-layer filtering', why: 'A missed WHERE clause cannot leak data when the database enforces isolation. Convention is a bug waiting to happen.' },
      { decision: 'Idempotency', choice: 'Redis-backed Idempotency-Key header (Stripe pattern)', why: 'Frontend retries and webhook re-delivery should never double-write. 24h TTL, cached response returned on replay.' },
      { decision: 'Rate limiting', choice: 'Redis ZSET sliding window', why: 'Per-workspace throttling without fixed-window cliffs. O(log N) accuracy via ZADD/ZRANGEBYSCORE.' },
      { decision: 'Real-time', choice: 'SSE over WebSockets', why: 'Progress updates are unidirectional; SSE is simpler, load-balancer friendly, and HTTP/2 multiplexes it for free.' },
    ],
    results: [
      { label: 'Tenant leak surface', value: '0', note: 'Enforced by RLS, not app code' },
      { label: 'Idempotency window', value: '24h', note: 'Stripe-style key cache' },
      { label: 'Audit log', value: 'Partitioned', note: 'Monthly, immutable, JSONB diff' },
    ],
    github: 'https://github.com/Vyshnavi-d-p-3/Kairos',
  },
  {
    slug: 'helios',
    number: '03',
    name: 'Helios',
    pitch: 'Time-series database in Go — built from first principles.',
    description:
      'WAL + LSM storage, Gorilla compression, label-postings filtering, a PromQL subset, streaming EWMA anomaly detection, and optional 3-node Raft replication.',
    tech: ['Go', 'WAL', 'LSM-tree', 'Gorilla', 'PromQL', 'Raft (optional)'],
    primaryTech: ['Go', 'LSM-tree', 'Gorilla'],
    status: 'public · single-node stable',
    category: 'distributed systems',
    problem:
      'Time-series databases get treated as black boxes. The only way to really understand durable ingestion, compressed persistence, filterable queries, and consensus replication is to build one — and pin every claim to repeatable benchmarks.',
    architecture:
      'Framed-WAL writes with CRC32C → in-memory memtable with cardinality controls → SSTable v2 with Gorilla-compressed points + label postings → query path via exact label filters, matchers, and a practical PromQL subset → age-based retention and manual prune endpoint → streaming EWMA anomaly detector exposed over SSE → optional Hashicorp Raft for 3-node clustering with leader-forwarded writes and SST-backed FSM snapshots → /metrics, /livez, health and readiness probes.',
    decisions: [
      { decision: 'Storage engine', choice: 'LSM-tree over B-tree', why: 'Time-series workloads are write-heavy; LSM converts random writes to sequential and matches the access pattern.' },
      { decision: 'Compression', choice: 'Gorilla encoding (delta-of-delta + XOR)', why: "Facebook's Gorilla paper is the canonical fit for monotonic timestamps and slowly-varying floats." },
      { decision: 'Consensus', choice: 'Hashicorp Raft, optional clustering', why: 'Single-node by default keeps the system honest about its baseline; Raft is opt-in via `-peers`/`-bootstrap` when you need replication.' },
      { decision: 'Query', choice: 'PromQL subset, not full Prometheus', why: 'Implement only what is reproducible from the spec; document what is supported instead of pretending to ship the entire surface.' },
    ],
    results: [
      { label: 'Storage', value: 'WAL + LSM', note: 'CRC32C-framed records, SSTable v2' },
      { label: 'Compression', value: 'Gorilla', note: 'Delta-of-delta + XOR encoding' },
      { label: 'Clustering', value: 'Optional Raft', note: '3-node, SST-backed FSM snapshots' },
    ],
    github: 'https://github.com/Vyshnavi-d-p-3/Helios',
  },
  {
    slug: 'neurolens',
    number: '04',
    name: 'NeuroLens',
    pitch: 'Adversarial ML toolkit with a cross-modal CLIP → ResNet transfer study.',
    description:
      'From-scratch PyTorch models (no torchvision pretrained), FGSM/PGD attacks implemented from original papers, defenses, and a multimodal-to-unimodal attack-transfer experiment.',
    tech: ['Python', 'PyTorch', 'FGSM', 'PGD', 'CLIP-lite', 'ResNet-18'],
    primaryTech: ['PyTorch', 'CLIP-lite'],
    status: 'arXiv preprint · MIT',
    category: 'ml research',
    problem:
      'Adversarial robustness research has focused on unimodal classifiers, but CLIP-style vision-language models create a new attack surface. If perturbations crafted against a multimodal model transfer to a downstream unimodal classifier, deploying CLIP in a pipeline could silently compromise everything downstream.',
    architecture:
      'Models built from scratch in PyTorch (ResNet-18 on CIFAR-10, Transformer on AG News, CLIP-lite on Flickr8k — no torchvision pretrained imports) → optimize perturbation δ against CLIP-lite contrastive loss → apply δ to standalone ResNet-18 → measure transfer rate vs. direct PGD attack as the upper bound → defenses with certified guarantees as baselines → W&B for experiment tracking → writeup as arXiv preprint.',
    decisions: [
      { decision: 'Implementation', choice: 'Every model and attack from scratch', why: 'Reading a paper is not understanding it. Implementing forces every assumption and hyperparameter into the open.' },
      { decision: 'Attack target', choice: 'CLIP-lite joint embedding space', why: "CLIP's joint embedding is the bridge between modalities; attacking the bridge corrupts both sides simultaneously." },
      { decision: 'Hypothesis', choice: 'Multimodal → unimodal transfer', why: 'Both models share similar low-level features; if perturbations transfer, pipeline security has to account for it.' },
    ],
    results: [
      { label: 'ResNet-18 clean acc.', value: '≥93%', note: 'CIFAR-10 target' },
      { label: 'CLIP-lite R@1', value: '≥60%', note: 'Flickr8k retrieval target' },
      { label: 'Status', value: 'arXiv preprint', note: 'Under review' },
    ],
    github: 'https://github.com/Vyshnavi-d-p-3/Neurolens',
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find(p => p.slug === slug);
}
