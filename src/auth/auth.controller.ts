import {
  Controller,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Body,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { LoginUserDto } from 'src/users/dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({
    summary: 'Login as a user',
  })
  @UsePipes(ValidationPipe)
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Body() loginData: LoginUserDto): Promise<any> {
    return await this.authService.login(loginData);
  }
}
