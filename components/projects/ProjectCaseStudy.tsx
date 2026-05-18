'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { ArrowLeft, ExternalLink, Github, FileText } from 'lucide-react';
import { Project, statusBadgeClass } from '@/lib/projects';

function ReadingProgress() {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const handler = () => {
      const doc = document.documentElement;
      const scrolled = doc.scrollTop;
      const total = doc.scrollHeight - doc.clientHeight;
      setWidth(total > 0 ? (scrolled / total) * 100 : 0);
    };
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);
  return <div className="reading-progress" style={{ width: `${width}%` }} />;
}

function Section({ children, id }: { children: React.ReactNode; id?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.section
      ref={ref}
      id={id}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4 }}
      style={{ marginBottom: '3rem' }}
    >
      {children}
    </motion.section>
  );
}

const sectionHeadingStyle: React.CSSProperties = {
  fontSize: '1.125rem',
  fontWeight: 600,
  letterSpacing: '-0.01em',
  color: 'var(--text-primary)',
  marginBottom: '1rem',
  paddingLeft: '0.875rem',
  borderLeft: '3px solid var(--accent-teal)',
};

export default function ProjectCaseStudy({ project }: { project: Project }) {
  return (
    <>
      <ReadingProgress />
      <div style={{ maxWidth: '780px', margin: '0 auto', padding: '3rem 1.5rem 5rem' }}>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Link
            href="/projects"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.375rem',
              color: 'var(--text-muted)',
              textDecoration: 'none',
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.8125rem',
              marginBottom: '2rem',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent-teal)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
          >
            <ArrowLeft size={14} />
            back to projects
          </Link>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.25rem' }}>
            <span className={`status-badge ${statusBadgeClass(project.status)}`}>
              {project.status}
            </span>
            <span
              className="font-mono"
              style={{ fontSize: '0.5625rem', color: 'var(--text-muted)', background: 'var(--bg-tertiary)', padding: '2px 8px', borderRadius: '4px', border: '1px solid var(--border)' }}
            >
              {project.category}
            </span>
            {project.period && (
              <span
                className="font-mono"
                style={{ fontSize: '0.5625rem', color: 'var(--text-muted)', background: 'var(--bg-tertiary)', padding: '2px 8px', borderRadius: '4px', border: '1px solid var(--border)' }}
              >
                {project.period}
              </span>
            )}
          </div>

          <h1
            style={{
              fontSize: 'clamp(1.75rem, 4vw, 1.875rem)',
              fontWeight: 600,
              letterSpacing: '-0.025em',
              color: 'var(--text-primary)',
              marginBottom: '0.75rem',
            }}
          >
            {project.name}
          </h1>

          <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1.5rem', maxWidth: '560px' }}>
            {project.pitch}
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.625rem', marginBottom: '2.5rem' }}>
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.375rem',
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.75rem',
                  color: 'var(--accent-teal)',
                  border: '1px solid rgba(45,212,168,0.3)',
                  padding: '4px 12px',
                  borderRadius: '6px',
                  textDecoration: 'none',
                  transition: 'background 0.2s',
                }}
              >
                <Github size={12} /> github
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.375rem',
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.75rem',
                  color: 'var(--accent-teal)',
                  border: '1px solid rgba(45,212,168,0.3)',
                  padding: '4px 12px',
                  borderRadius: '6px',
                  textDecoration: 'none',
                }}
              >
                <ExternalLink size={12} /> live demo
              </a>
            )}
            {project.paper && (
              <a
                href={project.paper}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.375rem',
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.75rem',
                  color: '#a855f7',
                  border: '1px solid rgba(168,85,247,0.3)',
                  padding: '4px 12px',
                  borderRadius: '6px',
                  textDecoration: 'none',
                }}
              >
                <FileText size={12} /> arXiv paper
              </a>
            )}
          </div>

          <div style={{ borderTop: '1px solid var(--border)', marginBottom: '2rem' }} />

          {project.results.length > 0 && (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '0.75rem',
                marginBottom: '2.5rem',
              }}
            >
              {project.results.map((r, i) => (
                <div
                  key={i}
                  style={{
                    backgroundColor: 'var(--bg-secondary)',
                    border: '1px solid var(--border)',
                    borderRadius: '10px',
                    padding: '1rem',
                    textAlign: 'center',
                  }}
                >
                  <span
                    className="font-mono"
                    style={{
                      fontSize: '0.5625rem',
                      color: 'var(--text-muted)',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      display: 'block',
                      marginBottom: '0.375rem',
                    }}
                  >
                    {r.label}
                  </span>
                  <span
                    style={{
                      fontSize: '1.375rem',
                      fontWeight: 600,
                      color: 'var(--accent-teal)',
                      letterSpacing: '-0.03em',
                      display: 'block',
                    }}
                  >
                    {r.value}
                  </span>
                  {r.note && (
                    <span
                      style={{
                        fontSize: '0.6875rem',
                        color: 'var(--text-muted)',
                        marginTop: '0.25rem',
                        display: 'block',
                        lineHeight: 1.4,
                      }}
                    >
                      {r.note}
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </motion.div>

        <Section id="problem">
          <h2 style={sectionHeadingStyle}>The problem</h2>
          <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
            {project.problem}
          </p>
        </Section>

        <Section id="architecture">
          <h2 style={sectionHeadingStyle}>{project.architectureTitle ?? 'Architecture'}</h2>
          {project.architecture.includes(' → ') ? (
            <motion.div
              className="terminal-block"
              style={{
                borderRadius: '10px',
                padding: '1.25rem',
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.8125rem',
                lineHeight: 1.8,
                color: '#9ca3af',
              }}
            >
              <div style={{ display: 'flex', gap: '6px', marginBottom: '0.875rem' }}>
                <span style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#ff5f57', display: 'block' }} />
                <span style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#febc2e', display: 'block' }} />
                <span style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#28c840', display: 'block' }} />
              </div>
              {project.architecture.split(' → ').map((part, i, arr) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ color: i % 2 === 0 ? '#2dd4a8' : '#9ca3af' }}>{part}</span>
                  {i < arr.length - 1 && <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>→</span>}
                </div>
              ))}
            </motion.div>
          ) : (
            <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
              {project.architecture}
            </p>
          )}
        </Section>

        <Section id="decisions">
          <h2 style={sectionHeadingStyle}>Key decisions</h2>
          <div
            style={{
              border: '1px solid var(--border)',
              borderRadius: '10px',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1.5fr',
                padding: '0.625rem 1rem',
                borderBottom: '1px solid var(--border)',
                backgroundColor: 'var(--bg-tertiary)',
              }}
            >
              {['DECISION', 'CHOICE', 'WHY'].map(h => (
                <span
                  key={h}
                  className="font-mono"
                  style={{ fontSize: '0.625rem', color: 'var(--accent-teal)', letterSpacing: '0.1em' }}
                >
                  {h}
                </span>
              ))}
            </div>
            {project.decisions.map((d, i) => (
              <div
                key={i}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr 1.5fr',
                  padding: '0.875rem 1rem',
                  borderBottom: i < project.decisions.length - 1 ? '1px solid var(--border)' : 'none',
                  gap: '1rem',
                  alignItems: 'start',
                }}
              >
                <span style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-primary)' }}>
                  {d.decision}
                </span>
                <span className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--accent-teal)' }}>
                  {d.choice}
                </span>
                <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  {d.why}
                </span>
              </div>
            ))}
          </div>
        </Section>

        {project.statusNote && (
          <Section id="status">
            <h2 style={sectionHeadingStyle}>Status</h2>
            <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
              {project.statusNote}
            </p>
          </Section>
        )}

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid var(--border)' }}>
          {project.tech.map(t => (
            <span key={t} className={`tag-pill ${project.primaryTech.includes(t) ? 'tag-pill-primary' : ''}`}>
              {t}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}
