'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowUp } from 'lucide-react';
import { BlogPost } from '@/lib/types';
import { formatDate } from '@/lib/date';

function ReadingProgress() {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const handler = () => {
      const doc = document.documentElement;
      const scrolled = doc.scrollTop;
      const total = doc.scrollHeight - doc.clientHeight;
      setWidth(total > 0 ? (scrolled / total) * 100 : 0);
    };
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);
  return <div className="reading-progress" style={{ width: `${width}%` }} />;
}

function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const handler = () => setShow(window.scrollY > 500);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  if (!show) return null;
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        width: 40,
        height: 40,
        borderRadius: '50%',
        border: '1px solid var(--accent-teal)',
        background: 'var(--bg-secondary)',
        color: 'var(--accent-teal)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 50,
        transition: 'background 0.2s',
        minWidth: 44,
        minHeight: 44,
      }}
    >
      <ArrowUp size={16} />
    </motion.button>
  );
}

interface Props {
  post: BlogPost;
  prev: BlogPost | null;
  next: BlogPost | null;
  children: React.ReactNode;
}

export default function BlogPostShell({ post, prev, next, children }: Props) {
  return (
    <>
      <ReadingProgress />
      <BackToTop />

      <div style={{ maxWidth: '780px', margin: '0 auto', padding: '3rem 1.5rem 5rem' }}>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Link
            href="/blog"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.375rem',
              color: 'var(--text-muted)',
              textDecoration: 'none',
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.8125rem',
              marginBottom: '2rem',
              transition: 'color 0.2s',
              minHeight: 44,
              minWidth: 44,
            }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent-teal)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
          >
            <ArrowLeft size={14} />
            back to blog
          </Link>

          <h1
            style={{
              fontSize: 'clamp(1.5rem, 4vw, 1.875rem)',
              fontWeight: 600,
              letterSpacing: '-0.025em',
              color: 'var(--text-primary)',
              marginBottom: '1rem',
              lineHeight: 1.25,
            }}
          >
            {post.title}
          </h1>

          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.625rem', marginBottom: '0.875rem' }}>
            <time
              dateTime={post.date}
              className="font-mono"
              style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}
            >
              {formatDate(post.date)}
            </time>
            <span style={{ color: 'var(--border-hover)' }}>·</span>
            <span className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              {post.readingTime}
            </span>
            {post.tags.map(tag => (
              <span key={tag} className="tag-pill tag-pill-primary">{tag}</span>
            ))}
          </div>

          {post.project && (
            <div style={{ marginBottom: '1rem' }}>
              <Link
                href={`/projects/${post.project}`}
                className="font-mono"
                style={{
                  fontSize: '0.75rem',
                  color: 'var(--accent-teal)',
                  textDecoration: 'none',
                  borderBottom: '1px solid rgba(45,212,168,0.3)',
                }}
              >
                → related project: {post.project}
              </Link>
            </div>
          )}

          <div style={{ borderTop: '1px solid var(--border)', marginBottom: '2.5rem' }} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          style={{ maxWidth: '680px' }}
        >
          {children}
        </motion.div>

        {(prev || next) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1rem',
              marginTop: '4rem',
              paddingTop: '2rem',
              borderTop: '1px solid var(--border)',
            }}
          >
            {prev ? (
              <Link
                href={`/blog/${prev.slug}`}
                style={{
                  textDecoration: 'none',
                  padding: '1rem',
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border)',
                  borderRadius: '10px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.25rem',
                  transition: 'border-color 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--accent-teal)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
              >
                <span className="font-mono" style={{ fontSize: '0.625rem', color: 'var(--text-muted)' }}>← previous</span>
                <span style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-primary)' }}>{prev.title}</span>
              </Link>
            ) : <div />}

            {next ? (
              <Link
                href={`/blog/${next.slug}`}
                style={{
                  textDecoration: 'none',
                  padding: '1rem',
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border)',
                  borderRadius: '10px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.25rem',
                  textAlign: 'right',
                  transition: 'border-color 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--accent-teal)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
              >
                <span className="font-mono" style={{ fontSize: '0.625rem', color: 'var(--text-muted)' }}>next →</span>
                <span style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-primary)' }}>{next.title}</span>
              </Link>
            ) : <div />}
          </motion.div>
        )}
      </div>
    </>
  );
}
