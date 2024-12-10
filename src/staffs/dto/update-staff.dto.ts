import { IsOptional, IsString, IsEmail, IsEnum, IsPhoneNumber } from 'class-validator';
import { AccountRight, IsActive } from '../../enums/staff.enum';
import { Role } from '../../enums/role.enum';
export class UpdateStaffDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  company?: string;

  @IsOptional()
  @IsString()
  group?: string;

  @IsOptional()
  @IsEnum(Role)
  role?: Role;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsPhoneNumber()
  business_phone?: string;

  @IsOptional()
  @IsPhoneNumber()
  cell_phone?: string;

  @IsOptional()
  @IsEnum(AccountRight)
  account_right: AccountRight;

  @IsOptional()
  @IsEnum(IsActive)  
  is_active: IsActive;

  @IsOptional()
  @IsString()
  remark?: string;
}