import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  description: string;
  readingTime: string;
  tags: string[];
  published: boolean;
  project?: string;
  content: string;
}

const BLOG_DIR = path.join(process.cwd(), 'content/blog');

export function getBlogPosts(includeUnpublished = false): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.mdx'));

  const posts = files.map(file => {
    const raw = fs.readFileSync(path.join(BLOG_DIR, file), 'utf8');
    const { data, content } = matter(raw);
    return {
      slug: data.slug || file.replace('.mdx', ''),
      title: data.title || '',
      date: data.date || '',
      description: data.description || '',
      readingTime: data.readingTime || '5 min read',
      tags: data.tags || [],
      published: data.published ?? false,
      project: data.project,
      content,
    } as BlogPost;
  });

  const filtered = includeUnpublished ? posts : posts.filter(p => p.published);

  return filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getBlogPost(slug: string): BlogPost | null {
  if (!fs.existsSync(BLOG_DIR)) return null;

  const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.mdx'));
  for (const file of files) {
    const raw = fs.readFileSync(path.join(BLOG_DIR, file), 'utf8');
    const { data, content } = matter(raw);
    const postSlug = data.slug || file.replace('.mdx', '');
    if (postSlug === slug) {
      return {
        slug: postSlug,
        title: data.title || '',
        date: data.date || '',
        description: data.description || '',
        readingTime: data.readingTime || '5 min read',
        tags: data.tags || [],
        published: data.published ?? false,
        project: data.project,
        content,
      };
    }
  }
  return null;
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}
