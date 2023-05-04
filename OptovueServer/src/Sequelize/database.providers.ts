import { Sequelize } from 'sequelize-typescript';
import { SEQUELIZE } from 'src/constants';
import { BPAProcess } from './process/process.entity';

export const databaseProviders = [
  {
    provide: SEQUELIZE,
    useFactory: async () => {
      const sequelize = new Sequelize({
        host: 'localhost',
        port: 1433,
        username: 'Test',
        password: '12341234',
        database: 'BluePrism',
        dialect: 'mssql',
      });
      sequelize.addModels([BPAProcess]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
