/** Public contact and profile URLs — single source of truth for the site. */
export const CONTACT_EMAIL = 'vyshnavi.dyvandinnepullareddy@gmail.com' as const;
export const MAILTO_CONTACT = `mailto:${CONTACT_EMAIL}` as const;
/** Preferred order for outreach: X → email → LinkedIn → Substack (see footer). */
export const X_PROFILE_URL = 'https://x.com/Vyshu_DP' as const;
export const SUBSTACK_URL = 'https://substack.com/@vyshudp' as const;
export const LINKEDIN_URL = 'https://www.linkedin.com/in/vyshnavi-dp/' as const;
export const GITHUB_PROFILE_URL = 'https://github.com/Vyshnavi-d-p-3' as const;
export const GITHUB_PORTFOLIO_REPO_URL = 'https://github.com/Vyshnavi-d-p-3/Portfolio' as const;

/** Total industry / paid work experience — keep in sync with resume. */
export const WORK_EXPERIENCE_YEARS_TEXT = '6.3 years' as const;

/** schema.org sameAs (email is set separately on Person). Order: X → LinkedIn → Substack → GitHub. */
export const PERSON_SAME_AS = [
  X_PROFILE_URL,
  LINKEDIN_URL,
  SUBSTACK_URL,
  GITHUB_PROFILE_URL,
] as const;
