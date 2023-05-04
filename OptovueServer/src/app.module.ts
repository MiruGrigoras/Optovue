import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VideoModule } from './video/video.module';
import { ProcessModule } from './Sequelize/process/process.module';

@Module({
  imports: [VideoModule, ProcessModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
