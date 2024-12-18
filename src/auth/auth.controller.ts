import {
  Controller,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Body,
  Response,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { Response as ExpressResponse } from 'express'; // Import from 'express'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({
    summary: 'Login as a user',
  })
  @UsePipes(ValidationPipe)
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Body() loginData: LoginUserDto, @Response() res: ExpressResponse): Promise<void> {
    await this.authService.login(loginData, res); // Now the type matches
  }
}