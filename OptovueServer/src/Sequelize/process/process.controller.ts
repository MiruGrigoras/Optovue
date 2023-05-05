import { Controller, Get } from '@nestjs/common';
import { ProcessService } from './process.service';

@Controller('process')
export class ProcessController {
  constructor(private processService: ProcessService) {}

  @Get()
  async getProcesses() {
    const processes = await this.processService.findAll();
    return processes;
  }
}
