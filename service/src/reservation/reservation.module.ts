import { Module } from '@nestjs/common';
import { ReservationResolver } from './reservation.resolvers';
import { PrismaService } from '../core/prisma.service';

@Module({
  imports: [],
  providers: [PrismaService, ReservationResolver],
})
export class ReservationModule {}
