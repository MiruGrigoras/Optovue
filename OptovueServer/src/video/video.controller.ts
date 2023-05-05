import { Body, Controller, Post, Headers, Response, Get, Query } from '@nestjs/common';
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

  @Get('/crop')
  cropVideo(
    @Query('name') videoName: string,
    @Query('start_time') start_time: string,
    @Query('end_time') end_time: string,
  ): string {
    return this.videoService.cropVideo(videoName, start_time, end_time);
  }
}
