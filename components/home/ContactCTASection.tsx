'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { ArrowRight, Download, Github, Mail } from 'lucide-react';
import {
  CONTACT_EMAIL,
  GITHUB_PROFILE_URL,
  MAILTO_CONTACT,
  RESUME_PDF_DOWNLOAD_NAME,
  RESUME_PDF_PATH,
  X_PROFILE_URL,
} from '@/lib/site';
import { motionTransition } from '@/lib/motion-prefs';

export default function ContactCTASection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const reduced = useReducedMotion();

  return (
    <section
      aria-labelledby="contact-cta-heading"
      style={{
        maxWidth: '1100px',
        margin: '0 auto',
        padding: '0 1.5rem 5rem',
      }}
    >
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 16 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={motionTransition(!!reduced, 0.4)}
        style={{
          padding: '2rem 1.75rem',
          borderRadius: '12px',
          border: '1px solid var(--border)',
          background:
            'linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-tertiary) 100%)',
        }}
      >
        <div className="section-label" style={{ marginBottom: '0.75rem' }}>
          <span className="section-label-line" />
          contact
        </div>
        <h2
          id="contact-cta-heading"
          style={{
            fontSize: 'clamp(1.25rem, 3vw, 1.5rem)',
            fontWeight: 600,
            letterSpacing: '-0.02em',
            color: 'var(--text-primary)',
            marginBottom: '0.5rem',
          }}
        >
          Open to full-time SWE roles
        </h2>
        <p
          style={{
            fontSize: '0.9375rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.7,
            maxWidth: '520px',
            marginBottom: '1.5rem',
          }}
        >
          MS SE @ SJSU, graduating May 2026. Bay Area or remote. Prefer email or X — I reply within a day.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
          <a href={MAILTO_CONTACT} className="btn-amber">
            <Mail size={14} />
            {CONTACT_EMAIL}
          </a>
          <a
            href={X_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
          >
            message on X
            <ArrowRight size={14} />
          </a>
          <a
            href={RESUME_PDF_PATH}
            download={RESUME_PDF_DOWNLOAD_NAME}
            className="btn-outline"
          >
            <Download size={14} />
            resume PDF
          </a>
          <a
            href={GITHUB_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
          >
            <Github size={14} />
            github
          </a>
        </div>
      </motion.div>
    </section>
  );
}
