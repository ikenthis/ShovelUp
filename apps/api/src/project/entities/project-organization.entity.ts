import { ObjectType, Field, ID, Float } from '@nestjs/graphql';
import { Project } from './project.entity';
import { Organization } from '../../organization/entities/organization.entity';

// apps/api/src/modules/project/entities/project-organization.entity.ts
@ObjectType()
export class ProjectOrganization {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  role: string; // ProjectOrganizationRole enum

  @Field({ nullable: true })
  responsibility?: string;

  @Field(() => Boolean)
  isPrimary: boolean;

  @Field(() => Float, { nullable: true })
  contractValue?: number;

  @Field({ nullable: true })
  contractStart?: Date;

  @Field({ nullable: true })
  contractEnd?: Date;

  @Field(() => String)
  contractStatus: string; // ContractStatus enum

  @Field(() => Float, { nullable: true })
  performanceScore?: number;

  @Field(() => Float)
  completionRate: number;

  @Field(() => Float, { nullable: true })
  qualityRating?: number;

  @Field(() => Boolean)
  timelyDelivery: boolean;

  @Field(() => ID)
  projectId: string;

  @Field(() => ID)
  organizationId: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  // Relations
  @Field(() => Project, { nullable: true })
  project?: Project;

  @Field(() => Organization, { nullable: true })
  organization?: Organization;
}