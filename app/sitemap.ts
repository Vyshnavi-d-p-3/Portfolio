import { MetadataRoute } from 'next';
import { getBlogPosts } from '@/lib/blog';
import { projects } from '@/lib/projects';

const BASE = 'https://vyshnavi.dev';

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getBlogPosts(false);
  const blogEntries = posts.map(post => ({
    url: `${BASE}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const projectEntries = projects.map(project => ({
    url: `${BASE}/projects/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [
    { url: BASE, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE}/projects`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/resume`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    ...projectEntries,
    ...blogEntries,
  ];
}
