import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ReservationModule } from './reservation/reservation.module';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { ClsModule } from 'nestjs-cls';
import { randomUUID } from 'crypto';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ClsModule.forRoot({
      global: true,
      middleware: {
        mount: true,
        setup: (cls, req) => {
          cls.set('sessionID', req.headers['x-session-id'] || null);
          cls.set('requestID', randomUUID());
        },
      },
    }),
    CoreModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      include: [ReservationModule],
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    AuthModule,
    UsersModule,
    ReservationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
