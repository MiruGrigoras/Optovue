import { Injectable, Inject } from '@nestjs/common';
import { PROCESS_REPOSITORY } from 'src/constants';
import { Process } from './process.entity';
import { exec } from 'child_process';

@Injectable()
export class ProcessService {
  constructor(
    @Inject(PROCESS_REPOSITORY)
    private processesRepository: typeof Process,
  ) {}

  async findAll(): Promise<object[]> {
    const processes = await this.processesRepository.findAll<Process>({
      attributes: ['processid', 'name'],
    });
    return processes;
  }
  
  async runProcess(command: string) : Promise<any>{
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
}
