import { Query, Resolver, Args } from "@nestjs/graphql";
import { PrismaService } from "../prisma/prisma.service";
import { Specification } from "./specification.model";
import { Prisma } from "@prisma/client";

@Resolver()
export class SpecificationResolver {
  constructor(private db: PrismaService) { }

  @Query(() => Specification, { nullable: true })
  async getSpecification(
    @Args('id', { type: () => String }) id: string,
    @Args('getProducts', { nullable: true, type: () => Boolean }) getProducts?: boolean,
  ) {
    const products = getProducts ?? false;

    const specificationQuery: Prisma.SpecificationFindUniqueArgs = {
      where: { id },
      include: {
        products
      }
    } as const;

    try {
      const specification: Prisma.SpecificationGetPayload<typeof specificationQuery> = await this.db.specification.findUnique(specificationQuery);

      if (!specification) {
        return null;
      }

      return specification;
    } catch (e) {
      return null;
    }
  }

  @Query(() => [Specification])
  async getSpecifications(
    @Args('getProducts', { nullable: true, type: () => Boolean }) getProducts?: boolean,
  ) {
    const products = getProducts ?? false;

    const specificationQuery: Prisma.SpecificationFindManyArgs = {
      include: {
        products
      }
    } as const;

    try {
      const specifications: Prisma.SpecificationGetPayload<typeof specificationQuery>[] = await this.db.specification.findMany(specificationQuery);

      if (!specifications) {
        return [];
      }

      return specifications;
    } catch (e) {
      return [];
    }
  }
}


