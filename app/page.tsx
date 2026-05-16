import type { Metadata } from 'next';
import HeroSection from '@/components/home/HeroSection';
import ProjectsSection from '@/components/home/ProjectsSection';
import MoreOnGitHubSection from '@/components/home/MoreOnGitHubSection';
import ExperienceSection from '@/components/home/ExperienceSection';
import BeyondCodeSection from '@/components/home/BeyondCodeSection';
import { CONTACT_EMAIL, PERSON_SAME_AS, WORK_EXPERIENCE_YEARS_TEXT } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Vyshnavi D P — Software Engineer',
  description: `${WORK_EXPERIENCE_YEARS_TEXT} building production systems. MS CS @ SJSU. Full-stack, distributed systems, applied AI. Open to full-time SWE roles.`,
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
      <ProjectsSection />
      <MoreOnGitHubSection />
      <ExperienceSection />
      <BeyondCodeSection />
    </>
  );
}
