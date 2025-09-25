import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Account } from '../../../../domain/account/entity/account.entity';
import { IAccountRepository } from '../../../../domain/account/port/out/account.repository.port';
import { PrismaService } from '../prisma.service';
import { AccountMapper } from './account.mapper';

type PrismaTransactionClient = Omit<
  PrismaClient,
  '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'
>;

@Injectable()
export class AccountPrismaRepository implements IAccountRepository {
  constructor(
    private readonly prisma: PrismaService | PrismaTransactionClient,
  ) {}

  async create(account: Account): Promise<Account> {
    const persistenceAccount = AccountMapper.toPersistence(account);
    delete persistenceAccount.idx;
    delete persistenceAccount.createdAt;
    delete persistenceAccount.updatedAt;
    delete persistenceAccount.deletedAt;

    const newAccount = await this.prisma.account.create({
      data: persistenceAccount,
    });
    return AccountMapper.toDomain(newAccount);
  }

  async findByIdx(idx: number): Promise<Account | null> {
    const account = await this.prisma.account.findUnique({
      where: { idx },
    });
    return account ? AccountMapper.toDomain(account) : null;
  }

  async findById(id: string): Promise<Account | null> {
    const account = await this.prisma.account.findFirst({
      where: { id },
    });
    return account ? AccountMapper.toDomain(account) : null;
  }
  async findBySdvxId(sdvxId: string): Promise<Account | null> {
    const account = await this.prisma.account.findFirst({
      where: { sdvxId },
    });
    return account ? AccountMapper.toDomain(account) : null;
  }

  async findByPlayerName(playerName: string): Promise<Account | null> {
    const account = await this.prisma.account.findFirst({
      where: { playerName },
    });
    return account ? AccountMapper.toDomain(account) : null;
  }
}
