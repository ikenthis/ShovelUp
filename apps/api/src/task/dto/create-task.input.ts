import { InputType, Field, ID, Float } from '@nestjs/graphql';
import { IsString, IsOptional, IsEnum, IsArray, IsNumber, IsBoolean, IsDateString, Min } from 'class-validator';
import { TaskPriority } from '../../common/enums';

@InputType()
export class CreateTaskInput {
  @Field()
  @IsString()
  title: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  description?: string;

  @Field(() => TaskPriority, { defaultValue: TaskPriority.MEDIUM })
  @IsEnum(TaskPriority)
  priority: TaskPriority = TaskPriority.MEDIUM;

  @Field({ nullable: true })
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsDateString()
  dueDate?: string;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(0)
  estimatedHours?: number;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(0)
  estimatedCost?: number;

  @Field(() => [String], { defaultValue: [] })
  @IsArray()
  @IsString({ each: true })
  tags: string[] = [];

  @Field(() => Boolean, { defaultValue: false })
  @IsBoolean()
  requiresApproval: boolean = false;

  @Field(() => Boolean, { defaultValue: false })
  @IsBoolean()
  isClientVisible: boolean = false;

  // 🎯 ESTOS SON LOS CAMPOS QUE ESTABAN CAUSANDO EL ERROR:
  @Field(() => ID)
  @IsString()
  projectId: string;  // ✅ Ahora es string, no number

  @Field(() => ID, { nullable: true })
  @IsOptional()
  @IsString()
  phaseId?: string;  // ✅ Ahora es string, no number

  @Field(() => ID, { nullable: true })
  @IsOptional()
  @IsString()
  assigneeId?: string;  // ✅ Nuevo campo

  @Field(() => ID, { nullable: true })
  @IsOptional()
  @IsString()
  parentTaskId?: string;  // ✅ Ahora es parentTaskId, no parentId
}