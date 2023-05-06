import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { HttpClientModule } from "@angular/common/http";
import { AppComponent } from "./app.component";
import { VideoPlayerComponent } from "./components/video-player/video-player.component";
import { VideoPlayerService } from "./services/video-player.service";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatGridListModule} from '@angular/material/grid-list';
@NgModule({
  declarations: [AppComponent, VideoPlayerComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, BrowserAnimationsModule, MatGridListModule],
  providers: [VideoPlayerService],
  bootstrap: [AppComponent],
})
export class AppModule {}
