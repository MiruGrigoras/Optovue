import { Module } from '@nestjs/common';
import { processProviders } from './process.providers';
import { ProcessService } from './process.service';
import { DatabaseModule } from 'src/database/database.module';
import { ProcessController } from './process.controller';

@Module({
  imports: [DatabaseModule],
  providers: [...processProviders, ProcessService],
  controllers: [ProcessController],
})
export class ProcessModule {}
