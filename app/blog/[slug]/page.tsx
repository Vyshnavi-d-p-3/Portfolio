import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getBlogPost, getBlogPosts } from '@/lib/blog';
import { MDXRemote } from 'next-mdx-remote/rsc';
import BlogPostShell from '@/components/blog/BlogPostShell';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return getBlogPosts(true).map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getBlogPost(params.slug);
  if (!post) return {};
  return {
    title: `${post.title} — Vyshnavi D P`,
    description: post.description,
    openGraph: { title: post.title, description: post.description },
  };
}

export default function BlogPostPage({ params }: Props) {
  const post = getBlogPost(params.slug);
  if (!post || !post.published) notFound();

  const allPosts = getBlogPosts(false);
  const index = allPosts.findIndex(p => p.slug === params.slug);
  const prev = index < allPosts.length - 1 ? allPosts[index + 1] : null;
  const next = index > 0 ? allPosts[index - 1] : null;

  return (
    <BlogPostShell post={post} prev={prev} next={next}>
      <div className="prose-content">
        <MDXRemote source={post.content} />
      </div>
    </BlogPostShell>
  );
}
