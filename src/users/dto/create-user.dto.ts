import {
  IsEmail,
  IsString,
  MinLength,
  MaxLength,
  IsOptional,
  IsEnum,
  IsArray,
} from 'class-validator';
import { Role } from '../../common/enums/role.enum';

export class CreateUserDto {
  @IsEmail({}, { message: 'กรุณาระบุอีเมลที่ถูกต้อง' })
  email: string;

  @IsString()
  @MinLength(6, { message: 'รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร' })
  @MaxLength(50, { message: 'รหัสผ่านต้องไม่เกิน 50 ตัวอักษร' })
  password: string;

  @IsString()
  @MinLength(3, { message: 'ชื่อผู้ใช้ต้องมีอย่างน้อย 3 ตัวอักษร' })
  @MaxLength(30, { message: 'ชื่อผู้ใช้ต้องไม่เกิน 30 ตัวอักษร' })
  username: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  firstName?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  lastName?: string;

  @IsOptional()
  @IsArray()
  @IsEnum(Role, { each: true })
  roles?: Role[];
}

