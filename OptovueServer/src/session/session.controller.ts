import { Controller, Get } from '@nestjs/common';
import { SessionService } from './session.service';

@Controller('session')
export class SessionController {
  constructor(private sessionService: SessionService) {}

  @Get()
  async getProcesses() {
    const sessions = await this.sessionService.findAll();
    return sessions;
  }
}
