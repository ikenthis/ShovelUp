import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class PaginationInfo {
  @Field(() => Int, { description: 'Current page number' })
  page: number;

  @Field(() => Int, { description: 'Number of items per page' })
  limit: number;

  @Field(() => Int, { description: 'Total number of items' })
  total: number;

  @Field(() => Int, { description: 'Total number of pages' })
  totalPages: number;

  @Field({ description: 'Whether there is a next page' })
  hasNextPage: boolean;

  @Field({ description: 'Whether there is a previous page' })
  hasPreviousPage: boolean;
}

// Generic function to create paginated response types
export function createPaginatedResponse<T>(ItemType: new () => T, name: string) {
  @ObjectType(`Paginated${name}`)
  class PaginatedResponse {
    @Field(() => [ItemType])
    data: T[];

    @Field(() => PaginationInfo)
    pagination: PaginationInfo;
  }
  
  return PaginatedResponse;
}