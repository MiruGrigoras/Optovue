import { DATA_SOURCE } from 'src/constants';
import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: DATA_SOURCE,
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mssql',
        host: 'localhost',
        port: 56372,
        username: 'Test',
        password: '1234',
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
