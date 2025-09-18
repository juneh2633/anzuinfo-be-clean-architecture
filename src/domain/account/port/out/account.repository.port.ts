import { Account } from '../entitiy/account.entity';

export const IAccountRepository = Symbol('IAccountRepository');

export interface IAccountRepository {
  create(account: Omit<Account, 'idx' | 'createdAt' | 'updatedAt' | 'deletedAt'>): Promise<Account>;
  findById(idx: number): Promise<Account | null>;
  findBySdvxId(sdvxId: string): Promise<Account | null>;
}