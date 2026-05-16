import type { Metadata } from 'next';
import AboutClient from '@/components/about/AboutClient';
import { DEGREE_SHORT, SCHOOL_SHORT, WORK_EXPERIENCE_YEARS_TEXT } from '@/lib/site';

export const metadata: Metadata = {
  title: 'About — Vyshnavi D P',
  description: `Software engineer with ${WORK_EXPERIENCE_YEARS_TEXT} at Accenture and TCS, now finishing ${DEGREE_SHORT} @ ${SCHOOL_SHORT}. Backend systems and applied AI — production services with measurable quality.`,
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About — Vyshnavi D P',
    description: `Software engineer with ${WORK_EXPERIENCE_YEARS_TEXT} at Accenture and TCS. Backend systems and applied AI.`,
    url: 'https://vyshnavi.dev/about',
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
