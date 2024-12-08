import { Module } from '@nestjs/common';
import { ProductResolver } from './product.resolver';
import { PrismaModule } from '../prisma/prisma.module';
import { RedisModule } from '../redis/redis.module';

@Module({
  providers: [ProductResolver],
  exports: [ProductResolver],
  imports: [PrismaModule, RedisModule]
})

export class ProductModule { }