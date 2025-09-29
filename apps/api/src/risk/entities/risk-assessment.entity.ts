// apps/api/src/risk/entities/risk-assessment.entity.ts
import { ObjectType, Field, ID, Float } from '@nestjs/graphql';
import { RiskFactor } from './risk-factor.entity';
import { Professional } from '../../professional/entities/professional.entity';

@ObjectType()
export class RiskAssessment {
  @Field(() => ID)
  id: string;

  @Field(() => Float)
  probability: number;

  @Field(() => Float)
  impact: number;

  @Field(() => Float)
  riskScore: number;

  @Field({ nullable: true })
  assessment?: string;

  @Field({ nullable: true })
  methodology?: string;

  @Field({ nullable: true })
  assumptions?: string;

  @Field(() => String, { nullable: true })
  evidence?: any; // JSON field for supporting evidence

  @Field(() => ID)
  riskFactorId: string;

  @Field(() => ID)
  assessedBy: string;

  @Field()
  assessedAt: Date;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  // Relations
  @Field(() => RiskFactor, { nullable: true })
  riskFactor?: RiskFactor;

  @Field(() => Professional, { nullable: true })
  assessor?: Professional;

  // Computed fields
  @Field(() => String)
  riskLevel?: string;

  @Field(() => Float, { nullable: true })
  changeFromPrevious?: number; // Change in risk score from previous assessment
}