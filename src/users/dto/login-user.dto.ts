import {
  IsString,
  Matches,
  MaxLength,
  MinLength,
  IsEmail
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({
    description: 'The email of the user',
    example: 'john.doe@example.com',
  })
  @IsString({
    message: 'Email must be a string',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'The password of the user (must include uppercase, lowercase, and special characters)',
    example: 'StrongPass1!',
  })
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;
}
