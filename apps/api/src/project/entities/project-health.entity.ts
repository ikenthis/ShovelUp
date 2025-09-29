// Supporting GraphQL Types for the health dashboard
import { ObjectType, Field, Float, Int, ID } from '@nestjs/graphql';

@ObjectType()
export class ProjectOverview {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  phase: string;

  @Field(() => Float)
  progress: number;

  @Field()
  status: string;

  @Field()
  startDate: Date;

  @Field()
  estimatedEnd: Date;

  @Field({ nullable: true })
  actualEnd?: Date;
}

@ObjectType()
export class HealthMetrics {
  @Field(() => Int)
  score: number;

  @Field()
  status: string;

  @Field()
  trend: string;

  @Field()
  lastUpdated: Date;
}

@ObjectType()
export class TaskMetrics {
  @Field(() => Int)
  total: number;

  @Field(() => Int)
  completed: number;

  @Field(() => Int)
  inProgress: number;

  @Field(() => Int)
  todo: number;

  @Field(() => Int)
  blocked: number;

  @Field(() => Int)
  overdue: number;

  @Field(() => Int)
  completionRate: number;
}

@ObjectType()
export class MilestoneMetrics {
  @Field(() => Int)
  total: number;

  @Field(() => Int)
  completed: number;

  @Field(() => Int)
  pending: number;

  @Field(() => Int)
  overdue: number;

  @Field(() => Int)
  completionRate: number;
}

@ObjectType()
export class BudgetMetrics {
  @Field(() => Float)
  planned: number;

  @Field(() => Float)
  spent: number;

  @Field(() => Float)
  remaining: number;

  @Field(() => Int)
  utilization: number;

  @Field()
  status: string;

  @Field(() => Float)
  variance: number;
}

@ObjectType()
export class ScheduleMetrics {
  @Field(() => Int)
  performance: number;

  @Field(() => Int)
  daysElapsed: number;

  @Field(() => Int)
  estimatedDaysRemaining: number;

  @Field(() => Boolean)
  isOnTrack: boolean;
}

@ObjectType()
export class TeamMetrics {
  @Field(() => Int)
  activeMembers: number;

  @Field(() => Float)
  totalHours: number;

  @Field(() => Int)
  averageHoursPerMember: number;

  @Field(() => Int)
  recentActivity: number;

  @Field()
  activityLevel: string;
}

@ObjectType()
export class RiskMetrics {
  @Field(() => Int)
  active: number;

  @Field()
  level: string;

  @Field()
  impact: string;
}

@ObjectType()
export class QualityMetrics {
  @Field(() => Float)
  score: number;

  @Field(() => Int)
  incidentCount: number;

  @Field(() => Float)
  safetyScore: number;
}

@ObjectType()
export class ProjectHealthDashboard {
  @Field(() => ProjectOverview)
  project: ProjectOverview;

  @Field(() => HealthMetrics)
  health: HealthMetrics;

  @Field(() => TaskMetrics)
  tasks: TaskMetrics;

  @Field(() => MilestoneMetrics)
  milestones: MilestoneMetrics;

  @Field(() => BudgetMetrics)
  budget: BudgetMetrics;

  @Field(() => ScheduleMetrics)
  schedule: ScheduleMetrics;

  @Field(() => TeamMetrics)
  team: TeamMetrics;

  @Field(() => RiskMetrics)
  risks: RiskMetrics;

  @Field(() => QualityMetrics)
  quality: QualityMetrics;
}