import { Query, Resolver, Args } from "@nestjs/graphql";
import { PrismaService } from "../prisma/prisma.service";
import { Category } from "./category.model";
import { Prisma } from "@prisma/client";
import { RedisService } from "../redis/redis.service";

@Resolver()
export class CategoryResolver {
  constructor(private db: PrismaService, private cache: RedisService) { }

  @Query(() => Category, { nullable: true })
  async getCategory(
    @Args('id', { type: () => String }) id: string,
    @Args('getProducts', { nullable: true, type: () => Boolean }) getProducts?: boolean,
  ) {
    const cacheKey = `category:${id}:${getProducts}`;

    const cacheHit = await this.cache.get(cacheKey);

    if (cacheHit) {
      return JSON.parse(cacheHit);
    }

    const categoryQuery: Prisma.CategoryFindUniqueArgs = {
      where: { id },
      include: {
        products: getProducts,
        subcategories: true
      }
    } as const;

    try {
      const category: Prisma.CategoryGetPayload<typeof categoryQuery> = await this.db.category.findUnique(categoryQuery);

      if (!category) {
        return null;
      }

      await this.cache.set(cacheKey, JSON.stringify(category), 600);

      return category;
    } catch (e) {
      return null;
    }
  }

  @Query(() => [Category])
  async getCategories(
    @Args('getProducts', { nullable: true, type: () => Boolean }) getProducts?: boolean,
    @Args('getSpecifications', { nullable: true, type: () => Boolean }) getSpecifications?: boolean,
  ) {

    const cacheKey = `categories:${getProducts}:${getSpecifications}`;

    const cacheHit = await this.cache.get(cacheKey);

    if (cacheHit) {
      return JSON.parse(cacheHit);
    }

    const categoryQuery: Prisma.CategoryFindManyArgs = {
      include: {
        products: getProducts ? {
          include: {
            specs: getSpecifications
          }
        } : false,
        subcategories: true
      }
    } as const;

    try {
      const categories: Prisma.CategoryGetPayload<typeof categoryQuery>[] = await this.db.category.findMany(categoryQuery);

      if (!categories) {
        return [];
      }

      await this.cache.set(cacheKey, JSON.stringify(categories), 600);

      return categories;
    } catch (e) {
      return [];
    }
  }
}


