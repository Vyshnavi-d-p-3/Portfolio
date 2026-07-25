import type { Metadata } from 'next';
import AboutClient from '@/components/about/AboutClient';
import { WORK_EXPERIENCE_YEARS_TEXT } from '@/lib/site';

export const metadata: Metadata = {
  title: 'About — Vyshnavi D P',
  description: `AI & full-stack engineer with ${WORK_EXPERIENCE_YEARS_TEXT} at Dell Technologies (via Accenture) and TCS. M.S. Software Engineering, SJSU (May 2026). Currently building AI agent workflow evals — production systems with measurable quality.`,
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About — Vyshnavi D P',
    description: `AI & full-stack engineer with ${WORK_EXPERIENCE_YEARS_TEXT} at Dell Technologies (via Accenture) and TCS. Agent workflow evals and full-stack systems.`,
    url: 'https://vyshnavi.dev/about',
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
