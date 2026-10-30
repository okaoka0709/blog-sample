export interface BlogSettings {
  title: string;
  subtitle: string;
  author: string;
  role: string;
  bio: string;
  avatar: string;
  banner: string;
  sourceUrl: string;
}

export type ContentBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; level: 2 | 3; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'code'; language: string; text: string }
  | { type: 'image'; src: string; alt: string; caption?: string };

export interface Comment {
  id: string;
  author: string;
  text: string;
  createdAt: string;
}

export interface Post {
  id: string;
  slug: string;
  title: string;
  author: string;
  publishedAt: string;
  category: string;
  tags: string[];
  sourceUrl: string;
  contentNote: string;
  excerpt: string;
  content: ContentBlock[];
  comments: Comment[];
}
