'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Download } from 'lucide-react';

const primarySkills = ['React', 'Next.js', 'Go', 'Spring Boot', 'Python'];
const otherSkills = ['TypeScript', 'FastAPI', 'PostgreSQL', 'Redis', 'gRPC', 'Docker', 'PyTorch', 'Node.js'];

const accentWords = ['think,', 'scale,', 'ship.'];

export default function HeroSection() {
  return (
    <section
      style={{
        maxWidth: '1100px',
        margin: '0 auto',
        padding: '5rem 1.5rem 4rem',
      }}
    >
      <div style={{ maxWidth: '700px' }}>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="section-label"
          style={{ marginBottom: '1.5rem' }}
        >
          <span className="section-label-line" />
          software engineer
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          style={{
            fontSize: 'clamp(2rem, 5vw, 2.5rem)',
            fontWeight: 600,
            letterSpacing: '-0.025em',
            lineHeight: 1.2,
            color: 'var(--text-primary)',
            marginBottom: '1.25rem',
          }}
        >
          {'I build systems that '}
          {accentWords.map((word, i) => (
            <motion.span
              key={word}
              initial={{ opacity: 0, y: 8, filter: 'blur(3px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ delay: 0.3 + i * 0.2, duration: 0.4 }}
              style={{ color: 'var(--accent-teal)' }}
            >
              {word}{i < accentWords.length - 1 ? ' ' : ''}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.4 }}
          style={{
            fontSize: '1rem',
            color: 'var(--text-secondary)',
            maxWidth: '560px',
            lineHeight: 1.75,
            marginBottom: '2rem',
          }}
        >
          8 years building production systems — from real-time telemetry platforms at Accenture to retail analytics at TCS. Now finishing my MS at SJSU, where I build distributed databases from scratch and research adversarial attacks on multimodal AI.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.95, duration: 0.4 }}
          style={{ marginBottom: '2rem' }}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
            {primarySkills.map((skill, i) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 + i * 0.04, duration: 0.2 }}
                className="tag-pill tag-pill-primary"
              >
                {skill}
              </motion.span>
            ))}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {otherSkills.map((skill, i) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2 + i * 0.04, duration: 0.2 }}
                className="tag-pill"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.35 }}
          style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}
        >
          <Link href="/projects" className="btn-amber">
            view projects
            <ArrowRight size={14} />
          </Link>
          <a href="/resume" className="btn-outline">
            <Download size={14} />
            download resume
          </a>
        </motion.div>
      </div>
    </section>
  );
}
