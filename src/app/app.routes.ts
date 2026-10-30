import { Routes } from '@angular/router';
import { PostList } from './post-list';
import { PostDetail } from './post-detail';

export const routes: Routes = [
  { path: '', pathMatch: 'full', component: PostList },
  { path: 'posts/:slug', component: PostDetail },
  { path: '**', component: PostDetail },
];
