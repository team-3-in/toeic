import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthToken } from '../dto/req-auth-token.dto';

export const ReqToken = createParamDecorator(
  (_data: string, ctx: ExecutionContext): AuthToken => {
    const request = ctx.switchToHttp().getRequest<Request>();
    const refreshToken: string = request.cookies['refreshToken'];
    const accessToken: string = request.headers['authorization'].split(' ')[1];

    if (!refreshToken || !accessToken) {
      throw new UnauthorizedException('do not have token');
    }

    return { refreshToken, accessToken };
  },
);
