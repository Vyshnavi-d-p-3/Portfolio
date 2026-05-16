'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight, Github } from 'lucide-react';
import { GITHUB_PROFILE_URL } from '@/lib/site';

const repos = [
  {
    name: 'Archon',
    pitch: 'Autonomous agent in Python — planner / executor / reflector with a typed middleware chain and statistical eval harness.',
    tech: ['Python', 'Agents', 'Eval'],
    href: 'https://github.com/Vyshnavi-d-p-3/Archon',
  },
  {
    name: 'AdaptiveRateGuard',
    pitch: 'Distributed rate limiter in Go with a gradient-boosting predictor sidecar — proactively lifts limits before traffic spikes hit.',
    tech: ['Go', 'Redis', 'gRPC', 'GBM'],
    href: 'https://github.com/Vyshnavi-d-p-3/AdaptiveRateGuard',
  },
];

export default function MoreOnGitHubSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section
      style={{
        maxWidth: '1100px',
        margin: '0 auto',
        padding: '0 1.5rem 5rem',
      }}
      aria-labelledby="more-github-heading"
    >
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 12 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4 }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            flexWrap: 'wrap',
            gap: '1rem',
            marginBottom: '1.5rem',
          }}
        >
          <div>
            <div className="section-label">
              <span className="section-label-line" />
              more on github
            </div>
            <h2
              id="more-github-heading"
              style={{
                fontSize: '1.125rem',
                fontWeight: 600,
                letterSpacing: '-0.01em',
                color: 'var(--text-primary)',
                marginTop: '0.5rem',
              }}
            >
              Side builds worth a look
            </h2>
          </div>
          <a
            href={GITHUB_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.375rem',
              fontSize: '0.75rem',
              color: 'var(--accent-teal)',
              textDecoration: 'none',
            }}
          >
            <Github size={13} /> all repos
            <ArrowUpRight size={12} />
          </a>
        </div>
      </motion.div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1rem',
        }}
      >
        {repos.map((repo, i) => (
          <motion.a
            key={repo.name}
            href={repo.href}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.35, delay: i * 0.08 }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.625rem',
              padding: '1rem 1.125rem',
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border)',
              borderRadius: '10px',
              textDecoration: 'none',
              transition: 'border-color 0.2s, transform 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'var(--accent-teal)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'var(--border)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span
                style={{
                  fontSize: '0.9375rem',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  letterSpacing: '-0.005em',
                }}
              >
                {repo.name}
              </span>
              <ArrowUpRight size={14} style={{ color: 'var(--accent-teal)' }} />
            </div>
            <p
              style={{
                fontSize: '0.8125rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.6,
              }}
            >
              {repo.pitch}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
              {repo.tech.map(t => (
                <span key={t} className="tag-pill">{t}</span>
              ))}
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
