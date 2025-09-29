// apps/api/src/modules/task/entities/task-attachment.entity.ts
import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { Task } from './task.entity';
import { Professional } from '../../professional/entities/professional.entity';


@ObjectType()
export class TaskAttachment {
  @Field(() => ID)
  id: string;

  @Field()
  fileName: string;

  @Field()
  fileUrl: string;

  @Field()
  fileType: string;

  @Field()
  mimeType: string;

  @Field(() => Int)
  fileSize: number;

  @Field({ nullable: true })
  description?: string;

  @Field(() => ID)
  taskId: string;

  @Field(() => ID)
  uploadedBy: string;

  @Field()
  uploadedAt: Date;

  // Relations
  @Field(() => Task, { nullable: true })
  task?: Task;

  @Field(() => Professional, { nullable: true })
  uploader?: Professional;
}