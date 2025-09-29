import { Injectable, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { PostType, PostStatus } from '@prisma/client';
import { Post } from './entities/post.entity';
import { convertPrismaProfessionalToGraphQL } from '../../utils/prisma-to-graphql';

interface FindWithFiltersOptions {
  type?: PostType;
  status?: PostStatus;
  authorId?: string;
  limit?: number;
  offset?: number;
}

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) {}

  // ===== BASIC CRUD =====

  async create(createPostInput: CreatePostInput): Promise<Post> {
    const postFromDb = await this.prisma.post.create({
      data: {
        content: createPostInput.content,
        authorId: createPostInput.authorId,
        type: createPostInput.type || PostType.GENERAL,
        status: createPostInput.status || PostStatus.PUBLISHED,
        viewCount: 0,
        likeCount: 0,
        commentCount: 0,
        shareCount: 0,
      },
      include: {
        author: true,
      },
    });

    return this.convertPrismaPostToGraphQL(postFromDb);
  }

  async findAll(): Promise<Post[]> {
    const postsFromDb = await this.prisma.post.findMany({
      include: {
        author: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return postsFromDb.map(post => this.convertPrismaPostToGraphQL(post));
  }

  async findOne(id: string): Promise<Post> {
    const postFromDb = await this.prisma.post.findUnique({
      where: { id },
      include: {
        author: true,
      },
    });

    if (!postFromDb) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }

    // Increment view count
    await this.prisma.post.update({
      where: { id },
      data: { viewCount: { increment: 1 } },
    });

    return this.convertPrismaPostToGraphQL(postFromDb);
  }

  async update(id: string, updatePostInput: UpdatePostInput, userId: string): Promise<Post> {
    const existingPost = await this.prisma.post.findUnique({ 
      where: { id } 
    });
    
    if (!existingPost) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }

    if (existingPost.authorId !== userId) {
      throw new ForbiddenException('You can only update your own posts');
    }

    // Filtrar solo los campos que queremos actualizar
    const updateData: any = {};
    if (updatePostInput.content !== undefined) updateData.content = updatePostInput.content;
    if (updatePostInput.type !== undefined) updateData.type = updatePostInput.type;
    if (updatePostInput.status !== undefined) updateData.status = updatePostInput.status;
    updateData.updatedAt = new Date();

    const updatedPostFromDb = await this.prisma.post.update({
      where: { id },
      data: updateData,
      include: {
        author: true,
      },
    });

    return this.convertPrismaPostToGraphQL(updatedPostFromDb);
  }

  async remove(id: string, userId: string): Promise<boolean> {
    const existingPost = await this.prisma.post.findUnique({ 
      where: { id } 
    });
    
    if (!existingPost) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }

    if (existingPost.authorId !== userId) {
      throw new ForbiddenException('You can only delete your own posts');
    }

    try {
      await this.prisma.post.delete({
        where: { id },
      });
      return true;
    } catch (error) {
      return false;
    }
  }

  // ===== QUERIES WITH FILTERS =====

  async findByAuthor(authorId: string): Promise<Post[]> {
    const postsFromDb = await this.prisma.post.findMany({
      where: { authorId },
      include: {
        author: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return postsFromDb.map(post => this.convertPrismaPostToGraphQL(post));
  }

  async findByType(type: PostType): Promise<Post[]> {
    const postsFromDb = await this.prisma.post.findMany({
      where: { type },
      include: {
        author: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return postsFromDb.map(post => this.convertPrismaPostToGraphQL(post));
  }

  async findByStatus(status: PostStatus): Promise<Post[]> {
    const postsFromDb = await this.prisma.post.findMany({
      where: { status },
      include: {
        author: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return postsFromDb.map(post => this.convertPrismaPostToGraphQL(post));
  }

  async findWithFilters(options: FindWithFiltersOptions): Promise<Post[]> {
    const { type, status, authorId, limit = 50, offset = 0 } = options;

    const postsFromDb = await this.prisma.post.findMany({
      where: {
        ...(type && { type }),
        ...(status && { status }),
        ...(authorId && { authorId }),
      },
      include: {
        author: true,
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
      skip: offset,
    });

    return postsFromDb.map(post => this.convertPrismaPostToGraphQL(post));
  }

  // ===== POST INTERACTIONS =====

  async likePost(postId: string, userId: string): Promise<Post> {
    const existingPost = await this.prisma.post.findUnique({
      where: { id: postId }
    });

    if (!existingPost) {
      throw new NotFoundException(`Post with ID ${postId} not found`);
    }

    // TODO: Implementar PostLike entity para evitar likes duplicados
    // Por ahora solo incrementamos el contador
    const updatedPostFromDb = await this.prisma.post.update({
      where: { id: postId },
      data: { likeCount: { increment: 1 } },
      include: { author: true },
    });

    return this.convertPrismaPostToGraphQL(updatedPostFromDb);
  }

  async unlikePost(postId: string, userId: string): Promise<Post> {
    const existingPost = await this.prisma.post.findUnique({
      where: { id: postId }
    });

    if (!existingPost) {
      throw new NotFoundException(`Post with ID ${postId} not found`);
    }

    // Evitar que el contador sea negativo
    if (existingPost.likeCount > 0) {
      const updatedPostFromDb = await this.prisma.post.update({
        where: { id: postId },
        data: { likeCount: { decrement: 1 } },
        include: { author: true },
      });

      return this.convertPrismaPostToGraphQL(updatedPostFromDb);
    }

    // Si ya está en 0, solo retornar el post
    return this.convertPrismaPostToGraphQL({
      ...existingPost,
      author: await this.prisma.professional.findUnique({
        where: { id: existingPost.authorId }
      })
    });
  }

  // ===== ANALYTICS =====

  async getTotalCount(): Promise<number> {
    return this.prisma.post.count();
  }

  async getRecentPosts(limit: number): Promise<Post[]> {
    const postsFromDb = await this.prisma.post.findMany({
      include: {
        author: true,
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });

    return postsFromDb.map(post => this.convertPrismaPostToGraphQL(post));
  }

  // ===== HELPER METHODS =====

  private convertPrismaPostToGraphQL(prismaPost: any): Post {
    const convertedPost = {
      ...prismaPost,
      // Convertir author si existe
      author: prismaPost.author ? convertPrismaProfessionalToGraphQL(prismaPost.author) : undefined,
      // Agregar campos computados
      engagementScore: prismaPost.likeCount + prismaPost.commentCount + prismaPost.shareCount,
      timeAgo: this.getTimeAgo(prismaPost.createdAt),
      // Campos adicionales del autor para facilitar el frontend
      authorDisplayName: prismaPost.author?.displayName || `${prismaPost.author?.firstName} ${prismaPost.author?.lastName}`,
      authorTitle: prismaPost.author?.title,
      authorAvatar: prismaPost.author?.avatar,
      authorIsVerified: prismaPost.author?.isVerified || false,
      authorDiscipline: prismaPost.author?.discipline,
    };

    return convertedPost;
  }

  private getTimeAgo(date: Date): string {
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    if (diffInDays === 1) return 'Yesterday';
    return `${diffInDays} days ago`;
  }
}