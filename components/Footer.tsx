'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Github, Linkedin, Mail, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Footer() {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <footer
      role="contentinfo"
      style={{
        borderTop: '1px solid var(--border)',
        padding: '3rem 1.5rem 2rem',
        marginTop: '5rem',
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1.5rem',
            textAlign: 'center',
          }}
        >
          <div
            style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', gap: '0.625rem', cursor: 'pointer' }}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            onClick={() => window.location.href = 'mailto:vyshnavidp@example.com'}
          >
            <motion.span
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{
                display: 'block',
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor: 'var(--accent-teal)',
                flexShrink: 0,
              }}
            />
            <span
              className="font-mono"
              style={{ fontSize: '0.75rem', color: 'var(--accent-teal)', letterSpacing: '0.05em' }}
            >
              open to full-time roles (STEM OPT eligible)
            </span>

            {showTooltip && (
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  position: 'absolute',
                  bottom: 'calc(100% + 8px)',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  backgroundColor: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-hover)',
                  borderRadius: '6px',
                  padding: '6px 12px',
                  whiteSpace: 'nowrap',
                  zIndex: 10,
                }}
              >
                <span className="font-mono" style={{ fontSize: '0.6875rem', color: 'var(--text-secondary)' }}>
                  {"Let's talk — actively looking for SWE roles"}
                </span>
              </motion.div>
            )}
          </div>

          <p
            style={{
              fontSize: '0.875rem',
              color: 'var(--text-muted)',
              maxWidth: '480px',
              lineHeight: 1.7,
            }}
          >
            MS CS graduating May 2026. Targeting full-time SWE roles at companies building at scale.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            {[
              { href: 'https://github.com/vyshnavidp', label: 'github', icon: Github, external: true },
              { href: 'https://linkedin.com/in/vyshnavidp', label: 'linkedin', icon: Linkedin, external: true },
              { href: 'mailto:vyshnavidp@example.com', label: 'email', icon: Mail, external: false },
              { href: '/resume', label: 'resume', icon: FileText, external: false },
            ].map(item => (
              <a
                key={item.label}
                href={item.href}
                className="nav-link"
                aria-label={item.label}
                {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}
              >
                <item.icon size={14} />
                {item.label}
              </a>
            ))}
          </div>

          <p
            className="font-mono"
            style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', letterSpacing: '0.04em' }}
          >
            Designed & built by Vyshnavi D P · Source on{' '}
            <a
              href="https://github.com/vyshnavidp"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--accent-teal)', textDecoration: 'none' }}
            >
              GitHub
            </a>{' '}
            · © 2026
          </p>
        </div>
      </div>
    </footer>
  );
}
