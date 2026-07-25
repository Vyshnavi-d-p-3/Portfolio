import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProject, projects, type Project } from '@/lib/projects';
import ProjectCaseStudy from '@/components/projects/ProjectCaseStudy';
import { PERSON_NAME, PERSON_SAME_AS } from '@/lib/site';

interface Props {
  params: { slug: string };
}

const SITE_URL = 'https://vyshnavi.dev';

export async function generateStaticParams() {
  return projects.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProject(params.slug);
  if (!project) return {};
  const url = `${SITE_URL}/projects/${project.slug}`;
  const title = `${project.name} — ${PERSON_NAME}`;
  return {
    title,
    description: project.pitch,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title,
      description: project.pitch,
      url,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: project.pitch,
    },
  };
}

/** Known languages to surface in structured data (frameworks are excluded). */
function programmingLanguages(project: Project): string[] {
  const langs = new Set<string>();
  for (const t of project.tech) {
    if (t === 'Go') langs.add('Go');
    else if (t.startsWith('Python')) langs.add('Python');
    else if (t.startsWith('Java')) langs.add('Java');
    else if (t === 'TypeScript' || t.startsWith('Next.js')) langs.add('TypeScript');
  }
  return Array.from(langs);
}

function projectJsonLd(project: Project) {
  const url = `${SITE_URL}/projects/${project.slug}`;
  const license = /MIT/.test(project.status) ? 'https://opensource.org/licenses/MIT' : undefined;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareSourceCode',
        name: project.name,
        description: project.description,
        url,
        codeRepository: project.github,
        programmingLanguage: programmingLanguages(project),
        keywords: project.tech,
        ...(license ? { license } : {}),
        author: {
          '@type': 'Person',
          name: PERSON_NAME,
          url: SITE_URL,
          sameAs: [...PERSON_SAME_AS],
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Projects', item: `${SITE_URL}/projects` },
          { '@type': 'ListItem', position: 3, name: project.name, item: url },
        ],
      },
    ],
  };
}

export default function ProjectPage({ params }: Props) {
  const project = getProject(params.slug);
  if (!project) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd(project)) }}
      />
      <ProjectCaseStudy project={project} />
    </>
  );
}
