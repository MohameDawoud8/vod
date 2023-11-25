import { PostService } from '../services/post.service';
import { Component, OnInit } from '@angular/core';
import { Post } from '../model/post.model';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LoadingComponent } from '../common/components/loading/loading.component';
import { PostItemComponent } from './post-item/post-item.component';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { PaginationComponent } from '../pagination/pagination.component';
import { filter } from 'rxjs';
import { User } from '../model/user.modal';

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
  totalItems: number = 10;
  filteredArary: [] = [];
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

  filteredPost(searchTerm: number, rescourse = this.posts) {
    if (searchTerm) {
      return rescourse.filter((post: Post) => post.userId === searchTerm);
    }

    return this.posts;
  }

  paginatedRescourse(
    page: number,
    rescourse = this.posts,
    itemPerPage: number = 10
  ) {
    if (this.filteredArary.length > 0) {
      rescourse = this.filteredArary;
    }

    return rescourse.slice(
      page * itemPerPage - itemPerPage,
      page * itemPerPage
    );
  }

  handlePageChange(page: number) {
    this.currentPage = page;
    sessionStorage.setItem('currentPage', this.currentPage.toString());
  }

  handleSearchChange(user: User[]) {
    console.log(
      '🚀 ~ file: posts.component.ts:77 ~ PostsComponent ~ handleSearchChange ~ user:',
      user
    );
    this.filteredArary = this.filteredPost(user[0].id);
    console.log(
      '🚀 ~ file: posts.component.ts:79 ~ PostsComponent ~ handleSearchChange ~ this.filteredArary:',
      this.filteredArary
    );
  }
}
