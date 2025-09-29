// apps/api/src/common/enums/registry.ts
import { registerEnumType } from '@nestjs/graphql';
import * as PrismaEnums from '@prisma/client';

interface EnumMetadata {
  enum: any;
  name: string;
  description?: string;
  values?: Record<string, { description?: string; deprecationReason?: string }>;
}

/**
 * Centralized enum registry for SocialBuild CMS
 * Handles all GraphQL enum registration in a single location
 */
export class SocialBuildEnumRegistry {
  private static isRegistered = false;
  
  private static readonly ENUM_DEFINITIONS: EnumMetadata[] = [
    // Organization Domain Enums
    {
      enum: PrismaEnums.OrganizationType,
      name: 'OrganizationType',
      description: 'Types of organizations in the construction ecosystem',
    },
    {
      enum: PrismaEnums.OrganizationSize,
      name: 'OrganizationSize',
      description: 'Organization size categories based on employee count',
    },
    {
      enum: PrismaEnums.Industry,
      name: 'Industry',
      description: 'Construction industry specializations and market segments',
    },

    // Constellation & Membership Enums
    {
      enum: PrismaEnums.ConstellationRole,
      name: 'ConstellationRole',
      description: 'Roles organizations can have within a constellation',
    },
    {
      enum: PrismaEnums.MembershipStatus,
      name: 'MembershipStatus',
      description: 'Status of membership in constellations and organizations',
    },
    {
      enum: PrismaEnums.AccessLevel,
      name: 'AccessLevel',
      description: 'Access permission levels across the platform',
    },

    // Professional Domain Enums
    {
      enum: PrismaEnums.Discipline,
      name: 'Discipline',
      description: 'Professional disciplines and specializations in construction',
    },
    {
      enum: PrismaEnums.EmploymentType,
      name: 'EmploymentType',
      description: 'Types of employment relationships',
    },
    {
      enum: PrismaEnums.AvailabilityStatus,
      name: 'AvailabilityStatus',
      description: 'Professional availability for work and collaboration',
    },

    // Project Domain Enums
    {
      enum: PrismaEnums.ProjectType,
      name: 'ProjectType',
      description: 'Categories of construction projects',
    },
    {
      enum: PrismaEnums.ProjectCategory,
      name: 'ProjectCategory',
      description: 'Specific project categories within construction types',
    },
    {
      enum: PrismaEnums.ProjectPhaseEnum,
      name: 'ProjectPhase',
      description: 'Standard phases in construction project lifecycle',
    },
    {
      enum: PrismaEnums.ProjectStatus,
      name: 'ProjectStatus',
      description: 'Current status of project execution',
    },
    {
      enum: PrismaEnums.BudgetStatus,
      name: 'BudgetStatus',
      description: 'Project budget performance status',
    },
    {
      enum: PrismaEnums.Priority,
      name: 'Priority',
      description: 'General priority levels used across the platform',
    },
    {
      enum: PrismaEnums.SharingLevel,
      name: 'SharingLevel',
      description: 'Levels of content sharing and visibility',
    },
    {
      enum: PrismaEnums.VisibilityLevel,
      name: 'VisibilityLevel',
      description: 'Content visibility and access control levels',
    },

    // Project Organization Relationships
    {
      enum: PrismaEnums.ProjectOrganizationRole,
      name: 'ProjectOrganizationRole',
      description: 'Roles organizations play in specific projects',
    },
    {
      enum: PrismaEnums.ContractStatus,
      name: 'ContractStatus',
      description: 'Status of contracts between organizations and projects',
    },
    {
      enum: PrismaEnums.ProjectRole,
      name: 'ProjectRole',
      description: 'Individual professional roles within projects',
    },

    // Task Management Enums
    {
      enum: PrismaEnums.TaskStatus,
      name: 'TaskStatus',
      description: 'Task completion and workflow status',
    },
    {
      enum: PrismaEnums.TaskPriority,
      name: 'TaskPriority',
      description: 'Task urgency and importance levels',
    },
    {
      enum: PrismaEnums.PhaseStatus,
      name: 'PhaseStatus',
      description: 'Project phase execution status',
    },
    {
      enum: PrismaEnums.TaskDependencyType,
      name: 'TaskDependencyType',
      description: 'Types of dependencies between tasks',
    },
    {
      enum: PrismaEnums.WatchLevel,
      name: 'WatchLevel',
      description: 'Notification levels for task watchers',
    },

    // Social & Content Enums
    {
      enum: PrismaEnums.PostType,
      name: 'PostType',
      description: 'Categories of social content posts',
    },
    {
      enum: PrismaEnums.PostCategory,
      name: 'PostCategory',
      description: 'Specific categorization of post content',
    },
    {
      enum: PrismaEnums.PostStatus,
      name: 'PostStatus',
      description: 'Publication and moderation status of posts',
    },
    {
      enum: PrismaEnums.CommentStatus,
      name: 'CommentStatus',
      description: 'Status of comments on posts',
    },
    {
      enum: PrismaEnums.ShareType,
      name: 'ShareType',
      description: 'Types of content sharing',
    },
    {
      enum: PrismaEnums.FollowSource,
      name: 'FollowSource',
      description: 'How professional connections are established',
    },

    // Knowledge Management Enums
    {
      enum: PrismaEnums.KnowledgeCategory,
      name: 'KnowledgeCategory',
      description: 'Categories for organizing knowledge and lessons learned',
    },
    {
      enum: PrismaEnums.DifficultyLevel,
      name: 'DifficultyLevel',
      description: 'Complexity levels for knowledge and skills',
    },
    {
      enum: PrismaEnums.ImpactLevel,
      name: 'ImpactLevel',
      description: 'Levels of impact for lessons and innovations',
    },
    {
      enum: PrismaEnums.ValidationStatus,
      name: 'ValidationStatus',
      description: 'Validation status for knowledge contributions',
    },

    // Innovation Management Enums
    {
      enum: PrismaEnums.InnovationCategory,
      name: 'InnovationCategory',
      description: 'Categories of construction innovations',
    },
    {
      enum: PrismaEnums.InnovationType,
      name: 'InnovationType',
      description: 'Types of innovation based on scope and impact',
    },
    {
      enum: PrismaEnums.MaturityLevel,
      name: 'MaturityLevel',
      description: 'Development maturity of innovations',
    },
    {
      enum: PrismaEnums.IPStatus,
      name: 'IPStatus',
      description: 'Intellectual property status of innovations',
    },
    {
      enum: PrismaEnums.TestingStatus,
      name: 'TestingStatus',
      description: 'Testing and validation status of innovations',
    },

    // Dependencies & Milestones
    {
      enum: PrismaEnums.DependencyType,
      name: 'DependencyType',
      description: 'Types of dependencies between projects and tasks',
    },
    {
      enum: PrismaEnums.DependencyStatus,
      name: 'DependencyStatus',
      description: 'Status of dependency resolution',
    },
    {
      enum: PrismaEnums.MilestoneStatus,
      name: 'MilestoneStatus',
      description: 'Achievement status of project milestones',
    },

    // Expertise & Collaboration
    {
      enum: PrismaEnums.ExpertiseLevel,
      name: 'ExpertiseLevel',
      description: 'Professional expertise and experience levels',
    },
    {
      enum: PrismaEnums.CollaborationType,
      name: 'CollaborationType',
      description: 'Types of business collaborations between organizations',
    },
    {
      enum: PrismaEnums.CollaborationStatus,
      name: 'CollaborationStatus',
      description: 'Status of ongoing collaborations',
    },
    {
      enum: PrismaEnums.AdoptionType,
      name: 'AdoptionType',
      description: 'Ways innovations are adopted across projects',
    },
    {
      enum: PrismaEnums.CollaboratorRole,
      name: 'CollaboratorRole',
      description: 'Roles in innovation collaborations',
    },
    {
      enum: PrismaEnums.ContributionType,
      name: 'ContributionType',
      description: 'Types of contributions to innovations',
    },

    // Learning & Development
    {
      enum: PrismaEnums.MentorshipStatus,
      name: 'MentorshipStatus',
      description: 'Status of mentorship relationships',
    },
    {
      enum: PrismaEnums.AchievementCategory,
      name: 'AchievementCategory',
      description: 'Categories of professional achievements',
    },
    {
      enum: PrismaEnums.AchievementLevel,
      name: 'AchievementLevel',
      description: 'Levels of achievement recognition',
    },
    {
      enum: PrismaEnums.AchievementRarity,
      name: 'AchievementRarity',
      description: 'Rarity classification of achievements',
    },

    // Risk Management
    {
      enum: PrismaEnums.RiskCategory,
      name: 'RiskCategory',
      description: 'Categories of project risks',
    },
    {
      enum: PrismaEnums.RiskStatus,
      name: 'RiskStatus',
      description: 'Status of risk identification and mitigation',
    },

    // File & Content Management
    {
      enum: PrismaEnums.AttachmentType,
      name: 'AttachmentType',
      description: 'Types of file attachments and media',
    },

    // Invitations & Networking
    {
      enum: PrismaEnums.InvitationType,
      name: 'InvitationType',
      description: 'Types of platform invitations',
    },
    {
      enum: PrismaEnums.InvitationStatus,
      name: 'InvitationStatus',
      description: 'Status of sent invitations',
    },
  ];

  /**
   * Register all enums with GraphQL
   * Implements idempotent pattern to prevent double registration
   */
  static registerAll(): void {
    if (this.isRegistered) {
      console.log('📋 SocialBuild enums already registered, skipping...');
      return;
    }

    console.log('🚀 Registering SocialBuild GraphQL enums...');
    let successCount = 0;
    let errorCount = 0;

    this.ENUM_DEFINITIONS.forEach(({ enum: enumType, name, description, values }) => {
      try {
        registerEnumType(enumType, {
          name,
          description,
          valuesMap: values,
        });
        successCount++;
        console.log(`  ✅ ${name}`);
      } catch (error) {
        errorCount++;
        console.error(`  ❌ Failed to register ${name}:`, error.message);
      }
    });

    this.isRegistered = true;
    console.log(`📊 Enum registration complete: ${successCount} success, ${errorCount} errors`);
  }

  /**
   * Get enum metadata for documentation or validation
   */
  static getEnumMetadata(enumName: string): EnumMetadata | undefined {
    return this.ENUM_DEFINITIONS.find(def => def.name === enumName);
  }

  /**
   * Get all registered enum names
   */
  static getRegisteredEnumNames(): string[] {
    return this.ENUM_DEFINITIONS.map(def => def.name);
  }

  /**
   * Validate if enum is registered
   */
  static isEnumRegistered(enumName: string): boolean {
    return this.ENUM_DEFINITIONS.some(def => def.name === enumName);
  }

  /**
   * Get enum statistics
   */
  static getStats() {
    const byDomain = this.ENUM_DEFINITIONS.reduce((acc, def) => {
      const domain = this.categorizeDomain(def.name);
      acc[domain] = (acc[domain] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      total: this.ENUM_DEFINITIONS.length,
      byDomain,
      isRegistered: this.isRegistered,
    };
  }

  private static categorizeDomain(enumName: string): string {
    if (enumName.includes('Organization')) return 'Organization';
    if (enumName.includes('Project')) return 'Project';
    if (enumName.includes('Task')) return 'Task Management';
    if (enumName.includes('Post') || enumName.includes('Comment') || enumName.includes('Share')) return 'Social';
    if (enumName.includes('Innovation') || enumName.includes('Knowledge')) return 'Knowledge';
    if (enumName.includes('Achievement') || enumName.includes('Mentorship')) return 'Learning';
    if (enumName.includes('Risk')) return 'Risk Management';
    if (enumName.includes('Invitation')) return 'Networking';
    return 'General';
  }
}

// Export clean enum references for use in entities
// Using direct re-export to maintain proper TypeScript type information
export {
  // Organization Domain
  OrganizationType,
  OrganizationSize,
  Industry,
  
  // Constellation & Membership
  ConstellationRole,
  MembershipStatus,
  AccessLevel,
  
  // Professional Domain
  Discipline,
  EmploymentType,
  AvailabilityStatus,
  
  // Project Domain
  ProjectType,
  ProjectCategory,
  ProjectStatus,
  BudgetStatus,
  Priority,
  SharingLevel,
  VisibilityLevel,
  ProjectOrganizationRole,
  ContractStatus,
  ProjectRole,
  
  // Task Management
  TaskStatus,
  TaskPriority,
  PhaseStatus,
  TaskDependencyType,
  WatchLevel,
  
  // Social & Content
  PostType,
  PostCategory,
  PostStatus,
  CommentStatus,
  ShareType,
  FollowSource,
  
  // Knowledge Management
  KnowledgeCategory,
  DifficultyLevel,
  ImpactLevel,
  ValidationStatus,
  
  // Innovation Management
  InnovationCategory,
  InnovationType,
  MaturityLevel,
  IPStatus,
  TestingStatus,
  
  // Dependencies & Milestones
  DependencyType,
  DependencyStatus,
  MilestoneStatus,
  
  // Expertise & Collaboration
  ExpertiseLevel,
  CollaborationType,
  CollaborationStatus,
  AdoptionType,
  CollaboratorRole,
  ContributionType,
  
  // Learning & Development
  MentorshipStatus,
  AchievementCategory,
  AchievementLevel,
  AchievementRarity,
  
  // Risk Management
  RiskCategory,
  RiskStatus,
  
  // File & Content Management
  AttachmentType,
  
  // Invitations & Networking
  InvitationType,
  InvitationStatus,
} from '@prisma/client';

// Special export for ProjectPhase (renamed from ProjectPhaseEnum)
export { ProjectPhaseEnum as ProjectPhase } from '@prisma/client';