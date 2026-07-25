import type { Metadata } from 'next';
import AboutClient from '@/components/about/AboutClient';
import { PERSON_NAME, WORK_EXPERIENCE_YEARS_TEXT } from '@/lib/site';

export const metadata: Metadata = {
  title: `About — ${PERSON_NAME}`,
  description: `AI & full-stack engineer with ${WORK_EXPERIENCE_YEARS_TEXT} at Dell Technologies (via Accenture) and TCS. M.S. Software Engineering, SJSU (graduated May 2026). On STEM OPT. Currently building AI agent workflow evals — production systems with measurable quality.`,
  alternates: { canonical: '/about' },
  openGraph: {
    title: `About — ${PERSON_NAME}`,
    description: `AI & full-stack engineer with ${WORK_EXPERIENCE_YEARS_TEXT} at Dell Technologies (via Accenture) and TCS. Agent workflow evals and full-stack systems.`,
    url: 'https://vyshnavi.dev/about',
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
