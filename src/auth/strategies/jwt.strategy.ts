import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from '../../constants/constants';
import { UsersService } from '../../users/users.service'; // Assuming you have a UsersService

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private jwtService: JwtService, private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => req.cookies?.auth_token, // Extract token from cookie
        ExtractJwt.fromAuthHeaderAsBearerToken(), // Fallback to Bearer token in header
      ]),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret, // Secret for token verification
    });
  }

  async validate(payload: any) {
    const user = await this.usersService.findOneByEmail(payload.email);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return {
      userId: payload.sub,   
      email: payload.email, 
      role: user.role,       
    };
  }
}