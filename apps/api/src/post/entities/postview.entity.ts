import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { Post } from './post.entity';
import { Professional } from '../../professional/entities/professional.entity';

@ObjectType()
export class PostView {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  postId: string;

  @Field(() => ID)
  userId: string;

  @Field()
  viewedAt: Date;

  @Field(() => Int)
  duration: number; // segundos que estuvo viendo

  // Relations
  @Field(() => Post, { nullable: true })
  post?: Post;

  @Field(() => Professional, { nullable: true })
  user?: Professional;
}