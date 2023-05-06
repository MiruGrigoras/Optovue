import { Inject, Injectable } from '@nestjs/common';
import { QUEUE_REPOSITORY } from 'src/constants';
import { QueueItem } from './queueItem.entity';
import { Sequelize } from 'sequelize-typescript';
import { SessionService } from 'src/session/session.service';

@Injectable()
export class QueueItemService {
  constructor(
    @Inject(QUEUE_REPOSITORY)
    private queueRepository: typeof QueueItem,

    private sessionService: SessionService,
  ) {}

  async findAll(): Promise<QueueItem[]> {
    return await this.queueRepository.findAll<QueueItem>({
      attributes: [
        'id',
        'sessionid',
        'loaded',
        'completed',
        'exception',
        'finished',
      ],
    });
  }

  async findCasesOfMostRecentSessionByProcessId(
    processIdParam: string,
  ): Promise<QueueItem[]> {
    const sessions = await this.sessionService.findSessionsByProcessId(
      processIdParam,
    );

    return await this.queueRepository.findAll<QueueItem>({
      attributes: [
        'id',
        'sessionid',
        'loaded',
        'completed',
        'exception',
        'finished',
      ],
      where: {
        sessionid: sessions[0].sessionid,
      },
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
