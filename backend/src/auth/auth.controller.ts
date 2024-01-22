import { Controller, Post, Body, Logger, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ResponseEntity } from 'src/common/entity/response.entity';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guard/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async create(@Body() request: LoginDto) {
    const response = await this.authService.validateUser(
      request.email,
      request.password,
    );
    this.logger.log(response.data.session);
    return ResponseEntity.OK_WITH('Login Success', response.data.session);
  }

  @UseGuards(JwtAuthGuard)
  @Get('user')
  async getUser() {
    const response = await this.authService.getCurrentUser();
    this.logger.log(response.data);
    return ResponseEntity.OK_WITH('Login Success', response.data);
  }
}
