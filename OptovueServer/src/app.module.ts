import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VideoModule } from './video/video.module';
import { ProcessModule } from './process/process.module';
import { UserModule } from './user/user.module';
import { SessionModule } from './session/session.module';
import { QueueItemModule } from './queueItem/queueItem.module';

@Module({
  imports: [
    VideoModule,
    ProcessModule,
    UserModule,
    SessionModule,
    QueueItemModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
