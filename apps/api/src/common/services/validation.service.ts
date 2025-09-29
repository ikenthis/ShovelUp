import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import {
  AccessLevel,
  ProjectRole,
  MembershipStatus,
  ConstellationRole,
} from '../enums';
import { Cons } from 'rxjs';

export interface AccesInfo {
  hasAccess: boolean;
  accessLevel?: AccessLevel;
  role?: ProjectRole | ConstellationRole;
  reason: string;
  organizationId?: string;
  constellationId?: string;
}

export interface ValidationOptions {
  includeInactive?: boolean; // Whether to include inactive users in the validation
  checkClientVisible?: boolean; // Whether to check if the user is a client and if the resource is client-visible
  requireRole?: ProjectRole[]; // Whether to require the resource to be client-visible for client users
  requiereAccessLevel?: AccessLevel; // Whether to require the resource to be client-visible for client users
}

@Injectable()
export class ValidationService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Validate if project exists and return with relations
   */

  async validateProjectExists(projectId: string): Promise<any> {
    const project = await this.prisma.project.findUnique({
      where: { id: projectId },
      include: {
        constellation: true,
        members: {
          include: {
            professional: true,
          },
        },
        organizations: {
          include: {
            organization: true,
          },
        },
      },
    });
    if (!project) {
      throw new NotFoundException(`Project with ID ${projectId} not found`);
    }
    return project;
  }

  /**
   * Validate user access to project with detailed info
   */

  async validateUserProjectAccess(
    projectId: string,
    userId: string,
    options: ValidationOptions = {},
  ): Promise<AccessInfo> {
    const project = await this.validateProjectExists(projectId);

    // Check 1: Direct project membership
    const projectMember = project.members.find(
      (member) =>
        member.professionalId === userId &&
        (options.includeInactive || member.isActive),
    );

    if (projectMember) {
      // Check if specific role is required
      if (
        options.requireRole &&
        !options.requireRole.includes(projectMember.role)
      ) {
        return {
          hasAccess: false,
          accessLevel: projectMember.accessLevel,
          role: projectMember.role,
          reason: `Required role not met. Has: ${projectMember.role}, Required: ${options.requireRole.join(', ')}`,
        };
      }

      // Check if specific access level is required
      if (
        options.requireAccessLevel &&
        !this.hasRequiredAccessLevel(
          projectMember.accessLevel,
          options.requireAccessLevel,
        )
      ) {
        return {
          hasAccess: false,
          accessLevel: projectMember.accessLevel,
          role: projectMember.role,
          reason: `Insufficient access level. Has: ${projectMember.accessLevel}, Required: ${options.requireAccessLevel}`,
        };
      }

      return {
        hasAccess: true,
        accessLevel: projectMember.accessLevel,
        role: projectMember.role,
        reason: 'Direct project member',
      };
    }

    if (
      options.requiereAccessLevel &&
      !this.hasRequiredAccessLevel(
        projectMember.accessLevel,
        options.requiereAccessLevel,
      )
    ) {
      return {
        hasAcessLevel: false,
        accessLevel: projectMember.accessLevel,
        role: projectMember.role,
        reason: `Insufficient access level. Has: ${projectMember.accessLevel}, Required: ${options.requiereAccessLevel}`,
      };
    }

    //Organization Membership
    const userProfessional = await this.prisma.professional.findUnique({
        where : { id: userId },
        include : { organization : true },

    });

    if (userProfessional?.organizationId) {
        const
  }
}
