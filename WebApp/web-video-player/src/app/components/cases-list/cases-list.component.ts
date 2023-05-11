import { HttpClient, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { Case } from 'src/app/models/case';
import { Session } from 'src/app/models/session';

@Component({
  selector: 'app-cases-list',
  templateUrl: './cases-list.component.html',
  styleUrls: ['./cases-list.component.css']
})
export class CasesListComponent {
  allCases: Case[] = [];

  constructor(
    private httpClient: HttpClient, 
    private activatedRoute: ActivatedRoute, 
    private router: Router
  ){}

  ngOnInit(): void{
    this.activatedRoute.queryParams.subscribe(params =>{
      const processidParam = params['processid'];
      console.log("Routing: ", processidParam);

      if(processidParam == undefined){
        this.httpClient.get<{[key: string]:Case}>('http://localhost:3000/queueItem')
          .pipe(map((res)=>{
            const cases = [];
            for(const key in res){
              cases.push(res[key])
            }
            return cases;
          }))
          .subscribe((cases)=>{
            this.allCases = cases;
          })
      }
      else{
        let bodyParams = new HttpParams();
        bodyParams = bodyParams.append("processid", processidParam);
        this.httpClient
          .post('http://localhost:3000/session/sessionStartTime', bodyParams)
          .subscribe((res) => {
            const result: Session = res as Session;
            localStorage.setItem(result.sessionid, result.startdatetime.toLocaleString());
          })

        this.httpClient.get<{[key: string]:Case}>('http://localhost:3000/queueItem',{
          params: {
            processid: processidParam
          }
        })
          .pipe(map((res)=>{
            const cases = [];
            for(const key in res){
              cases.push(res[key])
            }
            return cases;
          }))
          .subscribe((cases)=>{
            this.allCases = cases;
          })
      }
      
    }); 
  } 
  navigateToVideo(sessionid: string, caseid: string, loadingTime: Date, finishedTime: Date){
    console.log(caseid);
    
      this.router.navigate(
        ['/video'],
        { queryParams: {
          caseid: caseid,
          sessionid: sessionid,
          startTime: loadingTime,
          endTime: finishedTime
        }});
    }
}
