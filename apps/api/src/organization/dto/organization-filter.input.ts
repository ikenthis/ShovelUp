// apps/api/src/organization/dto/organization-filter.input.ts
import { InputType, Field, Int } from '@nestjs/graphql';
import { IsOptional, IsEnum, IsString, IsBoolean, Min, Max } from 'class-validator';
import { OrganizationType, OrganizationSize, Industry } from '../../common/enums';

@InputType()
export class OrganizationFilterInput {
  @Field(() => [OrganizationType], { nullable: true })
  @IsOptional()
  @IsEnum(OrganizationType, { each: true })
  types?: OrganizationType[];

  @Field(() => [OrganizationSize], { nullable: true })
  @IsOptional()
  @IsEnum(OrganizationSize, { each: true })
  sizes?: OrganizationSize[];

  @Field(() => [Industry], { nullable: true })
  @IsOptional()
  @IsEnum(Industry, { each: true })
  industries?: Industry[];

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  search?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  isVerified?: boolean;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @Min(0)
  @Max(5)
  minRating?: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @Min(1)
  @Max(10000)
  minEmployeeCount?: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @Min(1)
  @Max(10000)
  maxEmployeeCount?: number;
}