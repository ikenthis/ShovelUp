import { InputType, Field, ID } from '@nestjs/graphql';
import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

@InputType()
export class BlockTaskInput {
  @Field(() => ID)
  @IsString()
  taskId: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  @MaxLength(1000)
  reason: string;
}

@InputType()
export class UnblockTaskInput {
  @Field(() => ID)
  @IsString()
  taskId: string;

  @Field({ nullable: true })
  @IsString()
  @MaxLength(1000)
  resolution?: string;
}