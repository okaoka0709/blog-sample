import { Component, computed, effect, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BlogStore } from './blog.store';
import { PostMeta } from './post-meta';

@Component({
  selector: 'app-post-list',
  imports: [RouterLink, PostMeta],
  templateUrl: './post-list.html',
})
export class PostList {
  readonly store = inject(BlogStore);
  private readonly router = inject(Router);
  private readonly pageTitle = inject(Title);
  readonly params = toSignal(inject(ActivatedRoute).queryParamMap);
  readonly query = computed(() => this.params()?.get('q') ?? '');
  readonly category = computed(() => this.params()?.get('category') ?? '');
  readonly year = computed(() => this.params()?.get('year') ?? '');
  readonly isFiltered = computed(
    () => !!(this.query() || this.category() || this.year()),
  );
  readonly title = computed(
    () =>
      this.category() || (this.year() ? `${this.year()} 年的筆記` : '全部文章'),
  );
  readonly posts = computed(() => {
    const query = this.query().trim().toLocaleLowerCase();

    return this.store
      .posts()
      .filter(
        (post) =>
          (!this.category() || post.category === this.category()) &&
          (!this.year() || post.publishedAt.startsWith(this.year())) &&
          (!query ||
            [post.title, post.excerpt, ...post.tags]
              .join(' ')
              .toLocaleLowerCase()
              .includes(query)),
      );
  });

  constructor() {
    effect(() =>
      this.pageTitle.setTitle(
        `${this.title()} · ${this.store.settings()?.title ?? '隨堂筆記'}`,
      ),
    );
  }

  search(event: Event, query: string): void {
    event.preventDefault();
    void this.router.navigate(['/'], {
      queryParams: { q: query.trim() || null },
      queryParamsHandling: 'merge',
    });
  }
}
