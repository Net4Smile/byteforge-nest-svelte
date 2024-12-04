import { Module } from '@nestjs/common';
import { SpecificationResolver } from './specification.resolver';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [SpecificationResolver],
  exports: [SpecificationResolver],
  imports: [PrismaModule]
})

export class SpecificationModule { }