import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Product } from "../products/product.model";
import { Subcategory } from "./subcategory.model";
import { Specification } from "../specification/specification.model";

@ObjectType()
export class Category {
  @Field(() => ID)
  id!: string;

  @Field()
  name!: string;

  @Field(() => [Product])
  products!: Product[];

  @Field(() => [Specification])
  specifications!: Specification[]

  @Field(() => [Subcategory])
  subcategories!: Subcategory[];
}