import { Account } from '../../entity/account.entity';

export const IAccountRepository = Symbol('IAccountRepository');

export interface IAccountRepository {
  create(
    account: Omit<Account, 'idx' | 'createdAt' | 'updatedAt' | 'deletedAt'>,
  ): Promise<Account>;
  findById(id: string): Promise<Account | null>;
  findBySdvxId(sdvxId: string): Promise<Account | null>;
  findByPlayerName(playerName: string): Promise<Account | null>;
}
