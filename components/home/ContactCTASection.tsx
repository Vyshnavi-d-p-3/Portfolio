import { ArrowRight, Download } from 'lucide-react';
import {
  CONTACT_EMAIL,
  MAILTO_CONTACT,
  PREFER_EMAIL_LINE,
  RESUME_PDF_DOWNLOAD_NAME,
  RESUME_PDF_PATH,
} from '@/lib/site';

export default function ContactCTASection() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-cta-heading"
      style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 1.5rem 4rem' }}
    >
      <div className="contact-panel">
        <div style={{ maxWidth: '560px' }}>
          <h2
            id="contact-cta-heading"
            style={{
              fontSize: 'clamp(1.5rem, 3.5vw, 2rem)',
              fontWeight: 600,
              letterSpacing: '-0.03em',
              lineHeight: 1.15,
              color: 'var(--text-primary)',
              marginBottom: '0.75rem',
            }}
          >
            Hiring for SWE or AI engineering?
          </h2>
          <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
            On STEM OPT, based in San Jose, open to Bay Area or remote. {PREFER_EMAIL_LINE}
          </p>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.75rem' }}>
          <a href={MAILTO_CONTACT} className="btn-amber" aria-label={`Email ${CONTACT_EMAIL}`}>
            Email me
            <ArrowRight size={15} />
          </a>
          <a href={RESUME_PDF_PATH} download={RESUME_PDF_DOWNLOAD_NAME} className="btn-outline">
            <Download size={14} />
            Resume
          </a>
        </div>
      </div>
    </section>
  );
}
