import { Controller, Body, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signin.dto';
import { SkipAuth } from 'src/skip-auth/skip-auth.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @SkipAuth()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDTO: SignInDto) {
    return this.authService.signIn(signInDTO);
  }
}
