import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../types/jwt-payload.type';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET || 'your-secret-key-change-in-production',
      ignoreExpiration: false,
    });
  }

  async validate(payload: JwtPayload): Promise<JwtPayload> {
    if (!payload) {
      throw new UnauthorizedException('Invalid token');
    }
    return payload;
  }
}

