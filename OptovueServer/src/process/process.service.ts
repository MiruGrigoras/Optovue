import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { PROCESS_REPOSITORY } from 'src/constants';
import { Process } from './process.entity';

@Injectable()
export class ProcessService {
  constructor(
    @Inject(PROCESS_REPOSITORY)
    private processRepository: Repository<Process>,
  ) {}

  async findAll(): Promise<Process[]> {
    return this.processRepository.find();
  }
}
