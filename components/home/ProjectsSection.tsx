'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Github } from 'lucide-react';
import { projects, statusBadgeClass } from '@/lib/projects';

function ProjectCard({ project, index }: { project: (typeof projects)[0]; index: number }) {
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
      <article
        className="card-project"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => {
          setHovered(false);
          setTilt({ x: 0, y: 0 });
        }}
        style={{
          transform: hovered
            ? `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(-2px)`
            : 'perspective(800px) rotateX(0) rotateY(0) translateY(0)',
          transition: hovered
            ? 'transform 0.1s ease, border-color 0.25s, box-shadow 0.25s'
            : 'transform 0.3s ease, border-color 0.25s, box-shadow 0.25s',
        }}
      >
        <Link
          href={`/projects/${project.slug}`}
          style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column', gap: '0.75rem', flex: 1 }}
          aria-label={`View ${project.name} case study`}
        >
          <motion.div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
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
            <span className={`status-badge ${statusBadgeClass(project.status)}`}>
              {project.status}
            </span>
          </motion.div>

          <motion.div>
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
          </motion.div>

          <motion.div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem', marginTop: 'auto' }}>
            {project.primaryTech.map(t => (
              <span key={t} className="tag-pill tag-pill-primary">
                {t}
              </span>
            ))}
          </motion.div>
        </Link>

        <motion.div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '0.625rem',
            marginTop: '0.25rem',
            borderTop: '1px solid var(--border)',
          }}
        >
          <Link
            href={`/projects/${project.slug}`}
            className="font-mono"
            style={{
              fontSize: '0.6875rem',
              color: 'var(--accent-teal)',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.25rem',
            }}
          >
            case study
            <ArrowRight size={11} />
          </Link>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono"
              style={{
                fontSize: '0.6875rem',
                color: 'var(--text-muted)',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.25rem',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.color = 'var(--accent-teal)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = 'var(--text-muted)';
              }}
              aria-label={`${project.name} on GitHub`}
            >
              <Github size={11} />
              repo
            </a>
          )}
        </motion.div>
      </article>
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
        <motion.div className="section-label">
          <span className="section-label-line" />
          featured work
        </motion.div>
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

      <motion.div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1rem',
        }}
      >
        {projects.map((project, i) => (
          <ProjectCard key={project.slug} project={project} index={i} />
        ))}
      </motion.div>
    </section>
  );
}
