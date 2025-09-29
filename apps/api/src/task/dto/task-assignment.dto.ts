import { InputType, Field, ID } from '@nestjs/graphql';
import { IsString, IsOptional, MaxLength } from 'class-validator';

@InputType()
export class AssignTaskInput {
  @Field(() => ID)
  @IsString()
  taskId: string;

  @Field(() => ID)
  @IsString()
  assigneeId: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  note?: string;
}

@InputType()
export class UnassignTaskInput {
  @Field(() => ID)
  @IsString()
  taskId: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  note?: string;
}