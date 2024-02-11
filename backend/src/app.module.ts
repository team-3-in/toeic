import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { SupabaseModule } from './supabase/supabase.module';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guard/jwt-auth.guard';
import { UploadModule } from './upload/upload.module';
import { ToeicModule } from './toeic/toeic.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    PassportModule,
    CommonModule,
    SupabaseModule,
    AuthModule,
    UploadModule,
    ToeicModule,
    PrismaModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
