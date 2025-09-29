// apps/api/src/modules/task/entities/task-dependency.entity.ts
import { ObjectType, Field, ID, Float } from '@nestjs/graphql';
import { TaskDependencyType, DependencyStatus } from '../../common/enums';
import { Task } from './task.entity';

@ObjectType()
export class TaskDependency {
  @Field(() => ID)
  id: string;

  @Field(() => TaskDependencyType)
  dependencyType: TaskDependencyType;

  @Field({ nullable: true })
  description?: string;

  @Field(() => Float)
  lagTime: number;

  @Field(() => DependencyStatus)
  status: DependencyStatus;

  @Field(() => ID)
  dependentId: string;

  @Field(() => ID)
  requiredId: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field()
  createdBy: string;

  // Relations
  @Field(() => Task, { nullable: true })
  dependent?: Task;

  @Field(() => Task, { nullable: true })
  required?: Task;
}