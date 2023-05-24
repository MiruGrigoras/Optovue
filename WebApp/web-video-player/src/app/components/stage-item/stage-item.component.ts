import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stage-item',
  templateUrl: './stage-item.component.html',
  styleUrls: ['./stage-item.component.css']
})
export class StageItemComponent {
  @Input() stageName = '';
  @Input() stageIndex = -1;
  @Input() startTime = '';
}
