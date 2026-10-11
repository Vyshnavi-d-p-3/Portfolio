import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Github } from 'lucide-react';
import { getProject, type Project } from '@/lib/projects';
import { GITHUB_PROFILE_URL } from '@/lib/site';

const FEATURED_SLUGS = ['archon', 'sentinel'];
const MORE_SLUGS = ['kairos', 'helios', 'neurolens'];

/** Side build without a case study — links straight to the repo. */
const EXTRA_REPO = {
  name: 'AdaptiveRateGuard',
  pitch: 'Distributed rate limiter in Go with a gradient-boosting predictor sidecar.',
  tech: 'Go · Redis · gRPC',
  href: 'https://github.com/Vyshnavi-d-p-3/AdaptiveRateGuard',
};

function pick(slugs: string[]): Project[] {
  return slugs.map(getProject).filter((p): p is Project => Boolean(p));
}

/** Keep deliberate honesty markers (e.g. "single-node stable"); drop generic "public"/"MIT". */
function scopeNote(status: string): string | null {
  const parts = status
    .split('·')
    .map(s => s.trim())
    .filter(s => s && s !== 'public' && s !== 'MIT');
  return parts.length ? parts.join(' · ') : null;
}

function FeaturedCard({ project }: { project: Project }) {
  return (
    <article className="featured-card">
      <p className="font-mono" style={{ fontSize: '0.6875rem', color: 'var(--accent-teal)', marginBottom: '0.75rem' }}>
        {project.category}
      </p>
      <h3 style={{ fontSize: '1.375rem', fontWeight: 600, letterSpacing: '-0.025em', color: 'var(--text-primary)', marginBottom: '0.625rem' }}>
        <Link href={`/projects/${project.slug}`} className="card-title-link">
          {project.name}
        </Link>
      </h3>
      <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: '1.5rem' }}>
        {project.description}
      </p>

      {project.results.length > 0 && (
        <dl className="featured-results" style={{ marginTop: 'auto' }}>
          {project.results.slice(0, 3).map(r => (
            <div key={r.label}>
              <dt style={{ fontSize: '1.125rem', fontWeight: 600, letterSpacing: '-0.02em', color: 'var(--text-primary)', lineHeight: 1.2 }}>
                {r.value}
              </dt>
              <dd style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>{r.label}</dd>
            </div>
          ))}
        </dl>
      )}

      <div
        style={{
          paddingTop: '1.25rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          flexWrap: 'wrap',
        }}
      >
        <span className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          {project.tech.slice(0, 4).join(' · ')}
        </span>
        <span style={{ display: 'flex', gap: '1rem' }}>
          <Link href={`/projects/${project.slug}`} className="text-link" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
            Case study <ArrowRight size={14} />
          </Link>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-link"
              aria-label={`${project.name} on GitHub`}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}
            >
              <Github size={14} /> Code
            </a>
          )}
        </span>
      </div>
    </article>
  );
}

function ListRow({
  name,
  pitch,
  meta,
  href,
  external,
}: {
  name: string;
  pitch: string;
  meta: string;
  href: string;
  external?: boolean;
}) {
  const content = (
    <>
      <span style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--text-primary)' }}>{name}</span>
      <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>{pitch}</span>
      <span className="font-mono project-row-meta" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
        {meta}
      </span>
      <span className="project-row-arrow" aria-hidden>
        {external ? <ArrowUpRight size={16} /> : <ArrowRight size={16} />}
      </span>
    </>
  );

  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className="project-row">
      {content}
    </a>
  ) : (
    <Link href={href} className="project-row">
      {content}
    </Link>
  );
}

export default function ProjectsSection() {
  const featured = pick(FEATURED_SLUGS);
  const more = pick(MORE_SLUGS);

  return (
    <section
      id="work"
      style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 1.5rem 6rem' }}
      aria-labelledby="projects-heading"
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '1rem', marginBottom: '1.75rem' }}>
        <h2 id="projects-heading" style={{ fontSize: '1.5rem', fontWeight: 600, letterSpacing: '-0.025em', color: 'var(--text-primary)' }}>
          Selected work
        </h2>
        <Link href="/projects" className="text-link" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
          All projects <ArrowRight size={14} />
        </Link>
      </div>

      <div className="featured-grid">
        {featured.map(p => (
          <FeaturedCard key={p.slug} project={p} />
        ))}
      </div>

      <div style={{ marginTop: '2.5rem' }}>
        <p className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
          more systems
        </p>
        <div style={{ borderTop: '1px solid var(--border-hover)' }}>
          {more.map(p => {
            const note = scopeNote(p.status);
            const meta = [p.primaryTech.slice(0, 2).join(' · '), note].filter(Boolean).join(' — ');
            return <ListRow key={p.slug} name={p.name} pitch={p.pitch} meta={meta} href={`/projects/${p.slug}`} />;
          })}
          <ListRow name={EXTRA_REPO.name} pitch={EXTRA_REPO.pitch} meta={EXTRA_REPO.tech} href={EXTRA_REPO.href} external />
        </div>
        <a
          href={GITHUB_PROFILE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-link"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', marginTop: '1rem' }}
        >
          Everything on GitHub <ArrowUpRight size={14} />
        </a>
      </div>
    </section>
  );
}
