import { Injectable } from '@nestjs/common';
import { ClsService } from 'nestjs-cls';
import { accessLog } from './winstone.logger';

@Injectable()
export class MyLogger {
  constructor(private readonly cls: ClsService) {}

  log(message: string, payload: any) {
    accessLog.info({
      level: 'INFO',
      message,
      payload,
      sessionId: this.cls.get('sessionID'),
      requestId: this.cls.get('requestID'),
    });
  }

  error(error) {
    accessLog.error(error, {
      sessionId: this.cls.get('sessionID'),
      requestId: this.cls.get('requestID'),
    });
  }
}
