import { Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getProcesses() {
    const users = this.userService.findAll();
    return JSON.stringify(users) + 'USER text';
  }
  @Post()
  addElement() {
    this.userService.addNew();
  }
}
