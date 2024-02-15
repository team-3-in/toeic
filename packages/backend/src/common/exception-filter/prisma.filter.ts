import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { createLog } from '../config/log-helper.config';
import { ResponseEntity } from '../entity/response.entity';
import { Prisma } from '@prisma/client';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(PrismaClientExceptionFilter.name);
  private readonly MappedErrorCode = {
    P2000: HttpStatus.BAD_REQUEST,
    P2002: HttpStatus.CONFLICT,
    P2025: HttpStatus.NOT_FOUND,
  };

  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();
    const message = exception.message.replace(/\n/g, '');
    const stack = exception.stack;
    const statusCode = this.MappedErrorCode[exception.code];
    const response = ResponseEntity.EXCEPTION(message, statusCode);

    const log = createLog({ req, stack, response });
    this.logger.log(log);
    res.status(statusCode).json(response);
  }
}
