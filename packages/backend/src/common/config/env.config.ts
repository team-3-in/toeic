import { ConfigModuleOptions } from '@nestjs/config';
import { plainToClass } from 'class-transformer';
import { IsEnum, IsString, validateSync } from 'class-validator';

export const envConfigOptions: ConfigModuleOptions = {
  envFilePath: [`.env.${process.env.NODE_ENV}`, '.env'],
  isGlobal: true,
  validate,
};

enum Environment {
  Dev = 'dev',
  Production = 'production',
}

class EnvironmentVariables {
  @IsEnum(Environment)
  NODE_ENV: Environment;

  @IsString()
  APP_SERVER_PORT: string;

  @IsString()
  SUPABASE_URL: string;

  @IsString()
  SUPABASE_KEY: string;

  @IsString()
  ALLOWED_ORIGINS: string;

  @IsString()
  TZ: string;
}

function validate(config: Record<string, unknown>): EnvironmentVariables {
  const validatedConfig = plainToClass(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
