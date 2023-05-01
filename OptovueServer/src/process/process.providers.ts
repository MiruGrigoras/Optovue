import { DataSource } from 'typeorm';
import { Process } from './process.entity';
import { PROCESS_REPOSITORY_ORM, DATA_SOURCE } from 'src/constants';

export const processProviders = [
  {
    provide: PROCESS_REPOSITORY_ORM,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Process),
    inject: [DATA_SOURCE],
  },
];
