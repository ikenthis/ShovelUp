import { ObjectType, Field, ID, Int, Float } from '@nestjs/graphql';
import { Project } from './project.entity';
import { Task } from '../../task/entities/task.entity';

// apps/api/src/modules/project/entities/project-phase.entity.ts
@ObjectType()
export class ProjectPhase {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => Int)
  order: number;

  @Field({ nullable: true })
  startDate?: Date;

  @Field({ nullable: true })
  endDate?: Date;

  @Field(() => String)
  status: string; // PhaseStatus enum

  @Field(() => Float)
  progress: number;

  @Field(() => Float, { nullable: true })
  budget?: number;

  @Field(() => Float)
  actualCost: number;

  @Field(() => ID)
  projectId: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field()
  createdBy: string;

  // Relations
  @Field(() => Project, { nullable: true })
  project?: Project;

  @Field(() => [Task], { nullable: true })
  tasks?: Task[];
}