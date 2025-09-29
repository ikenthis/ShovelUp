import { InputType, Field, Int, Float } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsEnum, IsOptional, MinLength, IsBoolean } from 'class-validator';
import { Discipline, EmploymentType, AvailabilityStatus } from '@prisma/client';
import GraphQLJSON from 'graphql-type-json';

@InputType()
export class CreateProfessionalInput {
  @Field(() => String)
  @IsEmail()
  email: string;

  @Field(() => String)
  @IsNotEmpty()
  username: string;

  @Field(() => String)
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @Field(() => String)
  @IsNotEmpty()
  firstName: string;

  @Field(() => String)
  @IsNotEmpty()
  lastName: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  displayName?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  title?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  bio?: string;

  @Field(() => Discipline)
  @IsEnum(Discipline)
  discipline: Discipline;

  @Field(() => [String], { defaultValue: [] })
  specialties: string[];

  @Field(() => Int, { nullable: true })
  @IsOptional()
  yearsExperience?: number;

  @Field(() => String, { nullable: true })
  @IsOptional()
  currentRole?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  phone?: string;

  @Field(() => GraphQLJSON, { nullable: true })
  @IsOptional()
  location?: any;

  @Field(() => String, { nullable: true })
  @IsOptional()
  avatar?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  banner?: string;

  @Field(() => GraphQLJSON, { nullable: true })
  @IsOptional()
  licenses?: any;

  @Field(() => GraphQLJSON, { nullable: true })
  @IsOptional()
  certifications?: any;

  @Field(() => GraphQLJSON, { nullable: true })
  @IsOptional()
  education?: any;

  @Field(() => GraphQLJSON, { nullable: true })
  @IsOptional()
  portfolio?: any;

  @Field(() => String, { nullable: true })
  @IsOptional()
  linkedinUrl?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  portfolioUrl?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  websiteUrl?: string;

  @Field(() => GraphQLJSON, { nullable: true })
  @IsOptional()
  socialLinks?: any;

  @Field(() => GraphQLJSON, { nullable: true })
  @IsOptional()
  privacySettings?: any;

  @Field(() => GraphQLJSON, { nullable: true })
  @IsOptional()
  notificationSettings?: any;

  @Field(() => String, { nullable: true })
  @IsOptional()
  organizationId?: string;

  @Field(() => EmploymentType, { nullable: true })
  @IsEnum(EmploymentType)
  @IsOptional()
  employmentType?: EmploymentType;

  @Field(() => AvailabilityStatus, { defaultValue: AvailabilityStatus.AVAILABLE })
  @IsEnum(AvailabilityStatus)
  availabilityStatus: AvailabilityStatus;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  hourlyRate?: number;

  @Field(() => Boolean, { defaultValue: true })
  @IsBoolean()
  @IsOptional()
  isAvailableForWork?: boolean;

  @Field(() => Boolean, { defaultValue: false })
  @IsBoolean()
  @IsOptional()
  isOpenToMentoring?: boolean;
}