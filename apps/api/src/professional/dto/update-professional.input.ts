import { CreateProfessionalInput } from './create-professional.input';
import { InputType, Field, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateProfessionalInput extends PartialType(CreateProfessionalInput) {
  @Field(() => ID)
  id: string;
}