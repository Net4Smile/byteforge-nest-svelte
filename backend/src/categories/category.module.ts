import { Module } from '@nestjs/common';
import { CategoryResolver } from './category.resolver';
import { PrismaModule } from '../prisma/prisma.module';
import { RedisModule } from '../redis/redis.module';

@Module({
  providers: [CategoryResolver],
  exports: [CategoryResolver],
  imports: [PrismaModule, RedisModule]
})

export class CategoryModule { }