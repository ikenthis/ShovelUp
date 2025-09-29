// apps/api/src/risk/entities/risk-factor.entity.ts
import { ObjectType, Field, ID, Float, Int } from '@nestjs/graphql';
import { RiskCategory, RiskStatus, Priority } from '../../common/enums';
import { Project } from '../../project/entities/project.entity';
import { Professional } from '../../professional/entities/professional.entity';
import { RiskAssessment } from './risk-assessment.entity';
import { RiskMitigation } from './risk-mitigation.entity';
import { RiskEvent } from './risk-event.entity';

@ObjectType()
export class RiskFactor {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field(() => RiskCategory)
  category: RiskCategory;

  @Field(() => Float)
  probability: number; // 0-1

  @Field(() => Float)
  impact: number; // 0-1

  @Field(() => Float)
  riskScore: number; // Calculated: probability * impact

  @Field({ nullable: true })
  mitigation?: string;

  @Field({ nullable: true })
  contingency?: string;

  @Field({ nullable: true })
  owner?: string; // Professional ID responsible

  @Field(() => RiskStatus)
  status: RiskStatus;

  @Field(() => Priority)
  priority: Priority;

  @Field()
  identifiedAt: Date;

  @Field({ nullable: true })
  targetDate?: Date; // When to address

  @Field({ nullable: true })
  resolvedAt?: Date;

  @Field(() => ID)
  projectId: string;

  @Field(() => ID)
  identifiedBy: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  // Relations
  @Field(() => Project, { nullable: true })
  project?: Project;

  @Field(() => Professional, { nullable: true })
  identifier?: Professional;

  @Field(() => Professional, { nullable: true })
  ownerProfessional?: Professional;

  @Field(() => [RiskAssessment], { nullable: true })
  assessments?: RiskAssessment[];

  @Field(() => [RiskMitigation], { nullable: true })
  mitigations?: RiskMitigation[];

  // Computed fields
  @Field(() => String)
  riskLevel?: string; // LOW, MEDIUM, HIGH, CRITICAL

  @Field(() => Boolean)
  isOverdue?: boolean;

  @Field(() => Int, { nullable: true })
  daysToTarget?: number;
}