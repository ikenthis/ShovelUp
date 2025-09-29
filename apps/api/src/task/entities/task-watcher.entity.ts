
// apps/api/src/modules/task/entities/task-watcher.entity.ts

import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Task } from './task.entity';
import { Professional } from '../../professional/entities/professional.entity';
import { WatchLevel } from '../../common/enums';

@ObjectType()
export class TaskWatcher {
  @Field(() => ID)
  id: string;

  @Field(() => WatchLevel)
  watchLevel: WatchLevel;

  @Field(() => ID)
  taskId: string;

  @Field(() => ID)
  professionalId: string;

  @Field()
  createdAt: Date;

  // Relations
  @Field(() => Task, { nullable: true })
  task?: Task;

  @Field(() => Professional, { nullable: true })
  professional?: Professional;
}