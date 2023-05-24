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
  sessionStartTime: string = '';
  sessionId:string = ''; 
   
  constructor(
    private httpClient: HttpClient, 
    private activatedRoute: ActivatedRoute, 
    private timeSyncService: TimeSyncService, 
  ){}

  ngOnInit():void{
    this.activatedRoute.queryParams.subscribe(params => {
      const caseId = params['caseid'];
      this.sessionId = params['sessionid'];
      this.sessionStartTime = params['startTime'];
      const endTime = params['endTime'];
      const sessionObject = JSON.parse(localStorage.getItem(this.sessionId)!);
      const sessionNo = sessionObject.sessionnumber;
      const offset =  this.timeSyncService.secToHours(sessionObject.starttimezoneoffset);
      let bodyParams = new HttpParams();
      bodyParams = bodyParams.append("sessionnumber", sessionNo);
      bodyParams = bodyParams.append("startTime", this.sessionStartTime);
      bodyParams = bodyParams.append("endTime", endTime);
      bodyParams = bodyParams.append("hoursOffset", offset);
      this.httpClient
      .post<{[key: string]:Stage}>('http://localhost:3000/stage', bodyParams)
      .pipe(map((res)=>{
        const stages = [];
        for(const key in res){
          stages.push({...res[key], stageIndex: +key});
        }
        return stages;
      }))
      .subscribe((stages) =>{
        this.allStages = stages;
        localStorage.setItem(caseId, JSON.stringify(this.allStages));
      })
    })
  }

  getStageTime(stage:Stage): string{
    const sessionStartDate = new Date(this.sessionStartTime);// this.timeSyncService.normalizeHour(this.sessionId, new Date(this.sessionStartTime));
    const stageStartDate = this.timeSyncService.normalizeHour(this.sessionId, new Date(stage.startdatetime));
    return this.timeSyncService.msToTime(+stageStartDate - +sessionStartDate);
  }
}
