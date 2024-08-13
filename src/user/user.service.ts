import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from './dto/CreateUser.dto';
import * as bcrypt from 'bcryptjs';
import { UserLoginDTO } from './dto/UserLogin.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async login(credentials: UserLoginDTO) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          email: credentials.email,
        },
      });

      if (!credentials.password) {
        throw new Error('Password not provided');
      }

      if (user && (await bcrypt.compare(credentials.password, user.password))) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...userWithoutPassword } = user;
        return {
          success: true,
          user: userWithoutPassword,
        };
      } else {
        return {
          success: false,
          message: 'Invalid email or password',
        };
      }
    } catch (error) {
      console.error(error);
      return {
        success: false,
        message: 'Internal server error',
      };
    }
  }

  async create(user: CreateUserDTO) {
    // Hash da senha antes de salvar
    const hashedPassword = await bcrypt.hash(user.password, 13);

    return await this.prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: hashedPassword,
        image: user.image,
      },
    });
  }

  async findByEmail(email: string) {
    return await this.prisma.user.findFirst({
      where: {
        email: email,
      },
      select: {
        email: true,
        name: true,
        image: true,
        password: false,
      },
    });
  }
}
