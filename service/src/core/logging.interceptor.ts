import {
  CallHandler,
  ContextType,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UtilsService } from './utils.service';
import { MyLogger } from './logger.service';
import { ClsService } from 'nestjs-cls';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(
    private readonly logger: MyLogger,
    private readonly util: UtilsService,
    private readonly cls: ClsService,
  ) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const type = GqlExecutionContext.create(context).getType<
      ContextType | 'graphql'
    >();
    this.cls.set('requestTime', Date.now());
    const ctx = this.util.getContext(context);
    const req = this.util.getRequest(ctx);
    this.logger.log('Request Init', {
      method: req.method,
      url: req.url,
      params: req.params,
      body: req.body,
      query: req.query,
    });
    return next.handle().pipe(
      tap((data) => {
        const res = this.util.getResponse(ctx);
        this.logger.log('Response completed', {
          method: req.method,
          url: req.url,
          code: type === 'graphql' ? 200 : res.statusCode,
          time: Date.now() - this.cls.get('requestTime'),
          body: data,
        });
      }),
    );
  }
}
