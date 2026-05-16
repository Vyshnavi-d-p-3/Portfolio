'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Download, Mail } from 'lucide-react';

import {
  MAILTO_CONTACT,
  RESUME_PDF_DOWNLOAD_NAME,
  RESUME_PDF_PATH,
  WORK_EXPERIENCE_YEARS_TEXT,
} from '@/lib/site';

const primarySkills = ['Go', 'Python', 'TypeScript', 'Spring Boot', 'PostgreSQL'];
const otherSkills = ['Next.js', 'FastAPI', 'pgvector', 'Redis', 'Docker', 'PyTorch'];

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
            maxWidth: '580px',
            lineHeight: 1.75,
            marginBottom: '1.25rem',
          }}
        >
          {`Software engineer with ${WORK_EXPERIENCE_YEARS_TEXT} at Accenture and TCS, now finishing my MS CS at SJSU (May 2026). I work where backend systems and applied AI overlap — four open-source projects spanning AI evaluation, multi-tenant SaaS, a Go time-series DB, and adversarial ML research.`}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.85, duration: 0.4 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.4rem 0.75rem',
            marginBottom: '2rem',
            borderRadius: '999px',
            border: '1px solid var(--border)',
            background: 'var(--bg-secondary)',
            fontSize: '0.75rem',
            color: 'var(--text-secondary)',
            fontFamily: "'JetBrains Mono', monospace",
            maxWidth: '100%',
          }}
        >
          <motion.span
            animate={{ opacity: [1, 0.35, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{
              display: 'inline-block',
              width: 7,
              height: 7,
              borderRadius: '50%',
              background: 'var(--accent-teal)',
            }}
          />
          <span>open to full-time SWE roles · Bay Area or remote · STEM OPT eligible</span>
        </motion.div>

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
          <a href={MAILTO_CONTACT} className="btn-outline">
            <Mail size={14} />
            get in touch
          </a>
          <a href={RESUME_PDF_PATH} download={RESUME_PDF_DOWNLOAD_NAME} className="btn-outline">
            <Download size={14} />
            download resume
          </a>
        </motion.div>
      </div>
    </section>
  );
}
