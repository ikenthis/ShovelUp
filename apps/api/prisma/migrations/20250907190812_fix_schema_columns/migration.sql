/*
  Warnings:

  - The values [CONTRACTOR,MEMBER,VIEWER] on the enum `ProjectRole` will be removed. If these variants are still used in the database, this will fail.
  - The values [PLANNING,IN_PROGRESS] on the enum `ProjectStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `projectId` on the `comments` table. All the data in the column will be lost.
  - You are about to drop the column `taskId` on the `comments` table. All the data in the column will be lost.
  - You are about to drop the column `logo` on the `organizations` table. All the data in the column will be lost.
  - You are about to drop the column `settings` on the `organizations` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `project_members` table. All the data in the column will be lost.
  - You are about to drop the column `actualCost` on the `projects` table. All the data in the column will be lost.
  - You are about to drop the column `address` on the `projects` table. All the data in the column will be lost.
  - You are about to drop the column `bimModelUrl` on the `projects` table. All the data in the column will be lost.
  - You are about to drop the column `coordinates` on the `projects` table. All the data in the column will be lost.
  - You are about to drop the column `organizationId` on the `projects` table. All the data in the column will be lost.
  - You are about to drop the column `progress` on the `projects` table. All the data in the column will be lost.
  - The `budget` column on the `projects` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `activity_logs` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `documents` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `project_phases` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tasks` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[projectId,professionalId]` on the table `project_members` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[constellationId,slug]` on the table `projects` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `postId` to the `comments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `organizations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `professionalId` to the `project_members` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `project_members` table without a default value. This is not possible if the table is not empty.
  - Added the required column `constellationId` to the `projects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdBy` to the `projects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `estimatedEnd` to the `projects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `projects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `projects` table without a default value. This is not possible if the table is not empty.
  - Made the column `startDate` on table `projects` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "public"."OrganizationType" AS ENUM ('GENERAL_CONTRACTOR', 'SUBCONTRACTOR', 'SPECIALTY_CONTRACTOR', 'ARCHITECT', 'ENGINEER_STRUCTURAL', 'ENGINEER_MEP', 'ENGINEER_CIVIL', 'CONSULTANT', 'SUPPLIER', 'MANUFACTURER', 'DEVELOPER', 'OWNER', 'GOVERNMENT', 'ASSOCIATION', 'OTHER');

-- CreateEnum
CREATE TYPE "public"."OrganizationSize" AS ENUM ('FREELANCER', 'STARTUP', 'SMALL', 'MEDIUM', 'LARGE', 'ENTERPRISE');

-- CreateEnum
CREATE TYPE "public"."Industry" AS ENUM ('RESIDENTIAL', 'COMMERCIAL', 'INDUSTRIAL', 'INFRASTRUCTURE', 'HEALTHCARE', 'EDUCATION', 'HOSPITALITY', 'RETAIL', 'MIXED_USE', 'OTHER');

-- CreateEnum
CREATE TYPE "public"."ConstellationRole" AS ENUM ('MASTER_DEVELOPER', 'GENERAL_CONTRACTOR', 'PRIME_CONTRACTOR', 'SUBCONTRACTOR', 'ARCHITECT', 'ENGINEER', 'CONSULTANT', 'SUPPLIER', 'GOVERNMENT', 'OBSERVER', 'STAKEHOLDER');

-- CreateEnum
CREATE TYPE "public"."MembershipStatus" AS ENUM ('PENDING', 'ACTIVE', 'INACTIVE', 'SUSPENDED', 'BANNED', 'LEFT');

-- CreateEnum
CREATE TYPE "public"."AccessLevel" AS ENUM ('VIEWER', 'MEMBER', 'CONTRIBUTOR', 'MODERATOR', 'ADMIN', 'OWNER');

-- CreateEnum
CREATE TYPE "public"."Discipline" AS ENUM ('ARCHITECTURE', 'STRUCTURAL_ENGINEERING', 'MECHANICAL_ENGINEERING', 'ELECTRICAL_ENGINEERING', 'PLUMBING_ENGINEERING', 'CIVIL_ENGINEERING', 'ENVIRONMENTAL_ENGINEERING', 'FIRE_PROTECTION', 'PROJECT_MANAGEMENT', 'CONSTRUCTION_MANAGEMENT', 'SAFETY_MANAGEMENT', 'QUALITY_CONTROL', 'BIM_MANAGEMENT', 'SURVEYING', 'COST_ESTIMATION', 'SCHEDULING', 'PROCUREMENT', 'COMMISSIONING', 'FACILITY_MANAGEMENT', 'OTHER');

-- CreateEnum
CREATE TYPE "public"."EmploymentType" AS ENUM ('FULL_TIME', 'PART_TIME', 'CONTRACTOR', 'FREELANCER', 'CONSULTANT', 'INTERN');

-- CreateEnum
CREATE TYPE "public"."AvailabilityStatus" AS ENUM ('AVAILABLE', 'BUSY', 'PARTIALLY_AVAILABLE', 'UNAVAILABLE', 'ON_LEAVE');

-- CreateEnum
CREATE TYPE "public"."ProjectType" AS ENUM ('NEW_CONSTRUCTION', 'RENOVATION', 'RESTORATION', 'ADDITION', 'TENANT_IMPROVEMENT', 'INFRASTRUCTURE', 'CIVIL_WORKS', 'DEMOLITION', 'OTHER');

-- CreateEnum
CREATE TYPE "public"."ProjectCategory" AS ENUM ('RESIDENTIAL_SINGLE', 'RESIDENTIAL_MULTI', 'COMMERCIAL_OFFICE', 'COMMERCIAL_RETAIL', 'COMMERCIAL_HOSPITALITY', 'INDUSTRIAL_MANUFACTURING', 'INDUSTRIAL_WAREHOUSE', 'INFRASTRUCTURE_TRANSPORT', 'INFRASTRUCTURE_UTILITIES', 'HEALTHCARE_HOSPITAL', 'HEALTHCARE_CLINIC', 'EDUCATION_SCHOOL', 'EDUCATION_UNIVERSITY', 'GOVERNMENT_CIVIC', 'RELIGIOUS', 'MIXED_USE', 'OTHER');

-- CreateEnum
CREATE TYPE "public"."ProjectPhase" AS ENUM ('INITIATION', 'PLANNING', 'DESIGN_CONCEPTUAL', 'DESIGN_SCHEMATIC', 'DESIGN_DEVELOPMENT', 'CONSTRUCTION_DOCUMENTS', 'PROCUREMENT', 'CONSTRUCTION', 'COMMISSIONING', 'HANDOVER', 'CLOSEOUT', 'OPERATION', 'MAINTENANCE');

-- CreateEnum
CREATE TYPE "public"."BudgetStatus" AS ENUM ('UNDER_BUDGET', 'ON_TRACK', 'OVER_BUDGET', 'CRITICAL');

-- CreateEnum
CREATE TYPE "public"."Priority" AS ENUM ('VERY_LOW', 'LOW', 'MEDIUM', 'HIGH', 'URGENT', 'CRITICAL');

-- CreateEnum
CREATE TYPE "public"."SharingLevel" AS ENUM ('PRIVATE', 'TEAM', 'PROJECT', 'ORGANIZATION', 'CONSTELLATION', 'NETWORK', 'PUBLIC');

-- CreateEnum
CREATE TYPE "public"."VisibilityLevel" AS ENUM ('PRIVATE', 'TEAM', 'PROJECT', 'ORGANIZATION', 'CONSTELLATION', 'NETWORK', 'PUBLIC');

-- CreateEnum
CREATE TYPE "public"."ProjectOrganizationRole" AS ENUM ('OWNER', 'DEVELOPER', 'GENERAL_CONTRACTOR', 'PRIME_CONTRACTOR', 'SUBCONTRACTOR', 'ARCHITECT', 'ENGINEER', 'CONSULTANT', 'SUPPLIER', 'INSPECTOR', 'OTHER');

-- CreateEnum
CREATE TYPE "public"."ContractStatus" AS ENUM ('DRAFT', 'NEGOTIATION', 'ACTIVE', 'COMPLETED', 'TERMINATED', 'DISPUTED');

-- CreateEnum
CREATE TYPE "public"."PostType" AS ENUM ('GENERAL', 'PROGRESS_UPDATE', 'ISSUE_REPORT', 'QUESTION', 'KNOWLEDGE_SHARE', 'LESSON_LEARNED', 'INNOVATION', 'ANNOUNCEMENT', 'MILESTONE', 'SAFETY_ALERT', 'QUALITY_ISSUE', 'SCHEDULE_UPDATE', 'BUDGET_UPDATE', 'CHANGE_ORDER', 'RFI', 'SUBMITTAL', 'OTHER');

-- CreateEnum
CREATE TYPE "public"."PostCategory" AS ENUM ('TECHNICAL', 'SAFETY', 'QUALITY', 'SCHEDULE', 'BUDGET', 'COORDINATION', 'DESIGN', 'CONSTRUCTION', 'COMMISSIONING', 'GENERAL');

-- CreateEnum
CREATE TYPE "public"."PostStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED', 'DELETED', 'FLAGGED');

-- CreateEnum
CREATE TYPE "public"."CommentStatus" AS ENUM ('PUBLISHED', 'FLAGGED', 'DELETED');

-- CreateEnum
CREATE TYPE "public"."ShareType" AS ENUM ('INTERNAL', 'EXTERNAL', 'CROSS_PROJECT', 'CROSS_CONSTELLATION');

-- CreateEnum
CREATE TYPE "public"."FollowSource" AS ENUM ('MANUAL', 'SUGGESTION', 'PROJECT_COLLABORATION', 'ORGANIZATION', 'CONSTELLATION', 'MUTUAL_CONNECTION');

-- CreateEnum
CREATE TYPE "public"."KnowledgeCategory" AS ENUM ('TECHNICAL_SOLUTION', 'PROCESS_IMPROVEMENT', 'SAFETY_PRACTICE', 'QUALITY_CONTROL', 'COST_OPTIMIZATION', 'TIME_MANAGEMENT', 'RESOURCE_MANAGEMENT', 'COMMUNICATION', 'COORDINATION', 'INNOVATION', 'RISK_MITIGATION', 'LESSONS_LEARNED', 'BEST_PRACTICE', 'TROUBLESHOOTING', 'OTHER');

-- CreateEnum
CREATE TYPE "public"."DifficultyLevel" AS ENUM ('BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT');

-- CreateEnum
CREATE TYPE "public"."ImpactLevel" AS ENUM ('MINIMAL', 'LOW', 'MEDIUM', 'HIGH', 'TRANSFORMATIONAL');

-- CreateEnum
CREATE TYPE "public"."ValidationStatus" AS ENUM ('PENDING', 'UNDER_REVIEW', 'VALIDATED', 'REJECTED', 'NEEDS_REVISION');

-- CreateEnum
CREATE TYPE "public"."InnovationCategory" AS ENUM ('TECHNOLOGY', 'PROCESS', 'MATERIAL', 'METHOD', 'TOOL', 'EQUIPMENT', 'SOFTWARE', 'SAFETY', 'SUSTAINABILITY', 'EFFICIENCY', 'QUALITY', 'COST_REDUCTION', 'OTHER');

-- CreateEnum
CREATE TYPE "public"."InnovationType" AS ENUM ('INCREMENTAL', 'RADICAL', 'DISRUPTIVE', 'ARCHITECTURAL', 'MODULAR');

-- CreateEnum
CREATE TYPE "public"."MaturityLevel" AS ENUM ('CONCEPT', 'PROTOTYPE', 'PILOT', 'TESTED', 'PROVEN', 'MATURE');

-- CreateEnum
CREATE TYPE "public"."IPStatus" AS ENUM ('OPEN', 'PROPRIETARY', 'PATENT_PENDING', 'PATENTED', 'TRADE_SECRET', 'LICENSED');

-- CreateEnum
CREATE TYPE "public"."TestingStatus" AS ENUM ('UNTESTED', 'PLANNING', 'IN_PROGRESS', 'COMPLETED', 'FAILED', 'VALIDATED');

-- CreateEnum
CREATE TYPE "public"."DependencyType" AS ENUM ('FINISH_TO_START', 'START_TO_START', 'FINISH_TO_FINISH', 'START_TO_FINISH', 'RESOURCE_DEPENDENCY', 'TECHNICAL_DEPENDENCY', 'REGULATORY_DEPENDENCY', 'COORDINATION_DEPENDENCY');

-- CreateEnum
CREATE TYPE "public"."DependencyStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'RESOLVED', 'BLOCKED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "public"."MilestoneStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'COMPLETED', 'DELAYED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "public"."ExpertiseLevel" AS ENUM ('BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT', 'THOUGHT_LEADER');

-- CreateEnum
CREATE TYPE "public"."CollaborationType" AS ENUM ('STRATEGIC_PARTNERSHIP', 'PROJECT_BASED', 'SUBCONTRACTOR', 'SUPPLIER', 'JOINT_VENTURE', 'CONSULTING', 'ONE_TIME', 'ONGOING');

-- CreateEnum
CREATE TYPE "public"."CollaborationStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'COMPLETED', 'TERMINATED', 'SUSPENDED');

-- CreateEnum
CREATE TYPE "public"."AdoptionType" AS ENUM ('DIRECT_COPY', 'ADAPTED', 'PILOT_TEST', 'FULL_IMPLEMENTATION', 'PARTIAL_IMPLEMENTATION');

-- CreateEnum
CREATE TYPE "public"."CollaboratorRole" AS ENUM ('LEAD_INNOVATOR', 'CO_INNOVATOR', 'CONTRIBUTOR', 'VALIDATOR', 'TESTER', 'ADVISOR', 'SPONSOR');

-- CreateEnum
CREATE TYPE "public"."ContributionType" AS ENUM ('IDEA_GENERATION', 'TECHNICAL_DEVELOPMENT', 'TESTING_VALIDATION', 'IMPLEMENTATION', 'DOCUMENTATION', 'FUNDING', 'MENTORING', 'PROMOTION');

-- CreateEnum
CREATE TYPE "public"."MentorshipStatus" AS ENUM ('ACTIVE', 'COMPLETED', 'PAUSED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "public"."AchievementCategory" AS ENUM ('KNOWLEDGE_SHARING', 'COLLABORATION', 'INNOVATION', 'MENTORSHIP', 'PROJECT_SUCCESS', 'SAFETY', 'QUALITY', 'LEADERSHIP', 'COMMUNITY', 'LEARNING');

-- CreateEnum
CREATE TYPE "public"."AchievementLevel" AS ENUM ('BRONZE', 'SILVER', 'GOLD', 'PLATINUM', 'DIAMOND');

-- CreateEnum
CREATE TYPE "public"."AchievementRarity" AS ENUM ('COMMON', 'UNCOMMON', 'RARE', 'EPIC', 'LEGENDARY');

-- CreateEnum
CREATE TYPE "public"."RiskCategory" AS ENUM ('TECHNICAL', 'FINANCIAL', 'SCHEDULE', 'RESOURCE', 'SAFETY', 'QUALITY', 'REGULATORY', 'ENVIRONMENTAL', 'STAKEHOLDER', 'EXTERNAL');

-- CreateEnum
CREATE TYPE "public"."RiskStatus" AS ENUM ('IDENTIFIED', 'ASSESSED', 'PLANNED', 'MONITORING', 'MITIGATED', 'RESOLVED', 'ACCEPTED');

-- CreateEnum
CREATE TYPE "public"."AttachmentType" AS ENUM ('IMAGE', 'VIDEO', 'AUDIO', 'DOCUMENT', 'DRAWING', 'MODEL_3D', 'SPREADSHEET', 'PRESENTATION', 'ARCHIVE', 'OTHER');

-- CreateEnum
CREATE TYPE "public"."InvitationType" AS ENUM ('CONSTELLATION', 'PROJECT', 'ORGANIZATION', 'PROFESSIONAL_NETWORK', 'MENTORSHIP');

-- CreateEnum
CREATE TYPE "public"."InvitationStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED', 'EXPIRED', 'CANCELLED');

-- AlterEnum
BEGIN;
CREATE TYPE "public"."ProjectRole_new" AS ENUM ('PROJECT_MANAGER', 'SITE_MANAGER', 'FOREMAN', 'SUPERINTENDENT', 'ARCHITECT', 'ENGINEER', 'DESIGNER', 'COORDINATOR', 'INSPECTOR', 'SAFETY_OFFICER', 'QUALITY_MANAGER', 'SCHEDULER', 'ESTIMATOR', 'PROCUREMENT', 'ADMINISTRATIVE', 'LABORER', 'TECHNICIAN', 'SPECIALIST', 'CONSULTANT', 'OTHER');
ALTER TABLE "public"."project_members" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "public"."project_members" ALTER COLUMN "role" TYPE "public"."ProjectRole_new" USING ("role"::text::"public"."ProjectRole_new");
ALTER TYPE "public"."ProjectRole" RENAME TO "ProjectRole_old";
ALTER TYPE "public"."ProjectRole_new" RENAME TO "ProjectRole";
DROP TYPE "public"."ProjectRole_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "public"."ProjectStatus_new" AS ENUM ('ACTIVE', 'ON_HOLD', 'CANCELLED', 'COMPLETED', 'ARCHIVED');
ALTER TABLE "public"."projects" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "public"."projects" ALTER COLUMN "status" TYPE "public"."ProjectStatus_new" USING ("status"::text::"public"."ProjectStatus_new");
ALTER TYPE "public"."ProjectStatus" RENAME TO "ProjectStatus_old";
ALTER TYPE "public"."ProjectStatus_new" RENAME TO "ProjectStatus";
DROP TYPE "public"."ProjectStatus_old";
ALTER TABLE "public"."projects" ALTER COLUMN "status" SET DEFAULT 'ACTIVE';
COMMIT;

-- DropForeignKey
ALTER TABLE "public"."activity_logs" DROP CONSTRAINT "activity_logs_projectId_fkey";

-- DropForeignKey
ALTER TABLE "public"."activity_logs" DROP CONSTRAINT "activity_logs_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."comments" DROP CONSTRAINT "comments_authorId_fkey";

-- DropForeignKey
ALTER TABLE "public"."comments" DROP CONSTRAINT "comments_projectId_fkey";

-- DropForeignKey
ALTER TABLE "public"."comments" DROP CONSTRAINT "comments_taskId_fkey";

-- DropForeignKey
ALTER TABLE "public"."documents" DROP CONSTRAINT "documents_projectId_fkey";

-- DropForeignKey
ALTER TABLE "public"."documents" DROP CONSTRAINT "documents_taskId_fkey";

-- DropForeignKey
ALTER TABLE "public"."documents" DROP CONSTRAINT "documents_uploadedById_fkey";

-- DropForeignKey
ALTER TABLE "public"."project_members" DROP CONSTRAINT "project_members_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."project_phases" DROP CONSTRAINT "project_phases_projectId_fkey";

-- DropForeignKey
ALTER TABLE "public"."projects" DROP CONSTRAINT "projects_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "public"."tasks" DROP CONSTRAINT "tasks_assigneeId_fkey";

-- DropForeignKey
ALTER TABLE "public"."tasks" DROP CONSTRAINT "tasks_createdById_fkey";

-- DropForeignKey
ALTER TABLE "public"."tasks" DROP CONSTRAINT "tasks_parentTaskId_fkey";

-- DropForeignKey
ALTER TABLE "public"."tasks" DROP CONSTRAINT "tasks_phaseId_fkey";

-- DropForeignKey
ALTER TABLE "public"."tasks" DROP CONSTRAINT "tasks_projectId_fkey";

-- DropForeignKey
ALTER TABLE "public"."users" DROP CONSTRAINT "users_organizationId_fkey";

-- DropIndex
DROP INDEX "public"."project_members_userId_projectId_key";

-- AlterTable
ALTER TABLE "public"."comments" DROP COLUMN "projectId",
DROP COLUMN "taskId",
ADD COLUMN     "depth" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "editedAt" TIMESTAMP(3),
ADD COLUMN     "isEdited" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "likeCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "parentId" TEXT,
ADD COLUMN     "postId" TEXT NOT NULL,
ADD COLUMN     "replyCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "status" "public"."CommentStatus" NOT NULL DEFAULT 'PUBLISHED';

-- AlterTable
ALTER TABLE "public"."organizations" DROP COLUMN "logo",
DROP COLUMN "settings",
ADD COLUMN     "address" JSONB,
ADD COLUMN     "annualRevenue" MONEY,
ADD COLUMN     "avatar" TEXT,
ADD COLUMN     "averageRating" REAL,
ADD COLUMN     "banner" TEXT,
ADD COLUMN     "certifications" JSONB,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "email" TEXT,
ADD COLUMN     "employeeCount" INTEGER,
ADD COLUMN     "industry" "public"."Industry",
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "isVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "legalName" TEXT,
ADD COLUMN     "licenses" JSONB,
ADD COLUMN     "onTimeDeliveryRate" REAL,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "projectsActive" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "projectsCompleted" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "qualityScore" REAL,
ADD COLUMN     "reputationScore" REAL NOT NULL DEFAULT 0,
ADD COLUMN     "safetyScore" REAL,
ADD COLUMN     "size" "public"."OrganizationSize",
ADD COLUMN     "socialLinks" JSONB,
ADD COLUMN     "specialties" TEXT[],
ADD COLUMN     "taxId" TEXT,
ADD COLUMN     "type" "public"."OrganizationType" NOT NULL,
ADD COLUMN     "verifiedAt" TIMESTAMP(3),
ADD COLUMN     "verifiedBy" TEXT,
ADD COLUMN     "website" TEXT,
ADD COLUMN     "yearEstablished" INTEGER;

-- AlterTable
ALTER TABLE "public"."project_members" DROP COLUMN "userId",
ADD COLUMN     "accessLevel" "public"."AccessLevel" NOT NULL DEFAULT 'MEMBER',
ADD COLUMN     "contributionScore" REAL NOT NULL DEFAULT 0,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "hoursLogged" REAL NOT NULL DEFAULT 0,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "leftAt" TIMESTAMP(3),
ADD COLUMN     "performanceRating" REAL,
ADD COLUMN     "professionalId" TEXT NOT NULL,
ADD COLUMN     "responsibilities" TEXT,
ADD COLUMN     "tasksCompleted" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "title" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "role" DROP DEFAULT;

-- AlterTable
ALTER TABLE "public"."projects" DROP COLUMN "actualCost",
DROP COLUMN "address",
DROP COLUMN "bimModelUrl",
DROP COLUMN "coordinates",
DROP COLUMN "organizationId",
DROP COLUMN "progress",
ADD COLUMN     "actualEnd" TIMESTAMP(3),
ADD COLUMN     "allowsCollaboration" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "budgetStatus" "public"."BudgetStatus" NOT NULL DEFAULT 'ON_TRACK',
ADD COLUMN     "category" "public"."ProjectCategory",
ADD COLUMN     "constellationId" TEXT NOT NULL,
ADD COLUMN     "createdBy" TEXT NOT NULL,
ADD COLUMN     "currentCost" MONEY NOT NULL DEFAULT 0,
ADD COLUMN     "documents" JSONB,
ADD COLUMN     "estimatedEnd" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "incidentCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "isPublic" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "location" JSONB,
ADD COLUMN     "metadata" JSONB,
ADD COLUMN     "milestonesCompleted" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "milestonesTotal" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "phase" "public"."ProjectPhase" NOT NULL DEFAULT 'PLANNING',
ADD COLUMN     "priority" "public"."Priority" NOT NULL DEFAULT 'MEDIUM',
ADD COLUMN     "progressPercentage" REAL NOT NULL DEFAULT 0,
ADD COLUMN     "qualityScore" REAL,
ADD COLUMN     "safetyScore" REAL,
ADD COLUMN     "settings" JSONB,
ADD COLUMN     "sharingLevel" "public"."SharingLevel" NOT NULL DEFAULT 'CONSTELLATION',
ADD COLUMN     "slug" TEXT NOT NULL,
ADD COLUMN     "specifications" JSONB,
ADD COLUMN     "tags" TEXT[],
ADD COLUMN     "type" "public"."ProjectType" NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'ACTIVE',
ALTER COLUMN "startDate" SET NOT NULL,
DROP COLUMN "budget",
ADD COLUMN     "budget" MONEY;

-- DropTable
DROP TABLE "public"."activity_logs";

-- DropTable
DROP TABLE "public"."documents";

-- DropTable
DROP TABLE "public"."project_phases";

-- DropTable
DROP TABLE "public"."tasks";

-- DropTable
DROP TABLE "public"."users";

-- DropEnum
DROP TYPE "public"."DocumentType";

-- DropEnum
DROP TYPE "public"."PhaseStatus";

-- DropEnum
DROP TYPE "public"."TaskPriority";

-- DropEnum
DROP TYPE "public"."TaskStatus";

-- DropEnum
DROP TYPE "public"."UserRole";

-- CreateTable
CREATE TABLE "public"."constellations" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "location" JSONB NOT NULL,
    "timezone" TEXT NOT NULL DEFAULT 'UTC',
    "currency" TEXT NOT NULL DEFAULT 'EUR',
    "language" TEXT NOT NULL DEFAULT 'en',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isPublic" BOOLEAN NOT NULL DEFAULT false,
    "totalBudget" MONEY,
    "startDate" TIMESTAMP(3) NOT NULL,
    "estimatedEnd" TIMESTAMP(3),
    "actualEnd" TIMESTAMP(3),
    "networkDensity" DOUBLE PRECISION,
    "activityScore" DOUBLE PRECISION,
    "innovationRate" DOUBLE PRECISION,
    "collaborationIndex" DOUBLE PRECISION,
    "metadata" JSONB,
    "settings" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT,

    CONSTRAINT "constellations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."professionals" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "displayName" TEXT,
    "title" TEXT,
    "bio" TEXT,
    "discipline" "public"."Discipline" NOT NULL,
    "specialties" TEXT[],
    "yearsExperience" INTEGER,
    "currentRole" TEXT,
    "phone" TEXT,
    "location" JSONB,
    "avatar" TEXT,
    "banner" TEXT,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "verifiedAt" TIMESTAMP(3),
    "verifiedBy" TEXT,
    "emailVerified" BOOLEAN NOT NULL DEFAULT false,
    "phoneVerified" BOOLEAN NOT NULL DEFAULT false,
    "licenses" JSONB,
    "certifications" JSONB,
    "education" JSONB,
    "portfolio" JSONB,
    "linkedinUrl" TEXT,
    "portfolioUrl" TEXT,
    "websiteUrl" TEXT,
    "socialLinks" JSONB,
    "reputationScore" REAL NOT NULL DEFAULT 0,
    "contributionScore" REAL NOT NULL DEFAULT 0,
    "knowledgeShares" INTEGER NOT NULL DEFAULT 0,
    "mentorshipScore" REAL NOT NULL DEFAULT 0,
    "helpfulnessRating" REAL NOT NULL DEFAULT 0,
    "responseTime" REAL,
    "postsCount" INTEGER NOT NULL DEFAULT 0,
    "commentsCount" INTEGER NOT NULL DEFAULT 0,
    "likesReceived" INTEGER NOT NULL DEFAULT 0,
    "sharesReceived" INTEGER NOT NULL DEFAULT 0,
    "followersCount" INTEGER NOT NULL DEFAULT 0,
    "followingCount" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isAvailableForWork" BOOLEAN NOT NULL DEFAULT false,
    "isOpenToMentoring" BOOLEAN NOT NULL DEFAULT false,
    "privacySettings" JSONB,
    "notificationSettings" JSONB,
    "organizationId" TEXT,
    "employmentType" "public"."EmploymentType",
    "availabilityStatus" "public"."AvailabilityStatus" NOT NULL DEFAULT 'AVAILABLE',
    "hourlyRate" MONEY,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "lastActiveAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "professionals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."constellation_organizations" (
    "id" TEXT NOT NULL,
    "role" "public"."ConstellationRole" NOT NULL,
    "status" "public"."MembershipStatus" NOT NULL DEFAULT 'ACTIVE',
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "leftAt" TIMESTAMP(3),
    "permissions" JSONB,
    "accessLevel" "public"."AccessLevel" NOT NULL DEFAULT 'MEMBER',
    "projectsActive" INTEGER NOT NULL DEFAULT 0,
    "projectsCompleted" INTEGER NOT NULL DEFAULT 0,
    "contributionScore" REAL NOT NULL DEFAULT 0,
    "networkConnections" INTEGER NOT NULL DEFAULT 0,
    "reputationInNetwork" REAL NOT NULL DEFAULT 0,
    "constellationId" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "constellation_organizations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."constellation_professionals" (
    "id" TEXT NOT NULL,
    "status" "public"."MembershipStatus" NOT NULL DEFAULT 'ACTIVE',
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "leftAt" TIMESTAMP(3),
    "invitedBy" TEXT,
    "accessLevel" "public"."AccessLevel" NOT NULL DEFAULT 'MEMBER',
    "permissions" JSONB,
    "projectsActive" INTEGER NOT NULL DEFAULT 0,
    "projectsCompleted" INTEGER NOT NULL DEFAULT 0,
    "contributionScore" REAL NOT NULL DEFAULT 0,
    "networkConnections" INTEGER NOT NULL DEFAULT 0,
    "knowledgeContributions" INTEGER NOT NULL DEFAULT 0,
    "mentorshipCount" INTEGER NOT NULL DEFAULT 0,
    "postsInConstellation" INTEGER NOT NULL DEFAULT 0,
    "commentsInConstellation" INTEGER NOT NULL DEFAULT 0,
    "likesInConstellation" INTEGER NOT NULL DEFAULT 0,
    "constellationId" TEXT NOT NULL,
    "professionalId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "constellation_professionals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."project_organizations" (
    "id" TEXT NOT NULL,
    "role" "public"."ProjectOrganizationRole" NOT NULL,
    "responsibility" TEXT,
    "isPrimary" BOOLEAN NOT NULL DEFAULT false,
    "contractValue" MONEY,
    "contractStart" TIMESTAMP(3),
    "contractEnd" TIMESTAMP(3),
    "contractStatus" "public"."ContractStatus" NOT NULL DEFAULT 'ACTIVE',
    "performanceScore" REAL,
    "completionRate" REAL NOT NULL DEFAULT 0,
    "qualityRating" REAL,
    "timelyDelivery" BOOLEAN NOT NULL DEFAULT true,
    "projectId" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "project_organizations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."posts" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "type" "public"."PostType" NOT NULL DEFAULT 'GENERAL',
    "category" "public"."PostCategory",
    "priority" "public"."Priority" NOT NULL DEFAULT 'MEDIUM',
    "visibility" "public"."VisibilityLevel" NOT NULL DEFAULT 'PROJECT',
    "sharingLevel" "public"."SharingLevel" NOT NULL DEFAULT 'PROJECT',
    "tags" TEXT[],
    "mentions" TEXT[],
    "relatedProjects" TEXT[],
    "relatedTopics" TEXT[],
    "knowledgeCategory" "public"."KnowledgeCategory",
    "viewCount" INTEGER NOT NULL DEFAULT 0,
    "shareCount" INTEGER NOT NULL DEFAULT 0,
    "commentCount" INTEGER NOT NULL DEFAULT 0,
    "likeCount" INTEGER NOT NULL DEFAULT 0,
    "status" "public"."PostStatus" NOT NULL DEFAULT 'PUBLISHED',
    "isEdited" BOOLEAN NOT NULL DEFAULT false,
    "editedAt" TIMESTAMP(3),
    "authorId" TEXT NOT NULL,
    "projectId" TEXT,
    "organizationId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."likes" (
    "id" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "professionalId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "likes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."comment_likes" (
    "id" TEXT NOT NULL,
    "commentId" TEXT NOT NULL,
    "professionalId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "comment_likes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."shares" (
    "id" TEXT NOT NULL,
    "shareNote" TEXT,
    "shareType" "public"."ShareType" NOT NULL DEFAULT 'INTERNAL',
    "visibility" "public"."VisibilityLevel" NOT NULL DEFAULT 'PROJECT',
    "postId" TEXT NOT NULL,
    "sharedById" TEXT NOT NULL,
    "targetProjectId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "shares_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."follows" (
    "id" TEXT NOT NULL,
    "followerId" TEXT NOT NULL,
    "followingId" TEXT NOT NULL,
    "source" "public"."FollowSource" NOT NULL DEFAULT 'MANUAL',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "follows_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."lessons_learned" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" "public"."KnowledgeCategory" NOT NULL,
    "subcategory" TEXT,
    "difficulty" "public"."DifficultyLevel" NOT NULL DEFAULT 'INTERMEDIATE',
    "problemDescription" TEXT,
    "rootCause" TEXT,
    "solution" TEXT,
    "prevention" TEXT,
    "impactLevel" "public"."ImpactLevel" NOT NULL,
    "costImpact" MONEY,
    "timeImpact" DOUBLE PRECISION,
    "qualityImpact" TEXT,
    "validationStatus" "public"."ValidationStatus" NOT NULL DEFAULT 'PENDING',
    "validatedBy" TEXT,
    "validatedAt" TIMESTAMP(3),
    "visibility" "public"."VisibilityLevel" NOT NULL DEFAULT 'PROJECT',
    "isTemplate" BOOLEAN NOT NULL DEFAULT false,
    "reusedCount" INTEGER NOT NULL DEFAULT 0,
    "ratingAverage" REAL,
    "ratingCount" INTEGER NOT NULL DEFAULT 0,
    "tags" TEXT[],
    "keywords" TEXT[],
    "projectId" TEXT NOT NULL,
    "contributorId" TEXT NOT NULL,
    "postId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "lessons_learned_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."lesson_applications" (
    "id" TEXT NOT NULL,
    "applicationNote" TEXT,
    "adaptations" TEXT,
    "context" TEXT,
    "successRating" INTEGER,
    "resultDescription" TEXT,
    "impactMeasured" JSONB,
    "wouldRecommend" BOOLEAN,
    "lessonId" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "appliedById" TEXT NOT NULL,
    "appliedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3),

    CONSTRAINT "lesson_applications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."innovations" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" "public"."InnovationCategory" NOT NULL,
    "type" "public"."InnovationType" NOT NULL,
    "maturityLevel" "public"."MaturityLevel" NOT NULL DEFAULT 'CONCEPT',
    "problemSolved" TEXT,
    "solution" TEXT,
    "benefits" TEXT,
    "requirements" TEXT,
    "limitations" TEXT,
    "adoptionRate" REAL NOT NULL DEFAULT 0,
    "successRate" REAL,
    "costImpact" MONEY,
    "timeImpact" DOUBLE PRECISION,
    "qualityImpact" TEXT,
    "safetyImpact" TEXT,
    "isPatentable" BOOLEAN NOT NULL DEFAULT false,
    "isOpenSource" BOOLEAN NOT NULL DEFAULT true,
    "licenseType" TEXT,
    "ipStatus" "public"."IPStatus" NOT NULL DEFAULT 'OPEN',
    "testingStatus" "public"."TestingStatus" NOT NULL DEFAULT 'UNTESTED',
    "testResults" JSONB,
    "validationData" JSONB,
    "visibility" "public"."VisibilityLevel" NOT NULL DEFAULT 'PROJECT',
    "sharingLevel" "public"."SharingLevel" NOT NULL DEFAULT 'CONSTELLATION',
    "tags" TEXT[],
    "keywords" TEXT[],
    "originProjectId" TEXT NOT NULL,
    "innovatorId" TEXT NOT NULL,
    "postId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "innovations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."project_dependencies" (
    "id" TEXT NOT NULL,
    "dependencyType" "public"."DependencyType" NOT NULL,
    "description" TEXT,
    "criticalPath" BOOLEAN NOT NULL DEFAULT false,
    "leadTime" DOUBLE PRECISION,
    "bufferTime" DOUBLE PRECISION,
    "status" "public"."DependencyStatus" NOT NULL DEFAULT 'PENDING',
    "resolvedAt" TIMESTAMP(3),
    "dependentId" TEXT NOT NULL,
    "requiredId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,

    CONSTRAINT "project_dependencies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."milestones" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "targetDate" TIMESTAMP(3) NOT NULL,
    "actualDate" TIMESTAMP(3),
    "status" "public"."MilestoneStatus" NOT NULL DEFAULT 'PENDING',
    "progressPercentage" REAL NOT NULL DEFAULT 0,
    "isRequired" BOOLEAN NOT NULL DEFAULT true,
    "weight" REAL NOT NULL DEFAULT 1,
    "projectId" TEXT NOT NULL,
    "dependencies" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,

    CONSTRAINT "milestones_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."expertise_areas" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" "public"."Discipline" NOT NULL,
    "subcategory" TEXT,
    "level" "public"."ExpertiseLevel" NOT NULL,
    "yearsExperience" INTEGER,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "verifiedBy" TEXT,
    "verifiedAt" TIMESTAMP(3),
    "evidence" JSONB,
    "demandScore" REAL NOT NULL DEFAULT 0,
    "supplyScore" REAL NOT NULL DEFAULT 0,
    "professionalId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "expertise_areas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."organization_collaborations" (
    "id" TEXT NOT NULL,
    "projectContext" TEXT,
    "collaborationType" "public"."CollaborationType" NOT NULL,
    "projectsShared" INTEGER NOT NULL DEFAULT 1,
    "successRate" REAL,
    "collaborationScore" REAL NOT NULL DEFAULT 0,
    "averageRating" REAL,
    "status" "public"."CollaborationStatus" NOT NULL DEFAULT 'ACTIVE',
    "orgAId" TEXT NOT NULL,
    "orgBId" TEXT NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endedAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "organization_collaborations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."innovation_adoptions" (
    "id" TEXT NOT NULL,
    "adoptionType" "public"."AdoptionType" NOT NULL,
    "adaptations" TEXT,
    "implementationNotes" TEXT,
    "implementationDate" TIMESTAMP(3),
    "completionDate" TIMESTAMP(3),
    "effort" DOUBLE PRECISION,
    "cost" MONEY,
    "successRating" INTEGER,
    "results" JSONB,
    "lessonsLearned" TEXT,
    "wouldRecommend" BOOLEAN,
    "timeToImplement" DOUBLE PRECISION,
    "adoptionSuccess" BOOLEAN NOT NULL DEFAULT true,
    "innovationId" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "adoptedById" TEXT NOT NULL,
    "adoptedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "innovation_adoptions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."innovation_collaborators" (
    "id" TEXT NOT NULL,
    "role" "public"."CollaboratorRole" NOT NULL,
    "contribution" TEXT,
    "contributionType" "public"."ContributionType" NOT NULL,
    "timeInvested" DOUBLE PRECISION,
    "expertise" TEXT,
    "innovationId" TEXT NOT NULL,
    "professionalId" TEXT NOT NULL,
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "innovation_collaborators_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."mentorships" (
    "id" TEXT NOT NULL,
    "status" "public"."MentorshipStatus" NOT NULL DEFAULT 'ACTIVE',
    "goals" TEXT,
    "focus" TEXT,
    "frequency" TEXT,
    "sessionsCompleted" INTEGER NOT NULL DEFAULT 0,
    "progress" TEXT,
    "feedback" TEXT,
    "satisfaction" REAL,
    "effectiveness" REAL,
    "mentorId" TEXT NOT NULL,
    "menteeId" TEXT NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endedAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "mentorships_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."achievements" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" "public"."AchievementCategory" NOT NULL,
    "points" INTEGER NOT NULL DEFAULT 0,
    "level" "public"."AchievementLevel" NOT NULL DEFAULT 'BRONZE',
    "rarity" "public"."AchievementRarity" NOT NULL DEFAULT 'COMMON',
    "icon" TEXT,
    "badge" TEXT,
    "color" TEXT,
    "isRepeatable" BOOLEAN NOT NULL DEFAULT false,
    "timesEarned" INTEGER NOT NULL DEFAULT 1,
    "professionalId" TEXT NOT NULL,
    "contextType" TEXT,
    "contextId" TEXT,
    "earnedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "achievements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."risk_factors" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" "public"."RiskCategory" NOT NULL,
    "probability" REAL NOT NULL,
    "impact" REAL NOT NULL,
    "riskScore" REAL NOT NULL,
    "mitigation" TEXT,
    "contingency" TEXT,
    "owner" TEXT,
    "status" "public"."RiskStatus" NOT NULL DEFAULT 'IDENTIFIED',
    "priority" "public"."Priority" NOT NULL DEFAULT 'MEDIUM',
    "identifiedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "targetDate" TIMESTAMP(3),
    "resolvedAt" TIMESTAMP(3),
    "projectId" TEXT NOT NULL,
    "identifiedBy" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "risk_factors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."attachments" (
    "id" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "fileType" "public"."AttachmentType" NOT NULL,
    "mimeType" TEXT NOT NULL,
    "fileSize" INTEGER NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "tags" TEXT[],
    "dimensions" JSONB,
    "duration" DOUBLE PRECISION,
    "thumbnail" TEXT,
    "visibility" "public"."VisibilityLevel" NOT NULL DEFAULT 'PROJECT',
    "isPublic" BOOLEAN NOT NULL DEFAULT false,
    "uploadedById" TEXT NOT NULL,
    "postId" TEXT,
    "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "attachments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."lesson_attachments" (
    "id" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "fileType" TEXT NOT NULL,
    "fileSize" INTEGER NOT NULL,
    "description" TEXT,
    "lessonId" TEXT NOT NULL,
    "uploadedBy" TEXT NOT NULL,
    "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "lesson_attachments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."innovation_attachments" (
    "id" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "fileType" TEXT NOT NULL,
    "fileSize" INTEGER NOT NULL,
    "description" TEXT,
    "innovationId" TEXT NOT NULL,
    "uploadedBy" TEXT NOT NULL,
    "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "innovation_attachments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."invitations" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" TEXT,
    "message" TEXT,
    "type" "public"."InvitationType" NOT NULL,
    "status" "public"."InvitationStatus" NOT NULL DEFAULT 'PENDING',
    "constellationId" TEXT,
    "projectId" TEXT,
    "organizationId" TEXT,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "acceptedAt" TIMESTAMP(3),
    "rejectedAt" TIMESTAMP(3),
    "invitedById" TEXT,
    "invitedUserId" TEXT,
    "organizationSenderId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "invitations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."constellation_invitations" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" "public"."ConstellationRole" NOT NULL,
    "message" TEXT,
    "status" "public"."InvitationStatus" NOT NULL DEFAULT 'PENDING',
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "acceptedAt" TIMESTAMP(3),
    "rejectedAt" TIMESTAMP(3),
    "constellationId" TEXT NOT NULL,
    "invitedById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "constellation_invitations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "constellations_slug_key" ON "public"."constellations"("slug");

-- CreateIndex
CREATE INDEX "constellations_isActive_isPublic_idx" ON "public"."constellations"("isActive", "isPublic");

-- CreateIndex
CREATE INDEX "constellations_location_idx" ON "public"."constellations"("location");

-- CreateIndex
CREATE UNIQUE INDEX "professionals_email_key" ON "public"."professionals"("email");

-- CreateIndex
CREATE UNIQUE INDEX "professionals_username_key" ON "public"."professionals"("username");

-- CreateIndex
CREATE INDEX "professionals_email_idx" ON "public"."professionals"("email");

-- CreateIndex
CREATE INDEX "professionals_username_idx" ON "public"."professionals"("username");

-- CreateIndex
CREATE INDEX "professionals_discipline_isActive_idx" ON "public"."professionals"("discipline", "isActive");

-- CreateIndex
CREATE INDEX "professionals_reputationScore_idx" ON "public"."professionals"("reputationScore");

-- CreateIndex
CREATE INDEX "professionals_organizationId_idx" ON "public"."professionals"("organizationId");

-- CreateIndex
CREATE INDEX "professionals_isAvailableForWork_idx" ON "public"."professionals"("isAvailableForWork");

-- CreateIndex
CREATE INDEX "constellation_organizations_constellationId_status_idx" ON "public"."constellation_organizations"("constellationId", "status");

-- CreateIndex
CREATE INDEX "constellation_organizations_role_status_idx" ON "public"."constellation_organizations"("role", "status");

-- CreateIndex
CREATE UNIQUE INDEX "constellation_organizations_constellationId_organizationId_key" ON "public"."constellation_organizations"("constellationId", "organizationId");

-- CreateIndex
CREATE INDEX "constellation_professionals_constellationId_status_idx" ON "public"."constellation_professionals"("constellationId", "status");

-- CreateIndex
CREATE INDEX "constellation_professionals_contributionScore_idx" ON "public"."constellation_professionals"("contributionScore");

-- CreateIndex
CREATE UNIQUE INDEX "constellation_professionals_constellationId_professionalId_key" ON "public"."constellation_professionals"("constellationId", "professionalId");

-- CreateIndex
CREATE INDEX "project_organizations_projectId_role_idx" ON "public"."project_organizations"("projectId", "role");

-- CreateIndex
CREATE INDEX "project_organizations_organizationId_contractStatus_idx" ON "public"."project_organizations"("organizationId", "contractStatus");

-- CreateIndex
CREATE UNIQUE INDEX "project_organizations_projectId_organizationId_key" ON "public"."project_organizations"("projectId", "organizationId");

-- CreateIndex
CREATE INDEX "posts_authorId_status_idx" ON "public"."posts"("authorId", "status");

-- CreateIndex
CREATE INDEX "posts_projectId_type_idx" ON "public"."posts"("projectId", "type");

-- CreateIndex
CREATE INDEX "posts_visibility_status_idx" ON "public"."posts"("visibility", "status");

-- CreateIndex
CREATE INDEX "posts_type_category_idx" ON "public"."posts"("type", "category");

-- CreateIndex
CREATE INDEX "posts_tags_idx" ON "public"."posts"("tags");

-- CreateIndex
CREATE INDEX "posts_createdAt_idx" ON "public"."posts"("createdAt");

-- CreateIndex
CREATE INDEX "likes_postId_idx" ON "public"."likes"("postId");

-- CreateIndex
CREATE INDEX "likes_professionalId_idx" ON "public"."likes"("professionalId");

-- CreateIndex
CREATE UNIQUE INDEX "likes_postId_professionalId_key" ON "public"."likes"("postId", "professionalId");

-- CreateIndex
CREATE INDEX "comment_likes_commentId_idx" ON "public"."comment_likes"("commentId");

-- CreateIndex
CREATE INDEX "comment_likes_professionalId_idx" ON "public"."comment_likes"("professionalId");

-- CreateIndex
CREATE UNIQUE INDEX "comment_likes_commentId_professionalId_key" ON "public"."comment_likes"("commentId", "professionalId");

-- CreateIndex
CREATE INDEX "shares_postId_idx" ON "public"."shares"("postId");

-- CreateIndex
CREATE INDEX "shares_sharedById_idx" ON "public"."shares"("sharedById");

-- CreateIndex
CREATE INDEX "shares_shareType_idx" ON "public"."shares"("shareType");

-- CreateIndex
CREATE INDEX "follows_followerId_idx" ON "public"."follows"("followerId");

-- CreateIndex
CREATE INDEX "follows_followingId_idx" ON "public"."follows"("followingId");

-- CreateIndex
CREATE UNIQUE INDEX "follows_followerId_followingId_key" ON "public"."follows"("followerId", "followingId");

-- CreateIndex
CREATE UNIQUE INDEX "lessons_learned_postId_key" ON "public"."lessons_learned"("postId");

-- CreateIndex
CREATE INDEX "lessons_learned_category_visibility_idx" ON "public"."lessons_learned"("category", "visibility");

-- CreateIndex
CREATE INDEX "lessons_learned_projectId_idx" ON "public"."lessons_learned"("projectId");

-- CreateIndex
CREATE INDEX "lessons_learned_contributorId_idx" ON "public"."lessons_learned"("contributorId");

-- CreateIndex
CREATE INDEX "lessons_learned_validationStatus_idx" ON "public"."lessons_learned"("validationStatus");

-- CreateIndex
CREATE INDEX "lessons_learned_tags_idx" ON "public"."lessons_learned"("tags");

-- CreateIndex
CREATE INDEX "lesson_applications_lessonId_idx" ON "public"."lesson_applications"("lessonId");

-- CreateIndex
CREATE INDEX "lesson_applications_projectId_idx" ON "public"."lesson_applications"("projectId");

-- CreateIndex
CREATE INDEX "lesson_applications_appliedById_idx" ON "public"."lesson_applications"("appliedById");

-- CreateIndex
CREATE UNIQUE INDEX "innovations_postId_key" ON "public"."innovations"("postId");

-- CreateIndex
CREATE INDEX "innovations_category_type_idx" ON "public"."innovations"("category", "type");

-- CreateIndex
CREATE INDEX "innovations_originProjectId_idx" ON "public"."innovations"("originProjectId");

-- CreateIndex
CREATE INDEX "innovations_innovatorId_idx" ON "public"."innovations"("innovatorId");

-- CreateIndex
CREATE INDEX "innovations_adoptionRate_idx" ON "public"."innovations"("adoptionRate");

-- CreateIndex
CREATE INDEX "innovations_tags_idx" ON "public"."innovations"("tags");

-- CreateIndex
CREATE INDEX "project_dependencies_dependencyType_idx" ON "public"."project_dependencies"("dependencyType");

-- CreateIndex
CREATE INDEX "project_dependencies_status_idx" ON "public"."project_dependencies"("status");

-- CreateIndex
CREATE UNIQUE INDEX "project_dependencies_dependentId_requiredId_key" ON "public"."project_dependencies"("dependentId", "requiredId");

-- CreateIndex
CREATE INDEX "milestones_projectId_status_idx" ON "public"."milestones"("projectId", "status");

-- CreateIndex
CREATE INDEX "milestones_targetDate_idx" ON "public"."milestones"("targetDate");

-- CreateIndex
CREATE INDEX "expertise_areas_professionalId_idx" ON "public"."expertise_areas"("professionalId");

-- CreateIndex
CREATE INDEX "expertise_areas_category_level_idx" ON "public"."expertise_areas"("category", "level");

-- CreateIndex
CREATE INDEX "expertise_areas_demandScore_idx" ON "public"."expertise_areas"("demandScore");

-- CreateIndex
CREATE INDEX "organization_collaborations_collaborationType_idx" ON "public"."organization_collaborations"("collaborationType");

-- CreateIndex
CREATE INDEX "organization_collaborations_status_idx" ON "public"."organization_collaborations"("status");

-- CreateIndex
CREATE UNIQUE INDEX "organization_collaborations_orgAId_orgBId_key" ON "public"."organization_collaborations"("orgAId", "orgBId");

-- CreateIndex
CREATE INDEX "innovation_adoptions_innovationId_idx" ON "public"."innovation_adoptions"("innovationId");

-- CreateIndex
CREATE INDEX "innovation_adoptions_projectId_idx" ON "public"."innovation_adoptions"("projectId");

-- CreateIndex
CREATE INDEX "innovation_adoptions_adoptedById_idx" ON "public"."innovation_adoptions"("adoptedById");

-- CreateIndex
CREATE INDEX "innovation_adoptions_successRating_idx" ON "public"."innovation_adoptions"("successRating");

-- CreateIndex
CREATE INDEX "innovation_collaborators_innovationId_idx" ON "public"."innovation_collaborators"("innovationId");

-- CreateIndex
CREATE INDEX "innovation_collaborators_professionalId_idx" ON "public"."innovation_collaborators"("professionalId");

-- CreateIndex
CREATE INDEX "innovation_collaborators_role_idx" ON "public"."innovation_collaborators"("role");

-- CreateIndex
CREATE UNIQUE INDEX "innovation_collaborators_innovationId_professionalId_key" ON "public"."innovation_collaborators"("innovationId", "professionalId");

-- CreateIndex
CREATE INDEX "mentorships_mentorId_status_idx" ON "public"."mentorships"("mentorId", "status");

-- CreateIndex
CREATE INDEX "mentorships_menteeId_status_idx" ON "public"."mentorships"("menteeId", "status");

-- CreateIndex
CREATE UNIQUE INDEX "mentorships_mentorId_menteeId_key" ON "public"."mentorships"("mentorId", "menteeId");

-- CreateIndex
CREATE INDEX "achievements_professionalId_idx" ON "public"."achievements"("professionalId");

-- CreateIndex
CREATE INDEX "achievements_category_idx" ON "public"."achievements"("category");

-- CreateIndex
CREATE INDEX "achievements_earnedAt_idx" ON "public"."achievements"("earnedAt");

-- CreateIndex
CREATE INDEX "risk_factors_projectId_status_idx" ON "public"."risk_factors"("projectId", "status");

-- CreateIndex
CREATE INDEX "risk_factors_category_idx" ON "public"."risk_factors"("category");

-- CreateIndex
CREATE INDEX "risk_factors_riskScore_idx" ON "public"."risk_factors"("riskScore");

-- CreateIndex
CREATE INDEX "risk_factors_priority_idx" ON "public"."risk_factors"("priority");

-- CreateIndex
CREATE INDEX "attachments_postId_idx" ON "public"."attachments"("postId");

-- CreateIndex
CREATE INDEX "attachments_uploadedById_idx" ON "public"."attachments"("uploadedById");

-- CreateIndex
CREATE INDEX "attachments_fileType_idx" ON "public"."attachments"("fileType");

-- CreateIndex
CREATE INDEX "lesson_attachments_lessonId_idx" ON "public"."lesson_attachments"("lessonId");

-- CreateIndex
CREATE INDEX "lesson_attachments_uploadedBy_idx" ON "public"."lesson_attachments"("uploadedBy");

-- CreateIndex
CREATE INDEX "innovation_attachments_innovationId_idx" ON "public"."innovation_attachments"("innovationId");

-- CreateIndex
CREATE INDEX "innovation_attachments_uploadedBy_idx" ON "public"."innovation_attachments"("uploadedBy");

-- CreateIndex
CREATE INDEX "invitations_email_status_idx" ON "public"."invitations"("email", "status");

-- CreateIndex
CREATE INDEX "invitations_type_status_idx" ON "public"."invitations"("type", "status");

-- CreateIndex
CREATE INDEX "invitations_expiresAt_idx" ON "public"."invitations"("expiresAt");

-- CreateIndex
CREATE INDEX "constellation_invitations_constellationId_status_idx" ON "public"."constellation_invitations"("constellationId", "status");

-- CreateIndex
CREATE INDEX "constellation_invitations_email_idx" ON "public"."constellation_invitations"("email");

-- CreateIndex
CREATE INDEX "comments_postId_status_idx" ON "public"."comments"("postId", "status");

-- CreateIndex
CREATE INDEX "comments_authorId_idx" ON "public"."comments"("authorId");

-- CreateIndex
CREATE INDEX "comments_parentId_idx" ON "public"."comments"("parentId");

-- CreateIndex
CREATE INDEX "comments_createdAt_idx" ON "public"."comments"("createdAt");

-- CreateIndex
CREATE INDEX "organizations_type_isActive_idx" ON "public"."organizations"("type", "isActive");

-- CreateIndex
CREATE INDEX "organizations_reputationScore_idx" ON "public"."organizations"("reputationScore");

-- CreateIndex
CREATE INDEX "organizations_isVerified_idx" ON "public"."organizations"("isVerified");

-- CreateIndex
CREATE INDEX "project_members_projectId_role_idx" ON "public"."project_members"("projectId", "role");

-- CreateIndex
CREATE INDEX "project_members_professionalId_isActive_idx" ON "public"."project_members"("professionalId", "isActive");

-- CreateIndex
CREATE UNIQUE INDEX "project_members_projectId_professionalId_key" ON "public"."project_members"("projectId", "professionalId");

-- CreateIndex
CREATE INDEX "projects_constellationId_status_idx" ON "public"."projects"("constellationId", "status");

-- CreateIndex
CREATE INDEX "projects_phase_status_idx" ON "public"."projects"("phase", "status");

-- CreateIndex
CREATE INDEX "projects_type_category_idx" ON "public"."projects"("type", "category");

-- CreateIndex
CREATE INDEX "projects_tags_idx" ON "public"."projects"("tags");

-- CreateIndex
CREATE UNIQUE INDEX "projects_constellationId_slug_key" ON "public"."projects"("constellationId", "slug");

-- AddForeignKey
ALTER TABLE "public"."professionals" ADD CONSTRAINT "professionals_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "public"."organizations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."projects" ADD CONSTRAINT "projects_constellationId_fkey" FOREIGN KEY ("constellationId") REFERENCES "public"."constellations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."constellation_organizations" ADD CONSTRAINT "constellation_organizations_constellationId_fkey" FOREIGN KEY ("constellationId") REFERENCES "public"."constellations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."constellation_organizations" ADD CONSTRAINT "constellation_organizations_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "public"."organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."constellation_professionals" ADD CONSTRAINT "constellation_professionals_constellationId_fkey" FOREIGN KEY ("constellationId") REFERENCES "public"."constellations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."constellation_professionals" ADD CONSTRAINT "constellation_professionals_professionalId_fkey" FOREIGN KEY ("professionalId") REFERENCES "public"."professionals"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."project_organizations" ADD CONSTRAINT "project_organizations_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "public"."projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."project_organizations" ADD CONSTRAINT "project_organizations_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "public"."organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."project_members" ADD CONSTRAINT "project_members_professionalId_fkey" FOREIGN KEY ("professionalId") REFERENCES "public"."professionals"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."posts" ADD CONSTRAINT "posts_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "public"."professionals"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."posts" ADD CONSTRAINT "posts_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "public"."projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."posts" ADD CONSTRAINT "posts_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "public"."organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."comments" ADD CONSTRAINT "comments_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "public"."comments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."comments" ADD CONSTRAINT "comments_postId_fkey" FOREIGN KEY ("postId") REFERENCES "public"."posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."comments" ADD CONSTRAINT "comments_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "public"."professionals"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."likes" ADD CONSTRAINT "likes_postId_fkey" FOREIGN KEY ("postId") REFERENCES "public"."posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."likes" ADD CONSTRAINT "likes_professionalId_fkey" FOREIGN KEY ("professionalId") REFERENCES "public"."professionals"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."comment_likes" ADD CONSTRAINT "comment_likes_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "public"."comments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."comment_likes" ADD CONSTRAINT "comment_likes_professionalId_fkey" FOREIGN KEY ("professionalId") REFERENCES "public"."professionals"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."shares" ADD CONSTRAINT "shares_postId_fkey" FOREIGN KEY ("postId") REFERENCES "public"."posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."shares" ADD CONSTRAINT "shares_sharedById_fkey" FOREIGN KEY ("sharedById") REFERENCES "public"."professionals"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."follows" ADD CONSTRAINT "follows_followerId_fkey" FOREIGN KEY ("followerId") REFERENCES "public"."professionals"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."follows" ADD CONSTRAINT "follows_followingId_fkey" FOREIGN KEY ("followingId") REFERENCES "public"."professionals"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."lessons_learned" ADD CONSTRAINT "lessons_learned_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "public"."projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."lessons_learned" ADD CONSTRAINT "lessons_learned_contributorId_fkey" FOREIGN KEY ("contributorId") REFERENCES "public"."professionals"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."lessons_learned" ADD CONSTRAINT "lessons_learned_postId_fkey" FOREIGN KEY ("postId") REFERENCES "public"."posts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."lesson_applications" ADD CONSTRAINT "lesson_applications_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "public"."lessons_learned"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."lesson_applications" ADD CONSTRAINT "lesson_applications_appliedById_fkey" FOREIGN KEY ("appliedById") REFERENCES "public"."professionals"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."innovations" ADD CONSTRAINT "innovations_originProjectId_fkey" FOREIGN KEY ("originProjectId") REFERENCES "public"."projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."innovations" ADD CONSTRAINT "innovations_innovatorId_fkey" FOREIGN KEY ("innovatorId") REFERENCES "public"."professionals"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."innovations" ADD CONSTRAINT "innovations_postId_fkey" FOREIGN KEY ("postId") REFERENCES "public"."posts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."project_dependencies" ADD CONSTRAINT "project_dependencies_dependentId_fkey" FOREIGN KEY ("dependentId") REFERENCES "public"."projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."project_dependencies" ADD CONSTRAINT "project_dependencies_requiredId_fkey" FOREIGN KEY ("requiredId") REFERENCES "public"."projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."milestones" ADD CONSTRAINT "milestones_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "public"."projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."expertise_areas" ADD CONSTRAINT "expertise_areas_professionalId_fkey" FOREIGN KEY ("professionalId") REFERENCES "public"."professionals"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."organization_collaborations" ADD CONSTRAINT "organization_collaborations_orgAId_fkey" FOREIGN KEY ("orgAId") REFERENCES "public"."organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."organization_collaborations" ADD CONSTRAINT "organization_collaborations_orgBId_fkey" FOREIGN KEY ("orgBId") REFERENCES "public"."organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."innovation_adoptions" ADD CONSTRAINT "innovation_adoptions_innovationId_fkey" FOREIGN KEY ("innovationId") REFERENCES "public"."innovations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."innovation_adoptions" ADD CONSTRAINT "innovation_adoptions_adoptedById_fkey" FOREIGN KEY ("adoptedById") REFERENCES "public"."professionals"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."innovation_collaborators" ADD CONSTRAINT "innovation_collaborators_innovationId_fkey" FOREIGN KEY ("innovationId") REFERENCES "public"."innovations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."innovation_collaborators" ADD CONSTRAINT "innovation_collaborators_professionalId_fkey" FOREIGN KEY ("professionalId") REFERENCES "public"."professionals"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."mentorships" ADD CONSTRAINT "mentorships_mentorId_fkey" FOREIGN KEY ("mentorId") REFERENCES "public"."professionals"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."mentorships" ADD CONSTRAINT "mentorships_menteeId_fkey" FOREIGN KEY ("menteeId") REFERENCES "public"."professionals"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."achievements" ADD CONSTRAINT "achievements_professionalId_fkey" FOREIGN KEY ("professionalId") REFERENCES "public"."professionals"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."risk_factors" ADD CONSTRAINT "risk_factors_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "public"."projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."risk_factors" ADD CONSTRAINT "risk_factors_identifiedBy_fkey" FOREIGN KEY ("identifiedBy") REFERENCES "public"."professionals"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."attachments" ADD CONSTRAINT "attachments_uploadedById_fkey" FOREIGN KEY ("uploadedById") REFERENCES "public"."professionals"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."attachments" ADD CONSTRAINT "attachments_postId_fkey" FOREIGN KEY ("postId") REFERENCES "public"."posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."lesson_attachments" ADD CONSTRAINT "lesson_attachments_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "public"."lessons_learned"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."lesson_attachments" ADD CONSTRAINT "lesson_attachments_uploadedBy_fkey" FOREIGN KEY ("uploadedBy") REFERENCES "public"."professionals"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."innovation_attachments" ADD CONSTRAINT "innovation_attachments_innovationId_fkey" FOREIGN KEY ("innovationId") REFERENCES "public"."innovations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."innovation_attachments" ADD CONSTRAINT "innovation_attachments_uploadedBy_fkey" FOREIGN KEY ("uploadedBy") REFERENCES "public"."professionals"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."invitations" ADD CONSTRAINT "invitations_invitedById_fkey" FOREIGN KEY ("invitedById") REFERENCES "public"."professionals"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."invitations" ADD CONSTRAINT "invitations_invitedUserId_fkey" FOREIGN KEY ("invitedUserId") REFERENCES "public"."professionals"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."invitations" ADD CONSTRAINT "invitations_organizationSenderId_fkey" FOREIGN KEY ("organizationSenderId") REFERENCES "public"."organizations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."constellation_invitations" ADD CONSTRAINT "constellation_invitations_constellationId_fkey" FOREIGN KEY ("constellationId") REFERENCES "public"."constellations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."constellation_invitations" ADD CONSTRAINT "constellation_invitations_invitedById_fkey" FOREIGN KEY ("invitedById") REFERENCES "public"."professionals"("id") ON DELETE SET NULL ON UPDATE CASCADE;
