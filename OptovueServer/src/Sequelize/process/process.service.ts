import { Injectable, Inject } from '@nestjs/common';
import { PROCESS_REPOSITORY } from 'src/constants';
import { Process } from './process.entity';
import { QueryTypes } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ProcessService {
  constructor(
    @Inject(PROCESS_REPOSITORY)
    private processesRepository: typeof Process,
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

  async addNew() {
    this.processesRepository.create({
      processid: uuidv4(),

      ProcessType: 'P',

      name: 'name',

      createdate: Date.parse('01 Jan 1970 00:00:00 GMT'),

      createdby: uuidv4(),

      lastmodifieddate: Date.parse('01 Jan 1950 00:00:00 GMT'),

      lastmodifiedby: uuidv4(),

      AttributeID: Math.floor(Math.random() * 10000),

      runmode: 1,

      sharedObject: true,

      forceLiteralForm: true,

      useLegacyNamespace: true,
    });
  }
}
