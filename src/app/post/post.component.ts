import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Post } from '../model/post.model';
import { BrowserModule } from '@angular/platform-browser';
import { UserService } from '../services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { PostService } from '../services/post.service';
import { LoadingComponent } from '../common/components/loading/loading.component';
import { CommentService } from '../services/comment.service';
import { CommentsComponent } from '../comments/comments.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    LoadingComponent,
    CommentsComponent,
  ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css',
  providers: [UserService, PostService, UserService, RouterModule],
})
export class PostComponent {
  // Get Post ID from URL
  private postId: string = '';

  // Display Post Data
  public post: any;
  public user: any;

  // Handling Fetching Post Loading State
  public isLoading: boolean = false;

  constructor(
    private postService: PostService,
    private userService: UserService,
    private route: ActivatedRoute
  ) {
    // Initialize The Page as Loading
    this.isLoading = true;
  }

  ngOnInit() {
    this.postId = <string>this.route.snapshot.paramMap.get('id');

    return this.postService.getOne(Number(this.postId)).subscribe((post) => {
      this.post = post;

      this.userService.getOne(this.post.userId).subscribe((user) => {
        this.user = user;
        this.isLoading = false;
      });
    });
  }
}
