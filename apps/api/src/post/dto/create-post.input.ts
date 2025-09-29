import { InputType, Field } from '@nestjs/graphql';
import { PostType, PostStatus } from '@prisma/client';

// En create-post.input.ts
@InputType()
export class CreatePostInput {
  @Field()
  content: string;

  @Field(() => PostType, { defaultValue: PostType.GENERAL })
  type: PostType;

  @Field(() => PostStatus, { defaultValue: PostStatus.PUBLISHED })
  status: PostStatus;

  // Hacer authorId requerido en lugar de opcional
  authorId: string; // Sin ? ni @Field() porque se asigna en el resolver
}