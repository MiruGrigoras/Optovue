import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { SessionController } from './session.controller';
import { SessionService } from './session.service';
import { sessionProviders } from './session.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [SessionController],
  providers: [SessionService, ...sessionProviders],
})
export class SessionModule {}
