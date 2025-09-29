import { Field, ObjectType } from "@nestjs/graphql";
import { Professional } from "../../professional/entities/professional.entity";

@ObjectType()
export class AuthPayload {
    @Field()
    access_token: string; // Corregido: era "accesToken"

    @Field(() => Professional)
    user: Professional; // Mantener "user" para claridad semántica
}