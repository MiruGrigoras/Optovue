import { Module } from '@nestjs/common';
import { processProviders } from './process.providers';
import { ProcessService } from './process.service';
import { ProcessController } from './process.controller';
import { DatabaseModule } from '../database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ProcessController],
  providers: [ProcessService, ...processProviders],
})
export class ProcessModule {}
