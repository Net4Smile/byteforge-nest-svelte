import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Product } from "../products/product.model";

@ObjectType()
export class Category {
  @Field(() => ID)
  id!: string;

  @Field()
  name!: string;

  @Field(() => [Product])
  products!: Product[];

  @Field(() => Boolean)
  isParent!: boolean;
}