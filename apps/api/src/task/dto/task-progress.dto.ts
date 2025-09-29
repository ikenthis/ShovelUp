import { InputType, Field, ID, Float } from '@nestjs/graphql';
import { IsString, IsOptional, IsNumber, Min, Max, MaxLength } from 'class-validator';

@InputType()
export class UpdateTaskProgressInput {
  @Field(() => ID)
  @IsString()
  taskId: string;

  @Field(() => Float)
  @IsNumber()
  @Min(0)
  @Max(100)
  progress: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  note?: string;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(0)
  actualHours?: number;
}

@InputType()
export class CompleteTaskInput {
  @Field(() => ID)
  @IsString()
  taskId: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  completionNote?: string;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(0)
  finalActualHours?: number;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(0)
  finalActualCost?: number;
}