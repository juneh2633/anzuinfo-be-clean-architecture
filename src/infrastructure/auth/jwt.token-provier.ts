// infrastructure/auth/jwt.token-provider.ts
import { Injectable } from '@nestjs/common';
import { JsonWebTokenError, JwtService, TokenExpiredError } from '@nestjs/jwt';
import { AuthUserClaim, TokenProvider } from 'src/domain/auth/port/out/token-provider.port';

@Injectable()
export class JwtTokenProvider implements TokenProvider {
  constructor(private readonly jwt: JwtService) {}

  // 토큰 발급
  sign(payload: AuthUserClaim, options?: { expiresIn?: string | number }) {
    return this.jwt.signAsync(payload, options);
  }

  // ✅ verify: 제네릭에 `extends object` 제약 추가
  verify<T extends object = AuthUserClaim>(token: string): T {
    return this.jwt.verify<T>(token);
  }

  // ✅ tryVerify: 제네릭에 `extends object` 제약 추가
  tryVerify<T extends object = AuthUserClaim>(token: string): T | null {
    try {
      return this.jwt.verify<T>(token);
    } catch (err) {
      if (err instanceof TokenExpiredError || err instanceof JsonWebTokenError) {
        return null;
      }
      throw err;
    }
  }

  // decode는 Nest 타입이 넓어서 굳이 제약 불필요
  decode<T = any>(token: string): T | null {
    const decoded = this.jwt.decode(token);
    return (decoded ?? null) as T | null;
  }
}
