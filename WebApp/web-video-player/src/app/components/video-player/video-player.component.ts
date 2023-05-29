import { HttpParams, HttpHeaders, HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Stage } from 'src/app/models/stage';
import { TimeSyncService } from 'src/app/services/time-sync.service';
import videojs from 'video.js';
import 'videojs-markers';
@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css']
})
export class VideoPlayerComponent implements OnDestroy, AfterViewInit {
  @Input() areStagesPresent: boolean = false;
  @Input() isException: boolean = false;
  @Input() stages: Stage[] = []
  player: any;
  url: string = "";
  mappedStartTime: string = "";
  mappedEndTime: string = "";

  constructor(
    private httpClient: HttpClient, 
    private activatedRoute: ActivatedRoute,
    private timeSyncService: TimeSyncService, 
    ) { 
    
  }

  ngOnInit(): void{
    this.activatedRoute.queryParams.subscribe(params => {
      const sessionid = params['sessionid'];
      const startTime = params['startTime'];
      const endTime = params['endTime'];
      if(sessionid == undefined || startTime == undefined || endTime == undefined){
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
      else{
        //add post request towards session video with starting and finishing time 
        let bodyParams = new HttpParams();
        const currentSession = JSON.parse(localStorage.getItem(sessionid)!);
        const sessionStart =  new Date(currentSession.startdatetime);
        const correctHour = currentSession.starttimezoneoffset ?
          sessionStart.getHours()-this.timeSyncService.secToHours(currentSession.starttimezoneoffset): //this.videoService.secToHours(currentSession.starttimezoneoffset) :
          sessionStart.getHours()-2;
        sessionStart.setHours(correctHour);
        const caseStart = new Date(startTime);
        const caseEnd = new Date(endTime);
        this.mappedStartTime = this.timeSyncService.msToTime(+caseStart - +sessionStart);
        this.mappedEndTime = this.timeSyncService.msToTime(+caseEnd- +sessionStart );
        
        bodyParams = bodyParams.append("name", sessionid);
        bodyParams = bodyParams.append("start_time", this.mappedStartTime);
        bodyParams = bodyParams.append("end_time", this.mappedEndTime);
        this.httpClient
          .post("http://localhost:3000/video/crop",bodyParams,{ responseType: "blob"})
          .subscribe((res) => {
            this.url =  URL.createObjectURL(res);
            this.player.src({
              src: this.url,
              type:"video/mp4",
            });
            if(this.areStagesPresent){
              const markers: { time: any; text: string; }[] = [];
              this.stages.forEach(stage => {
                const timeInSec = this.timeSyncService.hoursToSec(stage.relativeTime);
                markers.push({time: timeInSec, text: "Stage " + (+stage.stageIndex+1)})
              });
              this.player.markers({
                markerStyle: {
                  'width':'3px',
                  'background-color': 'white',
                  'border-radius': '50%',
                },
                markers: markers,
              });
            }
        });
      }
    })
  }

  skipToException(): void{ 
      const startingSec = this.timeSyncService.hoursToSec(this.mappedStartTime);
      const endSec = this.timeSyncService.hoursToSec(this.mappedEndTime);
      const videoLength = endSec - startingSec;
      if(videoLength > 5){
        this.player.currentTime(videoLength - 5);  
      }
      else{
        if(videoLength > 1){
          this.player.currentTime(videoLength - 1);  
        }
        else{
          this.player.currentTime(videoLength);
        }
      }
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
  
  getButtonTop(): number{
    const player = document.getElementById("video-player");
    const heightPlayer = player?.clientHeight;
    const header = document.getElementById('header');
    return heightPlayer? (window.innerHeight - header!.clientHeight)/2 + heightPlayer/2 - 150 : 0;
  }
  
  getButtonLeft(): number{
    const player = document.getElementById("video-player");
    const button = document.getElementById('overlay-button')
    const widthPlayer = player?.clientWidth;
    return widthPlayer && button? widthPlayer - button.clientWidth - 50 : 0;
  }
}
