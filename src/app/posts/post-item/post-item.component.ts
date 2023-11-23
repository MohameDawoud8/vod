import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { Post } from '../../model/post.model';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-post-item',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink],
  templateUrl: './post-item.component.html',
  styleUrl: './post-item.component.css',
  providers: [UserService],
})
export class PostItemComponent {
  @Input() post: Post = {} as Post;
  public user: any = {};

  constructor(private service: UserService) {}

  ngOnInit() {
    this.service.getOne(this.post.userId).subscribe((user) => {
      this.user = { ...user };
    });
  }
}
