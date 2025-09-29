import { InputType, Field, ID } from '@nestjs/graphql';
import { IsString, IsOptional, IsNotEmpty, MaxLength } from 'class-validator';

@InputType()
export class CreateTaskCommentInput {
    @Field()
    @IsString()
    @IsNotEmpty()
    @MaxLength(2000)
    content: string;


    @Field(() => ID)
    @IsString()
    taskId: string;

    @Field(() => ID, { nullable: true })
    @IsOptional()
    @IsString()
    parentId?: string;
}

@InputType()
export class UpdateTaskCommentInput {

    @Field(() => ID)
    @IsString()
    taskId: string;

    @Field()
    @IsString()
    @IsNotEmpty()
    @MaxLength(2000)
    content: string;
}