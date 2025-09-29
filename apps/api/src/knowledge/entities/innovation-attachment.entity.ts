// apps/api/src/modules/knowledge/entities/innovation-attachment.entity.ts
import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { Innovation } from './innovation.entity';
import { Professional } from '../../professional/entities/professional.entity';


@ObjectType()
export class InnovationAttachment {
  @Field(() => ID)
  id: string;

  @Field()
  fileName: string;

  @Field()
  fileUrl: string;

  @Field()
  fileType: string;

  @Field(() => Int)
  fileSize: number;

  @Field({ nullable: true })
  description?: string;

  @Field(() => ID)
  innovationId: string;

  @Field(() => ID)
  uploadedBy: string;

  @Field()
  uploadedAt: Date;

  // Relations
  @Field(() => Innovation, { nullable: true })
  innovation?: Innovation;

  @Field(() => Professional, { nullable: true })
  uploader?: Professional;
}