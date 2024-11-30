import { Module } from '@nestjs/common';
import { ProductResolver } from './product.resolver';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [ProductResolver],
  exports: [ProductResolver],
  imports: [PrismaModule]
})

export class ProductModule { }