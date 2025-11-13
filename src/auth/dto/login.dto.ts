import { IsString, IsNotEmpty, MinLength } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsNotEmpty({ message: 'กรุณาระบุชื่อผู้ใช้หรืออีเมล' })
  usernameOrEmail: string;

  @IsString()
  @IsNotEmpty({ message: 'กรุณาระบุรหัสผ่าน' })
  @MinLength(6, { message: 'รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร' })
  password: string;
}

