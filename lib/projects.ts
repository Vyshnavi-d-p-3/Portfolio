export interface Project {
  slug: string;
  number: string;
  name: string;
  pitch: string;
  description: string;
  tech: string[];
  primaryTech: string[];
  status: 'in-progress' | 'arxiv';
  category: string;
  problem: string;
  architecture: string;
  decisions: { decision: string; choice: string; why: string }[];
  results: { label: string; value: string; note: string }[];
  github?: string;
  demo?: string;
  paper?: string;
}

export const projects: Project[] = [
  {
    slug: 'sentinel',
    number: '01',
    name: 'Sentinel',
    pitch: 'AI code review assistant with a reproducible evaluation harness.',
    description: '100 hand-labeled PRs, precision/recall/F1 per category. Turns vague AI feedback into measurable, trustworthy reviews.',
    tech: ['Next.js', 'FastAPI', 'pgvector', 'Claude API', 'PostgreSQL', 'Docker'],
    primaryTech: ['Next.js', 'FastAPI', 'pgvector'],
    status: 'in-progress',
    category: 'full-stack + ai',
    problem: 'Code review tools powered by LLMs produce inconsistent results with no way to measure quality. There is no standard for "did the AI catch the real issues?" — just vibes. Teams end up trusting the AI blindly or ignoring it entirely.',
    architecture: 'Next.js frontend → FastAPI backend → PostgreSQL with pgvector for semantic search over PR history → Claude API for review generation → evaluation harness that scores P/R/F1 per category (security, logic, style, performance).',
    decisions: [
      { decision: 'Evaluation strategy', choice: 'Hand-labeled 100 PRs', why: 'LLM evals need ground truth. Auto-generated labels have circular validity — you need human judgment as the north star.' },
      { decision: 'Vector DB', choice: 'pgvector over Pinecone', why: 'Single-service architecture. pgvector in Postgres eliminates operational overhead and allows transactional consistency with review metadata.' },
      { decision: 'LLM provider', choice: 'Claude API', why: 'Superior instruction-following for structured JSON output and lower hallucination rate on code analysis benchmarks.' },
    ],
    results: [
      { label: 'PRs labeled', value: '100', note: 'Hand-annotated ground truth' },
      { label: 'Eval categories', value: '4', note: 'Security, logic, style, perf' },
      { label: 'F1 target', value: '0.82', note: 'Across all categories' },
    ],
  },
  {
    slug: 'kairos',
    number: '02',
    name: 'Kairos',
    pitch: 'Multi-tenant OKR platform with enterprise-grade data isolation.',
    description: 'Postgres RLS, partitioned audit logs, real-time SSE dashboards. Every team owns their data — enforced at the database level.',
    tech: ['Next.js', 'Spring Boot', 'Postgres RLS', 'Redis', 'SSE', 'Docker'],
    primaryTech: ['Next.js', 'Spring Boot', 'Postgres RLS'],
    status: 'in-progress',
    category: 'full-stack',
    problem: "OKR tools treat multi-tenancy as an application concern — filtering data by tenant ID in query logic. This is fragile: one bad join, one forgotten WHERE clause, and one team sees another's strategy. Real isolation requires enforcement at the database level.",
    architecture: 'Next.js 14 App Router frontend → Spring Boot REST API → PostgreSQL with Row Level Security policies per tenant → Redis for session caching → SSE for real-time objective progress updates → partitioned audit log table for compliance.',
    decisions: [
      { decision: 'Multi-tenancy model', choice: 'Postgres RLS over application-layer filtering', why: 'RLS policies are enforced by the database engine — no way for application code to bypass them. True isolation, not just a convention.' },
      { decision: 'Real-time updates', choice: 'SSE over WebSockets', why: 'OKR updates are uni-directional (server pushes progress). SSE is simpler, load-balancer friendly, and HTTP/2 multiplexes it for free.' },
      { decision: 'Audit logging', choice: 'Partitioned by tenant + month', why: 'Audit tables grow unbounded. Range partitioning by month enables instant pruning and keeps query plans fast.' },
    ],
    results: [
      { label: 'Tenants isolated', value: '100%', note: 'Zero cross-tenant data exposure' },
      { label: 'Audit retention', value: '90d', note: 'Auto-pruned via partitions' },
      { label: 'SSE latency', value: '<50ms', note: 'Progress update delivery' },
    ],
  },
  {
    slug: 'helios',
    number: '03',
    name: 'Helios',
    pitch: 'Distributed time-series database built from scratch in Go.',
    description: 'LSM-tree storage engine, Raft consensus replication, PromQL query layer, and built-in anomaly detection. No InfluxDB, no shortcuts.',
    tech: ['Go', 'gRPC', 'Raft', 'LSM-tree', 'Gorilla', 'PromQL'],
    primaryTech: ['Go', 'gRPC', 'Raft'],
    status: 'in-progress',
    category: 'systems',
    problem: 'Time-series databases are often treated as black boxes. Understanding how they achieve high write throughput, efficient compression, and distributed consistency requires building one — from the storage engine to the query planner to the replication protocol.',
    architecture: 'Gorilla-encoded chunks for 10x compression → LSM-tree with WAL for durability → Raft-replicated write-ahead log across 3 nodes → gRPC API → PromQL parser and evaluator → statistical anomaly detection (Z-score + IQR).',
    decisions: [
      { decision: 'Storage engine', choice: 'LSM-tree over B-tree', why: 'Time-series workloads are write-heavy. LSM-trees convert random writes to sequential, achieving 10-100x higher write throughput.' },
      { decision: 'Consensus', choice: 'Raft over Paxos', why: 'Raft is designed to be understandable. For a learning project and production use, the implementation clarity matters as much as theoretical elegance.' },
      { decision: 'Compression', choice: 'Gorilla encoding', why: 'Facebook\'s Gorilla paper shows 12x compression for metrics data using delta-of-delta + XOR. Perfect for monotonically increasing timestamps.' },
    ],
    results: [
      { label: 'Write throughput', value: '500K/s', note: 'Points per second, single node' },
      { label: 'Compression', value: '~12x', note: 'Via Gorilla encoding' },
      { label: 'Replication', value: '3-node', note: 'Raft-based, strong consistency' },
    ],
  },
  {
    slug: 'neurolens',
    number: '04',
    name: 'NeuroLens',
    pitch: 'Multimodal adversarial robustness toolkit with a novel cross-modal attack.',
    description: 'Explores how adversarial perturbations in vision affect language model outputs in CLIP-based systems. arXiv preprint.',
    tech: ['PyTorch', 'FGSM', 'PGD', 'CLIP', 'NumPy', 'W&B'],
    primaryTech: ['PyTorch', 'CLIP'],
    status: 'arxiv',
    category: 'ai research',
    problem: 'Adversarial robustness research has focused on unimodal models. But CLIP-style vision-language models create new attack surfaces: a perturbation in image space can corrupt semantic understanding in text space. No toolkit exists to systematically explore this cross-modal vulnerability.',
    architecture: 'CLIP model as the attack target → custom cross-modal loss function that maximizes vision-text embedding divergence → FGSM and PGD attack implementations → robustness evaluation suite → W&B experiment tracking → arXiv preprint writeup.',
    decisions: [
      { decision: 'Attack target', choice: 'CLIP embedding space', why: 'CLIP\'s joint embedding space is the "bridge" between modalities. Attacking the bridge corrupts both visual and language understanding simultaneously.' },
      { decision: 'Attack methods', choice: 'FGSM + PGD as baselines', why: 'Established methods provide reproducible baselines. Novel contribution is the cross-modal loss function, not reinventing the attack algorithm.' },
      { decision: 'Evaluation', choice: 'Semantic similarity degradation', why: 'Pixel-level metrics miss the point for multimodal models. What matters is whether adversarial images fool the semantic alignment between vision and language.' },
    ],
    results: [
      { label: 'Attack success rate', value: '73%', note: 'Cross-modal semantic corruption' },
      { label: 'Models tested', value: '4', note: 'CLIP variants + baselines' },
      { label: 'arXiv status', value: 'Pre-print', note: 'Under review' },
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find(p => p.slug === slug);
}
