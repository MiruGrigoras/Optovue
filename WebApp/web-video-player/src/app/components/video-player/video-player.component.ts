import { HttpParams, HttpHeaders, HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, Input, OnDestroy, SimpleChanges, ViewChild } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { VideoPlayerService } from 'src/app/services/video-player.service';
import { VideoJsOptions } from "src/models/videojs-options";
//declare const videojs: any;
import videojs from 'video.js';
import Player from 'video.js/dist/types/player';
@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css']
})
export class VideoPlayerComponent implements OnDestroy, AfterViewInit {
  player: any;
  url: string = "";

  constructor(private httpClient: HttpClient, private elRef: ElementRef) { 
    console.log("Constructor");
    
    const name = "coast.mp4"
    let bodyParams = new HttpParams();
    bodyParams = bodyParams.append("name", name);
    let headerParams = new HttpHeaders();
    headerParams = headerParams.append("range", name);
    this.httpClient
      .post("http://localhost:3000/video",bodyParams,{ responseType: "blob"})
      .subscribe((res) => {
        this.url =  URL.createObjectURL(res);
        this.player.src({
          src: this.url,
          type:"video/mp4",
        });
      });
  }

  ngAfterViewInit(): void {
    this.player = videojs("video-player", {
      suppressNotSupportedError: true,
      autoplay: true,
    });
  }

  ngOnDestroy(): void {
    if (this.player) {
      this.player.dispose();
    }
  }

}
