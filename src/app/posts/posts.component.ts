import { PostService } from '../services/post.service';
import { Component, OnInit } from '@angular/core';
import { Post } from '../model/post.model';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LoadingComponent } from '../common/components/loading/loading.component';
import { PostItemComponent } from './post-item/post-item.component';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { PaginationComponent } from '../pagination/pagination.component';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    PostItemComponent,
    LoadingComponent,
    SearchBarComponent,
    PaginationComponent,
  ],
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
  providers: [PostService],
})
export class PostsComponent implements OnInit {
  // Pagination State
  currentPage: number = Number(sessionStorage.getItem('currentPage')) || 1;
  posts: any = [];

  // Request State
  isLoading: boolean = false;

  constructor(private service: PostService) {
    this.isLoading = true;
  }

  ngOnInit() {
    this.service.getAll().subscribe((posts) => {
      this.posts = posts;
      this.isLoading = false;
    });
  }

  paginatedRescourse(
    page: number,
    rescourse = this.posts,
    itemPerPage: number = 10
  ) {
    return rescourse.slice(
      page * itemPerPage - itemPerPage,
      page * itemPerPage
    );
  }

  handlePageChange(page: number) {
    this.currentPage = page;
    sessionStorage.setItem('currentPage', this.currentPage.toString());
  }
}
