import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Github, FileText } from 'lucide-react';
import { getProject, projects } from '@/lib/projects';
import ProjectCaseStudy from '@/components/projects/ProjectCaseStudy';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return projects.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProject(params.slug);
  if (!project) return {};
  return {
    title: `${project.name} — Vyshnavi D P`,
    description: project.pitch,
    openGraph: { title: `${project.name} — Vyshnavi D P`, description: project.pitch },
  };
}

export default function ProjectPage({ params }: Props) {
  const project = getProject(params.slug);
  if (!project) notFound();

  return <ProjectCaseStudy project={project} />;
}
