import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Specification {
  @Field(() => ID)
  id!: string;

  @Field()
  name!: string;

  @Field()
  value!: string;
}