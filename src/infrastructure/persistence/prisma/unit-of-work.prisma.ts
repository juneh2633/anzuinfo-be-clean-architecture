import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import {
  UnitOfWork,
  UowRepositories,
  TxOptions,
} from 'src/domain/common/interfaces/unit-of-work';
import { PrismaService } from './prisma.service';
import { AccountPrismaRepository } from './repositories/account.prisma.repository';

// Prisma의 트랜잭션 클라이언트 타입 정의
type TransactionClient = Omit<
  PrismaClient,
  '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'
>;

@Injectable()
export class PrismaUnitOfWork implements UnitOfWork {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Prisma의 Interactive Transaction을 사용하여 트랜잭션을 실행합니다.
   * @param work - 트랜잭션 내에서 실행될 비즈니스 로직 콜백 함수
   * @param options - 트랜잭션 옵션 (격리 수준 등)
   */
  async withTransaction<T>(
    work: (repos: UowRepositories) => Promise<T>,
    options?: TxOptions,
  ): Promise<T> {
    // Prisma 트랜잭션 옵션을 설정합니다.
    const txOptions = {
      isolationLevel: this.mapIsolationLevel(options?.isolationLevel),
      maxWait: options?.timeoutMs || 2000, // 기본 최대 대기 시간
      timeout: options?.timeoutMs ? options.timeoutMs + 1000 : 5000, // 기본 타임아웃
    };

    // Prisma의 $transaction 메서드를 사용하여 트랜잭션을 실행합니다.
    return this.prisma.$transaction(async (tx: TransactionClient) => {
      // 1. 트랜잭션 클라이언트(tx)를 사용하여 리포지토리 인스턴스를 생성합니다.
      const repositories: UowRepositories = {
        accountRepo: new AccountPrismaRepository(tx), // tx 타입을 AccountPrismaRepository와 맞추기 위해 'as any' 사용 가능
        // chartRepo: new ChartPrismaRepository(tx),
      };

      // 2. 인자로 받은 work 콜백 함수에 리포지토리들을 전달하여 실행합니다.
      return work(repositories);
    }, txOptions);
  }

  /**
   * 인터페이스의 격리 수준을 Prisma의 격리 수준으로 매핑합니다.
   */
  private mapIsolationLevel(
    level?: 'read committed' | 'repeatable read' | 'serializable',
  ): Prisma.TransactionIsolationLevel | undefined {
    if (!level) return undefined;
    switch (level) {
      case 'read committed':
        return Prisma.TransactionIsolationLevel.ReadCommitted;
      case 'repeatable read':
        return Prisma.TransactionIsolationLevel.RepeatableRead;
      case 'serializable':
        return Prisma.TransactionIsolationLevel.Serializable;
      default:
        return undefined;
    }
  }
}
