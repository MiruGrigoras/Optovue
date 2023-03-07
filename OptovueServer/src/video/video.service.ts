import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Response } from 'express';
import { createReadStream, statSync } from 'fs';

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
      };
      res.set(head);
      res.status(206);
      file.pipe(res);
    } else {
      const head = {
        'Content-Length': fileSize,
        'Content-Type': 'video/mp4',
      };

      res.set(head);
      res.status(200);
      createReadStream(path).pipe(res);
    }

    return name;
  }
}
