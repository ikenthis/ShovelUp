// apps/api/src/common/dto/pagination.input.ts
import { InputType, Field, Int, registerEnumType } from '@nestjs/graphql';
import { IsOptional, IsEnum, Min, Max } from 'class-validator';

export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}

// Register enum for GraphQL
registerEnumType(SortOrder, {
  name: 'SortOrder',
  description: 'Sort order for queries (ascending or descending)',
});

@InputType()
export class BasePaginationInput {
  @Field(() => Int, { defaultValue: 1, description: 'Page number (starts from 1)' })
  @Min(1)
  page: number = 1;

  @Field(() => Int, { defaultValue: 20, description: 'Number of items per page' })
  @Min(1)
  @Max(100)
  limit: number = 20;

  @Field(() => SortOrder, { 
    defaultValue: SortOrder.ASC,
    description: 'Sort order (ascending or descending)'
  })
  @IsOptional()
  @IsEnum(SortOrder)
  sortOrder?: SortOrder = SortOrder.ASC;
}
