import { Inject, Injectable } from '@nestjs/common';
import { STAGE_REPOSITORY } from 'src/constants';
import { Stage } from './stage.entity';

@Injectable()
export class StageService {
  constructor(
    @Inject(STAGE_REPOSITORY)
    private stageRepository: typeof Stage,
  ) {}

  async getStagesInSessionWithinCaseTimestamps(
    sessionnumber: number,
    startTime: string,
    endTime: string,
    hoursOffset: number,
  ): Promise<Stage[]> {
    const timezoneStartTime = new Date(startTime);
    let correctHour = timezoneStartTime.getHours() + +hoursOffset;
    timezoneStartTime.setHours(correctHour);

    const timezoneEndTime = new Date(endTime);
    correctHour = timezoneEndTime.getHours() + +hoursOffset;
    timezoneEndTime.setHours(correctHour);
    const allStages = await this.stageRepository.findAll<Stage>({
      attributes: ['logid', 'stagename', 'startdatetime', 'result'],
      where: {
        sessionnumber: sessionnumber,
      },
      order: ['logid'],
    });
    const filteredStages = allStages.filter(
      (stage) =>
        stage.startdatetime >= timezoneStartTime &&
        stage.startdatetime < timezoneEndTime,
    );
    return filteredStages;
  }

  async getAllStageInSession(sessionnumber: number): Promise<Stage[]> {
    return await this.stageRepository.findAll<Stage>({
      attributes: ['logid'],
      where: {
        sessionnumber: sessionnumber,
      },
    });
  }
}
