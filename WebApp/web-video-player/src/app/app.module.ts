import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { HttpClientModule } from "@angular/common/http";
import { AppComponent } from "./app.component";
import { VideoPlayerComponent } from "./components/video-player/video-player.component";
import { ProcessesListComponent } from './components/processes-list/processes-list.component';
import { TimeSyncService } from "./services/time-sync.service";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';


import { RouterModule, Routes } from "@angular/router";
import { CasesListComponent } from './components/cases-list/cases-list.component';
import { RecordingViewComponent } from './components/recording-view/recording-view.component';
import { TasksDrawerComponent } from './components/tasks-drawer/tasks-drawer.component';
import { StageItemComponent } from './components/stage-item/stage-item.component';
import { LogsDisabledDialogComponent } from './components/logs-disabled-dialog/logs-disabled-dialog.component';

const appRoute:Routes =[
  {path: '', redirectTo:'processes', pathMatch: 'full'},
  {path: 'processes', component: ProcessesListComponent},
  {path: 'video', component: RecordingViewComponent},
  {path: 'cases', component: CasesListComponent},
] 
@NgModule({
  declarations: [AppComponent, VideoPlayerComponent, ProcessesListComponent, CasesListComponent, RecordingViewComponent, TasksDrawerComponent, StageItemComponent, LogsDisabledDialogComponent],
  imports: [
    BrowserModule, 
    AppRoutingModule, 
    HttpClientModule, 
    RouterModule.forRoot(appRoute), 
    BrowserAnimationsModule, 
    MatGridListModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatSidenavModule,
    MatDividerModule,
    MatListModule,
    MatDialogModule
  ],
  providers: [TimeSyncService],
  bootstrap: [AppComponent],
})
export class AppModule {}
