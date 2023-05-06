import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { HttpClientModule } from "@angular/common/http";
import { AppComponent } from "./app.component";
import { VideoPlayerComponent } from "./components/video-player/video-player.component";
import { ProcessesListComponent } from './components/processes-list/processes-list.component';
import { VideoPlayerService } from "./services/video-player.service";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';


import { RouterModule, Routes } from "@angular/router";
import { CasesListComponent } from './components/cases-list/cases-list.component';

const appRoute:Routes =[
  {path: '', redirectTo:'processes', pathMatch: 'full'},
  {path: 'processes', component: ProcessesListComponent},
  {path: 'video', component: VideoPlayerComponent},
  {path: 'cases', component: CasesListComponent},
] 
@NgModule({
  declarations: [AppComponent, VideoPlayerComponent, ProcessesListComponent, CasesListComponent],
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
    MatMenuModule
  ],
  providers: [VideoPlayerService],
  bootstrap: [AppComponent],
})
export class AppModule {}
