// apps/api/src/common/enums/index.ts
// Barrel export for clean imports across the application

export { SocialBuildEnumRegistry } from './registry';

// Re-export all enums for easy importing in entities
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
  ProjectPhase,
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
} from './registry';