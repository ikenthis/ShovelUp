import { InputType, Field, ID } from '@nestjs/graphql';
import { IsArray, IsString, IsEnum, IsOptional, MaxLength } from 'class-validator';
import { TaskStatus, TaskPriority } from '../../common/enums';

@InputType()
export class BulkUpdateTasksInput {
  @Field(() => [ID])
  @IsArray()
  @IsString({ each: true })
  taskIds: string[];

  @Field(() => TaskStatus, { nullable: true })
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @Field(() => TaskPriority, { nullable: true })
  @IsOptional()
  @IsEnum(TaskPriority)
  priority?: TaskPriority;

  @Field(() => ID, { nullable: true })
  @IsOptional()
  @IsString()
  assigneeId?: string;

  @Field(() => ID, { nullable: true })
  @IsOptional()
  @IsString()
  phaseId?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  note?: string;
}

@InputType()
export class BulkDeleteTasksInput {
  @Field(() => [ID])
  @IsArray()
  @IsString({ each: true })
  taskIds: string[];

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  reason?: string;
}