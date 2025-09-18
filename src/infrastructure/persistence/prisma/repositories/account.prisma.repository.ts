import { Injectable } from '@nestjs/common';
import { Account } from '../../../../domain/account/entity/account.entity';
import { IAccountRepository } from '../../../../domain/account/port/out/account.repository.port';
import { PrismaService } from '../prisma.service';
import { AccountMapper } from './account.mapper';

@Injectable()
export class AccountPrismaRepository implements IAccountRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(accountData: Omit<Account, 'idx' | 'createdAt' | 'updatedAt' | 'deletedAt'>): Promise<Account> {
    const newAccount = await this.prisma.account.create({
      data: accountData,
    });
    return AccountMapper.toDomain(newAccount);
  }

  async findById(idx: number): Promise<Account | null> {
    const account = await this.prisma.account.findUnique({
      where: { idx },
    });
    return account ? AccountMapper.toDomain(account) : null;
  }

  async findBySdvxId(sdvxId: string): Promise<Account | null> {
    const account = await this.prisma.account.findFirst({
      where: { sdvxId },
    });
    return account ? AccountMapper.toDomain(account) : null;
  }
}