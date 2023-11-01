import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';

@InputType()
export class ReservationWhereInput implements Prisma.ReservationWhereInput {
  @Field((type) => [ReservationWhereInput], { nullable: true })
  AND?: ReservationWhereInput | ReservationWhereInput[];

  @Field((type) => [ReservationWhereInput], { nullable: true })
  OR?: ReservationWhereInput[];

  @Field((type) => [ReservationWhereInput], { nullable: true })
  NOT?: ReservationWhereInput | ReservationWhereInput[];

  @Field(() => String, { nullable: true })
  id?: string | Prisma.StringFilter<'Reservation'>;

  @Field((type) => String, { nullable: true })
  guest_name?: string;

  @Field((type) => Date, { nullable: true })
  expected_arrival_time_min?: Date;

  @Field(() => String, { nullable: true })
  owner?: string | Prisma.StringFilter<'Reservation'>;

  @Field((type) => Date, { nullable: true })
  expected_arrival_time_mix?: Date;
}

@InputType()
export class OrderByArg {
  @Field((type) => String, { nullable: true })
  expected_arrival_time: 'asc' | 'desc';
}
