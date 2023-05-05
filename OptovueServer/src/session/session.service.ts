import { Inject, Injectable } from '@nestjs/common';
import { SESSION_REPOSITORY } from 'src/constants';
import { Session } from './session.entity';

@Injectable()
export class SessionService {
  constructor(
    @Inject(SESSION_REPOSITORY)
    private sessionRepository: typeof Session,
  ) {}
  async findAll(): Promise<Session[]> {
    return await this.sessionRepository.findAll<Session>({
      attributes: ['sessionid'],
    });
  }
}
