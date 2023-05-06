import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { queueItemProviders } from './queueItem.providers';
import { QueueItemController } from './queueItem.controller';
import { QueueItemService } from './queueItem.service';
import { SessionService } from 'src/session/session.service';

@Module({
  imports: [DatabaseModule],
  controllers: [QueueItemController],
  providers: [QueueItemService, SessionService, ...queueItemProviders],
})
export class QueueItemModule {}
