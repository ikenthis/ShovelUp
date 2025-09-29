import { ObjectType, Field, Int, ID, Float, registerEnumType } from '@nestjs/graphql';
import { Discipline, EmploymentType, AvailabilityStatus } from '@prisma/client';
import GraphQLJSON from 'graphql-type-json';

// Registrar enums para GraphQL
registerEnumType(Discipline, { name: 'Discipline' });
registerEnumType(EmploymentType, { name: 'EmploymentType' });
registerEnumType(AvailabilityStatus, { name: 'AvailabilityStatus' });

@ObjectType()
export class Professional {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  username: string;

  // No exponer password en GraphQL por seguridad
  
  @Field(() => String)
  firstName: string;

  @Field(() => String)
  lastName: string;

  @Field(() => String, { nullable: true })
  displayName?: string | null;

  @Field(() => String, { nullable: true })
  title?: string | null;

  @Field(() => String, { nullable: true })
  bio?: string | null;

  @Field(() => Discipline)
  discipline: Discipline;

  @Field(() => [String])
  specialties: string[];

  @Field(() => Int, { nullable: true })
  yearsExperience?: number | null;

  @Field(() => String, { nullable: true })
  currentRole?: string | null;

  @Field(() => String, { nullable: true })
  phone?: string | null;

  @Field(() => GraphQLJSON, { nullable: true })
  location?: any;

  @Field(() => String, { nullable: true })
  avatar?: string | null;

  @Field(() => String, { nullable: true })
  banner?: string | null;

  @Field(() => Boolean)
  isVerified: boolean;

  @Field(() => Date, { nullable: true })
  verifiedAt?: Date | null;

  @Field(() => String, { nullable: true })
  verifiedBy?: string | null;

  @Field(() => Boolean)
  emailVerified: boolean;

  @Field(() => Boolean)
  phoneVerified: boolean;

  @Field(() => GraphQLJSON, { nullable: true })
  licenses?: any;

  @Field(() => GraphQLJSON, { nullable: true })
  certifications?: any;

  @Field(() => GraphQLJSON, { nullable: true })
  education?: any;

  @Field(() => GraphQLJSON, { nullable: true })
  portfolio?: any;

  @Field(() => String, { nullable: true })
  linkedinUrl?: string | null;

  @Field(() => String, { nullable: true })
  portfolioUrl?: string | null;

  @Field(() => String, { nullable: true })
  websiteUrl?: string | null;

  @Field(() => GraphQLJSON, { nullable: true })
  socialLinks?: any;

  @Field(() => Float)
  reputationScore: number;

  @Field(() => Float)
  contributionScore: number;

  @Field(() => Int)
  knowledgeShares: number;

  @Field(() => Float)
  mentorshipScore: number;

  @Field(() => Float)
  helpfulnessRating: number;

  @Field(() => Float, { nullable: true })
  responseTime?: number | null;

  @Field(() => Int)
  postsCount: number;

  @Field(() => Int)
  commentsCount: number;

  @Field(() => Int)
  likesReceived: number;

  @Field(() => Int)
  sharesReceived: number;

  @Field(() => Int)
  followersCount: number;

  @Field(() => Int)
  followingCount: number;

  @Field(() => Boolean)
  isActive: boolean;

  @Field(() => Boolean)
  isAvailableForWork: boolean;

  @Field(() => Boolean)
  isOpenToMentoring: boolean;

  @Field(() => GraphQLJSON, { nullable: true })
  privacySettings?: any;

  @Field(() => GraphQLJSON, { nullable: true })
  notificationSettings?: any;

  @Field(() => String, { nullable: true })
  organizationId?: string | null;

  @Field(() => EmploymentType, { nullable: true })
  employmentType?: EmploymentType | null;

  @Field(() => AvailabilityStatus)
  availabilityStatus: AvailabilityStatus;

  @Field(() => Float, { nullable: true })
  hourlyRate?: number | null;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => Date)
  lastActiveAt: Date;
}