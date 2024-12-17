import { IsEnum, IsNotEmpty, IsOptional, IsString, IsPhoneNumber } from 'class-validator';
import { Role, IsActive } from '../../enums/role.enum';
export class CreateStaffDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  title: string;

  @IsString()
  company: string;

  @IsString()
  group: string;

  @IsEnum(Role)
  role: Role;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  business_phone: string;

  @IsNotEmpty()
  cell_phone: string;

  @IsEnum(Role)
  account_right: Role;

  @IsEnum(IsActive)  // Correct usage of IsActive enum as a type
  is_active: IsActive;

  @IsOptional()
  @IsString()
  remark?: string;
}