import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { IS_PUBLIC_KEY } from '../decorators/public-endpoint.decorator';

/**
 * This guard is automatically provisioned by passport-jwt module. The guard
 * will automatically invoke our custom configured passport-jwt logic,
 * validating the JWT, and assigning the user property to the request object.
 *
 * The guard can be used to secure REST as well as for GraphQL endpoints.
 * Therefore it can be configured as a global `APP_GUARD`. I choose to not
 * create a separated GraphQL JWT guard, because at this point it is not
 * possible in NestJS do define a centralized guard for a whole module. You can
 * only centralize on controller level or define a global guard.
 *
 * When being configured as global `APP_GUARD`, the guard can be bypassed with
 * `\@Public()` decorator in REST controllers or GraphQL resolvers.
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  public constructor(private reflector: Reflector) {
    super();
  }

  /**
   * This method wouldn't be necessary for REST endpoints. But adding it with
   * the current implementation, enables to use this guard to secure
   * GraphQL endpoints as well.
   * @param context -
   * @returns - Appropriate request object for the current context type
   */
  public getRequest(context: ExecutionContext): Request {
    // see https://docs.nestjs.com/fundamentals/execution-context
    switch (context.getType() as string) {
      case 'graphql':
        const ctx = GqlExecutionContext.create(context);
        return ctx.getContext().req;
      case 'http':
      default:
        return context.switchToHttp().getRequest();
    }
  }

  /**
   * Implementation ensures, that the guard can be bypassed with `\@Public()`
   * decorator
   * @param context -
   * @returns The returned boolean indicates whether the route is allowed to be
   * accessed.
   */
  public canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // check if Public() decorator is present, if so, allow without authentication
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }
    return super.canActivate(context);
  }
}
