import { Module } from '@nestjs/common';
import { userProviders } from './user.providers';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [UserService, ...userProviders],
})
export class UserModule {}
