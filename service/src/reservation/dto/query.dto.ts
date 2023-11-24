import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { GestContactInfoInput } from './create.dto';

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

  @Field((type) => GestContactInfoInput, { nullable: true })
  gest_contact_info?: Prisma.Gest_Contact_InfoCompositeFilter;

  @Field(() => String, { nullable: true })
  owner?: string | Prisma.StringFilter<'Reservation'>;
}

@InputType()
export class OrderByArg {
  @Field((type) => String, { nullable: true })
  expected_arrival_time: 'asc' | 'desc';
}
