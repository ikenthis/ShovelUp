import { CreateProjectInput } from './create-project.input';
import { InputType, Field, Int, PartialType, ID } from '@nestjs/graphql';
import { Min, Max, IsNotEmpty, IsString, IsEnum, IsOptional } from 'class-validator';
import { ProjectStatus, ProjectType, ProjectPhase as ProjectPhaseEnum, VisibilityLevel, SharingLevel } from '../../common/enums';
import { Type } from 'class-transformer';

@InputType()
export class UpdateProjectInput extends PartialType(CreateProjectInput) {
  @Field(() => ID)
  id: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description?: string;

  @Field(() => ProjectType, { nullable: true })
  @IsOptional()
  @IsEnum(ProjectType)
  type?: ProjectType;

  @Field(() => ProjectPhaseEnum, { nullable: true })
  @IsOptional()
  @IsEnum(ProjectPhaseEnum)
  phase?: ProjectPhaseEnum;

  @Field(() => ProjectStatus, { nullable: true })
  @IsOptional()
  @IsEnum(ProjectStatus)
  status?: ProjectStatus;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  constellationId: string;

  @Field({ nullable: true })
  @IsOptional()
  @Type(() => Date)
  startDate?: Date;

  @Field({ nullable: true })
  @IsOptional()
  @Type(() => Date)
  estimatedEnd?: Date;

  @Field({ nullable: true })
  @IsOptional()
  @Type(() => Date)
  actualEnd?: Date;
}
