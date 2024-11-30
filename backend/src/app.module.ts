import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AppResolver } from './app.resolver';
import { join } from 'path';
import { PrismaModule } from './prisma/prisma.module';
import { RedisModule } from './redis/redis.module';
import { ProductModule } from './products/product.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), "/graphql/schema.gql"),
      sortSchema: true,
      playground: false,
      path: "/"
    }),
    PrismaModule,
    RedisModule,
    ProductModule
  ],
  controllers: [AppController],
  providers: [AppService, AppResolver],
})

export class AppModule { }
