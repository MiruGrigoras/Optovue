import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { Stage } from 'src/app/models/stage';
import { TimeSyncService } from 'src/app/services/time-sync.service';

@Component({
  selector: 'app-tasks-drawer',
  templateUrl: './tasks-drawer.component.html',
  styleUrls: ['./tasks-drawer.component.css']
})
export class TasksDrawerComponent {
  @Input() allStages: Stage[] = [];
}
