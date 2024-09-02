import { JwtService } from '@nestjs/jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string): Promise<{ acess_token: string }> {
    const user = await this.userService.findByEmail(email);
    const userAuth = await bcrypt.compare(pass, user.password);
    if (!userAuth) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, username: user.name };
    return {
      acess_token: await this.jwtService.signAsync(payload),
    };
  }
}
