import type { Metadata } from 'next';
import { getBlogPosts } from '@/lib/blog';
import BlogListClient from '@/components/blog/BlogListClient';

export const metadata: Metadata = {
  title: 'Blog — Vyshnavi D P',
  description: 'Writing about distributed systems, AI evaluation, and the craft of building production software.',
};

export default function BlogPage() {
  const posts = getBlogPosts(false);

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '4rem 1.5rem' }}>
      <div style={{ marginBottom: '3rem' }}>
        <div className="section-label">
          <span className="section-label-line" />
          writing
        </div>
        <h1
          style={{
            fontSize: 'clamp(1.75rem, 4vw, 2.25rem)',
            fontWeight: 600,
            letterSpacing: '-0.025em',
            color: 'var(--text-primary)',
            marginBottom: '0.75rem',
          }}
        >
          Blog
        </h1>
        <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', maxWidth: '440px', lineHeight: 1.7 }}>
          Writing about distributed systems, AI evaluation, and the craft of building production software.
        </p>
      </div>

      <BlogListClient posts={posts} />
    </div>
  );
}
