import { Injectable, Inject } from '@nestjs/common';
import { USER_REPOSITORY } from 'src/constants';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY)
    private userRepository: typeof User,
  ) {}

  async findAll(): Promise<User[]> {
    const users = await this.userRepository.findAll<User>({
      attributes: ['userid', 'loginattempts'],
    });
    return users;
  }
}
