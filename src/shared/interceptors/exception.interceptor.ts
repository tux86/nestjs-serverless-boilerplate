import {
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BusinessLogicException } from '../exceptions/business-logic.exception';

@Injectable()
export class ExceptionInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        if (error instanceof BusinessLogicException) {
          // transform BusinessLogicException to HttpException
          return throwError(() => new HttpException(error, error.statusCode));
        } else {
          return throwError(() => error);
        }
      }),
    );
  }
}
