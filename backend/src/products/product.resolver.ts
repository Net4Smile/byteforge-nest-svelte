import { RedisService } from './../redis/redis.service';
import { Query, Resolver, Args } from "@nestjs/graphql";
import { PrismaService } from "../prisma/prisma.service";
import { Product } from "./product.model";
import { Prisma } from "@prisma/client";

@Resolver()
export class ProductResolver {
  constructor(private db: PrismaService, private cache: RedisService) { }

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

    const cacheKey = `product:${id}:${image}:${specs}:${categories}`;

    const cacheHit = await this.cache.get(cacheKey);

    if (cacheHit) {
      return JSON.parse(cacheHit);
    }

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

      await this.cache.set(cacheKey, JSON.stringify(product), 600);

      return product;
    } catch (e) {
      return null;
    }
  }

  @Query(() => [Product])
  async getProducts(
    @Args('getCategories', { nullable: true, type: () => Boolean }) getCategories?: boolean,
    @Args('getSpecs', { nullable: true, type: () => Boolean }) getSpecs?: boolean,
    @Args('getImage', { nullable: true, type: () => Boolean }) getImage?: boolean,
    @Args('categoryName', { nullable: true, type: () => String }) categoryName?: string,
    @Args("specificationName", { nullable: true, type: () => String }) specificationName?: string,
    @Args('after', { nullable: true, type: () => Number }) after?: number,
    @Args('limit', { nullable: true, type: () => Number }) limit?: number,
  ) {
    const image = getImage ?? false;
    const specs = getSpecs ?? false;
    const categories = getCategories ?? false;

    const cacheKey = `products:${categoryName}:${specificationName}:${image}:${specs}:${categories}:${after}:${limit}`;

    const cacheHit = await this.cache.get(cacheKey);

    if (cacheHit) {
      return JSON.parse(cacheHit);
    }

    if (categoryName && specificationName) {
      throw new Error('Cannot filter by both category and specification simultaneously');
    }

    const whereQuery: Prisma.ProductWhereInput = categoryName ? {
      OR: [
        {
          categories: {
            some: {
              name: {
                contains: categoryName,
                mode: 'insensitive'
              }
            }
          }
        },
        {
          categories: {
            some: {
              subcategories: {
                some: {
                  name: {
                    contains: categoryName,
                    mode: 'insensitive'
                  }
                }
              }
            }
          }
        }
      ]
    } : specificationName ? {
      specs: {
        some: {
          name: {
            contains: specificationName,
            mode: 'insensitive'
          }
        }
      }
    } : undefined;

    const productsQuery: Prisma.ProductFindManyArgs = {
      where: whereQuery,
      include: {
        image,
        specs,
        categories
      },
      skip: after,
      take: limit
    } as const;

    try {
      const products: Prisma.ProductGetPayload<typeof productsQuery>[] = await this.db.product.findMany(productsQuery);

      if (!products) {
        return [];
      }

      await this.cache.set(cacheKey, JSON.stringify(products), 600);

      return products;
    } catch (e) {
      return [];
    }
  }
}