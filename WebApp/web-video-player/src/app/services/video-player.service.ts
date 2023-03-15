import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class VideoPlayerService {
  constructor(private httpClient: HttpClient) {}
}
