'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Download, Mail } from 'lucide-react';

import {
  HERO_HEADLINE,
  MAILTO_CONTACT,
  OPEN_TO_LINE,
  RESUME_PDF_DOWNLOAD_NAME,
  RESUME_PDF_PATH,
} from '@/lib/site';
import { motionTransition } from '@/lib/motion-prefs';

/** Core languages — production + AI work. */
const languages = ['Python', 'TypeScript', 'Java', 'C#'];
/** AI differentiators (Archon, Sentinel). */
const focusSkills = ['LLM evals', 'RAG'];
/** Frameworks / infra — evidenced, not commodity noise. */
const stackSkills = ['FastAPI', 'Next.js', 'Spring Boot', 'PostgreSQL', 'Redis', 'PyTorch', 'Go'];

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
      <motion.div style={{ maxWidth: '640px' }}>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={motionTransition(!!reduced, 0.4)}
          className="section-label"
          style={{ marginBottom: '1.25rem' }}
        >
          <span className="section-label-line" />
          ai engineering · full stack
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={motionTransition(!!reduced, 0.4, 0.08)}
          style={{
            fontSize: 'clamp(2rem, 5vw, 2.75rem)',
            fontWeight: 600,
            letterSpacing: '-0.035em',
            lineHeight: 1.12,
            color: 'var(--text-primary)',
            marginBottom: '1.125rem',
          }}
        >
          {HERO_HEADLINE.line1}
          <br />
          <span style={{ color: 'var(--accent-teal)' }}>{HERO_HEADLINE.line2}</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={motionTransition(!!reduced, 0.4, 0.16)}
          style={{ marginBottom: '1.25rem' }}
        >
          <p
            style={{
              fontSize: '1rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.7,
              marginBottom: '0.5rem',
            }}
          >
            6+ years at Dell Technologies and TCS · M.S. Software Engineering, SJSU
            <span
              className="font-mono"
              style={{
                display: 'inline',
                marginLeft: '0.4rem',
                fontSize: '0.6875rem',
                color: 'var(--text-muted)',
                letterSpacing: '0.02em',
                opacity: 0.85,
              }}
            >
              · via Accenture
            </span>
          </p>
          <p
            style={{
              fontSize: '0.875rem',
              color: 'var(--text-muted)',
              lineHeight: 1.65,
              maxWidth: '560px',
            }}
          >
            Five public systems — agent evaluation, AI code review, multi-tenant SaaS, a Go
            time-series DB, and adversarial ML research.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={motionTransition(!!reduced, 0.4, 0.22)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.35rem 0.7rem',
            marginBottom: '1.5rem',
            borderRadius: '999px',
            border: '1px solid var(--border)',
            background: 'var(--bg-secondary)',
            fontSize: '0.6875rem',
            color: 'var(--text-muted)',
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
                width: 6,
                height: 6,
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
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: 'var(--accent-teal)',
                flexShrink: 0,
              }}
            />
          )}
          <span>{OPEN_TO_LINE}</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={motionTransition(!!reduced, 0.35, 0.28)}
          style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1.75rem' }}
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
            resume
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={motionTransition(!!reduced, 0.4, 0.34)}
          aria-label="Skills"
        >
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: '0.4rem',
              marginBottom: '0.45rem',
            }}
          >
            {languages.map(skill => (
              <span key={skill} className="tag-pill tag-pill-primary">
                {skill}
              </span>
            ))}
            <span
              aria-hidden
              style={{
                width: 1,
                height: 14,
                background: 'var(--border-hover)',
                margin: '0 0.15rem',
                flexShrink: 0,
              }}
            />
            {focusSkills.map(skill => (
              <span key={skill} className="tag-pill tag-pill-primary">
                {skill}
              </span>
            ))}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
            {stackSkills.map(skill => (
              <span key={skill} className="tag-pill">
                {skill}
              </span>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
