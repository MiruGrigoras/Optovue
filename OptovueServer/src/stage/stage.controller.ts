import { Body, Controller, Post } from '@nestjs/common';
import { StageService } from './stage.service';

@Controller('stage')
export class StageController {
  constructor(private stageService: StageService) {}

  @Post()
  async getStagesTimestampsInSession(
    @Body('sessionnumber') sessionnumber: number,
    @Body('startTime') startTime: string,
    @Body('endTime') endTime: string,
    @Body('hoursOffset') hoursOffset: number,
  ) {
    return await this.stageService.getStagesInSessionWithinCaseTimestamps(
      sessionnumber,
      startTime,
      endTime,
      hoursOffset,
    );
  }
}
