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

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('login/:id')
  async login(@Param('id', ValidationPipe) id: string) {
    if (id) return await this.userService.login(id);
  }

  @Post()
  async create(@Body(new ValidationPipe()) user: CreateUserDTO) {
    return await this.userService.create(user);
  }

  @Get('email/:email')
  async findByEmail(@Param('email', ValidationPipe) email: string) {
    return await this.userService.findByEmail(email);
  }
}
