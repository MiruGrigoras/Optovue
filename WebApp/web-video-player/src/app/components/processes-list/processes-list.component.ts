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
  currentProcessId : string | undefined;
  showCases:boolean = false;
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
    })
  }

  navigateToCases(processid: string){
    this.router.navigate(
      ['/cases'],
      { queryParams: {processid: processid}});
  }
  
  setCurrentProcess(processid: string)
  {
    this.currentProcessId = processid;
    this.showCases = this.sendPostRequest(this.currentProcessId);//verify if the last session run has cases to show 
  }

  runProcess(processid:string, processName: string) {
    //TODO: check that the process has started and on the right machine
    var command = 'cd C:/Program Files/Blue Prism Limited/Blue Prism Automate && AutomateC.exe /run "' + processName + '" /resource DESKTOP-R56NS81 /user admin admin12345';
    const params = new HttpParams()
      .set('command', command);

    this.httpClient
      .get("http://localhost:3000/process/run", { params })
      .subscribe((res) => {
        console.log(res);
      });
      
      this.showCases  = false;
      //this.startProcessStatusRequestInterval(processid);
  }

  startProcessStatusRequestInterval(processid: string): void {
    this.timeoutId = setTimeout(() => {
      this.sendPostRequest(processid);
      this.startProcessStatusRequestInterval(processid);
    }, 5000); // Interval in milliseconds (e.g., 5000ms = 5 seconds)
  }

  sendPostRequest(processid: string): any {
    let bodyParams = new HttpParams();
    bodyParams = bodyParams.append("processid", processid);
    this.httpClient
      .post('http://localhost:3000/session/time', bodyParams)
      .subscribe((res) => {
        const result: Session = res as Session;
        console.log(res);
        console.log(result.enddatetime);

        if(!result.enddatetime)
          {  
            this.showCases  = false;
            return false;
          }
        else
          { 
            this.showCases  = true; 
            this.stopProcessStatusRequestInterval();
            return true;
          }
      })
  }

  stopProcessStatusRequestInterval(): void {
    clearTimeout(this.timeoutId);
  }
}
