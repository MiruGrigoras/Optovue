import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { PROCESS_REPOSITORY_ORM } from 'src/constants';
import { Process } from './process.entity';

@Injectable()
export class ProcessService {
  constructor(
    @Inject(PROCESS_REPOSITORY_ORM)
    private processRepository: Repository<Process>,
  ) {}

  async findAll(): Promise<Process[]> {
    return this.processRepository.find();
  }
}
