import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { UserService } from './services/user.service';
import { PostService } from './services/post.service';
import { CommentService } from './services/comment.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    UserService,
    PostService,
    CommentService,
    { provide: 'API_URL', useValue: 'https://jsonplaceholder.typicode.com' },
  ],
};
