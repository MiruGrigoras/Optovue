import { Controller } from '@nestjs/common';
import { ProcessService } from './process.service';

@Controller('process')
export class ProcessController {
  constructor(private processService: ProcessService) {
    console.log(processService.findAll());
  }
}
