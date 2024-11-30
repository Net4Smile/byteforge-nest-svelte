import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
class ProductImage {
  @Field()
  src!: string;

  @Field()
  alt!: string;
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

  @Field(() => ProductImage)
  image!: ProductImage;
}