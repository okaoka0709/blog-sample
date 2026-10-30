import { Component, computed, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { BlogStore } from './blog.store';
import { Comments } from './comments';
import { PostMeta } from './post-meta';

@Component({
  selector: 'app-post-detail',
  imports: [RouterLink, Comments, PostMeta],
  templateUrl: './post-detail.html',
})
export class PostDetail {
  private readonly store = inject(BlogStore);
  private readonly params = toSignal(inject(ActivatedRoute).paramMap);
  private readonly pageTitle = inject(Title);
  readonly post = computed(() =>
    this.store.posts().find((post) => post.slug === this.params()?.get('slug')),
  );

  constructor() {
    effect(() =>
      this.pageTitle.setTitle(
        `${this.post()?.title ?? '找不到文章'} · ${this.store.settings()?.title ?? '隨堂筆記'}`,
      ),
    );
  }
}
