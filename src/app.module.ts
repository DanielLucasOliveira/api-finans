import { Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';
import { PrismaService } from './database/prisma.service';

@Module({
  imports: [UserModule],
  controllers: [UserController],
  providers: [PrismaService, UserService],
})
export class AppModule {}
