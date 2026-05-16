import type { Metadata } from 'next';
import HeroSection from '@/components/home/HeroSection';
import ProofStripSection from '@/components/home/ProofStripSection';
import ProjectsSection from '@/components/home/ProjectsSection';
import MoreOnGitHubSection from '@/components/home/MoreOnGitHubSection';
import ExperienceSection from '@/components/home/ExperienceSection';
import BeyondCodeSection from '@/components/home/BeyondCodeSection';
import { CONTACT_EMAIL, PERSON_SAME_AS, SITE_TAGLINE, WORK_EXPERIENCE_YEARS_TEXT } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Vyshnavi D P — Software Engineer',
  description: `${WORK_EXPERIENCE_YEARS_TEXT} at Accenture and TCS. MS CS @ SJSU (May 2026). ${SITE_TAGLINE} Open to full-time SWE roles.`,
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
            description: `${WORK_EXPERIENCE_YEARS_TEXT} building production systems. MS CS @ SJSU.`,
            email: CONTACT_EMAIL,
            url: 'https://vyshnavi.dev',
            sameAs: [...PERSON_SAME_AS],
            alumniOf: {
              '@type': 'CollegeOrUniversity',
              name: 'San Jose State University',
            },
          }),
        }}
      />
      <HeroSection />
      <ProofStripSection />
      <ProjectsSection />
      <MoreOnGitHubSection />
      <ExperienceSection />
      <BeyondCodeSection />
    </>
  );
}
