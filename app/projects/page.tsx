import type { Metadata } from 'next';
import ProjectsListClient from '@/components/projects/ProjectsListClient';
import { KAIROS_TAGLINE_SHORT } from '@/lib/projects';

export const metadata: Metadata = {
  title: 'Projects — Vyshnavi D P',
  description: `Five open-source projects: Sentinel (AI code review with eval harness), Kairos (${KAIROS_TAGLINE_SHORT}), Helios (Go time-series DB), NeuroLens (adversarial ML research), Archon (autonomous agent with a statistical eval harness). Each built to prove something real.`,
  alternates: { canonical: '/projects' },
  openGraph: {
    title: 'Projects — Vyshnavi D P',
    description: 'Five projects, five hard problems. Backend systems, AI evaluation, agent reliability, applied ML research.',
    url: 'https://vyshnavi.dev/projects',
  },
};

export default function ProjectsPage() {
  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '4rem 1.5rem' }}>
      <div style={{ marginBottom: '3rem' }}>
        <div className="section-label">
          <span className="section-label-line" />
          work
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
          Projects
        </h1>
        <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', maxWidth: '480px', lineHeight: 1.7 }}>
          Five projects, five hard problems. Each one built to prove something real about systems design, AI evaluation, agent reliability, or distributed computing.
        </p>
      </div>

      <ProjectsListClient />
    </div>
  );
}
