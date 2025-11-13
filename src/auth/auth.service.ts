import {
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { TokensDto } from './dto/tokens.dto';
import { JwtPayload } from './types/jwt-payload.type';
import * as bcrypt from 'bcrypt';
import { Role } from '../common/enums/role.enum';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<TokensDto> {
    // Create user with default USER role
    const user = await this.usersService.create({
      ...registerDto,
      roles: [Role.USER],
    });

    const tokens = await this.getTokens({
      sub: user.id,
      email: user.email,
      username: user.username,
      roles: user.roles,
    });

    await this.updateRefreshToken(user.id, tokens.refreshToken);

    return tokens;
  }

  async login(loginDto: LoginDto): Promise<TokensDto> {
    // Find user by email or username
    let user = await this.usersService.findByEmail(loginDto.usernameOrEmail);

    if (!user) {
      user = await this.usersService.findByUsername(loginDto.usernameOrEmail);
    }

    if (!user) {
      throw new UnauthorizedException('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
    }

    // Check if user is active
    if (!user.isActive) {
      throw new ForbiddenException('บัญชีของคุณถูกระงับการใช้งาน');
    }

    const tokens = await this.getTokens({
      sub: user.id,
      email: user.email,
      username: user.username,
      roles: user.roles,
    });

    await this.updateRefreshToken(user.id, tokens.refreshToken);

    return tokens;
  }

  async logout(userId: string): Promise<void> {
    await this.usersService.updateRefreshToken(userId, null);
  }

  async refreshTokens(
    userId: string,
    refreshToken: string,
  ): Promise<TokensDto> {
    const user = await this.usersService.findOne(userId);

    if (!user) {
      throw new ForbiddenException('Access Denied');
    }

    // Get the full user data with refresh token
    const fullUser = await this.usersService.findByEmail(user.email);

    if (!fullUser || !fullUser.refreshToken) {
      throw new ForbiddenException('Access Denied');
    }

    const refreshTokenMatches = await bcrypt.compare(
      refreshToken,
      fullUser.refreshToken,
    );

    if (!refreshTokenMatches) {
      throw new ForbiddenException('Access Denied');
    }

    const tokens = await this.getTokens({
      sub: fullUser.id,
      email: fullUser.email,
      username: fullUser.username,
      roles: fullUser.roles,
    });

    await this.updateRefreshToken(fullUser.id, tokens.refreshToken);

    return tokens;
  }

  async updateRefreshToken(
    userId: string,
    refreshToken: string,
  ): Promise<void> {
    await this.usersService.updateRefreshToken(userId, refreshToken);
  }

  async getTokens(payload: JwtPayload): Promise<TokensDto> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET || 'your-secret-key-change-in-production',
        expiresIn: '15m', // 15 minutes
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.JWT_REFRESH_SECRET || 'your-refresh-secret-key-change-in-production',
        expiresIn: '7d', // 7 days
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);

    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }
}

