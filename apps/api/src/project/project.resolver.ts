import {
  Resolver,
  Query,
  Mutation,
  Args,
  ID,
  Context,
  ResolveField,
  Parent,
  Float,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { ProjectService } from './project.service';
import { Project } from './entities/project.entity';
import { CreateProjectInput } from './dto/create-project.input';
import { UpdateProjectInput } from './dto/update-project.input';
import { ProjectFiltersInput } from './dto/project-filters.input';
import { ProjectHealthDashboard } from './entities/project-health.entity';
import { Professional } from '../professional/entities/professional.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth/jwt-auth.guard';
import { CurrentUser } from '../auth/decorator/current-user.decorator';

@Resolver(() => Project)
@UseGuards(JwtAuthGuard)
export class ProjectResolver {
  constructor(private readonly projectService: ProjectService) {}

  // Helper method to transform Prisma data to GraphQL types
  private transformProject(project: any): Project {
    return {
      ...project,
      description: project.description ?? undefined,
      endDate: project.endDate ?? undefined,
      actualEnd: project.actualEnd ?? undefined,
      budget: project.budget ? Number(project.budget) : undefined,
      qualityScore: project.qualityScore ?? undefined,
      safetyScore: project.safetyScore ?? undefined,
      metadata: project.metadata ?? undefined,
      settings: project.settings ?? undefined,
    } as Project;
  }

  // MUTATIONS
  @Mutation(() => Project, { description: 'Create a new project' })
  async createProject(
    @Args('input') createProjectInput: CreateProjectInput,
    @CurrentUser('id') userId: string,
  ): Promise<Project> {
    const project = await this.projectService.create(
      createProjectInput,
      userId,
    );
    return this.transformProject(project);
  }

  @Mutation(() => Project, { description: 'Update an existing project' })
  async updateProject(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') updateProjectInput: UpdateProjectInput,
    @CurrentUser('id') userId: string,
  ): Promise<Project> {
    const project = await this.projectService.update(
      id,
      updateProjectInput,
      userId,
    );
    return this.transformProject(project);
  }

  @Mutation(() => Boolean, { description: 'Soft delete a project' })
  async removeProject(
    @Args('id', { type: () => ID }) id: string,
    @CurrentUser('id') userId = '',
  ): Promise<any> {
    return this.projectService.remove(id, userId);
  }

  // QUERIES
  @Query(() => [Project], {
    description: 'Get all projects with optional filters',
  })
  async projects(
    @CurrentUser() user: Professional, // Objeto completo
    @Args('filters', { nullable: true }) filters?: ProjectFiltersInput,
  ): Promise<Project[]> {
    const projects = await this.projectService.findAll(filters || {}, user.id);
    return projects.map((project) => this.transformProject(project));
  }

  @Query(() => Project, { description: 'Get a single project by ID' })
  async project(
    @Args('id', { type: () => ID }) id: string,
    @CurrentUser('id') userId: string,
  ): Promise<Project> {
    const project = await this.projectService.findOne(id, userId);
    return this.transformProject(project);
  }

  @Query(() => Project, {
    nullable: true,
    description: 'Get project by constellation and slug',
  })
  async projectBySlug(
    @Args('constellationId') constellationId: string,
    @Args('slug') slug: string,
    @CurrentUser('id') userId: string,
  ): Promise<Project | null> {
    const project = await this.projectService.findBySlug(
      constellationId,
      slug,
      userId,
    );
    return project ? this.transformProject(project) : null;
  }

  @Query(() => ProjectHealthDashboard, {
    description: 'Get project health analytics',
  })
  async projectHealth(
    @Args('id', { type: () => ID }) id: string,
    @CurrentUser('id') userId: string,
  ): Promise<any> {
    return this.projectService.getProjectHealth(id, userId);
  }

  // FIELD RESOLVERS for computed/related data
  @ResolveField(() => Number, {
    description: 'Total number of active team members',
  })
  async teamSize(@Parent() project: Project): Promise<number> {
    if (project.members) {
      return project.members.filter((member) => member.isActive).length;
    }
    // If not included, query directly
    return this.projectService.getTeamSize(project.id);
  }

  @ResolveField(() => Number, {
    description: 'Total number of posts in project',
  })
  async postsCount(@Parent() project: Project): Promise<number> {
    return this.projectService.getPostsCount(project.id);
  }

  @ResolveField(() => Number, {
    description: 'Total number of tasks in project',
  })
  async tasksCount(@Parent() project: Project): Promise<number> {
    return this.projectService.getTasksCount(project.id);
  }

  @ResolveField(() => Number, { description: 'Number of completed tasks' })
  async completedTasksCount(@Parent() project: Project): Promise<number> {
    return this.projectService.getCompletedTasksCount(project.id);
  }

  @ResolveField(() => Number, { description: 'Number of active risks' })
  async activeRisksCount(@Parent() project: Project): Promise<number> {
    return this.projectService.getActiveRisksCount(project.id);
  }

  @ResolveField(() => Boolean, { description: 'Whether project is overdue' })
  async isOverdue(@Parent() project: Project): Promise<boolean> {
    const now = new Date();
    return project.estimatedEnd < now && !project.actualEnd;
  }

  @ResolveField(() => Number, {
    nullable: true,
    description: 'Days remaining until estimated completion',
  })
  async daysRemaining(@Parent() project: Project): Promise<number | null> {
    if (project.actualEnd) return null; // Already completed

    const now = new Date();
    const end = new Date(project.estimatedEnd);
    const diffTime = end.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays;
  }

  @ResolveField(() => String, { description: 'Overall project health status' })
  async healthStatus(@Parent() project: Project): Promise<string> {
    // Simple health calculation based on progress and timeline
    const now = new Date();
    const start = new Date(project.startDate);
    const end = new Date(project.estimatedEnd);

    const totalDuration = end.getTime() - start.getTime();
    const elapsed = now.getTime() - start.getTime();
    const expectedProgress = (elapsed / totalDuration) * 100;

    const progressDiff = project.progressPercentage - expectedProgress;

    if (progressDiff >= 10) return 'AHEAD';
    if (progressDiff >= -10) return 'ON_TRACK';
    if (progressDiff >= -25) return 'AT_RISK';
    return 'BEHIND';
  }

  @ResolveField(() => Float, { description: 'Budget utilization percentage' })
  async budgetUtilization(@Parent() project: Project): Promise<number> {
    if (!project.budget || project.budget === 0) return 0;
    return (project.currentCost / Number(project.budget)) * 100;
  }
}