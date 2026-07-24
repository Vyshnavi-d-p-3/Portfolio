export interface Project {
  slug: string;
  number: string;
  name: string;
  pitch: string;
  description: string;
  tech: string[];
  primaryTech: string[];
  /** Freeform short label (e.g. 'public · MIT', 'public · single-node stable'). Use {@link statusBadgeClass} to style. */
  status: string;
  category: string;
  problem: string;
  architecture: string;
  /** Override default "Architecture" heading (e.g. request lifecycle). */
  architectureTitle?: string;
  decisions: { decision: string; choice: string; why: string }[];
  results: { label: string; value: string; note: string }[];
  github?: string;
  demo?: string;
  paper?: string;
  /** Shown on cards / case study when set (e.g. Kairos → 2026). */
  period?: string;
  /** Honest scope note (e.g. stubbed auth, single-instance SSE). Rendered after key decisions. */
  statusNote?: string;
}

/** README opening line — single source for pitch, description, and card blurbs. */
export const KAIROS_PITCH =
  'Multi-tenant OKR tracker that enforces tenant isolation in PostgreSQL with Row-Level Security, not in application code.' as const;

/** Shorter Kairos label for meta / about (uses the accurate isolation phrase, not the full pitch). */
export const KAIROS_TAGLINE_SHORT =
  'multi-tenant OKR tracker with database-enforced tenant isolation' as const;

/** Map a freeform status label to the existing CSS badge class. */
export function statusBadgeClass(_status: string): string {
  return 'status-in-progress';
}

export const projects: Project[] = [
  {
    slug: 'archon',
    number: '01',
    name: 'Archon',
    pitch:
      'Autonomous agent in Python — planner/executor/reflector with a typed middleware chain (schema validation, retries, tracing on every tool call) and a statistical evaluation harness: seeded runs, per-step traces, and a failure-mode taxonomy.',
    description:
      'Autonomous agent in Python — planner/executor/reflector with a typed middleware chain (schema validation, retries, tracing on every tool call) and a statistical evaluation harness: seeded runs, per-step traces, and a failure-mode taxonomy.',
    tech: ['Python', 'Agents', 'Eval'],
    primaryTech: ['Python', 'Agents', 'Eval'],
    status: 'public · MIT',
    category: 'agent systems',
    problem:
      'Agents fail in ways unit tests miss: a malformed tool call, an unrecovered error, behavior that drifts between runs. Archon treats the agent loop as something to measure — a planner/executor/reflector cycle with a typed middleware chain around every tool call, and a statistically rigorous eval harness so reliability shows up as confidence intervals instead of anecdotes.',
    architecture:
      'A user task enters the Planner (a swappable Protocol) → each step passes through a composable middleware chain (tracing → token-budget → rate-limit → telemetry, onion model) → the Executor runs schema-validated tool calls → a two-phase Reflector (heuristic + LLM) routes the result: CONTINUE, RETRY with a correction hint, REPLAN, SKIP, or ABORT → the eval harness replays seeded runs across multiple LLM backends and scores tool-call accuracy, schema adherence, error recovery, step efficiency, and final-answer quality.',
    decisions: [
      { decision: 'Abstractions', choice: 'Protocol-based dependency injection', why: 'Every contract is a typing.Protocol (structural subtyping), so LLM backends and tools swap without touching the executor, and tests run against deterministic fakes.' },
      { decision: 'Errors', choice: 'Typed exception hierarchy', why: 'RetryableError vs FatalAgentError is encoded in the type, not guessed by callers — one except branch catches all retryable subtypes, and each error maps to a failure category.' },
      { decision: 'Cross-cutting concerns', choice: 'Composable middleware (onion model)', why: 'Tracing, token budgets, rate limiting, and telemetry are interceptors in a chain — adding PII redaction or audit logging is one class, not a change to core orchestration.' },
      { decision: 'Testing', choice: 'Deterministic fakes over mocks', why: 'DeterministicFakeBackend implements the LLMBackend protocol with pre-programmed responses, so tests verify real behavior (not mock config) with zero network calls.' },
      { decision: 'Evaluation', choice: 'Non-parametric statistics', why: 'LLM scores are not normally distributed, so the harness uses bootstrap CIs, Cohen\'s d, Cliff\'s delta, and Mann-Whitney U instead of parametric tests.' },
    ],
    results: [
      { label: 'Test suite', value: '180+', note: 'Deterministic fakes · live APIs opt-in' },
      { label: 'Eval metrics', value: '5', note: 'Tool-call · schema · recovery · efficiency · answer' },
      { label: 'Significance', value: 'Bootstrap CI', note: "Cohen's d · Cliff's δ · Mann-Whitney U" },
      { label: 'Reproducibility', value: 'seed 42', note: 'Run manifest + SHA-256 config fingerprint' },
    ],
    statusNote:
      'Public project. Library RNG is reproducible for a given seed, but remote LLM APIs are not bit-reproducible even at temperature 0 — deterministic integration tests use fakes. Remaining production gaps (TLS, reverse proxy, HA) are documented rather than hidden.',
    github: 'https://github.com/Vyshnavi-d-p-3/Archon',
  },
  {
    slug: 'sentinel',
    number: '02',
    name: 'Sentinel',
    pitch: 'AI code review with hybrid retrieval and a deterministic eval harness.',
    description:
      'GitHub App that reviews PRs via BM25 + dense (pgvector) retrieval, cost guardrails, and a 98-fixture eval harness — per-category P/R/F1, regression-gated in CI.',
    tech: ['Python', 'FastAPI', 'Next.js', 'PostgreSQL', 'pgvector', 'BM25', 'Docker'],
    primaryTech: ['FastAPI', 'pgvector', 'BM25'],
    status: 'public · MIT',
    category: 'applied ai',
    problem:
      'The market is full of "AI code review" wrappers around a prompt. The hard part is not generating text — it is knowing whether the system catches real issues without fooling yourself. Sentinel separates the production pipeline, a deterministic scorer, and a curated eval set so quality is measurable, not vibed. Why regression gates: prompt or model changes that silently degrade review quality get blocked at merge, not discovered in production.',
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
  // Kairos: synced with repo README — no production-auth or multi-instance SSE claims; date → 2026.
  {
    slug: 'kairos',
    number: '03',
    name: 'Kairos',
    period: '2026',
    pitch: KAIROS_PITCH,
    description: KAIROS_PITCH,
    tech: [
      'Java 21',
      'Spring Boot 3.3',
      'PostgreSQL 16',
      'Redis 7',
      'Next.js 14',
      'OpenTelemetry',
      'Jaeger',
      'Micrometer',
      'Prometheus',
      'Grafana',
    ],
    primaryTech: ['Spring Boot 3.3', 'PostgreSQL 16', 'Redis 7'],
    status: 'working study · MIT',
    category: 'multi-tenant saas',
    problem:
      "Most multi-tenant apps enforce isolation in the application layer — every query needs a WHERE workspace_id = ?. One forgotten clause leaks one tenant's data to another. Kairos pushes isolation into the database with PostgreSQL Row-Level Security, so a bug in the API still cannot cross the tenant boundary.",
    architectureTitle: 'Architecture (the request lifecycle)',
    architecture:
      "A request carries the workspace identity in a header. A Spring filter reads it into a per-request context. When JPA borrows a connection from the HikariCP pool, a wrapper sets the Postgres session variable app.current_workspace on that connection; RLS policies on every tenant table filter rows against it. A proxy clears the variable when the connection returns to the pool, so a pooled connection can't carry tenant context to the next request. Writes additionally pass through idempotency and rate-limit filters, recompute the parent objective's progress, append to the audit log, and broadcast a live event over SSE.",
    decisions: [
      {
        decision: 'Tenant isolation',
        choice: 'PostgreSQL Row-Level Security with FORCE RLS',
        why: "A missed WHERE clause can't leak data when the database enforces the boundary. FORCE is required because the app and Flyway connect as the table-owning role, which RLS otherwise exempts.",
      },
      {
        decision: 'Workspace context',
        choice: 'app.current_workspace set on HikariCP connection checkout, cleared on close',
        why: "A pooled connection must not carry one request's tenant context into the next.",
      },
      {
        decision: 'Idempotency',
        choice: 'Stripe-style Idempotency-Key, 24h Redis cache of 2xx responses',
        why: "Network retries and double-submits must not double-write. Failures aren't cached — they should be retried for real.",
      },
      {
        decision: 'Rate limiting',
        choice: 'Redis ZSET sliding window, per workspace',
        why: 'Avoids the boundary-burst problem of a fixed-window counter.',
      },
      {
        decision: 'Resilience',
        choice: 'Idempotency and rate-limit filters fail open if Redis is down',
        why: 'Redis here is an optimisation, not a correctness guarantee — a cache outage should degrade the limiter, not take down the API.',
      },
      {
        decision: 'Audit',
        choice: 'Insert-only, monthly-partitioned audit_log with before/after JSONB',
        why: 'A queryable, append-only record of every mutation.',
      },
      {
        decision: 'Live updates',
        choice: 'SSE for the dashboard',
        why: 'Updates are one-directional; SSE is simpler than WebSockets and auto-reconnects. Single-instance — cross-instance fan-out via Redis Pub/Sub is on the roadmap.',
      },
    ],
    results: [],
    statusNote:
      'Working project built to explore the RLS isolation pattern. Auth is stubbed (header-based, standing in for a verified JWT); SSE is single-instance; the project is a study, not production software.',
    github: 'https://github.com/Vyshnavi-d-p-3/Kairos',
  },
  {
    slug: 'helios',
    number: '04',
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
    number: '05',
    name: 'NeuroLens',
    pitch: 'MVP adversarial-ML research: a cross-modal CLIP → ResNet transfer study.',
    description:
      'MVP adversarial-ML research: from-scratch PyTorch models (no torchvision pretrained), FGSM and PGD attacks implemented from the original papers, defenses, and a multimodal-to-unimodal attack-transfer experiment.',
    tech: ['Python', 'PyTorch', 'FGSM', 'PGD', 'CLIP-lite', 'ResNet-18'],
    primaryTech: ['PyTorch', 'CLIP-lite'],
    status: 'public · MIT',
    category: 'ml research',
    problem:
      'Adversarial robustness research has focused on unimodal classifiers, but CLIP-style vision-language models create a new attack surface. If perturbations crafted against a multimodal model transfer to a downstream unimodal classifier, deploying CLIP in a pipeline could silently compromise everything downstream.',
    architecture:
      'Models built from scratch in PyTorch (ResNet-18 on CIFAR-10, Transformer on AG News, CLIP-lite on Flickr8k — no torchvision pretrained imports) → optimize perturbation δ against CLIP-lite contrastive loss → apply δ to standalone ResNet-18 → measure transfer rate vs. direct PGD attack as the upper bound → defenses with certified guarantees as baselines → W&B for experiment tracking → documented as an MVP research writeup.',
    decisions: [
      { decision: 'Implementation', choice: 'Every model and attack from scratch', why: 'Reading a paper is not understanding it. Implementing forces every assumption and hyperparameter into the open.' },
      { decision: 'Attack target', choice: 'CLIP-lite joint embedding space', why: "CLIP's joint embedding is the bridge between modalities; attacking the bridge corrupts both sides simultaneously." },
      { decision: 'Hypothesis', choice: 'Multimodal → unimodal transfer', why: 'Both models share similar low-level features; if perturbations transfer, pipeline security has to account for it.' },
    ],
    results: [
      { label: 'ResNet-18 clean acc.', value: '≥93%', note: 'CIFAR-10 target' },
      { label: 'CLIP-lite R@1', value: '≥60%', note: 'Flickr8k retrieval target' },
      { label: 'Status', value: 'MVP', note: 'Exploratory research build' },
    ],
    github: 'https://github.com/Vyshnavi-d-p-3/Neurolens',
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find(p => p.slug === slug);
}
