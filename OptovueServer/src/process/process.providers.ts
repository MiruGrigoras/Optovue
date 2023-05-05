import { PROCESS_REPOSITORY } from 'src/constants';
import { Process } from './process.entity';

export const processProviders = [
  {
    provide: PROCESS_REPOSITORY,
    useValue: Process,
  },
];
