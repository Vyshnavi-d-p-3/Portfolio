import type { Metadata } from 'next';
import ResumeClient from '@/components/resume/ResumeClient';
import { DEGREE_SHORT, SCHOOL_SHORT, WORK_EXPERIENCE_YEARS_TEXT } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Resume — Vyshnavi D P',
  description: `Software engineer resume. ${WORK_EXPERIENCE_YEARS_TEXT} at Accenture and TCS, ${DEGREE_SHORT} @ ${SCHOOL_SHORT}. Backend systems and applied AI — Go, Python, Spring Boot, FastAPI, PostgreSQL, LLM evaluation.`,
  alternates: { canonical: '/resume' },
  openGraph: {
    title: 'Resume — Vyshnavi D P',
    description: `Software engineer resume. ${WORK_EXPERIENCE_YEARS_TEXT} work experience at Accenture and TCS.`,
    url: 'https://vyshnavi.dev/resume',
  },
};

export default function ResumePage() {
  return <ResumeClient />;
}
