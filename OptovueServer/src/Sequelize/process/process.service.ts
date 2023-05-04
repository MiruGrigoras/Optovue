import { Injectable, Inject } from '@nestjs/common';
import { PROCESS_REPOSITORY } from 'src/constants';
import { BPAProcess } from './process.entity';
import { ProcessDB } from './processDB.entity';
import { QueryTypes } from 'sequelize';

@Injectable()
export class ProcessService {
  constructor(
    @Inject(PROCESS_REPOSITORY)
    private processesRepository: typeof BPAProcess,
  ) {}

  async findAll(): Promise<object[]> {
    console.log(this.processesRepository.getTableName() + 'Empty??');
    // const processesOLD = await this.processesRepository.findAll<BPAProcess>({
    //   attributes: ['processid'],
    // });
    const processes = await this.processesRepository.sequelize.query(
      'SELECT [processid] FROM [BluePrism].[dbo].[BPAProcess] AS [BPAProcess];',
      { type: QueryTypes.SELECT },
    );
    return processes; //.map((process) => new ProcessDB(process));
  }
}
