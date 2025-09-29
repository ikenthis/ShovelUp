import { ObjectType, ID, Field, registerEnumType, Int, Float, InputType } from "@nestjs/graphql";
import { KnowledgeCategory, DifficultyLevel, ImpactLevel, ValidationStatus, VisibilityLevel } from '../../common/enums';
import { Project } from '../../project/entities/project.entity';
import { Professional } from '../../professional/entities/professional.entity';
import { Post } from '../../post/entities/post.entity';
import { LessonApplication } from './lesson-application.entity';
import { LessonAttachment } from './lesson-attachment.entity';
@ObjectType()
export class LessonLearned {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field(() => KnowledgeCategory)
  category: KnowledgeCategory;

  @Field({ nullable: true })
  subcategory?: string;

  @Field(() => DifficultyLevel)
  difficulty: DifficultyLevel;

  @Field({ nullable: true })
  problemDescription?: string;

  @Field({ nullable: true })
  rootCause?: string;

  @Field({ nullable: true })
  solution?: string;

  @Field({ nullable: true })
  prevention?: string;

  @Field(() => ImpactLevel)
  impactLevel: ImpactLevel;

  @Field(() => Float, { nullable: true })
  costImpact?: number;

  @Field(() => Float, { nullable: true })
  timeImpact?: number;

  @Field({ nullable: true })
  qualityImpact?: string;

  @Field(() => ValidationStatus)
  validationStatus: ValidationStatus;

  @Field({ nullable: true })
  validatedBy?: string;

  @Field({ nullable: true })
  validatedAt?: Date;

  @Field(() => VisibilityLevel)
  visibility: VisibilityLevel;

  @Field(() => Boolean)
  isTemplate: boolean;

  @Field(() => Int)
  reusedCount: number;

  @Field(() => Float, { nullable: true })
  ratingAverage?: number;

  @Field(() => Int)
  ratingCount: number;

  @Field(() => [String])
  tags: string[];

  @Field(() => [String])
  keywords: string[];

  @Field(() => ID)
  projectId: string;

  @Field(() => ID)
  contributorId: string;

  @Field(() => ID, { nullable: true })
  postId?: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  // Relations
  @Field(() => Project, { nullable: true })
  project?: Project;

  @Field(() => Professional, { nullable: true })
  contributor?: Professional;

  @Field(() => Post, { nullable: true })
  post?: Post;

  @Field(() => [LessonApplication], { nullable: true })
  applications?: LessonApplication[];

  @Field(() => [LessonAttachment], { nullable: true })
  attachments?: LessonAttachment[];

  // Computed Fields
  @Field(() => Int)
  applicationsCount?: number;

  @Field(() => Float, { nullable: true })
  successRate?: number;

  @Field(() => Boolean)
  isRecommended?: boolean;
}