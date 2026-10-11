import {
  CONTACT_EMAIL,
  GITHUB_PORTFOLIO_REPO_URL,
  GITHUB_PROFILE_URL,
  LINKEDIN_URL,
  MAILTO_CONTACT,
  PERSON_NAME,
  SUBSTACK_URL,
  X_PROFILE_URL,
} from '@/lib/site';

const links = [
  { href: MAILTO_CONTACT, label: 'Email', external: false },
  { href: LINKEDIN_URL, label: 'LinkedIn', external: true },
  { href: GITHUB_PROFILE_URL, label: 'GitHub', external: true },
  { href: X_PROFILE_URL, label: 'X', external: true },
  { href: SUBSTACK_URL, label: 'Substack', external: true },
];

export default function Footer() {
  return (
    <footer role="contentinfo" style={{ borderTop: '1px solid var(--border)', padding: '2rem 1.5rem' }}>
      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1rem 2rem',
          flexWrap: 'wrap',
        }}
      >
        <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
          © 2026 {PERSON_NAME} ·{' '}
          <a href={MAILTO_CONTACT} className="text-link" style={{ fontSize: '0.8125rem', fontWeight: 400 }}>
            {CONTACT_EMAIL}
          </a>
        </p>
        <nav aria-label="Social links" style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
          {links.map(l => (
            <a
              key={l.label}
              href={l.href}
              className="text-link"
              style={{ fontSize: '0.8125rem', fontWeight: 400 }}
              {...(l.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              {l.label}
            </a>
          ))}
          <a
            href={GITHUB_PORTFOLIO_REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-link"
            style={{ fontSize: '0.8125rem', fontWeight: 400 }}
          >
            Source
          </a>
        </nav>
      </div>
    </footer>
  );
}
