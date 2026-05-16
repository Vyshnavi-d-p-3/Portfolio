'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { projects, statusBadgeClass } from '@/lib/projects';

export default function ProjectsListClient() {
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '1rem',
      }}
    >
      {projects.map((project, i) => (
        <motion.div
          key={project.slug}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: i * 0.1 }}
        >
          <Link
            href={`/projects/${project.slug}`}
            style={{ textDecoration: 'none', display: 'block' }}
            aria-label={`View ${project.name} project details`}
          >
            <article
              className="card-project"
              onMouseEnter={() => setHoveredSlug(project.slug)}
              onMouseLeave={() => setHoveredSlug(null)}
              style={{ minHeight: '220px' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <span
                  className="font-mono"
                  style={{
                    fontSize: '0.6875rem',
                    color: hoveredSlug === project.slug ? 'var(--accent-teal)' : 'var(--text-muted)',
                    transition: 'color 0.25s',
                  }}
                >
                  {project.number}
                </span>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <span className={`status-badge ${statusBadgeClass(project.status)}`}>
                    {project.status}
                  </span>
                  <span
                    className="font-mono"
                    style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', background: 'var(--bg-tertiary)', padding: '2px 8px', borderRadius: '4px', border: '1px solid var(--border)' }}
                  >
                    {project.category}
                  </span>
                </div>
              </div>

              <div>
                <h2 style={{ fontSize: '1.125rem', fontWeight: 600, letterSpacing: '-0.01em', color: 'var(--text-primary)', marginBottom: '0.375rem' }}>
                  {project.name}
                </h2>
                <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  {project.pitch}
                </p>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem', marginTop: 'auto' }}>
                {project.primaryTech.map(t => (
                  <span key={t} className="tag-pill tag-pill-primary">{t}</span>
                ))}
                {project.tech.filter(t => !project.primaryTech.includes(t)).slice(0, 3).map(t => (
                  <span key={t} className="tag-pill">{t}</span>
                ))}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                <span className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--accent-teal)' }}>
                  read case study
                </span>
                <ArrowRight size={13} style={{ color: 'var(--accent-teal)' }} />
              </div>
            </article>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
