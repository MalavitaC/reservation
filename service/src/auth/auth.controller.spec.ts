import { Test } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let authController: AuthController;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            signIn: jest.fn().mockResolvedValue({
              access_token: 'jwtToken',
            }),
          },
        },
      ],
    }).compile();

    authController = moduleRef.get(AuthController);
  });

  describe('signIn', () => {
    it('should return an user', async () => {
      const result = {
        access_token: 'jwtToken',
      };
      expect(
        await authController.signIn({
          account: 'gest',
          password: 'gest',
        }),
      ).toEqual(result);
    });
  });
});
