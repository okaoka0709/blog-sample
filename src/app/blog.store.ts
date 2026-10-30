import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { BlogSettings, Comment, Post } from './models';

const STORAGE_KEY = 'oka-blog.comments.v1';

@Injectable({ providedIn: 'root' })
export class BlogStore {
  private readonly http = inject(HttpClient);
  private readonly localComments = signal<Record<string, Comment[]>>(
    this.readComments(),
  );

  readonly settings = signal<BlogSettings | null>(null);
  readonly posts = signal<Post[]>([]);
  readonly loading = signal(true);
  readonly error = signal('');
  readonly categories = computed(() => [
    ...new Set(this.posts().map((post) => post.category)),
  ]);
  readonly years = computed(() =>
    [...new Set(this.posts().map((post) => post.publishedAt.slice(0, 4)))]
      .sort()
      .reverse(),
  );

  async load(): Promise<void> {
    this.loading.set(true);
    this.error.set('');

    try {
      const [settings, posts] = await Promise.all([
        firstValueFrom(this.http.get<BlogSettings>('data/blog.json')),
        firstValueFrom(this.http.get<Post[]>('data/posts.json')),
      ]);

      this.settings.set(settings);
      this.posts.set(
        posts.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt)),
      );
    } catch {
      this.error.set('文章資料暫時無法載入，請確認 JSON 檔案後再試一次。');
    } finally {
      this.loading.set(false);
    }
  }

  commentsFor(post: Post): Comment[] {
    return [...post.comments, ...(this.localComments()[post.id] ?? [])];
  }

  addComment(post: Post, author: string, text: string): boolean {
    const comment: Comment = {
      id: crypto.randomUUID(),
      author,
      text,
      createdAt: new Date().toISOString(),
    };
    const comments = {
      ...this.localComments(),
      [post.id]: [...(this.localComments()[post.id] ?? []), comment],
    };

    this.localComments.set(comments);

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(comments));
      return true;
    } catch {
      return false;
    }
  }

  private readComments(): Record<string, Comment[]> {
    try {
      const saved: unknown = JSON.parse(
        localStorage.getItem(STORAGE_KEY) ?? '{}',
      );

      if (!saved || typeof saved !== 'object' || Array.isArray(saved))
        return {};

      return Object.fromEntries(
        Object.entries(saved).map(([postId, comments]) => [
          postId,
          Array.isArray(comments)
            ? comments.filter(
                (item): item is Comment =>
                  item !== null &&
                  typeof item === 'object' &&
                  typeof item.id === 'string' &&
                  typeof item.author === 'string' &&
                  typeof item.text === 'string' &&
                  typeof item.createdAt === 'string' &&
                  Number.isFinite(Date.parse(item.createdAt)),
              )
            : [],
        ]),
      );
    } catch {
      return {};
    }
  }
}
