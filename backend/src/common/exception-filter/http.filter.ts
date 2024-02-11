import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { createLog } from '../config/log-helper.config';
import { ResponseEntity } from '../entity/response.entity';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();
    const stack = exception.stack;

    if (!(exception instanceof HttpException)) {
      exception = new InternalServerErrorException();
    }

    const statusCode = (exception as HttpException).getStatus();
    const getResponse = (exception as HttpException).getResponse();
    const response = ResponseEntity.EXCEPTION(
      getResponse['message'] || 'Internal Server Error',
      statusCode,
    );

    const log = createLog({ req, stack, response });
    this.logger.log(log);
    res.status(statusCode).json(response);
  }
}
