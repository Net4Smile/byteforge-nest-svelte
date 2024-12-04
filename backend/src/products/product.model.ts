import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Category } from '../categories/category.model';
import { Specification } from '../specification/specification.model';

@ObjectType()
class ProductImage {
  @Field(() => ID)
  id!: string;

  @Field()
  src!: string;

  @Field({ nullable: true })
  alt?: string;

  @Field()
  productId!: string;
}

@ObjectType()
export class Product {
  @Field(() => ID)
  id!: string;

  @Field()
  name!: string;

  @Field()
  description!: string;

  @Field()
  price!: string;

  @Field(() => [ProductImage])
  image!: ProductImage[];

  @Field(() => [Category])
  categories!: Category[];

  @Field(() => [Specification])
  specifications!: Specification[];
}