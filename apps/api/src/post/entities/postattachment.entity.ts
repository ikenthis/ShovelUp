import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { Post } from './post.entity';

@ObjectType()
export class PostAttachment {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  postId: string;

  @Field()
  filename: string;

  @Field()
  originalName: string;

  @Field()
  mimeType: string;

  @Field(() => Int)
  size: number;

  @Field()
  url: string;

  @Field({ nullable: true })
  thumbnailUrl?: string;

  @Field()
  createdAt: Date;

  // Relations
  @Field(() => Post, { nullable: true })
  post?: Post;
}