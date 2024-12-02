import { ObjectType, Field, ID } from '@nestjs/graphql';

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
class Category {
  @Field(() => ID)
  id!: string;

  @Field()
  name!: string;
}

@ObjectType()
class Spec {
  @Field(() => ID)
  id!: string;

  @Field()
  name!: string;

  @Field()
  value!: string;
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

  @Field(() => [Spec])
  specs!: Spec[];
}