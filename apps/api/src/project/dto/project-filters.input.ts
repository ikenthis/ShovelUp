// apps/api/src/project/dto/project-filters.input.ts
import { InputType, Field, Float, Int } from '@nestjs/graphql';
import { IsString, IsOptional, IsEnum, IsBoolean, IsArray, IsNumber, Min, Max } from 'class-validator';
import { 
  ProjectType, 
  ProjectCategory,
  ProjectPhase as ProjectPhaseEnum, 
  ProjectStatus,
  Priority,
  BudgetStatus
} from '../../common/enums';

@InputType()
export class ProjectFiltersInput {
  // 🔍 BÚSQUEDA GENERAL
  @Field({ nullable: true, description: 'Search in name, description, and tags' })
  @IsOptional()
  @IsString()
  search?: string;

  // 📋 FILTROS POR CATEGORÍAS (Arrays para múltiples valores)
  @Field(() => [ProjectType], { nullable: true, description: 'Filter by project types' })
  @IsOptional()
  @IsArray()
  types?: ProjectType[];

  @Field(() => [ProjectCategory], { nullable: true, description: 'Filter by project categories' })
  @IsOptional()
  @IsArray()
  categories?: ProjectCategory[];

  @Field(() => [ProjectPhaseEnum], { nullable: true, description: 'Filter by project phases' })
  @IsOptional()
  @IsArray()
  phases?: ProjectPhaseEnum[];

  @Field(() => [ProjectStatus], { nullable: true, description: 'Filter by project status' })
  @IsOptional()
  @IsArray()
  statuses?: ProjectStatus[];

  @Field(() => [Priority], { nullable: true, description: 'Filter by priority levels' })
  @IsOptional()
  @IsArray()
  priorities?: Priority[];

  @Field(() => [BudgetStatus], { nullable: true, description: 'Filter by budget status' })
  @IsOptional()
  @IsArray()
  budgetStatuses?: BudgetStatus[];

  // 🏷️ TAGS Y METADATA
  @Field(() => [String], { nullable: true, description: 'Filter by tags' })
  @IsOptional()
  @IsArray()
  tags?: string[];

  // 🏢 CONTEXTO Y PERMISOS
  @Field({ nullable: true, description: 'Filter by constellation ID' })
  @IsOptional()
  @IsString()
  constellationId?: string;

  @Field({ nullable: true, description: 'Filter by creator ID' })
  @IsOptional()
  @IsString()
  createdBy?: string;

  @Field({ nullable: true, description: 'Show only public projects' })
  @IsOptional()
  @IsBoolean()
  isPublic?: boolean;

  @Field({ nullable: true, description: 'Show only collaborative projects' })
  @IsOptional()
  @IsBoolean()
  allowsCollaboration?: boolean;

  // 📊 RANGOS DE PROGRESO
  @Field(() => Float, { nullable: true, description: 'Minimum progress percentage (0-100)' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  minProgress?: number;

  @Field(() => Float, { nullable: true, description: 'Maximum progress percentage (0-100)' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  maxProgress?: number;

  // 💰 RANGOS DE PRESUPUESTO
  @Field(() => Float, { nullable: true, description: 'Minimum budget amount' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  minBudget?: number;

  @Field(() => Float, { nullable: true, description: 'Maximum budget amount' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  maxBudget?: number;

  // 📅 RANGOS DE FECHAS
  @Field({ nullable: true, description: 'Projects created after this date' })
  @IsOptional()
  createdAfter?: Date;

  @Field({ nullable: true, description: 'Projects created before this date' })
  @IsOptional()
  createdBefore?: Date;

  @Field({ nullable: true, description: 'Projects starting after this date' })
  @IsOptional()
  startDateAfter?: Date;

  @Field({ nullable: true, description: 'Projects starting before this date' })
  @IsOptional()
  startDateBefore?: Date;

  @Field({ nullable: true, description: 'Projects with due date after this date' })
  @IsOptional()
  dueDateAfter?: Date;

  @Field({ nullable: true, description: 'Projects with due date before this date' })
  @IsOptional()
  dueDateBefore?: Date;

  // 🏆 MÉTRICAS DE CALIDAD
  @Field(() => Float, { nullable: true, description: 'Minimum quality score (0-1)' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(1)
  minQualityScore?: number;

  @Field(() => Float, { nullable: true, description: 'Minimum safety score (0-1)' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(1)
  minSafetyScore?: number;

  @Field(() => Int, { nullable: true, description: 'Maximum number of incidents' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  maxIncidentCount?: number;

  // 🎯 FILTROS DE EQUIPO
  @Field({ nullable: true, description: 'Filter projects where user is a member' })
  @IsOptional()
  @IsBoolean()
  onlyMyProjects?: boolean;

  @Field(() => Int, { nullable: true, description: 'Minimum team size' })
  @IsOptional()
  @IsNumber()
  @Min(1)
  minTeamSize?: number;

  @Field(() => Int, { nullable: true, description: 'Maximum team size' })
  @IsOptional()
  @IsNumber()
  @Min(1)
  maxTeamSize?: number;

  // 📍 UBICACIÓN
  @Field({ nullable: true, description: 'Filter by location (city, country, etc.)' })
  @IsOptional()
  @IsString()
  location?: string;

  // 🎨 FILTROS AVANZADOS
  @Field({ nullable: true, description: 'Show only projects with active risks' })
  @IsOptional()
  @IsBoolean()
  hasActiveRisks?: boolean;

  @Field({ nullable: true, description: 'Show only projects with recent activity (last 7 days)' })
  @IsOptional()
  @IsBoolean()
  hasRecentActivity?: boolean;

  @Field({ nullable: true, description: 'Show only overdue projects' })
  @IsOptional()
  @IsBoolean()
  isOverdue?: boolean;

  // 📄 PAGINACIÓN Y ORDENAMIENTO
  @Field(() => Int, { nullable: true, description: 'Number of items per page (default: 20)' })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(100)
  limit?: number;

  @Field(() => Int, { nullable: true, description: 'Page offset (default: 0)' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  offset?: number;

  @Field({ nullable: true, description: 'Sort by field (name, createdAt, progress, etc.)' })
  @IsOptional()
  @IsString()
  sortBy?: string;

  @Field({ nullable: true, description: 'Sort direction (asc or desc)' })
  @IsOptional()
  @IsString()
  sortOrder?: 'asc' | 'desc';
}