import { ObjectType, Field, ID, Int, Float } from '@nestjs/graphql';
import { AdoptionType } from '../../common/enums';

@ObjectType()
export class InnovationAdoption {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  adoptionType: string; // AdoptionType

  @Field({ nullable: true })
  adaptations?: string;

  @Field({ nullable: true })
  implementationNotes?: string;

  @Field({ nullable: true })
  implementationDate?: Date;

  @Field({ nullable: true })
  completionDate?: Date;

  @Field(() => Float, { nullable: true })
  effort?: number;

  @Field(() => Float, { nullable: true })
  cost?: number;

  @Field(() => Int, { nullable: true })
  successRating?: number;

  @Field(() => String, { nullable: true })
  results?: any;

  @Field({ nullable: true })
  lessonsLearned?: string;

  @Field(() => Boolean, { nullable: true })
  wouldRecommend?: boolean;

  @Field(() => Float, { nullable: true })
  timeToImplement?: number;

  @Field(() => Boolean)
  adoptionSuccess: boolean;

  @Field(() => ID)
  innovationId: string;

  @Field(() => ID)
  projectId: string;

  @Field(() => ID)
  adoptedById: string;

  @Field()
  adoptedAt: Date;

  @Field()
  updatedAt: Date;
}