import { ObjectType, Field, ID } from '@nestjs/graphql';
import {Post} from '../../post/entities/post.entity';
import { Professional } from '../../professional/entities/professional.entity';
import { Project } from '../../project/entities/project.entity';
import { Task } from '../../task/entities/task.entity';
import { Prisma } from '@prisma/client';
import { de } from '@faker-js/faker';

@ObjectType()
export class Tag {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field()
  slug: string;

  @Field({ nullable: true })
  description?: string;

    @Field({ nullable: true })
  color?: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => Number, { defaultValue: 0 })
  usageCount: number; 

  @Field(() => Boolean, { defaultValue: true })
  isActive: boolean;

  @Field(() => [Post], { nullable: true })
  posts?: Post[];

  @Field(() => [Project], { nullable: true })
  projects?: Project[];

  @Field(() => [Task], { nullable: true })
  tasks?: Task[];

}
