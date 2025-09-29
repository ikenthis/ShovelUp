import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateProjectPhaseInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
