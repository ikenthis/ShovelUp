// auth/dto/register.input.ts (nuevo archivo)
import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsEnum, IsOptional, MinLength } from 'class-validator';
import { Discipline } from '@prisma/client';

@InputType()
export class RegisterInput {
  @Field()
  @IsNotEmpty()
  firstName: string;

  @Field()
  @IsNotEmpty()
  lastName: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  @MinLength(6)
  password: string;

  @Field(() => Discipline)
  @IsEnum(Discipline)
  discipline: Discipline;

  @Field({ nullable: true })
  @IsOptional()
  organizationId?: string;

  @Field({ nullable: true })
  @IsOptional()
  bio?: string;

  @Field({ nullable: true })
  @IsOptional()
  phone?: string;
}