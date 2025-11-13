import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { TokensDto } from './dto/tokens.dto';
import { Public } from '../common/decorators/public.decorator';
import { JwtRefreshAuthGuard } from './guards/jwt-refresh-auth.guard';
import { GetCurrentUserId } from '../common/decorators/get-current-user-id.decorator';
import { GetCurrentRefreshToken } from '../common/decorators/get-current-refresh-token.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() registerDto: RegisterDto): Promise<TokensDto> {
    return this.authService.register(registerDto);
  }

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto): Promise<TokensDto> {
    return this.authService.login(loginDto);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@GetCurrentUserId() userId: string): Promise<{ message: string }> {
    await this.authService.logout(userId);
    return { message: 'ออกจากระบบสำเร็จ' };
  }

  @Public()
  @UseGuards(JwtRefreshAuthGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refreshTokens(
    @GetCurrentUserId() userId: string,
    @GetCurrentRefreshToken() refreshToken: string,
  ): Promise<TokensDto> {
    return this.authService.refreshTokens(userId, refreshToken);
  }

  @Get('me')
  @HttpCode(HttpStatus.OK)
  async getProfile(@CurrentUser() user: any) {
    return user;
  }
}

