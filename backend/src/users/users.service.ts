import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from "bcrypt"

@Injectable()
export class UsersService {
  constructor(private db: PrismaService) { }

  async findOne({ username, email, id }: { username?: string; email?: string, id?: string }) {
    return this.db.user.findFirst({
      where: {
        OR: [
          { username: { equals: username } },
          { email: { equals: email } },
          { id: { equals: id } }
        ]
      }
    });
  }

  async hashPassword(password: string, saltRounds = 10) {
    return await bcrypt.hash(password, saltRounds);
  }

  async comparePassword(password: string, hashedPassword: string) {
    return await bcrypt.compare(password, hashedPassword);
  }
}
