import { Inject, Injectable } from '@nestjs/common';
import { QUEUE_REPOSITORY } from 'src/constants';
import { QueueItem } from './queueItem.entity';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class QueueItemService {
  constructor(
    @Inject(QUEUE_REPOSITORY)
    private queueRepository: typeof QueueItem,
  ) {}

  async findAll(): Promise<QueueItem[]> {
    return await this.queueRepository.findAll<QueueItem>({
      attributes: ['id'],
    });
  }
  async getCasesTimestampsInSession(sessionId: string): Promise<QueueItem[]> {
    const cases = await this.queueRepository.findAll<QueueItem>({
      attributes: ['id', 'finished'],
      where: {
        sessionid: sessionId,
      },
      order: Sequelize.literal(
        'case when completed is not null then completed else exception end',
      ),
    });
    return cases;
  }
}
