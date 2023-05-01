import { Sequelize } from 'sequelize-typescript';
import { DATA_SOURCE } from 'src/constants';
import { Process } from 'src/process/process.entity';
import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: DATA_SOURCE,
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mssql',
        host: 'localhost',
        port: 1433,
        username: 'Test',
        password: '12341234',
        database: 'BluePrism',
        extra: {
          trustedConnection: true,
          trustServerCertificate: true,
        },
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];
