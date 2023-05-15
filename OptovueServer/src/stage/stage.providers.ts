import { STAGE_REPOSITORY } from 'src/constants';
import { Stage } from './stage.entity';

export const stageProviders = [
  {
    provide: STAGE_REPOSITORY,
    useValue: Stage,
  },
];
