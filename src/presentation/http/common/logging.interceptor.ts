import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

function genRequestId() {
  // 외부 라이브러리 없이 간단한 요청 ID
  return (
    Date.now().toString(36) +
    '-' +
    Math.random().toString(36).slice(2, 8)
  ).toUpperCase();
}

@Injectable()
export class HttpLoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger('HTTP');

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // HTTP 요청/응답 객체
    const http = context.switchToHttp();
    const req: any = http.getRequest();
    const res: any = http.getResponse();

    const start = Date.now();

    // 기본 메타
    const method = req?.method;
    const url = req?.originalUrl ?? req?.url;
    const ip =
      req?.headers?.['x-forwarded-for'] ??
      req?.ip ??
      req?.socket?.remoteAddress ??
      '-';
    const userId = req?.user?.id ?? req?.user?.sub ?? '-';

    // 요청 ID (헤더가 있으면 재사용)
    const reqId = req?.headers?.['x-request-id'] ?? genRequestId();
    try {
      res?.setHeader?.('x-request-id', reqId);
    } catch {
      /* noop */
    }

    // 민감한 헤더 마스킹
    const hasAuth = Boolean(req?.headers?.authorization);
    const headerSummary = {
      'x-request-id': reqId,
      authorization: hasAuth ? '***' : undefined,
    };

    // 요청 로그(원하면 body/query는 크기/민감도에 따라 제외)
    this.logger.log(
      JSON.stringify({
        msg: 'Request start',
        method,
        url,
        ip,
        userId,
        reqId,
        headers: headerSummary,
      }),
    );

    return next.handle().pipe(
      tap({
        next: () => {
          const ms = Date.now() - start;
          const statusCode = res?.statusCode ?? 200;
          this.logger.log(
            JSON.stringify({
              msg: 'Request end',
              method,
              url,
              statusCode,
              durationMs: ms,
              ip,
              userId,
              reqId,
            }),
          );
        },
        error: (err) => {
          const ms = Date.now() - start;
          const statusCode = err?.status ?? res?.statusCode ?? 500;
          this.logger.error(
            JSON.stringify({
              msg: 'Request error',
              method,
              url,
              statusCode,
              durationMs: ms,
              ip,
              userId,
              reqId,
              // 운영 환경에선 stack 로깅을 제한/비활성화하세요
              error: err?.message ?? 'Unknown error',
            }),
          );
        },
      }),
    );
  }
}
