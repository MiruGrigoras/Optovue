import { DataSource } from 'typeorm';
import { Process } from './process.entity';
import { DATA_SOURCE, PROCESS_REPOSITORY } from 'src/constants';

export const processProviders = [
  {
    provide: PROCESS_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Process),
    inject: [DATA_SOURCE],
  },
];
