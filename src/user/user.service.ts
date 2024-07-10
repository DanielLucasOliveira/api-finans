import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from './dto/CreateUser.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  getHello() {
    return 'Hello word';
  }

  async create(user: CreateUserDTO) {
    return await this.prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
        image: user.image,
      },
    });
  }
}
