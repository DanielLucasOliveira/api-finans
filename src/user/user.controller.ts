import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/CreateUser.dto';
import { UserLoginDTO } from './dto/UserLogin.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  async login(@Body(new ValidationPipe()) credentials: UserLoginDTO) {
    if (credentials) return await this.userService.login(credentials);
  }

  @Post()
  async create(@Body(new ValidationPipe()) user: CreateUserDTO) {
    await this.userService.create(user);
  }

  @Get('email/:email')
  async findByEmail(@Param('email', ValidationPipe) email: string) {
    return await this.userService.findByEmail(email);
  }
}
