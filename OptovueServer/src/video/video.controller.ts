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

  @Get('/crop')
  cropVideo(
    @Query('name') videoName: string,
    @Query('start_time') start_time: string,
    @Query('end_time') end_time: string,
  ): string {
    return this.videoService.cropVideo(videoName, start_time, end_time);
  }

  @Get('/getExceptionTime')
  getExceptionTime(
    @Query('case_id') case_id: string,
    @Query('session_id') session_id: string,
  ): string {
    return this.videoService.getExceptionTime(case_id, session_id);
  }
}
