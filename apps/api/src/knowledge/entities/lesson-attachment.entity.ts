// apps/api/src/modules/knowledge/entities/lesson-attachment.entity.ts

import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { LessonLearned } from './lesson-learned.entity';
import { Professional } from '../../professional/entities/professional.entity';

@ObjectType()
export class LessonAttachment {
  @Field(() => ID)
  id: string;

  @Field()
  fileName: string;

  @Field()
  fileUrl: string;

  @Field()
  fileType: string;

  @Field(() => Int)
  fileSize: number;

  @Field({ nullable: true })
  description?: string;

  @Field(() => ID)
  lessonId: string;

  @Field(() => ID)
  uploadedBy: string;

  @Field()
  uploadedAt: Date;

  // Relations
  @Field(() => LessonLearned, { nullable: true })
  lesson?: LessonLearned;

  @Field(() => Professional, { nullable: true })
  uploader?: Professional;
}