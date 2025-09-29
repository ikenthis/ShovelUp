import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { LessonLearned } from './lesson-learned.entity';
import { Project } from '../../project/entities/project.entity';
import { Professional } from '../../professional/entities/professional.entity';

@ObjectType()
export class LessonApplication {
  @Field(() => ID)
  id: string;

  @Field({ nullable: true })
  applicationNote?: string;

  @Field({ nullable: true })
  adaptations?: string;

  @Field({ nullable: true })
  context?: string;

  @Field(() => Int, { nullable: true })
  successRating?: number;

  @Field({ nullable: true })
  resultDescription?: string;

  @Field(() => String, { nullable: true })
  impactMeasured?: any; // JSON field

  @Field(() => Boolean, { nullable: true })
  wouldRecommend?: boolean;

  @Field(() => ID)
  lessonId: string;

  @Field(() => ID)
  projectId: string;

  @Field(() => ID)
  appliedById: string;

  @Field()
  appliedAt: Date;

  @Field({ nullable: true })
  completedAt?: Date;

  // Relations
  @Field(() => LessonLearned, { nullable: true })
  lesson?: LessonLearned;

  @Field(() => Project, { nullable: true })
  project?: Project;

  @Field(() => Professional, { nullable: true })
  appliedBy?: Professional;

  // Computed Fields
  @Field(() => Int, { nullable: true })
  daysToComplete?: number;

  @Field(() => Boolean)
  isCompleted?: boolean;
}