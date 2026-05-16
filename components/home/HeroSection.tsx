'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Download, Mail } from 'lucide-react';

import {
  DEGREE_SHORT,
  GRADUATION_TEXT,
  HERO_HEADLINE,
  MAILTO_CONTACT,
  RESUME_PDF_DOWNLOAD_NAME,
  RESUME_PDF_PATH,
  SCHOOL_SHORT,
  WORK_EXPERIENCE_YEARS_TEXT,
} from '@/lib/site';
import { motionTransition } from '@/lib/motion-prefs';

const primarySkills = ['Go', 'Python', 'TypeScript', 'Spring Boot', 'PostgreSQL'];
const otherSkills = ['Next.js', 'FastAPI', 'pgvector', 'Redis', 'Docker', 'PyTorch'];

export default function HeroSection() {
  const reduced = useReducedMotion();

  return (
    <section
      style={{
        maxWidth: '1100px',
        margin: '0 auto',
        padding: '5rem 1.5rem 3rem',
      }}
    >
      <motion.div style={{ maxWidth: '700px' }}>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={motionTransition(!!reduced, 0.4)}
          className="section-label"
          style={{ marginBottom: '1.5rem' }}
        >
          <span className="section-label-line" />
          software engineer
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={motionTransition(!!reduced, 0.4, 0.1)}
          style={{
            fontSize: 'clamp(2rem, 5vw, 2.625rem)',
            fontWeight: 600,
            letterSpacing: '-0.03em',
            lineHeight: 1.15,
            color: 'var(--text-primary)',
            marginBottom: '1.25rem',
          }}
        >
          {HERO_HEADLINE.line1}
          <br />
          <span style={{ color: 'var(--accent-teal)' }}>{HERO_HEADLINE.line2}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={motionTransition(!!reduced, 0.4, 0.2)}
          style={{
            fontSize: '1rem',
            color: 'var(--text-secondary)',
            maxWidth: '580px',
            lineHeight: 1.75,
            marginBottom: '1.25rem',
          }}
        >
          {`${WORK_EXPERIENCE_YEARS_TEXT} at Accenture and TCS · ${DEGREE_SHORT} @ ${SCHOOL_SHORT} (${GRADUATION_TEXT}). Four public projects on GitHub — AI evaluation, multi-tenant SaaS, a Go time-series DB, and adversarial ML research.`}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={motionTransition(!!reduced, 0.4, 0.25)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.4rem 0.75rem',
            marginBottom: '1.75rem',
            borderRadius: '999px',
            border: '1px solid var(--border)',
            background: 'var(--bg-secondary)',
            fontSize: '0.75rem',
            color: 'var(--text-secondary)',
            fontFamily: "'JetBrains Mono', monospace",
            maxWidth: '100%',
          }}
        >
          {!reduced && (
            <motion.span
              animate={{ opacity: [1, 0.35, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{
                display: 'inline-block',
                width: 7,
                height: 7,
                borderRadius: '50%',
                background: 'var(--accent-teal)',
                flexShrink: 0,
              }}
            />
          )}
          {reduced && (
            <span
              style={{
                display: 'inline-block',
                width: 7,
                height: 7,
                borderRadius: '50%',
                background: 'var(--accent-teal)',
                flexShrink: 0,
              }}
            />
          )}
          <span>open to full-time SWE roles · STEM OPT eligible</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={motionTransition(!!reduced, 0.4, 0.3)}
          style={{ marginBottom: '1.75rem' }}
        >
          <motion.div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
            {primarySkills.map(skill => (
              <span key={skill} className="tag-pill tag-pill-primary">
                {skill}
              </span>
            ))}
          </motion.div>
          <motion.div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {otherSkills.map(skill => (
              <span key={skill} className="tag-pill">
                {skill}
              </span>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={motionTransition(!!reduced, 0.35, 0.35)}
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
      </motion.div>
    </section>
  );
}
