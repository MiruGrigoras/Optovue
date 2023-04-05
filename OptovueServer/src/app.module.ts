import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VideoModule } from './video/video.module';
import { Process } from './process/process.entity';

@Module({
  imports: [
    VideoModule,
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: 'localhost',
      port: 56372,
      username: 'Test',
      password: '1234',
      database: 'BluePrism',
      extra: {
        trustedConnection: true,
        trustServerCertificate: true,
      },
      entities: [Process],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
