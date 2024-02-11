import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { SupabaseModule } from '../supabase/supabase.module';
import { SupabaseStrategy } from './strategy/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [SupabaseModule, JwtModule],
  controllers: [AuthController],
  providers: [AuthService, SupabaseStrategy],
  exports: [AuthService],
})
export class AuthModule {}
