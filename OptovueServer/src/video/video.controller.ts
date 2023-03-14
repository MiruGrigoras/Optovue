import { Body, Controller, Get, Headers, Response } from '@nestjs/common';
import { Response as Res } from 'express';
import { VideoService } from './video.service';

@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Get()
  printSmth(
    @Body('name') videoName: string,
    @Headers('range') range: string,
    @Response() response: Res,
  ) {
    return this.videoService.getVideoFromDatabase(videoName, range, response);
  }
}
