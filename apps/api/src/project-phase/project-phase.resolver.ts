import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ProjectPhaseService } from './project-phase.service';
import { ProjectPhase } from './entities/project-phase.entity';
import { CreateProjectPhaseInput } from './dto/create-project-phase.input';
import { UpdateProjectPhaseInput } from './dto/update-project-phase.input';

@Resolver(() => ProjectPhase)
export class ProjectPhaseResolver {
  constructor(private readonly projectPhaseService: ProjectPhaseService) {}
}
