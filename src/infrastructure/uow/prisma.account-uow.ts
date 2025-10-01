// infrastructure/uow/prisma.account-uow.ts
import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { AccountReposRead, AccountReposWrite, AccountUnitOfWork, TxIsolation } from 'src/application/account/account.uow';
import { PrismaService } from '../prisma/prisma.service';
import { AccountReadPrismaRepository } from '../persistence/account/prisma/account.read.prisma.repository';
import { AccountWritePrismaRepository } from '../persistence/account/prisma/account.write.prisma.repository';

type Tx = Prisma.TransactionClient;

@Injectable()
export class PrismaAccountUnitOfWork implements AccountUnitOfWork {
  constructor(private readonly prisma: PrismaService) {}

  read<T>(
    work: (repos: AccountReposRead) => Promise<T>,
    opts?: { isolationLevel?: TxIsolation; timeoutMs?: number },
  ) {
    return this.prisma.$transaction(async (tx: Tx) => {
      try { await tx.$executeRawUnsafe('SET TRANSACTION READ ONLY'); } catch {}
      const repos: AccountReposRead = { accountReadRepo: new AccountReadPrismaRepository(tx) };
      return work(repos);
    }, this.txOpts(opts));
  }

  write<T>(
    work: (repos: AccountReposWrite) => Promise<T>,
    opts?: { isolationLevel?: TxIsolation; timeoutMs?: number },
  ) {
    return this.prisma.$transaction(async (tx: Tx) => {
      const repos: AccountReposWrite = {
        accountReadRepo: new AccountReadPrismaRepository(tx),
        accountWriteRepo: new AccountWritePrismaRepository(tx),
      };
      return work(repos);
    }, this.txOpts(opts));
  }

  private txOpts(opts?: { isolationLevel?: TxIsolation; timeoutMs?: number }) {
    return {
      isolationLevel: this.mapIso(opts?.isolationLevel),
      maxWait: 2000,
      timeout: opts?.timeoutMs ?? 5000,
    } as const;
  }
  private mapIso(i?: TxIsolation): Prisma.TransactionIsolationLevel | undefined {
    switch (i) {
      case 'read committed':  return Prisma.TransactionIsolationLevel.ReadCommitted;
      case 'repeatable read': return Prisma.TransactionIsolationLevel.RepeatableRead;
      case 'serializable':    return Prisma.TransactionIsolationLevel.Serializable;
      default:                return undefined;
    }
  }
}
