import { ObjectType, Field, ID, Int, registerEnumType } from '@nestjs/graphql';
import { Professional } from 'src/professional/entities/professional.entity';
import { Post } from './post.entity';

@ObjectType()
export class PostComment {
  @Field(() => ID)
  id: string;

  @Field()
  content: string;

  @Field(() => ID)
  postId: string;

  @Field(() => ID)
  authorId: string;

  @Field(() => ID, { nullable: true })
  parentCommentId?: string; // Para respuestas a comentarios

  @Field(() => Int)
  likeCount: number;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  // Relations
  @Field(() => Post, { nullable: true })
  post?: Post;

  @Field(() => Professional, { nullable: true })
  author?: Professional;

  @Field(() => PostComment, { nullable: true })
  parentComment?: PostComment;

  @Field(() => [PostComment], { nullable: true })
  replies?: PostComment[];
}