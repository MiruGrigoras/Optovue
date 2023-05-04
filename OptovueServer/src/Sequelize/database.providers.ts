import { Sequelize as Seq } from 'sequelize-typescript';
import { SEQUELIZE } from 'src/constants';
import { Process } from './process/process.entity';

import Sequelize from 'sequelize';
import { User } from './user/user.entity';

export let sequelize: Seq;
Sequelize.DATE.prototype._stringify = function _stringify(date, options) {
  date = this._applyTimezone(date, options);

  // Z here means current timezone, _not_ UTC
  // return date.format('YYYY-MM-DD HH:mm:ss.SSS Z');

  return date.format('YYYY-MM-DD HH:mm:ss.SSS');
};
export const databaseProviders = [
  {
    provide: SEQUELIZE,
    useFactory: async () => {
      sequelize = new Seq({
        host: 'localhost',
        port: 1433,
        username: 'Test',
        password: '12341234',
        database: 'BluePrism',
        dialect: 'mssql',
      });
      console.log('DATABASE:', sequelize.getDatabaseName());
      sequelize.addModels([Process, User]);
      try {
        console.log(
          'REPOSITORY USER:',
          await sequelize.getRepository(User).findAll<User>({
            attributes: ['userid'], //We need this param to exist
          }),
        );
      } catch (error) {
        console.log(error.parent);
        throw error;
      }

      await sequelize.sync();
      return sequelize;
    },
  },
];
