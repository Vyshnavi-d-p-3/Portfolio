import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 — Vyshnavi D P',
  description: 'Page not found.',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section
      style={{
        maxWidth: '640px',
        margin: '0 auto',
        padding: '6rem 1.5rem',
        textAlign: 'center',
      }}
    >
      <div className="section-label" style={{ justifyContent: 'center', marginBottom: '1.5rem' }}>
        <span className="section-label-line" />
        404
      </div>
      <h1
        style={{
          fontSize: 'clamp(1.75rem, 4vw, 2.25rem)',
          fontWeight: 600,
          letterSpacing: '-0.025em',
          color: 'var(--text-primary)',
          marginBottom: '1rem',
        }}
      >
        Page not found
      </h1>
      <p
        style={{
          fontSize: '0.9375rem',
          color: 'var(--text-secondary)',
          lineHeight: 1.7,
          marginBottom: '2rem',
        }}
      >
        The page you&apos;re looking for moved or never existed.
      </p>
      <div style={{ display: 'inline-flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link href="/" className="btn-amber">back home</Link>
        <Link href="/projects" className="btn-outline">view projects</Link>
      </div>
    </section>
  );
}
