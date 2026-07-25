'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Mail } from 'lucide-react';

import { HERO_HEADLINE, MAILTO_CONTACT } from '@/lib/site';
import { motionTransition } from '@/lib/motion-prefs';

/** One row only — languages + AI focus. Stack lives on /about. */
const heroSkills = ['Python', 'TypeScript', 'Java', 'C#', 'LLM evals', 'RAG'];

export default function HeroSection() {
  const reduced = useReducedMotion();

  return (
    <section
      style={{
        maxWidth: '1100px',
        margin: '0 auto',
        padding: '4.5rem 1.5rem 2.5rem',
      }}
    >
      <motion.div style={{ maxWidth: '620px' }}>
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
            fontSize: 'clamp(2.125rem, 5.5vw, 2.875rem)',
            fontWeight: 600,
            letterSpacing: '-0.035em',
            lineHeight: 1.1,
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
          transition={motionTransition(!!reduced, 0.4, 0.16)}
          style={{
            fontSize: '1.0625rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.65,
            marginBottom: '0.75rem',
            maxWidth: '540px',
          }}
        >
          6+ years at Dell Technologies and TCS · M.S. Software Engineering, SJSU
          <span
            className="font-mono"
            style={{
              marginLeft: '0.35rem',
              fontSize: '0.6875rem',
              color: 'var(--text-muted)',
              letterSpacing: '0.02em',
              opacity: 0.8,
            }}
          >
            · via Accenture
          </span>
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={motionTransition(!!reduced, 0.4, 0.2)}
          className="font-mono"
          style={{
            fontSize: '0.75rem',
            color: 'var(--text-muted)',
            letterSpacing: '0.01em',
            marginBottom: '1.75rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          {!reduced ? (
            <motion.span
              animate={{ opacity: [1, 0.35, 1] }}
              transition={{ duration: 2.2, repeat: Infinity }}
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: 'var(--accent-teal)',
                flexShrink: 0,
              }}
            />
          ) : (
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: 'var(--accent-teal)',
                flexShrink: 0,
              }}
            />
          )}
          Open to SWE & AI engineering roles · STEM OPT
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={motionTransition(!!reduced, 0.35, 0.26)}
          style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '2rem' }}
        >
          <Link href="/projects" className="btn-amber">
            view projects
            <ArrowRight size={14} />
          </Link>
          <a href={MAILTO_CONTACT} className="btn-outline">
            <Mail size={14} />
            get in touch
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={motionTransition(!!reduced, 0.4, 0.32)}
          aria-label="Core skills"
          style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}
        >
          {heroSkills.map(skill => (
            <span key={skill} className="tag-pill tag-pill-primary">
              {skill}
            </span>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
