'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { formatDate } from '@/lib/date';

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  readingTime: string;
  tags: string[];
  description: string;
}

export default function BlogSection({ posts }: { posts: BlogPost[] }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section
      style={{
        maxWidth: '1100px',
        margin: '0 auto',
        padding: '0 1.5rem 5rem',
      }}
      aria-labelledby="blog-heading"
    >
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 12 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4 }}
      >
        <div className="section-label">
          <span className="section-label-line" />
          writing
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            marginBottom: '1.5rem',
          }}
        >
          <h2
            id="blog-heading"
            style={{
              fontSize: '1.5rem',
              fontWeight: 600,
              letterSpacing: '-0.02em',
              color: 'var(--text-primary)',
            }}
          >
            Blog
          </h2>
          {posts.length > 0 && (
            <Link
              href="/blog"
              className="nav-link"
              style={{ fontSize: '0.8125rem' }}
            >
              all posts →
            </Link>
          )}
        </div>
      </motion.div>

      {posts.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.4 }}
          style={{
            padding: '2rem',
            background: 'var(--bg-secondary)',
            borderRadius: '12px',
            border: '1px solid var(--border)',
            maxWidth: '480px',
          }}
        >
          <p
            className="font-mono"
            style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', lineHeight: 1.7 }}
          >
            First post coming soon — building first, writing second.
          </p>
        </motion.div>
      ) : (
        <div style={{ maxWidth: '680px' }}>
          {posts.map((post, i) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.35 }}
            >
              <Link
                href={`/blog/${post.slug}`}
                style={{ textDecoration: 'none', display: 'block' }}
              >
                <div
                  style={{
                    padding: '1rem 0',
                    borderBottom: '1px solid var(--border)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '1rem',
                    cursor: 'pointer',
                  }}
                  className="blog-row"
                >
                  <div>
                    <span
                      style={{
                        fontSize: '0.9375rem',
                        fontWeight: 500,
                        color: 'var(--text-primary)',
                        transition: 'color 0.2s',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.375rem',
                      }}
                      className="blog-title"
                    >
                      {post.title}
                      <span className="blog-arrow" style={{ opacity: 0, transition: 'opacity 0.15s, transform 0.15s', transform: 'translateX(-4px)' }}>
                        →
                      </span>
                    </span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '0.25rem' }}>
                      <span className="font-mono" style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>
                        {post.readingTime}
                      </span>
                      <span className="font-mono" style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>
                        {formatDate(post.date)}
                      </span>
                    </div>
                  </div>
                  <ArrowRight size={14} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}

      <style>{`
        .blog-row:hover .blog-title { color: var(--accent-teal); }
        .blog-row:hover .blog-arrow { opacity: 1 !important; transform: translateX(0) !important; }
      `}</style>
    </section>
  );
}
