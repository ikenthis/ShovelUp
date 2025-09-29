// apps/api/src/organization/dto/update-organization.input.ts
import { InputType, Field, ID, Int } from '@nestjs/graphql';
import { 
  IsString, 
  IsNotEmpty, 
  IsOptional, 
  IsEmail, 
  IsUrl, 
  IsEnum, 
  IsArray, 
  IsNumber,
  Min,
  Max,
  Length,
  Matches
} from 'class-validator';
import { 
  OrganizationType, 
  OrganizationSize, 
  Industry 
} from '../../common/enums';

@InputType()
export class UpdateOrganizationInput {
  @Field(() => ID)
  @IsString()
  @IsNotEmpty()
  id: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @Length(2, 100)
  name?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @Length(2, 50)
  @Matches(/^[a-z0-9-]+$/, {
    message: 'Slug must contain only lowercase letters, numbers, and hyphens'
  })
  slug?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @Length(2, 150)
  legalName?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @Length(10, 500)
  description?: string;

  @Field(() => OrganizationType, { nullable: true })
  @IsOptional()
  @IsEnum(OrganizationType)
  type?: OrganizationType;

  @Field(() => OrganizationSize, { nullable: true })
  @IsOptional()
  @IsEnum(OrganizationSize)
  size?: OrganizationSize;

  @Field(() => Industry, { nullable: true })
  @IsOptional()
  @IsEnum(Industry)
  industry?: Industry;

  @Field({ nullable: true })
  @IsOptional()
  @IsEmail()
  email?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @Length(5, 20)
  phone?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsUrl()
  website?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @Length(5, 30)
  taxId?: string;

  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Length(2, 50, { each: true })
  specialties?: string[];

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(1800)
  @Max(new Date().getFullYear())
  yearEstablished?: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(1000000)
  employeeCount?: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsUrl()
  avatar?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsUrl()
  banner?: string;
}