import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class GestContactInfoInput {
  @Field()
  phone: string;

  @Field((type) => String, { nullable: true })
  mail: string;
}

@InputType()
export class ReservationCreateInput {
  @Field(() => String)
  guest_name: string;

  @Field(() => GestContactInfoInput)
  gest_contact_info: GestContactInfoInput;

  @Field(() => Date)
  expected_arrival_time: Date;

  @Field(() => Int)
  table_size: number;
}
