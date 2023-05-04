import { PROCESS_REPOSITORY } from 'src/constants';
import { BPAProcess } from './process.entity';

export const processProviders = [
  {
    provide: PROCESS_REPOSITORY,
    useValue: BPAProcess,
  },
];
