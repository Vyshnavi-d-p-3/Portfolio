import type { Metadata } from 'next';
import ProjectsListClient from '@/components/projects/ProjectsListClient';

export const metadata: Metadata = {
  title: 'Projects — Vyshnavi D P',
  description: 'Four production-grade projects: Sentinel (AI code review), Kairos (OKR platform), Helios (distributed TSDB), NeuroLens (adversarial ML). Each built to prove something real.',
  openGraph: {
    title: 'Projects — Vyshnavi D P',
    description: 'Four projects, four hard problems. Systems design, AI evaluation, distributed computing.',
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
          Four projects, four hard problems. Each one built to prove something real about systems design, AI evaluation, or distributed computing.
        </p>
      </div>

      <ProjectsListClient />
    </div>
  );
}
