/*
  Warnings:

  - You are about to drop the column `TaskPriority` on the `tasks` table. All the data in the column will be lost.
  - You are about to drop the column `TaskStatus` on the `tasks` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "public"."tasks_TaskStatus_TaskPriority_idx";

-- DropIndex
DROP INDEX "public"."tasks_assigneeId_TaskStatus_idx";

-- DropIndex
DROP INDEX "public"."tasks_projectId_TaskStatus_idx";

-- AlterTable
ALTER TABLE "public"."tasks" DROP COLUMN "TaskPriority",
DROP COLUMN "TaskStatus",
ADD COLUMN     "priority" "public"."TaskPriority" NOT NULL DEFAULT 'MEDIUM',
ADD COLUMN     "status" "public"."TaskStatus" NOT NULL DEFAULT 'TODO';

-- CreateIndex
CREATE INDEX "tasks_projectId_status_idx" ON "public"."tasks"("projectId", "status");

-- CreateIndex
CREATE INDEX "tasks_assigneeId_status_idx" ON "public"."tasks"("assigneeId", "status");

-- CreateIndex
CREATE INDEX "tasks_status_priority_idx" ON "public"."tasks"("status", "priority");
