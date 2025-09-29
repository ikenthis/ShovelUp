// apps/api/src/project/project.module.ts
import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectResolver } from './project.resolver';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [
    ProjectResolver,
    ProjectService,
    PrismaService,
  ],
  exports: [
    ProjectService, // Export for use in other modules
  ],
})
export class ProjectModule {}