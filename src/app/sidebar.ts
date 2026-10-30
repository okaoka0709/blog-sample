import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BlogStore } from './blog.store';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink],
  templateUrl: './sidebar.html',
  host: { '(window:resize)': 'resizeSidebar()' },
})
export class Sidebar {
  readonly store = inject(BlogStore);
  readonly filters = toSignal(inject(ActivatedRoute).queryParamMap);
  expanded = window.matchMedia('(min-width: 641px)').matches;

  resizeSidebar(): void {
    this.expanded = window.matchMedia('(min-width: 641px)').matches;
  }

  categoryCount(category: string): number {
    return this.store.posts().filter((post) => post.category === category)
      .length;
  }

  yearCount(year: string): number {
    return this.store
      .posts()
      .filter((post) => post.publishedAt.startsWith(year)).length;
  }
}
