import { Module } from '@nestjs/common';
import { ProjectPhaseService } from './project-phase.service';
import { ProjectPhaseResolver } from './project-phase.resolver';

@Module({
  providers: [ProjectPhaseResolver, ProjectPhaseService],
})
export class ProjectPhaseModule {}
