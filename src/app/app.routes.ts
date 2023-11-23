import { Routes } from '@angular/router';
import { PostComponent } from './post/post.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PostsComponent } from './posts/posts.component';

export const routes: Routes = [
  { path: '', redirectTo: '/blogs', pathMatch: 'full' },

  // RESTful Resources
  { path: 'posts', title: 'Blogs', component: PostsComponent },
  { path: 'posts/:id', title: 'Post', component: PostComponent },

  // Fallback 404
  { path: '**', component: PageNotFoundComponent },
];
