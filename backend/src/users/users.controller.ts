import { Controller, Get, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { User as UserModel, Prisma } from '@prisma/client';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('/')
  async getAllUsers(): Promise<UserModel[]> {
    return this.usersService.users({});
  }
}
