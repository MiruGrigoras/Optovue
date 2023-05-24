import { HttpClient, HttpParams } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { Case } from 'src/app/models/case';
import { Stage } from 'src/app/models/stage';
import { TimeSyncService } from 'src/app/services/time-sync.service';

@Component({
  selector: 'app-recording-view',
  templateUrl: './recording-view.component.html',
  styleUrls: ['./recording-view.component.css']
})
export class RecordingViewComponent implements AfterViewInit{
  @ViewChild('drawer') drawer!: MatDrawer;
  showStages = false;
  currentCaseKey = '';
  currentCaseIndex = -1;
  casesArray: Case[] = [];
  
  allStages: Stage[] = [];
  caseStartTime: string = '';
  sessionId:string = ''; 

  
  constructor(
    private httpClient: HttpClient, 
    private activatedRoute: ActivatedRoute, 
    private router: Router,
    private timeSyncService: TimeSyncService, 
  ){}
    
  ngOnInit(): void{
    this.activatedRoute.queryParams.subscribe(params => {
      const caseId = params['caseid'];
      this.sessionId = params['sessionid'];
      const sessionObject = JSON.parse(localStorage.getItem(this.sessionId)!);
      const processid = sessionObject.processid;
      this.casesArray = JSON.parse(localStorage.getItem(processid)!);
      for(let i=0; i< this.casesArray.length; i++){
        if(this.casesArray[i].id === caseId){
          this.currentCaseIndex = this.casesArray[i].localStorageIndex;
          this.currentCaseKey = this.casesArray[i].keyvalue;
          break;

        }
      }

      //Request for stages

      this.caseStartTime = params['startTime'];
      const endTime = params['endTime'];
      
      const sessionNo = sessionObject.sessionnumber;
      const offset =  this.timeSyncService.secToHours(sessionObject.starttimezoneoffset);
      let bodyParams = new HttpParams();
      bodyParams = bodyParams.append("sessionnumber", sessionNo);
      bodyParams = bodyParams.append("startTime", this.caseStartTime);
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
        this.allStages.forEach(stage => {
          stage.relativeTime = this.getStageTime(stage)
        });
        localStorage.setItem(caseId, JSON.stringify(this.allStages));
      })




    })
  }

  ngAfterViewInit(){
    const img = document.getElementById('header');
    const imgHeight = img!.clientWidth * 154/1830;
    document.getElementById('container')!.style.height=`${window.innerHeight - imgHeight - 5}px`;
  }

  toggleDrawer(){
    this.drawer.toggle();
    this.showStages = !this.showStages
  }

  isDisabledNext(): boolean{
    return this.currentCaseIndex == this.casesArray.length-1;
  }
  

  isDisabledPrev(): boolean{
    return this.currentCaseIndex == 0;
  }

  goToNextCase(){
    const nextCase: Case = this.casesArray[this.currentCaseIndex+1];
    this.router.navigate(
      ['/video'],
      { queryParams: {
        caseid: nextCase.id,
        sessionid: nextCase.sessionid,
        startTime: nextCase.started,
        endTime: nextCase.finished,
      }}
    )
  }

  goToPrevCase(){
    const nextCase: Case = this.casesArray[this.currentCaseIndex-1];
    this.router.navigate(
      ['/video'],
      { queryParams: {
        caseid: nextCase.id,
        sessionid: nextCase.sessionid,
        startTime: nextCase.started,
        endTime: nextCase.finished,
      }}
    )
  }
  
  getStageTime(stage:Stage): string{
    const sessionStartDate = new Date(this.caseStartTime);// this.timeSyncService.normalizeHour(this.sessionId, new Date(this.sessionStartTime));
    const stageStartDate = this.timeSyncService.normalizeHour(this.sessionId, new Date(stage.startdatetime));
    return this.timeSyncService.msToTime(+stageStartDate - +sessionStartDate);
  }

  areStagesPresent(): boolean{
    return this.allStages.length > 0;
  }
 
}


