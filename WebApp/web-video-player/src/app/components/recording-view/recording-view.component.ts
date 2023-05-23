import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-recording-view',
  templateUrl: './recording-view.component.html',
  styleUrls: ['./recording-view.component.css']
})
export class RecordingViewComponent {
  @ViewChild('drawer') drawer!: MatDrawer;
  showStages = false;
  toggleDrawer(){
    this.drawer.toggle();
    this.showStages = !this.showStages
  }
}
