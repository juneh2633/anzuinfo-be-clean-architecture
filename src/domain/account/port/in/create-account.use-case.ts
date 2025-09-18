import { Account } from '../../entity/account.entity';

export const CreateAccountUseCase = Symbol('CreateAccountUseCase');

export interface CreateAccountUseCase {
  execute(accountData: Omit<Account, 'idx' | 'createdAt' | 'updatedAt' | 'deletedAt'>): Promise<Account>;
}
