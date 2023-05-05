import { Body, Controller, Get, Post } from '@nestjs/common';
import { QueueItemService } from './queueItem.service';

@Controller('queueItem')
export class QueueItemController {
  constructor(private queueItemService: QueueItemService) {}

  @Get()
  async getProcesses() {
    const items = await this.queueItemService.findAll();
    return items;
  }

  @Post('getTimestamps')
  async getCasesTimestampsInSession(@Body('sessionid') sessionId: string) {
    return await this.queueItemService.getCasesTimestampsInSession(sessionId);
  }
}
