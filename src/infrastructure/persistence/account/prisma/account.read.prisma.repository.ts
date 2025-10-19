// infrastructure/persistence/account/prisma/account.read.prisma.repository.ts
import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { AccountReadRepositoryPort } from 'src/domain/account/port/out/account.read-repository.port';
import { AccountMapper } from '../account.mapper';
import { PrismaAccountMap } from '../account.prisma.map';


type Db = Pick<PrismaClient, 'account'> | Prisma.TransactionClient;

@Injectable()
export class AccountReadPrismaRepository implements AccountReadRepositoryPort {
  constructor(private readonly db: Db) {}

  async findByIdx(idx: number) {
    const row = await this.db.account.findUnique({ where: { idx } });
    return row ? AccountMapper.toDomain(PrismaAccountMap.toRecord(row)) : null;
  }
  async findById(id: string) {
    const row = await (this.db as any).account.findUnique?.({ where: { id } })
             ?? await this.db.account.findFirst({ where: { id } });
    return row ? AccountMapper.toDomain(PrismaAccountMap.toRecord(row)) : null;
  }
  async findBySdvxId(sdvxId: string) {
    const row = await this.db.account.findFirst({ where: { sdvxId } });
    return row ? AccountMapper.toDomain(PrismaAccountMap.toRecord(row)) : null;
  }
  async findByPlayerName(playerName: string) {
    const row = await this.db.account.findFirst({ where: { playerName } });
    return row ? AccountMapper.toDomain(PrismaAccountMap.toRecord(row)) : null;
  }
}
