// apps/api/src/risk/entities/risk-mitigation.entity.ts
import { ObjectType, Field, ID, Float } from '@nestjs/graphql';
import { Priority } from '../../common/enums';
import { RiskFactor } from './risk-factor.entity';
import { Professional } from '../../professional/entities/professional.entity';


@ObjectType()
export class RiskMitigation {
  @Field(() => ID)
  id: string;

  @Field()
  strategy: string; // AVOID, MITIGATE, TRANSFER, ACCEPT

  @Field()
  description: string;

  @Field({ nullable: true })
  actions?: string;

  @Field({ nullable: true })
  resources?: string;

  @Field(() => Float, { nullable: true })
  cost?: number;

  @Field(() => Float, { nullable: true })
  timeframe?: number; // Days to implement

  @Field(() => Float, { nullable: true })
  effectiveness?: number; // Expected reduction in risk score (0-1)

  @Field()
  status: string; // PLANNED, IN_PROGRESS, COMPLETED, FAILED

  @Field(() => Priority)
  priority: Priority;

  @Field({ nullable: true })
  implementedAt?: Date;

  @Field({ nullable: true })
  completedAt?: Date;

  @Field(() => ID)
  riskFactorId: string;

  @Field(() => ID)
  assignedTo: string;

  @Field(() => ID)
  createdBy: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  // Relations
  @Field(() => RiskFactor, { nullable: true })
  riskFactor?: RiskFactor;

  @Field(() => Professional, { nullable: true })
  assignee?: Professional;

  @Field(() => Professional, { nullable: true })
  creator?: Professional;

  // Computed fields
  @Field(() => Boolean)
  isOverdue?: boolean;

  @Field(() => Float, { nullable: true })
  progressPercentage?: number;
}