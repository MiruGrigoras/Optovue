import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Response } from 'express';
import { createReadStream, createWriteStream, statSync } from 'fs';

const currentFile = require.main.filename;

const VIDEO_PATH =
  currentFile.substring(0, currentFile.indexOf('\\dist\\main.js')) +
  '\\src\\video\\actual-videos\\';

@Injectable()
export class VideoService {
  getVideoFromDatabase(name: string, range: string, res: Response): any {
    const path = VIDEO_PATH + name;
    if (path === VIDEO_PATH) {
      throw new HttpException(
        'Error 404, no video found with that name.',
        HttpStatus.NOT_FOUND,
      );
    }
    const fileSize = statSync(path).size;
    if (range) {
      const parts = range.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

      const chunksize = end - start + 1;
      const file = createReadStream(path, { start, end });
      const head = {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': 'video/mp4',
        'Access-Control-Allow-Origin': '*',
      };
      res.set(head);
      res.status(206);
      file.pipe(res);
    } else {
      const head = {
        'Content-Length': fileSize,
        'Content-Type': 'video/mp4',
        'Access-Control-Allow-Origin': '*',
      };

      res.set(head);
      res.status(200);
      createReadStream(path).pipe(res);
    }
  }

  timeStringToSeconds(time: string): number {
    const [hours, minutes, seconds] = time.split(':');
    const totalSeconds = +hours * 60 * 60 + +minutes * 60 + +seconds;
    return totalSeconds;
  }

  cropVideo(sessionid: string, startTime: string, endTime: string, res: Response): any {
    const path = VIDEO_PATH + sessionid + ".mp4";
    if (path === VIDEO_PATH) {
      throw new HttpException(
        'Error 404, no video found with that name.',
        HttpStatus.NOT_FOUND,
      );
    }

    const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
    const ffmpeg = require('fluent-ffmpeg');
    ffmpeg.setFfmpegPath(ffmpegPath);
    const duration =
    this.timeStringToSeconds(endTime) - this.timeStringToSeconds(startTime);

    const head = {
      'Content-Type': 'video/mp4',
      'Access-Control-Allow-Origin': '*',
    };
    res.set(head);

    ffmpeg(path)
    .setStartTime(startTime)
    .setDuration(duration)
    .videoCodec('libx264')
    .audioCodec('aac')
    .outputFormat('mp4')
    .outputOptions([
        '-movflags frag_keyframe+empty_moov'
    ])
    .pipe(res, { end: true });
  }
}
