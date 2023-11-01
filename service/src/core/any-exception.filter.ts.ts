import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  ContextType,
} from '@nestjs/common';
import { ClsService } from 'nestjs-cls';
import { MyLogger } from './logger.service';
import { GqlArgumentsHost } from '@nestjs/graphql';
import { UtilsService } from './utils.service';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(
    private readonly cls: ClsService,
    private readonly logger: MyLogger,
    private readonly util: UtilsService,
  ) {}
  catch(exception: unknown, host: ArgumentsHost) {
    this.logger.error(exception);

    const type = host.getType<ContextType | 'graphql'>();
    let _host: ArgumentsHost | GqlArgumentsHost = host;
    if (type === 'graphql') {
      _host = GqlArgumentsHost.create(host);
    }
    // const ctx = this.util.getContext(host.switchToHttp());
    const req = this.util.getRequest(_host);
    const res = this.util.getResponse(_host);

    let status, data;
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      data = exception.getResponse();
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      data = 'INTERNAL_SERVER_ERROR';
    }

    this.logger.log('Response completed', {
      method: req.method,
      url: req.url,
      code: status,
      time: Date.now() - this.cls.get('requestTime'),
      body: data,
    });
    if (type === 'graphql') {
      return exception;
    } else {
      res.status(status).json(data);
    }
  }
}
