import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { Account } from 'src/domain/account/entity/account.entity';

import { AccountMapper } from '../account.mapper';
import { PrismaAccountMap } from './account.prisma.map';
import { IAccountReadRepository, IAccountWriteRepository } from 'src/domain/account/port/out/account.repository.port';

type DbClient = Pick<PrismaClient, 'account'> | Prisma.TransactionClient;

@Injectable()
export class AccountReadPrismaRepository implements IAccountReadRepository {
  constructor(private readonly client: DbClient) {}

  async findByIdx(idx: number): Promise<Account | null> {
    const row = await this.client.account.findUnique({ where: { idx } });
    return row ? AccountMapper.toDomain(PrismaAccountMap.toRecord(row)) : null;
  }

  async findById(id: string): Promise<Account | null> {
    const row = await this.client.account.findUnique({ where: { id } as any });
    return row ? AccountMapper.toDomain(PrismaAccountMap.toRecord(row)) : null;
  }

  async findBySdvxId(sdvxId: string): Promise<Account | null> {
    const row = await this.client.account.findFirst({ where: { sdvxId } });
    return row ? AccountMapper.toDomain(PrismaAccountMap.toRecord(row)) : null;
  }

  async findByPlayerName(playerName: string): Promise<Account | null> {
    const row = await this.client.account.findFirst({ where: { playerName } });
    return row ? AccountMapper.toDomain(PrismaAccountMap.toRecord(row)) : null;
  }
}

@Injectable()
export class AccountWritePrismaRepository implements IAccountWriteRepository {
  constructor(private readonly client: DbClient) {}

  async create(account: Account): Promise<Account> {
    // Domain → Record → Prisma data → DB
    const rec = AccountMapper.toPersistence(account);
    const data = PrismaAccountMap.fromRecord(rec);
    const created = await this.client.account.create({ data });

    // DB → Prisma model → Record → Domain
    return AccountMapper.toDomain(PrismaAccountMap.toRecord(created));
  }
}
