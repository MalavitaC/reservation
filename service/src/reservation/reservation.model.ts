import 'reflect-metadata';
import { ObjectType, Field, Int, registerEnumType, ID } from '@nestjs/graphql';

@ObjectType()
export class GestContactInfoModel {
  @Field()
  phone: string;

  @Field()
  mail: string;
}

export enum ReservationStatus {
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
}

registerEnumType(ReservationStatus, {
  name: 'ReservationStatus',
});

@ObjectType()
export class ReservationModel {
  @Field((type) => ID)
  id: string;

  @Field((type) => String)
  guest_name: string;

  @Field((type) => GestContactInfoModel)
  gest_contact_info: GestContactInfoModel;

  @Field((type) => Date)
  expected_arrival_time: Date;

  @Field((type) => Int)
  table_size: number;

  @Field(() => ID)
  owner: string;

  @Field((type) => ReservationStatus)
  status: 'SUCCESS' | 'FAILED';
}
