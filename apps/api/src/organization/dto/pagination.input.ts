// apps/api/src/organization/dto/pagination.input.ts
import { InputType, Field, registerEnumType } from '@nestjs/graphql';
import { IsOptional, IsEnum } from 'class-validator';
import { BasePaginationInput } from '../../common/dtos/pagination.input';

enum OrganizationSortField {
  NAME = 'name',
  CREATED_AT = 'createdAt',
  REPUTATION_SCORE = 'reputationScore',
  PROJECTS_COMPLETED = 'projectsCompleted',
  EMPLOYEE_COUNT = 'employeeCount',
  YEAR_ESTABLISHED = 'yearEstablished',
}

// Register enum for GraphQL
registerEnumType(OrganizationSortField, {
  name: 'OrganizationSortField',
  description: 'Available fields for sorting organizations',
});

@InputType()
export class OrganizationPaginationInput extends BasePaginationInput {
  @Field(() => OrganizationSortField, { 
    defaultValue: OrganizationSortField.NAME,
    description: 'Field to sort by'
  })
  @IsOptional()
  @IsEnum(OrganizationSortField)
  sortBy?: OrganizationSortField = OrganizationSortField.NAME;
}