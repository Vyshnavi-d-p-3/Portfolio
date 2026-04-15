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
