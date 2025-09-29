// apps/api/src/modules/knowledge/entities/innovation.entity.ts
import { ObjectType, Field, ID, Float, Int } from '@nestjs/graphql';
import { 
  InnovationCategory,
  InnovationType,
  MaturityLevel,
  IPStatus,
  TestingStatus,
  VisibilityLevel,
  SharingLevel
} from '../../common/enums';
import { Project } from '../../project/entities/project.entity';
import { Professional } from '../../professional/entities/professional.entity';
import { Post } from '../../post/entities/post.entity';
import { InnovationAdoption } from './innovation-adoption.entity';
import { InnovationCollaborator } from './innovation-collaborator.entity';
import { InnovationAttachment } from './innovation-attachment.entity';

@ObjectType()
export class Innovation {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field(() => InnovationCategory)
  category: InnovationCategory;

  @Field(() => InnovationType)
  type: InnovationType;

  @Field(() => MaturityLevel)
  maturityLevel: MaturityLevel;

  @Field({ nullable: true })
  problemSolved?: string;

  @Field({ nullable: true })
  solution?: string;

  @Field({ nullable: true })
  benefits?: string;

  @Field({ nullable: true })
  requirements?: string;

  @Field({ nullable: true })
  limitations?: string;

  @Field(() => Float)
  adoptionRate: number;

  @Field(() => Float, { nullable: true })
  successRate?: number;

  @Field(() => Float, { nullable: true })
  costImpact?: number;

  @Field(() => Float, { nullable: true })
  timeImpact?: number;

  @Field({ nullable: true })
  qualityImpact?: string;

  @Field({ nullable: true })
  safetyImpact?: string;

  @Field(() => Boolean)
  isPatentable: boolean;

  @Field(() => Boolean)
  isOpenSource: boolean;

  @Field({ nullable: true })
  licenseType?: string;

  @Field(() => IPStatus)
  ipStatus: IPStatus;

  @Field(() => TestingStatus)
  testingStatus: TestingStatus;

  @Field(() => String, { nullable: true })
  testResults?: any;

  @Field(() => String, { nullable: true })
  validationData?: any;

  @Field(() => VisibilityLevel)
  visibility: VisibilityLevel;

  @Field(() => SharingLevel)
  sharingLevel: SharingLevel;

  @Field(() => [String])
  tags: string[];

  @Field(() => [String])
  keywords: string[];

  @Field(() => ID)
  originProjectId: string;

  @Field(() => ID)
  innovatorId: string;

  @Field(() => ID, { nullable: true })
  postId?: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  // Relations
  @Field(() => Project, { nullable: true })
  originProject?: Project;

  @Field(() => Professional, { nullable: true })
  innovator?: Professional;

  @Field(() => Post, { nullable: true })
  post?: Post;

  @Field(() => [InnovationAdoption], { nullable: true })
  adoptions?: InnovationAdoption[];

  @Field(() => [InnovationCollaborator], { nullable: true })
  collaborators?: InnovationCollaborator[];

  @Field(() => [InnovationAttachment], { nullable: true })
  attachments?: InnovationAttachment[];
}