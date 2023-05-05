import { SESSION_REPOSITORY } from 'src/constants';
import { Session } from './session.entity';

export const sessionProviders = [
  {
    provide: SESSION_REPOSITORY,
    useValue: Session,
  },
];
