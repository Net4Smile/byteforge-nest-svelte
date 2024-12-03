import { AuthService } from './auth.service';
import { UseGuards } from '@nestjs/common';
import { IsString, IsNotEmpty, ValidateIf, IsEmail } from 'class-validator';
import { AuthGuard } from './auth.guard';
import { Args, Context, Field, InputType, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from '../users/user.model';

@InputType()
export class CreateUserDto {
  @Field(() => String, { nullable: true })
  @ValidateIf(o => !o.email)
  @IsNotEmpty()
  @IsString()
  username?: string;

  @Field(() => String, { nullable: true })
  @ValidateIf(o => !o.username)
  @IsNotEmpty()
  @IsEmail()
  email?: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  password: string;
}

@Resolver('auth')
export class AuthResolver {
  constructor(private authService: AuthService) { }

  @Mutation(() => String)
  async signIn(@Args('signInDto') signInDto: CreateUserDto) {
    const result = await this.authService.signIn({ username: signInDto.username, email: signInDto.email, pass: signInDto.password });
    return result.access_token;
  }

  @Query(() => User)
  @UseGuards(AuthGuard)
  getUserInfo(@Context('req') request: any) {
    return request.user;
  }
}
