import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { CreateProjectInput } from './dto/create-project.input';
import { UpdateProjectInput } from './dto/update-project.input';
import { PrismaService } from '../prisma/prisma.service';
import { ProjectStatus, ProjectPhaseEnum } from '@prisma/client';
import { ProjectFiltersInput } from './dto/project-filters.input';
import { Prisma } from '@prisma/client';
import { filter } from 'rxjs';
import { Project} from './entities/project.entity';

@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaService) {}

  async create(createProjectInput: CreateProjectInput, userId: string) {
    // 🔥 FIX 1: Verificar acceso del usuario a la constellation
    const constellation = await this.prisma.constellation.findUnique({
      where: { id: createProjectInput.constellationId },
      include: {
        professionals: {
          where: { professionalId: userId }, // ✅ Verificar que el user sea miembro
        },
      },
    });

    if (!constellation) {
      throw new NotFoundException('Constellation not found'); // ✅ Usar excepciones de NestJS
    }

    if (constellation.professionals.length === 0) {
      throw new ForbiddenException(
        'You do not have access to this constellation',
      ); // ✅ Verificar acceso
    }

    // 🔥 FIX 2: Verificar slug único (no name)
    const existingProject = await this.prisma.project.findUnique({
      where: {
        constellationId_slug: {
          // ✅ Usar el unique constraint correcto
          constellationId: createProjectInput.constellationId,
          slug: createProjectInput.slug,
        },
      },
    });

    if (existingProject) {
      throw new BadRequestException(
        'Project slug already exists in this constellation',
      ); // ✅ Validar slug único
    }

    // 🔥 FIX 3: Crear proyecto con defaults correctos
    const project = await this.prisma.project.create({
      data: {
        ...createProjectInput,
        createdBy: userId,
        phase: ProjectPhaseEnum.PLANNING, // ✅ Usar enum correcto
        status: ProjectStatus.ACTIVE, // ✅ Usar enum correcto
        progressPercentage: 0, // ✅ Campos default del schema
        currentCost: 0,
        incidentCount: 0,
        milestonesTotal: 0,
        milestonesCompleted: 0,
        // createdAt y updatedAt se setean automáticamente por Prisma
      },
      include: {
        // ✅ Incluir relaciones útiles
        constellation: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
    });

    // 🔥 FIX 4: Auto-agregar el creador como admin del proyecto
    await this.prisma.projectMember.create({
      data: {
        projectId: project.id,
        professionalId: userId,
        role: 'PROJECT_MANAGER',
        accessLevel: 'ADMIN',
        isActive: true,
        contributionScore: 0,
        hoursLogged: 0,
        tasksCompleted: 0,
      },
    });

    return project; // ✅ Retornar el proyecto creado
  }

  async findAll(filters: ProjectFiltersInput, userId: string) {
    const where: Prisma.ProjectWhereInput = {
      OR: [
        {
          constellation: {
            professionals: { some: { professionalId: userId } },
          },
        },
        { createdBy: userId },
      ],
    };

    if (filters.constellationId) {
      where.constellationId = filters.constellationId;
    }

    if (filters.search) {
      where.OR = [
        ...(where.OR || []),
        { name: { contains: filters.search, mode: 'insensitive' } },
        { description: { contains: filters.search, mode: 'insensitive' } },
      ];
    }
    if (filters.statuses?.length) {
      where.status = { in: filters.statuses };
    }

    if (filters.phases?.length) {
      where.phase = { in: filters.phases };
    }

    if (filters.types?.length) {
      where.type = { in: filters.types };
    }
    if (filters.categories?.length) {
      where.category = { in: filters.categories };
    }
    if (filters.priorities?.length) {
      where.priority = { in: filters.priorities };
    }

    return await this.prisma.project.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        constellation: {
          select: { id: true, name: true, slug: true },
        },
      },
    });
  }

  async findOne(id: string, userId: string) {
    const project = await this.prisma.project.findUnique({
      where: { id },
      include: {
        constellation: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
        members: {
          where: { isActive: true },
          include: {
            professional: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                avatar: true,
                title: true,
                discipline: true, // ✅ Campo correcto del schema
                createdAt: true,
              },
            },
          },
          take: 10, // ✅ Limitar para performance
        },
        milestones: {
          orderBy: { targetDate: 'asc' },
          take: 5, // ✅ Solo próximos milestones
        },
        projectPhases: {
          orderBy: { order: 'asc' },
        },
        posts: {
          take: 10,
          orderBy: { createdAt: 'desc' },
          include: {
            author: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                avatar: true,
              },
            },
            likes: true,
            comments: { take: 3 },
          },
        },
      },
    });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    // ✅ Verificación de acceso mejorada
    const hasAccess =
      project.createdBy === userId ||
      project.members.some((member) => member.professionalId === userId) ||
      (project.isPublic &&
        (await this.checkConstellationAccess(project.constellationId, userId)));

    if (!hasAccess) {
      throw new ForbiddenException('You do not have access to this project');
    }

    return project;
  }

  private async checkConstellationAccess(
    constellationId: string,
    userId: string,
  ): Promise<boolean> {
    const memberCount = await this.prisma.constellationProfessional.count({
      where: {
        constellationId,
        professionalId: userId,
        status: 'ACTIVE',
      },
    });

    return memberCount > 0;
  }

  async update(id: string, updateData: UpdateProjectInput, userId: string) {
    const project = await this.prisma.project.findUnique({
      where: { id },
      include: {
        members: { where: { professionalId: userId, isActive: true } },
        constellation: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
    });
    if (!project) {
      throw new NotFoundException('Project not found');
    }

    const member = project.members[0];
    const isAdmin = member?.accessLevel === 'ADMIN';
    const isCreator = project.createdBy === userId;

    if (!isAdmin && !isCreator) {
      throw new ForbiddenException(
        'You do not have permission to update this project',
      );
    }

    // ✅ Solo validar slug (único por constellation)
    if (updateData.slug && updateData.slug !== project.slug) {
      const existingProject = await this.prisma.project.findUnique({
        where: {
          constellationId_slug: {
            constellationId: project.constellationId,
            slug: updateData.slug,
          },
        },
      });
      if (existingProject) {
        throw new BadRequestException(
          'Project slug already exists in this constellation',
        );
      }
    }

    const updatedProject = await this.prisma.project.update({
      where: { id },
      data: updateData,
      include: {
        constellation: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
    });

    return updatedProject;
  }

  async remove(id: string, userId: string) {
    const project = await this.prisma.project.findUnique({
      where: { id },
      include: {
        members: { where: { professionalId: userId, isActive: true } },
        constellation: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
    });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    const member = project.members[0];
    const isAdmin = member?.accessLevel === 'ADMIN';
    const isCreator = project.createdBy === userId;

    if (!isAdmin && !isCreator) {
      throw new ForbiddenException(
        'You do not have permission to delete this project',
      );
    }

    // ✅ FIX 1: Await las queries de validación
    const [activeTasks, activeMilestones, totalPosts] = await Promise.all([
      this.prisma.task.count({
        where: {
          projectId: id,
          status: { in: ['TODO', 'IN_PROGRESS', 'BLOCKED'] }, // ✅ Más específico
        },
      }),
      this.prisma.milestone.count({
        where: {
          projectId: id,
          status: { in: ['PENDING', 'IN_PROGRESS'] }, // ✅ Más específico
        },
      }),
      this.prisma.post.count({
        where: {
          projectId: id,
        },
      }),
    ]);

    // ✅ FIX 2: Validaciones de negocio con mensajes útiles
    if (activeTasks > 0) {
      throw new BadRequestException(
        `Cannot delete project with ${activeTasks} active tasks. Complete or cancel them first.`,
      );
    }

    if (activeMilestones > 0) {
      throw new BadRequestException(
        `Cannot delete project with ${activeMilestones} pending milestones. Complete them first.`,
      );
    }

    // ✅ FIX 3: Warning para posts (no bloquea, solo informa)
    if (totalPosts > 0) {
      console.log(
        `⚠️ Deleting project with ${totalPosts} posts. Consider archiving instead.`,
      );
    }

    // ✅ FIX 4: Soft delete con transaction para consistencia
    const result = await this.prisma.$transaction(async (prisma) => {
      // Desactivar miembros del proyecto
      await prisma.projectMember.updateMany({
        where: { projectId: id },
        data: { isActive: false },
      });

      // Marcar project como inactivo
      const updatedProject = await prisma.project.update({
        where: { id },
        data: {
          metadata: {
            ...((project.metadata as any) || {}),
            deletedAt: new Date().toISOString(),
            deletedBy: userId,
            deletionReason: 'User requested deletion',
          },
        },
        select: {
          id: true,
          name: true,
          slug: true,
        },
      });

      return updatedProject;
    });

    // ✅ FIX 5: Response más informativo
    return {
      message: 'Project successfully deleted',
      project: {
        id: result.id,
        name: result.name,
        slug: result.slug,
      },
      stats: {
        postsArchived: totalPosts,
        membersDeactivated: project.members.length,
      },
      // ✅ Información útil para recovery
      recoveryInfo: {
        canRestore: true,
        contactAdmin: 'To restore this project, contact your administrator',
      },
    };
  }

  async getProjectHealth(id: string, userId: string) {
    const project = await this.prisma.project.findUnique({
      where: { id },
      include: {
        members: {
          where: { isActive: true },
          include: {
            professional: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                avatar: true,
                title: true,
                discipline: true,
                createdAt: true,
              },
            },
          },
        },
        milestones: {
          orderBy: { targetDate: 'asc' },
          take: 20,
        },
        tasks: {
          orderBy: { dueDate: 'asc' },
          take: 20,
          where: { status: { in: ['TODO', 'IN_PROGRESS', 'BLOCKED'] } },
        },
        projectPhases: {
          orderBy: { order: 'asc' },
        },
      },
    });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    // Access control
    const hasAccess =
      project.createdBy === userId ||
      project.members.some((member) => member.professionalId === userId);

    if (!hasAccess) {
      throw new ForbiddenException('You do not have access to this project');
    }

    // Parallel queries for performance
    const [
      taskStats,
      milestoneStats,
      totalCost,
      totalHours,
      recentActivity,
      activeRisks,
      overdueTasks,
      overdueMilestones,
    ] = await Promise.all([
      this.prisma.task.groupBy({
        by: ['status'],
        where: { projectId: id },
        _count: true,
      }),
      this.prisma.milestone.groupBy({
        by: ['status'],
        where: { projectId: id },
        _count: true,
      }),
      this.prisma.task.aggregate({
        where: { projectId: id },
        _sum: { actualCost: true },
      }),
      this.prisma.task.aggregate({
        where: { projectId: id },
        _sum: { actualHours: true },
      }),
      this.prisma.post.count({
        where: {
          projectId: id,
          createdAt: { gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
        },
      }),
      this.prisma.riskFactor.count({
        where: {
          projectId: id,
          status: { in: ['IDENTIFIED', 'MONITORING', 'ASSESSED', 'PLANNED'] },
        },
      }),
      this.prisma.task.count({
        where: {
          projectId: id,
          dueDate: { lt: new Date() },
          status: { not: 'COMPLETED' },
        },
      }),
      this.prisma.milestone.count({
        where: {
          projectId: id,
          targetDate: { lt: new Date() },
          status: { not: 'COMPLETED' },
        },
      }),
    ]);

    // Calculate task metrics
    const totalTasks = taskStats.reduce((sum, stat) => sum + stat._count, 0);
    const completedTasks =
      taskStats.find((stat) => stat.status === 'COMPLETED')?._count || 0;
    const taskCompletionRate =
      totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

    // Calculate milestone metrics
    const totalMilestones = milestoneStats.reduce(
      (sum, stat) => sum + stat._count,
      0,
    );
    const completedMilestones =
      milestoneStats.find((stat) => stat.status === 'COMPLETED')?._count || 0;
    const milestoneCompletionRate =
      totalMilestones > 0 ? (completedMilestones / totalMilestones) * 100 : 0;

    // Calculate budget metrics
    const plannedBudget = project.budget ? Number(project.budget) : 0;
    const spentAmount = totalCost._sum.actualCost || 0;
    const budgetUtilization =
      plannedBudget > 0 ? (spentAmount / plannedBudget) * 100 : 0;

    // Calculate health score
    const healthScore = this.calculateHealthScore({
      taskCompletionRate,
      milestoneCompletionRate,
      budgetUtilization,
      recentActivity,
      activeRisks,
      overdueTasks,
      overdueMilestones,
    });

    // Calculate schedule performance
    const schedulePerformance = this.calculateSchedulePerformance(project);

    return {
      project: {
        id: project.id,
        name: project.name,
        phase: project.phase,
        progress: project.progressPercentage,
        status: project.status,
        startDate: project.startDate,
        estimatedEnd: project.estimatedEnd,
        actualEnd: project.actualEnd,
      },
      health: {
        score: healthScore,
        status: this.getHealthStatus(healthScore),
        trend: 'STABLE', // Could be enhanced with historical data
        lastUpdated: new Date(),
      },
      tasks: {
        total: totalTasks,
        completed: completedTasks,
        inProgress:
          taskStats.find((stat) => stat.status === 'IN_PROGRESS')?._count || 0,
        todo: taskStats.find((stat) => stat.status === 'TODO')?._count || 0,
        blocked:
          taskStats.find((stat) => stat.status === 'BLOCKED')?._count || 0,
        overdue: overdueTasks,
        completionRate: Math.round(taskCompletionRate),
        breakdown: taskStats,
      },
      milestones: {
        total: totalMilestones,
        completed: completedMilestones,
        pending:
          milestoneStats.find((stat) => stat.status === 'PENDING')?._count || 0,
        overdue: overdueMilestones,
        completionRate: Math.round(milestoneCompletionRate),
        breakdown: milestoneStats,
      },
      budget: {
        planned: plannedBudget,
        spent: spentAmount,
        remaining: Math.max(plannedBudget - spentAmount, 0),
        utilization: Math.round(budgetUtilization),
        status: this.getBudgetStatus(budgetUtilization),
        variance: spentAmount - plannedBudget,
      },
      schedule: {
        performance: schedulePerformance,
        daysElapsed: this.calculateDaysElapsed(project.startDate),
        estimatedDaysRemaining: this.calculateDaysRemaining(
          project.estimatedEnd,
        ),
        isOnTrack: overdueTasks === 0 && overdueMilestones === 0,
      },
      team: {
        activeMembers: project.members.length,
        totalHours: totalHours._sum.actualHours || 0,
        averageHoursPerMember:
          project.members.length > 0
            ? Math.round(
                (totalHours._sum.actualHours || 0) / project.members.length,
              )
            : 0,
        recentActivity,
        activityLevel: this.getActivityLevel(recentActivity),
      },
      risks: {
        active: activeRisks,
        level: this.getRiskLevel(activeRisks),
        impact: activeRisks > 0 ? 'MEDIUM' : 'LOW',
      },
      quality: {
        score: project.qualityScore || 0,
        incidentCount: project.incidentCount,
        safetyScore: project.safetyScore || 0,
      },
    };
  }

  private calculateHealthScore(metrics: {
    taskCompletionRate: number;
    milestoneCompletionRate: number;
    budgetUtilization: number;
    recentActivity: number;
    activeRisks: number;
    overdueTasks: number;
    overdueMilestones: number;
  }): number {
    const weights = {
      taskCompletion: 0.25,
      milestoneCompletion: 0.25,
      budgetHealth: 0.2,
      scheduleHealth: 0.15,
      activityHealth: 0.1,
      riskHealth: 0.05,
    };

    let score = 0;

    // Task completion (0-100)
    score += metrics.taskCompletionRate * weights.taskCompletion;

    // Milestone completion (0-100)
    score += metrics.milestoneCompletionRate * weights.milestoneCompletion;

    // Budget health (ideal is 80-90% utilization)
    const budgetHealth =
      metrics.budgetUtilization <= 90
        ? 100
        : Math.max(0, 100 - (metrics.budgetUtilization - 90) * 2);
    score += budgetHealth * weights.budgetHealth;

    // Schedule health (penalize overdue items)
    const scheduleHealth = Math.max(
      0,
      100 - (metrics.overdueTasks + metrics.overdueMilestones) * 10,
    );
    score += scheduleHealth * weights.scheduleHealth;

    // Activity health (good activity is 5-20 posts per month)
    const activityHealth =
      metrics.recentActivity >= 5
        ? Math.min(100, (metrics.recentActivity / 20) * 100)
        : (metrics.recentActivity / 5) * 50;
    score += activityHealth * weights.activityHealth;

    // Risk health (fewer risks is better)
    const riskHealth = Math.max(0, 100 - metrics.activeRisks * 15);
    score += riskHealth * weights.riskHealth;

    return Math.round(Math.min(100, Math.max(0, score)));
  }

  private getHealthStatus(score: number): string {
    if (score >= 80) return 'HEALTHY';
    if (score >= 60) return 'AT_RISK';
    return 'CRITICAL';
  }

  private getBudgetStatus(utilization: number): string {
    if (utilization <= 80) return 'ON_TRACK';
    if (utilization <= 100) return 'WARNING';
    return 'OVER_BUDGET';
  }

  private getRiskLevel(riskCount: number): string {
    if (riskCount === 0) return 'LOW';
    if (riskCount <= 3) return 'MEDIUM';
    return 'HIGH';
  }

  private getActivityLevel(activityCount: number): string {
    if (activityCount >= 15) return 'HIGH';
    if (activityCount >= 5) return 'MEDIUM';
    return 'LOW';
  }

  private calculateSchedulePerformance(project: any): number {
    const now = new Date();
    const start = new Date(project.startDate);
    const end = new Date(project.estimatedEnd);

    const totalDuration = end.getTime() - start.getTime();
    const elapsed = now.getTime() - start.getTime();
    const expectedProgress = (elapsed / totalDuration) * 100;

    const actualProgress = project.progressPercentage;
    const performance = actualProgress / Math.max(expectedProgress, 1);

    return Math.round(Math.min(150, Math.max(0, performance * 100)));
  }

  private calculateDaysElapsed(startDate: Date): number {
    const now = new Date();
    const start = new Date(startDate);
    return Math.floor(
      (now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24),
    );
  }

  private calculateDaysRemaining(estimatedEnd: Date): number {
    const now = new Date();
    const end = new Date(estimatedEnd);
    return Math.max(
      0,
      Math.ceil((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)),
    );
  }
  // En ProjectService, agrega estos métodos para los field resolvers:
  async getTeamSize(projectId: string): Promise<number> {
    return this.prisma.projectMember.count({
      where: { projectId, isActive: true },
    });
  }

  async getPostsCount(projectId: string): Promise<number> {
    return this.prisma.post.count({ where: { projectId } });
  }

  async getTasksCount(projectId: string): Promise<number> {
    return this.prisma.task.count({ where: { projectId } });
  }

  async getCompletedTasksCount(projectId: string): Promise<number> {
    return this.prisma.task.count({
      where: { projectId, status: 'COMPLETED' },
    });
  }

  async getActiveRisksCount(projectId: string): Promise<number> {
    return this.prisma.riskFactor.count({
      where: {
        projectId,
        status: { in: ['IDENTIFIED', 'MONITORING'] },
      },
    });
  }

  

  async findBySlug(constellationId: string, slug: string, userId: string) {
    return this.prisma.project.findUnique({
      where: { constellationId_slug: { constellationId, slug } },
      include: {
        constellation: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
        members: {
          where: { isActive: true },
          include: {
            professional: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                displayName: true,
                avatar: true,
                discipline: true,
              },
            },
          },
          take: 10,
        },
        milestones: {
          orderBy: { targetDate: 'asc' },
          take: 5,
        },
        projectPhases: {
          orderBy: { order: 'asc' },
        },
      },
    });
  }

  // En ProjectService, crear un método:
private transformProject(project: any): Project {
  return {
    ...project,
    description: project.description ?? undefined,
    endDate: project.endDate ?? undefined,
    actualEnd: project.actualEnd ?? undefined,
    budget: project.budget ? Number(project.budget) : undefined,
    // Transformar otros campos null
  } as Project;
}

}