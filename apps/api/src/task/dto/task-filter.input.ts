import { InputType, Field, ID } from '@nestjs/graphql';
import { IsOptional, IsEnum, IsArray, IsString, IsBoolean, IsDateString } from 'class-validator';
import { TaskStatus, TaskPriority } from '../../common/enums';

@InputType()
export class TaskFiltersInput {
  @Field(() => [TaskStatus], { nullable: true })
  @IsOptional()
  @IsArray()
  @IsEnum(TaskStatus, { each: true })
  status?: TaskStatus[];

  @Field(() => [TaskPriority], { nullable: true })
  @IsOptional()
  @IsArray()
  @IsEnum(TaskPriority, { each: true })
  priority?: TaskPriority[];

  @Field(() => [ID], { nullable: true })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  assigneeIds?: string[];

  @Field(() => [ID], { nullable: true })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  phaseIds?: string[];

  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  isBlocked?: boolean;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  requiresApproval?: boolean;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  isClientVisible?: boolean;

  @Field({ nullable: true })
  @IsOptional()
  @IsDateString()
  dueDateFrom?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsDateString()
  dueDateTo?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  search?: string;

  // 🎯 ESTOS TAMBIÉN:
  @Field(() => ID, { nullable: true })
  @IsOptional()
  @IsString()
  projectId?: string;  // ✅ string, no number

  @Field(() => ID, { nullable: true })
  @IsOptional()
  @IsString()
  phaseId?: string;  // ✅ string, no number
}