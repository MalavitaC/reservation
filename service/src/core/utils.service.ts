import {
  ArgumentsHost,
  ContextType,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { GqlArgumentsHost, GqlExecutionContext } from '@nestjs/graphql';
import { Request, Response } from 'express';

type TContext =
  | ExecutionContext
  | GqlExecutionContext
  | ArgumentsHost
  | GqlArgumentsHost;

@Injectable()
export class UtilsService {
  getContext(context: ExecutionContext) {
    const requestType = context.getType<ContextType | 'graphql'>();
    if (requestType !== 'graphql') return context;
    return GqlExecutionContext.create(context);
  }

  getRequest(context: TContext): Request {
    const requestType = context.getType<ContextType | 'graphql'>();
    if (requestType === 'graphql') {
      return (context as GqlExecutionContext).getContext().req;
    }
    return context.switchToHttp().getRequest();
  }

  getResponse(context: TContext): Response {
    const requestType = context.getType<ContextType | 'graphql'>();
    if (requestType === 'graphql') {
      return (context as GqlExecutionContext).getContext().res;
    }
    return context.switchToHttp().getResponse();
  }
}
