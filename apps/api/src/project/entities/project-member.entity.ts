import { ObjectType, Field, ID, Int, Float } from '@nestjs/graphql';
import { Project } from './project.entity';
import { Professional } from '../../professional/entities/professional.entity';


// apps/api/src/modules/project/entities/project-member.entity.ts
@ObjectType()
export class ProjectMember {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  role: string; // ProjectRole enum

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  responsibilities?: string;

  @Field(() => String)
  accessLevel: string; // AccessLevel enum

  @Field()
  joinedAt: Date;

  @Field({ nullable: true })
  leftAt?: Date;

  @Field(() => Boolean)
  isActive: boolean;

  @Field(() => Float)
  contributionScore: number;

  @Field(() => Float)
  hoursLogged: number;

  @Field(() => Int)
  tasksCompleted: number;

  @Field(() => Float, { nullable: true })
  performanceRating?: number;

  @Field(() => ID)
  projectId: string;

  @Field(() => ID)
  professionalId: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  // Relations
  @Field(() => Project, { nullable: true })
  project?: Project;

  @Field(() => Professional, { nullable: true })
  professional?: Professional;
}