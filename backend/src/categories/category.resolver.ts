import { Query, Resolver, Args } from "@nestjs/graphql";
import { PrismaService } from "../prisma/prisma.service";
import { Category } from "./category.model";
import { Prisma } from "@prisma/client";

@Resolver()
export class CategoryResolver {
  constructor(private db: PrismaService) { }

  @Query(() => Category, { nullable: true })
  async getCategory(
    @Args('id', { type: () => String }) id: string,
    @Args('getProducts', { nullable: true, type: () => Boolean }) getProducts?: boolean,
  ) {
    const products = getProducts ?? false;

    const categoryQuery: Prisma.CategoryFindUniqueArgs = {
      where: { id },
      include: {
        products,
        subcategories: true
      }
    } as const;

    try {
      const category: Prisma.CategoryGetPayload<typeof categoryQuery> = await this.db.category.findUnique(categoryQuery);

      if (!category) {
        return null;
      }

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
    const products = getProducts ?? false;
    const specifications = getSpecifications ?? false;

    const categoryQuery: Prisma.CategoryFindManyArgs = {
      include: {
        products: products ? {
          include: {
            specs: specifications
          }
        } : false
      }
    } as const;

    try {
      const categories: Prisma.CategoryGetPayload<typeof categoryQuery>[] = await this.db.category.findMany(categoryQuery);

      if (!categories) {
        return [];
      }

      return categories;
    } catch (e) {
      return [];
    }
  }
}


