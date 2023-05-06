import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { HttpClientModule } from "@angular/common/http";
import { AppComponent } from "./app.component";
import { VideoPlayerComponent } from "./components/video-player/video-player.component";
import { SessionsListComponent } from './components/sessions-list/sessions-list.component';
import { VideoPlayerService } from "./services/video-player.service";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button'


import { RouterModule, Routes } from "@angular/router";

const appRoute:Routes =[
  {path: '', redirectTo:'sessions', pathMatch: 'full'},
  {path: 'sessions', component: SessionsListComponent},
  {path: 'video', component: VideoPlayerComponent}
] 
@NgModule({
  declarations: [AppComponent, VideoPlayerComponent, SessionsListComponent],
  imports: [
    BrowserModule, 
    AppRoutingModule, 
    HttpClientModule, 
    RouterModule.forRoot(appRoute), 
    BrowserAnimationsModule, 
    MatGridListModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule
  ],
  providers: [VideoPlayerService],
  bootstrap: [AppComponent],
})
export class AppModule {}
