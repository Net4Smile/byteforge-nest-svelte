import { Module } from '@nestjs/common';
import { CategoryResolver } from './category.resolver';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [CategoryResolver],
  exports: [CategoryResolver],
  imports: [PrismaModule]
})

export class CategoryModule { }