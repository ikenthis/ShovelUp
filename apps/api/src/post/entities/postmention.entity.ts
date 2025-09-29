import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Post } from './post.entity';
import { Professional } from '../../professional/entities/professional.entity';

@ObjectType()
export class PostMention {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  postId: string;

  @Field(() => ID)
  mentionedUserId: string;

  @Field(() => ID)
  mentionedById: string;

  @Field()
  createdAt: Date;

  // Relations
  @Field(() => Post, { nullable: true })
  post?: Post;

  @Field(() => Professional, { nullable: true })
  mentionedUser?: Professional;

  @Field(() => Professional, { nullable: true })
  mentionedBy?: Professional;
}