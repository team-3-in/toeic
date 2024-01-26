import { Controller, Post, Body, Get, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ResponseEntity } from '../common/entity/response.entity';
import { UserCredential } from './dto/req-credential-body.dto';
import { CredentialResponse } from './dto/res-credential.dto';
import { AllowAny } from './auth.constant';
import { ApiTags } from '@nestjs/swagger';
import { SwaggerAPI } from '../common/swagger/api.decorator';

@ApiTags('인증')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @AllowAny()
  @HttpCode(200)
  @SwaggerAPI({ name: '로그인', allowAny: true, model: CredentialResponse })
  async signIn(@Body() request: UserCredential) {
    const response = await this.authService.signInWith(request.toCredentials());
    return ResponseEntity.OK_WITH(
      `Successfully login ${request.email}`,
      new CredentialResponse(response),
    );
  }

  @Post('register')
  @AllowAny()
  @SwaggerAPI({ name: '회원가입', allowAny: true })
  async signUp(@Body() request: UserCredential) {
    await this.authService.signUpWith(request.toCredentials());
    return ResponseEntity.CREATED(
      `Successfully register ${request.email}. Please confirm your email`,
    );
  }

  @Get('user')
  @SwaggerAPI({ name: '유저 정보 조회(임시)', model: CredentialResponse })
  async getUser() {
    const response = await this.authService.getCurrentUser();
    return ResponseEntity.OK_WITH('Successfully find user', response);
  }

  @Get('logout')
  @SwaggerAPI({ name: '로그아웃' })
  async signOut() {
    await this.authService.signOut();
    return ResponseEntity.OK('Successfully logout user');
  }
}
