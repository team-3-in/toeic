import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { SupabaseModule } from './supabase/supabase.module';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [PassportModule, CommonModule, SupabaseModule, AuthModule],
})
export class AppModule {}
