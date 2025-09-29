// apps/api/src/risk/entities/risk-event.entity.ts
import { ObjectType, Field, ID, Float } from '@nestjs/graphql';
import { RiskFactor } from './risk-factor.entity';
import { Professional } from '../../professional/entities/professional.entity';

@ObjectType()
export class RiskEvent {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  eventType: string; // MATERIALIZED, NEAR_MISS, FALSE_ALARM

  @Field(() => Float, { nullable: true })
  actualImpact?: number;

  @Field(() => Float, { nullable: true })
  actualCost?: number;

  @Field(() => Float, { nullable: true })
  actualDelay?: number; // Days

  @Field({ nullable: true })
  lessonsLearned?: string;

  @Field({ nullable: true })
  preventionMeasures?: string;

  @Field(() => ID)
  riskFactorId: string;

  @Field(() => ID)
  reportedBy: string;

  @Field()
  occurredAt: Date;

  @Field()
  reportedAt: Date;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  // Relations
  @Field(() => RiskFactor, { nullable: true })
  riskFactor?: RiskFactor;

  @Field(() => Professional, { nullable: true })
  reporter?: Professional;

  // Analysis
  @Field(() => Boolean)
  wasAnticipated?: boolean;

  @Field(() => Float, { nullable: true })
  mitigationEffectiveness?: number; // How well mitigations worked
}