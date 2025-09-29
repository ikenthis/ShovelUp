import { ObjectType, Field, ID, Float } from '@nestjs/graphql';
import { CollaboratorRole, ContributionType } from '../../common/enums';

@ObjectType()
export class InnovationCollaborator {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  role: string; // CollaboratorRole

  @Field({ nullable: true })
  contribution?: string;

  @Field(() => String)
  contributionType: string; // ContributionType

  @Field(() => Float, { nullable: true })
  timeInvested?: number;

  @Field({ nullable: true })
  expertise?: string;

  @Field(() => ID)
  innovationId: string;

  @Field(() => ID)
  professionalId: string;

  @Field()
  joinedAt: Date;
}