import { MetadataRoute } from 'next';
import { projects } from '@/lib/projects';

const BASE = 'https://vyshnavi.dev';

/**
 * Stable build-time timestamp so crawlers see a meaningful `lastModified`
 * (not "now" on every request, which is noise to them).
 */
const BUILD_DATE = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  const projectEntries = projects.map(project => ({
    url: `${BASE}/projects/${project.slug}`,
    lastModified: BUILD_DATE,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [
    { url: BASE, lastModified: BUILD_DATE, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE}/projects`, lastModified: BUILD_DATE, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/about`, lastModified: BUILD_DATE, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/resume`, lastModified: BUILD_DATE, changeFrequency: 'monthly', priority: 0.7 },
    ...projectEntries,
  ];
}
