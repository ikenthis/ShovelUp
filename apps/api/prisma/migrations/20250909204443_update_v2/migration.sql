/*
  Warnings:

  - The `phase` column on the `projects` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `password` to the `professionals` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."ProjectPhaseEnum" AS ENUM ('INITIATION', 'PLANNING', 'DESIGN_CONCEPTUAL', 'DESIGN_SCHEMATIC', 'DESIGN_DEVELOPMENT', 'CONSTRUCTION_DOCUMENTS', 'PROCUREMENT', 'CONSTRUCTION', 'COMMISSIONING', 'HANDOVER');

-- CreateEnum
CREATE TYPE "public"."TaskStatus" AS ENUM ('TODO', 'IN_PROGRESS', 'BLOCKED', 'WAITING_FOR_REVIEW', 'IN_REVIEW', 'APPROVED', 'REJECTED', 'COMPLETED', 'CANCELLED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "public"."TaskPriority" AS ENUM ('VERY_LOW', 'LOW', 'MEDIUM', 'HIGH', 'URGENT', 'CRITICAL');

-- CreateEnum
CREATE TYPE "public"."PhaseStatus" AS ENUM ('PENDING', 'ACTIVE', 'ON_HOLD', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "public"."TaskDependencyType" AS ENUM ('FINISH_TO_START', 'START_TO_START', 'FINISH_TO_FINISH', 'START_TO_FINISH', 'BLOCKS', 'BLOCKED_BY');

-- CreateEnum
CREATE TYPE "public"."WatchLevel" AS ENUM ('ALL_UPDATES', 'IMPORTANT_ONLY', 'MENTIONS_ONLY', 'ASSIGNMENTS_ONLY');

-- AlterTable
ALTER TABLE "public"."posts" ADD COLUMN     "taskId" TEXT;

-- AlterTable
ALTER TABLE "public"."professionals" ADD COLUMN     "password" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."projects" DROP COLUMN "phase",
ADD COLUMN     "phase" "public"."ProjectPhaseEnum" NOT NULL DEFAULT 'PLANNING';

-- DropEnum
DROP TYPE "public"."ProjectPhase";

-- CreateTable
CREATE TABLE "public"."project_phases" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "status" "public"."PhaseStatus" NOT NULL DEFAULT 'PENDING',
    "progress" REAL NOT NULL DEFAULT 0,
    "budget" MONEY,
    "actualCost" MONEY NOT NULL DEFAULT 0,
    "projectId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,

    CONSTRAINT "project_phases_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."tasks" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "TaskStatus" "public"."TaskStatus" NOT NULL DEFAULT 'TODO',
    "TaskPriority" "public"."TaskPriority" NOT NULL DEFAULT 'MEDIUM',
    "startDate" TIMESTAMP(3),
    "dueDate" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "estimatedHours" REAL,
    "actualHours" REAL NOT NULL DEFAULT 0,
    "estimatedCost" REAL,
    "actualCost" REAL NOT NULL DEFAULT 0,
    "progress" REAL NOT NULL DEFAULT 0,
    "tags" TEXT[],
    "isBlocked" BOOLEAN NOT NULL DEFAULT false,
    "blockedReason" TEXT,
    "blockedSince" TIMESTAMP(3),
    "requiresApproval" BOOLEAN NOT NULL DEFAULT false,
    "isClientVisible" BOOLEAN NOT NULL DEFAULT false,
    "projectId" TEXT NOT NULL,
    "phaseId" TEXT,
    "assigneeId" TEXT,
    "createdById" TEXT NOT NULL,
    "parentTaskId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tasks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."task_dependencies" (
    "id" TEXT NOT NULL,
    "dependencyType" "public"."TaskDependencyType" NOT NULL DEFAULT 'FINISH_TO_START',
    "description" TEXT,
    "lagTime" REAL NOT NULL DEFAULT 0,
    "status" "public"."DependencyStatus" NOT NULL DEFAULT 'PENDING',
    "dependentId" TEXT NOT NULL,
    "requiredId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,

    CONSTRAINT "task_dependencies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."task_comments" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "parentId" TEXT,
    "isEdited" BOOLEAN NOT NULL DEFAULT false,
    "editedAt" TIMESTAMP(3),
    "taskId" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "task_comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."task_attachments" (
    "id" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "fileType" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "fileSize" INTEGER NOT NULL,
    "description" TEXT,
    "taskId" TEXT NOT NULL,
    "uploadedBy" TEXT NOT NULL,
    "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "task_attachments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."task_watchers" (
    "id" TEXT NOT NULL,
    "watchLevel" "public"."WatchLevel" NOT NULL DEFAULT 'ALL_UPDATES',
    "taskId" TEXT NOT NULL,
    "professionalId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "task_watchers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "project_phases_projectId_order_idx" ON "public"."project_phases"("projectId", "order");

-- CreateIndex
CREATE INDEX "project_phases_status_idx" ON "public"."project_phases"("status");

-- CreateIndex
CREATE INDEX "tasks_projectId_TaskStatus_idx" ON "public"."tasks"("projectId", "TaskStatus");

-- CreateIndex
CREATE INDEX "tasks_assigneeId_TaskStatus_idx" ON "public"."tasks"("assigneeId", "TaskStatus");

-- CreateIndex
CREATE INDEX "tasks_phaseId_idx" ON "public"."tasks"("phaseId");

-- CreateIndex
CREATE INDEX "tasks_parentTaskId_idx" ON "public"."tasks"("parentTaskId");

-- CreateIndex
CREATE INDEX "tasks_TaskStatus_TaskPriority_idx" ON "public"."tasks"("TaskStatus", "TaskPriority");

-- CreateIndex
CREATE INDEX "tasks_dueDate_idx" ON "public"."tasks"("dueDate");

-- CreateIndex
CREATE INDEX "tasks_tags_idx" ON "public"."tasks"("tags");

-- CreateIndex
CREATE INDEX "task_dependencies_dependencyType_idx" ON "public"."task_dependencies"("dependencyType");

-- CreateIndex
CREATE INDEX "task_dependencies_status_idx" ON "public"."task_dependencies"("status");

-- CreateIndex
CREATE UNIQUE INDEX "task_dependencies_dependentId_requiredId_key" ON "public"."task_dependencies"("dependentId", "requiredId");

-- CreateIndex
CREATE INDEX "task_comments_taskId_idx" ON "public"."task_comments"("taskId");

-- CreateIndex
CREATE INDEX "task_comments_authorId_idx" ON "public"."task_comments"("authorId");

-- CreateIndex
CREATE INDEX "task_comments_parentId_idx" ON "public"."task_comments"("parentId");

-- CreateIndex
CREATE INDEX "task_attachments_taskId_idx" ON "public"."task_attachments"("taskId");

-- CreateIndex
CREATE INDEX "task_attachments_uploadedBy_idx" ON "public"."task_attachments"("uploadedBy");

-- CreateIndex
CREATE INDEX "task_watchers_taskId_idx" ON "public"."task_watchers"("taskId");

-- CreateIndex
CREATE INDEX "task_watchers_professionalId_idx" ON "public"."task_watchers"("professionalId");

-- CreateIndex
CREATE UNIQUE INDEX "task_watchers_taskId_professionalId_key" ON "public"."task_watchers"("taskId", "professionalId");

-- CreateIndex
CREATE INDEX "posts_taskId_idx" ON "public"."posts"("taskId");

-- CreateIndex
CREATE INDEX "projects_phase_status_idx" ON "public"."projects"("phase", "status");

-- AddForeignKey
ALTER TABLE "public"."project_phases" ADD CONSTRAINT "project_phases_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "public"."projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."tasks" ADD CONSTRAINT "tasks_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "public"."projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."tasks" ADD CONSTRAINT "tasks_phaseId_fkey" FOREIGN KEY ("phaseId") REFERENCES "public"."project_phases"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."tasks" ADD CONSTRAINT "tasks_assigneeId_fkey" FOREIGN KEY ("assigneeId") REFERENCES "public"."professionals"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."tasks" ADD CONSTRAINT "tasks_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "public"."professionals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."tasks" ADD CONSTRAINT "tasks_parentTaskId_fkey" FOREIGN KEY ("parentTaskId") REFERENCES "public"."tasks"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."task_dependencies" ADD CONSTRAINT "task_dependencies_dependentId_fkey" FOREIGN KEY ("dependentId") REFERENCES "public"."tasks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."task_dependencies" ADD CONSTRAINT "task_dependencies_requiredId_fkey" FOREIGN KEY ("requiredId") REFERENCES "public"."tasks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."task_comments" ADD CONSTRAINT "task_comments_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "public"."task_comments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."task_comments" ADD CONSTRAINT "task_comments_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "public"."tasks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."task_comments" ADD CONSTRAINT "task_comments_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "public"."professionals"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."task_attachments" ADD CONSTRAINT "task_attachments_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "public"."tasks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."task_attachments" ADD CONSTRAINT "task_attachments_uploadedBy_fkey" FOREIGN KEY ("uploadedBy") REFERENCES "public"."professionals"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."task_watchers" ADD CONSTRAINT "task_watchers_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "public"."tasks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."task_watchers" ADD CONSTRAINT "task_watchers_professionalId_fkey" FOREIGN KEY ("professionalId") REFERENCES "public"."professionals"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."posts" ADD CONSTRAINT "posts_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "public"."tasks"("id") ON DELETE CASCADE ON UPDATE CASCADE;
