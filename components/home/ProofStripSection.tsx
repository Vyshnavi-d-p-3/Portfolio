'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { PROOF_STATS } from '@/lib/site';

export default function ProofStripSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <section
      aria-label="Highlights"
      style={{
        maxWidth: '1100px',
        margin: '0 auto',
        padding: '0 1.5rem 3rem',
      }}
    >
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.35 }}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: '0.75rem',
        }}
      >
        {PROOF_STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 8 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.3, delay: i * 0.06 }}
            style={{
              padding: '1rem 1.125rem',
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border)',
              borderRadius: '10px',
            }}
          >
            <p
              style={{
                fontSize: 'clamp(1.25rem, 3vw, 1.5rem)',
                fontWeight: 600,
                letterSpacing: '-0.02em',
                color: 'var(--accent-teal)',
                marginBottom: '0.2rem',
                lineHeight: 1.1,
              }}
            >
              {stat.value}
            </p>
            <p
              style={{
                fontSize: '0.8125rem',
                fontWeight: 500,
                color: 'var(--text-primary)',
                marginBottom: '0.15rem',
              }}
            >
              {stat.label}
            </p>
            <p className="font-mono" style={{ fontSize: '0.625rem', color: 'var(--text-muted)' }}>
              {stat.note}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
