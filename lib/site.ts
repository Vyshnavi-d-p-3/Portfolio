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

export const SITE_TAGLINE =
  'Backend systems and applied AI — production services with measurable quality.' as const;

/**
 * Homepage hero headline — keep aligned with industry work (Accenture/TCS) + MS/projects.
 * Avoid "distributed systems" as the lead: that's one portfolio project (Helios), not the day job.
 */
export const HERO_HEADLINE = {
  line1: 'I ship production backend systems',
  line2: 'and applied AI you can evaluate.',
} as const;

/** Quick credibility stats for the homepage proof strip. */
export const PROOF_STATS = [
  { value: WORK_EXPERIENCE_YEARS_TEXT, label: 'industry experience', note: 'Accenture · TCS' },
  { value: '2M+', label: 'devices served', note: 'Dell SupportAssist' },
  { value: '3.8', label: `${DEGREE_SHORT} GPA`, note: `${SCHOOL_SHORT} · ${GRADUATION_TEXT}` },
  { value: '4', label: 'public projects', note: 'MIT-licensed on GitHub' },
] as const;

/** schema.org sameAs (email is set separately on Person). Order: X → LinkedIn → Substack → GitHub. */
export const PERSON_SAME_AS = [
  X_PROFILE_URL,
  LINKEDIN_URL,
  SUBSTACK_URL,
  GITHUB_PROFILE_URL,
] as const;
