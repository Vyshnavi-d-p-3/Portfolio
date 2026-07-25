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
        padding: '0 1.5rem 3.5rem',
      }}
    >
      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.4 }}
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1.25rem 2rem',
          paddingTop: '1.5rem',
          borderTop: '1px solid var(--border)',
        }}
      >
        {PROOF_STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 6 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            style={{ minWidth: '120px' }}
          >
            <p
              style={{
                fontSize: '1.375rem',
                fontWeight: 600,
                letterSpacing: '-0.03em',
                color: 'var(--accent-teal)',
                lineHeight: 1.15,
                marginBottom: '0.15rem',
              }}
            >
              {stat.value}
            </p>
            <p
              style={{
                fontSize: '0.8125rem',
                color: 'var(--text-primary)',
                marginBottom: '0.1rem',
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
