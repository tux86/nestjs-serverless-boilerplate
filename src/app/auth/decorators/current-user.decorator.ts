import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => {
    switch (context.getType() as string) {
      case 'graphql':
        const ctx = GqlExecutionContext.create(context);
        return ctx.getContext().req.user;
      case 'http':
      default:
        return context.switchToHttp().getRequest().user;
    }
  },
);
