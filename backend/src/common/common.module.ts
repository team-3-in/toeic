import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import {
  consoleTransport,
  errorLogFileTransport,
  infoLogFileTransport,
} from './config/winston.config';
import { envConfigOptions } from './config/env.config';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './exception-filter/http.filter';
import { SupabaseExceptionFilter } from './exception-filter/supabase.filter';
import { PrismaClientExceptionFilter } from './exception-filter/prisma.filter';

@Module({
  imports: [
    ConfigModule.forRoot(envConfigOptions),
    WinstonModule.forRoot({
      transports: [
        consoleTransport,
        infoLogFileTransport,
        errorLogFileTransport,
      ],
    }),
  ],
  providers: [
    Logger,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: SupabaseExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: PrismaClientExceptionFilter,
    },
  ],
  exports: [ConfigModule, WinstonModule],
})
export class CommonModule {}
