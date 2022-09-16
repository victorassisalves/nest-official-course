import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter<T extends HttpException> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const request = context.getRequest();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse()

    // Send Sentry errors

    const body = {
      statusCode: exception.getStatus(),
      timeStamp: new Date().toISOString(),
      message: exception.message,
      method: request.method,
      path: request.path,
    };
    const error =
      typeof response === 'string'
        ? { message: exceptionResponse }
        : (exceptionResponse as object)
    response.status(status).json({
      ...body,
      ...error,
      status,
    });
  }
}
