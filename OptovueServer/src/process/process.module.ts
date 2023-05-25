import { Module } from '@nestjs/common';
import { processProviders } from './process.providers';
import { ProcessService } from './process.service';
import { ProcessController } from './process.controller';
import { DatabaseModule } from '../database/database.module';
import { StageService } from 'src/stage/stage.service';
import { SessionService } from 'src/session/session.service';

@Module({
  imports: [DatabaseModule],
  controllers: [ProcessController],
  providers: [
    ProcessService,
    SessionService,
    StageService,
    ...processProviders,
  ],
})
export class ProcessModule {}
