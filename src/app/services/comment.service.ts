import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class CommentService {
  private url: string;
  constructor(private http: HttpClient) {
    this.url = 'https://jsonplaceholder.typicode.com/comments';
  }
  getByParams(id: string) {
    return this.http.get(this.url + '?postId=' + id);
  }
}
