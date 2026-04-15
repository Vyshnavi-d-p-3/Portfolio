import type { Metadata } from 'next';
import HeroSection from '@/components/home/HeroSection';
import TerminalBlock from '@/components/home/TerminalBlock';
import ProjectsSection from '@/components/home/ProjectsSection';
import ExperienceSection from '@/components/home/ExperienceSection';
import BlogSection from '@/components/home/BlogSection';
import BeyondCodeSection from '@/components/home/BeyondCodeSection';
import { getBlogPosts } from '@/lib/blog';

export const metadata: Metadata = {
  title: 'Vyshnavi D P — Software Engineer',
  description: '8 years building production systems. MS CS @ SJSU. Full-stack, distributed systems, applied AI. Open to full-time SWE roles.',
};

export default function HomePage() {
  const publishedPosts = getBlogPosts(false).slice(0, 3);

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
            description: '8 years building production systems. MS CS @ SJSU.',
            url: 'https://vyshnavi.dev',
            sameAs: [
              'https://github.com/vyshnavidp',
              'https://linkedin.com/in/vyshnavidp',
            ],
            alumniOf: {
              '@type': 'CollegeOrUniversity',
              name: 'San Jose State University',
            },
          }),
        }}
      />
      <HeroSection />
      <TerminalBlock />
      <ProjectsSection />
      <ExperienceSection />
      <BlogSection posts={publishedPosts} />
      <BeyondCodeSection />
    </>
  );
}
