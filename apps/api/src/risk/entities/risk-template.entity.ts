// apps/api/src/risk/entities/risk-template.entity.ts
import { ObjectType, Field, ID, Int, Float } from '@nestjs/graphql';
import { RiskCategory } from '../../common/enums';
import { Organization } from '../../organization/entities/organization.entity';
import { Professional } from '../../professional/entities/professional.entity';

@ObjectType()
export class RiskTemplate {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field(() => RiskCategory)
  category: RiskCategory;

  @Field(() => Float)
  defaultProbability: number;

  @Field(() => Float)
  defaultImpact: number;

  @Field({ nullable: true })
  suggestedMitigation?: string;

  @Field({ nullable: true })
  suggestedContingency?: string;

  @Field(() => [String])
  applicableProjectTypes: string[]; // ProjectType enum values

  @Field(() => [String])
  applicablePhases: string[]; // ProjectPhase enum values

  @Field(() => [String])
  tags: string[];

  @Field(() => Boolean)
  isActive: boolean;

  @Field(() => Boolean)
  isPublic: boolean; // Available to all organizations

  @Field(() => ID, { nullable: true })
  organizationId?: string; // If private to organization

  @Field(() => ID)
  createdBy: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  // Relations
  @Field(() => Organization, { nullable: true })
  organization?: Organization;

  @Field(() => Professional, { nullable: true })
  creator?: Professional;

  // Usage stats
  @Field(() => Int)
  usageCount?: number;

  @Field(() => Float, { nullable: true })
  averageActualProbability?: number;

  @Field(() => Float, { nullable: true })
  averageActualImpact?: number;
}