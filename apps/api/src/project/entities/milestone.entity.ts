import { ObjectType, Field, ID, Float } from '@nestjs/graphql';
import { Project } from './project.entity';

// apps/api/src/modules/project/entities/milestone.entity.ts
@ObjectType()
export class Milestone {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  targetDate: Date;

  @Field({ nullable: true })
  actualDate?: Date;

  @Field(() => String)
  status: string; // MilestoneStatus enum

  @Field(() => Float)
  progressPercentage: number;

  @Field(() => Boolean)
  isRequired: boolean;

  @Field(() => Float)
  weight: number;

  @Field(() => ID)
  projectId: string;

  @Field(() => [String])
  dependencies: string[];

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field()
  createdBy: string;

  // Relations
  @Field(() => Project, { nullable: true })
  project?: Project;
}