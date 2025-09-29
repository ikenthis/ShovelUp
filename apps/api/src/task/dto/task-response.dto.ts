// apps/api/src/modules/task/dto/task-response.dto.ts
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Task } from '../entities/task.entity';
import { PaginationInfo } from '../../common/dtos/pagination.response';

@ObjectType()
export class PaginatedTaskResponse {
  @Field(() => [Task])
  data: Task[];

  @Field(() => PaginationInfo)
  pagination: PaginationInfo;
}

@ObjectType()
export class TaskStats {
  @Field(() => Int)
  total: number;

  @Field(() => Int)
  todo: number;

  @Field(() => Int)
  inProgress: number;

  @Field(() => Int)
  completed: number;

  @Field(() => Int)
  blocked: number;

  @Field(() => Int)
  overdue: number;
}