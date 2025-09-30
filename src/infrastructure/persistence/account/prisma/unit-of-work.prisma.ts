import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from 'src/infrastructure/prisma/prisma.service';

import { TxOptions, UnitOfWork, UowRepositories } from 'src/domain/common/interfaces/unit-of-work';
import { AccountReadPrismaRepository, AccountWritePrismaRepository } from './account.prisma.repository';

     
@Injectable()
export class PrismaUnitOfWork implements UnitOfWork {
  constructor(private readonly prisma: PrismaService) {}

  async withTransaction<T>(
    work: (repos: UowRepositories) => Promise<T>,
    options?: TxOptions,
  ): Promise<T> {
    const txOptions = {
      isolationLevel: this.mapIsolationLevel(options?.isolationLevel),
      maxWait: 2000,
      timeout: options?.timeoutMs ?? 5000,
    };

    return this.prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      // readOnly 강제 (지원되는 DB에서만 의미 있음)
      if (options?.readOnly) {
        await tx.$executeRawUnsafe('SET TRANSACTION READ ONLY');
      }

      const repos: UowRepositories = {
        accountReadRepo: new AccountReadPrismaRepository(tx),
        accountWriteRepo: options?.readOnly ? undefined : new AccountWritePrismaRepository(tx),
      };

      return work(repos);
    }, txOptions);
  }

  private mapIsolationLevel(
    level?: 'read committed' | 'repeatable read' | 'serializable',
  ): Prisma.TransactionIsolationLevel | undefined {
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
