import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Post } from './post.entity';
import { Professional } from '../../professional/entities/professional.entity';

@ObjectType()
export class PostReport {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  postId: string;

  @Field(() => ID)
  reporterId: string;

  @Field()
  reason: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  status: string; // PENDING, REVIEWED, RESOLVED

  @Field()
  createdAt: Date;

  @Field({ nullable: true })
  resolvedAt?: Date;

  // Relations
  @Field(() => Post, { nullable: true })
  post?: Post;

  @Field(() => Professional, { nullable: true })
  reporter?: Professional;
}