/** Display name — single source of truth for titles, JSON-LD, and UI. */
export const PERSON_NAME = 'Vyshnavi DP' as const;

/** Public contact and profile URLs — single source of truth for the site. */
export const CONTACT_EMAIL = 'vyshnavi.dyvandinnepullareddy@gmail.com' as const;
export const MAILTO_CONTACT = `mailto:${CONTACT_EMAIL}` as const;
/** Preferred order for outreach: X → email → LinkedIn → Substack (see footer). */
export const X_PROFILE_URL = 'https://x.com/Vyshu_DP' as const;
export const SUBSTACK_URL = 'https://substack.com/@vyshudp' as const;
export const LINKEDIN_URL = 'https://www.linkedin.com/in/vyshnavi-dp/' as const;
export const GITHUB_PROFILE_URL = 'https://github.com/Vyshnavi-d-p-3' as const;
export const GITHUB_PORTFOLIO_REPO_URL = 'https://github.com/Vyshnavi-d-p-3/Portfolio' as const;

/** Default resume PDF in /public — replace the file to update downloads site-wide. */
export const RESUME_PDF_PATH = '/resume.pdf' as const;
export const RESUME_PDF_DOWNLOAD_NAME = 'Vyshnavi_DP_Resume.pdf' as const;

/** Total industry / paid work experience — keep in sync with resume (Jun 2018 – Jul 2024 ≈ 6 yrs). */
export const WORK_EXPERIENCE_YEARS_TEXT = '6 years' as const;

/** Degree + school — single source of truth. Update here, propagates everywhere. */
export const DEGREE_LONG = 'MS Software Engineering' as const;
export const DEGREE_SHORT = 'MS SE' as const;
export const SCHOOL = 'San Jose State University' as const;
export const SCHOOL_SHORT = 'SJSU' as const;
export const GRADUATION_TEXT = 'May 2026' as const;
/** Degree is completed as of May 2026 — always past/neutral tense, never future-tense. */
export const EDUCATION_LINE = 'M.S. Software Engineering, SJSU — May 2026' as const;

export const SITE_TAGLINE =
  'AI agent workflows and evals on production-grade full-stack systems.' as const;

/** Meta/OG description — single source for layout + home metadata. */
export const SITE_DESCRIPTION =
  'Currently building AI agent workflow evals (Archon, Sentinel). 6+ years of production engineering at Dell Technologies (via Accenture) and TCS — full stack across Python, TypeScript, and Java. M.S. Software Engineering, SJSU (May 2026). Open to SWE & AI engineering roles.' as const;

/**
 * Homepage hero headline — lead with the differentiator: agent workflows + evals,
 * grounded by production full-stack experience. "Currently building" framing is
 * work (open source + research), never an employer claim.
 */
export const HERO_HEADLINE = {
  line1: 'I build and evaluate AI agent workflows',
  line2: 'on production-grade full-stack systems.',
} as const;

/**
 * Homepage proof strip — only high-signal, locked claims.
 * GPA omitted: with 6+ years US experience it is not a hiring signal;
 * actual CGPA is 3.57/4.0 and lives on the resume education line only.
 * "Public project count" omitted: redundant with the hero + projects grid.
 */
export const PROOF_STATS = [
  { value: WORK_EXPERIENCE_YEARS_TEXT, label: 'industry experience', note: 'Dell · TCS' },
  { value: '10M+', label: 'Dell PCs', note: 'SupportAssist platform' },
  { value: '2M+', label: 'active devices', note: 'services I owned · SupportAssist' },
  { value: '98', label: 'eval fixtures', note: 'Sentinel · CI regression gate' },
] as const;

/** schema.org sameAs (email is set separately on Person). Order: X → LinkedIn → Substack → GitHub. */
export const PERSON_SAME_AS = [
  X_PROFILE_URL,
  LINKEDIN_URL,
  SUBSTACK_URL,
  GITHUB_PROFILE_URL,
] as const;
