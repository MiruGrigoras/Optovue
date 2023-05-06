import { DataSource } from "@angular/cdk/collections";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, map } from "rxjs";
import { Session } from "src/app/models/session";

@Injectable()
export class SessionsDataSource extends DataSource<Session>{
    sessions = new BehaviorSubject<Session[]>([]);
    isLoading = new BehaviorSubject<boolean>(false);
    constructor(private httpClient: HttpClient){
      super(); 
    }

    connect(): Observable<Session[]> {
        return this.sessions.asObservable();
    }

    disconnect(): void {
        this.sessions.complete();
    }

    loadSessions(): void{
      this.isLoading.next(true);
      this.httpClient.get<{[key: string]:Session}>('http://localhost:3000/session')
        .pipe(map((res)=>{
          const sessions = [];
          for(const key in res){
              sessions.push(res[key])
          }
          return sessions;
        }))
        .subscribe((sessions)=>{
          console.log(sessions);
          this.sessions.next(sessions);
          this.isLoading.next(false);
        })
    }
    
}