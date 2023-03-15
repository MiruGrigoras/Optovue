import { Body, Controller, Post, Headers, Response } from '@nestjs/common';
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
}
