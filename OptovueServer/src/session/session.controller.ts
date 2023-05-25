import { Body, Controller, Get, Post } from '@nestjs/common';
import { SessionService } from './session.service';

@Controller('session')
export class SessionController {
  constructor(private sessionService: SessionService) {}

  @Get()
  async getProcesses() {
    const sessions = await this.sessionService.findAll();
    return sessions;
  }

  @Post('mostRecent')
  async getMostRecentSessionOfProcess(@Body('processid') processId: string) {
    return await this.sessionService.getMostRecentSession(processId);
  }
}
