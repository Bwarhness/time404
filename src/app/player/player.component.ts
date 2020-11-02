import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { PlayerService } from './player.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent {
  $posts = new BehaviorSubject([]);
  $currentPost = new BehaviorSubject(undefined);
  $nextPosts = this.$currentPost.pipe(map(currentPost => {
    let index = this.$posts.getValue().indexOf(currentPost);
    return this.$posts.getValue().slice(index +1, index+5);
  }))
  constructor(
    private playerService: PlayerService,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {
    window.onkeydown = (e) => {
      switch (e.keyCode) {
        case 37:
        case 65:
          this.playPreviesVideo();

          break;
        case 38:
          alert('up');
          break;
        case 39:
        case 68:
          this.playNextVideo();
          break;
        case 40:
          alert('down');
          break;
      }
    };

    this.route.params
      .pipe(
        switchMap((params) => {
          return this.playerService.getPosts('gif', params['threadId']).pipe(
            tap((s) => {
              this.$posts.next(s);
              this.$currentPost.next(s[0]);
            })
          );
        })
      )
      .subscribe();
  }
  playNextVideo() {
    let nextVideo = this.$posts.getValue()[
      this.$posts.getValue().indexOf(this.$currentPost.getValue()) + 1
    ];
    if (nextVideo) {
      this.$currentPost.next(nextVideo);
    }
  }
  playPreviesVideo() {
    let lastVideo = this.$posts.getValue()[
      this.$posts.getValue().indexOf(this.$currentPost.getValue()) - 1
    ];
    if (lastVideo) {
      this.$currentPost.next(lastVideo);
    }
  }
  goToVideo(video){
    console.log(video)
    this.$currentPost.next(video)
  }
}
