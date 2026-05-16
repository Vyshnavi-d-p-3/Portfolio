'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { GraduationCap, MapPin, Layers } from 'lucide-react';
import { WORK_EXPERIENCE_YEARS_TEXT } from '@/lib/site';

const items = [
  {
    icon: GraduationCap,
    label: 'MS CS @ San Jose State',
    note: 'graduating May 2026',
  },
  {
    icon: MapPin,
    label: 'San Jose, CA',
    note: 'open to remote & on-site',
  },
  {
    icon: Layers,
    label: `${WORK_EXPERIENCE_YEARS_TEXT}, 2 companies`,
    note: '4 ambitious projects',
  },
];

export default function BeyondCodeSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section
      style={{
        maxWidth: '1100px',
        margin: '0 auto',
        padding: '0 1.5rem 5rem',
      }}
    >
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 12 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4 }}
      >
        <div className="section-label">
          <span className="section-label-line" />
          beyond code
        </div>
      </motion.div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          maxWidth: '720px',
        }}
      >
        {items.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.1, duration: 0.35 }}
            style={{
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border)',
              borderRadius: '10px',
              padding: '1rem 1.25rem',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.75rem',
            }}
          >
            <item.icon
              size={16}
              style={{ color: 'var(--accent-teal)', flexShrink: 0, marginTop: '2px' }}
            />
            <div>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-primary)', fontWeight: 500 }}>
                {item.label}
              </p>
              <p className="font-mono" style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                {item.note}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
