import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { useContainer } from 'class-validator';
import { swaggerConfig } from './common/config/swagger.config';
import { pipeOptions } from './common/config/pipe.config';
import { corsOptions } from './common/config/cors.config';
import { apiReference } from '@scalar/nestjs-api-reference';
import * as cookieParser from 'cookie-parser';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  const document = SwaggerModule.createDocument(app, swaggerConfig);

  app.use(
    '/reference',
    apiReference({
      theme: 'moon',
      darkMode: true,
      spec: {
        content: document,
      },
    }),
  );
  app.use(cookieParser());
  app.enableCors(corsOptions);
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  app.useGlobalPipes(new ValidationPipe(pipeOptions));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  await app.listen(+process.env.APP_SERVER_PORT);
}
bootstrap();
