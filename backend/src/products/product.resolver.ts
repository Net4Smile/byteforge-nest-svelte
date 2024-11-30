import { Query, Resolver, Args } from "@nestjs/graphql";
import { PrismaService } from "../prisma/prisma.service";
import { Product } from "./product.model";

@Resolver()
export class ProductResolver {
  constructor(private db: PrismaService) { }

  @Query(() => Product, { name: 'getProduct', nullable: true })
  async getProduct(@Args('id') id: string) {
    try {
      return await this.db.product.findUnique({
        where: { id }
      });
    } catch (e) {
      return null;
    }
  }

  @Query(() => [Product], { name: 'getProducts' })
  async getProducts() {
    try {
      return await this.db.product.findMany();
    } catch (e) {
      return [];
    }
  }
}