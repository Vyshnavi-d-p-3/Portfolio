'use client';

import { motion } from 'framer-motion';
import { WORK_EXPERIENCE_YEARS_TEXT } from '@/lib/site';

const techGroups = [
  {
    label: 'Frontend',
    items: ['React', 'Next.js', 'Angular', 'TypeScript', 'Tailwind CSS'],
    primary: ['React', 'Next.js', 'TypeScript'],
  },
  {
    label: 'Backend',
    items: ['Go', 'Spring Boot', 'Python / FastAPI', 'C#', 'Node.js', 'gRPC'],
    primary: ['Go', 'Spring Boot', 'Python / FastAPI'],
  },
  {
    label: 'Data & Infra',
    items: ['PostgreSQL', 'Redis', 'pgvector', 'Docker', 'GitHub Actions', 'Prometheus'],
    primary: ['PostgreSQL', 'Redis'],
  },
  {
    label: 'AI / ML',
    items: ['PyTorch', 'LLM / RAG', 'NLP', 'Computer Vision', 'W&B'],
    primary: ['PyTorch'],
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

        <h1
          style={{
            fontSize: 'clamp(1.5rem, 4vw, 1.75rem)',
            fontWeight: 600,
            letterSpacing: '-0.02em',
            color: 'var(--text-primary)',
            marginBottom: '1.75rem',
          }}
        >
          Vyshnavi D P
        </h1>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.125rem', marginBottom: '3.5rem' }}>
          <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', lineHeight: 1.8, maxWidth: '600px' }}>
            {`I'm a full-stack software engineer with ${WORK_EXPERIENCE_YEARS_TEXT} of production experience at Accenture and TCS. Currently finishing my MS in Computer Science at San Jose State, where I research adversarial robustness in multimodal ML systems and build distributed systems from scratch.`}
          </p>
          <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', lineHeight: 1.8, maxWidth: '600px' }}>
            {"I believe the best engineers build systems that measure their own quality and survive real-world failure. That philosophy drives everything — from AI code reviewers with reproducible eval harnesses to time-series databases with hand-written storage engines."}
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
              { label: 'currently', value: 'MS Computer Science @ SJSU — May 2026' },
              { label: 'location', value: 'San Jose, CA' },
              { label: 'status', value: 'Open to full-time SWE roles (STEM OPT eligible)' },
              { label: 'focus', value: 'Full-stack, distributed systems, applied AI' },
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
