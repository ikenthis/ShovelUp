// apps/api/src/organization/organization.service.ts
import { Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrganizationInput } from './dto/create-organization.input';
import { UpdateOrganizationInput } from './dto/update-organization.input';
import { OrganizationFilterInput } from './dto/organization-filter.input';
import { OrganizationPaginationInput } from './dto/pagination.input';

@Injectable()
export class OrganizationService {
  constructor(private prisma: PrismaService) {}

  // Core CRUD Operations
  async create(createOrganizationInput: CreateOrganizationInput) {
    try {
      // Check if slug already exists
      const existingSlug = await this.prisma.organization.findUnique({
        where: { slug: createOrganizationInput.slug },
      });

      if (existingSlug) {
        throw new ConflictException(`Organization with slug "${createOrganizationInput.slug}" already exists`);
      }

      // Check if name already exists (case insensitive)
      const existingName = await this.prisma.organization.findFirst({
        where: { 
          name: {
            equals: createOrganizationInput.name,
            mode: 'insensitive'
          }
        },
      });

      if (existingName) {
        throw new ConflictException(`Organization with name "${createOrganizationInput.name}" already exists`);
      }

      return await this.prisma.organization.create({
        data: {
          ...createOrganizationInput,
          // Set default values for required fields from schema
          reputationScore: 0,
          projectsCompleted: 0,
          projectsActive: 0,
          isVerified: false,
          isActive: true,
        },
        include: {
          _count: {
            select: {
              professionals: true,
              projects: true,
              constellations: true,
              collaborations: true,
              collaboratedWith: true,
            },
          },
        },
      });
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new BadRequestException(`Failed to create organization: ${error.message}`);
    }
  }

  async findAll(
    filter?: OrganizationFilterInput,
    pagination?: OrganizationPaginationInput
  ) {
    const { page = 1, limit = 20, sortBy = 'name', sortOrder = 'asc' } = pagination || {};
    const skip = (page - 1) * limit;

    // Build where clause from filters
    const where: any = { isActive: true };

    if (filter) {
      if (filter.types?.length) {
        where.type = { in: filter.types };
      }
      
      if (filter.sizes?.length) {
        where.size = { in: filter.sizes };
      }
      
      if (filter.industries?.length) {
        where.industry = { in: filter.industries };
      }
      
      if (filter.search) {
        where.OR = [
          { name: { contains: filter.search, mode: 'insensitive' } },
          { description: { contains: filter.search, mode: 'insensitive' } },
          { specialties: { hasSome: [filter.search] } },
        ];
      }
      
      if (filter.isVerified !== undefined) {
        where.isVerified = filter.isVerified;
      }
      
      if (filter.minRating !== undefined) {
        where.averageRating = { gte: filter.minRating };
      }
      
      if (filter.minEmployeeCount !== undefined || filter.maxEmployeeCount !== undefined) {
        where.employeeCount = {};
        if (filter.minEmployeeCount !== undefined) {
          where.employeeCount.gte = filter.minEmployeeCount;
        }
        if (filter.maxEmployeeCount !== undefined) {
          where.employeeCount.lte = filter.maxEmployeeCount;
        }
      }
    }

    const [organizations, total] = await Promise.all([
      this.prisma.organization.findMany({
        where,
        include: {
          _count: {
            select: {
              professionals: true,
              projects: true,
              constellations: true,
              collaborations: true,
              collaboratedWith: true,
            },
          },
        },
        orderBy: {
          [sortBy]: sortOrder,
        },
        skip,
        take: limit,
      }),
      this.prisma.organization.count({ where }),
    ]);

    return {
      data: organizations,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNextPage: page < Math.ceil(total / limit),
        hasPreviousPage: page > 1,
      },
    };
  }

  async findOne(id: string) {
    const organization = await this.prisma.organization.findUnique({
      where: { id },
      include: {
        professionals: {
          take: 10,
          select: {
            id: true,
            firstName: true,
            lastName: true,
            title: true,
            avatar: true,
            discipline: true,
            isActive: true,
          },
        },
        projects: {
          take: 10,
          select: {
            id: true,
            project: {
              select: {
                id: true,
                name: true,
                status: true,
                phase: true,
                type: true,
              },
            },
            role: true,
            contractStatus: true,
          },
        },
        constellations: {
          take: 5,
          select: {
            id: true,
            constellation: {
              select: {
                id: true,
                name: true,
                isActive: true,
              },
            },
            role: true,
            status: true,
          },
        },
        _count: {
          select: {
            professionals: true,
            projects: true,
            constellations: true,
            collaborations: true,
            collaboratedWith: true,
            posts: true,
          },
        },
      },
    });

    if (!organization) {
      throw new NotFoundException(`Organization with ID ${id} not found`);
    }

    return organization;
  }

  async findBySlug(slug: string) {
    const organization = await this.prisma.organization.findUnique({
      where: { slug },
      include: {
        _count: {
          select: {
            professionals: true,
            projects: true,
            constellations: true,
            collaborations: true,
            collaboratedWith: true,
          },
        },
      },
    });

    if (!organization) {
      throw new NotFoundException(`Organization with slug "${slug}" not found`);
    }

    return organization;
  }

  async update(id: string, updateOrganizationInput: UpdateOrganizationInput) {
    const organization = await this.prisma.organization.findUnique({ 
      where: { id } 
    });
    
    if (!organization) {
      throw new NotFoundException(`Organization with ID ${id} not found`);
    }

    // If updating slug, check if it's unique
    if (updateOrganizationInput.slug && updateOrganizationInput.slug !== organization.slug) {
      const existingSlug = await this.prisma.organization.findUnique({
        where: { slug: updateOrganizationInput.slug },
      });

      if (existingSlug) {
        throw new ConflictException(`Organization with slug "${updateOrganizationInput.slug}" already exists`);
      }
    }

    // If updating name, check if it's unique
    if (updateOrganizationInput.name && updateOrganizationInput.name !== organization.name) {
      const existingName = await this.prisma.organization.findFirst({
        where: { 
          name: {
            equals: updateOrganizationInput.name,
            mode: 'insensitive'
          },
          id: { not: id }
        },
      });

      if (existingName) {
        throw new ConflictException(`Organization with name "${updateOrganizationInput.name}" already exists`);
      }
    }

    const { id: inputId, ...updateData } = updateOrganizationInput;

    return await this.prisma.organization.update({
      where: { id },
      data: updateData,
      include: {
        _count: {
          select: {
            professionals: true,
            projects: true,
            constellations: true,
            collaborations: true,
            collaboratedWith: true,
          },
        },
      },
    });
  }

  async remove(id: string) {
    const organization = await this.prisma.organization.findUnique({ 
      where: { id },
      include: {
        _count: {
          select: {
            professionals: true,
            projects: true,
          },
        },
      },
    });
    
    if (!organization) {
      throw new NotFoundException(`Organization with ID ${id} not found`);
    }

    // Check if organization has active professionals or projects
    if (organization._count.professionals > 0 || organization._count.projects > 0) {
      // Soft delete by setting isActive to false
      return await this.prisma.organization.update({
        where: { id },
        data: { isActive: false },
      });
    }

    // Hard delete if no active relationships
    return await this.prisma.organization.delete({
      where: { id },
    });
  }

  // Computed Field Services
  async getMembersCount(organizationId: string): Promise<number> {
    return await this.prisma.professional.count({
      where: { 
        organizationId,
        isActive: true,
      },
    });
  }

  async getProjectsCount(organizationId: string): Promise<number> {
    return await this.prisma.projectOrganization.count({
      where: { organizationId },
    });
  }

  async getConstellationsCount(organizationId: string): Promise<number> {
    return await this.prisma.constellationOrganization.count({
      where: { 
        organizationId,
        status: 'ACTIVE',
      },
    });
  }

  async getCollaborationsCount(organizationId: string): Promise<number> {
    const [collaborationsA, collaborationsB] = await Promise.all([
      this.prisma.organizationCollaboration.count({
        where: { 
          orgAId: organizationId,
          status: 'ACTIVE',
        },
      }),
      this.prisma.organizationCollaboration.count({
        where: { 
          orgBId: organizationId,
          status: 'ACTIVE',
        },
      }),
    ]);

    return collaborationsA + collaborationsB;
  }

  // Business Logic Methods
  async updateReputationScore(organizationId: string) {
    const organization = await this.prisma.organization.findUnique({
      where: { id: organizationId },
      include: {
        projects: {
          select: {
            project: {
              select: {
                qualityScore: true,
                safetyScore: true,
              },
            },
          },
        },
        _count: {
          select: {
            projects: true,
          },
        },
      },
    });

    if (!organization || organization._count.projects === 0) return;

    // Calculate reputation based on project performance
    const projects = organization.projects.map(p => p.project);
    const qualityScores = projects
      .filter(p => p.qualityScore !== null && p.qualityScore !== undefined)
      .map(p => p.qualityScore as number);
    const safetyScores = projects
      .filter(p => p.safetyScore !== null && p.safetyScore !== undefined)
      .map(p => p.safetyScore as number);


    const avgQuality = qualityScores.length > 0 
      ? qualityScores.reduce((sum, score) => sum + score, 0) / qualityScores.length 
      : 0;

    const avgSafety = safetyScores.length > 0 
      ? safetyScores.reduce((sum, score) => sum + score, 0) / safetyScores.length 
      : 0;

    const reputationScore = (avgQuality + avgSafety) / 2;

    await this.prisma.organization.update({
      where: { id: organizationId },
      data: { 
        reputationScore,
        averageRating: reputationScore,
        qualityScore: avgQuality,
        safetyScore: avgSafety,
      },
    });

    return reputationScore;
  }

  async verifyOrganization(organizationId: string, verifiedBy: string) {
    return await this.prisma.organization.update({
      where: { id: organizationId },
      data: {
        isVerified: true,
        verifiedAt: new Date(),
        verifiedBy,
      },
    });
  }

  async unverifyOrganization(organizationId: string) {
    return await this.prisma.organization.update({
      where: { id: organizationId },
      data: {
        isVerified: false,
        verifiedAt: null,
        verifiedBy: null,
      },
    });
  }

  // Search and Discovery Methods
  async searchOrganizations(query: string, limit: number = 20) {
    return await this.prisma.organization.findMany({
      where: {
        isActive: true,
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } },
          { specialties: { hasSome: [query] } },
        ],
      },
      include: {
        _count: {
          select: {
            professionals: true,
            projects: true,
          },
        },
      },
      orderBy: {
        reputationScore: 'desc',
      },
      take: limit,
    });
  }

  async getTopOrganizations(limit: number = 10) {
    return await this.prisma.organization.findMany({
      where: {
        isActive: true,
        isVerified: true,
      },
      include: {
        _count: {
          select: {
            professionals: true,
            projects: true,
          },
        },
      },
      orderBy: [
        { reputationScore: 'desc' },
        { projectsCompleted: 'desc' },
      ],
      take: limit,
    });
  }
}