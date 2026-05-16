'use client';

import { motion } from 'framer-motion';
import { Download, ExternalLink } from 'lucide-react';
import {
  CONTACT_EMAIL,
  GITHUB_PROFILE_URL,
  LINKEDIN_URL,
  MAILTO_CONTACT,
  SUBSTACK_URL,
  X_PROFILE_URL,
  RESUME_PDF_DOWNLOAD_NAME,
  RESUME_PDF_PATH,
} from '@/lib/site';

const section = (title: string) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', marginTop: '2.5rem' }}>
    <span style={{ display: 'block', height: 1, width: 16, background: 'var(--accent-teal)' }} />
    <h2
      className="font-mono"
      style={{ fontSize: '0.6875rem', color: 'var(--accent-teal)', textTransform: 'uppercase', letterSpacing: '0.16em' }}
    >
      {title}
    </h2>
    <span style={{ display: 'block', height: 1, flex: 1, background: 'var(--border-hover)' }} />
  </div>
);

export default function ResumeClient() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '3rem 1.5rem 5rem' }}>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '2.5rem' }}>
          <div>
            <h1
              style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', fontWeight: 600, letterSpacing: '-0.025em', color: 'var(--text-primary)', marginBottom: '0.375rem' }}
            >
              Vyshnavi D P
            </h1>
            <p
              className="font-mono"
              style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}
            >
              Software Engineer · San Jose, CA
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
              {[
                { label: 'x.com/Vyshu_DP', href: X_PROFILE_URL, external: true },
                { label: CONTACT_EMAIL, href: MAILTO_CONTACT, external: false },
                { label: 'linkedin.com/in/vyshnavi-dp', href: LINKEDIN_URL, external: true },
                { label: 'substack.com/@vyshudp', href: SUBSTACK_URL, external: true },
                { label: 'github.com/Vyshnavi-d-p-3', href: GITHUB_PROFILE_URL, external: true },
                { label: 'vyshnavi.dev', href: 'https://vyshnavi.dev', external: true },
              ].map(l => (
                <a
                  key={l.label}
                  href={l.href}
                  {...(l.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="font-mono"
                  style={{ fontSize: '0.6875rem', color: 'var(--accent-teal)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                >
                  {l.label}
                  {l.external ? <ExternalLink size={10} /> : null}
                </a>
              ))}
            </div>
          </div>

          <a
            href={RESUME_PDF_PATH}
            download={RESUME_PDF_DOWNLOAD_NAME}
            className="btn-amber"
            style={{ alignSelf: 'flex-start' }}
          >
            <Download size={14} />
            download PDF
          </a>
        </div>

        <div style={{ borderTop: '1px solid var(--border)', marginBottom: '0.5rem' }} />

        {section('Education')}
        <div style={{ marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.25rem', marginBottom: '0.25rem' }}>
            <span style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--text-primary)' }}>San Jose State University</span>
            <span className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Aug 2024 — May 2026</span>
          </div>
          <span className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.25rem' }}>
            MS Computer Science · CGPA: 3.8/4.0
          </span>
          <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
            Distributed Systems, ML/NLP, Adversarial Machine Learning, Database Systems
          </span>
        </div>

        {section('Experience')}

        {[
          {
            company: 'Accenture',
            project: 'Dell SupportAssist',
            role: 'Software Engineer',
            period: 'Jun 2021 — Jul 2024',
            bullets: [
              'Built real-time diagnostic platform serving 2M+ Dell devices using Angular 14, C# .NET, and WebSocket',
              'Reduced diagnostic resolution time by 35% via parallel diagnostic execution pipeline and smart caching',
              'Cut bundle size 40% via lazy loading, tree-shaking, and module federation across micro-frontends',
              'Owned full SDLC for 4 major features: technical design → dev → QA → production rollout',
              'Mentored 3 junior engineers; introduced PR review standards and component documentation practices',
            ],
            tech: ['Angular', 'C# .NET', 'WebSocket', 'Azure DevOps', 'PostgreSQL'],
          },
          {
            company: 'TCS',
            project: 'Optumera',
            role: 'Software Engineer',
            period: 'Aug 2018 — May 2021',
            bullets: [
              'Developed enterprise retail analytics SaaS for Fortune 500 clients using Angular 9 and Spring Boot',
              'Implemented virtual scrolling for 100K+ SKU inventory tables; reduced response time from 800ms to 120ms',
              'Built Redis-backed caching layer for frequently accessed analytics dashboards (80% cache hit rate)',
              'Integrated Spring Batch for nightly ETL pipelines processing 50M+ retail transactions',
              'Delivered REST APIs for client-facing analytics endpoints used by 3 enterprise retailers',
            ],
            tech: ['Angular', 'Spring Boot', 'Redis', 'PostgreSQL', 'Spring Batch'],
          },
        ].map(exp => (
          <div key={exp.company} style={{ marginBottom: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.25rem', marginBottom: '0.1rem' }}>
              <div>
                <span style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--text-primary)' }}>{exp.company}</span>
                <span style={{ fontSize: '0.875rem', color: 'var(--accent-teal)', marginLeft: '0.5rem' }}>— {exp.project}</span>
              </div>
              <span className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{exp.period}</span>
            </div>
            <span className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.625rem' }}>
              {exp.role}
            </span>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
              {exp.bullets.map((b, i) => (
                <li key={i} style={{ fontSize: '0.8375rem', color: 'var(--text-secondary)', display: 'flex', gap: '0.5rem', lineHeight: 1.6 }}>
                  <span style={{ color: 'var(--accent-teal)', flexShrink: 0, marginTop: '0.25rem', fontSize: '0.625rem' }}>▸</span>
                  {b}
                </li>
              ))}
            </ul>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem', marginTop: '0.75rem' }}>
              {exp.tech.map(t => (
                <span key={t} className="tag-pill">{t}</span>
              ))}
            </div>
          </div>
        ))}

        {section('Projects')}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.875rem' }}>
          {[
            { name: 'Sentinel', desc: 'AI code review assistant with reproducible eval harness. 100 hand-labeled PRs, P/R/F1 per category.', tech: ['Next.js', 'FastAPI', 'pgvector', 'Claude API'] },
            { name: 'Kairos', desc: 'Multi-tenant OKR platform. Postgres RLS, partitioned audit logs, real-time SSE dashboards.', tech: ['Next.js', 'Spring Boot', 'Postgres RLS', 'Redis'] },
            { name: 'Helios', desc: 'Distributed time-series DB from scratch. LSM-tree, Raft replication, PromQL, anomaly detection.', tech: ['Go', 'gRPC', 'Raft', 'Gorilla'] },
            { name: 'NeuroLens', desc: 'Multimodal adversarial robustness toolkit. Novel cross-modal attack, arXiv preprint.', tech: ['PyTorch', 'FGSM', 'PGD', 'CLIP'] },
          ].map(p => (
            <div
              key={p.name}
              style={{
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border)',
                borderRadius: '10px',
                padding: '0.875rem 1rem',
              }}
            >
              <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)', display: 'block', marginBottom: '0.3rem' }}>{p.name}</span>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '0.5rem' }}>{p.desc}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
                {p.tech.map(t => <span key={t} className="tag-pill">{t}</span>)}
              </div>
            </div>
          ))}
        </div>

        {section('Skills')}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.875rem' }}>
          {[
            { cat: 'Languages', items: 'TypeScript, Go, Python, Java, C#, SQL' },
            { cat: 'Frontend', items: 'React, Next.js, Angular, Tailwind CSS' },
            { cat: 'Backend', items: 'Spring Boot, FastAPI, gRPC, Node.js' },
            { cat: 'Data / Infra', items: 'PostgreSQL, Redis, Docker, GitHub Actions' },
            { cat: 'AI / ML', items: 'PyTorch, LLM/RAG, pgvector, W&B' },
            { cat: 'Concepts', items: 'Distributed systems, RLS, LSM-tree, Raft' },
          ].map(s => (
            <div key={s.cat}>
              <span className="font-mono" style={{ fontSize: '0.625rem', color: 'var(--accent-teal)', textTransform: 'uppercase', letterSpacing: '0.12em', display: 'block', marginBottom: '0.25rem' }}>
                {s.cat}
              </span>
              <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>{s.items}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
