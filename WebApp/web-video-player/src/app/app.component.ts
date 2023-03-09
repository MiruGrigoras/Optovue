import { Component } from '@angular/core';
import { VideoJsOptions } from "src/models/videojs-options";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'web-video-player';
  videoJsOptions: VideoJsOptions = {
    controls: true,
    loadingSpinner: true,
    height: "480",
    width: "1000",
    sources: [{
      src: '//amssamples.streaming.mediaservices.windows.net/91492735-c523-432b-ba01-faba6c2206a2/AzureMediaServicesPromo.ism/manifest(format=m3u8-aapl-v3)',
      type: 'application/x-mpegURL'
    }]
  };
}
