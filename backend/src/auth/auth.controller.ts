import { Controller, Post, Body, Get, HttpCode, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ResponseEntity } from '../common/entity/response.entity';
import { UserCredential } from './dto/req-auth-body.dto';
import { AuthResponse } from './dto/res-auth.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ApiSwagger } from '../common/swagger/api.decorator';
import { AuthToken } from './dto/req-auth-token.dto';
import { Response } from 'express';
import { cookieOptions } from '../common/config/cookie.config';
import { ReqToken } from './decorator/token.decorator';
import { Roles } from './decorator/roles.decorator';
import { Role } from './constant/roles.enum';

@ApiTags('인증')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  @ApiSwagger({ name: '로그인', allowAny: true, model: AuthResponse })
  async signIn(
    @Body() request: UserCredential,
    @Res({ passthrough: true }) response: Response,
  ) {
    const result = await this.authService.signInWith(request.toCredentials());
    response.cookie('refreshToken', result.refreshToken, cookieOptions);
    return ResponseEntity.OK_WITH(
      `Successfully login ${request.email}`,
      result,
    );
  }

  @Post('register')
  @ApiSwagger({ name: '회원가입', allowAny: true })
  async signUp(@Body() request: UserCredential) {
    await this.authService.signUpWith(request.toCredentials());
    return ResponseEntity.CREATED(
      `Successfully register ${request.email}. Please confirm your email`,
    );
  }

  @Get('refresh')
  @ApiBearerAuth('accessToken')
  @ApiSwagger({
    name: '토큰 재발급',
    model: AuthResponse,
    allowAny: true,
  })
  async refreshSession(
    @ReqToken() request: AuthToken,
    @Res({ passthrough: true }) response: Response,
  ) {
    const result = await this.authService.refreshSession(
      request.refreshToken,
      request.accessToken,
    );
    response.cookie('refreshToken', result.refreshToken, cookieOptions);
    return ResponseEntity.OK_WITH('Successfully refresh token', result);
  }

  @Get('user')
  @ApiSwagger({ name: '유저 정보 조회(임시)', model: AuthResponse })
  @Roles([Role.AUTH, Role.ADMIN])
  async getUser() {
    const response = await this.authService.getCurrentUser();
    return ResponseEntity.OK_WITH('Successfully find user', response);
  }

  @Get('logout')
  @ApiSwagger({ name: '로그아웃' })
  async signOut(@Res({ passthrough: true }) res: Response) {
    await this.authService.signOut();
    res.clearCookie('refreshToken');
    return ResponseEntity.OK('Successfully logout user');
  }
}
