import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentItemComponent } from './comment-item/comment-item.component';
import { CommentService } from '../services/comment.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [CommonModule, CommentItemComponent, HttpClientModule],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css',
  providers: [CommentService],
})
export class CommentsComponent {
  @Input() postId: string = '';
  public comments: any = [];

  public isLoading: boolean = false;

  constructor(private service: CommentService) {
    this.isLoading = true;
  }

  ngOnInit() {
    this.service.getByParams(this.postId).subscribe((comments) => {
      this.comments = comments;
      this.isLoading = false;
    });
  }
}
