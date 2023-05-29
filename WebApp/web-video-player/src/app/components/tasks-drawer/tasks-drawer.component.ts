import { Component, Input } from '@angular/core';
import { Stage } from 'src/app/models/stage';

@Component({
  selector: 'app-tasks-drawer',
  templateUrl: './tasks-drawer.component.html',
  styleUrls: ['./tasks-drawer.component.css']
})
export class TasksDrawerComponent {
  @Input() allStages: Stage[] = [];
}
