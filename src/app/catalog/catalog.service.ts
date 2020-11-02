import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { distinctUntilChanged, map, publishReplay, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CatalogService {
  constructor(private http: HttpClient) {}

  getThreads(board: 'b' | 'wsg' | 'gif'): Observable<Thread[]> {
    return this.http.get('https://cors-anywhere.herokuapp.com/boards.4chan.org/' + board + '/catalog.json').pipe(

      map((pages: Page[]) => {
        let threads = [];
        for (let i = 0; i < pages.length; i++) {
          for (let s = 0; s < pages[i].threads.length; s++) {
            threads.push(pages[i].threads[s]);
          }
        }
        threads = threads.sort(function (a, b) {
          return b.replies - a.replies;
        });
        return threads;
      }),
      shareReplay({bufferSize:1, refCount:true})
    );
  }
}
interface Page {
  pageNumber: number;
  threads: Thread[];
}
interface Thread {
  replies:number,
  images:number;
  com: string;
  sub: string;
  no: number;
}
