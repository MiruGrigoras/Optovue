import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { QueueItemService } from './queueItem.service';

@Controller('queueItem')
export class QueueItemController {
  constructor(private queueItemService: QueueItemService) {}

  @Get()
  async getCases(@Query('processid') processidParam: string) {
    let items = [];
    if (!processidParam) items = await this.queueItemService.findAll();
    else
      items =
        await this.queueItemService.findCasesOfMostRecentSessionByProcessId(
          processidParam,
        );
    return items;
  }

  @Post('getTimestamps')
  async getCasesTimestampsInSession(@Body('sessionid') sessionId: string) {
    return await this.queueItemService.getCasesTimestampsInSession(sessionId);
  }
}
