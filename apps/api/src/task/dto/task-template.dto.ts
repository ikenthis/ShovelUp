import { InputType, Field, ID } from '@nestjs/graphql';
import { IsString, IsOptional, IsBoolean, MaxLength } from 'class-validator';

@InputType()
export class CreateTaskFromTemplateInput {
  @Field(() => ID)
  @IsString()
  templateId: string;

  @Field(() => ID)
  @IsString()
  projectId: string;

  @Field(() => ID, { nullable: true })
  @IsOptional()
  @IsString()
  phaseId?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  namePrefix?: string;

  @Field(() => Boolean, { defaultValue: false })
  @IsBoolean()
  includeDependencies: boolean = false;
}

@InputType()
export class SaveTaskAsTemplateInput {
  @Field(() => ID)
  @IsString()
  taskId: string;

  @Field()
  @IsString()
  @MaxLength(200)
  templateName: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  description?: string;

  @Field(() => Boolean, { defaultValue: true })
  @IsBoolean()
  includeSubtasks: boolean = true;

  @Field(() => Boolean, { defaultValue: false })
  @IsBoolean()
  includeDependencies: boolean = false;
}