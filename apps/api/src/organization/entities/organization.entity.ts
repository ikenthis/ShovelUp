// apps/api/src/organization/entities/organization.entity.ts
import { ObjectType, Field, ID, Int, Float } from '@nestjs/graphql';
import { 
  OrganizationType, 
  OrganizationSize, 
  Industry 
} from '../../common/enums';

@ObjectType()
export class Organization {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  slug: string;

  @Field({ nullable: true })
  legalName?: string;

  @Field({ nullable: true })
  description?: string;

  // Organization Classification
  @Field(() => OrganizationType)
  type: OrganizationType;

  @Field(() => OrganizationSize, { nullable: true })
  size?: OrganizationSize;

  @Field(() => Industry, { nullable: true })
  industry?: Industry;

  // Contact & Legal Information
  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  phone?: string;

  @Field({ nullable: true })
  website?: string;

  @Field({ nullable: true })
  taxId?: string;

  // Professional Credentials
  @Field(() => [String], { nullable: true })
  specialties?: string[];

  // Reputation & Performance Metrics
  @Field(() => Float)
  reputationScore: number;

  @Field(() => Int)
  projectsCompleted: number;

  @Field(() => Int)
  projectsActive: number;

  @Field(() => Float, { nullable: true })
  averageRating?: number;

  @Field(() => Float, { nullable: true })
  safetyScore?: number;

  @Field(() => Float, { nullable: true })
  qualityScore?: number;

  @Field(() => Float, { nullable: true })
  onTimeDeliveryRate?: number;

  // Business Information
  @Field(() => Int, { nullable: true })
  yearEstablished?: number;

  @Field(() => Int, { nullable: true })
  employeeCount?: number;

  // Platform & Verification Status
  @Field()
  isVerified: boolean;

  @Field(() => Date, { nullable: true })
  verifiedAt?: Date;

  @Field({ nullable: true })
  verifiedBy?: string;

  @Field()
  isActive: boolean;

  // Social & Branding
  @Field({ nullable: true })
  avatar?: string;

  @Field({ nullable: true })
  banner?: string;

  // Audit Timestamps
  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  // Computed Fields (resolved by GraphQL field resolvers)
  @Field(() => Int, { defaultValue: 0, description: 'Number of active professionals in this organization' })
  membersCount?: number;

  @Field(() => Int, { defaultValue: 0, description: 'Total number of projects this organization is involved in' })
  projectsCount?: number;

  @Field(() => Int, { defaultValue: 0, description: 'Number of constellations this organization participates in' })
  constellationsCount?: number;

  @Field(() => Int, { defaultValue: 0, description: 'Number of active collaborations with other organizations' })
  collaborationsCount?: number;
}