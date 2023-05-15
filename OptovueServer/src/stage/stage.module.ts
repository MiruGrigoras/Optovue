import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { stageProviders } from './stage.providers';
import { StageController } from './stage.controller';
import { StageService } from './stage.service';

@Module({
  imports: [DatabaseModule],
  controllers: [StageController],
  providers: [StageService, ...stageProviders],
})
export class StageModule {}
