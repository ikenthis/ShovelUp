// apps/api/src/modules/task/entities/task-comment.entity.ts

import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { Task } from './task.entity';
import { Professional } from '../../professional/entities/professional.entity';


@ObjectType()
export class TaskComment {
  @Field(() => ID)
  id: string;

  @Field()
  content: string;

  @Field(() => ID, { nullable: true })
  parentId?: string;

  @Field(() => Boolean)
  isEdited: boolean;

  @Field({ nullable: true })
  editedAt?: Date;

  @Field(() => ID)
  taskId: string;

  @Field(() => ID)
  authorId: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  // Relations
  @Field(() => Task, { nullable: true })
  task?: Task;

  @Field(() => Professional, { nullable: true })
  author?: Professional;

  @Field(() => TaskComment, { nullable: true })
  parent?: TaskComment;

  @Field(() => [TaskComment], { nullable: true })
  replies?: TaskComment[];
}