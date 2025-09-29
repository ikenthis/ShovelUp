import { InputType, Field, ID, Float } from '@nestjs/graphql';
import { IsString, IsOptional, IsEnum, IsArray, IsNumber, IsBoolean, IsDateString, Min, Max } from 'class-validator';
import { TaskStatus, TaskPriority } from '../../common/enums';

@InputType()
export class UpdateTaskInput {
  @Field(() => ID)
  @IsString()
  id: string;  // ✅ También string, no number

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  title?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  description?: string;

  @Field(() => TaskStatus, { nullable: true })
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @Field(() => TaskPriority, { nullable: true })
  @IsOptional()
  @IsEnum(TaskPriority)
  priority?: TaskPriority;

  @Field({ nullable: true })
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsDateString()
  dueDate?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsDateString()
  completedAt?: string;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(0)
  estimatedHours?: number;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(0)
  actualHours?: number;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(0)
  estimatedCost?: number;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(0)
  actualCost?: number;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  progress?: number;

  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  @IsBoolean()
  isBlocked?: boolean;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  blockedReason?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsDateString()
  blockedSince?: string;

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  @IsBoolean()
  requiresApproval?: boolean;

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  @IsBoolean()
  isClientVisible?: boolean;

  // 🎯 ESTOS TAMBIÉN DEBEN SER STRING:
  @Field(() => ID, { nullable: true })
  @IsOptional()
  @IsString()
  projectId?: string;  // ✅ string, no number

  @Field(() => ID, { nullable: true })
  @IsOptional()
  @IsString()
  phaseId?: string;  // ✅ string, no number

  @Field(() => ID, { nullable: true })
  @IsOptional()
  @IsString()
  assigneeId?: string;

  @Field(() => ID, { nullable: true })
  @IsOptional()
  @IsString()
  parentTaskId?: string;  // ✅ parentTaskId, no parentId
}