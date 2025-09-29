import { InputType, Field, ID, Int } from '@nestjs/graphql';
import { IsString, IsOptional, IsUrl, IsInt, Min } from 'class-validator';

@InputType()
export class CreateTaskAttachmentInput {
    @Field()
    @IsString()
    fileName: string;

    @Field()
    @IsUrl()
    fileUrl: string;

    @Field()
    @IsString()
    fileType: string;

    @Field()
    @IsString()
    mimeType: string;

    @Field(() => Int)
    @IsInt()
    @Min(1)
    fileSize: number;

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    description?: string;

    @Field(() => ID)
    @IsString()
    taskId: string;
}