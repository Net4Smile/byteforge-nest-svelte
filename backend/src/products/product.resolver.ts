import { Query, Resolver, Args } from "@nestjs/graphql";
import { PrismaService } from "../prisma/prisma.service";
import { Product } from "./product.model";
import { Prisma } from "@prisma/client";

@Resolver()
export class ProductResolver {
  constructor(private db: PrismaService) { }

  @Query(() => Product, { nullable: true })
  async getProduct(
    @Args('id', { type: () => String }) id: string,
    @Args('getImage', { nullable: true, type: () => Boolean }) getImage?: boolean,
    @Args('getSpecs', { nullable: true, type: () => Boolean }) getSpecs?: boolean,
    @Args('getCategories', { nullable: true, type: () => Boolean }) getCategories?: boolean
  ) {
    const image = getImage ?? false;
    const specs = getSpecs ?? false;
    const categories = getCategories ?? false;

    const productQuery: Prisma.ProductFindUniqueArgs = {
      where: { id },
      include: {
        image,
        specs,
        categories
      }
    } as const;

    try {
      const product: Prisma.ProductGetPayload<typeof productQuery> = await this.db.product.findUnique(productQuery);

      if (!product) {
        return null;
      }

      return product as Product;
    } catch (e) {
      return null;
    }
  }

  @Query(() => [Product])
  async getProducts(
    @Args('getCategories', { nullable: true, type: () => Boolean }) getCategories?: boolean,
    @Args('getSpecs', { nullable: true, type: () => Boolean }) getSpecs?: boolean,
    @Args('getImage', { nullable: true, type: () => Boolean }) getImage?: boolean
  ) {
    const image = getImage ?? false;
    const specs = getSpecs ?? false;
    const categories = getCategories ?? false;

    const productsQuery: Prisma.ProductFindManyArgs = {
      include: {
        image,
        specs,
        categories
      }
    } as const;

    try {
      const products: Prisma.ProductGetPayload<typeof productsQuery>[] = await this.db.product.findMany(productsQuery);

      if (!products) {
        return [];
      }

      return products;
    } catch (e) {
      return [];
    }
  }
}