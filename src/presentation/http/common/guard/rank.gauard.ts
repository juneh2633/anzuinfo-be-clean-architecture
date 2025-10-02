import {
  Injectable, CanActivate, ExecutionContext,
  ForbiddenException, UnauthorizedException, Inject,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { TokenProvider } from 'src/domain/auth/port/out/token-provider.port';
import { TOKEN_PROVIDER } from 'src/domain/auth/port/out//di-tokens';
import { guestPayload } from '../../auth/auth-principal';

@Injectable()
export class RankGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @Inject('TOKEN_PROVIDER') private readonly tokens: TokenProvider, // 바인딩은 모듈에서
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRankIdx = this.reflector.get<number>('rankIdx', context.getHandler()) ?? 0;
    const req = context.switchToHttp().getRequest();
    const auth: string | undefined = req.headers?.authorization;

    // Authorization 미제공
    if (!auth) {
      if (requiredRankIdx > 0) throw new UnauthorizedException('Invalid token');
      req.user = guestPayload();
      return true;
    }

    // Bearer 추출
    const token = this.extractBearer(auth);
    if (!token) {
      if (requiredRankIdx > 0) throw new UnauthorizedException('Invalid token');
      req.user = guestPayload();
      return true;
    }

    // 검증
    const payload = this.tokens.tryVerify(token);
    if (!payload) {
      // 만료/위조
      if (requiredRankIdx > 0) throw new UnauthorizedException('token expired');
      req.user = guestPayload();
      return true;
    }

    // 권한 체크
    const userRank = payload.rankIdx ?? 0;
    if (userRank < requiredRankIdx) throw new ForbiddenException('No permission');

    req.user = payload;
    return true;
  }

  private extractBearer(header?: string): string | null {
    if (!header?.startsWith('Bearer ')) return null;
    return header.slice('Bearer '.length);
  }
}
