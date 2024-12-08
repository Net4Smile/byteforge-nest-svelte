import { Query, Resolver, Args } from "@nestjs/graphql";
import { PrismaService } from "../prisma/prisma.service";
import { Specification } from "./specification.model";
import { Prisma } from "@prisma/client";
import { RedisService } from "../redis/redis.service";

@Resolver()
export class SpecificationResolver {
  constructor(private db: PrismaService, private cache: RedisService) { }

  @Query(() => Specification, { nullable: true })
  async getSpecification(
    @Args('id', { type: () => String }) id: string,
    @Args('getProducts', { nullable: true, type: () => Boolean }) getProducts?: boolean,
    @Args('getProductsCategories', { nullable: true, type: () => Boolean }) getProductsCategories?: boolean,
  ) {
    const cacheKey = `specification:${id}:${getProducts}:${getProductsCategories}`;

    const cacheHit = await this.cache.get(cacheKey);

    if (cacheHit) {
      return JSON.parse(cacheHit);
    }

    const specificationQuery: Prisma.SpecificationFindUniqueArgs = {
      where: { id },
      include: {
        products: getProducts ? {
          include: {
            categories: getProductsCategories
          }
        } : false
      }
    } as const;

    try {
      const specification: Prisma.SpecificationGetPayload<typeof specificationQuery> = await this.db.specification.findUnique(specificationQuery);

      if (!specification) {
        return null;
      }

      await this.cache.set(cacheKey, JSON.stringify(specification), 600);

      return specification;
    } catch (e) {
      return null;
    }
  }

  @Query(() => [Specification])
  async getSpecifications(
    @Args('getProducts', { nullable: true, type: () => Boolean }) getProducts?: boolean,
    @Args('getProductsCategories', { nullable: true, type: () => Boolean }) getProductsCategories?: boolean,

  ) {
    const cacheKey = `specifications:${getProducts}:${getProductsCategories}`;

    const cacheHit = await this.cache.get(cacheKey);

    if (cacheHit) {
      return JSON.parse(cacheHit);
    }

    const specificationQuery: Prisma.SpecificationFindManyArgs = {
      include: {
        products: getProducts ? {
          include: {
            categories: getProductsCategories
          }
        } : false
      },
    } as const;

    try {
      const specifications: Prisma.SpecificationGetPayload<typeof specificationQuery>[] = await this.db.specification.findMany(specificationQuery);

      if (!specifications) {
        return [];
      }

      await this.cache.set(cacheKey, JSON.stringify(specifications), 600);

      return specifications;
    } catch (e) {
      return [];
    }
  }
}


