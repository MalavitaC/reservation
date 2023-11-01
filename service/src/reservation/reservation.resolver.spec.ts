import { Test } from '@nestjs/testing';
import { ReservationResolver } from './reservation.resolvers';
import { PrismaService } from '../core/prisma.service';

describe('AuthController', () => {
  let reservationResolver: ReservationResolver;
  let findManyMock: jest.Mock;

  beforeEach(async () => {
    findManyMock = jest.fn();
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: PrismaService,
          useValue: {
            reservation: {
              findMany: findManyMock,
            },
          },
        },
        ReservationResolver,
      ],
    }).compile();

    reservationResolver = moduleRef.get(ReservationResolver);
  });

  describe('get list', () => {
    it('should return all reservation of an array', () => {
      const list = [
        {
          id: '1',
          guest_name: 'carson',
          gest_contact_info: {
            phone: '18900000010',
            mail: '123@gmail.com',
          },
          expected_arrival_time: '2023-10-20T08:23:25.981Z',
          table_size: 3,
          owner: '65363a3e2df32889c1ce4107',
          status: 'SUCCESS',
        },
        {
          id: '2',
          guest_name: 'carson',
          gest_contact_info: {
            phone: '18900000010',
            mail: '123@gmail.com',
          },
          expected_arrival_time: '2023-10-20T09:01:19.288Z',
          table_size: 3,
          owner: '65363a3e2df32889c1ce4107',
          status: 'SUCCESS',
        },
      ];
      findManyMock.mockResolvedValue(list);
      expect(
        reservationResolver.getList(undefined, 0, 10, undefined, {
          req: { user: { role: 'employees' } },
        }),
      ).resolves.toEqual(list);
    });
    it("should return user's own reservation of an array", () => {
      const list = [
        {
          id: '1',
          guest_name: 'carson',
          gest_contact_info: {
            phone: '18900000010',
            mail: '123@gmail.com',
          },
          expected_arrival_time: '2023-10-20T08:23:25.981Z',
          table_size: 3,
          owner: '65363a3e2df32889c1ce4107',
          status: 'SUCCESS',
        },
      ];
      findManyMock.mockResolvedValue(list);
      expect(
        reservationResolver.getList(undefined, 0, 10, undefined, {
          req: { user: { id: '65363a3e2df32889c1ce4107', role: 'gest' } },
        }),
      ).resolves.toEqual(list);
    });
  });
});
