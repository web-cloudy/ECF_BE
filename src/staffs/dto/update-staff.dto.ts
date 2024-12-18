import { IsOptional, IsString, IsEmail, IsEnum, IsPhoneNumber } from 'class-validator';
import { Role, IsActive } from '../../enums/role.enum';
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
  business_phone?: string;

  @IsOptional()
  cell_phone?: string;

  @IsOptional()
  @IsEnum(Role)
  account_right: Role;

  @IsOptional()
  @IsEnum(IsActive)  
  is_active: IsActive;

  @IsOptional()
  @IsString()
  remark?: string;
}