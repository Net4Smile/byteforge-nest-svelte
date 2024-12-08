import { Module } from '@nestjs/common';
import { SpecificationResolver } from './specification.resolver';
import { PrismaModule } from '../prisma/prisma.module';
import { RedisModule } from '../redis/redis.module';

@Module({
  providers: [SpecificationResolver],
  exports: [SpecificationResolver],
  imports: [PrismaModule, RedisModule]
})

export class SpecificationModule { }