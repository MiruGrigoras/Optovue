import { HttpClient, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { Stage } from 'src/app/models/stage';
import { TimeSyncService } from 'src/app/services/time-sync.service';

@Component({
  selector: 'app-tasks-drawer',
  templateUrl: './tasks-drawer.component.html',
  styleUrls: ['./tasks-drawer.component.css']
})
export class TasksDrawerComponent {
  allStages: Stage[] = [];
   
  constructor(
    private httpClient: HttpClient, 
    private activatedRoute: ActivatedRoute, 
    private timeSyncService: TimeSyncService, 
  ){}

  ngOnInit():void{
    this.activatedRoute.queryParams.subscribe(params => {
      const sessionId = params['sessionid'];
      const startTime = params['startTime'];
      const endTime = params['endTime'];
      const sessionObject = JSON.parse(localStorage.getItem(sessionId)!);
      const sessionNo = sessionObject.sessionnumber;
      const offset =  this.timeSyncService.secToHours(sessionObject.starttimezoneoffset);
      let bodyParams = new HttpParams();
      bodyParams = bodyParams.append("sessionnumber", sessionNo);
      bodyParams = bodyParams.append("startTime", startTime);
      bodyParams = bodyParams.append("endTime", endTime);
      bodyParams = bodyParams.append("hoursOffset", offset);
      this.httpClient
      .post<{[key: string]:Stage}>('http://localhost:3000/stage', bodyParams)
      .pipe(map((res)=>{
        const stages = [];
        for(const key in res){
          stages.push(res[key])
        }
        return stages;
      }))
      .subscribe((stages) =>{
        this.allStages = stages;
      })
    })
  }
}
