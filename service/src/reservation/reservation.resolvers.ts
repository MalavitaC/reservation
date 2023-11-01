import 'reflect-metadata';
import { Resolver, Query, Args, Mutation, Context } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { PrismaService } from '../core/prisma.service';
import { ReservationModel } from './reservation.model';
import { OrderByArg, ReservationWhereInput } from './dto/query.dto';
import { ReservationCreateInput } from './dto/create.dto';
import { Prisma, ReservationStatus, Role } from '@prisma/client';
import { Roles } from '../auth/decorators/role.decorator';

@Resolver(ReservationModel)
export class ReservationResolver {
  constructor(@Inject(PrismaService) private prismaService: PrismaService) {}

  @Roles(Role.gest, Role.employees)
  @Query(() => [ReservationModel], { nullable: true })
  async getList(
    @Args('where', { nullable: true, defaultValue: undefined })
    where?: ReservationWhereInput,
    @Args('skip', { nullable: true, defaultValue: 0 }) skip?: number,
    @Args('take', { nullable: true, defaultValue: 10 }) take?: number,
    @Args('orderBy', { nullable: true, defaultValue: undefined })
    orderBy?: OrderByArg,
    @Context() ctx?,
  ) {
    if (ctx.req.user.role === Role.gest) {
      if (!where) where = {};
      where.owner = ctx.req.user.id;
    }
    return this.prismaService.reservation.findMany({
      skip: skip || 0,
      take: take || 10,
      where,
      orderBy,
    });
  }

  @Roles(Role.gest, Role.employees)
  @Query(() => ReservationModel, { nullable: true })
  async getById(
    @Args('id') id: string,
    @Context() ctx,
  ): Promise<ReservationModel | null> {
    const where: ReservationWhereInput = {
      id,
    };
    if (ctx.req.user.role === Role.gest) {
      where.owner = ctx.req.user.id;
    }
    return this.prismaService.reservation.findFirst({
      where,
    });
  }

  @Roles(Role.gest)
  @Mutation(() => ReservationModel)
  async createReservation(
    @Args('data') data: ReservationCreateInput,
  ): Promise<ReservationModel> {
    return this.prismaService.reservation.create({
      data: {
        ...data,
        owner: '',
        status: ReservationStatus.SUCCESS,
      },
    });
  }

  @Roles(Role.gest, Role.employees)
  @Mutation(() => ReservationModel, { nullable: true })
  async rescheduleReservation(
    @Args('id') id: string,
    @Args('expected_arrival_time') expected_arrival_time: Date,
    @Context() ctx,
  ): Promise<ReservationModel> {
    const where: Prisma.ReservationWhereUniqueInput = {
      id,
    };
    if (ctx.req.user.role === Role.gest) {
      where.owner = ctx.req.user.id;
    }
    return this.prismaService.reservation.update({
      where,
      data: {
        expected_arrival_time,
      },
    });
  }

  @Roles(Role.gest, Role.employees)
  @Mutation(() => ReservationModel, { nullable: true })
  async deleteReservation(@Args('id') id: string, @Context() ctx) {
    const where: Prisma.ReservationWhereUniqueInput = {
      id,
    };
    if (ctx.req.user.role === Role.gest) {
      where.owner = ctx.req.user.id;
    }
    return this.prismaService.reservation.update({
      where,
      data: {
        status: ReservationStatus.FAILED,
      },
    });
  }
}
