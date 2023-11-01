import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UtilsService } from './utils.service';
import { MyLogger } from './logger.service';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './logging.interceptor';
import { AllExceptionsFilter } from './any-exception.filter.ts';

@Global()
@Module({
  imports: [],
  providers: [
    PrismaService,
    UtilsService,
    MyLogger,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
  exports: [PrismaService, UtilsService, MyLogger],
})
export class CoreModule {}
