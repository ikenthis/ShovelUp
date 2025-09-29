import { InputType, Field, ID } from '@nestjs/graphql';
import { IsString, IsEnum } from 'class-validator';
import { WatchLevel } from '../../common/enums';

@InputType()
export class CreateTaskWatcherInput {
  @Field(() => WatchLevel, { defaultValue: WatchLevel.ALL_UPDATES })
  @IsEnum(WatchLevel)
  watchLevel: WatchLevel = WatchLevel.ALL_UPDATES;

  @Field(() => ID)
  @IsString()
  taskId: string;

  @Field(() => ID)
  @IsString()
  professionalId: string;
}

@InputType()
export class UpdateTaskWatcherInput {
  @Field(() => ID)
  @IsString()
  id: string;

  @Field(() => WatchLevel)
  @IsEnum(WatchLevel)
  watchLevel: WatchLevel;
}