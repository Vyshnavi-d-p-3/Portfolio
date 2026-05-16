import type { Metadata } from 'next';
import AboutClient from '@/components/about/AboutClient';
import { WORK_EXPERIENCE_YEARS_TEXT } from '@/lib/site';

export const metadata: Metadata = {
  title: 'About — Vyshnavi D P',
  description: `Full-stack software engineer with ${WORK_EXPERIENCE_YEARS_TEXT} of production experience. MS CS @ SJSU. Building distributed systems, AI evaluation tools, and production-grade web apps.`,
  openGraph: {
    title: 'About — Vyshnavi D P',
    description: `Full-stack software engineer with ${WORK_EXPERIENCE_YEARS_TEXT} of production experience at Accenture and TCS.`,
    url: 'https://vyshnavi.dev/about',
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
