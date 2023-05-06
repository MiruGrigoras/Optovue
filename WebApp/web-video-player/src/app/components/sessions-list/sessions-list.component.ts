import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Session } from 'src/app/models/session';

@Component({
  selector: 'app-sessions-list',
  templateUrl: './sessions-list.component.html',
  styleUrls: ['./sessions-list.component.css']
})
export class SessionsListComponent {
  allSessions: Session[] = [];

  constructor(private httpClient: HttpClient){
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
      this.allSessions = sessions;
    })
  }
}
