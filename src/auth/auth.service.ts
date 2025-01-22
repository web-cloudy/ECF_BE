import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { jwtConstants } from '../constants/constants';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    return await this.usersService.findOne(email, password);
  }

  async login(user: LoginUserDto) {
    const validUser = await this.validateUser(user.email, user.password);
    if (!validUser) {
      throw new UnauthorizedException('Invalid email or password');
    }
    try {
      const payload = { email: validUser.email, sub: validUser.id, role: validUser.role };
      const token = this.jwtService.sign(payload, {
        secret: jwtConstants.secret, 
        expiresIn: '1h',
      });
      return {
        ...payload,
        token: token
      };
    } catch (error) {
      throw new Error(`Error logging in ${error} user ${error.message}`);
    }
  }
}
