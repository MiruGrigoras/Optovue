import {
  PROCESS_REPOSITORY,
  SESSION_REPOSITORY,
  STAGE_REPOSITORY,
} from 'src/constants';
import { Process } from './process.entity';
import { Session } from 'src/session/session.entity';
import { Stage } from 'src/stage/stage.entity';

export const processProviders = [
  {
    provide: PROCESS_REPOSITORY,
    useValue: Process,
  },
  {
    provide: SESSION_REPOSITORY,
    useValue: Session,
  },
  {
    provide: STAGE_REPOSITORY,
    useValue: Stage,
  },
];
