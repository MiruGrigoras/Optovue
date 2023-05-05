import { Injectable, Inject } from '@nestjs/common';
import { PROCESS_REPOSITORY } from 'src/constants';
import { Process } from './process.entity';

@Injectable()
export class ProcessService {
  constructor(
    @Inject(PROCESS_REPOSITORY)
    private processesRepository: typeof Process,
  ) {}

  async findAll(): Promise<object[]> {
    const processes = await this.processesRepository.findAll<Process>({
      attributes: ['processid'],
    });
    return processes;
  }
}
