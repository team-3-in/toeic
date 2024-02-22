import { UseInterceptors, applyDecorators } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { multerConfig } from '../../common/config/multer.config';

export const ApiFile = (): MethodDecorator => {
  return applyDecorators(
    UseInterceptors(FileInterceptor('file', multerConfig)),

    ApiConsumes('multipart/form-data'),

    ApiBody({
      description: 'PDF file',
      required: true,
      schema: {
        type: 'object',
        properties: {
          file: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    }),
  );
};
