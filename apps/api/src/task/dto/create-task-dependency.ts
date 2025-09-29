import { InputType, Field, ID, Float } from '@nestjs/graphql';
import { IsString, IsOptional, IsEnum, IsNumber, Min } from 'class-validator';
import { TaskDependencyType } from '../../common/enums';

@InputType()
export class CreateTaskDependencyInput {
    @Field(() => TaskDependencyType)
    @IsEnum(TaskDependencyType)
    type: TaskDependencyType;

    @Field({ nullable: true }) // in days
    @IsOptional()
    @IsString()
    description?: string;

    @Field(() => Float, { defaultValue: 0 }) // in days
    @IsNumber()
    @Min(0)
    lagTime?: number;

    @Field(() => ID)
    @IsString()
    dependentId: string;

    @Field(() => ID)
    @IsString()
    requireId: string;    
}

@InputType()
export class UpdateTaskDependencyInput {
    @Field(() => ID)
    @IsString()
    id: string;

    @Field(() => TaskDependencyType, { nullable: true })	
    @IsOptional()
    @IsEnum(TaskDependencyType)
    dependencyType?: TaskDependencyType;

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    description?: string;

    @Field(() => Float, { nullable: true })
    @IsOptional()
    @IsNumber()
    @Min(0)
    lagTime?: number;
}