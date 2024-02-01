import { HttpStatus, Type, applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiExtraModels,
  ApiOperation,
  ApiResponse,
  ApiTooManyRequestsResponse,
  ApiUnauthorizedResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { PageEntity } from '../dto/get-pagination-list.dto';
import { ResponseEntity } from '../entity/response.entity';
import { createSchema } from './api.schema';
import { AllowAny } from '../../auth/decorator/pass-auth.decorator';

export const ApiSwagger = ({
  name,
  success = HttpStatus.OK,
  model = Object,
  allowAny = false,
  isPagination = false,
}: OptionsProps): MethodDecorator => {
  const apiAuthorization = allowAny
    ? [AllowAny()]
    : [
        ApiUnauthorizedResponse({
          description:
            '인증되지 않은 사용자일 때 응답입니다. 401 상태코드가 반환됩니다',
          schema: {
            allOf: [
              createSchema({
                status: HttpStatus.UNAUTHORIZED,
                message: '인증되지 않은 사용자입니다.',
                success: false,
              }),
            ],
          },
        }),

        ApiBearerAuth('accessToken'),
      ];

  return applyDecorators(
    ApiOperation({
      summary: `${name} API`,
    }),

    ApiExtraModels(PageEntity, ResponseEntity, model),

    ApiTooManyRequestsResponse({
      description:
        '요청 횟수가 너무 많을 때 응답입니다. 429 상태코드가 반환됩니다',
      schema: {
        allOf: [
          createSchema({
            status: HttpStatus.TOO_MANY_REQUESTS,
            message: '요청 횟수가 너무 많습니다. 잠시 후 다시 시도해주세요.',
            success: false,
          }),
        ],
      },
    }),

    ApiBadRequestResponse({
      description:
        '잘못된 요청일 때 응답입니다. 400 상태코드와 함께 메시지가 반환됩니다',
      schema: {
        allOf: [
          createSchema({
            status: HttpStatus.BAD_REQUEST,
            message: '잘못된 요청에 대한 메세지.',
            success: false,
          }),
        ],
      },
    }),

    ApiResponse({
      status: success,
      description: '성공 시 OK 응답을 반환합니다.',
      schema: {
        allOf: [
          createSchema({
            status: success,
            message: `${name} 했습니다.`,
            success: true,
            data: isPagination
              ? {
                  $ref: getSchemaPath(PageEntity),
                  properties: {
                    items: {
                      type: 'array',
                      items: { $ref: getSchemaPath(model) },
                    },
                  },
                }
              : {
                  $ref: getSchemaPath(model),
                },
          }),
        ],
      },
    }),
    ...apiAuthorization,
  );
};

interface OptionsProps {
  name: string;
  success?: number;
  isPagination?: boolean;
  allowAny?: boolean;
  model?: Type<unknown>;
}
