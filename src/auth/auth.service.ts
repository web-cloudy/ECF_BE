import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    return await this.usersService.findOne(email, password);
  }

  async login(user: LoginUserDto, res: Response): Promise<void> {
    const validUser = await this.validateUser(user.email, user.password);
    if (!validUser) {
      throw new UnauthorizedException('Invalid email or password');
    }
    try {
      const payload = { email: validUser.email, sub: validUser.id, role: validUser.role };
      const token = this.jwtService.sign(payload);

      // Set JWT token as HttpOnly cookie
      res.cookie('access_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Secure cookie in production
        sameSite: 'strict', // Ensure the cookie is sent only for same-site requests
        maxAge: 3600000, // Cookie expiration (1 hour)
      });

      // Send a response (you can just send a success message or status code)
      res.status(200).send({ message: 'Login successful',user: validUser.email });
    } catch (error) {
      throw new Error(`Error logging in ${error} user ${error.message}`);
    }
  }
}