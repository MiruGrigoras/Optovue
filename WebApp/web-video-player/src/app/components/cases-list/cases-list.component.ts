import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { Case } from 'src/app/models/case';

@Component({
  selector: 'app-cases-list',
  templateUrl: './cases-list.component.html',
  styleUrls: ['./cases-list.component.css']
})
export class CasesListComponent {
  allCases: Case[] = [];

  constructor(private httpClient: HttpClient, private activatedRoute: ActivatedRoute){
  }

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
}
