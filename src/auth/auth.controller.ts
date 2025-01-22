import {
  Controller,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Body,
  Res,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({
    summary: 'Login as a user',
  })
  @UsePipes(ValidationPipe)
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(
    @Body() loginData: LoginUserDto,
    @Res({ passthrough: true }) res: Response, 
  ): Promise<any> {
    const { token, sub, role } = await this.authService.login(loginData);

    res.cookie('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3600000, 
      sameSite: 'strict', 
    });

    return {
      message: 'Login successful',
      user: { id: sub, role: role, token }, 
    };
  }

  @ApiOperation({
    summary: 'Logout the user',
  })
  @Post('/logout')
  async logout(@Res({ passthrough: true }) res: Response): Promise<any> {
    res.clearCookie('auth_token', {
      httpOnly: true,
      secure: true, 
      sameSite: 'strict',
    });

    return { message: 'Logout successful' };
  }
}