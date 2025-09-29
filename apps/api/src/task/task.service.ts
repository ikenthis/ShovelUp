import { Injectable, Logger, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Task } from './entities/task.entity';
import { TaskDependency } from './entities/task-dependency.entity';
import { TaskWatcher } from './entities/task-watcher.entity';
import { TaskAttachment } from './entities/task-attachment.entity';
import { TaskComment } from './entities/task-comment.entity';
import { CreateTaskInput} from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';
import { TaskFiltersInput } from './dto/task-filter.input';
import { WatchLevel } from '../common/enums/index';
import { TaskStatus, TaskPriority } from '../common/enums/index';

@Injectable()
export class TaskService {
  private readonly logger = new Logger(TaskService.name);G

  constructor(private readonly prisma: PrismaService) {}

  async create(input: CreateTaskInput, professionalId: string, userId: string): Promise<Task> {
    this.logger.log(`Creating a new task with title: ${input.title} by user: ${userId}`);

    // Step 1: Validate project exists and user has access
    const project = await this.validateProjectAccess(input.projectId, userId);

    // Step 2: Validate phase belongs to project (if provided)
    if (input.phaseId) {
      await this.validatePhaseInProject(input.phaseId, input.projectId);
    }

    // Step 3: Validate assignee has access to project (if provided)
    if (input.assigneeId) {
      await this.validateAssigneeAccess(input.assigneeId, input.projectId);
    }

    // Step 4: Validate parent task belongs to same project (if provided)
    if (input.parentTaskId) {
      await this.validateParentTask(input.parentTaskId, input.projectId);
    }

    // Step 5: Create the task
    const task = await this.prisma.task.create({
      data: {
        title: input.title,
        description: input.description,
        priority: input.priority || TaskPriority.MEDIUM,
        startDate: input.startDate ? new Date(input.startDate) : null,
        dueDate: input.dueDate ? new Date(input.dueDate) : null,
        estimatedHours: input.estimatedHours,
        estimatedCost: input.estimatedCost,
        tags: input.tags || [],
        requiresApproval: input.requiresApproval || false,
        isClientVisible: input.isClientVisible || false,
        projectId: input.projectId,
        phaseId: input.phaseId,
        assigneeId: input.assigneeId,
        parentTaskId: input.parentTaskId,
        createdById: userId,
        // Default values
        status: TaskStatus.TODO,
        progress: 0,
        actualHours: 0,
        actualCost: 0,
        isBlocked: false,
      },
      include: {
        project: true,
        assignee: true,
        createdBy: true,
        phase: true,
        parentTask: true
      }
    });

    // Step 6: Create task watcher for creator
    await this.prisma.taskWatcher.create({
      data: {
        taskId: task.id,
        professionalId: userId,
        watchLevel: WatchLevel.ALL_UPDATES
      }
    });

    // Step 7: Create task watcher for assignee (if different from creator)
    if (input.assigneeId && input.assigneeId !== userId) {
      await this.prisma.taskWatcher.create({
        data: {
          taskId: task.id,
          professionalId: input.assigneeId,
          watchLevel: WatchLevel.ALL_UPDATES
        }
      });
    }

    this.logger.log(`Task created successfully with ID: ${task.id}`);
    return task as Task;
  }

  // =====================================
  // VALIDATION HELPER METHODS
  // =====================================

  private async validateProjectAccess(projectId: string, userId: string): Promise<any> {
    const project = await this.prisma.project.findUnique({
      where: { id: projectId },
      include: {
        members: {
          include: {
            professional: true
          }
        },
        organizations: {
          include: {
            organization: true
          }
        },
        constellation: true
      }
    });

    if (!project) {
      this.logger.warn(`Project with ID ${projectId} not found`);
      throw new NotFoundException(`Project with ID ${projectId} not found`);
    }

    // Check if user is a direct project member
    const isProjectMember = project.members.some(
      member => member.professionalId === userId && member.isActive
    );

    if (isProjectMember) {
      this.logger.log(`User ${userId} has direct access to project ${projectId}`);
      return project;
    }

    // Check if user belongs to an organization that's part of the project
    const userProfessional = await this.prisma.professional.findUnique({
      where: { id: userId },
      include: { organization: true }
    });

    if (userProfessional?.organizationId) {
      const orgInProject = project.organizations.some(
        projectOrg => projectOrg.organizationId === userProfessional.organizationId
      );

      if (orgInProject) {
        this.logger.log(`User ${userId} has organization access to project ${projectId}`);
        return project;
      }
    }

    // If no access found, throw forbidden exception
    this.logger.warn(`User ${userId} does not have access to project ${projectId}`);
    throw new ForbiddenException(`You do not have access to this project`);
  }

  private async validatePhaseInProject(phaseId: string, projectId: string): Promise<void> {
    const phase = await this.prisma.projectPhase.findUnique({
      where: { id: phaseId }
    });

    if (!phase) {
      throw new NotFoundException(`Phase with ID ${phaseId} not found`);
    }

    if (phase.projectId !== projectId) {
      throw new BadRequestException(
        `Phase ${phaseId} does not belong to project ${projectId}`
      );
    }
  }

  private async validateAssigneeAccess(assigneeId: string, projectId: string): Promise<void> {
    const assignee = await this.prisma.professional.findUnique({
      where: { id: assigneeId }
    });

    if (!assignee) {
      throw new NotFoundException(`Professional with ID ${assigneeId} not found`);
    }

    // Check if assignee has access to the project
    try {
      await this.validateProjectAccess(projectId, assigneeId);
    } catch (error) {
      throw new ForbiddenException(
        `Assignee ${assigneeId} does not have access to project ${projectId}`
      );
    }
  }

  private async validateParentTask(parentTaskId: string, projectId: string): Promise<void> {
    const parentTask = await this.prisma.task.findUnique({
      where: { id: parentTaskId }
    });

    if (!parentTask) {
      throw new NotFoundException(`Parent task with ID ${parentTaskId} not found`);
    }

    if (parentTask.projectId !== projectId) {
      throw new BadRequestException(
        `Parent task ${parentTaskId} does not belong to project ${projectId}`
      );
    }
  }

  // =====================================
  // OTHER CRUD METHODS (PLACEHOLDER)
  // =====================================

  async findOne(id: string, userId?: string): Promise<Task> {
    this.logger.log(`Finding task: ${id}`);
    
    const task = await this.prisma.task.findUnique({
      where: { id },
      include: {
        project: true,
        assignee: true,
        createdBy: true,
        phase: true,
        parentTask: true,
        subtasks: true
      }
    });

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    // Validate user has access to the project
    if (userId) {
      await this.validateProjectAccess(task.projectId, userId);
    }

    return task as Task;
  }

  async findMany(
    projectId: string, 
    filters?: TaskFiltersInput,
    userId?: string
  ): Promise<Task[]> {
    this.logger.log(`Finding tasks for project: ${projectId}`);
    
    // Validate project access first
    if (userId) {
      await this.validateProjectAccess(projectId, userId);
    }

    const whereClause: any = {
      projectId
    };

    // Apply filters if provided
    if (filters) {
      if (filters.phaseId) {
        whereClause.phaseId = filters.phaseId;
      }
      // Add more filter conditions as needed
    }

    const tasks = await this.prisma.task.findMany({
      where: whereClause,
      include: {
        assignee: true,
        createdBy: true,
        phase: true,
        subtasks: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    return tasks as Task[];
  }

  async update(input: UpdateTaskInput, userId: string): Promise<Task> {
    this.logger.log(`Updating task: ${input.id}`);
    
    // Find existing task and validate access
    const existingTask = await this.findOne(input.id, userId);
    
    // Validate new project if it's being changed
    if (input.projectId && input.projectId !== existingTask.projectId) {
      await this.validateProjectAccess(input.projectId, userId);
    }

    // Validate new phase if it's being changed
    if (input.phaseId) {
      await this.validatePhaseInProject(
        input.phaseId, 
        input.projectId || existingTask.projectId
      );
    }

    // Validate new assignee if it's being changed
    if (input.assigneeId) {
      await this.validateAssigneeAccess(
        input.assigneeId, 
        input.projectId || existingTask.projectId
      );
    }

    // Validate new parent task if it's being changed
    if (input.parentTaskId) {
      await this.validateParentTask(
        input.parentTaskId, 
        input.projectId || existingTask.projectId
      );
    }

    const updatedTask = await this.prisma.task.update({
      where: { id: input.id },
      data: {
        title: input.title,
        description: input.description,
        status: input.status,
        priority: input.priority,
        startDate: input.startDate ? new Date(input.startDate) : undefined,
        dueDate: input.dueDate ? new Date(input.dueDate) : undefined,
        completedAt: input.completedAt ? new Date(input.completedAt) : undefined,
        estimatedHours: input.estimatedHours,
        actualHours: input.actualHours,
        estimatedCost: input.estimatedCost,
        actualCost: input.actualCost,
        progress: input.progress,
        tags: input.tags,
        isBlocked: input.isBlocked,
        blockedReason: input.blockedReason,
        blockedSince: input.blockedSince ? new Date(input.blockedSince) : undefined,
        requiresApproval: input.requiresApproval,
        isClientVisible: input.isClientVisible,
        phaseId: input.phaseId,
        assigneeId: input.assigneeId,
        parentTaskId: input.parentTaskId,
        updatedAt: new Date()
      },
      include: {
        project: true,
        assignee: true,
        createdBy: true,
        phase: true,
        parentTask: true
      }
    });
    
    return updatedTask as Task;
  }

  async delete(id: string, userId: string): Promise<boolean> {
    this.logger.log(`Deleting task: ${id}`);
    
    const task = await this.findOne(id, userId);
    
    // Check if user can delete this task (creator or project admin)
    if (task.createdById !== userId) {
      // TODO: Add more sophisticated permission checking here
      // For now, only creator can delete
      throw new ForbiddenException('You can only delete tasks you created');
    }

    await this.prisma.task.delete({
      where: { id }
    });
    
    return true;
  }
}