import { InputType, Int, Field } from '@nestjs/graphql';
import { Min, Max, IsNotEmpty, IsString, IsNumber, IsOptional, IsEnum } from 'class-validator';
import { ProjectStatus, ProjectType, ProjectPhase as ProjectPhaseEnum, VisibilityLevel, SharingLevel } from '../../common/enums';
import { Type } from 'class-transformer';



@InputType()
export class CreateProjectInput {
  
  @Field()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  description: string;

  @Field(() => ProjectType)
  type: ProjectType;

  @Field(() => ProjectPhaseEnum)
  phase: ProjectPhaseEnum;

  @Field(() => ProjectStatus)
  status: ProjectStatus;

  @Field()
  @IsString()
  @IsNotEmpty()
  constellationId: string;

  @Field()
  @Type(() => Date)
  startDate: Date;

  @Field()
  @Type(() => Date)
  estimatedEnd: Date;

  @Field({ nullable: true })
  @IsOptional()
  @Type(() => Date)
  actualEnd?: Date;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(1000000000)
  budget?: number;

  @Field(() => VisibilityLevel, { defaultValue: VisibilityLevel.PROJECT })
  visibility: VisibilityLevel; // ✅ Cambiar de visibilityLevel a visibility


  @Field(() => SharingLevel, { nullable: true })
  @IsOptional()
  @IsEnum(SharingLevel)
  sharingLevel?: SharingLevel;

  @Field()
  @IsString()
  @IsNotEmpty()
  slug: string;
}
