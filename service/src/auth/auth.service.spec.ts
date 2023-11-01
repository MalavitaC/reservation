import { Test } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../user/user.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersService } from '../user/user.service';
import { AuthModule } from './auth.module';

describe('AuthService', () => {
  let authService: AuthService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        // AuthModule,
        JwtModule.register({
          secret: 'test',
        }),
      ],
      providers: [
        {
          provide: UsersService,
          useValue: {
            findOne: jest.fn().mockResolvedValue({
              id: 1,
              account: 'test',
              password: 'test',
              role: 'test',
            }),
          },
        },
        AuthService,
      ],
    }).compile();

    authService = moduleRef.get(AuthService);
    jwtService = moduleRef.get<JwtService>(JwtService);
  });

  describe('signIn', () => {
    it('should return an jwt token', async () => {
      const token = await jwtService.signAsync({
        id: 1,
        account: 'test',
        role: 'test',
      });
      expect(await authService.signIn('test', 'test')).toEqual({
        access_token: token,
      });
    });
  });
});
