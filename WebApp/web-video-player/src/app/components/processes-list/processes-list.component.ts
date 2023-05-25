import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Process } from 'src/app/models/process';
import { map } from 'rxjs';
import { Router } from '@angular/router';
import { Session } from 'src/app/models/session';

@Component({
  selector: 'app-processes-list',
  templateUrl: './processes-list.component.html',
  styleUrls: ['./processes-list.component.css']
})
export class ProcessesListComponent implements OnInit {
  allProcesses: Process[] = [];
  runningStatus: Map<string, any> = new Map<string, any>();
  showCasesStatus: Map<string, any> = new Map<string, any>();
  private timeoutId: any;

  constructor(private httpClient: HttpClient, private router: Router){
  }

  ngOnInit(): void{
    this.httpClient.get<{[key: string]:Process}>('http://localhost:3000/process')
    .pipe(map((res)=>{
      const processes = [];
      for(const key in res){
        processes.push(res[key])
      }
      return processes;
    }))
    .subscribe((processes)=>{
      this.allProcesses = processes;
      this.initialiseRunningStates();
      this.initialiseShowCasesStates();
    })
  }

  navigateToCases(processid: string){
    this.router.navigate(
      ['/cases'],
      { queryParams: {processid: processid}});
  }
  
  initialiseRunningStates() {
    for (let i = 1; i < this.allProcesses.length; i++) {
      this.runningStatus.set(this.allProcesses[i].processid, false);
    }
  }

  initialiseShowCasesStates() {
    for (let i = 1; i < this.allProcesses.length; i++) {
      let processid = this.allProcesses[i].processid;
      let showCases = this.sendPostRequest(processid);//verify in the db if the last session run has cases to show 
      this.showCasesStatus.set(processid, showCases);
    }
  }

  isRunning(processid: string): boolean {
    if (this.runningStatus.get(processid) === true)
      return true;
    return false;
  }
  
  hasCasesToDisplay(processid: string): boolean{
    if (this.showCasesStatus.get(processid) === true)
      return true;
    return false;
  }

  runProcess(processid:string, processName: string) {
    var command = 'cd D:/Programe/Blue Prism Automate && AutomateC.exe /run "' + processName + '" /resource DESKTOP-R56NS81 /user admin admin12345';
    const params = new HttpParams()
      .set('command', command);

    this.httpClient
      .get("http://localhost:3000/process/run", { params })
      .subscribe((res) => {
        console.log(res);
      });
      
      this.showCasesStatus.set(processid, false);
      this.runningStatus.set(processid, true);
      this.startProcessStatusRequestInterval(processid);
  }

  startProcessStatusRequestInterval(processid: string): void {
    this.timeoutId = setTimeout(() => {
      this.sendPostRequest(processid);
      this.startProcessStatusRequestInterval(processid);
    }, 5000); // Interval in milliseconds (e.g., 5000ms = 5 seconds)
  }

  sendPostRequest(processid: string) : void {
    let bodyParams = new HttpParams();
    bodyParams = bodyParams.append("processid", processid);
    this.httpClient
      .post('http://localhost:3000/session/mostRecent', bodyParams)
      .subscribe((res) => {
        const result: Session = res as Session;
        if(!result.enddatetime)
          {  
            this.showCasesStatus.set(processid, false);
            this.runningStatus.set(processid, true);
          }
        else
          { 
            this.showCasesStatus.set(processid, true);
            this.runningStatus.set(processid, false);
            this.stopProcessStatusRequestInterval();
          }
      })
  }

  stopProcessStatusRequestInterval(): void {
    clearTimeout(this.timeoutId);
  }
}
