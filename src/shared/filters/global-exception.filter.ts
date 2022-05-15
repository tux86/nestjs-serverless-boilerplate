import {
  ArgumentsHost,
  Catch,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';
import { GqlContextType, GqlExceptionFilter } from '@nestjs/graphql';
import { ApolloError } from 'apollo-server-core';
import {
  BusinessLogicException,
  InternalServerErrorException,
} from '../exceptions';

@Catch()
export class GlobalExceptionFilter implements GqlExceptionFilter {
  logger = new Logger(GlobalExceptionFilter.name);

  /**
   * Log error to console
   * @param exception
   * @param contextType
   * @param request
   */
  logError(
    exception: Error,
    contextType?: GqlContextType,
    request?: FastifyRequest,
  ): void {
    const isHttpException = exception instanceof HttpException;
    const { message, stack } = exception;
    const status = isHttpException ? exception.getStatus() : undefined;
    const method = request ? `"${request.routerMethod}"` : undefined;
    const path = method ? `${method} ${request.routerPath}` : undefined;
    const logMessage = [contextType, message, status, path, stack]
      .filter((o) => o)
      .join(' | ');
    this.logger.error(logMessage);
  }

  /**
   * returns true if :
   * - http internal server errors (5xx)
   * - request timout (408)
   * - Not a http error
   *
   * @param exception
   */
  isLoggable(exception: Error) {
    if (exception instanceof BusinessLogicException) {
      return false;
    } else if (exception instanceof HttpException) {
      const statusCode = exception.getStatus();
      return (
        statusCode >= HttpStatus.INTERNAL_SERVER_ERROR &&
        [HttpStatus.REQUEST_TIMEOUT].includes(statusCode)
      );
    } else {
      return true;
    }
  }

  /**
   * Catch all error types
   * @param exception
   * @param host
   */
  catch(exception: Error, host: ArgumentsHost) {
    const contextType = host.getType<GqlContextType>();
    const isLoggable = this.isLoggable(exception);
    if (contextType === 'graphql') {
      if (isLoggable) {
        this.logError(exception, contextType);
      }

      if (
        exception instanceof HttpException ||
        exception instanceof BusinessLogicException
      ) {
        return new ApolloError(exception.message, undefined, exception);
      } else {
        return new ApolloError(
          'Internal Server Error',
          undefined,
          new InternalServerErrorException(),
        );
      }
    } else if (contextType === 'http') {
      const ctx = host.switchToHttp();
      const response: FastifyReply = ctx.getResponse<FastifyReply>();
      const request: FastifyRequest = ctx.getRequest<FastifyRequest>();

      if (isLoggable) {
        this.logError(exception, contextType, request);
      }

      if (exception instanceof HttpException) {
        const status = exception.getStatus();
        void response.status(status).send(exception);
      } else if (exception instanceof BusinessLogicException) {
        void response.status(exception.statusCode).send({
          errorCode: exception.errorCode,
          statusCode: exception.statusCode,
          message: exception.message,
        });
      } else {
        void response.status(HttpStatus.INTERNAL_SERVER_ERROR).send(exception);
      }
    } else {
      this.logError(exception);
      throw new InternalServerErrorException('Unhandled arguments host type');
    }
  }
}
