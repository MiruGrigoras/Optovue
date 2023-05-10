import { HttpParams, HttpHeaders, HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnDestroy } from '@angular/core';
import videojs from 'video.js';
import 'videojs-markers';
@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css']
})
export class VideoPlayerComponent implements OnDestroy, AfterViewInit {
  player: any;
  url: string = "";

  constructor(private httpClient: HttpClient, private elRef: ElementRef) {
    //TODO: change parameters with real values from log
    const name = "ffmpeg_output.mp4"
    // let bodyParams = new HttpParams();
    // bodyParams = bodyParams.append("name", name);
    let bodyParams = new HttpParams();
    bodyParams = bodyParams.append("name", "ffmpeg_output");
    bodyParams = bodyParams.append("start_time", '00:00:00');
    bodyParams = bodyParams.append("end_time", '00:01:10');
   
    this.httpClient
      .post("http://localhost:3000/video/crop",bodyParams,{ responseType: "blob"})
      .subscribe((res) => {
        this.url =  URL.createObjectURL(res);
        this.player.src({
          src: this.url,
          type:"video/mp4",
        });
        this.player.markers({
          markerStyle: {
             'width':'3px',
             'background-color': 'white',
             'border-radius': '50%',
          },
          markers:[
            {time: 3, text: "Task 1"},
            {time: 5, text: "Task 2"},
            {time: 12, text: "Task 3"},
            {time: 17, text: "Task 4"},
          ]
        });
      });
  }

  skipToException(): void{ 
      //TODO: take time of exception from local storage
      this.player.currentTime(5);
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
