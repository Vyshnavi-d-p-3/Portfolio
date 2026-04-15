import type { Metadata } from 'next';
import ResumeClient from '@/components/resume/ResumeClient';

export const metadata: Metadata = {
  title: 'Resume — Vyshnavi D P',
  description: 'Software engineer resume. 8 years experience, MS CS @ SJSU. Skills: TypeScript, Go, Python, React, Spring Boot, distributed systems.',
  openGraph: {
    title: 'Resume — Vyshnavi D P',
    description: 'Software engineer resume. 8 years experience at Accenture and TCS.',
    url: 'https://vyshnavi.dev/resume',
  },
};

export default function ResumePage() {
  return <ResumeClient />;
}
