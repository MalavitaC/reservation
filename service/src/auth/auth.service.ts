import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(account: string, pass: string) {
    const user = await this.usersService.findOne({
      account,
    });
    if (user?.password !== pass) {
      throw new HttpException(
        {
          errorCode: 10001,
          errorMessage: 'password is invalid',
        },
        200,
      );
    }
    const payload = { id: user.id, account: user.account, role: user.role };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
