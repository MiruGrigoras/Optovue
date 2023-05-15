import { Controller, Get, Query } from '@nestjs/common';
import { ProcessService } from './process.service';

@Controller('process')
export class ProcessController {
  constructor(private processService: ProcessService) {}

  @Get()
  async getProcesses() {
    const processes = await this.processService.findAll();
    return processes;
  }

  @Get('/run')
  async executeCommand( @Query('command') command: string) {
    const result = await this.processService.runProcess(command);
    return result;
  }
 }
