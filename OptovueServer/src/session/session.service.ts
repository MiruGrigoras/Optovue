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

  async findSessionsByProcessId(processIdParam: string): Promise<Session[]> {
    const sessions = await this.sessionRepository.findAll<Session>({
      attributes: ['sessionid', 'startdatetime'],
      where: {
        processid: processIdParam,
      },
      order: [['startdatetime', 'DESC']],
    });
    return sessions;
  }

  async getSessionStartTime(processIdParam: string): Promise<any> {
    const sessions = await this.findSessionsByProcessId(processIdParam);
    return {
      sessionid: sessions[0].sessionid,
      startdatetime: sessions[0].startdatetime,
    };
  }
}
