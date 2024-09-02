/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from './dto/CreateUser.dto';
import * as bcrypt from 'bcryptjs';
import { UserLoginDTO } from './dto/UserLogin.dto';
import { PrismaService } from 'src/database/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async login(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
      select: {
        email: true,
        name: true,
        id: true,
        image: true,
        password: false,
      },
    });

    return user;
  }

  async create(user: CreateUserDTO) {
    // Hash da senha antes de salvar
    const hashedPassword = await bcrypt.hash(user.password, 13);

    const createdUser = await this.prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: hashedPassword,
        image: user.image,
      },
    });

    if (createdUser) {
      await this.prisma.log.create({
        data: {
          category: 1,
          userId: createdUser.id,
          description: `User ${createdUser.name} created`,
        },
      });
    }

    return { createdUser };
  }

  async findByEmail(email: string) {
    return await this.prisma.user.findFirst({
      where: {
        email: email,
      },
      select: {
        id: true,
        email: true,
        name: true,
        image: true,
        password: true,
      },
    });
  }
}
