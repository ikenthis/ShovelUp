import { ObjectType, Field, ID, Int, registerEnumType } from '@nestjs/graphql';
import { PostType, PostStatus } from '@prisma/client';
import { Professional } from '../../professional/entities/professional.entity';
import { PostComment } from './postcomment.entity';
import { PostLike } from './postlike.entity';
import { PostAttachment } from './postattachment.entity';
import { PostShare } from './postshare.entity';
import { PostMention } from './postmention.entity';

// Register only existing enums for GraphQL
registerEnumType(PostType, { name: 'PostType' });
registerEnumType(PostStatus, { name: 'PostStatus' });

@ObjectType()
export class Post {
  @Field(() => ID)
  id: string;

  @Field()
  content: string;

  @Field(() => PostType)
  type: PostType;

  @Field(() => PostStatus)
  status: PostStatus;

  @Field()
  isPublic: boolean;

  @Field(() => Int)
  viewCount: number;

  @Field(() => Int)
  likeCount: number;

  @Field(() => Int)
  commentCount: number;

  @Field(() => Int)
  shareCount: number;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  // === DIRECT RELATIONS (IDs) ===
  @Field(() => ID)
  authorId: string;

  @Field(() => ID, { nullable: true })
  projectId?: string;

  // === OBJECT RELATIONS ===
  @Field(() => Professional, { nullable: true })
  author?: Professional;

  // === COMPUTED FIELDS ===
  @Field(() => Boolean, { nullable: true })
  isLikedByCurrentUser?: boolean;

  @Field(() => Boolean, { nullable: true })
  isAuthoredByCurrentUser?: boolean;

  @Field(() => String, { nullable: true })
  timeAgo?: string; // "2 hours ago"

  @Field(() => Int, { nullable: true })
  engagementScore?: number; // likes + comments + shares

  @Field(() => [String], { nullable: true })
  tags?: string[]; // Hashtags as simple strings

   @Field(() => [PostComment], { nullable: true })
  comments?: PostComment[];

  @Field(() => [PostLike], { nullable: true })
  likes?: PostLike[];

  @Field(() => [PostAttachment], { nullable: true })
  attachments?: PostAttachment[];

  @Field(() => [PostShare], { nullable: true })
  shares?: PostShare[];

  @Field(() => [PostMention], { nullable: true })
  mentions?: PostMention[];
}