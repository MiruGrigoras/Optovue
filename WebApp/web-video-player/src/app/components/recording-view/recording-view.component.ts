import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-recording-view',
  templateUrl: './recording-view.component.html',
  styleUrls: ['./recording-view.component.css']
})
export class RecordingViewComponent implements AfterViewInit{
  @ViewChild('drawer') drawer!: MatDrawer;
  showStages = false;

  ngAfterViewInit(){
    const img = document.getElementById('header');
    console.log(img, img?.clientWidth); 
    const imgHeight = img!.clientWidth * 154/1830;
    document.getElementById('container')!.style.height=`${window.innerHeight - imgHeight - 5}px`;
  }

  toggleDrawer(){
    this.drawer.toggle();
    this.showStages = !this.showStages
  }
}
