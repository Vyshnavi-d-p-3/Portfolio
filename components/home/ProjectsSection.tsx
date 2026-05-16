'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { projects, statusBadgeClass } from '@/lib/projects';

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    const y = ((e.clientX - rect.left) / rect.width - 0.5) * -2;
    setTilt({ x, y });
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.12 }}
    >
      <Link
        href={`/projects/${project.slug}`}
        style={{ textDecoration: 'none', display: 'block' }}
        tabIndex={0}
        aria-label={`View ${project.name} project`}
      >
        <article
          className="card-project"
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => { setHovered(false); setTilt({ x: 0, y: 0 }); }}
          style={{
            transform: hovered
              ? `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(-2px)`
              : 'perspective(800px) rotateX(0) rotateY(0) translateY(0)',
            transition: hovered ? 'transform 0.1s ease, border-color 0.25s, box-shadow 0.25s' : 'transform 0.3s ease, border-color 0.25s, box-shadow 0.25s',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <span
              className="font-mono"
              style={{
                fontSize: '0.6875rem',
                color: hovered ? 'var(--accent-teal)' : 'var(--text-muted)',
                transition: 'color 0.25s',
              }}
            >
              {project.number}
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span className={`status-badge ${statusBadgeClass(project.status)}`}>
                {project.status}
              </span>
              <motion.div
                animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : -6 }}
                transition={{ duration: 0.2 }}
              >
                <ArrowRight size={14} style={{ color: 'var(--accent-teal)' }} />
              </motion.div>
            </div>
          </div>

          <div>
            <h3
              style={{
                fontSize: '1.0625rem',
                fontWeight: 600,
                letterSpacing: '-0.01em',
                color: 'var(--text-primary)',
                marginBottom: '0.25rem',
              }}
            >
              {project.name}
            </h3>
            <p
              style={{
                fontSize: '0.8125rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.6,
              }}
            >
              {project.description}
            </p>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem', marginTop: 'auto' }}>
            {project.tech.slice(0, 5).map(t => (
              <span key={t} className="tag-pill">{t}</span>
            ))}
          </div>
        </article>
      </Link>
    </motion.div>
  );
}

export default function ProjectsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      style={{
        maxWidth: '1100px',
        margin: '0 auto',
        padding: '0 1.5rem 5rem',
      }}
      aria-labelledby="projects-heading"
    >
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 12 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4 }}
      >
        <div className="section-label">
          <span className="section-label-line" />
          featured work
        </div>
        <h2
          id="projects-heading"
          style={{
            fontSize: '1.5rem',
            fontWeight: 600,
            letterSpacing: '-0.02em',
            color: 'var(--text-primary)',
            marginBottom: '2rem',
          }}
        >
          Projects
        </h2>
      </motion.div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1rem',
        }}
      >
        {projects.map((project, i) => (
          <ProjectCard key={project.slug} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
