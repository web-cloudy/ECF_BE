import { IsEnum, IsNotEmpty, IsOptional, IsString, IsPhoneNumber } from 'class-validator';
import { AccountRight, IsActive } from '../../enums/staff.enum';
import { Role } from '../../enums/role.enum';
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
  @IsPhoneNumber()
  business_phone: string;

  @IsNotEmpty()
  @IsPhoneNumber()
  cell_phone: string;

  @IsEnum(AccountRight)
  account_right: AccountRight;

  @IsEnum(IsActive)  // Correct usage of IsActive enum as a type
  is_active: IsActive;

  @IsOptional()
  @IsString()
  remark?: string;
}