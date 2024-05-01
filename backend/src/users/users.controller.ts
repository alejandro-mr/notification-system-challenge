import { Controller, Get, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { User as UserModel, Prisma } from '@prisma/client';
import { SkipAuth } from 'src/skip-auth/skip-auth.decorator';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @SkipAuth()
  @Post('user')
  async signupUser(
    @Body() userData: Prisma.UserCreateInput,
  ): Promise<UserModel> {
    return this.usersService.createUser(userData);
  }

  @SkipAuth()
  @Get('/')
  async getAllUsers(): Promise<UserModel[]> {
    return this.usersService.users({});
  }
}
