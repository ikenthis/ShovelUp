// apps/api/src/modules/task/entities/task.entity.ts
import { ObjectType, Field, ID, Float, Int } from '@nestjs/graphql';
import { TaskStatus, TaskPriority } from '../../common/enums';
import { Professional } from '../../professional/entities/professional.entity';
import { Project } from '../../project/entities/project.entity';
import { ProjectPhase } from '../../project/entities/project-phase.entity';
import { Post } from '../../post/entities/post.entity';
import { TaskDependency } from './task-dependency.entity';
import { TaskComment } from './task-comment.entity';
import { TaskAttachment } from './task-attachment.entity';
import { TaskWatcher } from './task-watcher.entity';

@ObjectType()
export class Task {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => TaskStatus)
  status: TaskStatus;

  @Field(() => TaskPriority)
  priority: TaskPriority;

  @Field({ nullable: true })
  startDate?: Date;

  @Field({ nullable: true })
  dueDate?: Date;

  @Field({ nullable: true })
  completedAt?: Date;

  @Field(() => Float, { nullable: true })
  estimatedHours?: number;

  @Field(() => Float)
  actualHours: number;

  @Field(() => Float, { nullable: true })
  estimatedCost?: number;

  @Field(() => Float)
  actualCost: number;

  @Field(() => Float)
  progress: number;

  @Field(() => [String])
  tags: string[];

  // Enterprise features
  @Field(() => Boolean)
  isBlocked: boolean;

  @Field({ nullable: true })
  blockedReason?: string;

  @Field({ nullable: true })
  blockedSince?: Date;

  @Field(() => Boolean)
  requiresApproval: boolean;

  @Field(() => Boolean)
  isClientVisible: boolean;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  // Foreign Keys
  @Field(() => ID)
  projectId: string;

  @Field(() => ID, { nullable: true })
  phaseId?: string;

  @Field(() => ID, { nullable: true })
  assigneeId?: string;

  @Field(() => ID)
  createdById: string;

  @Field(() => ID, { nullable: true })
  parentTaskId?: string;

  // Relations (resolved by field resolvers)
  @Field(() => Project, { nullable: true })
  project?: Project;

  @Field(() => ProjectPhase, { nullable: true })
  phase?: ProjectPhase;

  @Field(() => Professional, { nullable: true })
  assignee?: Professional;

  @Field(() => Professional, { nullable: true })
  createdBy?: Professional;

  @Field(() => Task, { nullable: true })
  parentTask?: Task;

  @Field(() => [Task], { nullable: true })
  subtasks?: Task[];

  @Field(() => [TaskDependency], { nullable: true })
  dependencies?: TaskDependency[];

  @Field(() => [TaskDependency], { nullable: true })
  dependents?: TaskDependency[];

  @Field(() => [TaskComment], { nullable: true })
  comments?: TaskComment[];

  @Field(() => [TaskAttachment], { nullable: true })
  attachments?: TaskAttachment[];

  @Field(() => [TaskWatcher], { nullable: true })
  watchers?: TaskWatcher[];

  @Field(() => [Post], { nullable: true })
  posts?: Post[];

  // Computed fields (resolved by field resolvers)
  @Field(() => Int)
  subtasksCount?: number;

  @Field(() => Int)
  commentsCount?: number;

  @Field(() => Int)
  attachmentsCount?: number;

  @Field(() => Int)
  watchersCount?: number;

  @Field(() => Boolean)
  isOverdue?: boolean;

  @Field(() => Int, { nullable: true })
  daysRemaining?: number;

  @Field(() => Float, { nullable: true })
  completionPercentage?: number;
}