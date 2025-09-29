import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { Post } from './post.entity';

@ObjectType()
export class PostTag {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  slug: string;

  @Field(() => Int)
  usageCount: number;

  @Field()
  createdAt: Date;

  // Relations
  @Field(() => [Post], { nullable: true })
  posts?: Post[];
}