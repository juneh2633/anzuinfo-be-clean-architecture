// src/infrastructure/persistence/prisma.unit-of-work.ts
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from './prisma.service';
import { AccountReadPrismaRepository, AccountWritePrismaRepository } from '../persistence/account/prisma/account.prisma.repository';
import {
    DEFAULT_TX_OPTIONS,
    TxIsolation,
    TxOptions,
    UnitOfWork,
    UowRepositories,
} from 'src/domain/common/interfaces/unit-of-work';

@Injectable()
export class PrismaUnitOfWork implements UnitOfWork {
    constructor(private readonly prisma: PrismaService) { }

    async withTransaction<T>(
        work: (repos: UowRepositories) => Promise<T>,
        options?: TxOptions): Promise<T> {
        const timeoutMs = options?.timeoutMs ?? DEFAULT_TX_OPTIONS.timeoutMs;

        return this.prisma.$transaction(async (tx: Prisma.TransactionClient) => {
            // 1) readOnly면 DB 레벨에서 읽기 전용 강제 (Postgres/MySQL)
            if (options?.readOnly) {
                await tx.$executeRawUnsafe('SET TRANSACTION READ ONLY');
            }

            // 2) 레포 구성: readOnly인 경우 write 레포 미제공
            const repos: UowRepositories = {
                accountReadRepo: new AccountReadPrismaRepository(tx),
                accountWriteRepo: options?.readOnly ? undefined : new AccountWritePrismaRepository(tx),
            };

            // 3) 유즈케이스 실행
            return work(repos);
        }, {
            isolationLevel: this.mapIsolationLevel(options?.isolationLevel),
            maxWait: 2000,
            timeout: timeoutMs,
        });
    }

    private mapIsolationLevel(level?: TxIsolation): Prisma.TransactionIsolationLevel | undefined {
        switch (level) {
            case TxIsolation.ReadCommitted: return Prisma.TransactionIsolationLevel.ReadCommitted;
            case TxIsolation.RepeatableRead: return Prisma.TransactionIsolationLevel.RepeatableRead;
            case TxIsolation.Serializable: return Prisma.TransactionIsolationLevel.Serializable;
            default: return undefined;
        }
    }
}
