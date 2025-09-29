import { InputType, Field, ID, Float } from '@nestjs/graphql';
import { IsString, IsOptional, IsNumber, Min, IsDateString, MaxLength } from 'class-validator';

@InputType()
export class LogTimeInput {
  @Field(() => ID)
  @IsString()
  taskId: string;

  @Field(() => Float)
  @IsNumber()
  @Min(0.1)
  hours: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsDateString()
  date?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  description?: string;
}

@InputType()
export class UpdateTimeLogInput {
  @Field(() => ID)
  @IsString()
  timeLogId: string;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(0.1)
  hours?: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsDateString()
  date?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  description?: string;
}