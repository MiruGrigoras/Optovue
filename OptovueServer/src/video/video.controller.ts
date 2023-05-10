import { Body, Controller, Post, Headers, Response, Get, Query, Param } from '@nestjs/common';
import { Response as Res } from 'express';
import { VideoService } from './video.service';

@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Post()
  getVideo(
    @Body('name') videoName: string,
    @Headers('range') range: string,
    @Response() res: Res,
  ) {
    this.videoService.getVideoFromDatabase(videoName, range, res);
  }

  @Post('/crop')
  cropVideo(
    @Body('name') videoName: string,
    @Body('start_time') start_time: string,
    @Body('end_time') end_time: string,
    @Response() res: Res,
  ) {
    return this.videoService.cropVideo(videoName, start_time, end_time, res);
  }
}
