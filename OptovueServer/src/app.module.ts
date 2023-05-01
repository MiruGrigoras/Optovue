import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VideoModule } from './video/video.module';
import { ProcessModuleORM } from './process/process.module';

@Module({
  imports: [VideoModule, ProcessModuleORM],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
