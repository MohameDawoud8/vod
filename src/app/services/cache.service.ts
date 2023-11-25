import { HttpResponse } from '@angular/common/http';

export class HttpCacheEntry {
  constructor(
    /**
     * Request URL
     *
     * will be used as a key to associate it with the response
     */
    public url: string,
    /**
     * the incoming response
     *
     * the value will be saved as a string and before fetching the data we will map it out to HttpResponse again
     */
    public value: HttpResponse<any>,
    /**
     * Maximum time for the entry to stay in the cache
     */
    public ttl: number
  ) {}
}

export const INDEXED_DATABASE = new InjectionToken<AsyncDatabase>(
  'INDEXED_DB_CACHE_DATABASE',
  {
    providedIn: 'root',
    factory: () => new AsyncDatabase(new IndexedDB('cache')),
  }
);

@Injectable({
  providedIn: 'root',
})
export class HttpCacheHelper {
  private collection: AsyncCollection<HttpCacheEntry> = null;

  constructor(@Inject(INDEXED_DATABASE) indexedDatabase: AsyncDatabase) {
    // collection is a method the came from `document-storage` library to originze /
    // the data in different namespaces, so here we defined 'CACHE' namespace to
    // save all cache related things to it
    // collection provide different method to store are retrive data
    this.collection = indexedDatabase.collection('CACHE');
  }

  /**
   *
   * @param url: request URL including the path params
   * @param value: the request-response
   * @param ttl: the maximum time for the entry to stay in the cache before invalidating it
   *
   * Save the response in the cache for a specified time
   *
   */
  public set(url: string, value: HttpResponse<any>, ttl: number) {
    return this.collection.set(new HttpCacheEntry(url, value, ttl));
  }

  /**
   *
   * @param url: request URL including the path params
   *
   * Retrieve the response from the cache database and map it to HttpResponse again.
   *
   * if TTL end, the response will be deleted and null will return
   */
  public get(url: string) {
    return from(
      this.collection.get((entry: { url: string }) => entry.url === url)
    ).pipe(
      switchMap((entry) => {
        if (entry && this.dateElapsed(entry.ttl ?? 0)) {
          return this.invalidateCache(entry);
        }
        return of(entry);
      }),
      map((response) => response && new HttpResponse(response.value))
    );
  }

  /**
   * Clear out the entire cache database
   */
  public clear() {
    return this.collection.clear();
  }

  private invalidateCache(entry: Entity<HttpCacheEntry>) {
    return this.collection.delete(entry.id).then((_: any) => null);
  }

  private dateElapsed(date: number) {
    return date < Date.now();
  }
}

function Injectable(arg0: {
  providedIn: string;
}): (target: typeof HttpCacheHelper) => void | typeof HttpCacheHelper {
  throw new Error('Function not implemented.');
}

function Inject(
  INDEXED_DATABASE: any
): (
  target: typeof HttpCacheHelper,
  propertyKey: undefined,
  parameterIndex: 0
) => void {
  throw new Error('Function not implemented.');
}

function from(arg0: any) {
  throw new Error('Function not implemented.');
}

function switchMap(arg0: (entry: any) => any): any {
  throw new Error('Function not implemented.');
}

function of(entry: any) {
  throw new Error('Function not implemented.');
}

function map(arg0: (response: any) => any): any {
  throw new Error('Function not implemented.');
}
