const experiences = [
  {
    period: 'Aug 2021 — Jul 2024',
    company: 'Dell Technologies',
    context: 'SupportAssist · via Accenture',
    role: 'Senior Software Engineer',
    highlights: [
      "C#/.NET microservices for Dell's preinstalled PC health platform: hardware diagnostics and scan orchestration.",
      'Catalog-driven BIOS, driver, and firmware update delivery with signature and hash verification.',
      'Telemetry-driven predictive failure detection for batteries and storage drives.',
      'In-app AI Virtual Assistant with device-context injection and assistant-triggered actions.',
      'Re-architected long-running scan status from client polling to WebSocket push with resumable progress state.',
    ],
  },
  {
    period: 'Jun 2018 — Aug 2021',
    company: 'TCS',
    context: 'Enterprise AI retail optimization',
    role: 'Software Engineer',
    highlights: [
      'Java Spring Boot microservices for constraint-based space optimization across 1,400+ stores and 1,000+ parameters.',
      'Distributed search with Redis caching sustaining sub-200ms P95 across 2M+ SKU records.',
      'Multi-tenant OAuth2 SSO with tenant-scoped claims across product modules.',
      'Virtualized dashboard rendering for 100K+ SKU tables (~800ms to ~120ms).',
    ],
  },
];

const education = {
  period: '2024 — 2026',
  school: 'San Jose State University',
  degree: 'M.S. Software Engineering',
  note: 'Graduate research in agentic AI systems — planner-executor agents evaluated on tool-call accuracy, schema adherence, and error recovery.',
};

function Row({ period, children }: { period: string; children: React.ReactNode }) {
  return (
    <div className="experience-row">
      <p className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)', paddingTop: '0.2rem' }}>
        {period}
      </p>
      <div>{children}</div>
    </div>
  );
}

export default function ExperienceSection() {
  return (
    <section
      id="experience"
      style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 1.5rem 6rem' }}
      aria-labelledby="experience-heading"
    >
      <h2
        id="experience-heading"
        style={{ fontSize: '1.5rem', fontWeight: 600, letterSpacing: '-0.025em', color: 'var(--text-primary)', marginBottom: '1.75rem' }}
      >
        Experience
      </h2>

      <div style={{ borderTop: '1px solid var(--border-hover)' }}>
        {experiences.map(exp => (
          <Row key={exp.company} period={exp.period}>
            <h3 style={{ fontSize: '1.0625rem', fontWeight: 600, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>
              {exp.role}
              <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}> · {exp.company}</span>
            </h3>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginTop: '0.125rem', marginBottom: '0.875rem' }}>
              {exp.context}
            </p>
            <ul className="experience-list">
              {exp.highlights.map(h => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          </Row>
        ))}

        <Row period={education.period}>
          <h3 style={{ fontSize: '1.0625rem', fontWeight: 600, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>
            {education.degree}
            <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}> · {education.school}</span>
          </h3>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginTop: '0.375rem', maxWidth: '640px' }}>
            {education.note}
          </p>
        </Row>
      </div>
    </section>
  );
}
