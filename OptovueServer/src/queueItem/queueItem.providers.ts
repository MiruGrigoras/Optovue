import { QUEUE_REPOSITORY } from 'src/constants';
import { QueueItem } from './queueItem.entity';

export const queueItemProviders = [
  {
    provide: QUEUE_REPOSITORY,
    useValue: QueueItem,
  },
];
