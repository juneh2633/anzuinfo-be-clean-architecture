// infrastructure/auth/jwt.token-provider.ts
import { Injectable } from '@nestjs/common';
import { JsonWebTokenError, JwtService, TokenExpiredError } from '@nestjs/jwt';
import { AuthUserClaim } from 'src/domain/auth/entity/auth-user-claim';
import { TokenEncoderPort } from 'src/domain/auth/port/out/token-encoder.port';

@Injectable()
export class JwtTokenProvider implements TokenEncoderPort {
  constructor(private readonly jwt: JwtService) {}

  async sign(payload: AuthUserClaim, options?: { expiresIn?: string | number }): Promise<string> {
    return await this.jwt.signAsync(payload, options);
  }

  async verify<T extends object = AuthUserClaim>(token: string): Promise<T> {
    return await this.jwt.verifyAsync<T>(token);
  }

  async tryVerify<T extends object = AuthUserClaim>(token: string): Promise<T | null> {
    try {
      return await this.jwt.verifyAsync<T>(token);
    } catch (e) {
      if (e instanceof TokenExpiredError || e instanceof JsonWebTokenError) return null;
      throw e;
    }
  }

  decode<T = any>(token: string): T | null {
    const decoded = this.jwt.decode(token);
    return (decoded ?? null) as T | null;
  }
}
