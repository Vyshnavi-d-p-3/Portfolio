'use client';

import { motion } from 'framer-motion';
import { PERSON_NAME } from '@/lib/site';

// Ordered by market value: agents/evals lead, then full-stack, then infra.
const techGroups = [
  {
    label: 'AI / Agents',
    items: [
      'agent orchestration & tool calling',
      'LLM evaluation (golden sets, regression gating)',
      'RAG (hybrid retrieval)',
      'PyTorch',
      'W&B',
    ],
    primary: ['agent orchestration & tool calling', 'LLM evaluation (golden sets, regression gating)'],
  },
  {
    label: 'Backend',
    items: ['Python / FastAPI', 'Spring Boot', 'Go', 'C#', 'gRPC'],
    primary: ['Python / FastAPI', 'Spring Boot'],
  },
  {
    label: 'Frontend',
    items: ['TypeScript', 'React', 'Next.js', 'Angular'],
    primary: ['TypeScript', 'React', 'Next.js'],
  },
  {
    label: 'Data & Infra',
    items: ['PostgreSQL', 'pgvector', 'Redis', 'Docker', 'GitHub Actions'],
    primary: ['PostgreSQL', 'pgvector', 'Redis'],
  },
];

export default function AboutClient() {
  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '4rem 1.5rem' }}>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        style={{ maxWidth: '680px' }}
      >
        <div className="section-label" style={{ marginBottom: '1.25rem' }}>
          <span className="section-label-line" />
          about
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.5rem',
            flexWrap: 'wrap',
            marginBottom: '1.75rem',
          }}
        >
          <h1
            style={{
              fontSize: 'clamp(1.5rem, 4vw, 1.75rem)',
              fontWeight: 600,
              letterSpacing: '-0.02em',
              color: 'var(--text-primary)',
            }}
          >
            {PERSON_NAME}
          </h1>
          <img
            src="/profile.jpg"
            alt={PERSON_NAME}
            width={112}
            height={112}
            style={{
              width: 112,
              height: 112,
              borderRadius: '18px',
              border: '1px solid var(--border)',
              objectFit: 'cover',
              flexShrink: 0,
            }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.125rem', marginBottom: '3.5rem' }}>
          <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', lineHeight: 1.8, maxWidth: '600px' }}>
            {'AI and full-stack engineer with 6+ years across Dell Technologies (via Accenture) and TCS, and an M.S. Software Engineering from San Jose State (May 2026). At Dell I was an Accenture engineer embedded in the SupportAssist product team. Right now I work on AI agent workflows and the evals that measure them — agent orchestration, tool calling, and regression-gated LLM evaluation — built on full-stack production engineering.'}
          </p>
          <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', lineHeight: 1.8, maxWidth: '600px' }}>
            {"The thread across eight years is trust in automated systems: retail optimization where merchandisers needed explanations and overrides before acting on recommendations; device automation on Dell's preinstalled PC platform, where a remediation script is remote code execution unless the signature chain holds and a false-positive failure prediction ships a physical replacement part; and agent systems evaluated on tool-call accuracy, schema adherence, and error recovery, with failure taxonomies driving redesign."}
          </p>
          <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', lineHeight: 1.8, maxWidth: '600px' }}>
            {'My open-source work spans an AI code review evaluator (Sentinel), a multi-tenant OKR tracker with database-enforced tenant isolation (Kairos), a Go time-series database (Helios), adversarial robustness research (NeuroLens), and an autonomous agent with a statistical eval harness (Archon). The thread across all of them: ship the production pipeline and the measurement harness in the same repo.'}
          </p>
        </div>

        <div className="section-label" style={{ marginBottom: '1.5rem' }}>
          <span className="section-label-line" />
          skills
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          {techGroups.map((group, gi) => (
            <motion.div
              key={group.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: gi * 0.1, duration: 0.35 }}
            >
              <span
                className="font-mono"
                style={{
                  fontSize: '0.625rem',
                  color: 'var(--accent-teal)',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  display: 'block',
                  marginBottom: '0.625rem',
                }}
              >
                {group.label}
              </span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {group.items.map((item, ii) => (
                  <motion.span
                    key={item}
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: gi * 0.1 + ii * 0.04, duration: 0.2 }}
                    className={`tag-pill ${group.primary.includes(item) ? 'tag-pill-primary' : ''}`}
                  >
                    {item}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div
          style={{
            marginTop: '3.5rem',
            padding: '1.5rem',
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border)',
            borderRadius: '12px',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
            {[
              { label: 'currently', value: 'Building AI agent workflow evals — Archon, Sentinel (open source)' },
              { label: 'education', value: 'M.S. Software Engineering, SJSU — May 2026' },
              { label: 'location', value: 'San Jose, CA' },
              { label: 'status', value: 'Open to SWE & AI engineering roles (STEM OPT eligible)' },
              { label: 'focus', value: 'Agent workflow evals, AI engineering, full-stack systems' },
            ].map(item => (
              <div key={item.label} style={{ display: 'flex', gap: '1rem', alignItems: 'baseline' }}>
                <span
                  className="font-mono"
                  style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', minWidth: '80px' }}
                >
                  {item.label}
                </span>
                <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
