import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { SupabaseModule } from './supabase/supabase.module';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guard/jwt-auth.guard';
import { PdfUploaderModule } from './pdf-uploader/pdf-uploader.module';
import { RolesGuard } from './auth/guard/roles.guard';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule,
    PassportModule,
    CommonModule,
    SupabaseModule,
    AuthModule,
    PdfUploaderModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
