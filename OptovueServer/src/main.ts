import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { readdir, statSync, unlink } from 'node:fs';
import { VIDEO_PATH } from './constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();

function deleteOldVideos() {
  const currentTime = new Date(Date.now());
  readdir(VIDEO_PATH, (err, files) => {
    files.forEach((file) => {
      const { birthtime } = statSync(VIDEO_PATH + file);
      const timeDiff = Math.abs(currentTime.valueOf() - birthtime.valueOf());
      if (timeDiff > 604800000) {
        // 604800000 = number of milliseconds in 7 days
        unlink(VIDEO_PATH + file, (err) => {
          if (err) throw err;
        });
        console.log(file);
      }
    });
  });
}

setInterval(deleteOldVideos, 3600000); //repeat every hour
