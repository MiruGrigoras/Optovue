import { DataSource } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SessionsDataSource } from './sessions.datasource';
import { Session } from 'src/app/models/session';
import { map } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-sessions-list',
  templateUrl: './sessions-list.component.html',
  styleUrls: ['./sessions-list.component.css']
})
export class SessionsListComponent implements OnInit {
  allSessions: Session[] = [];
  displayedColumns: string[] = ['session_id', 'see_cases'];
  dataSource: MatTableDataSource<Session> ;

  constructor(private httpClient: HttpClient){
  //  this.dataSource = new SessionsDataSource(httpClient);
  //   this.dataSource.loadSessions();
    this.dataSource= new MatTableDataSource() ;
    console.log("Constructor: ", this.dataSource.data.length)
  }
  ngOnInit(): void{
    this.httpClient.get<{[key: string]:Session}>('http://localhost:3000/session')
    .pipe(map((res)=>{
      const sessions = [];
      for(const key in res){
        sessions.push(res[key])
      }
      return sessions;
    }))
    .subscribe((sessions)=>{
      this.allSessions = sessions;
      this.dataSource = new MatTableDataSource(sessions);
      console.log("Subscribe: ", this.dataSource.data.length)
    })
  }
}
