import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { ActivatedRoute, Router } from '@angular/router';
import { Case } from 'src/app/models/case';

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

  
  constructor(private activatedRoute: ActivatedRoute, private router: Router){}
    
  ngOnInit(): void{
    this.activatedRoute.queryParams.subscribe(params => {
      const currentCaseId = params['caseid'];
      const sessionId = params['sessionid'];
      const sessionObject = JSON.parse(localStorage.getItem(sessionId)!);
      const processid = sessionObject.processid;
      this.casesArray = JSON.parse(localStorage.getItem(processid)!);
      for(let i=0; i< this.casesArray.length; i++){
        if(this.casesArray[i].id === currentCaseId){
          this.currentCaseIndex = this.casesArray[i].localStorageIndex;
          this.currentCaseKey = this.casesArray[i].keyvalue;
          break;

        }
      }
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
        startTime: nextCase.loaded,
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
        startTime: nextCase.loaded,
        endTime: nextCase.finished,
      }}
    )
  }
 
}


