import { Injectable, Inject } from '@nestjs/common';
import { PROCESS_REPOSITORY } from 'src/constants';
import { Process } from './process.entity';
import { exec } from 'child_process';
import { SessionService } from 'src/session/session.service';
import { StageService } from 'src/stage/stage.service';
import { Stage } from 'src/stage/stage.entity';

@Injectable()
export class ProcessService {
  constructor(
    @Inject(PROCESS_REPOSITORY)
    private processesRepository: typeof Process,
    private sessionService: SessionService,
    private stageService: StageService,
  ) {}

  async findAll(): Promise<object[]> {
    const processes = await this.processesRepository.findAll<Process>({
      attributes: ['processid', 'name'],
      where: {
        ProcessType: 'P',
      },
    });
    return processes;
  }

  async runProcess(command: string): Promise<any> {
    const result = await new Promise<string>((resolve, reject) => {
      exec(command, (error, stdout, stderr) => {
        if (error) {
          reject(error);
        } else {
          resolve(stdout || stderr);
        }
      });
    });
    return { result };
  }
  async checkIfHasPreviousLogs(processid: string) {
    const lastSession = await this.sessionService.getMostRecentSession(
      processid,
    );
    const stages: Stage[] = await this.stageService.getAllStageInSession(
      lastSession.sessionnumber,
    );
    return stages.length != 0 ? true : false;
  }
}
