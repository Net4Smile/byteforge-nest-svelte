import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Product } from "../products/product.model";

@ObjectType()
export class Specification {
  @Field(() => ID)
  id!: string;

  @Field()
  name!: string;

  @Field()
  value!: string;

  @Field(() => [Product])
  products!: Product[];
}