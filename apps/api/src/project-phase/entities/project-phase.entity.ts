import { ObjectType, Field, ID, Int, Float, registerEnumType } from '@nestjs/graphql';
import { ProjectStatus } from '@prisma/client';
import { GraphQLJSON } from 'graphql-type-json';

// Register enums for GraphQL if they're not already registered
registerEnumType(ProjectStatus, { name: 'ProjectStatus' });

@ObjectType()
export class ProjectPhase {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => ProjectStatus)
  status: ProjectStatus;

  @Field({ nullable: true })
  startDate?: Date;

  @Field({ nullable: true })
  endDate?: Date;

  @Field(() => Float)
  progress: number;

  @Field(() => Int)
  order: number;

  // Enterprise features
  @Field(() => Float, { nullable: true })
  budgetAllocated?: number;

  @Field(() => Float, { nullable: true })
  actualCost?: number;

  @Field(() => GraphQLJSON)
  milestones: any; // Array of milestone objects

  @Field(() => [String])
  dependencies: string[]; // Phase IDs this depends on

  @Field()
  criticalPath: boolean;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  // Relations
  @Field()
  projectId: string;

  @Field(() => [String], { nullable: true })
  taskIds?: string[];

  @Field(() => [String], { nullable: true })
  postIds?: string[];
}