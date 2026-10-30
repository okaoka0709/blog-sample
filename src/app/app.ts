import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { BlogStore } from './blog.store';
import { Sidebar } from './sidebar';

@Component({
  selector: 'app-root',
  imports: [RouterLink, RouterOutlet, Sidebar],
  templateUrl: './app.html',
})
export class App {
  readonly store = inject(BlogStore);

  constructor() {
    void this.store.load();
  }
}
