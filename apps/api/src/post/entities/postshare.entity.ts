import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Post } from './post.entity';
import { Professional } from '../../professional/entities/professional.entity';

@ObjectType()
export class PostShare {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  postId: string;

  @Field(() => ID)
  userId: string;

  @Field({ nullable: true })
  comment?: string;

  @Field()
  createdAt: Date;

  // Relations
  @Field(() => Post, { nullable: true })
  post?: Post;

  @Field(() => Professional, { nullable: true })
  user?: Professional;
}