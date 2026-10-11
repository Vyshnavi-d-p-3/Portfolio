import { PROOF_STATS } from '@/lib/site';

export default function ProofStripSection() {
  return (
    <section
      aria-label="Highlights"
      style={{
        maxWidth: '1100px',
        margin: '0 auto',
        padding: '0 1.5rem 6rem',
      }}
    >
      <div className="proof-strip">
        {PROOF_STATS.map(stat => (
          <div key={stat.label} className="proof-strip-item">
            <p
              style={{
                fontSize: '1.75rem',
                fontWeight: 600,
                letterSpacing: '-0.035em',
                color: 'var(--text-primary)',
                lineHeight: 1.1,
                marginBottom: '0.375rem',
              }}
            >
              {stat.value}
            </p>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.125rem' }}>
              {stat.label}
            </p>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{stat.note}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
