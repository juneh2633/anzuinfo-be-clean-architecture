import { Account } from '../../entity/account.entity';

export const GetAccountUseCase = Symbol('GetAccountUseCase');

export interface GetAccountUseCase {
  execute(idx: number): Promise<Account>;
}
