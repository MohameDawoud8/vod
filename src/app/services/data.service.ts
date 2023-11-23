// Ng
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

// Custom Class
import { NotFoundError } from './../common/not-found-error';
import { AppError } from './../common/app-error';

// Rxjs
import { throwError, pipe } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class DataService {
  constructor(@Inject(String) private url: string, private http: HttpClient) {}

  getAll() {
    return this.http.get(this.url);
    // .pipe(catchError(this.handleError));
  }

  getOne(id: number) {
    return this.http.get(this.url + '/' + id);
    // .pipe(catchError(this.handleError));
  }

  private handleError(error: Response) {
    if (error.status === 404) return throwError(() => new NotFoundError());
    return throwError(() => new AppError(error));
  }
}
