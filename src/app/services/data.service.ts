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
  // private req: IDBOpenDBRequest;
  // private db: IDBDatabase;

  constructor(@Inject(String) private url: string, private http: HttpClient) {
    // IndexDB
    // this.req = indexedDB.open('Vod', 1);
  }

  getAll() {
    return this.http.get(this.url);
    // .pipe(catchError(this.handleError));
  }

  getOne(id: number) {
    return this.http.get(this.url + '/' + id);
    // .pipe(catchError(this.handleError));
  }

  // TODO: Implement IndexDB

  // initializeDB() {
  //   this.req.onupgradeneeded = (ev:IDBVersionChangeEvent) => {
  //     const db = ev.target!.result;
  //     const store = db.createObjectStore('vod', { keyPath: 'id' });
  //     store.createIndex('id', 'id', { unique: true });
  //     store.createIndex('title', 'title', { unique: false });
  //     store.createIndex('body', 'body', { unique: false });
  //     store.createIndex('userId', 'userId', { unique: false });
  //   }

  // }

  // add(data: any) {
  //   this.req.onsuccess = (this: IDBRequest<IDBDatabase>, ev: Event)=>  {
  //     this.db = ev.target.result;
  //     const tx = db.transaction('vod', 'readwrite');
  //     const store = tx.objectStore('vod');
  //     const index = store.index('id');
  //     const request = index.getAll();

  //     request.onsuccess = function (event: { target: { result: any; }; }) {
  //       console.log(event.target.result);
  //     }
  //   }
  // }

  //   error () => {

  //     req.onerror = function (event: { target: { error: any; }; }) {
  //       console.log(event.target.error);
  //     }
  //   }
}
