'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Download } from 'lucide-react';

import {
  HERO_HEADLINE,
  LOCATION_TEXT,
  MAILTO_CONTACT,
  OPEN_TO_LINE,
  PERSON_NAME,
  PERSON_TITLE,
  RESUME_PDF_DOWNLOAD_NAME,
  RESUME_PDF_PATH,
} from '@/lib/site';
import { motionTransition } from '@/lib/motion-prefs';

const skillRows = [
  { label: 'core', value: 'Python · TypeScript · Java · C#/.NET · Go' },
  { label: 'focus', value: 'LLM evals · RAG · agent orchestration · full-stack systems' },
];

export default function HeroSection() {
  const reduced = useReducedMotion();
  const fade = (delay: number) => ({
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0 },
    transition: motionTransition(!!reduced, 0.45, delay),
  });

  return (
    <section
      style={{
        maxWidth: '1100px',
        margin: '0 auto',
        padding: 'clamp(4rem, 10vw, 7rem) 1.5rem 3.5rem',
      }}
    >
      <div style={{ maxWidth: '920px' }}>
        <motion.p
          {...fade(0)}
          style={{
            fontSize: '0.9375rem',
            color: 'var(--text-secondary)',
            marginBottom: '1.25rem',
          }}
        >
          <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{PERSON_NAME}</span>
          <span style={{ color: 'var(--text-muted)' }}> — {PERSON_TITLE}</span>
        </motion.p>

        <motion.h1
          {...fade(0.06)}
          style={{
            fontSize: 'clamp(2.25rem, 5.4vw, 3.375rem)',
            textWrap: 'balance',
            fontWeight: 600,
            letterSpacing: '-0.04em',
            lineHeight: 1.05,
            color: 'var(--text-primary)',
            marginBottom: '1.5rem',
          }}
        >
          {HERO_HEADLINE.line1}
          <br />
          <span style={{ color: 'var(--text-secondary)' }}>{HERO_HEADLINE.line2}</span>
        </motion.h1>

        <motion.p
          {...fade(0.12)}
          style={{
            fontSize: '1.0625rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.65,
            maxWidth: '600px',
            marginBottom: '2rem',
          }}
        >
          Senior software engineer with 6+ years shipping production systems — C#/.NET on Dell
          SupportAssist <span style={{ color: 'var(--text-muted)' }}>(via Accenture)</span> and
          Java at TCS. Now building agent workflows and the evals that measure them.
        </motion.p>

        <motion.div
          {...fade(0.18)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            flexWrap: 'wrap',
            marginBottom: '2.5rem',
          }}
        >
          <Link href="#work" className="btn-amber">
            View work
            <ArrowRight size={15} />
          </Link>
          <a href={MAILTO_CONTACT} className="btn-outline">
            Email me
          </a>
          <a
            href={RESUME_PDF_PATH}
            download={RESUME_PDF_DOWNLOAD_NAME}
            className="text-link"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', marginLeft: '0.25rem' }}
          >
            <Download size={14} />
            Resume
          </a>
        </motion.div>

        <motion.dl
          {...fade(0.24)}
          style={{
            display: 'grid',
            gridTemplateColumns: 'auto 1fr',
            columnGap: '1.25rem',
            rowGap: '0.375rem',
            fontSize: '0.8125rem',
            marginBottom: '1.25rem',
          }}
        >
          {skillRows.map(row => (
            <div key={row.label} style={{ display: 'contents' }}>
              <dt className="font-mono" style={{ color: 'var(--text-muted)', fontSize: '0.75rem', paddingTop: '0.1rem' }}>
                {row.label}
              </dt>
              <dd style={{ color: 'var(--text-secondary)' }}>{row.value}</dd>
            </div>
          ))}
        </motion.dl>

        <motion.p
          {...fade(0.3)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.8125rem',
            color: 'var(--text-muted)',
          }}
        >
          <span
            aria-hidden
            style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent-teal)', flexShrink: 0 }}
          />
          {OPEN_TO_LINE} · {LOCATION_TEXT}
        </motion.p>
      </div>
    </section>
  );
}
