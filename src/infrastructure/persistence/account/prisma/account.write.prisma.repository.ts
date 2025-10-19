// infrastructure/persistence/account/prisma/account.write.prisma.repository.ts
import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { Account } from 'src/domain/account/entity/account.entity';
import { AccountWriteRepositoryPort } from 'src/domain/account/port/out/account.write-repository.port';
import { AccountMapper } from '../account.mapper';
import { PrismaAccountMap } from '../account.prisma.map';


type Db = Pick<PrismaClient, 'account'> | Prisma.TransactionClient;

@Injectable()
export class AccountWritePrismaRepository implements AccountWriteRepositoryPort {
  constructor(private readonly db: Db) { }

  async create(account: Account): Promise<Account> {
    const record = AccountMapper.toPersistence(account);
    const data = PrismaAccountMap.fromRecord(record);
    const created = await this.db.account.create({ data });
    return AccountMapper.toDomain(PrismaAccountMap.toRecord(created));
  }

  // 필요 시 updatePassword / updateSdvxId / softDelete 등 추가
}
