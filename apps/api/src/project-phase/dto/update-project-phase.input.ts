import { CreateProjectPhaseInput } from './create-project-phase.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateProjectPhaseInput extends PartialType(CreateProjectPhaseInput) {
  @Field(() => Int)
  id: number;
}
