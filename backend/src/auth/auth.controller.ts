import { Controller, Post, Body, Get, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ResponseEntity } from 'src/common/entity/response.entity';
import { UserCredential } from './dto/req-credential-body.dto';
import { CredentialResponse } from './dto/res-credential.dto';
import { AllowAny } from './auth.constant';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('인증')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @AllowAny()
  @HttpCode(200)
  async signIn(@Body() request: UserCredential) {
    const response = await this.authService.signInWith(request.toCredentials());
    return ResponseEntity.OK_WITH(
      `Successfully login ${request.email}`,
      new CredentialResponse(response),
    );
  }

  @Post('register')
  @AllowAny()
  async signUp(@Body() request: UserCredential) {
    await this.authService.signUpWith(request.toCredentials());
    return ResponseEntity.CREATED(`Successfully register ${request.email}`);
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
