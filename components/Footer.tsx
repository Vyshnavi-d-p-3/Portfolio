'use client';

import { useState } from 'react';
import { ArrowUpRight, BookOpen, Github, Linkedin, Mail, FileText, Twitter } from 'lucide-react';
import { motion } from 'framer-motion';
import {
  GITHUB_PORTFOLIO_REPO_URL,
  GITHUB_PROFILE_URL,
  LINKEDIN_URL,
  MAILTO_CONTACT,
  SUBSTACK_URL,
  X_PROFILE_URL,
} from '@/lib/site';

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
          <a
            href={X_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open to full-time roles — message on X"
            style={{
              position: 'relative',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.625rem',
              padding: '6px 12px',
              borderRadius: '999px',
              border: '1px solid var(--border-hover)',
              background: 'var(--bg-secondary)',
              textDecoration: 'none',
              transition: 'border-color 0.2s, transform 0.15s',
            }}
            onMouseEnter={e => {
              setShowTooltip(true);
              (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent-teal)';
            }}
            onMouseLeave={e => {
              setShowTooltip(false);
              (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-hover)';
            }}
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
              open to full-time roles · message on X
            </span>
            <ArrowUpRight size={12} style={{ color: 'var(--accent-teal)', flexShrink: 0 }} aria-hidden />

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
                  pointerEvents: 'none',
                }}
              >
                <span className="font-mono" style={{ fontSize: '0.6875rem', color: 'var(--text-secondary)' }}>
                  STEM OPT eligible · email + socials below
                </span>
              </motion.div>
            )}
          </a>

          <p
            style={{
              fontSize: '0.875rem',
              color: 'var(--text-muted)',
              maxWidth: '480px',
              lineHeight: 1.7,
            }}
          >
            MS SE graduating May 2026. Targeting full-time SWE roles at companies building at scale.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            {[
              { href: X_PROFILE_URL, label: 'x', icon: Twitter, external: true },
              { href: MAILTO_CONTACT, label: 'email', icon: Mail, external: false },
              { href: LINKEDIN_URL, label: 'linkedin', icon: Linkedin, external: true },
              { href: SUBSTACK_URL, label: 'substack', icon: BookOpen, external: true },
              { href: GITHUB_PROFILE_URL, label: 'github', icon: Github, external: true },
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
              href={GITHUB_PORTFOLIO_REPO_URL}
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
