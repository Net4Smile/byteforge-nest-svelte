
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) { }

  async signIn({ username, email, pass }: { username?: string, email?: string, pass: string }): Promise<{ access_token: string }> {
    const user = await this.usersService.findOne({ username, email });

    if (!user || !(await this.usersService.comparePassword(pass, user.password))) {
      throw new UnauthorizedException();
    }

    const { password, id, username: userUsername, ...result } = user;

    const payload = {
      sub: user.id,
      username: user.username,
      ...result
    };

    return {
      access_token: await this.jwtService.signAsync(payload)
    };
  }
}
