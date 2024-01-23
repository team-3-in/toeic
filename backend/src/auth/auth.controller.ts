import { Controller, Post, Body, Get, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ResponseEntity } from 'src/common/entity/response.entity';
import { LoginUser } from './dto/req-login.dto';
import { LoginResponse } from './dto/res-login.dto';
import { AllowAny } from './auth.constant';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @AllowAny()
  @HttpCode(200)
  async signIn(@Body() request: LoginUser) {
    const response = await this.authService.signInWith(request.toCredentials());
    return ResponseEntity.OK_WITH(
      `Successfully login ${request.email}`,
      new LoginResponse(response),
    );
  }

  @Get('user')
  async getUser() {
    const response = await this.authService.getCurrentUser();
    return ResponseEntity.OK_WITH('Successfully find user', response);
  }

  @Get('logout')
  async signOut() {
    await this.authService.signOut();
    return ResponseEntity.OK('Successfully logout user');
  }
}
