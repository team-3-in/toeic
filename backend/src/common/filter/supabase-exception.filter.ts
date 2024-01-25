import { ArgumentsHost, Catch, ExceptionFilter, Logger } from '@nestjs/common';
import { Request, Response } from 'express';
import { createLog } from '../config/log-helper.config';
import { ResponseEntity } from '../entity/response.entity';
import { AuthError } from '@supabase/supabase-js';

@Catch(AuthError)
export class SupabaseExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: Logger) {}
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();
    const stack = exception.stack;
    const statusCode = (exception as AuthError).status;
    const response = ResponseEntity.EXCEPTION(
      (exception as AuthError).message,
      statusCode,
    );

    const log = createLog({ req, stack, response });
    this.logger.log(log);
    res.status(statusCode).json(response);
  }
}
