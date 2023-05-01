import { Controller, Get } from '@nestjs/common';
import { ProcessService } from './process.service';

@Controller('process')
export class ProcessController {
  constructor(private processService: ProcessService) {}

  @Get()
  getProcesses() {
    return this.processService.findAll();
  }
}
