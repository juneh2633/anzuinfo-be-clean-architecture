import { Account } from '../../entity/account.entity';

export const IAccountRepository = Symbol('IAccountRepository');

export interface IAccountReadRepository {
  findByIdx(idx: number): Promise<Account | null>;
  findById(id: string): Promise<Account | null>;
  findBySdvxId(sdvxId: string): Promise<Account | null>;
  findByPlayerName(playerName: string): Promise<Account | null>;
}
export interface IAccountWriteRepository {
  create(account: Account): Promise<Account>;
  // update, delete 등...
}
export interface UowRepositories {
  accountReadRepo: IAccountReadRepository;
  accountWriteRepo?: IAccountWriteRepository; // readOnly면 제공 X
}
