import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Process } from 'src/app/models/process';
import { map } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-processes-list',
  templateUrl: './processes-list.component.html',
  styleUrls: ['./processes-list.component.css']
})
export class ProcessesListComponent implements OnInit {
  allProcesses: Process[] = [];
  displayedColumns: string[] = ['process_id', 'see_cases'];

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
      console.log(processes);
    })
  }

  navigateToCases(){
    this.router.navigateByUrl('/video');
  }
}
