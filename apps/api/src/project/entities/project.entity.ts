// apps/api/src/modules/project/entities/project.entity.ts
import { ObjectType, Field, ID, Float, Int } from '@nestjs/graphql';
import { 
  ProjectType, 
  ProjectCategory, 
  ProjectPhaseEnum, 
  ProjectStatus,
  BudgetStatus,
  Priority, 
  SharingLevel,
  VisibilityLevel 
} from '@prisma/client';
import { ProjectMember } from './project-member.entity';
import { ProjectOrganization } from './project-organization.entity';
import { Post } from '../../post/entities/post.entity';
import { Milestone } from './milestone.entity';
import { Task } from '../../task/entities/task.entity';
import { ProjectPhase } from './project-phase.entity';
import { Innovation } from '../../knowledge/entities/innovation.entity';
import { LessonLearned } from '../../knowledge/entities/lesson-learned.entity';
import { RiskFactor } from '../../risk/entities/risk-factor.entity';

@ObjectType()
export class Project {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  slug: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => Priority)
  priority: Priority;

  @Field(() => ProjectType)
  type: ProjectType;

  @Field(() => ProjectCategory, { nullable: true })
  category?: ProjectCategory;

  @Field(() => ProjectPhaseEnum)
  phase: ProjectPhaseEnum;

  @Field(() => ProjectStatus)
  status: ProjectStatus;

  @Field(() => ID)
  constellationId: string;

  @Field()
  startDate: Date;

  @Field({ nullable: true })
  endDate?: Date;

  @Field()
  estimatedEnd: Date;

  @Field({ nullable: true })
  actualEnd?: Date;

  @Field(() => Float, { nullable: true })
  budget?: number;

  @Field(() => Float)
  currentCost: number;

  @Field(() => BudgetStatus)
  budgetStatus: BudgetStatus;

  @Field(() => String, { nullable: true })
  location?: any;

  @Field(() => String, { nullable: true })
  specifications?: any;

  @Field(() => String, { nullable: true })
  documents?: any;

  @Field(() => Boolean)
  isPublic: boolean;

  @Field(() => Boolean)
  allowsCollaboration: boolean;

  @Field(() => SharingLevel)
  sharingLevel: SharingLevel;

  @Field(() => Float)
  progressPercentage: number;

  @Field(() => Int)
  milestonesTotal: number;

  @Field(() => Int)
  milestonesCompleted: number;

  @Field(() => Float, { nullable: true })
  qualityScore?: number;

  @Field(() => Float, { nullable: true })
  safetyScore?: number;

  @Field(() => Int)
  incidentCount: number;

  @Field(() => String, { nullable: true })
  metadata?: any;

  @Field(() => String, { nullable: true })
  settings?: any;

  @Field(() => [String])
  tags: string[];

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field()
  createdBy: string;

  // Relations - These will be resolved by separate resolvers
  @Field(() => [ProjectMember], { nullable: true })
  members?: ProjectMember[];

  @Field(() => [ProjectOrganization], { nullable: true })
  organizations?: ProjectOrganization[];

  @Field(() => [Post], { nullable: true })
  posts?: Post[];

  @Field(() => [Milestone], { nullable: true })
  milestones?: Milestone[];

  @Field(() => [Task], { nullable: true })
  tasks?: Task[];

  @Field(() => [ProjectPhase], { nullable: true })
  projectPhases?: ProjectPhase[];

  @Field(() => [Innovation], { nullable: true })
  innovations?: Innovation[];

  @Field(() => [LessonLearned], { nullable: true })
  lessonsLearned?: LessonLearned[];

  @Field(() => [RiskFactor], { nullable: true })
  riskFactors?: RiskFactor[];
}