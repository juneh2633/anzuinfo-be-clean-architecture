// infrastructure/auth/jwt.token-provider.ts
import { Injectable } from '@nestjs/common';
import { JsonWebTokenError, JwtService, TokenExpiredError } from '@nestjs/jwt';
import { AuthUserClaim, TokenProvider } from 'src/domain/auth/port/out/token-provider.port';

@Injectable()
export class JwtTokenProvider implements TokenProvider {
  constructor(private readonly jwt: JwtService) {}

  sign(payload: AuthUserClaim, options?: { expiresIn?: string | number }) {
    return this.jwt.signAsync(payload, options);
  }

  verify<T extends object = AuthUserClaim>(token: string): T {
    return this.jwt.verify<T>(token);
  }

  tryVerify<T extends object = AuthUserClaim>(token: string): T | null {
    try {
      return this.jwt.verify<T>(token);
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
