import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class TimeSyncService {
  constructor(private httpClient: HttpClient) {}

  msToTime(duration: number) {
    let milliseconds = Math.floor((duration % 1000) / 100),
      seconds = Math.floor((duration / 1000) % 60),
      minutes = Math.floor((duration / (1000 * 60)) % 60),
      hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
  
    const hoursSt = (hours < 10) ? "0" + hours : hours;
    const minutesSt = (minutes < 10) ? "0" + minutes : minutes;
    const secondsSt = (seconds < 10) ? "0" + seconds : seconds;
  
    return hoursSt + ":" + minutesSt + ":" + secondsSt;
  }

  secToHours(starttimezoneoffset: number) {
    return starttimezoneoffset/3600; //60 sec for every min in 60 min
  }

  normalizeHour(sessionId: string, initialDate: Date): Date{
    const currentSession = JSON.parse(localStorage.getItem(sessionId)!);
    const correctHour = currentSession.starttimezoneoffset ?
      initialDate.getHours()-this.secToHours(currentSession.starttimezoneoffset):
      initialDate.getHours();
    initialDate.setHours(correctHour);
    return initialDate;

  }
}
