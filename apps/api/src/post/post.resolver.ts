import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { PostService } from './post.service';
import { Post } from './entities/post.entity';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { PostType, PostStatus } from '@prisma/client';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { Professional } from 'src/professional/entities/professional.entity';

@Resolver(() => Post)
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  // ===== QUERIES =====

  @Query(() => [Post], { name: 'posts' })
  @UseGuards(JwtAuthGuard)
  findAll(@CurrentUser() user: Professional) {
    return this.postService.findAll();
  }

  @Query(() => Post, { name: 'post' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.postService.findOne(id);
  }

  @Query(() => [Post], { name: 'postsByAuthor' })
  findByAuthor(@Args('authorId', { type: () => ID }) authorId: string) {
    return this.postService.findByAuthor(authorId);
  }

  @Query(() => [Post], { name: 'myPosts' })
  @UseGuards(JwtAuthGuard)
  findMyPosts(@CurrentUser() user: Professional) {
    return this.postService.findByAuthor(user.id);
  }

  @Query(() => [Post], { name: 'postsByType' })
  findByType(@Args('type', { type: () => String }) type: PostType) {
    return this.postService.findByType(type);
  }

  @Query(() => [Post], { name: 'postsByStatus' })
  findByStatus(@Args('status', { type: () => String }) status: PostStatus) {
    return this.postService.findByStatus(status);
  }

  @Query(() => [Post], { name: 'postsWithFilters' })
  @UseGuards(JwtAuthGuard)
  findWithFilters(
    @CurrentUser() user: Professional,
    @Args('type', { type: () => String, nullable: true }) type?: PostType,
    @Args('status', { type: () => String, nullable: true }) status?: PostStatus,
    @Args('authorId', { type: () => ID, nullable: true }) authorId?: string,
    @Args('limit', { type: () => Int, nullable: true }) limit?: number,
    @Args('offset', { type: () => Int, nullable: true }) offset?: number,
  ) {
    return this.postService.findWithFilters({
      type,
      status,
      authorId,
      limit,
      offset,
    });
  }

  @Query(() => [Post], { name: 'recentPosts' })
  getRecentPosts(
    @Args('limit', { type: () => Int, defaultValue: 20 }) limit: number,
  ) {
    return this.postService.getRecentPosts(limit);
  }

  // ===== MUTATIONS =====

  @Mutation(() => Post)
  @UseGuards(JwtAuthGuard)
  createPost(
    @Args('createPostInput') createPostInput: CreatePostInput,
    @CurrentUser() user: Professional
  ) {
    return this.postService.create({
      ...createPostInput,
      authorId: user.id
    });
  }

  @Mutation(() => Post)
  @UseGuards(JwtAuthGuard)
  updatePost(
    @Args('updatePostInput') updatePostInput: UpdatePostInput,
    @CurrentUser() user: Professional
  ) {
    return this.postService.update(updatePostInput.id.toString(), updatePostInput, user.id);
  }

  @Mutation(() => Boolean)
  @UseGuards(JwtAuthGuard)
  removePost(
    @Args('id', { type: () => ID }) id: string,
    @CurrentUser() user: Professional
  ) {
    return this.postService.remove(id, user.id);
  }

  // ===== POST INTERACTIONS =====

  @Mutation(() => Post)
  @UseGuards(JwtAuthGuard)
  likePost(
    @Args('postId', { type: () => ID }) postId: string,
    @CurrentUser() user: Professional
  ) {
    return this.postService.likePost(postId, user.id);
  }

  @Mutation(() => Post)
  @UseGuards(JwtAuthGuard)
  unlikePost(
    @Args('postId', { type: () => ID }) postId: string,
    @CurrentUser() user: Professional
  ) {
    return this.postService.unlikePost(postId, user.id);
  }

  // ===== ANALYTICS =====

  @Query(() => Int, { name: 'totalPostsCount' })
  @UseGuards(JwtAuthGuard)
  getTotalCount(@CurrentUser() user: Professional) {
    return this.postService.getTotalCount();
  }
}