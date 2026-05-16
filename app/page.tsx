import type { Metadata } from 'next';
import HeroSection from '@/components/home/HeroSection';
import ProofStripSection from '@/components/home/ProofStripSection';
import ProjectsSection from '@/components/home/ProjectsSection';
import MoreOnGitHubSection from '@/components/home/MoreOnGitHubSection';
import ExperienceSection from '@/components/home/ExperienceSection';
import ContactCTASection from '@/components/home/ContactCTASection';
import {
  CONTACT_EMAIL,
  DEGREE_LONG,
  DEGREE_SHORT,
  GRADUATION_TEXT,
  PERSON_SAME_AS,
  SCHOOL,
  SCHOOL_SHORT,
  SITE_TAGLINE,
  WORK_EXPERIENCE_YEARS_TEXT,
} from '@/lib/site';

export const metadata: Metadata = {
  title: 'Vyshnavi D P — Software Engineer',
  description: `${WORK_EXPERIENCE_YEARS_TEXT} at Accenture and TCS. ${DEGREE_SHORT} @ ${SCHOOL_SHORT} (${GRADUATION_TEXT}). ${SITE_TAGLINE} Open to full-time SWE roles.`,
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: 'Vyshnavi D P',
            jobTitle: 'Software Engineer',
            description: `${WORK_EXPERIENCE_YEARS_TEXT} building production systems. ${DEGREE_SHORT} @ ${SCHOOL_SHORT}.`,
            email: CONTACT_EMAIL,
            url: 'https://vyshnavi.dev',
            sameAs: [...PERSON_SAME_AS],
            alumniOf: {
              '@type': 'CollegeOrUniversity',
              name: SCHOOL,
            },
            hasCredential: {
              '@type': 'EducationalOccupationalCredential',
              credentialCategory: 'degree',
              educationalLevel: 'Masters',
              name: DEGREE_LONG,
              dateCreated: GRADUATION_TEXT,
            },
          }),
        }}
      />
      <HeroSection />
      <ProofStripSection />
      <ProjectsSection />
      <MoreOnGitHubSection />
      <ExperienceSection />
      <ContactCTASection />
    </>
  );
}
