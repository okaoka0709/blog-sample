import { DatePipe } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BlogStore } from './blog.store';
import { Post } from './models';

@Component({
  selector: 'app-post-meta',
  imports: [DatePipe, RouterLink],
  template: `
    <div class="post-meta">
      <div class="meta-facts">
        <time [attr.datetime]="post().publishedAt">{{
          post().publishedAt | date: 'yyyy.MM.dd'
        }}</time>
        <span class="meta-divider">/</span>
        <span>{{ store.commentsFor(post()).length }} 則留言</span>
      </div>
      <div class="tags" aria-label="文章標籤">
        @for (tag of post().tags; track tag) {
          <a class="tag" routerLink="/" [queryParams]="{ q: tag }">{{ tag }}</a>
        }
      </div>
    </div>
  `,
})
export class PostMeta {
  readonly post = input.required<Post>();
  readonly store = inject(BlogStore);
}
