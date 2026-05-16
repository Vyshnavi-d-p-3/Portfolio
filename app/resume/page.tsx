import type { Metadata } from 'next';
import ResumeClient from '@/components/resume/ResumeClient';
import { WORK_EXPERIENCE_YEARS_TEXT } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Resume — Vyshnavi D P',
  description: `Software engineer resume. ${WORK_EXPERIENCE_YEARS_TEXT} work experience, MS CS @ SJSU. Skills: TypeScript, Go, Python, React, Spring Boot, distributed systems.`,
  openGraph: {
    title: 'Resume — Vyshnavi D P',
    description: `Software engineer resume. ${WORK_EXPERIENCE_YEARS_TEXT} work experience at Accenture and TCS.`,
    url: 'https://vyshnavi.dev/resume',
  },
};

export default function ResumePage() {
  return <ResumeClient />;
}
