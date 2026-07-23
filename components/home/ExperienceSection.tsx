'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const experiences = [
  {
    period: '2024 — 2026',
    company: 'San Jose State University',
    role: 'MS Software Engineering',
    description:
      'Distributed systems, ML/NLP, adversarial robustness research. Graduate Research — Agentic AI Systems. Built Sentinel, Kairos, Helios, NeuroLens, Archon.',
    current: false,
  },
  {
    period: 'Aug 2021 — Jul 2024',
    company: 'Accenture',
    role: 'Senior Software Engineer',
    project: 'Dell SupportAssist',
    description:
      'C#/.NET microservices for Dell SupportAssist — diagnostics, driver/BIOS update delivery with signature verification, and telemetry for a platform with 10M+ installs, my services processing diagnostics and telemetry for 2M+ active devices. Re-architected scan status from polling to WebSocket push (~60% steady-state load cut); built the in-app AI Virtual Assistant experience with device-context injection and assistant-triggered actions.',
    current: false,
  },
  {
    period: 'Jun 2018 — Aug 2021',
    company: 'TCS',
    role: 'Software Engineer',
    project: 'Optumera',
    description:
      'Java Spring Boot microservices for TCS Optumera (AI retail optimization, listed on Microsoft AppSource) — constraint-based space optimization across 1,400+ stores and 1,000+ parameters, distributed search with Redis at sub-200ms P95 across 2M+ SKU records, virtualized rendering for 100K+ SKU tables (~800ms → ~120ms client-side render), multi-tenant OAuth2 SSO across product modules.',
    current: false,
  },
];

function TimelineEntry({ entry, index, lineInView }: { entry: typeof experiences[0]; index: number; lineInView: boolean }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -15 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.35, delay: index * 0.15 }}
      style={{
        display: 'flex',
        gap: '1.5rem',
        paddingLeft: '1.5rem',
        position: 'relative',
      }}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ duration: 0.3, delay: index * 0.15 + 0.1 }}
        style={{
          position: 'absolute',
          left: 0,
          top: '0.375rem',
          width: 10,
          height: 10,
          borderRadius: '50%',
          backgroundColor: entry.current ? 'var(--accent-teal)' : 'transparent',
          border: `2px solid var(--accent-teal)`,
          boxShadow: entry.current ? '0 0 8px var(--accent-teal)' : 'none',
          flexShrink: 0,
          zIndex: 1,
        }}
      />

      <div style={{ paddingBottom: index < experiences.length - 1 ? '2rem' : 0 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '0.25rem' }}>
          <span
            className="font-mono"
            style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}
          >
            {entry.period}
          </span>
          {entry.current && (
            <span className="status-badge status-in-progress">current</span>
          )}
        </div>
        <div style={{ marginBottom: '0.25rem' }}>
          <span style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--text-primary)' }}>
            {entry.company}
          </span>
          {entry.project && (
            <span style={{ fontSize: '0.875rem', color: 'var(--accent-teal)', marginLeft: '0.5rem' }}>
              — {entry.project}
            </span>
          )}
        </div>
        <span
          className="font-mono"
          style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem' }}
        >
          {entry.role}
        </span>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
          {entry.description}
        </p>
      </div>
    </motion.div>
  );
}

export default function ExperienceSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      style={{
        maxWidth: '1100px',
        margin: '0 auto',
        padding: '0 1.5rem 5rem',
      }}
      aria-labelledby="experience-heading"
    >
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 12 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4 }}
      >
        <div className="section-label">
          <span className="section-label-line" />
          experience
        </div>
        <h2
          id="experience-heading"
          style={{
            fontSize: '1.5rem',
            fontWeight: 600,
            letterSpacing: '-0.02em',
            color: 'var(--text-primary)',
            marginBottom: '2.5rem',
          }}
        >
          Commit history
        </h2>
      </motion.div>

      <div
        style={{
          maxWidth: '640px',
          position: 'relative',
          paddingLeft: '0.25rem',
        }}
      >
        <motion.div
          initial={{ scaleY: 0 }}
          animate={isInView ? { scaleY: 1 } : {}}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            left: '1.25rem',
            top: '0.875rem',
            width: 1,
            bottom: '0.875rem',
            backgroundColor: 'var(--border-hover)',
            transformOrigin: 'top',
          }}
        />

        {experiences.map((entry, i) => (
          <TimelineEntry key={entry.company} entry={entry} index={i} lineInView={isInView} />
        ))}
      </div>
    </section>
  );
}
