import { Sequelize } from 'sequelize-typescript';
import { SEQUELIZE } from 'src/constants';
import { Process } from './process/process.entity';

export const databaseProviders = [
  {
    provide: SEQUELIZE,
    useFactory: async () => {
      const sequelize = new Sequelize('BluePrism', 'Test', '12341234', {
        host: 'localhost',
        dialect: 'mssql',
        dialectOptions: {
          server: 'MIRUSPC\\SQLEXPRESS',
          options: {
            instanceName: 'SQLEXPRESS',
            useUTC: false,
            dateFirst: 1,
            requestTimeout: 5000,
          },
        },
        // dialect: 'mssql',
        // dialectOptions: {
        //   authentication: {
        //     options: {
        //       domain: 'OPTOVUEGROUP',
        //       userName: 'Test',
        //       password: '12341234',
        //     },
        //   },
        //   options: {
        //     database: 'BluePrism',
        //     instanceName: 'SQLEXPRESS',
        //   },
        // },

        // host: 'localhost',
        // port: 56372,
        // username: 'Test',
        // password: '1234',
        // database: 'BluePrism',
        // define: {
        //   freezeTableName: true,
        //   createdAt: false,
        //   updatedAt: false,
        // },
        // dialectOptions: {
        //   options: {
        //     useUTC: false,
        //     dateFirst: 1,
        //   },
        // },
      });
      sequelize.addModels([Process]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
