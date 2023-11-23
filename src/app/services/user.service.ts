import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class UserService extends DataService {
  constructor(http: HttpClient) {
    super('https://jsonplaceholder.typicode.com/users', http);
  }
}
