import { QUEUE_REPOSITORY, SESSION_REPOSITORY } from 'src/constants';
import { QueueItem } from './queueItem.entity';
import { Session } from 'src/session/session.entity';

export const queueItemProviders = [
  {
    provide: QUEUE_REPOSITORY,
    useValue: QueueItem,
  },
  {
    provide: SESSION_REPOSITORY,
    useValue: Session,
  },
];
