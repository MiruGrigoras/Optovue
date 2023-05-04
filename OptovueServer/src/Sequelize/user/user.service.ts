import { Injectable, Inject } from '@nestjs/common';
import { USER_REPOSITORY } from 'src/constants';
import { User } from './user.entity';
import { QueryTypes } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import { sequelize } from '../database.providers';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY)
    private userRepository: typeof User,
  ) {}

  async findAll(): Promise<object[]> {
    console.log(this.userRepository.getTableName() + 'Empty??');
    const users = await sequelize.getRepository(User).findAll({
      attributes: ['userid'],
    });
    // const users = await this.userRepository.sequelize.query(
    //   'SELECT [userid] FROM [BluePrism].[dbo].[BPAUser];',
    //   { type: QueryTypes.SELECT },
    // );
    return users; //.map((process) => new ProcessDB(process));
  }

  async addNew() {
    // await this.userRepository.create({
    //   userid: uuidv4(),
    //   AlertEventTypes: 1,
    //   AlertNotificationTypes: 2,
    //   loginattempts: 2,
    //   authtype: 1,
    // });
    const id = uuidv4();
    console.log(id.type);

    await this.userRepository.sequelize.query(
      `INSERT INTO [dbo].[BPAUser] (userid, AlertEventTypes, AlertNotificationTypes, loginattempts, authtype) VALUES ('${id}', 1, 2, 2, 1);`,
      { model: User, type: QueryTypes.INSERT },
    );
  }
}
