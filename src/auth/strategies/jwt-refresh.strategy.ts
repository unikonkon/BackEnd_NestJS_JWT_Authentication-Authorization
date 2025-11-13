import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { JwtPayload } from '../types/jwt-payload.type';
import { JwtPayloadWithRt } from '../types/jwt-payload-with-rt.type';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_REFRESH_SECRET || 'your-refresh-secret-key-change-in-production',
      passReqToCallback: true,
      ignoreExpiration: false,
    });
  }

  async validate(
    req: Request,
    payload: JwtPayload,
  ): Promise<JwtPayloadWithRt> {
    const refreshToken = req
      ?.get('authorization')
      ?.replace('Bearer', '')
      .trim();

    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token malformed');
    }

    return {
      ...payload,
      refreshToken,
    };
  }
}

