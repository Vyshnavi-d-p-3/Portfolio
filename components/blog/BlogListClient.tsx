'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { BlogPost } from '@/lib/types';
import { formatDate } from '@/lib/date';
import { ArrowRight } from 'lucide-react';

export default function BlogListClient({ posts }: { posts: BlogPost[] }) {
  const allTags = Array.from(new Set(posts.flatMap(p => p.tags)));
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filtered = activeTag ? posts.filter(p => p.tags.includes(activeTag)) : posts;

  return (
    <>
      {allTags.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.3 }}
          style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem' }}
        >
          <button
            onClick={() => setActiveTag(null)}
            className="tag-pill"
            style={{
              cursor: 'pointer',
              border: `1px solid ${!activeTag ? 'var(--accent-teal)' : 'var(--border)'}`,
              color: !activeTag ? 'var(--accent-teal)' : 'var(--text-muted)',
              background: 'none',
            }}
          >
            all
          </button>
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag === activeTag ? null : tag)}
              className="tag-pill"
              style={{
                cursor: 'pointer',
                border: `1px solid ${activeTag === tag ? 'var(--accent-teal)' : 'var(--border)'}`,
                color: activeTag === tag ? 'var(--accent-teal)' : 'var(--text-muted)',
                background: 'none',
              }}
            >
              {tag}
            </button>
          ))}
        </motion.div>
      )}

      {filtered.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{
            padding: '2.5rem',
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border)',
            borderRadius: '12px',
            maxWidth: '480px',
          }}
        >
          <p className="font-mono" style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
            First post coming soon — building first, writing second.
          </p>
        </motion.div>
      ) : (
        <div style={{ maxWidth: '680px' }}>
          {filtered.map((post, i) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08, duration: 0.3 }}
            >
              <Link href={`/blog/${post.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
                <div
                  className="blog-list-item"
                  style={{
                    padding: '1.25rem 0',
                    borderBottom: '1px solid var(--border)',
                    cursor: 'pointer',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
                    <div style={{ flex: 1 }}>
                      <h2
                        className="blog-list-title"
                        style={{
                          fontSize: '1rem',
                          fontWeight: 500,
                          color: 'var(--text-primary)',
                          marginBottom: '0.375rem',
                          transition: 'color 0.2s',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.375rem',
                        }}
                      >
                        {post.title}
                        <span
                          className="blog-list-arrow"
                          style={{ opacity: 0, transform: 'translateX(-4px)', transition: 'opacity 0.15s, transform 0.15s', fontSize: '0.875rem' }}
                        >
                          →
                        </span>
                      </h2>
                      {post.description && (
                        <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '0.5rem' }}>
                          {post.description.slice(0, 120)}{post.description.length > 120 ? '…' : ''}
                        </p>
                      )}
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem', alignItems: 'center' }}>
                        <span className="font-mono" style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>
                          {formatDate(post.date)}
                        </span>
                        <span style={{ color: 'var(--border-hover)', fontSize: '0.6875rem' }}>·</span>
                        <span className="font-mono" style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>
                          {post.readingTime}
                        </span>
                        {post.tags.map(tag => (
                          <span key={tag} className="tag-pill">{tag}</span>
                        ))}
                      </div>
                    </div>
                    <ArrowRight size={14} style={{ color: 'var(--text-muted)', flexShrink: 0, marginTop: '3px' }} />
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      )}

      <style>{`
        .blog-list-item:hover .blog-list-title { color: var(--accent-teal); }
        .blog-list-item:hover .blog-list-arrow { opacity: 1 !important; transform: translateX(0) !important; }
      `}</style>
    </>
  );
}
