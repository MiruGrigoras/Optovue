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
    const name = "ocean.mp4"
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


  skipToException(): void{ //exp string  '04 Dec 1995 00:00:10 GMT'
    //get exception time from endpoint
    console.log("is called");

    const params = new HttpParams()
      .set('case_id', 'value1')
      .set('session_id', 'value2');
    
    console.log("is called");

    this.httpClient
    .get("http://localhost:3000/video/getExceptionTime", {params, responseType: 'text'})
    .subscribe((res) => {
      console.log(res);
      const [hours, minutes, seconds] = res.toString().split(':');
      const totalSeconds = +hours * 60 * 60 + +minutes * 60 + +seconds;
      this.player.currentTime(totalSeconds);
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
