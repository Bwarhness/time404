import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor(private http:HttpClient) { }

  getPosts(board: 'b' | 'wsg' | 'gif', id:string): Observable<Post[]> {
    return this.http.get('https://cors-anywhere.herokuapp.com/a.4cdn.org/'+ board +"/thread/"+id+".json").pipe(
      map((res: {posts: Post[]}) => {
        return res.posts.filter(s => s.ext === '.webm');
      })
    );
  }
}
export interface Post {
  no: number;
  com: string;
  filename?:string;
  ext?:string;
  tim?:string;

}
